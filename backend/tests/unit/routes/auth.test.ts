import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import authRouter from '../../../src/routes/auth';
import { cleanDatabase } from '../../fixtures/factories';
import prisma from '../../../src/config/prisma';

// Mock prisma to avoid database connections
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com', passwordHash: 'hash' }),
      findUnique: jest.fn().mockResolvedValue(null),
      findFirst: jest.fn().mockResolvedValue(null),
    },
    role: {
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'normal' }),
    },
    userRole: {
      create: jest.fn().mockResolvedValue({ id: 1 }),
    },
    $transaction: jest.fn((fn) => fn({
      user: {
        create: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com', passwordHash: 'hash' }),
        findUnique: jest.fn().mockResolvedValue(null),
      },
      role: {
        findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'normal' }),
      },
      userRole: {
        create: jest.fn().mockResolvedValue({ id: 1 }),
      }
    })),
    $disconnect: jest.fn()
  }
}));

// Mock userRepository
jest.mock('../../../src/repositories/userRepository', () => ({
  userRepository: {
    findByEmail: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(null),
  }
}));

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('auth routes', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should register new user successfully', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.email).toBe('test@example.com');
    });

    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({ password: 'password123' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({ email: 'test@example.com' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for duplicate email', async () => {
      // First register
      await request(app)
        .post('/auth/register')
        .send({ email: 'duplicate@example.com', password: 'password123' });

      // Second register with same email
      const res = await request(app)
        .post('/auth/register')
        .send({ email: 'duplicate@example.com', password: 'password456' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Create user for login tests
      await request(app)
        .post('/auth/register')
        .send({ email: 'login@example.com', password: 'password123' });
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'login@example.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.email).toBe('login@example.com');
    });

    it('should return 401 for invalid email', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 401 for invalid password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'login@example.com', password: 'wrongpassword' });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ password: 'password123' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'login@example.com' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});