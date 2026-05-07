import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import exercisesRouter from '../../../src/routes/exercises';
import { cleanDatabase } from '../../fixtures/factories';

// Mock prisma first - before exerciseRepository is imported
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    exercise: {
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test Exercise' }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Exercise' }),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Test Exercise' })
    },
    exerciseMuscle: {
      create: jest.fn().mockResolvedValue({ id: 1 }),
      deleteMany: jest.fn().mockResolvedValue({ count: 0 })
    },
    $transaction: jest.fn().mockImplementation(async (fn) => {
      const mockTx = {
        exercise: {
          create: jest.fn().mockResolvedValue({ id: 1, name: 'Test Exercise' }),
          update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Exercise' })
        },
        exerciseMuscle: {
          create: jest.fn().mockResolvedValue({ id: 1 }),
          deleteMany: jest.fn().mockResolvedValue({ count: 0 })
        }
      };
      return fn(mockTx);
    })
  }
}));

// Mock auth middleware to inject user
jest.mock('../../../src/middleware/auth', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { id: 1, email: 'test@test.com', roles: [] };
    next();
  }
}));

// Mock exerciseRepository
jest.mock('../../../src/repositories/exerciseRepository', () => ({
  exerciseRepository: {
    findAll: jest.fn().mockResolvedValue({ exercises: [], total: 0 }),
    findById: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({ id: 1, name: 'Test Exercise' }),
    update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Exercise' }),
    delete: jest.fn().mockResolvedValue(undefined)
  }
}));

const app = express();
app.use(express.json());
app.use('/exercises', exercisesRouter);

describe('exercises routes', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    // Reset mock implementations for exerciseRepository
    const exerciseRepo = require('../../../src/repositories/exerciseRepository').exerciseRepository;
    exerciseRepo.findAll.mockResolvedValue({ exercises: [], total: 0 });
    exerciseRepo.findById.mockResolvedValue(null);
    exerciseRepo.create.mockResolvedValue({ id: 1, name: 'Test Exercise' });
    exerciseRepo.update.mockResolvedValue({ id: 1, name: 'Updated Exercise' });
    exerciseRepo.delete.mockResolvedValue(undefined);
  });

  describe('GET /exercises', () => {
    it('should get exercises list', async () => {
      const res = await request(app)
        .get('/exercises')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should filter exercises by category', async () => {
      const res = await request(app)
        .get('/exercises?category=chest')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should filter exercises by equipment', async () => {
      const res = await request(app)
        .get('/exercises?equipment=barbell')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should filter exercises by difficulty', async () => {
      const res = await request(app)
        .get('/exercises?difficulty=beginner')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get('/exercises?page=1&pageSize=10')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });
  });

  describe('GET /exercises/:id', () => {
    it('should return 404 when exercise not found', async () => {
      const res = await request(app)
        .get('/exercises/99999')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /exercises', () => {
    it('should create exercise with valid data', async () => {
      const exerciseData = {
        name: 'Bench Press',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate'
      };

      const res = await request(app)
        .post('/exercises')
        .set('Authorization', 'Bearer mock-token')
        .send(exerciseData);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('exercise');
    });

    it('should return 400 when required fields missing', async () => {
      const res = await request(app)
        .post('/exercises')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Bench Press' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should create exercise with muscles', async () => {
      const exerciseData = {
        name: 'Bench Press',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate',
        muscles: [
          { muscleId: 1, role: 'agonist' }
        ]
      };

      const res = await request(app)
        .post('/exercises')
        .set('Authorization', 'Bearer mock-token')
        .send(exerciseData);

      expect(res.status).toBe(200);
    });
  });

  describe('PUT /exercises/:id', () => {
    it('should update exercise', async () => {
      const res = await request(app)
        .put('/exercises/1')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Updated Bench Press' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('exercise');
    });
  });

  describe('DELETE /exercises/:id', () => {
    it('should delete exercise', async () => {
      const res = await request(app)
        .delete('/exercises/1')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });
});