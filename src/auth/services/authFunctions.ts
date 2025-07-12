import { apiRequest } from '@core/api/apiClient';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: any;
  expires_in: number;
  token_type: string;
}

const ANON_KEY = import.meta.env.VITE_SUPABASE_ANONKEY ?? 'tu-token-anon';

export async function register(email: string, password: string): Promise<{ user: any | null; access_token?: string; refresh_token?: string; error?: any }> {
  try {
    const data = await apiRequest<AuthResponse>({
        key: 'auth.signup',
        data: { email, password }, 
        config: {
            headers: { Authorization: `Bearer ${ANON_KEY}` },
        }
    });
    return { user: data.user, access_token: data.access_token, refresh_token: data.refresh_token };
  } catch (error: any) {
    return { user: null, error: error.response?.data || error.message };
  }
}

export async function login(email: string, password: string): Promise<{ user: any | null; access_token?: string; refresh_token?: string; error?: any }> {
  try {
    const data = await apiRequest<AuthResponse>({
        key:'auth.login', 
        data: { email, password }, 
        config: {
            headers: { Authorization: `Bearer ${ANON_KEY}` },
        }
    });
    return { user: data.user, access_token: data.access_token, refresh_token: data.refresh_token };
  } catch (error: any) {
    return { user: null, error: error.response?.data || error.message };
  }
}

export async function refreshToken(refreshToken: string): Promise<{ access_token?: string; refresh_token?: string; error?: any }> {
  try {
    const data = await apiRequest<AuthResponse>({
        key:'auth.refresh',
        data: { refresh_token: refreshToken }, 
        config: {
            headers: { Authorization: `Bearer ${ANON_KEY}` },
        }
    });
    return { access_token: data.access_token, refresh_token: data.refresh_token };
  } catch (error: any) {
    return { error: error.response?.data || error.message };
  }
}

export async function logout(accessToken: string): Promise<{ error?: any }> {
  try {
    await apiRequest({
        key:'auth.logout',
        config: {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    });
    return {};
  } catch (error: any) {
    return { error: error.response?.data || error.message };
  }
}

export async function getSession(accessToken: string): Promise<{ user?: any; error?: any }> {
  try {
    const user = await apiRequest<any>({
        key: 'auth.user',
        config: {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    });
    return { user };
  } catch (error: any) {
    return { error: error.response?.data || error.message };
  }
}