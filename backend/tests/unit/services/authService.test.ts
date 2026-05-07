import { describe, it, expect, beforeEach } from '@jest/globals';

// Mock prisma first - before any imports
const mockPrisma = {
  $transaction: jest.fn(),
  user: {
    create: jest.fn(),
    findUnique: jest.fn()
  },
  role: {
    findUnique: jest.fn()
  },
  userRole: {
    create: jest.fn()
  }
};

jest.mock('../../../src/config/prisma', () => mockPrisma);

// Mock repositories
jest.mock('../../../src/repositories/userRepository', () => ({
  userRepository: {
    findByEmail: jest.fn(),
    findById: jest.fn()
  }
}));

jest.mock('../../../src/repositories/roleRepository', () => ({
  roleRepository: {
    findByName: jest.fn()
  }
}));

import { authService } from '../../../src/services/authService';
import bcrypt from 'bcrypt';

const mockUserRepository = require('../../../src/repositories/userRepository').userRepository;

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register new user successfully', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        createdAt: new Date()
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockPrisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          user: { create: jest.fn().mockResolvedValue(mockUser) },
          role: { findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'normal' }) },
          userRole: { create: jest.fn().mockResolvedValue({}) }
        };
        return fn(tx);
      });

      const result = await authService.register('test@example.com', 'password123');

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw error for duplicate email', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({ id: 1, email: 'test@example.com' });

      await expect(
        authService.register('test@example.com', 'password123')
      ).rejects.toThrow('邮箱已被注册');
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      const passwordHash = await bcrypt.hash('password123', 10);
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash,
        roles: [{ role: { name: 'normal' } }]
      };
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await authService.login('test@example.com', 'password123');

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw error for invalid email', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login('nonexistent@example.com', 'password123')
      ).rejects.toThrow('无效的凭据');
    });

    it('should throw error for invalid password', async () => {
      const passwordHash = await bcrypt.hash('password123', 10);
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash,
        roles: [{ role: { name: 'normal' } }]
      };
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(
        authService.login('test@example.com', 'wrongpassword')
      ).rejects.toThrow('无效的凭据');
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await authService.getCurrentUser(1);

      expect(result).toEqual(mockUser);
    });

    it('should throw error for non-existent user', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(
        authService.getCurrentUser(999)
      ).rejects.toThrow('用户不存在');
    });
  });

  describe('generateToken', () => {
    it('should generate valid JWT token', () => {
      const token = authService.generateToken(1, 'test@example.com', ['normal']);

      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });
  });
});