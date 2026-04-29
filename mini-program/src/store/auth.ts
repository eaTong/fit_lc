import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  nickname: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: wx.getStorageSync('token') || null,
  user: wx.getStorageSync('user') || null,
  isLoggedIn: !!wx.getStorageSync('token'),

  setAuth: (token, user) => {
    wx.setStorageSync('token', token);
    wx.setStorageSync('user', user);
    set({ token, user, isLoggedIn: true });
  },

  clearAuth: () => {
    wx.removeStorageSync('token');
    wx.removeStorageSync('user');
    set({ token: null, user: null, isLoggedIn: false });
  }
}));