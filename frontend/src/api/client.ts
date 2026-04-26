import axios from 'axios';
import { useToastStore } from '../stores/toastStore';

const API_BASE = '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加 token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理 401、网络错误和通用错误提示
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 登录/注册接口的 401 不跳转，让调用方处理错误提示
      const isAuthEndpoint = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
      if (!isAuthEndpoint) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (!error.response) {
      // 网络错误或服务器不可用
      useToastStore.getState().addToast('网络错误，请检查网络连接', 'error');
    } else {
      // API 错误，显示状态码和错误信息
      const status = error.response.status;
      const message = error.response.data?.error || '请求失败';
      useToastStore.getState().addToast(message, 'error', status);
    }
    return Promise.reject(error);
  }
);

export default client;