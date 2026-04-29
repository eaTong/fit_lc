import { request } from './request';

export interface WechatLoginRequest {
  code: string;
}

export interface WechatLoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    avatar?: string;
  };
}

export async function wechatLogin(code: string): Promise<WechatLoginResponse> {
  return request<WechatLoginResponse>({
    url: '/auth/wechat',
    method: 'POST',
    data: { code }
  });
}

export async function getCurrentUser() {
  return request<WechatLoginResponse['user']>({
    url: '/auth/me'
  });
}