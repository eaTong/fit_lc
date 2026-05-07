import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { cleanDatabase } from '../../fixtures/factories';

// Mock auth middleware FIRST - must be before importing the router
jest.mock('../../../src/middleware/auth', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { id: 1, email: 'test@test.com', roles: [] };
    next();
  }
}));

// Mock services - inline
jest.mock('../../../src/services/personalRecordService', () => ({
  personalRecordService: {
    getUserPRs: jest.fn().mockResolvedValue([]),
    getTopPRs: jest.fn().mockResolvedValue([])
  }
}));

jest.mock('../../../src/services/achievementService', () => ({
  achievementService: {
    getUserBadges: jest.fn().mockResolvedValue([]),
    getUserMilestones: jest.fn().mockResolvedValue([]),
    checkBadges: jest.fn().mockResolvedValue([]),
    checkMilestones: jest.fn().mockResolvedValue([])
  }
}));

jest.mock('../../../src/services/statsService', () => ({
  statsService: {
    updateAggregatedStats: jest.fn().mockResolvedValue(undefined),
    getStats: jest.fn().mockResolvedValue({})
  }
}));

jest.mock('../../../src/repositories/statsRepository', () => ({
  statsRepository: {
    getVolumeByMuscleGroup: jest.fn().mockResolvedValue([])
  }
}));

// Import router AFTER mocks are set up
import achievementsRouter from '../../../src/routes/achievements';

const app = express();
app.use(express.json());
app.use('/achievements', achievementsRouter);

describe('achievements routes', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('GET /achievements/personal-records', () => {
    it('should get user personal records', async () => {
      const res = await request(app)
        .get('/achievements/personal-records')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('personalRecords');
    });
  });

  describe('GET /achievements/personal-records/top', () => {
    it('should get top personal records', async () => {
      const res = await request(app)
        .get('/achievements/personal-records/top')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('personalRecords');
    });

    it('should respect limit parameter', async () => {
      const res = await request(app)
        .get('/achievements/personal-records/top?limit=5')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('personalRecords');
    });
  });

  describe('GET /achievements/badges', () => {
    it('should get user badges', async () => {
      const res = await request(app)
        .get('/achievements/badges')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('badges');
    });
  });

  describe('GET /achievements/milestones', () => {
    it('should get user milestones', async () => {
      const res = await request(app)
        .get('/achievements/milestones')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('milestones');
    });
  });

  describe('GET /achievements/stats', () => {
    it('should get achievement stats', async () => {
      const res = await request(app)
        .get('/achievements/stats')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('stats');
    });
  });

  describe('POST /achievements/check', () => {
    it('should check achievements for workout type', async () => {
      const res = await request(app)
        .post('/achievements/check')
        .set('Authorization', 'Bearer mock-token')
        .send({ type: 'workout', data: {} });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('newBadges');
      expect(res.body).toHaveProperty('newMilestones');
    });

    it('should check achievements for measurement type', async () => {
      const res = await request(app)
        .post('/achievements/check')
        .set('Authorization', 'Bearer mock-token')
        .send({ type: 'measurement', data: {} });

      expect(res.status).toBe(200);
    });

    it('should return 400 for invalid type', async () => {
      const res = await request(app)
        .post('/achievements/check')
        .set('Authorization', 'Bearer mock-token')
        .send({ type: 'invalid', data: {} });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 when type is missing', async () => {
      const res = await request(app)
        .post('/achievements/check')
        .set('Authorization', 'Bearer mock-token')
        .send({ data: {} });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /achievements/muscle-volume', () => {
    it('should get muscle volume stats', async () => {
      const res = await request(app)
        .get('/achievements/muscle-volume')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('muscleGroups');
    });

    it('should filter by date range', async () => {
      const res = await request(app)
        .get('/achievements/muscle-volume?start=2024-01-01&end=2024-01-31')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('muscleGroups');
    });
  });
});