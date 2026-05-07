import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import usersRouter from '../../../src/routes/users';
import { cleanDatabase } from '../../fixtures/factories';

// Mock auth middleware to inject user
jest.mock('../../../src/middleware/auth', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { id: 1, email: 'test@test.com', roles: [] };
    next();
  }
}));

// Mock userService - inline implementation
jest.mock('../../../src/services/userService', () => ({
  userService: {
    getProfile: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com', nickname: 'Test User' }),
    updateProfile: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com', nickname: 'Updated User' }),
    changePassword: jest.fn().mockResolvedValue(undefined),
    getMetrics: jest.fn().mockResolvedValue({ metrics: [], total: 0 }),
    addMetric: jest.fn().mockResolvedValue({ id: 1 }),
    deleteAccount: jest.fn().mockResolvedValue(undefined),
    getMeasurementsLatest: jest.fn().mockResolvedValue({}),
    getMeasurementsHistory: jest.fn().mockResolvedValue({ measurements: [], total: 0 })
  }
}));

// Mock coachConfigService
jest.mock('../../../src/services/coachConfigService', () => ({
  getCoachConfig: jest.fn().mockResolvedValue({ enabled: true }),
  updateCoachConfig: jest.fn().mockResolvedValue({ enabled: true })
}));

// Mock uploadAvatar
jest.mock('../../../src/config/oss', () => ({
  uploadAvatar: jest.fn().mockResolvedValue('https://example.com/avatar.jpg')
}));

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

describe('users routes', () => {
  const userService = require('../../../src/services/userService').userService;

  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    // Reset mock implementations
    userService.getProfile.mockResolvedValue({ id: 1, email: 'test@test.com', nickname: 'Test User' });
    userService.updateProfile.mockResolvedValue({ id: 1, email: 'test@test.com', nickname: 'Updated User' });
    userService.changePassword.mockResolvedValue(undefined);
    userService.getMetrics.mockResolvedValue({ metrics: [], total: 0 });
    userService.addMetric.mockResolvedValue({ id: 1 });
    userService.deleteAccount.mockResolvedValue(undefined);
    userService.getMeasurementsLatest.mockResolvedValue({});
    userService.getMeasurementsHistory.mockResolvedValue({ measurements: [], total: 0 });
  });

  describe('GET /users/me/profile', () => {
    it('should get user profile', async () => {
      const res = await request(app)
        .get('/users/me/profile')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });
  });

  describe('PUT /users/me/profile', () => {
    it('should update user profile', async () => {
      const res = await request(app)
        .put('/users/me/profile')
        .set('Authorization', 'Bearer mock-token')
        .send({ nickname: 'Updated User', height: 175 });

      expect(res.status).toBe(200);
    });

    it('should update profile with gender', async () => {
      const res = await request(app)
        .put('/users/me/profile')
        .set('Authorization', 'Bearer mock-token')
        .send({ nickname: 'Updated User', gender: 'male' });

      expect(res.status).toBe(200);
    });
  });

  describe('PUT /users/me/password', () => {
    it('should change password', async () => {
      const res = await request(app)
        .put('/users/me/password')
        .set('Authorization', 'Bearer mock-token')
        .send({ oldPassword: 'oldpassword', newPassword: 'newpassword' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 400 when old password is wrong', async () => {
      userService.changePassword.mockRejectedValueOnce(new Error('Invalid old password'));

      const res = await request(app)
        .put('/users/me/password')
        .set('Authorization', 'Bearer mock-token')
        .send({ oldPassword: 'wrongpassword', newPassword: 'newpassword' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /users/me/avatar', () => {
    it('should upload avatar', async () => {
      const res = await request(app)
        .post('/users/me/avatar')
        .set('Authorization', 'Bearer mock-token')
        .attach('avatar', Buffer.from('fake-image'), 'avatar.jpg');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('url');
    });

    it('should return 400 when no file provided', async () => {
      const res = await request(app)
        .post('/users/me/avatar')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(400);
    });
  });

  describe('GET /users/me/metrics', () => {
    it('should get user metrics', async () => {
      const res = await request(app)
        .get('/users/me/metrics')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('metrics');
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get('/users/me/metrics?page=1&limit=10')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });
  });

  describe('POST /users/me/metrics', () => {
    it('should add metric', async () => {
      const res = await request(app)
        .post('/users/me/metrics')
        .set('Authorization', 'Bearer mock-token')
        .send({ date: '2024-01-15', weight: 70.5, bodyFat: 15 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('DELETE /users/me/account', () => {
    it('should delete account with correct password', async () => {
      const res = await request(app)
        .delete('/users/me/account')
        .set('Authorization', 'Bearer mock-token')
        .send({ password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('GET /users/me/measurements/latest', () => {
    it('should get latest measurements', async () => {
      const res = await request(app)
        .get('/users/me/measurements/latest')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });
  });

  describe('GET /users/me/measurements/history', () => {
    it('should get measurements history', async () => {
      const res = await request(app)
        .get('/users/me/measurements/history?bodyPart=weight')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should return 400 when bodyPart is missing', async () => {
      const res = await request(app)
        .get('/users/me/measurements/history')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(400);
    });
  });

  describe('GET /users/coach-config', () => {
    it('should get coach config', async () => {
      const res = await request(app)
        .get('/users/coach-config')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('PUT /users/coach-config', () => {
    it('should update coach config', async () => {
      const res = await request(app)
        .put('/users/coach-config')
        .set('Authorization', 'Bearer mock-token')
        .send({ enabled: false, reminderTime: '09:00' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });
});