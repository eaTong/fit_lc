# Prisma ORM Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all database operations from mysql2 to Prisma ORM.

**Architecture:** Prisma schema defines all 8 tables, repositories rewritten to use Prisma Client, services/routes unchanged.

**Tech Stack:** Prisma ORM, Node.js, MySQL

---

## File Structure

```
backend/
├── prisma/
│   ├── schema.prisma          (NEW - Prisma schema)
│   └── migrations/             (NEW - Prisma migrations)
├── src/
│   ├── lib/
│   │   └── prisma.ts          (NEW - Prisma Client singleton)
│   ├── repositories/           (REWRITE all .js to .ts)
│   │   ├── userRepository.ts
│   │   ├── workoutRepository.ts
│   │   ├── measurementRepository.ts
│   │   ├── planRepository.ts
│   │   ├── userContextRepository.ts
│   │   └── chatMessageRepository.ts
│   └── config/
│       └── database.js         (DELETE - no longer needed)
```

---

## Task 1: Install Prisma and Initialize

**Files:**
- Modify: `backend/package.json`
- Create: `backend/prisma/schema.prisma`

- [ ] **Step 1: Install Prisma dependencies**

```bash
cd /Users/eatong/eaTong_projects/fit_lc/backend
npm install prisma @prisma/client
npm install -D prisma
```

- [ ] **Step 2: Initialize Prisma**

```bash
npx prisma init --datasource-provider mysql
```

Expected output: "Your Prisma schema was created"

- [ ] **Step 3: Verify directory structure**

```bash
ls -la prisma/
```

Expected: schema.prisma exists

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json prisma/schema.prisma && git commit -m "feat: initialize Prisma ORM"
```

---

## Task 2: Create Prisma Schema

**Files:**
- Modify: `backend/prisma/schema.prisma`

- [ ] **Step 1: Write complete Prisma schema**

Replace the content of `prisma/schema.prisma` with:

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

  workouts          Workout[]
  bodyMeasurements  BodyMeasurement[]
  workoutPlans      WorkoutPlan[]
  userContext       UserContext?
  chatMessages      ChatMessage[]

  @@map("users")
}

model Workout {
  id        Int        @id @default(autoincrement())
  userId    Int        @map("user_id")
  date      DateTime   @db.Date
  createdAt DateTime   @default(now()) @map("created_at")
  deletedAt DateTime?  @map("deleted_at")

  user      User              @relation(fields: [userId], references: [id])
  exercises WorkoutExercise[]

  @@index([userId])
  @@index([date])
  @@map("workouts")
}

model WorkoutExercise {
  id           Int      @id @default(autoincrement())
  workoutId    Int      @map("workout_id")
  exerciseName String   @map("exercise_name") @db.VarChar(100)
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
  id            Int     @id @default(autoincrement())
  measurementId Int     @map("measurement_id")
  bodyPart      String  @map("body_part") @db.VarChar(20)
  value         Decimal @db.Decimal(10, 2)

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
  durationWeeks Int     @map("duration_weeks")
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
  planExerciseId Int       @map("plan_exercise_id")
  scheduledDate  DateTime  @map("scheduled_date") @db.Date
  completedAt     DateTime? @map("completed_at")
  completedReps   Int?      @map("completed_reps")
  completedWeight Decimal?   @map("completed_weight") @db.Decimal(5, 2)
  status          String    @db.VarChar(20)
  notes           String?   @db.Text
  createdAt       DateTime  @default(now()) @map("created_at")

  plan         WorkoutPlan  @relation(fields: [planId], references: [id])
  planExercise PlanExercise @relation(fields: [planExerciseId], references: [id])

  @@index([planId])
  @@index([scheduledDate])
  @@index([status])
  @@map("plan_executions")
}

model UserContext {
  id                  Int        @id @default(autoincrement())
  userId              Int        @unique @map("user_id")
  contextText         String?    @map("context_text") @db.Text
  profileSnapshot     Json?      @map("profile_snapshot")
  activePlanName      String?    @map("active_plan_name") @db.VarChar(255)
  activePlanStatus   String?    @map("active_plan_status") @db.VarChar(50)
  lastWorkoutDate     DateTime?  @map("last_workout_date") @db.Date
  lastMeasurementDate DateTime?  @map("last_measurement_date") @db.Date
  totalWorkouts       Int        @default(0) @map("total_workouts")
  totalMeasurements   Int        @default(0) @map("total_measurements")
  updatedAt           DateTime   @updatedAt @map("updated_at")

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

- [ ] **Step 2: Validate schema**

```bash
npx prisma validate
```

Expected: "The schema is valid"

- [ ] **Step 3: Commit**

```bash
git add prisma/schema.prisma && git commit -m "feat: add complete Prisma schema for all tables"
```

---

## Task 3: Create Prisma Client Singleton

**Files:**
- Create: `backend/src/lib/prisma.ts`

- [ ] **Step 1: Create lib directory**

```bash
mkdir -p /Users/eatong/eaTong_projects/fit_lc/backend/src/lib
```

- [ ] **Step 2: Create Prisma client singleton**

Create `backend/src/lib/prisma.ts`:

```typescript
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

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/eatong/eaTong_projects/fit_lc/backend && npx tsc --noEmit src/lib/prisma.ts
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/prisma.ts && git commit -m "feat: add Prisma client singleton"
```

---

## Task 4: Rewrite userRepository

**Files:**
- Delete: `backend/src/repositories/userRepository.js`
- Create: `backend/src/repositories/userRepository.ts`

- [ ] **Step 1: Read existing userRepository.js to understand all methods**

```bash
cat /Users/eatong/eaTong_projects/fit_lc/backend/src/repositories/userRepository.js
```

- [ ] **Step 2: Create userRepository.ts**

Create `backend/src/repositories/userRepository.ts`:

```typescript
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

export const userRepository = {
  async create(email: string, passwordHash: string) {
    return prisma.user.create({
      data: { email, passwordHash }
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  async updatePassword(id: number, newPasswordHash: string) {
    return prisma.user.update({
      where: { id },
      data: { passwordHash: newPasswordHash }
    });
  }
};
```

- [ ] **Step 3: Delete old userRepository.js**

```bash
rm /Users/eatong/eaTong_projects/fit_lc/backend/src/repositories/userRepository.js
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/repositories/userRepository.ts
```

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/repositories/userRepository.ts && git commit -m "refactor: rewrite userRepository with Prisma"
```

---

## Task 5: Rewrite workoutRepository

**Files:**
- Delete: `backend/src/repositories/workoutRepository.js`
- Create: `backend/src/repositories/workoutRepository.ts`

- [ ] **Step 1: Read existing workoutRepository.js**

- [ ] **Step 2: Create workoutRepository.ts**

Create `backend/src/repositories/workoutRepository.ts`:

```typescript
import prisma from '../lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export const workoutRepository = {
  async create(userId: number, date: string) {
    return prisma.workout.create({
      data: {
        userId,
        date: new Date(date)
      }
    });
  },

  async addExercise(workoutId: number, userId: number, exercise: {
    name: string;
    sets?: number;
    reps?: number;
    weight?: number;
    duration?: number;
    distance?: number;
  }) {
    const workout = await prisma.workout.findFirst({
      where: { id: workoutId, userId, deletedAt: null }
    });
    if (!workout) {
      throw new Error('Workout not found or has been deleted');
    }
    return prisma.workoutExercise.create({
      data: {
        workoutId,
        exerciseName: exercise.name,
        sets: exercise.sets ?? null,
        reps: exercise.reps ?? null,
        weight: exercise.weight ? new Decimal(exercise.weight.toString()) : null,
        duration: exercise.duration ?? null,
        distance: exercise.distance ? new Decimal(exercise.distance.toString()) : null
      }
    });
  },

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

  async findById(id: number, userId: number) {
    return prisma.workout.findFirst({
      where: { id, userId, deletedAt: null }
    });
  },

  async softDelete(id: number) {
    return prisma.workout.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  },

  async restore(id: number) {
    return prisma.workout.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
};
```

- [ ] **Step 3: Delete old workoutRepository.js**

```bash
rm /Users/eatong/eaTong_projects/fit_lc/backend/src/repositories/workoutRepository.js
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/repositories/workoutRepository.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/repositories/workoutRepository.ts && git commit -m "refactor: rewrite workoutRepository with Prisma"
```

---

## Task 6: Rewrite measurementRepository

**Files:**
- Delete: `backend/src/repositories/measurementRepository.js`
- Create: `backend/src/repositories/measurementRepository.ts`

- [ ] **Step 1: Read existing measurementRepository.js**

- [ ] **Step 2: Create measurementRepository.ts**

Create `backend/src/repositories/measurementRepository.ts`:

```typescript
import prisma from '../lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export const measurementRepository = {
  async create(userId: number, date: string) {
    return prisma.bodyMeasurement.create({
      data: {
        userId,
        date: new Date(date)
      }
    });
  },

  async addItem(measurementId: number, bodyPart: string, value: number) {
    return prisma.measurementItem.create({
      data: {
        measurementId,
        bodyPart,
        value: new Decimal(value.toString())
      }
    });
  },

  async findByUserAndDateRange(userId: number, startDate: string, endDate: string) {
    return prisma.bodyMeasurement.findMany({
      where: {
        userId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        },
        deletedAt: null
      },
      include: {
        items: true
      },
      orderBy: { date: 'desc' }
    });
  },

  async findById(id: number, userId: number) {
    return prisma.bodyMeasurement.findFirst({
      where: { id, userId, deletedAt: null }
    });
  },

  async softDelete(id: number) {
    return prisma.bodyMeasurement.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  },

  async restore(id: number) {
    return prisma.bodyMeasurement.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
};
```

- [ ] **Step 3: Delete old measurementRepository.js**

```bash
rm /Users/eatong/eaTong_projects/fit_lc/backend/src/repositories/measurementRepository.js
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/repositories/measurementRepository.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/repositories/measurementRepository.ts && git commit -m "refactor: rewrite measurementRepository with Prisma"
```

---

## Task 7: Rewrite planRepository

**Files:**
- Delete: `backend/src/repositories/planRepository.js`
- Create: `backend/src/repositories/planRepository.ts`

- [ ] **Step 1: Read existing planRepository.js**

- [ ] **Step 2: Create planRepository.ts**

Create `backend/src/repositories/planRepository.ts`:

```typescript
import prisma from '../lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export const planRepository = {
  async create(userId: number, data: {
    name: string;
    goal: string;
    frequency: number;
    experience: string;
    equipment: string;
    conditions?: string;
    bodyWeight?: number;
    bodyFat?: number;
    height?: number;
    durationWeeks: number;
  }) {
    return prisma.workoutPlan.create({
      data: {
        userId,
        name: data.name,
        goal: data.goal,
        frequency: data.frequency,
        experience: data.experience,
        equipment: data.equipment,
        conditions: data.conditions ?? null,
        bodyWeight: data.bodyWeight ? new Decimal(data.bodyWeight.toString()) : null,
        bodyFat: data.bodyFat ? new Decimal(data.bodyFat.toString()) : null,
        height: data.height ? new Decimal(data.height.toString()) : null,
        durationWeeks: data.durationWeeks,
        status: 'draft'
      }
    });
  },

  async findByUserId(userId: number) {
    return prisma.workoutPlan.findMany({
      where: { userId },
      include: { exercises: true },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findActive(userId: number) {
    return prisma.workoutPlan.findFirst({
      where: { userId, status: 'active' }
    });
  },

  async findById(id: number) {
    return prisma.workoutPlan.findUnique({
      where: { id },
      include: { exercises: { orderBy: { orderIndex: 'asc' } } }
    });
  },

  async update(id: number, userId: number, data: Partial<{
    name: string;
    goal: string;
    frequency: number;
    experience: string;
    equipment: string;
    conditions: string;
    bodyWeight: number;
    bodyFat: number;
    height: number;
    durationWeeks: number;
    status: string;
  }>) {
    const updateData: any = { ...data };
    if (data.bodyWeight !== undefined) {
      updateData.bodyWeight = new Decimal(data.bodyWeight.toString());
    }
    if (data.bodyFat !== undefined) {
      updateData.bodyFat = new Decimal(data.bodyFat.toString());
    }
    if (data.height !== undefined) {
      updateData.height = new Decimal(data.height.toString());
    }
    return prisma.workoutPlan.update({
      where: { id },
      data: updateData
    });
  },

  async delete(id: number, userId: number) {
    return prisma.workoutPlan.deleteMany({
      where: { id, userId }
    });
  },

  async addExercise(planId: number, exercise: {
    dayOfWeek: number;
    exerciseName: string;
    sets?: number;
    reps?: string;
    weight?: number;
    duration?: number;
    restSeconds?: number;
    orderIndex?: number;
  }) {
    return prisma.planExercise.create({
      data: {
        planId,
        dayOfWeek: exercise.dayOfWeek,
        exerciseName: exercise.exerciseName,
        sets: exercise.sets ?? 3,
        reps: exercise.reps ?? '8-12',
        weight: exercise.weight ? new Decimal(exercise.weight.toString()) : null,
        duration: exercise.duration ?? null,
        restSeconds: exercise.restSeconds ?? 60,
        orderIndex: exercise.orderIndex ?? 0
      }
    });
  },

  async recordExecution(data: {
    planId: number;
    planExerciseId: number;
    scheduledDate: string;
    completedReps?: number;
    completedWeight?: number;
    status: string;
    notes?: string;
  }) {
    return prisma.planExecution.create({
      data: {
        planId: data.planId,
        planExerciseId: data.planExerciseId,
        scheduledDate: new Date(data.scheduledDate),
        completedAt: data.status === 'completed' ? new Date() : null,
        completedReps: data.completedReps ?? null,
        completedWeight: data.completedWeight ? new Decimal(data.completedWeight.toString()) : null,
        status: data.status,
        notes: data.notes ?? null
      }
    });
  },

  async getExecutions(planId: number) {
    return prisma.planExecution.findMany({
      where: { planId },
      orderBy: { scheduledDate: 'desc' }
    });
  }
};
```

- [ ] **Step 3: Delete old planRepository.js**

```bash
rm /Users/eatong/eaTong_projects/fit_lc/backend/src/repositories/planRepository.js
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/repositories/planRepository.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/repositories/planRepository.ts && git commit -m "refactor: rewrite planRepository with Prisma"
```

---

## Task 8: Rewrite userContextRepository

**Files:**
- Delete: `backend/src/repositories/userContextRepository.js`
- Create: `backend/src/repositories/userContextRepository.ts`

- [ ] **Step 1: Read existing userContextRepository.js**

- [ ] **Step 2: Create userContextRepository.ts**

Create `backend/src/repositories/userContextRepository.ts`:

```typescript
import prisma from '../lib/prisma';

export const userContextRepository = {
  async create(userId: number) {
    return prisma.userContext.create({
      data: { userId }
    });
  },

  async getByUserId(userId: number) {
    return prisma.userContext.findUnique({
      where: { userId }
    });
  },

  async updateSnapshot(userId: number, profile: any, activePlan: any) {
    return prisma.userContext.update({
      where: { userId },
      data: {
        profileSnapshot: profile,
        activePlanName: activePlan?.name || null,
        activePlanStatus: activePlan?.status || null,
        lastWorkoutDate: profile.lastWorkoutDate ? new Date(profile.lastWorkoutDate) : null,
        lastMeasurementDate: profile.lastMeasurementDate ? new Date(profile.lastMeasurementDate) : null,
        totalWorkouts: profile.totalWorkouts || 0,
        totalMeasurements: profile.totalMeasurements || 0
      }
    });
  },

  async updateContextText(userId: number, contextText: string) {
    return prisma.userContext.update({
      where: { userId },
      data: { contextText }
    });
  }
};
```

- [ ] **Step 3: Delete old userContextRepository.js**

```bash
rm /Users/eatong/eaTong_projects/fit_lc/backend/src/repositories/userContextRepository.js
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/repositories/userContextRepository.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/repositories/userContextRepository.ts && git commit -m "refactor: rewrite userContextRepository with Prisma"
```

---

## Task 9: Rewrite chatMessageRepository

**Files:**
- Delete: `backend/src/repositories/chatMessageRepository.js`
- Create: `backend/src/repositories/chatMessageRepository.ts`

- [ ] **Step 1: Read existing chatMessageRepository.js**

- [ ] **Step 2: Create chatMessageRepository.ts**

Create `backend/src/repositories/chatMessageRepository.ts`:

```typescript
import prisma from '../lib/prisma';

export const chatMessageRepository = {
  async create(userId: number, role: string, content: string, savedData: any = null) {
    return prisma.chatMessage.create({
      data: {
        userId,
        role,
        content,
        savedData: savedData ? JSON.parse(JSON.stringify(savedData)) : null
      }
    });
  },

  async getRecentMessages(userId: number, limit: number = 20) {
    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
    return messages.reverse();
  }
};
```

- [ ] **Step 3: Delete old chatMessageRepository.js**

```bash
rm /Users/eatong/eaTong_projects/fit_lc/backend/src/repositories/chatMessageRepository.js
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/repositories/chatMessageRepository.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/repositories/chatMessageRepository.ts && git commit -m "refactor: rewrite chatMessageRepository with Prisma"
```

---

## Task 10: Generate Prisma Client

**Files:**
- None (just generates code)

- [ ] **Step 1: Generate Prisma Client**

```bash
npx prisma generate
```

Expected: "Generated Prisma Client"

- [ ] **Step 2: Verify generated client**

```bash
ls -la node_modules/.prisma/client/
```

- [ ] **Step 3: Commit**

```bash
git add -f prisma/schema.prisma && git commit -m "feat: generate Prisma Client"
```

---

## Task 11: Update .env File

**Files:**
- Modify: `backend/.env`

- [ ] **Step 1: Update DATABASE_URL**

Change from individual DB config to DATABASE_URL:

```env
DATABASE_URL="mysql://root:@localhost:3306/fitlc"
```

Remove (no longer needed):
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=fitlc
```

- [ ] **Step 2: Commit**

```bash
git add .env && git commit -m "chore: update DATABASE_URL for Prisma"
```

---

## Task 12: Delete old database.js

**Files:**
- Delete: `backend/src/config/database.js`

- [ ] **Step 1: Verify no other files import database.js**

```bash
grep -r "from.*database" src/ --include="*.ts" --include="*.js" | grep -v node_modules
```

Expected: Only imports in service files that we'll update next

- [ ] **Step 2: Delete database.js**

```bash
rm /Users/eatong/eaTong_projects/fit_lc/backend/src/config/database.js
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "refactor: remove old mysql2 database config"
```

---

## Task 13: Verify Full Build

**Files:**
- None

- [ ] **Step 1: Run full TypeScript check**

```bash
npm run build 2>&1 || npx tsc --noEmit
```

- [ ] **Step 2: Start backend**

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000/api/auth/me -H "Authorization: Bearer invalid" | head -c 200
```

Expected: Returns 401 Unauthorized (server is running)

- [ ] **Step 3: Run a basic test**

Register and login to verify database works:

```bash
curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"prisma_test@test.com","password":"Test123456"}'
```

Expected: Returns token

---

## Task 14: Integration Test

**Files:**
- None

- [ ] **Step 1: Test chat with context (the main feature)**

```bash
# Get token from previous test
TOKEN="your_token"

curl -s -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"message":"今天运动了","historyMessages":[]}'

curl -s -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"message":"深蹲100kg 5组8个","historyMessages":[{"role":"user","content":"今天运动了"},{"role":"assistant","content":"请问您做了什么运动？"}]}'
```

Expected: Both work correctly

- [ ] **Step 2: Report results**
