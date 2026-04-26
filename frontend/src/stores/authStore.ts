import { create } from 'zustand';
import { authApi } from '../api/auth';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authApi.login(email, password);
      // 解析 token 获取 roles (JWT 使用 base64url 编码)
      const base64 = token.split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
      const payload = JSON.parse(atob(padded));
      const roles = payload.roles || [];
      localStorage.setItem('token', token);
      set({ token, user: { ...user, roles }, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.error || '登录失败', isLoading: false });
      throw err;
    }
  },

  register: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authApi.register(email, password);
      localStorage.setItem('token', token);
      set({ token, user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.error || '注册失败', isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }
    try {
      const { user } = await authApi.getCurrentUser();
      // 解析 token 获取 roles (JWT 使用 base64url 编码)
      const base64 = token.split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
      const payload = JSON.parse(atob(padded));
      const roles = payload.roles || [];
      set({ user: { ...user, roles }, isAuthenticated: true });
    } catch {
      localStorage.removeItem('token');
      set({ isAuthenticated: false });
    }
  },
}));