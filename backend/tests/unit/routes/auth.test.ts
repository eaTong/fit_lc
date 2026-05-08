import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import bcrypt from 'bcrypt';
import authRouter from '../../../src/routes/auth';
import { cleanDatabase, createTestUser } from '../../fixtures/factories';
import prisma from '../../../src/config/prisma';

describe('auth routes', () => {
  beforeAll(async () => {
    // Ensure normal role exists
    const role = await prisma.role.findUnique({ where: { name: 'normal' } });
    if (!role) {
      await prisma.role.create({ data: { name: 'normal' } });
    }
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Use a transaction to clean - must delete child records first
    await prisma.$transaction(async (tx) => {
      // Delete all user-owned records first (tables without cascade delete on user_id)
      await tx.workout.deleteMany();
      await tx.bodyMeasurement.deleteMany();
      await tx.workoutPlan.deleteMany();
      // Now delete user-related linkage tables
      await tx.triggerEvent.deleteMany();
      await tx.trendPrediction.deleteMany();
      await tx.aggregatedStats.deleteMany();
      await tx.personalRecord.deleteMany();
      await tx.bodyMetrics.deleteMany();
      await tx.coachConfig.deleteMany();
      await tx.userContext.deleteMany();
      await tx.userProfile.deleteMany();
      await tx.userRole.deleteMany();
      // Finally delete users
      await tx.user.deleteMany();
    });

    // Re-create the normal role after cleaning
    const role = await prisma.role.findUnique({ where: { name: 'normal' } });
    if (!role) {
      await prisma.role.create({ data: { name: 'normal' } });
    }
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
      expect(res.body.error).toContain('邮箱已被注册');
    });
  });

  describe('POST /auth/login', () => {
    it('should login with valid credentials', async () => {
      // First register
      await request(app)
        .post('/auth/register')
        .send({ email: 'login@example.com', password: 'password123' });

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
      // First register with correct password
      await request(app)
        .post('/auth/register')
        .send({ email: 'login2@example.com', password: 'password123' });

      // Try with wrong password
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'login2@example.com', password: 'wrongpassword' });

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

// Create app at describe level for reuse
const app = express();
app.use(express.json());
app.use('/auth', authRouter);
