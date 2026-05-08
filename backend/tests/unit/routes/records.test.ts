import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import recordsRouter from '../../../src/routes/records';
import { cleanDatabase } from '../../fixtures/factories';

// Mock repositories first (before recordService)
jest.mock('../../../src/repositories/workoutRepository', () => ({
  workoutRepository: {
    findByUserAndDateRange: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(undefined),
  }
}));

jest.mock('../../../src/repositories/measurementRepository', () => ({
  measurementRepository: {
    findByUserAndDateRange: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null),
    findByDate: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(undefined),
  }
}));

jest.mock('../../../src/repositories/statsRepository', () => ({
  statsRepository: {
    getUserStats: jest.fn().mockResolvedValue({ totalWorkouts: 0, totalMeasurements: 0 }),
  }
}));

// Mock auth middleware - inject req.user directly
const mockAuth = (req: any, res: any, next: any) => {
  req.user = { id: 1, email: 'test@test.com', roles: [] };
  next();
};

// Mock recordService
jest.mock('../../../src/services/recordService', () => ({
  recordService: {
    getWorkouts: jest.fn().mockResolvedValue([]),
    getMeasurements: jest.fn().mockResolvedValue([]),
    getStats: jest.fn().mockResolvedValue({ totalWorkouts: 0, totalMeasurements: 0 }),
    deleteWorkout: jest.fn().mockImplementation((id, userId) => {
      if (id === 99999) return Promise.reject(new Error('训练记录不存在'));
      return Promise.resolve(undefined);
    }),
    deleteMeasurement: jest.fn().mockImplementation((id, userId) => {
      if (id === 99999) return Promise.reject(new Error('围度记录不存在'));
      return Promise.resolve(undefined);
    }),
    restoreWorkout: jest.fn().mockImplementation((id, userId) => {
      if (id === 99999) return Promise.reject(new Error('训练记录不存在'));
      return Promise.resolve(undefined);
    }),
    restoreMeasurement: jest.fn().mockImplementation((id, userId) => {
      if (id === 99999) return Promise.reject(new Error('围度记录不存在'));
      return Promise.resolve(undefined);
    }),
    getMeasurementByDate: jest.fn().mockResolvedValue(null),
    upsertMeasurementItems: jest.fn().mockResolvedValue(undefined),
    createMeasurementWithItems: jest.fn().mockResolvedValue({ id: 1, date: new Date() }),
    getMeasurement: jest.fn().mockResolvedValue({ id: 1, date: new Date(), items: [] })
  }
}));

const app = express();
app.use(express.json());
app.use('/records', mockAuth, recordsRouter);

describe('records routes', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('GET /records/workouts', () => {
    it('should get workouts for user', async () => {
      const res = await request(app)
        .get('/records/workouts')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('workouts');
    });

    it('should filter workouts by date range', async () => {
      const res = await request(app)
        .get('/records/workouts?start=2024-01-01&end=2024-01-31')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('workouts');
    });
  });

  describe('GET /records/measurements', () => {
    it('should get measurements for user', async () => {
      const res = await request(app)
        .get('/records/measurements')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('measurements');
    });

    it('should filter measurements by date range', async () => {
      const res = await request(app)
        .get('/records/measurements?start=2024-01-01&end=2024-01-31')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('measurements');
    });
  });

  describe('POST /records/measurement', () => {
    it('should create measurement with single body_part/value', async () => {
      const res = await request(app)
        .post('/records/measurement')
        .set('Authorization', 'Bearer mock-token')
        .send({ date: '2024-01-15', body_part: 'weight', value: 70.5 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('measurement');
    });

    it('should create measurement with measurements array', async () => {
      const res = await request(app)
        .post('/records/measurement')
        .set('Authorization', 'Bearer mock-token')
        .send({
          date: '2024-01-15',
          measurements: [
            { body_part: 'chest', value: 100 },
            { body_part: 'waist', value: 80 }
          ]
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('measurement');
    });

    it('should return 400 if no body_part/value or measurements provided', async () => {
      const res = await request(app)
        .post('/records/measurement')
        .set('Authorization', 'Bearer mock-token')
        .send({ date: '2024-01-15' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /records/stats', () => {
    it('should get stats for user', async () => {
      const res = await request(app)
        .get('/records/stats')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /records/workout/:id', () => {
    it('should delete workout', async () => {
      const res = await request(app)
        .delete('/records/workout/1')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent workout', async () => {
      const res = await request(app)
        .delete('/records/workout/99999')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /records/measurement/:id', () => {
    it('should delete measurement', async () => {
      const res = await request(app)
        .delete('/records/measurement/1')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent measurement', async () => {
      const res = await request(app)
        .delete('/records/measurement/99999')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /records/workout/:id/restore', () => {
    it('should restore workout', async () => {
      const res = await request(app)
        .post('/records/workout/1/restore')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent workout', async () => {
      const res = await request(app)
        .post('/records/workout/99999/restore')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /records/measurement/:id/restore', () => {
    it('should restore measurement', async () => {
      const res = await request(app)
        .post('/records/measurement/1/restore')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent measurement', async () => {
      const res = await request(app)
        .post('/records/measurement/99999/restore')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
    });
  });
});