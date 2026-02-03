export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

const getAuthHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') {
    return {};
  }
  const token = localStorage.getItem('access_token');
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  return response.json() as Promise<T>;
};

export const register = (payload: RegisterPayload) =>
  request<ApiUser>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const login = (payload: LoginPayload) =>
  request<TokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const me = () => request<ApiUser>('/users/me');
