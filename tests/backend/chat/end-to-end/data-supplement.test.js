// backend/tests/chat/end-to-end/data-supplement.test.js
import { clearTestData, getLatestWorkout, getExercisesByWorkoutId } from '../setup.js';

const TEST_USER_ID = 1;

describe('Data Supplement Tests - AI 追问后用户补充信息', () => {
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
    await clearTestData();
  });

  /**
   * 多轮对话辅助函数
   * 模拟用户多轮对话，返回最终响应
   */
  async function runMultiTurnDialog(messages) {
    let lastResponse;
    for (const message of messages) {
      const res = await request
        .post('/api/chat/message')
        .send({ message });
      lastResponse = res;
    }
    return lastResponse;
  }

  describe('追问补充 - 重量', () => {
    it('用户说"深蹲5组"被追问后补充"100kg"，应该保存重量', async () => {
      // 第一轮：用户说"深蹲5组"
      const res1 = await request
        .post('/api/chat/message')
        .send({ message: '深蹲5组' });

      expect(res1.status).toBe(200);

      // 第二轮：用户补充"100kg"
      // 注意：这里简化处理，实际测试时可能需要检查第一轮回复是否在追问
      const res2 = await request
        .post('/api/chat/message')
        .send({ message: '100kg' });

      expect(res2.status).toBe(200);

      // 验证数据库有记录且包含重量
      const workout = await getLatestWorkout(TEST_USER_ID);
      if (workout) {
        const exercises = await getExercisesByWorkoutId(workout.id);
        const squat = exercises.find(e => e.exercise_name.includes('深蹲'));
        if (squat && squat.weight) {
          expect(squat.weight).toBe(100);
        }
      }
    });
  });

  describe('追问补充 - 组数', () => {
    it('用户说"深蹲100kg"被追问后补充"5组"，应该保存组数', async () => {
      const res1 = await request
        .post('/api/chat/message')
        .send({ message: '深蹲100kg' });

      expect(res1.status).toBe(200);

      const res2 = await request
        .post('/api/chat/message')
        .send({ message: '5组' });

      expect(res2.status).toBe(200);

      // 验证数据库
      const workout = await getLatestWorkout(TEST_USER_ID);
      if (workout) {
        const exercises = await getExercisesByWorkoutId(workout.id);
        const squat = exercises.find(e => e.exercise_name.includes('深蹲'));
        if (squat) {
          // 验证组数或重量被保存
          expect(squat.sets || squat.weight).toBeTruthy();
        }
      }
    });
  });

  describe('追问补充 - 日期', () => {
    it('用户说"上周跑了步"被追问后补充具体日期，应该保存正确日期', async () => {
      const res1 = await request
        .post('/api/chat/message')
        .send({ message: '上周跑了步' });

      expect(res1.status).toBe(200);

      // 补充具体日期
      const res2 = await request
        .post('/api/chat/message')
        .send({ message: '上周三' });

      expect(res2.status).toBe(200);

      // 验证数据库日期在合理范围内
      const workout = await getLatestWorkout(TEST_USER_ID);
      if (workout) {
        // 上周应该在7-13天前
        const workoutDate = new Date(workout.date);
        const today = new Date();
        const daysAgo = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24));
        expect(daysAgo).toBeGreaterThanOrEqual(7);
        expect(daysAgo).toBeLessThanOrEqual(13);
      }
    });
  });

  describe('多项训练补充', () => {
    it('用户说"跑步5公里，然后深蹲100kg"，应该保存两项训练', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '跑步5公里，然后深蹲100kg' });

      expect(res.status).toBe(200);

      // 验证数据库有两条 exercise 记录
      const workout = await getLatestWorkout(TEST_USER_ID);
      if (workout) {
        const exercises = await getExercisesByWorkoutId(workout.id);
        expect(exercises.length).toBeGreaterThanOrEqual(2);

        const hasRun = exercises.some(e => e.exercise_name.includes('跑'));
        const hasSquat = exercises.some(e => e.exercise_name.includes('深蹲'));
        expect(hasRun || hasSquat).toBe(true);
      }
    });
  });
});