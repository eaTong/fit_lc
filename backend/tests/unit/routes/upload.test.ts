import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import uploadRouter from '../../../src/routes/upload';
import { cleanDatabase } from '../../fixtures/factories';

// Mock OSS upload functions
jest.mock('../../../src/config/oss', () => ({
  uploadChatImage: jest.fn().mockResolvedValue('https://example.com/images/test.jpg'),
  uploadAudio: jest.fn().mockResolvedValue('https://example.com/audio/test.mp3')
}));

const app = express();
app.use(express.json());

// Custom auth middleware for testing - must be applied BEFORE the router
// but AFTER multer since multer handles multipart
const testAuthMiddleware = (req: any, res: any, next: any) => {
  if (req.headers.authorization === 'Bearer mock-token') {
    req.user = { id: 1, email: 'test@test.com', roles: [] };
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Mount router with auth middleware
app.use('/upload', testAuthMiddleware, uploadRouter);

describe('upload routes', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('POST /upload/image', () => {
    it('should upload image successfully', async () => {
      const res = await request(app)
        .post('/upload/image')
        .set('Authorization', 'Bearer mock-token')
        .attach('file', Buffer.from('fake-image-data'), {
          filename: 'test.jpg',
          contentType: 'image/jpeg'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('url');
    });

    it('should return 400 when no file provided', async () => {
      const res = await request(app)
        .post('/upload/image')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 401 when not authenticated', async () => {
      const res = await request(app)
        .post('/upload/image');

      expect(res.status).toBe(401);
    });

    it('should accept png images', async () => {
      const res = await request(app)
        .post('/upload/image')
        .set('Authorization', 'Bearer mock-token')
        .attach('file', Buffer.from('fake-image-data'), {
          filename: 'test.png',
          contentType: 'image/png'
        });

      expect(res.status).toBe(200);
    });

    it('should accept webp images', async () => {
      const res = await request(app)
        .post('/upload/image')
        .set('Authorization', 'Bearer mock-token')
        .attach('file', Buffer.from('fake-image-data'), {
          filename: 'test.webp',
          contentType: 'image/webp'
        });

      expect(res.status).toBe(200);
    });
  });

  describe('POST /upload/audio', () => {
    it('should upload audio successfully', async () => {
      const res = await request(app)
        .post('/upload/audio')
        .set('Authorization', 'Bearer mock-token')
        .attach('file', Buffer.from('fake-audio-data'), {
          filename: 'test.mp3',
          contentType: 'audio/mpeg'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('url');
    });

    it('should return 400 when no file provided', async () => {
      const res = await request(app)
        .post('/upload/audio')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 401 when not authenticated', async () => {
      const res = await request(app)
        .post('/upload/audio');

      expect(res.status).toBe(401);
    });
  });
});