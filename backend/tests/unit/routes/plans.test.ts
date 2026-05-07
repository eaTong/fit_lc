import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import plansRouter from '../../../src/routes/plans';
import { cleanDatabase } from '../../fixtures/factories';

// Mock planRepository first (before planService which imports it)
jest.mock('../../../src/repositories/planRepository', () => ({
  planRepository: {
    findAll: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({ id: 1 }),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined)
  }
}));

// Mock planService
jest.mock('../../../src/services/planService', () => ({
  planService: {
    getUserPlans: jest.fn().mockResolvedValue([]),
    getPlan: jest.fn().mockResolvedValue(null),
    createPlan: jest.fn().mockResolvedValue(1),
    updatePlan: jest.fn().mockResolvedValue(undefined),
    deletePlan: jest.fn().mockResolvedValue(undefined),
    activatePlan: jest.fn().mockResolvedValue(undefined),
    adjustPlan: jest.fn().mockResolvedValue(undefined),
    recordExecution: jest.fn().mockResolvedValue(1),
    getPlanAnalysis: jest.fn().mockResolvedValue({}),
    updatePlanExercise: jest.fn().mockResolvedValue(undefined)
  }
}));

// Mock auth middleware to inject user
jest.mock('../../../src/middleware/auth', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { id: 1, email: 'test@test.com', roles: [] };
    next();
  }
}));

const app = express();
app.use(express.json());
app.use('/plans', plansRouter);

describe('plans routes', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('GET /plans', () => {
    it('should get user plans', async () => {
      const res = await request(app)
        .get('/plans')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('plans');
    });
  });

  describe('GET /plans/:id', () => {
    it('should return 404 when plan not found', async () => {
      const res = await request(app)
        .get('/plans/99999')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /plans/generate', () => {
    it('should generate plan with valid user profile', async () => {
      const userProfile = {
        name: 'Test Plan',
        goal: 'bulk',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        duration_weeks: 12
      };

      const res = await request(app)
        .post('/plans/generate')
        .set('Authorization', 'Bearer mock-token')
        .send({ userProfile });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('planId');
    });

    it('should return 400 when user profile is missing', async () => {
      const res = await request(app)
        .post('/plans/generate')
        .set('Authorization', 'Bearer mock-token')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for invalid user profile', async () => {
      const invalidProfile = {
        name: 'Test Plan',
        goal: 'invalid_goal'
        // missing required fields
      };

      const res = await request(app)
        .post('/plans/generate')
        .set('Authorization', 'Bearer mock-token')
        .send({ userProfile: invalidProfile });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should generate plan with exercises', async () => {
      const userProfile = {
        name: 'Test Plan',
        goal: 'bulk',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        duration_weeks: 12
      };
      const exercises = [
        { name: 'Bench Press', sets: 3, reps: '8-12' }
      ];

      const res = await request(app)
        .post('/plans/generate')
        .set('Authorization', 'Bearer mock-token')
        .send({ userProfile, exercises });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('planId');
    });
  });

  describe('PUT /plans/:id', () => {
    it('should update plan', async () => {
      const res = await request(app)
        .put('/plans/1')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Updated Plan' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('DELETE /plans/:id', () => {
    it('should delete plan', async () => {
      const res = await request(app)
        .delete('/plans/1')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 when plan not found', async () => {
      const res = await request(app)
        .delete('/plans/99999')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /plans/:id/activate', () => {
    it('should activate plan', async () => {
      const res = await request(app)
        .post('/plans/1/activate')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 when plan not found', async () => {
      const res = await request(app)
        .post('/plans/99999/activate')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /plans/:id/adjust', () => {
    it('should adjust plan', async () => {
      const res = await request(app)
        .post('/plans/1/adjust')
        .set('Authorization', 'Bearer mock-token')
        .send({ notes: 'Reduce weight due to fatigue' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('POST /plans/:id/executions', () => {
    it('should record execution', async () => {
      const res = await request(app)
        .post('/plans/1/executions')
        .set('Authorization', 'Bearer mock-token')
        .send({ date: '2024-01-15', completed: true });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('executionId');
    });
  });

  describe('GET /plans/:id/executions/analysis', () => {
    it('should get plan analysis', async () => {
      const res = await request(app)
        .get('/plans/1/executions/analysis')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('analysis');
    });
  });
});