import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { cleanDatabase } from '../../fixtures/factories';

// Mock prisma first
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    chatMessage: {
      create: jest.fn(),
      createMany: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn()
    },
    $disconnect: jest.fn()
  }
}));

// Mock auth middleware
jest.mock('../../../src/middleware/auth', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { id: 1, email: 'test@test.com', roles: [] };
    next();
  }
}));

// Mock runAgent
jest.mock('../../../src/agents/fitnessAgent', () => ({
  runAgent: jest.fn().mockResolvedValue({
    reply: 'Mock AI response',
    toolData: null
  })
}));

// Mock userContextService
jest.mock('../../../src/services/userContextService', () => ({
  userContextService: {
    getOrCreateContext: jest.fn().mockResolvedValue({}),
    refreshContextWithLock: jest.fn()
  }
}));

// Mock albumService
jest.mock('../../../src/services/albumService', () => ({
  albumService: {
    syncPhotosFromMessage: jest.fn().mockResolvedValue(undefined)
  }
}));

import chatRouter from '../../../src/routes/chat';

const app = express();
app.use(express.json());
app.use('/chat', chatRouter);

describe('chat routes', () => {
  const prisma = require('../../../src/config/prisma').default;

  beforeAll(async () => {
    // Setup
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.chatMessage.findMany.mockResolvedValue([]);
    prisma.chatMessage.findFirst.mockResolvedValue(null);
    prisma.chatMessage.create.mockResolvedValue({ id: 1 });
    prisma.chatMessage.delete.mockResolvedValue({ id: 1 });
  });

  describe('GET /chat/messages', () => {
    it('should get chat messages for user', async () => {
      prisma.chatMessage.findMany.mockResolvedValueOnce([
        { id: 1, role: 'user', content: 'Hello' },
        { id: 2, role: 'assistant', content: 'Hi there!' }
      ]);

      const res = await request(app)
        .get('/chat/messages')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('messages');
    });

    it('should return empty array when no messages', async () => {
      prisma.chatMessage.findMany.mockResolvedValueOnce([]);

      const res = await request(app)
        .get('/chat/messages')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body.messages).toEqual([]);
    });
  });

  describe('POST /chat/message', () => {
    it('should send chat message and get AI response', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: 'I did a workout today' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('reply');
      expect(res.body.reply).toBe('Mock AI response');
    });

    it('should return 400 if message is missing', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /chat/revoke/:messageId', () => {
    it('should revoke existing message', async () => {
      prisma.chatMessage.findFirst.mockResolvedValueOnce({ id: 1 });

      const res = await request(app)
        .post('/chat/revoke/1')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent message', async () => {
      prisma.chatMessage.findFirst.mockResolvedValueOnce(null);

      const res = await request(app)
        .post('/chat/revoke/99999')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should handle temporary message IDs', async () => {
      const res = await request(app)
        .post('/chat/revoke/temp-123456-user')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });
});