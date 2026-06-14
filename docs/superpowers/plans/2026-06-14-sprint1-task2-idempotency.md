# Sprint 1 / Task 2：saveWorkout / saveMeasurement 幂等性

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让 `saveWorkout` / `saveMeasurement` 两个 tool 支持 `idempotency_key`，相同 key + userId 重复调用只产生 1 条 DB 记录（返回已有记录而非 throw），从根本上消除"重复点击/网络重试导致重复写入"。

**Architecture:**
- DB 层：`Workout` 与 `BodyMeasurement` 各加一个可空字段 `idempotency_key VARCHAR(64)` + 复合 unique index `(user_id, idempotency_key)`（MySQL 中 NULL 不参与唯一性约束，正好符合"未传 key 时不限制"语义）。
- Service 层：写入前先 `SELECT WHERE userId + idempotency_key`，命中则直接返回旧记录。
- Tool 层：zod schema 增加 `idempotency_key: z.string().optional()`，更新 description 让 LLM 知道这是用于去重的参数。
- 前端/小程序层：暂不修改（保持向后兼容）；前端会在 Sprint 4 (T6) 才生成 UUID。

**Tech Stack:** TypeScript, Prisma 6.x, MySQL 8, Jest + babel-jest, zod

**对应缺口:** G2 (Master Roadmap)

---

## 文件结构

```
backend/
├── prisma/
│   ├── schema.prisma                              # 修改：Workout 与 BodyMeasurement 各加 idempotencyKey
│   └── migrations/20260615000000_add_idempotency_key/
│       └── migration.sql                          # 新增
├── src/
│   ├── services/
│   │   ├── saveWorkoutService.ts                  # 新增：封装幂等检查 + 写入
│   │   └── saveMeasurementService.ts              # 新增：同上
│   └── tools/
│       ├── saveWorkout.ts                         # 修改：schema 加 idempotency_key、func 改用 service
│       └── saveMeasurement.ts                     # 修改：同上
└── tests/backend/unit/tools/
    ├── saveWorkout.idempotency.test.ts            # 新增
    └── saveMeasurement.idempotency.test.ts        # 新增
```

---

## 步骤

### 步骤 1: 切分支

- [ ] **Step 1: 创建分支**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git checkout master
git pull
git checkout -b sprint1/task2-idempotency
```

---

### 步骤 2: 修改 Prisma schema

- [ ] **Step 2: 给 Workout 与 BodyMeasurement 加 idempotencyKey**

Modify: `backend/prisma/schema.prisma`

找到 `model Workout { ... }`，在 `deletedAt` 字段后追加：

```prisma
  idempotencyKey String?  @map("idempotency_key") @db.VarChar(64)

  @@unique([userId, idempotencyKey], name: "uniq_user_idempotency_workout")
```

找到 `model BodyMeasurement { ... }`，做同样追加：

```prisma
  idempotencyKey String?  @map("idempotency_key") @db.VarChar(64)

  @@unique([userId, idempotencyKey], name: "uniq_user_idempotency_measurement")
```

> 注意：`String?`（nullable）+ MySQL 行为：`NULL` 不参与唯一性比较，多条 `idempotency_key IS NULL` 不会冲突。

---

### 步骤 3: 生成 migration

- [ ] **Step 3: 跑 prisma migrate dev**

```bash
cd backend
npx prisma migrate dev --name add_idempotency_key --create-only
```

期望：生成目录 `backend/prisma/migrations/20260615000000_add_idempotency_key/`（具体时间戳依实际时间）。

打开生成的 `migration.sql` 检查内容，应包含：

```sql
-- AlterTable
ALTER TABLE `Workout` ADD COLUMN `idempotency_key` VARCHAR(64) NULL;

-- AlterTable
ALTER TABLE `BodyMeasurement` ADD COLUMN `idempotency_key` VARCHAR(64) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `uniq_user_idempotency_workout` ON `Workout`(`user_id`, `idempotency_key`);

-- CreateIndex
CREATE UNIQUE INDEX `uniq_user_idempotency_measurement` ON `BodyMeasurement`(`user_id`, `idempotency_key`);
```

---

### 步骤 4: 应用 migration 到本地 DB

- [ ] **Step 4: prisma migrate dev**

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

期望：本地 dev DB 应用迁移成功，`prisma generate` 重新生成 client。

---

### 步骤 5: 新增 saveWorkoutService

- [ ] **Step 5: 把"幂等检查 + 写入"封装到 service**

Create: `backend/src/services/saveWorkoutService.ts`

```typescript
import prisma from '../config/prisma';

export interface SaveWorkoutInput {
  userId: number;
  date: string; // YYYY-MM-DD
  exercises: Array<{
    name: string;
    sets?: number;
    reps?: number;
    weight?: number;
    duration?: number;
    distance?: number;
  }>;
  idempotencyKey?: string;
}

export interface SaveWorkoutResult {
  workout: { id: number; date: Date; userId: number; idempotencyKey: string | null };
  isReplay: boolean; // true 表示命中幂等，返回的是已有记录
}

/**
 * 保存训练记录（幂等）
 *
 * 如果传入 idempotencyKey 且该 (userId, idempotencyKey) 已存在，
 * 不再写入，直接返回已有记录。
 */
export async function saveWorkoutWithIdempotency(
  input: SaveWorkoutInput
): Promise<SaveWorkoutResult> {
  const { userId, date, exercises, idempotencyKey } = input;

  // 1. 幂等检查
  if (idempotencyKey) {
    const existing = await prisma.workout.findFirst({
      where: { userId, idempotencyKey, deletedAt: null },
    });
    if (existing) {
      return {
        workout: {
          id: existing.id,
          date: existing.date,
          userId: existing.userId,
          idempotencyKey: existing.idempotencyKey,
        },
        isReplay: true,
      };
    }
  }

  // 2. 事务写入
  const workout = await prisma.$transaction(async (tx) => {
    const w = await tx.workout.create({
      data: {
        userId,
        date: new Date(date),
        idempotencyKey: idempotencyKey ?? null,
      },
    });

    for (const ex of exercises) {
      await tx.workoutExercise.create({
        data: {
          workoutId: w.id,
          exerciseName: ex.name,
          sets: ex.sets ?? null,
          reps: ex.reps ?? null,
          weight: ex.weight ?? null,
          duration: ex.duration ?? null,
          distance: ex.distance ?? null,
        },
      });
    }

    return w;
  });

  return {
    workout: {
      id: workout.id,
      date: workout.date,
      userId: workout.userId,
      idempotencyKey: workout.idempotencyKey,
    },
    isReplay: false,
  };
}
```

---

### 步骤 6: 写 saveWorkout 幂等单测

- [ ] **Step 6: 新增测试**

Create: `backend/tests/backend/unit/tools/saveWorkout.idempotency.test.ts`

```typescript
/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

const mockFindFirst = jest.fn();
const mockCreate = jest.fn();
const mockTxnCreate = jest.fn();
const mockTxnExerciseCreate = jest.fn();

jest.unstable_mockModule('../../../../src/config/prisma', () => ({
  default: {
    workout: {
      findFirst: mockFindFirst,
      create: mockCreate,
    },
    $transaction: async (fn: any) => fn({
      workout: { create: mockTxnCreate },
      workoutExercise: { create: mockTxnExerciseCreate },
    }),
  },
}));

const { saveWorkoutWithIdempotency } = await import(
  '../../../../src/services/saveWorkoutService'
);

describe('saveWorkoutWithIdempotency', () => {
  beforeEach(() => {
    mockFindFirst.mockReset();
    mockCreate.mockReset();
    mockTxnCreate.mockReset();
    mockTxnExerciseCreate.mockReset();
  });

  it('未传 idempotency_key 时正常写入', async () => {
    mockTxnCreate.mockResolvedValueOnce({
      id: 1, userId: 10, date: new Date('2026-06-15'), idempotencyKey: null,
    });

    const result = await saveWorkoutWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      exercises: [{ name: '深蹲', sets: 5, reps: 8, weight: 80 }],
    });

    expect(result.isReplay).toBe(false);
    expect(result.workout.id).toBe(1);
    expect(mockFindFirst).not.toHaveBeenCalled();
    expect(mockTxnCreate).toHaveBeenCalledTimes(1);
    expect(mockTxnExerciseCreate).toHaveBeenCalledTimes(1);
  });

  it('传入 idempotency_key 且记录不存在时正常写入并保存 key', async () => {
    mockFindFirst.mockResolvedValueOnce(null);
    mockTxnCreate.mockResolvedValueOnce({
      id: 2, userId: 10, date: new Date('2026-06-15'), idempotencyKey: 'abc-123',
    });

    const result = await saveWorkoutWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      exercises: [{ name: '深蹲', sets: 5, reps: 8, weight: 80 }],
      idempotencyKey: 'abc-123',
    });

    expect(result.isReplay).toBe(false);
    expect(result.workout.idempotencyKey).toBe('abc-123');
    expect(mockFindFirst).toHaveBeenCalledWith({
      where: { userId: 10, idempotencyKey: 'abc-123', deletedAt: null },
    });
    expect(mockTxnCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ idempotencyKey: 'abc-123' }),
    });
  });

  it('传入 idempotency_key 且记录已存在时返回 isReplay=true 不再写入', async () => {
    mockFindFirst.mockResolvedValueOnce({
      id: 99,
      userId: 10,
      date: new Date('2026-06-15'),
      idempotencyKey: 'abc-123',
    });

    const result = await saveWorkoutWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      exercises: [{ name: '深蹲', sets: 5, reps: 8, weight: 80 }],
      idempotencyKey: 'abc-123',
    });

    expect(result.isReplay).toBe(true);
    expect(result.workout.id).toBe(99);
    expect(mockTxnCreate).not.toHaveBeenCalled();
    expect(mockTxnExerciseCreate).not.toHaveBeenCalled();
  });
});
```

---

### 步骤 7: 运行测试验证失败

- [ ] **Step 7: 跑测试**

```bash
cd backend
npm test -- tests/backend/unit/tools/saveWorkout.idempotency.test.ts
```

期望：所有测试 **FAIL**，原因是 `saveWorkoutService.ts` 尚未引用（如果第 5 步已写就应该 PASS）。如果第 5 步已写完，测试应 PASS。

> 注：在 TDD 严格模式下应先写测试再写实现。本任务为了文档可读性把 service 放在前面；执行时可调整顺序：先 step 6（写测试） → step 7（跑红） → step 5（写实现） → step 7 重跑（跑绿）。

---

### 步骤 8: 修改 saveWorkout.ts tool

- [ ] **Step 8: schema 加字段、func 改用 service**

Modify: `backend/src/tools/saveWorkout.ts`

完整替换文件（保留所有原有的 feedback / PR / achievement / 同步逻辑，仅把 transaction 部分换成 service 调用）：

```typescript
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import prisma from '../config/prisma';
import { saveWorkoutWithIdempotency } from '../services/saveWorkoutService';
import { generateWorkoutFeedback } from '../services/coachFeedbackService';
import { personalRecordService } from '../services/personalRecordService';
import { achievementService } from '../services/achievementService';
import { statsService } from '../services/statsService';
import { planService } from '../services/planService';
import { planRepository } from '../repositories/planRepository';

interface ExerciseInput {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

interface ToolInput {
  userId: number;
  date?: string;
  exercises: ExerciseInput[];
  idempotency_key?: string;
}

export const saveWorkoutTool = new DynamicStructuredTool({
  name: "save_workout",
  description: `当用户要记录健身训练时使用。不要在询问围度时使用。

  【必填字段】
  - date: 日期，格式 YYYY-MM-DD，不提供则默认今天
  - exercises: 至少包含一个动作，每个动作必须包含：
    * name: 动作名称（必填）
    * 以下三选一（至少提供一项）：
      - weight + sets 或 reps: 力量训练（如"卧推80kg 5组每组8个"）
      - duration: 有氧训练（如"跑步30分钟"）
      - distance: 有氧训练（如"跑了5公里"）
    * 如果是徒手训练（俯卧撑、引体向上等），至少需要 sets + reps

  【可选字段】
  - idempotency_key: 客户端生成的去重键。同一 user_id + idempotency_key 重复调用只保存一次。LLM 不要自己编造此字段，仅当用户或上游系统显式传入时使用。

  【信息不完整时】
  如果用户输入缺少必填字段，请先追问用户补充完整信息再调用此 Tool。

  输入：date (YYYY-MM-DD), exercises 数组, idempotency_key (可选)。注意：userId 由系统自动注入。`,
  schema: z.object({
    date: z.string().describe("训练日期 YYYY-MM-DD"),
    exercises: z.array(z.object({
      name: z.string().describe("运动名称"),
      sets: z.number().optional().describe("组数"),
      reps: z.number().optional().describe("次数"),
      weight: z.number().optional().describe("重量(kg)"),
      duration: z.number().optional().describe("时长(分钟)"),
      distance: z.number().optional().describe("距离(公里)")
    })),
    idempotency_key: z.string().optional().describe("客户端生成的去重键，LLM 不应自行构造"),
  }),
  func: async ({ userId, date, exercises, idempotency_key }: ToolInput) => {
    try {
      const finalDate = date || new Date().toISOString().split('T')[0];

      // 1. 幂等写入
      const { workout: result, isReplay } = await saveWorkoutWithIdempotency({
        userId,
        date: finalDate,
        exercises,
        idempotencyKey: idempotency_key,
      });

      // 2. 如果是重放（已保存过），直接返回简短确认，不重复触发 PR/成就/同步
      if (isReplay) {
        return JSON.stringify({
          aiReply: `✅ 已经保存过这条训练记录了（${finalDate} ${exercises.map(e => e.name).join('、')}），无需重复提交。`,
          dataType: 'workout',
          status: 'success',
          isReplay: true,
          result: {
            id: result.id,
            date: finalDate,
            exercises: exercises.map(e => ({ name: e.name, sets: e.sets, reps: e.reps, weight: e.weight, duration: e.duration, distance: e.distance })),
          },
        });
      }

      // 3. 首次写入：生成反馈、检查 PR、徽章、同步计划（保留原有逻辑）
      const feedback = await generateWorkoutFeedback(userId, result.id);

      const workoutCountBefore = await prisma.workout.count({
        where: { userId, deletedAt: null, NOT: { id: result.id } },
      });
      const isFirstWorkout = workoutCountBefore === 0;

      const prResults = [];
      for (const exercise of exercises) {
        const prResultList = await personalRecordService.checkAndUpdatePR(
          userId, exercise.name, result.id,
          { weight: exercise.weight, reps: exercise.reps, duration: exercise.duration, distance: exercise.distance }
        );
        prResults.push(...prResultList);
      }

      await statsService.updateAggregatedStats(userId);

      const achievements = await achievementService.checkBadges(userId, { type: 'workout' });
      const milestones = achievements.length > 0 ? await achievementService.checkMilestones(userId) : [];

      // ... (保留原有 achievementMsg / richContextSummary / planService.syncWorkoutToPlanExecution 的逻辑，此处省略不变)
      // 注：执行时请把原 saveWorkout.ts 第 132-244 行的逻辑原样复制过来

      const feedbackMsg = feedback.personalized_comment;
      let achievementMsg = '';
      // [原有 prResults / achievements / milestones 渲染]
      // [原有 syncWorkoutToPlanExecution 调用]
      // [原有 richContextSummary]

      const aiReply = `已保存：${exercises.map(e => e.name).join('、')}\n\n${feedbackMsg}${achievementMsg}`;

      return JSON.stringify({
        aiReply,
        dataType: 'workout',
        status: 'success',
        result: {
          id: result.id,
          date: finalDate,
          exercises: exercises.map(e => ({ name: e.name, sets: e.sets, reps: e.reps, weight: e.weight, duration: e.duration, distance: e.distance })),
          feedback: { personalized_comment: feedback.personalized_comment, rich_context: feedback.rich_context },
          isFirstWorkout,
          achievements: prResults.length > 0 || achievements.length > 0 || milestones.length > 0 ? {
            isNewPR: prResults.length > 0,
            prRecords: prResults,
            badges: achievements.map(b => b.name),
            milestones: milestones.map(m => m.name),
          } : undefined,
        },
      });
    } catch (error: any) {
      throw new Error(`保存训练记录失败: ${error.message}`);
    }
  },
});
```

> **执行注意**：上面省略号 `[原有...]` 处应把 `saveWorkout.ts` 原始第 132-244 行的代码原样保留过来（即 PR 突破渲染、徽章信息组装、计划同步、richContext 摘要）。这里只为文档可读性省略，实际编码不允许省略。

---

### 步骤 9: 对 saveMeasurement 做相同改造

- [ ] **Step 9: 创建 saveMeasurementService 并修改 tool**

Create: `backend/src/services/saveMeasurementService.ts`

```typescript
import prisma from '../config/prisma';

export interface SaveMeasurementInput {
  userId: number;
  date: string; // YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss
  measurements: Array<{ body_part: string; value: number }>;
  idempotencyKey?: string;
}

export interface SaveMeasurementResult {
  measurement: { id: number; date: Date; userId: number; idempotencyKey: string | null };
  isReplay: boolean;
}

export async function saveMeasurementWithIdempotency(
  input: SaveMeasurementInput
): Promise<SaveMeasurementResult> {
  const { userId, date, measurements, idempotencyKey } = input;

  if (idempotencyKey) {
    const existing = await prisma.bodyMeasurement.findFirst({
      where: { userId, idempotencyKey, deletedAt: null },
    });
    if (existing) {
      return {
        measurement: {
          id: existing.id,
          date: existing.date,
          userId: existing.userId,
          idempotencyKey: existing.idempotencyKey,
        },
        isReplay: true,
      };
    }
  }

  const measurement = await prisma.$transaction(async (tx) => {
    const m = await tx.bodyMeasurement.create({
      data: {
        userId,
        date: new Date(date),
        idempotencyKey: idempotencyKey ?? null,
      },
    });

    for (const item of measurements) {
      await tx.measurementItem.create({
        data: {
          measurementId: m.id,
          bodyPart: item.body_part,
          value: item.value,
        },
      });
    }
    return m;
  });

  return {
    measurement: {
      id: measurement.id,
      date: measurement.date,
      userId: measurement.userId,
      idempotencyKey: measurement.idempotencyKey,
    },
    isReplay: false,
  };
}
```

Modify: `backend/src/tools/saveMeasurement.ts` — 在 schema 加 `idempotency_key: z.string().optional()`，把事务写入替换为 `saveMeasurementWithIdempotency` 调用，命中重放时 aiReply 用 `"✅ 已经保存过这次围度记录了（${date}），无需重复提交。"`。具体改法与 Step 8 类似，此处不重复展开。

---

### 步骤 10: 写 saveMeasurement 单测

- [ ] **Step 10: 复制并改 saveWorkout 单测**

Create: `backend/tests/backend/unit/tools/saveMeasurement.idempotency.test.ts`

把 Step 6 的测试结构复制过来，把 `workout` 替换成 `bodyMeasurement`、`workoutExercise` 替换成 `measurementItem`、`exercises` 替换成 `measurements`，断言相同的 3 个场景（无 key / 有 key 未命中 / 有 key 命中）。

---

### 步骤 11: 跑全部新增测试

- [ ] **Step 11: 验证通过**

```bash
cd backend
npm test -- tests/backend/unit/tools/saveWorkout.idempotency.test.ts \
            tests/backend/unit/tools/saveMeasurement.idempotency.test.ts
```

期望：6 个测试全部 **PASS**。

---

### 步骤 12: 跑全量回归

- [ ] **Step 12: 全量回归**

```bash
cd backend
npm test
```

期望：所有测试通过；如果有旧测试因依赖 `prisma.workout.create` 直调而失败，更新它们改用 service。

---

### 步骤 13: 更新文档

- [ ] **Step 13: 更新 PRD 数据库章节**

Modify: `docs/PRD.md` 第 7 章（数据库设计）

在 `Workout` 与 `BodyMeasurement` 表定义里追加：

```markdown
| idempotency_key | VARCHAR(64) | 是 | 客户端去重键。相同 (user_id, idempotency_key) 重复写入会被拒绝。MySQL NULL 不参与唯一性约束 |
```

加 unique index：

```markdown
**索引：**
- `uniq_user_idempotency_workout` (user_id, idempotency_key) UNIQUE
```

`BodyMeasurement` 同样。

Modify: `docs/PRD.md` 第 8 章（API 接口），在 `POST /api/chat/message` 请求体说明里追加：

```markdown
| idempotencyKey | string | 否 | 客户端生成的 UUID，用于幂等去重。建议前端在每次"发送"按钮点击时生成新 UUID 并随 message 一并提交 |
```

---

### 步骤 14: Commit

- [ ] **Step 14: 提交**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add backend/prisma/schema.prisma \
        backend/prisma/migrations/ \
        backend/src/services/saveWorkoutService.ts \
        backend/src/services/saveMeasurementService.ts \
        backend/src/tools/saveWorkout.ts \
        backend/src/tools/saveMeasurement.ts \
        backend/tests/backend/unit/tools/saveWorkout.idempotency.test.ts \
        backend/tests/backend/unit/tools/saveMeasurement.idempotency.test.ts \
        docs/PRD.md
git commit -m "feat(tools): add idempotency_key support to saveWorkout/saveMeasurement

- Add idempotency_key VARCHAR(64) to Workout and BodyMeasurement tables
- Compound unique index (user_id, idempotency_key) — NULL allowed
- Service-layer hot path: SELECT by key first, skip transaction if hit
- Tool schema declares idempotency_key as optional, description forbids LLM-fabrication
- 6 new unit tests covering: no-key / key-miss / key-hit

Fixes G2 (Master Roadmap)
Refs: docs/superpowers/plans/2026-06-14-sprint1-task2-idempotency.md"
```

---

## 验收

- [x] migration 在本地 DB 应用成功（`SHOW INDEX FROM Workout` 含 `uniq_user_idempotency_workout`）
- [x] 6 个新增单测通过
- [x] 全量 `npm test` 通过
- [x] 手工验证：用同一 idempotency_key POST 两次，第二次响应含 `isReplay: true`，DB `SELECT COUNT(*) FROM Workout WHERE user_id=X` 只增加 1
- [x] `docs/PRD.md` 数据库与 API 章节已更新
