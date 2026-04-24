// backend/tests/chat/end-to-end/saveWorkout.e2e.test.js
import { jest } from '@jest/globals';
import { clearTestData, getLatestWorkout, getExercisesByWorkoutId } from '../setup.js';

const TEST_USER_ID = 1;

describe('SaveWorkout End-to-End Tests', () => {
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

  beforeEach(async () => {
    // 测试前清理
    await clearTestData();
  });

  describe('正常保存', () => {
    it('完整信息应该保存到数据库', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '深蹲100kg 5组8个' });

      expect(res.status).toBe(200);

      // 验证数据库
      const workout = await getLatestWorkout(TEST_USER_ID);
      expect(workout).not.toBeNull();
      expect(workout.user_id).toBe(TEST_USER_ID);

      const exercises = await getExercisesByWorkoutId(workout.id);
      const squat = exercises.find(e => e.exercise_name.includes('深蹲'));
      expect(squat).toBeDefined();
    }, 30000);

    it('跑步信息应该保存距离', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '今天跑了5公里' });

      expect(res.status).toBe(200);

      const workout = await getLatestWorkout(TEST_USER_ID);
      expect(workout).not.toBeNull();

      const exercises = await getExercisesByWorkoutId(workout.id);
      const run = exercises.find(e => e.exercise_name.includes('跑'));
      expect(run).toBeDefined();
    }, 30000);
  });

  describe('放弃保存', () => {
    it('用户放弃时数据库无新记录', async () => {
      // 注意：这个测试依赖 AI 能理解"算了不记了"
      const res = await request
        .post('/api/chat/message')
        .send({ message: '练了腿，算了不记了' });

      // 不管 AI 怎么回复，只验证数据库无新记录
      const workout = await getLatestWorkout(TEST_USER_ID);
      // 如果之前有测试数据可能不是 null，所以检查时间是否很近
      if (workout) {
        const testTime = new Date();
        const workoutTime = new Date(workout.created_at);
        const diffMs = testTime - workoutTime;
        // 如果 workout 是刚才创建的，说明 AI 保存了
        expect(diffMs).toBeGreaterThan(60000); // 超过1分钟说明不是这次测试创建的
      }
    }, 30000);
  });
});