import { defineStore } from 'pinia'
import {
  login,
  logout,
  register,
  refreshToken,
  getSession,
} from '@auth/services/authFunctions'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),

  actions: {
    async login(email: string, password: string) {
      const { user, access_token, refresh_token, error } = await login(email, password)

      if (error) {
        console.error('Login error:', error)
        throw error
      }

      this.user = user
      this.accessToken = access_token || null
      this.refreshToken = refresh_token || null
    },

    async register(email: string, password: string) {
      const { user, access_token, refresh_token, error } = await register(email, password)

      if (error) {
        console.error('Register error:', error)
        throw error
      }

      this.user = user
      this.accessToken = access_token || null
      this.refreshToken = refresh_token || null
    },

    async refreshSession() {
      if (!this.refreshToken) return

      const { access_token, refresh_token, error } = await refreshToken(this.refreshToken)

      if (error) {
        console.error('Token refresh error:', error)
        this.clearSession()
        return
      }

      this.accessToken = access_token || null
      this.refreshToken = refresh_token || null
    },

    async fetchUser() {
      if (!this.accessToken) return null

      const { user, error } = await getSession(this.accessToken)

      if (error) {
        console.error('Get session error:', error)
        this.clearSession()
        return null
      }

      this.user = user
      return user
    },

    async logout() {
      if (this.accessToken) {
        await logout(this.accessToken)
      }
      this.clearSession()
    },

    clearSession() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
    },
  },

  persist: true,
})
