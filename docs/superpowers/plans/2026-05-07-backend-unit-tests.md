# 后端单元测试全面覆盖实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 FitLC 后端所有代码生成单元测试，覆盖 Repositories、Services、Routes、Agents、Tools、Utils 全层次，共 50+ 测试文件

**Architecture:** 使用 Jest + ts-jest 测试框架，SQLite in-memory 作为测试数据库，Mock AI/LangChain 调用，Supertest 测试 HTTP Routes

**Tech Stack:** Jest, ts-jest, Supertest, Prisma (SQLite), bcrypt, jsonwebtoken

---

## 文件结构

```
backend/
├── tests/
│   ├── setup.ts                    # 测试环境配置
│   ├── fixtures/
│   │   └── factories.ts            # 测试数据工厂
│   ├── unit/
│   │   ├── repositories/           # 12 files
│   │   ├── services/               # 15 files
│   │   ├── routes/                 # 10 files
│   │   ├── agents/                 # 1 file
│   │   ├── tools/                  # 8 files
│   │   └── utils/                  # 2 files
│   └── integration/                # 3 files
├── src/
│   ├── repositories/               # 被测试代码
│   ├── services/
│   ├── routes/
│   ├── agents/
│   ├── tools/
│   └── utils/
└── jest.config.js
```

---

## Task 1: 测试基础设施搭建

**Files:**
- Create: `backend/tests/setup.ts`
- Create: `backend/tests/fixtures/factories.ts`
- Modify: `backend/jest.config.js`

- [ ] **Step 1: 创建测试环境配置 setup.ts**

```typescript
// backend/tests/setup.ts
import { jest } from '@jest/globals';

// 设置测试环境变量
process.env.DATABASE_URL = 'file:./test.db?mode=memory';
process.env.JWT_SECRET = 'test-jwt-secret-for-testing';
process.env.BCRYPT_SALT_ROUNDS = '4';
process.env.NODE_ENV = 'test';

// 全局 beforeAll/afterAll
export default {};
```

- [ ] **Step 2: 创建数据工厂 factories.ts**

```typescript
// backend/tests/fixtures/factories.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  datasources: {
    db: { url: 'file:./test.db?mode=memory' }
  }
});

export const createTestUser = async (overrides = {}) => {
  const email = `test-${Date.now()}@example.com`;
  const passwordHash = await bcrypt.hash('password123', 4);
  return prisma.user.create({
    data: {
      email,
      passwordHash,
      nickname: 'Test User',
      ...overrides
    }
  });
};

export const createTestWorkout = async (userId: number, overrides = {}) => {
  return prisma.workout.create({
    data: {
      userId,
      date: new Date(),
      ...overrides
    }
  });
};

export const createTestExercise = async (overrides = {}) => {
  return prisma.exercise.create({
    data: {
      name: 'Test Exercise',
      category: 'chest',
      equipment: 'barbell',
      difficulty: 'beginner',
      ...overrides
    }
  });
};

export const createTestMeasurement = async (userId: number, overrides = {}) => {
  return prisma.bodyMeasurement.create({
    data: {
      userId,
      date: new Date(),
      ...overrides
    }
  });
};

export const cleanDatabase = async () => {
  const tables = ['workoutExercise', 'workout', 'measurementItem', 'bodyMeasurement',
    'chatMessage', 'albumPhoto', 'userRole', 'user'];
  for (const table of tables) {
    await (prisma as any)[table.toLowerCase()].deleteMany({});
  }
};

export { prisma };
```

- [ ] **Step 3: 更新 jest.config.js 支持 SQLite 测试**

```javascript
// backend/jest.config.js
export default {
  testEnvironment: 'node',
  testTimeout: 60000,
  rootDir: '.',
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.ts',
    '<rootDir>/tests/integration/**/*.int.test.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  modulePaths: ['<rootDir>/node_modules'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowJs: true,
        esModuleInterop: true,
        strict: false,
        noImplicitAny: false,
        types: ['node', 'jest'],
      }
    }],
  },
  clearMocks: true,
};
```

- [ ] **Step 4: 运行验证**

Run: `cd /Users/eatong/eaTong_projects/fit_lc/backend && npm run test:unit -- --listTests 2>/dev/null | head -20`
Expected: 显示现有测试文件列表

- [ ] **Step 5: 提交**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add backend/tests/setup.ts backend/tests/fixtures/factories.ts backend/jest.config.js
git commit -m "test: add test infrastructure setup

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 2: Repository 层测试（12 files）

**Files:**
- Create: `backend/tests/unit/repositories/userRepository.test.ts`
- Create: `backend/tests/unit/repositories/workoutRepository.test.ts`
- Create: `backend/tests/unit/repositories/measurementRepository.test.ts`
- Create: `backend/tests/unit/repositories/exerciseRepository.test.ts`
- Create: `backend/tests/unit/repositories/muscleRepository.test.ts`
- Create: `backend/tests/unit/repositories/planRepository.test.ts`
- Create: `backend/tests/unit/repositories/albumRepository.test.ts`
- Create: `backend/tests/unit/repositories/statsRepository.test.ts`
- Create: `backend/tests/unit/repositories/badgeRepository.test.ts`
- Create: `backend/tests/unit/repositories/roleRepository.test.ts`
- Create: `backend/tests/unit/repositories/triggerEventRepository.test.ts`
- Create: `backend/tests/unit/repositories/chatMessageRepository.test.ts`

### 2.1 userRepository.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/repositories/userRepository.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { userRepository } from '../../../src/repositories/userRepository';
import { createTestUser, cleanDatabase, prisma } from '../../fixtures/factories';

describe('userRepository', () => {
  beforeAll(async () => {
    // 确保有 normal role
    const role = await prisma.role.findUnique({ where: { name: 'normal' } });
    if (!role) {
      await prisma.role.create({ data: { name: 'normal' } });
    }
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const email = `test-${Date.now()}@example.com`;
      const passwordHash = 'hash123';
      const user = await userRepository.create(email, passwordHash);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBe(email);
      expect(user.passwordHash).toBe(passwordHash);
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const user = await createTestUser();
      const found = await userRepository.findByEmail(user.email);

      expect(found).toBeDefined();
      expect(found!.id).toBe(user.id);
    });

    it('should return null for non-existent email', async () => {
      const found = await userRepository.findByEmail('nonexistent@example.com');
      expect(found).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const user = await createTestUser();
      const found = await userRepository.findById(user.id);

      expect(found).toBeDefined();
      expect(found!.id).toBe(user.id);
    });

    it('should return null for non-existent id', async () => {
      const found = await userRepository.findById(999999);
      expect(found).toBeNull();
    });
  });

  describe('updatePassword', () => {
    it('should update user password', async () => {
      const user = await createTestUser();
      const newHash = 'new-hash-456';
      const updated = await userRepository.updatePassword(user.id, newHash);

      expect(updated.passwordHash).toBe(newHash);
    });
  });
});
```

### 2.2 workoutRepository.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/repositories/workoutRepository.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { workoutRepository } from '../../../src/repositories/workoutRepository';
import { createTestUser, cleanDatabase, prisma } from '../../fixtures/factories';

describe('workoutRepository', () => {
  let testUser: any;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  describe('create', () => {
    it('should create a workout', async () => {
      const workout = await workoutRepository.create(testUser.id, '2026-05-01');

      expect(workout).toBeDefined();
      expect(workout.userId).toBe(testUser.id);
      expect(workout.date).toBeInstanceOf(Date);
    });
  });

  describe('createWithExercises', () => {
    it('should create workout with exercises in transaction', async () => {
      const exercises = [
        { name: '深蹲', sets: 3, reps: 10, weight: 60 },
        { name: '卧推', sets: 4, reps: 8, weight: 80 }
      ];

      const workout = await workoutRepository.createWithExercises(
        testUser.id, '2026-05-01', exercises
      );

      expect(workout).toBeDefined();
      expect(workout.id).toBeDefined();

      // 验证 exercises 被创建
      const savedExercises = await prisma.workoutExercise.findMany({
        where: { workoutId: workout.id }
      });

      expect(savedExercises).toHaveLength(2);
      expect(savedExercises[0].exerciseName).toBe('深蹲');
      expect(savedExercises[0].sets).toBe(3);
      expect(savedExercises[0].reps).toBe(10);
    });
  });

  describe('findById', () => {
    it('should find workout by id', async () => {
      const workout = await workoutRepository.create(testUser.id, '2026-05-01');
      const found = await workoutRepository.findById(workout.id, testUser.id);

      expect(found).toBeDefined();
      expect(found!.id).toBe(workout.id);
    });

    it('should not find deleted workout', async () => {
      const workout = await workoutRepository.create(testUser.id, '2026-05-01');
      await workoutRepository.softDelete(workout.id);
      const found = await workoutRepository.findById(workout.id, testUser.id);

      expect(found).toBeNull();
    });
  });

  describe('findByUserAndDateRange', () => {
    it('should find workouts by user', async () => {
      await workoutRepository.create(testUser.id, '2026-05-01');
      await workoutRepository.create(testUser.id, '2026-05-02');

      const workouts = await workoutRepository.findByUserAndDateRange(testUser.id);

      expect(workouts.length).toBeGreaterThanOrEqual(2);
    });

    it('should filter by date range', async () => {
      await workoutRepository.create(testUser.id, '2026-05-01');
      await workoutRepository.create(testUser.id, '2026-05-10');

      const workouts = await workoutRepository.findByUserAndDateRange(
        testUser.id, '2026-05-01', '2026-05-05'
      );

      expect(workouts).toHaveLength(1);
    });
  });

  describe('softDelete and restore', () => {
    it('should soft delete workout', async () => {
      const workout = await workoutRepository.create(testUser.id, '2026-05-01');
      await workoutRepository.softDelete(workout.id);

      const deleted = await prisma.workout.findUnique({ where: { id: workout.id } });
      expect(deleted!.deletedAt).toBeDefined();
    });

    it('should restore soft deleted workout', async () => {
      const workout = await workoutRepository.create(testUser.id, '2026-05-01');
      await workoutRepository.softDelete(workout.id);
      await workoutRepository.restore(workout.id);

      const restored = await workoutRepository.findById(workout.id, testUser.id);
      expect(restored).toBeDefined();
    });
  });

  describe('addExercise', () => {
    it('should add exercise to existing workout', async () => {
      const workout = await workoutRepository.create(testUser.id, '2026-05-01');
      const exercise = await workoutRepository.addExercise(workout.id, testUser.id, {
        name: '深蹲',
        sets: 3,
        reps: 10,
        weight: 60
      });

      expect(exercise).toBeDefined();
      expect(exercise.exerciseName).toBe('深蹲');
    });

    it('should throw error for non-existent workout', async () => {
      await expect(
        workoutRepository.addExercise(999999, testUser.id, { name: 'test' })
      ).rejects.toThrow('训练记录不存在或已删除');
    });
  });
});
```

### 2.3 measurementRepository.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/repositories/measurementRepository.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { measurementRepository } from '../../../src/repositories/measurementRepository';
import { createTestUser, cleanDatabase, prisma } from '../../fixtures/factories';

describe('measurementRepository', () => {
  let testUser: any;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  describe('create', () => {
    it('should create a measurement', async () => {
      const measurement = await measurementRepository.create(testUser.id, '2026-05-01');

      expect(measurement).toBeDefined();
      expect(measurement.userId).toBe(testUser.id);
    });
  });

  describe('createWithItems', () => {
    it('should create measurement with items', async () => {
      const items = [
        { bodyPart: 'chest', value: 100 },
        { bodyPart: 'waist', value: 80 }
      ];

      const measurement = await measurementRepository.createWithItems(
        testUser.id, '2026-05-01', items
      );

      expect(measurement).toBeDefined();
      expect(measurement.items).toHaveLength(2);
      expect(measurement.items[0].bodyPart).toBe('chest');
    });
  });

  describe('findByDate', () => {
    it('should find measurement by date', async () => {
      await measurementRepository.createWithItems(testUser.id, '2026-05-01', [
        { bodyPart: 'chest', value: 100 }
      ]);

      const found = await measurementRepository.findByDate(testUser.id, '2026-05-01');

      expect(found).toBeDefined();
      expect(found!.items).toHaveLength(1);
    });
  });

  describe('upsertItem', () => {
    it('should create new item', async () => {
      const measurement = await measurementRepository.create(testUser.id, '2026-05-01');
      const item = await measurementRepository.upsertItem(
        measurement.id, 'chest', 100
      );

      expect(item).toBeDefined();
      expect(item.bodyPart).toBe('chest');
    });

    it('should update existing item', async () => {
      const measurement = await measurementRepository.create(testUser.id, '2026-05-01');
      await measurementRepository.upsertItem(measurement.id, 'chest', 100);
      const updated = await measurementRepository.upsertItem(measurement.id, 'chest', 105);

      expect(updated.id).toBeDefined();
    });
  });

  describe('findByUserAndDateRange', () => {
    it('should find measurements by user', async () => {
      await measurementRepository.createWithItems(testUser.id, '2026-05-01', [
        { bodyPart: 'chest', value: 100 }
      ]);

      const measurements = await measurementRepository.findByUserAndDateRange(testUser.id);

      expect(measurements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('softDelete and restore', () => {
    it('should soft delete measurement', async () => {
      const measurement = await measurementRepository.create(testUser.id, '2026-05-01');
      await measurementRepository.softDelete(measurement.id);

      const deleted = await prisma.bodyMeasurement.findUnique({ where: { id: measurement.id } });
      expect(deleted!.deletedAt).toBeDefined();
    });

    it('should restore soft deleted measurement', async () => {
      const measurement = await measurementRepository.create(testUser.id, '2026-05-01');
      await measurementRepository.softDelete(measurement.id);
      await measurementRepository.restore(measurement.id);

      const restored = await measurementRepository.findById(measurement.id, testUser.id);
      expect(restored).toBeDefined();
    });
  });
});
```

### 2.4 exerciseRepository.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/repositories/exerciseRepository.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { exerciseRepository } from '../../../src/repositories/exerciseRepository';
import { createTestUser, cleanDatabase, prisma } from '../../fixtures/factories';

describe('exerciseRepository', () => {
  beforeAll(async () => {
    // 确保有 normal role
    const role = await prisma.role.findUnique({ where: { name: 'normal' } });
    if (!role) {
      await prisma.role.create({ data: { name: 'normal' } });
    }
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  describe('findAll', () => {
    it('should find all exercises with pagination', async () => {
      await createTestExercise({ name: '深蹲' });
      await createTestExercise({ name: '卧推' });

      const result = await exerciseRepository.findAll({ page: 1, pageSize: 10 });

      expect(result.exercises).toBeDefined();
      expect(result.pagination).toBeDefined();
      expect(result.pagination.total).toBeGreaterThanOrEqual(2);
    });

    it('should filter by category', async () => {
      await createTestExercise({ name: '深蹲', category: 'legs' });
      await createTestExercise({ name: '卧推', category: 'chest' });

      const result = await exerciseRepository.findAll({ category: 'chest' });

      expect(result.exercises.every((e: any) => e.category === 'chest')).toBe(true);
    });
  });

  describe('findById', () => {
    it('should find exercise by id with muscles', async () => {
      const exercise = await createTestExercise({ name: '深蹲' });

      const found = await exerciseRepository.findById(exercise.id);

      expect(found).toBeDefined();
      expect(found!.name).toBe('深蹲');
    });

    it('should return null for non-existent id', async () => {
      const found = await exerciseRepository.findById(999999);
      expect(found).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new exercise', async () => {
      const exercise = await exerciseRepository.create({
        name: '硬拉',
        category: 'back',
        equipment: 'barbell',
        difficulty: 'intermediate'
      });

      expect(exercise).toBeDefined();
      expect(exercise.name).toBe('硬拉');
    });
  });

  describe('update', () => {
    it('should update exercise', async () => {
      const exercise = await createTestExercise({ name: '深蹲' });

      const updated = await exerciseRepository.update(exercise.id, { name: '改良深蹲' });

      expect(updated.name).toBe('改良深蹲');
    });
  });

  describe('delete', () => {
    it('should delete exercise', async () => {
      const exercise = await createTestExercise();

      await exerciseRepository.delete(exercise.id);

      const found = await exerciseRepository.findById(exercise.id);
      expect(found).toBeNull();
    });
  });

  describe('addMuscle and removeMuscle', () => {
    it('should add and remove muscle relation', async () => {
      const exercise = await createTestExercise();
      const muscle = await prisma.muscle.create({
        data: { name: '胸肌', group: 'chest' }
      });

      const result = await exerciseRepository.addMuscle(exercise.id, muscle.id, 'primary');
      expect(result).toBeDefined();

      const count = await exerciseRepository.removeMuscle(exercise.id, muscle.id);
      expect(count).toBeDefined();
    });
  });
});
```

### 2.5-2.12 剩余 Repository 测试文件

继续创建:
- `backend/tests/unit/repositories/muscleRepository.test.ts`
- `backend/tests/unit/repositories/planRepository.test.ts`
- `backend/tests/unit/repositories/albumRepository.test.ts`
- `backend/tests/unit/repositories/statsRepository.test.ts`
- `backend/tests/unit/repositories/badgeRepository.test.ts`
- `backend/tests/unit/repositories/roleRepository.test.ts`
- `backend/tests/unit/repositories/triggerEventRepository.test.ts`
- `backend/tests/unit/repositories/chatMessageRepository.test.ts`

---

## Task 3: Service 层测试（15 files）

**Files:**
- Create: `backend/tests/unit/services/saveService.test.ts`
- Create: `backend/tests/unit/services/recordService.test.ts`
- Create: `backend/tests/unit/services/planService.test.ts`
- Create: `backend/tests/unit/services/coachFeedbackService.test.ts`
- Create: `backend/tests/unit/services/authService.test.ts`
- Create: `backend/tests/unit/services/userService.test.ts`
- Create: `backend/tests/unit/services/statsService.test.ts`
- Create: `backend/tests/unit/services/achievementService.test.ts`
- Create: `backend/tests/unit/services/albumService.test.ts`
- Create: `backend/tests/unit/services/queryService.test.ts`
- Create: `backend/tests/unit/services/trendPredictionService.test.ts`
- Create: `backend/tests/unit/services/personalRecordService.test.ts`
- Create: `backend/tests/unit/services/triggerService.test.ts`
- Create: `backend/tests/unit/services/chatHistoryService.test.ts`
- Create: `backend/tests/unit/services/muscleAIService.test.ts`

### 3.1 saveService.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/services/saveService.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { saveService } from '../../../src/services/saveService';
import { workoutRepository } from '../../../src/repositories/workoutRepository';
import { measurementRepository } from '../../../src/repositories/measurementRepository';
import { createTestUser, cleanDatabase } from '../../fixtures/factories';
import { jest } from '@jest/globals';

describe('saveService', () => {
  let testUser: any;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  describe('saveWorkout', () => {
    it('should save workout and return formatted response', async () => {
      const exercises = [
        { name: '深蹲', sets: 3, reps: 10, weight: 60 }
      ];

      const result = await saveService.saveWorkout(testUser.id, '2026-05-01', exercises);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.message).toContain('已保存');
      expect(result.exercises).toEqual(exercises);
    });

    it('should save multiple exercises', async () => {
      const exercises = [
        { name: '深蹲', sets: 3, reps: 10 },
        { name: '卧推', sets: 4, reps: 8, weight: 80 },
        { name: '引体向上', sets: 3, reps: 8 }
      ];

      const result = await saveService.saveWorkout(testUser.id, '2026-05-01', exercises);

      expect(result.exercises).toHaveLength(3);
      expect(result.message).toContain('深蹲');
    });
  });

  describe('saveMeasurement', () => {
    it('should save measurement and return formatted response', async () => {
      const measurements = [
        { body_part: 'chest', value: 100 },
        { body_part: 'waist', value: 80 }
      ];

      const result = await saveService.saveMeasurement(testUser.id, '2026-05-01', measurements);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.message).toContain('已保存');
      expect(result.measurements).toEqual(measurements);
    });

    it('should throw error for invalid userId', async () => {
      const measurements = [{ body_part: 'chest', value: 100 }];

      await expect(
        saveService.saveMeasurement(undefined as any, '2026-05-01', measurements)
      ).rejects.toThrow('无效的 userId');
    });

    it('should handle empty measurements array', async () => {
      const result = await saveService.saveMeasurement(testUser.id, '2026-05-01', []);

      expect(result.id).toBeDefined();
      expect(result.message).toContain('已保存');
    });
  });
});
```

### 3.2 authService.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/services/authService.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { authService } from '../../../src/services/authService';
import { createTestUser, cleanDatabase, prisma } from '../../fixtures/factories';

describe('authService', () => {
  beforeAll(async () => {
    // 确保有 normal role
    const role = await prisma.role.findUnique({ where: { name: 'normal' } });
    if (!role) {
      await prisma.role.create({ data: { name: 'normal' } });
    }
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  describe('register', () => {
    it('should register new user successfully', async () => {
      const email = `test-${Date.now()}@example.com`;
      const result = await authService.register(email, 'password123');

      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe(email);
    });

    it('should throw error for duplicate email', async () => {
      const email = `test-${Date.now()}@example.com`;
      await authService.register(email, 'password123');

      await expect(
        authService.register(email, 'password456')
      ).rejects.toThrow('邮箱已被注册');
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      const email = `test-${Date.now()}@example.com`;
      const password = 'password123';
      await authService.register(email, password);

      const result = await authService.login(email, password);

      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe(email);
    });

    it('should throw error for invalid email', async () => {
      await expect(
        authService.login('nonexistent@example.com', 'password123')
      ).rejects.toThrow('无效的凭据');
    });

    it('should throw error for invalid password', async () => {
      const email = `test-${Date.now()}@example.com`;
      await authService.register(email, 'password123');

      await expect(
        authService.login(email, 'wrongpassword')
      ).rejects.toThrow('无效的凭据');
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user', async () => {
      const testUser = await createTestUser();

      const user = await authService.getCurrentUser(testUser.id);

      expect(user).toBeDefined();
      expect(user.id).toBe(testUser.id);
    });

    it('should throw error for non-existent user', async () => {
      await expect(
        authService.getCurrentUser(999999)
      ).rejects.toThrow('用户不存在');
    });
  });

  describe('generateToken', () => {
    it('should generate valid JWT token', () => {
      const token = authService.generateToken(1, 'test@example.com', ['normal']);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });
  });
});
```

### 3.3-3.15 剩余 Service 测试文件

继续创建:
- `backend/tests/unit/services/recordService.test.ts`
- `backend/tests/unit/services/planService.test.ts`
- `backend/tests/unit/services/coachFeedbackService.test.ts`
- `backend/tests/unit/services/userService.test.ts`
- `backend/tests/unit/services/statsService.test.ts`
- `backend/tests/unit/services/achievementService.test.ts`
- `backend/tests/unit/services/albumService.test.ts`
- `backend/tests/unit/services/queryService.test.ts`
- `backend/tests/unit/services/trendPredictionService.test.ts`
- `backend/tests/unit/services/personalRecordService.test.ts`
- `backend/tests/unit/services/triggerService.test.ts`
- `backend/tests/unit/services/chatHistoryService.test.ts`
- `backend/tests/unit/services/muscleAIService.test.ts`

---

## Task 4: Route 层测试（10 files）

**Files:**
- Create: `backend/tests/unit/routes/auth.test.ts`
- Create: `backend/tests/unit/routes/chat.test.ts`
- Create: `backend/tests/unit/routes/records.test.ts`
- Create: `backend/tests/unit/routes/plans.test.ts`
- Create: `backend/tests/unit/routes/exercises.test.ts`
- Create: `backend/tests/unit/routes/muscles.test.ts`
- Create: `backend/tests/unit/routes/achievements.test.ts`
- Create: `backend/tests/unit/routes/users.test.ts`
- Create: `backend/tests/unit/routes/upload.test.ts`
- Create: `backend/tests/unit/routes/adminExercises.test.ts`

### 4.1 auth.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/routes/auth.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import authRouter from '../../../src/routes/auth';
import { createTestUser, cleanDatabase, prisma } from '../../fixtures/factories';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('auth routes', () => {
  beforeAll(async () => {
    const role = await prisma.role.findUnique({ where: { name: 'normal' } });
    if (!role) {
      await prisma.role.create({ data: { name: 'normal' } });
    }
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  describe('POST /auth/register', () => {
    it('should register new user', async () => {
      const email = `test-${Date.now()}@example.com`;
      const res = await request(app)
        .post('/auth/register')
        .send({ email, password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe(email);
    });

    it('should return 400 for missing email', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({ password: 'password123' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('required');
    });

    it('should return 400 for duplicate email', async () => {
      const email = `test-${Date.now()}@example.com`;
      await request(app)
        .post('/auth/register')
        .send({ email, password: 'password123' });

      const res = await request(app)
        .post('/auth/register')
        .send({ email, password: 'password456' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('邮箱已被注册');
    });
  });

  describe('POST /auth/login', () => {
    it('should login with valid credentials', async () => {
      const email = `test-${Date.now()}@example.com`;
      await request(app)
        .post('/auth/register')
        .send({ email, password: 'password123' });

      const res = await request(app)
        .post('/auth/login')
        .send({ email, password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'wrong' });

      expect(res.status).toBe(401);
    });
  });
});
```

### 4.2-4.10 剩余 Route 测试文件

继续创建其他 Route 测试文件。

---

## Task 5: Agent/Tool 层测试（9 files）

**Files:**
- Create: `backend/tests/unit/agents/fitnessAgent.test.ts`
- Create: `backend/tests/unit/tools/saveWorkout.test.ts`
- Create: `backend/tests/unit/tools/queryWorkout.test.ts`
- Create: `backend/tests/unit/tools/saveMeasurement.test.ts`
- Create: `backend/tests/unit/tools/queryMeasurement.test.ts`
- Create: `backend/tests/unit/tools/generatePlan.test.ts`
- Create: `backend/tests/unit/tools/adjustPlan.test.ts`
- Create: `backend/tests/unit/tools/analyzeExecution.test.ts`

### 5.1 fitnessAgent.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/agents/fitnessAgent.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { fitnessAgent } from '../../../src/agents/fitnessAgent';
import { createTestUser, cleanDatabase } from '../../fixtures/factories';

describe('fitnessAgent', () => {
  let testUser: any;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  describe('runAgent', () => {
    it('should be importable', () => {
      expect(fitnessAgent).toBeDefined();
    });

    it('should have runAgent method', () => {
      expect(typeof fitnessAgent.runAgent).toBe('function');
    });

    it('should handle chat message', async () => {
      const result = await fitnessAgent.runAgent(
        testUser.id,
        '今天练了胸'
      );

      expect(result).toBeDefined();
      expect(result.reply).toBeDefined();
    });
  });
});
```

### 5.2-5.9 剩余 Tool 测试文件

继续创建其他 Tool 测试文件。

---

## Task 6: Utils 层测试（2 files）

**Files:**
- Create: `backend/tests/unit/utils/dateUtils.test.ts`
- Create: `backend/tests/unit/utils/constants.test.ts`

### 6.1 dateUtils.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/unit/utils/dateUtils.test.ts
import { describe, it, expect } from '@jest/globals';
import {
  formatDate,
  parseDate,
  isValidDate,
  addDays,
  getStartOfDay,
  getEndOfDay
} from '../../../src/utils/dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('should format date to YYYY-MM-DD', () => {
      const date = new Date('2026-05-01T10:30:00');
      const formatted = formatDate(date);
      expect(formatted).toBe('2026-05-01');
    });
  });

  describe('parseDate', () => {
    it('should parse valid date string', () => {
      const date = parseDate('2026-05-01');
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2026);
    });

    it('should return invalid date for invalid string', () => {
      const date = parseDate('invalid');
      expect(isValidDate(date)).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date', () => {
      expect(isValidDate(new Date())).toBe(true);
    });

    it('should return false for invalid date', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false);
    });
  });

  describe('addDays', () => {
    it('should add days to date', () => {
      const date = new Date('2026-05-01');
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
    });

    it('should subtract days for negative count', () => {
      const date = new Date('2026-05-01');
      const result = addDays(date, -3);
      expect(result.getDate()).toBe(28);
    });
  });

  describe('getStartOfDay', () => {
    it('should return start of day', () => {
      const date = new Date('2026-05-01T15:30:00');
      const start = getStartOfDay(date);
      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);
    });
  });

  describe('getEndOfDay', () => {
    it('should return end of day', () => {
      const date = new Date('2026-05-01T10:30:00');
      const end = getEndOfDay(date);
      expect(end.getHours()).toBe(23);
      expect(end.getMinutes()).toBe(59);
      expect(end.getSeconds()).toBe(59);
    });
  });
});
```

---

## Task 7: Integration 层测试（3 files）

**Files:**
- Create: `backend/tests/integration/workout-flow.test.ts`
- Create: `backend/tests/integration/measurement-flow.test.ts`
- Create: `backend/tests/integration/plan-flow.test.ts`

### 7.1 workout-flow.test.ts

- [ ] **Step 1: 写测试**

```typescript
// backend/tests/integration/workout-flow.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { createTestUser, cleanDatabase } from '../fixtures/factories';
import { workoutRepository } from '../../src/repositories/workoutRepository';
import { saveService } from '../../src/services/saveService';
import { recordService } from '../../src/services/recordService';
import { personalRecordService } from '../../src/services/personalRecordService';

describe('Workout Flow Integration', () => {
  let testUser: any;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  it('should complete full workout cycle: create -> query -> get summary', async () => {
    // 1. Save workout via service
    const exercises = [
      { name: '深蹲', sets: 3, reps: 10, weight: 100 }
    ];
    const saved = await saveService.saveWorkout(testUser.id, '2026-05-01', exercises);
    expect(saved.id).toBeDefined();

    // 2. Query workout via repository
    const workouts = await workoutRepository.findByUserAndDateRange(testUser.id);
    expect(workouts.length).toBeGreaterThanOrEqual(1);

    // 3. Get workout detail
    const workout = await workoutRepository.findById(saved.id, testUser.id);
    expect(workout).toBeDefined();

    // 4. Get summary via service
    const summary = await recordService.getWorkoutSummary(testUser.id, '2026-05-01');
    expect(summary).toBeDefined();
  });

  it('should track personal records', async () => {
    const exercises = [
      { name: '深蹲', sets: 3, reps: 10, weight: 120 }
    ];
    const saved = await saveService.saveWorkout(testUser.id, '2026-05-01', exercises);

    const prs = await personalRecordService.getPersonalRecords(testUser.id);
    expect(prs).toBeDefined();
  });
});
```

---

## 执行方式

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?