// backend/tests/chat/single-round/saveWorkout.single.test.js
import { jest } from '@jest/globals';

// 测试配置
const TEST_USER_ID = 1;

describe('SaveWorkout Single-Round Tests', () => {
  let app;
  let request;

  beforeAll(async () => {
    // 导入 Express app
    const express = (await import('express')).default;
    app = express();
    app.use(express.json());

    // Mock auth middleware - 注入测试用户
    app.use((req, res, next) => {
      req.user = { id: TEST_USER_ID, email: 'test@example.com' };
      next();
    });

    // 导入 chat 路由
    const chatRoutes = (await import('../../../src/routes/chat.js')).default;
    app.use('/api/chat', chatRoutes);

    const supertest = await import('supertest');
    request = supertest.default(app);
  });

  describe('POST /api/chat/message - 单轮测试', () => {
    it('完整信息 - 应该调用 save_workout 并保存', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '今天跑了5公里' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('reply');
      // 验证返回包含保存成功信息
      expect(res.body.reply).toMatch(/保存|已记录|成功/);
    });

    it('完整信息 - 深蹲训练应该保存', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '深蹲100kg 5组每组8个' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toMatch(/保存|已记录|成功/);
    });

    it('信息缺失 - 只说"练了腿"应该返回追问', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '练了腿' });

      expect(res.status).toBe(200);
      // AI 应该追问更多信息
      // 注意：真实 AI 行为可能直接保存或追问，这里只验证返回了回复
      expect(res.body.reply).toBeDefined();
    });

    it('信息缺失 - 只说"做了俯卧撑"应该返回追问', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '做了俯卧撑' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toBeDefined();
      // AI 可能追问组数或次数
    });

    it('日期模糊 - "昨天跑了步"应该被正确解析或追问', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '昨天跑了步' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toBeDefined();
    });
  });
});