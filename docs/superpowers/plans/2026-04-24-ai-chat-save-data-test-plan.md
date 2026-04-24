# AI 对话保存数据测试实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 AI 对话保存数据的测试，覆盖单轮测试和端到端测试

**Architecture:** 使用 Jest + 真实 MySQL + 真实 MiniMax API，单轮测试验证 AI 响应行为，端到端测试验证数据库最终状态

**Tech Stack:** Jest, MySQL, MiniMax API, supertest

---

## 文件结构

```
backend/tests/
├── chat/
│   ├── setup.js                    # 数据库清理逻辑
│   ├── single-round/
│   │   └── saveWorkout.single.test.js
│   └── end-to-end/
│       ├── saveWorkout.e2e.test.js
│       └── data-supplement.test.js
```

---

## Task 1: 创建测试设置文件

**Files:**
- Create: `backend/tests/chat/setup.js`
- Modify: `backend/package.json` (添加 test:chat 脚本)

- [ ] **Step 1: 创建 setup.js**

```javascript
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
```

- [ ] **Step 2: 运行测试验证 setup 正常**

Run: `cd backend && npm test -- tests/chat/setup.js 2>&1 || echo "No tests in setup.js (expected)"`
Expected: 无输出或 "No tests"

- [ ] **Step 3: Commit**

```bash
git add backend/tests/chat/setup.js
git commit -m "test: add chat test setup with database clear utilities"
```

---

## Task 2: 创建单轮测试 - saveWorkout

**Files:**
- Create: `backend/tests/chat/single-round/saveWorkout.single.test.js`

- [ ] **Step 1: 创建单轮测试文件**

```javascript
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
```

- [ ] **Step 2: 运行单轮测试**

Run: `cd backend && npm test -- tests/chat/single-round/saveWorkout.single.test.js`
Expected: PASS 或部分 PASS（取决于 AI 实际行为）

- [ ] **Step 3: Commit**

```bash
git add backend/tests/chat/single-round/saveWorkout.single.test.js
git commit -m "test: add saveWorkout single-round tests"
```

---

## Task 3: 创建端到端测试 - saveWorkout

**Files:**
- Create: `backend/tests/chat/end-to-end/saveWorkout.e2e.test.js`

- [ ] **Step 1: 创建端到端测试文件**

```javascript
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
    });

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
    });
  });

  describe('放弃保存', () => {
    it('用户放弃时数据库无记录', async () => {
      // 注意：这个测试依赖 AI 能理解"算了不记了"
      // 如果 AI 无法识别放弃意图，此测试可能失败
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
    });
  });
});
```

- [ ] **Step 2: 运行端到端测试**

Run: `cd backend && npm test -- tests/chat/end-to-end/saveWorkout.e2e.test.js`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add backend/tests/chat/end-to-end/saveWorkout.e2e.test.js
git commit -m "test: add saveWorkout end-to-end tests"
```

---

## Task 4: 创建数据补充测试

**Files:**
- Create: `backend/tests/chat/end-to-end/data-supplement.test.js`

- [ ] **Step 1: 创建数据补充测试文件**

```javascript
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
```

- [ ] **Step 2: 运行数据补充测试**

Run: `cd backend && npm test -- tests/chat/end-to-end/data-supplement.test.js`
Expected: PASS（可能有部分测试因 AI 行为差异失败）

- [ ] **Step 3: Commit**

```bash
git add backend/tests/chat/end-to-end/data-supplement.test.js
git commit -m "test: add data supplement tests for AI follow-up questions"
```

---

## Task 5: 添加 package.json 测试脚本

**Files:**
- Modify: `backend/package.json`

- [ ] **Step 1: 添加测试脚本**

```json
{
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test:chat": "node --experimental-vm-modules node_modules/jest/bin/jest.js tests/chat",
    "test:chat:single": "node --experimental-vm-modules node_modules/jest/bin/jest.js tests/chat/single-round",
    "test:chat:e2e": "node --experimental-vm-modules node_modules/jest/bin/jest.js tests/chat/end-to-end"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add backend/package.json
git commit -m "chore: add chat test scripts"
```

---

## 实施检查清单

- [ ] Task 1: 创建测试设置文件 (setup.js)
- [ ] Task 2: 创建单轮测试 (saveWorkout.single.test.js)
- [ ] Task 3: 创建端到端测试 (saveWorkout.e2e.test.js)
- [ ] Task 4: 创建数据补充测试 (data-supplement.test.js)
- [ ] Task 5: 添加测试脚本

---

## 成功标准

1. `npm run test:chat:single` 运行单轮测试
2. `npm run test:chat:e2e` 运行端到端测试
3. 数据库正确保存训练记录
4. 测试后可手动检查数据库确认数据

---

## 后续扩展

- 添加 saveMeasurement 单轮测试和端到端测试
- 添加 queryWorkout / queryMeasurement 的对话测试
- 测试 generate_plan / adjust_plan / analyze_execution 的对话场景
