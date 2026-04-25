# 训练动作库实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现训练动作库，包括 Prisma 模型、数据库迁移、Seed 数据、Repository 层、管理 API、AI Tool

**Architecture:**
- 数据库：MySQL + Prisma ORM
- 分层：Router → Service → Repository
- AI：LangChain Tool 调用动作库

**Tech Stack:** Node.js, Express, Prisma, MySQL, TypeScript

---

## 文件结构

```
backend/
├── prisma/
│   └── schema.prisma           # 修改：新增 Muscle/Exercise/ExerciseMuscle 模型
├── src/
│   ├── repositories/
│   │   ├── muscleRepository.ts  # 新建
│   │   └── exerciseRepository.ts # 新建
│   ├── services/
│   │   ├── muscleService.ts    # 新建
│   │   └── exerciseService.ts  # 新建
│   ├── routes/
│   │   ├── muscles.js          # 新建：肌肉管理 API
│   │   └── exercises.js        # 新建：动作管理 API
│   ├── tools/
│   │   └── queryExercise.js    # 新建：AI 查询动作 Tool
│   └── agents/
│       └── fitnessAgent.js     # 修改：注册新 Tool
└── prisma/seed/
    └── seedMuscles.js          # 新建：肌肉 Seed
```

---

## Task 1: Prisma 模型

**Files:**
- Modify: `backend/prisma/schema.prisma:1-181`

- [ ] **Step 1: 在 schema.prisma 末尾添加枚举和模型**

在 `model ChatMessage` 之后添加：

```prisma
// 枚举定义
enum MuscleGroup { chest back legs shoulders arms core }
enum Equipment { barbell dumbbell cable machine bodyweight other }
enum Difficulty { beginner intermediate advanced }
enum MuscleRole { primary secondary }
enum ExerciseStatus { draft published }

// 肌肉层级（肌肉群 → 主肌肉）
model Muscle {
  id        Int   @id @default(autoincrement())
  name      String @db.VarChar(100)
  group     MuscleGroup
  parentId  Int?  // 指向肌肉群，null=肌肉群本身
  sortOrder Int   @default(0)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  parent    Muscle?  @relation("MuscleHierarchy", fields: [parentId], references: [id])
  children  Muscle[] @relation("MuscleHierarchy")
  exercises ExerciseMuscle[]

  @@index([group])
  @@index([parentId])
  @@map("muscles")
}

// 动作库
model Exercise {
  id              Int     @id @default(autoincrement())
  name            String  @db.VarChar(200)
  category        MuscleGroup
  equipment       Equipment
  difficulty      Difficulty
  description     String? @db.Text
  adjustmentNotes String? @db.Text
  videoUrl        String? @db.VarChar(500)
  isVariant       Boolean @default(false)
  parentId        Int?    // 变体所属主动作
  tags            Json?
  status          ExerciseStatus @default(draft)
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  parent    Exercise?        @relation("ExerciseVariant", fields: [parentId], references: [id])
  variants  Exercise[]        @relation("ExerciseVariant")
  muscles   ExerciseMuscle[]

  @@index([category])
  @@index([equipment])
  @@index([difficulty])
  @@index([status])
  @@map("exercises")
}

// 动作-肌肉关联
model ExerciseMuscle {
  id         Int        @id @default(autoincrement())
  exerciseId Int        @map("exercise_id")
  muscleId   Int        @map("muscle_id")
  role       MuscleRole // primary/secondary

  exercise   Exercise @relation(fields: [exerciseId], references: [id], onDelete: Cascade)
  muscle     Muscle   @relation(fields: [muscleId], references: [id])

  @@unique([exerciseId, muscleId, role])
  @@index([muscleId])
  @@map("exercise_muscles")
}
```

- [ ] **Step 2: 运行 Prisma 迁移**

Run: `cd backend && npx prisma migrate dev --name add_exercise_library`
Expected: 迁移成功，创建 muscles/exercises/exercise_muscles 表

- [ ] **Step 3: Commit**

```bash
git add backend/prisma/schema.prisma
git commit -m "feat: add Muscle/Exercise/ExerciseMuscle models"
```

---

## Task 2: Muscle Repository & Service

**Files:**
- Create: `backend/src/repositories/muscleRepository.ts`
- Create: `backend/src/services/muscleService.ts`

- [ ] **Step 1: 创建 muscleRepository.ts**

```typescript
import prisma from '../lib/prisma';

export const muscleRepository = {
  async findAll() {
    return prisma.muscle.findMany({
      orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }]
    });
  },

  async findByGroup(group: string) {
    return prisma.muscle.findMany({
      where: { group },
      orderBy: { sortOrder: 'asc' }
    });
  },

  async findGroups() {
    return prisma.muscle.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: 'asc' },
      include: {
        children: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });
  },

  async findById(id: number) {
    return prisma.muscle.findUnique({ where: { id } });
  },

  async create(data: { name: string; group: string; parentId?: number; sortOrder?: number }) {
    return prisma.muscle.create({ data });
  },

  async update(id: number, data: { name?: string; sortOrder?: number }) {
    return prisma.muscle.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.muscle.delete({ where: { id } });
  }
};
```

- [ ] **Step 2: 创建 muscleService.ts**

```typescript
import { muscleRepository } from '../repositories/muscleRepository.js';

export const muscleService = {
  async getAll() {
    return muscleRepository.findAll();
  },

  async getByGroup(group: string) {
    return muscleRepository.findByGroup(group);
  },

  async getGroups() {
    return muscleRepository.findGroups();
  },

  async getById(id: number) {
    return muscleRepository.findById(id);
  },

  async create(data: { name: string; group: string; parentId?: number; sortOrder?: number }) {
    return muscleRepository.create(data);
  },

  async update(id: number, data: { name?: string; sortOrder?: number }) {
    return muscleRepository.update(id, data);
  },

  async delete(id: number) {
    return muscleRepository.delete(id);
  }
};
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/repositories/muscleRepository.ts backend/src/services/muscleService.ts
git commit -m "feat: add muscleRepository and muscleService"
```

---

## Task 3: Exercise Repository & Service

**Files:**
- Create: `backend/src/repositories/exerciseRepository.ts`
- Create: `backend/src/services/exerciseService.ts`

- [ ] **Step 1: 创建 exerciseRepository.ts**

```typescript
import prisma from '../lib/prisma';

export const exerciseRepository = {
  async findAll(filters?: { category?: string; equipment?: string; difficulty?: string; status?: string }) {
    const where: any = {};
    if (filters?.category) where.category = filters.category;
    if (filters?.equipment) where.equipment = filters.equipment;
    if (filters?.difficulty) where.difficulty = filters.difficulty;
    if (filters?.status) where.status = filters.status;

    return prisma.exercise.findMany({
      where,
      include: { muscles: { include: { muscle: true } } },
      orderBy: { name: 'asc' }
    });
  },

  async findById(id: number) {
    return prisma.exercise.findUnique({
      where: { id },
      include: { muscles: { include: { muscle: true } } }
    });
  },

  async findByMuscle(muscleId: number, role?: string) {
    const where: any = { muscles: { some: { muscleId } } };
    if (role) where.muscles.some.role = role;
    return prisma.exercise.findMany({ where });
  },

  async findByGroup(group: string) {
    return prisma.exercise.findMany({
      where: { category: group, status: 'published' },
      include: { muscles: { include: { muscle: true } } }
    });
  },

  async create(data: {
    name: string;
    category: string;
    equipment: string;
    difficulty: string;
    description?: string;
    adjustmentNotes?: string;
    videoUrl?: string;
    isVariant?: boolean;
    parentId?: number;
    tags?: any;
    status?: string;
  }) {
    return prisma.exercise.create({ data });
  },

  async addMuscle(exerciseId: number, muscleId: number, role: string) {
    return prisma.exerciseMuscle.create({
      data: { exerciseId, muscleId, role }
    });
  },

  async update(id: number, data: Partial<{
    name: string;
    category: string;
    equipment: string;
    difficulty: string;
    description: string;
    adjustmentNotes: string;
    videoUrl: string;
    tags: any;
    status: string;
  }>) {
    return prisma.exercise.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.exercise.delete({ where: { id } });
  },

  async deleteMuscles(exerciseId: number) {
    return prisma.exerciseMuscle.deleteMany({ where: { exerciseId } });
  }
};
```

- [ ] **Step 2: 创建 exerciseService.ts**

```typescript
import { exerciseRepository } from '../repositories/exerciseRepository.js';

export const exerciseService = {
  async getAll(filters?: { category?: string; equipment?: string; difficulty?: string; status?: string }) {
    return exerciseRepository.findAll(filters);
  },

  async getById(id: number) {
    return exerciseRepository.findById(id);
  },

  async getByMuscle(muscleId: number, role?: string) {
    return exerciseRepository.findByMuscle(muscleId, role);
  },

  async getByGroup(group: string) {
    return exerciseRepository.findByGroup(group);
  },

  async create(data: {
    name: string;
    category: string;
    equipment: string;
    difficulty: string;
    description?: string;
    adjustmentNotes?: string;
    videoUrl?: string;
    isVariant?: boolean;
    parentId?: number;
    tags?: any;
    muscles?: Array<{ muscleId: number; role: string }>;
  }) {
    const { muscles, ...exerciseData } = data;
    const exercise = await exerciseRepository.create(exerciseData);

    if (muscles && muscles.length > 0) {
      for (const m of muscles) {
        await exerciseRepository.addMuscle(exercise.id, m.muscleId, m.role);
      }
    }

    return exerciseRepository.findById(exercise.id);
  },

  async update(id: number, data: {
    name?: string;
    category?: string;
    equipment?: string;
    difficulty?: string;
    description?: string;
    adjustmentNotes?: string;
    videoUrl?: string;
    tags?: any;
    status?: string;
    muscles?: Array<{ muscleId: number; role: string }>;
  }) {
    const { muscles, ...exerciseData } = data;
    await exerciseRepository.update(id, exerciseData);

    if (muscles) {
      await exerciseRepository.deleteMuscles(id);
      for (const m of muscles) {
        await exerciseRepository.addMuscle(id, m.muscleId, m.role);
      }
    }

    return exerciseRepository.findById(id);
  },

  async delete(id: number) {
    return exerciseRepository.delete(id);
  }
};
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/repositories/exerciseRepository.ts backend/src/services/exerciseService.ts
git commit -m "feat: add exerciseRepository and exerciseService"
```

---

## Task 4: API Routes

**Files:**
- Create: `backend/src/routes/muscles.js`
- Create: `backend/src/routes/exercises.js`
- Modify: `backend/src/index.js:1-70`

- [ ] **Step 1: 创建 muscles.js**

```javascript
import express from 'express';
import { muscleService } from '../services/muscleService.js';

const router = express.Router();

// GET /api/muscles - 获取所有肌肉（带层级）
router.get('/', async (req, res) => {
  try {
    const groups = await muscleService.getGroups();
    res.json({ success: true, data: groups });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/muscles/:id - 获取单个肌肉
router.get('/:id', async (req, res) => {
  try {
    const muscle = await muscleService.getById(parseInt(req.params.id));
    if (!muscle) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: muscle });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/muscles - 创建肌肉
router.post('/', async (req, res) => {
  try {
    const muscle = await muscleService.create(req.body);
    res.json({ success: true, data: muscle });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/muscles/:id - 更新肌肉
router.put('/:id', async (req, res) => {
  try {
    const muscle = await muscleService.update(parseInt(req.params.id), req.body);
    res.json({ success: true, data: muscle });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/muscles/:id - 删除肌肉
router.delete('/:id', async (req, res) => {
  try {
    await muscleService.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
```

- [ ] **Step 2: 创建 exercises.js**

```javascript
import express from 'express';
import { exerciseService } from '../services/exerciseService.js';

const router = express.Router();

// GET /api/exercises - 获取所有动作
router.get('/', async (req, res) => {
  try {
    const { category, equipment, difficulty, status } = req.query;
    const exercises = await exerciseService.getAll({ category, equipment, difficulty, status });
    res.json({ success: true, data: exercises });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/exercises/:id - 获取单个动作
router.get('/:id', async (req, res) => {
  try {
    const exercise = await exerciseService.getById(parseInt(req.params.id));
    if (!exercise) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/exercises - 创建动作
router.post('/', async (req, res) => {
  try {
    const exercise = await exerciseService.create(req.body);
    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/exercises/:id - 更新动作
router.put('/:id', async (req, res) => {
  try {
    const exercise = await exerciseService.update(parseInt(req.params.id), req.body);
    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/exercises/:id - 删除动作
router.delete('/:id', async (req, res) => {
  try {
    await exerciseService.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
```

- [ ] **Step 3: 在 index.js 注册路由**

在现有的 import 后添加：

```javascript
import musclesRoutes from './routes/muscles.js';
import exercisesRoutes from './routes/exercises.js';
```

在 authProtectedRoutes 之后添加：

```javascript
app.use('/api/muscles', musclesRoutes);
app.use('/api/exercises', exercisesRoutes);
```

- [ ] **Step 4: Commit**

```bash
git add backend/src/routes/muscles.js backend/src/routes/exercises.js backend/src/index.js
git commit -m "feat: add muscles and exercises API routes"
```

---

## Task 5: Seed 数据（肌肉）

**Files:**
- Create: `backend/prisma/seedMuscles.js`

- [ ] **Step 1: 创建 seedMuscles.js**

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 肌肉数据：肌肉群 → 主肌肉
const musclesData = [
  {
    name: '胸部',
    group: 'chest',
    parentId: null,
    children: [
      { name: '胸大肌', sortOrder: 1 },
      { name: '胸小肌', sortOrder: 2 },
      { name: '前锯肌', sortOrder: 3 }
    ]
  },
  {
    name: '背部',
    group: 'back',
    parentId: null,
    children: [
      { name: '背阔肌', sortOrder: 1 },
      { name: '中下斜方肌', sortOrder: 2 },
      { name: '大圆肌', sortOrder: 3 },
      { name: '小圆肌', sortOrder: 4 },
      { name: '竖脊肌', sortOrder: 5 }
    ]
  },
  {
    name: '腿部',
    group: 'legs',
    parentId: null,
    children: [
      { name: '股四头肌', sortOrder: 1 },
      { name: '腘绳肌', sortOrder: 2 },
      { name: '臀大肌', sortOrder: 3 },
      { name: '小腿肌群', sortOrder: 4 }
    ]
  },
  {
    name: '肩部',
    group: 'shoulders',
    parentId: null,
    children: [
      { name: '三角肌', sortOrder: 1 },
      { name: '肩袖肌群', sortOrder: 2 }
    ]
  },
  {
    name: '手臂',
    group: 'arms',
    parentId: null,
    children: [
      { name: '肱二头肌', sortOrder: 1 },
      { name: '肱三头肌', sortOrder: 2 },
      { name: '前臂肌群', sortOrder: 3 }
    ]
  },
  {
    name: '核心',
    group: 'core',
    parentId: null,
    children: [
      { name: '腹直肌', sortOrder: 1 },
      { name: '腹斜肌', sortOrder: 2 },
      { name: '腹横肌', sortOrder: 3 },
      { name: '下背肌群', sortOrder: 4 }
    ]
  }
];

async function main() {
  console.log('Seeding muscles...');

  for (const group of musclesData) {
    const groupMuscle = await prisma.muscle.create({
      data: {
        name: group.name,
        group: group.group,
        parentId: null,
        sortOrder: 0
      }
    });

    for (const child of group.children) {
      await prisma.muscle.create({
        data: {
          name: child.name,
          group: group.group,
          parentId: groupMuscle.id,
          sortOrder: child.sortOrder
        }
      });
    }

    console.log(`Created: ${group.name}`);
  }

  console.log('Muscle seeding complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

- [ ] **Step 2: 添加 npm script**

在 `backend/package.json` 的 scripts 中添加：

```json
"seed:muscles": "node prisma/seedMuscles.js"
```

- [ ] **Step 3: 运行 seed**

Run: `cd backend && npm run seed:muscles`
Expected: 输出 "Muscle seeding complete!"

- [ ] **Step 4: Commit**

```bash
git add backend/prisma/seedMuscles.js backend/package.json
git commit -m "feat: add muscle seed data"
```

---

## Task 6: AI 查询动作 Tool

**Files:**
- Create: `backend/src/tools/queryExercise.js`
- Modify: `backend/src/agents/fitnessAgent.js`

- [ ] **Step 1: 创建 queryExercise.js**

```javascript
import { z } from 'zod';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { exerciseService } from '../services/exerciseService.js';

export const queryExerciseTool = new DynamicStructuredTool({
  name: 'query_exercise',
  description: `当用户询问某个肌肉群或部位适合做什么动作时使用。

  触发示例：
  - "练胸有哪些动作？"
  - "背阔肌怎么练？"
  - "新手适合什么哑铃动作？"
  - "我想练肩，有什么动作推荐？"

  输入：muscle_group (胸部/背部/腿部/肩部/手臂/核心), equipment (可选), difficulty (可选)`,
  schema: z.object({
    muscleGroup: z.string().describe('肌肉群：chest/back/legs/shoulders/arms/core'),
    equipment: z.string().optional().describe('器械：barbell/dumbbell/cable/machine/bodyweight'),
    difficulty: z.string().optional().describe('难度：beginner/intermediate/advanced')
  }),
  func: async ({ muscleGroup, equipment, difficulty }) => {
    try {
      const filters = { category: muscleGroup };
      if (equipment) filters.equipment = equipment;
      if (difficulty) filters.difficulty = difficulty;

      const exercises = await exerciseService.getAll(filters);

      if (exercises.length === 0) {
        return `没有找到符合条件的动作。可以尝试调整器械或难度筛选条件。`;
      }

      const list = exercises.map(e => {
        const muscles = e.muscles.map(m => `${m.muscle.name}(${m.role})`).join(', ');
        return `- ${e.name} | 器械: ${e.equipment} | 难度: ${e.difficulty} | 肌肉: ${muscles}`;
      }).join('\n');

      return `找到 ${exercises.length} 个动作:\n${list}`;
    } catch (error) {
      throw new Error(`查询动作失败: ${error.message}`);
    }
  }
});
```

- [ ] **Step 2: 在 fitnessAgent.js 中注册 Tool**

在 `saveWorkoutTool` 等 import 后添加：

```javascript
import { queryExerciseTool } from './tools/queryExercise.js';
```

找到 tools 数组，在其中添加：

```javascript
saveWorkoutTool,
saveMeasurementTool,
queryWorkoutTool,
queryMeasurementTool,
generatePlanTool,
adjustPlanTool,
analyzeExecutionTool,
queryExerciseTool  // 新增
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/tools/queryExercise.js backend/src/agents/fitnessAgent.js
git commit -m "feat: add queryExercise tool for AI"
```

---

## Task 7: 端到端测试验证

**Files:**
- Create: `backend/tests/muscles.test.js`
- Create: `backend/tests/exercises.test.js`

- [ ] **Step 1: 创建 muscles.test.js**

```javascript
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../src/index.js';

describe('Muscles API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0);
  });

  it('GET /api/muscles returns muscle groups with children', async () => {
    const res = await request(server).get('/api/muscles');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/muscles creates a new muscle', async () => {
    const res = await request(server)
      .post('/api/muscles')
      .send({ name: '测试肌肉', group: 'chest' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('测试肌肉');
  });

  it('DELETE /api/muscles/:id removes a muscle', async () => {
    const create = await request(server)
      .post('/api/muscles')
      .send({ name: '删除测试', group: 'chest' });

    const del = await request(server).delete(`/api/muscles/${create.body.data.id}`);
    expect(del.status).toBe(200);
    expect(del.body.success).toBe(true);
  });
});
```

- [ ] **Step 2: 创建 exercises.test.js**

```javascript
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../src/index.js';

describe('Exercises API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0);
  });

  it('GET /api/exercises returns exercise list', async () => {
    const res = await request(server).get('/api/exercises');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/exercises?category=chest filters by category', async () => {
    const res = await request(server).get('/api/exercises?category=chest');
    expect(res.status).toBe(200);
    expect(res.body.data.every(e => e.category === 'chest')).toBe(true);
  });

  it('POST /api/exercises creates a new exercise', async () => {
    const res = await request(server)
      .post('/api/exercises')
      .send({
        name: '测试动作',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'beginner',
        status: 'draft'
      });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('测试动作');
  });
});
```

- [ ] **Step 3: 运行测试**

Run: `cd backend && npm test -- tests/muscles.test.js tests/exercises.test.js`
Expected: 所有测试 PASS

- [ ] **Step 4: Commit**

```bash
git add backend/tests/muscles.test.js backend/tests/exercises.test.js
git commit -m "test: add muscles and exercises API tests"
```

---

## 依赖说明

需要安装的包：
```bash
cd backend
npm install -D supertest vitest
```

---

## 实现顺序

1. Task 1: Prisma 模型（基础）
2. Task 2: Muscle Repository & Service
3. Task 3: Exercise Repository & Service
4. Task 4: API Routes
5. Task 5: Seed 数据
6. Task 6: AI Tool
7. Task 7: 测试验证