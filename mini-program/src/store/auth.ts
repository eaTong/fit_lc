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

// 类型守卫函数
function isValidUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.nickname === 'string';
}

function isValidToken(token: any): token is string {
  return typeof token === 'string' && token.length > 0;
}

export const useAuthStore = create<AuthState>((set) => {
  // 从 storage 恢复状态时进行类型检查
  const storedToken = wx.getStorageSync('token');
  const storedUser = wx.getStorageSync('user');

  const token = isValidToken(storedToken) ? storedToken : null;
  const user = isValidUser(storedUser) ? storedUser : null;

  return {
    token,
    user,
    isLoggedIn: !!token,

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
  };
});