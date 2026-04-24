// backend/tests/chat/setup.js
import pool from '../../src/config/database.js';

/**
 * 清理测试用户(user_id=1)的所有数据
 * 按外键依赖顺序删除
 */
export async function clearTestData() {
  // 清理 workout_exercises（依赖 workouts）
  await pool.execute(`
    DELETE we FROM workout_exercises we
    INNER JOIN workouts w ON we.workout_id = w.id
    WHERE w.user_id = 1
  `);

  // 清理 workouts
  await pool.execute('DELETE FROM workouts WHERE user_id = 1');

  // 清理 measurement_items（依赖 body_measurements）
  await pool.execute(`
    DELETE mi FROM measurement_items mi
    INNER JOIN body_measurements bm ON mi.measurement_id = bm.id
    WHERE bm.user_id = 1
  `);

  // 清理 body_measurements
  await pool.execute('DELETE FROM body_measurements WHERE user_id = 1');
}

/**
 * 获取测试用户的最新训练记录
 */
export async function getLatestWorkout(userId = 1) {
  const [rows] = await pool.execute(
    'SELECT * FROM workouts WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
    [userId]
  );
  return rows[0] || null;
}

/**
 * 获取训练记录的所有动作
 */
export async function getExercisesByWorkoutId(workoutId) {
  const [rows] = await pool.execute(
    'SELECT * FROM workout_exercises WHERE workout_id = ?',
    [workoutId]
  );
  return rows;
}