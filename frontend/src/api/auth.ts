import client from './client';
import type { AuthResponse, User } from '../types';

export const authApi = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/auth/register', { email, password });
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  async getCurrentUser(): Promise<{ user: User }> {
    const { data } = await client.get<{ user: User }>('/auth/me');
    return data;
  },
};