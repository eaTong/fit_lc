# 后端单元测试全面覆盖设计

## 概述

为 FitLC 后端所有代码生成单元测试，覆盖 Repositories、Services、Routes、Agents、Tools、Utils 全层次。

## 技术决策

### 测试数据库：SQLite in-memory

- 使用 `file:./test.db?mode=memory` 替代 MySQL
- 每次测试前创建干净 schema，测试后清理
- Prisma schema 不变，仅更改 provider 进行测试

### Mock 策略：Mock AI/LangChain，测试真实数据库操作

- Service 层 Mock 外部 AI 调用（LangChain、MiniMax、Zhipu）
- Repository 层使用真实 SQLite 操作
- Agent/Tool 层 Mock Prisma Client，返回预设数据

### 测试框架

- **Jest** + **ts-jest**（已有配置）
- **Supertest** 用于 Route 层 HTTP 测试
- 现有 `tests/` 目录结构扩展

## 测试目录结构

```
backend/tests/
├── unit/
│   ├── repositories/     # Repository 层测试
│   │   ├── userRepository.test.ts
│   │   ├── workoutRepository.test.ts
│   │   ├── measurementRepository.test.ts
│   │   ├── exerciseRepository.test.ts
│   │   ├── muscleRepository.test.ts
│   │   ├── planRepository.test.ts
│   │   ├── albumRepository.test.ts
│   │   ├── statsRepository.test.ts
│   │   ├── badgeRepository.test.ts
│   │   ├── roleRepository.test.ts
│   │   ├── triggerEventRepository.test.ts
│   │   └── chatMessageRepository.test.ts
│   ├── services/         # Service 层测试
│   │   ├── saveService.test.ts
│   │   ├── recordService.test.ts
│   │   ├── planService.test.ts
│   │   ├── coachFeedbackService.test.ts
│   │   ├── authService.test.ts
│   │   ├── userService.test.ts
│   │   ├── statsService.test.ts
│   │   ├── achievementService.test.ts
│   │   ├── albumService.test.ts
│   │   ├── queryService.test.ts
│   │   ├── trendPredictionService.test.ts
│   │   ├── personalRecordService.test.ts
│   │   ├── triggerService.test.ts
│   │   ├── chatHistoryService.test.ts
│   │   └── muscleAIService.test.ts
│   ├── routes/          # Route 层测试
│   │   ├── auth.test.ts
│   │   ├── chat.test.ts
│   │   ├── records.test.ts
│   │   ├── plans.test.ts
│   │   ├── exercises.test.ts
│   │   ├── muscles.test.ts
│   │   ├── achievements.test.ts
│   │   ├── users.test.ts
│   │   ├── upload.test.ts
│   │   └── adminExercises.test.ts
│   ├── agents/           # Agent 层测试
│   │   └── fitnessAgent.test.ts
│   ├── tools/            # Tool 层测试
│   │   ├── saveWorkout.test.ts
│   │   ├── queryWorkout.test.ts
│   │   ├── saveMeasurement.test.ts
│   │   ├── queryMeasurement.test.ts
│   │   ├── generatePlan.test.ts
│   │   ├── adjustPlan.test.ts
│   │   └── analyzeExecution.test.ts
│   └── utils/            # 工具函数测试
│       ├── dateUtils.test.ts
│       └── constants.test.ts
├── integration/          # 集成测试（跨层）
│   ├── workout-flow.test.ts
│   ├── measurement-flow.test.ts
│   └── plan-flow.test.ts
└── fixtures/             # 测试数据工厂
    └── factories.ts
```

## 各层测试策略

### Repositories（真实 SQLite）

- 直接对 SQLite 数据库操作
- 测试 CRUD 方法正确性
- 测试软删除、恢复逻辑
- 测试关联查询（include）

### Services（Mock AI/外部，真实 DB）

- Mock LangChain Agent 返回
- Mock 外部 API 调用
- 测试业务逻辑：数据转换、事务处理
- 测试错误处理

### Routes（Supertest + Mock）

- 使用 supertest 发起 HTTP 请求
- Mock 内部 Service 调用
- 测试输入验证、权限检查
- 测试响应格式和状态码

### Agents/Tools（Mock Prisma + Mock AI）

- Mock Prisma Client 方法
- Mock AI 模型返回
- 测试端到端流程

### Utils（纯函数测试）

- 无需 Mock，直接测试
- 测试日期工具、配置解析

## 测试数据管理

### 测试数据库配置

```typescript
// tests/setup.ts
import { exec } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: { url: 'file:./test.db?mode=memory' }
  }
});

beforeAll(async () => {
  // 推送 schema 到 test DB
  await exec('npx prisma db push --accept-data-loss');
});

afterAll(async () => {
  await prisma.$disconnect();
});
```

### 数据工厂（Fixtures）

```typescript
// tests/fixtures/factories.ts
export const createTestUser = async (overrides = {}) => {
  return prisma.user.create({
    data: {
      email: `test-${Date.now()}@test.com`,
      nickname: 'Test User',
      passwordHash: '$2b$10$mockhash',
      ...overrides
    }
  });
};
```

## 关键测试用例示例

### workoutRepository.createWithExercises

```typescript
it('should create workout with exercises in transaction', async () => {
  const user = await createTestUser();
  const exercises = [
    { name: '深蹲', sets: 3, reps: 10, weight: 60 }
  ];

  const workout = await workoutRepository.createWithExercises(
    user.id, '2026-05-01', exercises
  );

  expect(workout.id).toBeDefined();
  const exercises = await prisma.workoutExercise.findMany({
    where: { workoutId: workout.id }
  });
  expect(exercises).toHaveLength(1);
  expect(exercises[0].exerciseName).toBe('深蹲');
});
```

### saveService.saveWorkout

```typescript
it('should save workout and return formatted response', async () => {
  const mockRepo = workoutRepository as jest.Mocked<typeof workoutRepository>;
  mockRepo.createWithExercises.mockResolvedValue({ id: 1 } as any);

  const result = await saveService.saveWorkout(1, '2026-05-01', [
    { name: '深蹲', sets: 3, reps: 10 }
  ]);

  expect(result.id).toBe(1);
  expect(result.message).toContain('已保存');
});
```

## 执行命令

```bash
# 全部测试
npm test

# 仅单元测试
npm run test:unit

# 仅集成测试
npm run test:integration

# 指定文件
npm test -- tests/unit/repositories/workoutRepository.test.ts
```

## 进度跟踪

- [ ] Repositories (12 files)
- [ ] Services (15 files)
- [ ] Routes (10 files)
- [ ] Agents/Tools (8+1 files)
- [ ] Utils (2 files)
- [ ] Integration (3 files)
- [ ] Fixtures (1 file)