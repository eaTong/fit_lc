import { jest } from '@jest/globals';

// Mock userRepository
const mockUserRepository = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn()
};

// Mock bcrypt and jwt
jest.unstable_mockModule('bcrypt', () => ({
  default: {
    hash: jest.fn().mockResolvedValue('hashed_password'),
    compare: jest.fn().mockResolvedValue(true)
  }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn().mockReturnValue('mock_token')
  }
}));

jest.unstable_mockModule('../src/repositories/userRepository.js', () => ({
  userRepository: mockUserRepository
}));

describe('Auth Service', () => {
  let authService;

  beforeAll(async () => {
    const module = await import('../src/services/authService.js');
    authService = module.authService;
  });

  describe('register', () => {
    it('should register new user successfully', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(1);

      const result = await authService.register('test@example.com', 'password123');

      expect(result).toHaveProperty('token', 'mock_token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw error if email exists', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({ id: 1 });

      await expect(authService.register('test@example.com', 'password123'))
        .rejects.toThrow('Email already registered');
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password'
      });

      const result = await authService.login('test@example.com', 'password123');

      expect(result).toHaveProperty('token', 'mock_token');
    });

    it('should throw error with invalid email', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(authService.login('wrong@example.com', 'password123'))
        .rejects.toThrow('Invalid credentials');
    });
  });
});