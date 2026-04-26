import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from '../../../src/stores/authStore';

// Mock authApi
vi.mock('../../../src/api/auth', () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
    getCurrentUser: vi.fn(),
  },
}));

import { authApi } from '../../../src/api/auth';

describe('useAuthStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Reset store state
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  describe('initial state', () => {
    it('should have null token and user initially', () => {
      const state = useAuthStore.getState();
      expect(state.token).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockResponse = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVzIjpbIm5vcm1hbCJdLCJpYXQiOjE3MDAwMDAwMDAwfQ.test',
        user: { id: 1, email: 'test@example.com' },
      };
      vi.mocked(authApi.login).mockResolvedValue(mockResponse);

      await useAuthStore.getState().login('test@example.com', 'password123');

      expect(authApi.login).toHaveBeenCalledWith('test@example.com', 'password123');
      const state = useAuthStore.getState();
      expect(state.token).toBe(mockResponse.token);
      expect(state.user?.email).toBe('test@example.com');
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle login failure with wrong password', async () => {
      vi.mocked(authApi.login).mockRejectedValue({
        response: { data: { error: '用户名或密码错误' } },
      });

      await expect(
        useAuthStore.getState().login('test@example.com', 'wrongpassword')
      ).rejects.toThrow();

      const state = useAuthStore.getState();
      expect(state.error).toBe('用户名或密码错误');
      expect(state.isAuthenticated).toBe(false);
    });

    it('should store token in localStorage on login success', async () => {
      // Use valid JWT format: header.payload.signature
      const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVzIjpbIm5vcm1hbCJdLCJpYXQiOjE3MDAwMDAwMDAwfQ.signature';
      const mockResponse = {
        token: validJwt,
        user: { id: 1, email: 'test@example.com' },
      };
      vi.mocked(authApi.login).mockResolvedValue(mockResponse);

      await useAuthStore.getState().login('test@example.com', 'password123');

      expect(localStorage.getItem('token')).toBe(validJwt);
    });
  });

  describe('register', () => {
    it('should register successfully', async () => {
      const mockResponse = {
        token: 'new-user-token',
        user: { id: 2, email: 'new@example.com' },
      };
      vi.mocked(authApi.register).mockResolvedValue(mockResponse);

      await useAuthStore.getState().register('new@example.com', 'password123');

      expect(authApi.register).toHaveBeenCalledWith('new@example.com', 'password123');
      const state = useAuthStore.getState();
      expect(state.token).toBe(mockResponse.token);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle registration failure', async () => {
      vi.mocked(authApi.register).mockRejectedValue({
        response: { data: { error: '邮箱已被注册' } },
      });

      await expect(
        useAuthStore.getState().register('existing@example.com', 'password123')
      ).rejects.toThrow();

      const state = useAuthStore.getState();
      expect(state.error).toBe('邮箱已被注册');
    });
  });

  describe('logout', () => {
    it('should clear token and user on logout', () => {
      localStorage.setItem('token', 'some-token');

      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.token).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('checkAuth', () => {
    it('should validate token and fetch current user', async () => {
      // Use valid JWT format for token parsing
      const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVzIjpbIm5vcm1hbCJdLCJpYXQiOjE3MDAwMDAwMDAwfQ.signature';
      localStorage.setItem('token', validJwt);
      const mockUser = { id: 1, email: 'test@example.com' };
      vi.mocked(authApi.getCurrentUser).mockResolvedValue({ user: mockUser });

      await useAuthStore.getState().checkAuth();

      expect(authApi.getCurrentUser).toHaveBeenCalled();
      const state = useAuthStore.getState();
      expect(state.user?.email).toBe('test@example.com');
      expect(state.isAuthenticated).toBe(true);
    });

    it('should clear token if getCurrentUser fails', async () => {
      localStorage.setItem('token', 'invalid-token');
      vi.mocked(authApi.getCurrentUser).mockRejectedValue(new Error('Unauthorized'));

      await useAuthStore.getState().checkAuth();

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('JWT token parsing', () => {
    it('should parse roles from JWT token payload', async () => {
      // This JWT has roles: ["admin"]
      const tokenWithRoles = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTcwMDAwMDAwMDB9.test';
      const mockResponse = {
        token: tokenWithRoles,
        user: { id: 1, email: 'admin@example.com' },
      };
      vi.mocked(authApi.login).mockResolvedValue(mockResponse);

      await useAuthStore.getState().login('admin@example.com', 'adminpass');

      const state = useAuthStore.getState();
      expect(state.user?.roles).toContain('admin');
    });
  });
});