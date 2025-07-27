import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import endpoints from '@core/api/endpoints'
import { useAuthStore } from '@auth/stores/authStore'
import { refreshToken as refreshTokenFn } from '@auth/services/authFunctions'

const BASE_URLS = {
  supabase: import.meta.env.VITE_SUPABASE_URL ?? 'https://fallback-url.com',
  python: import.meta.env.VITE_PYTHON_URL ?? 'https://fallback-python.com',
}

const ANON_KEY = import.meta.env.VITE_SUPABASE_ANONKEY ?? 'ANON_KEY_FALLBACK'

const apiClient = axios.create({
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
}[] = []

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken

    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token ?? ANON_KEY}`
    config.headers['refresh_token'] = authStore.refreshToken ?? ''
    config.headers['apikey'] = `${ANON_KEY}`

    return config
  },
  (error) => Promise.reject(error),
)


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: any) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`
              resolve(apiClient(originalRequest))
            },
            reject: (err) => reject(err),
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { access_token, error: refreshError } =
          await refreshTokenFn(authStore.refreshToken!)

        if (refreshError || !access_token) {
          authStore.clearSession()
          return Promise.reject(error)
        }

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        processQueue(null, access_token)

        originalRequest.headers['Authorization'] = `Bearer ${access_token}`
        return apiClient(originalRequest)
      } catch (err) {
        processQueue(err, null)
        authStore.clearSession()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export interface ApiRequestOptions {
  key: string
  params?: Record<string, string | number | string[]>
  data?: any
  config?: AxiosRequestConfig
  backend?: keyof typeof BASE_URLS
}

export const apiRequest = async <T>({
  key,
  params = {},
  data = null,
  config = {},
  backend = 'supabase',
}: ApiRequestOptions): Promise<T> => {
  try {
    const endpointConfig = key
      .split('.')
      .reduce((acc: any, curr: string) => acc?.[curr], endpoints)

    if (!endpointConfig) {
      throw new Error(`Endpoint "${key}" no encontrado`)
    }

    let { method, url } = endpointConfig

    Object.keys(params).forEach((param) => {
      if (url.includes(`{${param}}`)) {
        url = url.replace(`{${param}}`, encodeURIComponent(String(params[param])))
        delete params[param]
      }
    })

    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      baseURL: BASE_URLS[backend] || BASE_URLS.supabase,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      ...config,
    }

    const response: AxiosResponse<T> = await apiClient(requestConfig)
    return response.data
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message)

    if (error.response?.data?.message === 'Invalid JWT') {
      const authStore = useAuthStore()
      authStore.clearSession()
    }

    throw error
  }
}
