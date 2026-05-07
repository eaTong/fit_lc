import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import adminExercisesRouter from '../../../src/routes/adminExercises';
import { cleanDatabase } from '../../fixtures/factories';

// Mock auth middleware to inject user with admin role
jest.mock('../../../src/middleware/auth', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { id: 1, email: 'admin@test.com', roles: ['admin'] };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => {
    if (!req.user?.roles?.includes('admin')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
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

// Mock exerciseVariantRepository
jest.mock('../../../src/repositories/exerciseVariantRepository', () => ({
  exerciseVariantRepository: {
    findByExerciseId: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({ id: 1 }),
    update: jest.fn().mockResolvedValue({ id: 1 }),
    delete: jest.fn().mockResolvedValue(undefined)
  }
}));

// Mock exerciseAIService
jest.mock('../../../src/services/exerciseAIService', () => ({
  exerciseAIService: {
    generateExerciseDetails: jest.fn().mockResolvedValue({
      description: 'Generated description',
      steps: 'Generated steps'
    })
  }
}));

const app = express();
app.use(express.json());
app.use('/admin/exercises', adminExercisesRouter);

describe('adminExercises routes', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('GET /admin/exercises', () => {
    it('should get exercises list', async () => {
      const res = await request(app)
        .get('/admin/exercises')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should filter by category', async () => {
      const res = await request(app)
        .get('/admin/exercises?category=chest')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should filter by equipment', async () => {
      const res = await request(app)
        .get('/admin/exercises?equipment=barbell')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should filter by difficulty', async () => {
      const res = await request(app)
        .get('/admin/exercises?difficulty=beginner')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });

    it('should filter by status', async () => {
      const res = await request(app)
        .get('/admin/exercises?status=published')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });
  });

  describe('POST /admin/exercises', () => {
    it('should create exercise with valid data', async () => {
      const exerciseData = {
        name: 'Bench Press',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate'
      };

      const res = await request(app)
        .post('/admin/exercises')
        .set('Authorization', 'Bearer mock-token')
        .send(exerciseData);

      expect(res.status).toBe(200);
    });

    it('should return 400 for invalid category', async () => {
      const res = await request(app)
        .post('/admin/exercises')
        .set('Authorization', 'Bearer mock-token')
        .send({
          name: 'Test Exercise',
          category: 'invalid_category',
          equipment: 'barbell',
          difficulty: 'beginner'
        });

      expect(res.status).toBe(400);
    });

    it('should return 400 when required fields missing', async () => {
      const res = await request(app)
        .post('/admin/exercises')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Test Exercise' });

      expect(res.status).toBe(400);
    });

    it('should create exercise with muscles', async () => {
      const exerciseData = {
        name: 'Bench Press',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate',
        muscles: [{ muscleId: 1, role: 'agonist' }]
      };

      const res = await request(app)
        .post('/admin/exercises')
        .set('Authorization', 'Bearer mock-token')
        .send(exerciseData);

      expect(res.status).toBe(200);
    });
  });

  describe('PUT /admin/exercises/:id', () => {
    it('should update exercise', async () => {
      const res = await request(app)
        .put('/admin/exercises/1')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Updated Bench Press' });

      expect(res.status).toBe(200);
    });

    it('should return 400 for invalid data', async () => {
      const res = await request(app)
        .put('/admin/exercises/1')
        .set('Authorization', 'Bearer mock-token')
        .send({ category: 'invalid' });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /admin/exercises/:id', () => {
    it('should delete exercise', async () => {
      const res = await request(app)
        .delete('/admin/exercises/1')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('PATCH /admin/exercises/:id/publish', () => {
    it('should publish exercise', async () => {
      const res = await request(app)
        .patch('/admin/exercises/1/publish')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });
  });

  describe('POST /admin/exercises/generate', () => {
    it('should generate exercise details with AI', async () => {
      const res = await request(app)
        .post('/admin/exercises/generate')
        .set('Authorization', 'Bearer mock-token')
        .send({
          name: 'Squat',
          category: 'legs',
          equipment: 'barbell',
          difficulty: 'intermediate'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('description');
    });

    it('should return 400 when required fields missing', async () => {
      const res = await request(app)
        .post('/admin/exercises/generate')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Squat' });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /admin/exercises/:id/variants', () => {
    it('should get exercise variants', async () => {
      const res = await request(app)
        .get('/admin/exercises/1/variants')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });
  });

  describe('POST /admin/exercises/:id/variants', () => {
    it('should add variant relation', async () => {
      const res = await request(app)
        .post('/admin/exercises/1/variants')
        .set('Authorization', 'Bearer mock-token')
        .send({
          variantId: 2,
          variantType: 'equipment',
          differenceNotes: 'Uses dumbbells instead'
        });

      expect(res.status).toBe(200);
    });

    it('should return 400 for invalid variant data', async () => {
      const res = await request(app)
        .post('/admin/exercises/1/variants')
        .set('Authorization', 'Bearer mock-token')
        .send({ variantId: 0 });

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /admin/exercises/variants/:id', () => {
    it('should update variant relation', async () => {
      const res = await request(app)
        .put('/admin/exercises/variants/1')
        .set('Authorization', 'Bearer mock-token')
        .send({ variantType: 'difficulty' });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /admin/exercises/variants/:id', () => {
    it('should delete variant relation', async () => {
      const res = await request(app)
        .delete('/admin/exercises/variants/1')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });
});