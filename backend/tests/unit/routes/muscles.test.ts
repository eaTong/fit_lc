import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import musclesRouter from '../../../src/routes/muscles';
import { cleanDatabase } from '../../fixtures/factories';

// Mock auth middleware to inject user
jest.mock('../../../src/middleware/auth', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { id: 1, email: 'test@test.com', roles: [] };
    next();
  }
}));

// Mock muscleRepository with inline implementation
jest.mock('../../../src/repositories/muscleRepository', () => {
  const mockFindById = jest.fn();
  const mockUpdate = jest.fn();
  return {
    muscleRepository: {
      getHierarchy: jest.fn().mockResolvedValue([]),
      findById: mockFindById,
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test Muscle', group: 'chest' }),
      update: mockUpdate,
      delete: jest.fn().mockResolvedValue(undefined)
    },
    __mockFindById: mockFindById,
    __mockUpdate: mockUpdate
  };
});

// Get references to mock functions for resetting
const mockModule = require('../../../src/repositories/muscleRepository');

const app = express();
app.use(express.json());
app.use('/muscles', musclesRouter);

describe('muscles routes', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    // Reset mock implementations
    mockModule.muscleRepository.getHierarchy.mockResolvedValue([]);
    mockModule.__mockFindById.mockResolvedValue(null);
    mockModule.muscleRepository.create.mockResolvedValue({ id: 1, name: 'Test Muscle', group: 'chest' });
    mockModule.__mockUpdate.mockImplementation((id, data) => {
      if (id === 99999) {
        return Promise.resolve(null);
      }
      return Promise.resolve({ id, ...data });
    });
    mockModule.muscleRepository.delete.mockResolvedValue(undefined);
  });

  describe('GET /muscles', () => {
    it('should get muscles hierarchy', async () => {
      const res = await request(app)
        .get('/muscles')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('hierarchy');
    });
  });

  describe('GET /muscles/hierarchy', () => {
    it('should get muscles hierarchy via hierarchy endpoint', async () => {
      const res = await request(app)
        .get('/muscles/hierarchy')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('hierarchy');
    });
  });

  describe('GET /muscles/:id', () => {
    it('should return 400 for invalid muscle ID', async () => {
      const res = await request(app)
        .get('/muscles/invalid')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 404 when muscle not found', async () => {
      mockModule.__mockFindById.mockResolvedValueOnce(null);

      const res = await request(app)
        .get('/muscles/99999')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /muscles', () => {
    it('should create muscle with valid data', async () => {
      const res = await request(app)
        .post('/muscles')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Upper Chest', group: 'chest' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('muscle');
    });

    it('should return 400 when name is missing', async () => {
      const res = await request(app)
        .post('/muscles')
        .set('Authorization', 'Bearer mock-token')
        .send({ group: 'chest' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 when group is missing', async () => {
      const res = await request(app)
        .post('/muscles')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Upper Chest' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /muscles/:id', () => {
    it('should update muscle', async () => {
      const res = await request(app)
        .put('/muscles/1')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Updated Muscle Name' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('muscle');
    });

    it('should return 404 when muscle not found', async () => {
      const res = await request(app)
        .put('/muscles/99999')
        .set('Authorization', 'Bearer mock-token')
        .send({ name: 'Updated Muscle' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /muscles/:id', () => {
    it('should delete muscle', async () => {
      const res = await request(app)
        .delete('/muscles/1')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });
});