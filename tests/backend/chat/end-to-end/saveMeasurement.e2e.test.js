// backend/tests/chat/end-to-end/saveMeasurement.e2e.test.js
import { clearTestData, getLatestWorkout, getExercisesByWorkoutId } from '../setup.js';
import pool from '../../../src/config/database.js';

const TEST_USER_ID = 1;

async function getLatestMeasurement(userId) {
  const [rows] = await pool.execute(
    'SELECT * FROM body_measurements WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
    [userId]
  );
  return rows[0] || null;
}

async function getMeasurementItems(measurementId) {
  const [rows] = await pool.execute(
    'SELECT * FROM measurement_items WHERE measurement_id = ?',
    [measurementId]
  );
  return rows;
}

describe('SaveMeasurement End-to-End Tests', () => {
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

  describe('正常保存', () => {
    it('胸腰臀围度应该保存到数据库', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '胸围90腰围75臀围88' });

      expect(res.status).toBe(200);

      // 验证数据库
      const measurement = await getLatestMeasurement(TEST_USER_ID);
      expect(measurement).not.toBeNull();
      expect(measurement.user_id).toBe(TEST_USER_ID);

      const items = await getMeasurementItems(measurement.id);
      expect(items.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('多项围度保存', () => {
    it('多个部位围度应该一次性保存', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '胸围90腰围75臀围88臂围32腿围58' });

      expect(res.status).toBe(200);

      const measurement = await getLatestMeasurement(TEST_USER_ID);
      expect(measurement).not.toBeNull();

      const items = await getMeasurementItems(measurement.id);
      expect(items.length).toBeGreaterThanOrEqual(5);
    });
  });
});