# Prisma ORM 迁移设计

## 背景

当前后端使用原始的 `mysql2` 驱动（直接写 SQL），没有 ORM，导致：
- SQL 语句分散在 repository 中，难以维护
- 类型安全不足
- 迁移管理不便

## 目标

迁移到 Prisma ORM，统一数据库访问层，提高代码质量和可维护性。

## 技术选型

- **ORM**: Prisma
- **迁移策略**: 全部迁移（重写所有 repository）
- **Schema 设计**: 保持现有数据库结构不变
- **文件位置**: 标准 Prisma 结构 (`prisma/schema.prisma`)

## Prisma Schema 设计

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int       @id @default(autoincrement())
  email        String    @unique @db.VarChar(255)
  passwordHash String    @map("password_hash") @db.VarChar(255)
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")

  workouts         Workout[]
  bodyMeasurements BodyMeasurement[]
  workoutPlans     WorkoutPlan[]
  userContext     UserContext?
  chatMessages     ChatMessage[]

  @@map("users")
}

model Workout {
  id        Int       @id @default(autoincrement())
  userId    Int       @map("user_id")
  date      DateTime  @db.Date
  createdAt DateTime  @default(now()) @map("created_at")
  deletedAt DateTime? @map("deleted_at")

  user      User             @relation(fields: [userId], references: [id])
  exercises WorkoutExercise[]

  @@index([userId])
  @@index([date])
  @@map("workouts")
}

model WorkoutExercise {
  id           Int     @id @default(autoincrement())
  workoutId    Int     @map("workout_id")
  exerciseName String  @map("exercise_name") @db.VarChar(100)
  sets         Int?
  reps         Int?
  weight       Decimal? @db.Decimal(10, 2)
  duration     Int?
  distance     Decimal? @db.Decimal(10, 2)
  createdAt    DateTime @default(now()) @map("created_at")

  workout Workout @relation(fields: [workoutId], references: [id], onDelete: Cascade)

  @@map("workout_exercises")
}

model BodyMeasurement {
  id        Int       @id @default(autoincrement())
  userId    Int       @map("user_id")
  date      DateTime  @db.Date
  createdAt DateTime  @default(now()) @map("created_at")
  deletedAt DateTime? @map("deleted_at")

  user  User              @relation(fields: [userId], references: [id])
  items MeasurementItem[]

  @@index([userId])
  @@index([date])
  @@map("body_measurements")
}

model MeasurementItem {
  id           Int     @id @default(autoincrement())
  measurementId Int     @map("measurement_id")
  bodyPart     String  @map("body_part") @db.VarChar(20)
  value        Decimal @db.Decimal(10, 2)

  measurement BodyMeasurement @relation(fields: [measurementId], references: [id], onDelete: Cascade)

  @@map("measurement_items")
}

model WorkoutPlan {
  id           Int      @id @default(autoincrement())
  userId       Int      @map("user_id")
  name         String   @db.VarChar(100)
  goal         String   @db.VarChar(20)
  frequency    Int      @default(3)
  experience   String   @db.VarChar(20)
  equipment    String   @db.VarChar(255)
  conditions   String?  @db.Text
  bodyWeight   Decimal? @map("body_weight") @db.Decimal(5, 2)
  bodyFat      Decimal? @map("body_fat") @db.Decimal(4, 1)
  height       Decimal? @db.Decimal(5, 1)
  durationWeeks Int    @map("duration_weeks")
  status       String   @db.VarChar(20)
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  user      User            @relation(fields: [userId], references: [id])
  exercises PlanExercise[]
  executions PlanExecution[]

  @@index([userId])
  @@index([status])
  @@map("workout_plans")
}

model PlanExercise {
  id           Int      @id @default(autoincrement())
  planId       Int      @map("plan_id")
  dayOfWeek    Int      @map("day_of_week")
  exerciseName String   @map("exercise_name") @db.VarChar(100)
  sets         Int      @default(3)
  reps         String   @db.VarChar(20)
  weight       Decimal? @db.Decimal(5, 2)
  duration     Int?
  restSeconds  Int      @default(60) @map("rest_seconds")
  orderIndex   Int      @default(0) @map("order_index")
  createdAt    DateTime @default(now()) @map("created_at")

  plan       WorkoutPlan     @relation(fields: [planId], references: [id], onDelete: Cascade)
  executions PlanExecution[]

  @@index([planId])
  @@index([dayOfWeek])
  @@map("plan_exercises")
}

model PlanExecution {
  id              Int       @id @default(autoincrement())
  planId          Int       @map("plan_id")
  planExerciseId  Int       @map("plan_exercise_id")
  scheduledDate   DateTime  @map("scheduled_date") @db.Date
  completedAt     DateTime? @map("completed_at")
  completedReps   Int?      @map("completed_reps")
  completedWeight Decimal?   @map("completed_weight") @db.Decimal(5, 2)
  status          String    @db.VarChar(20)
  notes           String?   @db.Text
  createdAt       DateTime  @default(now()) @map("created_at")

  plan         WorkoutPlan    @relation(fields: [planId], references: [id])
  planExercise PlanExercise @relation(fields: [planExerciseId], references: [id])

  @@index([planId])
  @@index([scheduledDate])
  @@index([status])
  @@map("plan_executions")
}

model UserContext {
  id                  Int       @id @default(autoincrement())
  userId              Int       @unique @map("user_id")
  contextText         String?   @map("context_text") @db.Text
  profileSnapshot     Json?     @map("profile_snapshot")
  activePlanName      String?   @map("active_plan_name") @db.VarChar(255)
  activePlanStatus   String?   @map("active_plan_status") @db.VarChar(50)
  lastWorkoutDate     DateTime? @map("last_workout_date") @db.Date
  lastMeasurementDate DateTime? @map("last_measurement_date") @db.Date
  totalWorkouts       Int       @default(0) @map("total_workouts")
  totalMeasurements   Int       @default(0) @map("total_measurements")
  updatedAt           DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_contexts")
}

model ChatMessage {
  id        Int      @id @default(autoincrement())
  userId    Int      @map("user_id")
  role      String   @db.VarChar(20)
  content   String   @db.Text
  savedData Json?    @map("saved_data")
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
  @@map("chat_messages")
}
```

## 文件结构变更

### 删除的文件
```
backend/src/config/database.js          (使用 Prisma Client 替代)
backend/src/repositories/*.js           (全部删除)
```

### 新增的文件
```
backend/prisma/
  ├── schema.prisma                     (Prisma schema)
  └── migrations/                      (迁移文件)

backend/src/lib/
  └── prisma.ts                         (Prisma Client 单例)

backend/src/repositories/
  ├── userRepository.ts                 (重写为 Prisma)
  ├── workoutRepository.ts             (重写为 Prisma)
  ├── measurementRepository.ts          (重写为 Prisma)
  ├── planRepository.ts                 (重写为 Prisma)
  ├── userContextRepository.ts         (重写为 Prisma)
  └── chatMessageRepository.ts         (重写为 Prisma)
```

### 保留的文件
```
backend/src/services/*.js              (保持不变，只改 repository 引用)
backend/src/routes/*.js                (保持不变)
backend/src/tools/*.js                  (保持不变)
backend/src/agents/*.js                (保持不变)
```

## Repository 重写示例

### Before (mysql2)
```javascript
// workoutRepository.js
import pool from '../config/database.js';

export const workoutRepository = {
  async findByUserAndDateRange(userId, startDate, endDate) {
    const [rows] = await pool.execute(
      `SELECT w.*, we.id as exercise_id, we.exercise_name, we.sets, we.reps,
              we.weight, we.duration, we.distance
       FROM workouts w
       LEFT JOIN workout_exercises we ON w.id = we.workout_id
       WHERE w.user_id = ? AND w.date BETWEEN ? AND ? AND w.deleted_at IS NULL
       ORDER BY w.date DESC`,
      [userId, startDate, endDate]
    );
    return rows;
  },
  // ...
};
```

### After (Prisma)
```typescript
// workoutRepository.ts
import prisma from '../lib/prisma';

export const workoutRepository = {
  async findByUserAndDateRange(userId: number, startDate: string, endDate: string) {
    return prisma.workout.findMany({
      where: {
        userId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        },
        deletedAt: null
      },
      include: {
        exercises: true
      },
      orderBy: { date: 'desc' }
    });
  },
  // ...
};
```

## Prisma Client 使用

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

## 环境变量更新

需要更新 `.env`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/fitlc"
```

移除:
```env
# 不再需要
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=fitlc
```

## 迁移步骤

1. 安装 Prisma
   ```bash
   npm install prisma @prisma/client
   npm install -D prisma-n次次次次次次次次次次次次
   ```

2. 初始化 Prisma
   ```bash
   npx prisma init
   ```

3. 编写 schema.prisma

4. 生成 Prisma Client
   ```bash
   npx prisma generate
   ```

5. 创建迁移（不应用，保持现有数据库）
   ```bash
   npx prisma migrate dev --name init --create-only
   ```

6. 重写所有 repository

7. 更新 service 层的 import

8. 测试

## 测试策略

1. 单元测试 - 测试各 repository 方法
2. 集成测试 - 测试 API 端到端
3. 对比测试 - 新旧实现结果对比（可选）

## 错误处理

Prisma 的错误需要适当转换：

```typescript
// 转换 Prisma 错误为应用错误
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError) {
  if (error.code === 'P2002') {
    throw new ConflictError('资源已存在');
  }
  if (error.code === 'P2025') {
    throw new NotFoundError('资源不存在');
  }
  throw error;
}
```

## 依赖更新

需要添加到 `package.json`:
```json
{
  "dependencies": {
    "@prisma/client": "^5.x"
  },
  "devDependencies": {
    "prisma": "^5.x"
  }
}
```
