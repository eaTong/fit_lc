// backend/tests/chat/single-round/saveMeasurement.single.test.js
import { jest } from '@jest/globals';

const TEST_USER_ID = 1;

describe('SaveMeasurement Single-Round Tests', () => {
  let app;
  let request;

  beforeAll(async () => {
    const express = (await import('express')).default;
    app = express();
    app.use(express.json());

    app.use((req, res, next) => {
      req.user = { id: TEST_USER_ID, email: 'test@example.com' };
      next();
    });

    const chatRoutes = (await import('../../../src/routes/chat.js')).default;
    app.use('/api/chat', chatRoutes);

    const supertest = await import('supertest');
    request = supertest.default(app);
  });

  describe('POST /api/chat/message - 单轮测试', () => {
    it('完整信息 - 胸腰臀围度应该保存', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '胸围90腰围75臀围88' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toMatch(/保存|已记录|成功/);
    });

    it('完整信息 - 臂腿围度应该保存', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '臂围32腿围58' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toMatch(/保存|已记录|成功/);
    });

    it('信息缺失 - 只说"测了围度"应该返回追问', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '今天测了围度' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toBeDefined();
    });

    it('部分信息 - 只说"胸围90"应该追问', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '胸围90' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toBeDefined();
    });
  });
});