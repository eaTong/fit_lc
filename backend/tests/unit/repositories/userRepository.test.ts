import { describe, it, expect, beforeEach } from '@jest/globals';
import { userRepository } from '../../../src/repositories/userRepository';

// Mock the prisma module before importing repository
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    userRole: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    role: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

// Import after mock
import { default as prisma } from '../../../src/config/prisma';

describe('UserRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user with email and password hash', async () => {
      const email = `test-${Date.now()}@example.com`;
      const passwordHash = 'hashedPassword123';

      const mockUser = {
        id: 1,
        email,
        passwordHash,
        nickname: 'Test User',
        roles: [],
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const user = await userRepository.create(email, passwordHash);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { email, passwordHash },
      });
      expect(user).toBeDefined();
      expect(user.email).toBe(email);
      expect(user.passwordHash).toBe(passwordHash);
    });

    it('should throw error for duplicate email', async () => {
      const email = `duplicate-${Date.now()}@example.com`;
      const passwordHash = 'hashedPassword123';

      (prisma.user.create as jest.Mock).mockRejectedValue(new Error('Unique constraint failed'));

      await expect(userRepository.create(email, passwordHash)).rejects.toThrow();
    });
  });

  describe('findByEmail', () => {
    it('should find user by email and include roles', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash: 'hash',
        nickname: 'Test',
        roles: [{ role: { name: 'normal' } }],
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const found = await userRepository.findByEmail('test@example.com');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        include: { roles: { include: { role: true } } },
      });
      expect(found).toBeDefined();
      expect(found?.email).toBe('test@example.com');
    });

    it('should return null for non-existent email', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const found = await userRepository.findByEmail('nonexistent@example.com');

      expect(found).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find user by id and include roles', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash: 'hash',
        nickname: 'Test',
        roles: [{ role: { name: 'normal' } }],
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const found = await userRepository.findById(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { roles: { include: { role: true } } },
      });
      expect(found).toBeDefined();
      expect(found?.id).toBe(1);
    });

    it('should return null for non-existent id', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const found = await userRepository.findById(999999);

      expect(found).toBeNull();
    });
  });

  describe('updatePassword', () => {
    it('should update user password', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash: 'newHash',
      };

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const updated = await userRepository.updatePassword(1, 'newHash');

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { passwordHash: 'newHash' },
      });
      expect(updated.passwordHash).toBe('newHash');
    });

    it('should throw error for non-existent user', async () => {
      (prisma.user.update as jest.Mock).mockRejectedValue(new Error('Record not found'));

      await expect(userRepository.updatePassword(999999, 'newHash')).rejects.toThrow();
    });
  });
});