import Taro from '@tarojs/taro';

const BASE_URL = 'http://localhost:3000/api';

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, string>;
}

export async function request<T = any>(options: RequestOptions): Promise<T> {
  const { url, method = 'GET', data, params } = options;

  let fullUrl = `${BASE_URL}${url}`;
  if (params) {
    const queryString = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    fullUrl += `?${queryString}`;
  }

  const token = wx.getStorageSync('token');

  const header: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: fullUrl,
      method,
      data,
      header,
      success: (res) => {
        if (res.statusCode === 401) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('user');
          wx.reLaunch({ url: '/pages/chat/index' });
          reject(new Error('Unauthorized'));
          return;
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else {
          reject(new Error((res.data as any)?.message || 'Request failed'));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}