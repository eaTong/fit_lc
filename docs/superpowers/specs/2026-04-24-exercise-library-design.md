# 训练动作库设计

## 背景

FitLC 需要一个结构化的训练动作库，支持：
1. AI 生成健身计划时选择动作
2. 用户在 App 中选择动作记录训练
3. 动作教学（动作说明 + 细节调整）

## 设计目标

- 覆盖完整健身动作体系（100+ 动作）
- 肌肉层级清晰（支持按肌肉查询动作）
- 支持动作变体管理
- 支持 AI 生成 + 人工审核流程

---

## 数据库结构

使用 Prisma ORM 管理，数据表与模型一一对应。

### muscles（肌肉层级树）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK) | 主键 |
| name | VARCHAR(100) | 肌肉名称 |
| group | ENUM | 肌肉群：chest/back/legs/shoulders/arms/core |
| parentId | INT (FK, nullable) | 父级肌肉ID，null=肌肉群级别 |
| sortOrder | INT | 排序序号 |
| createdAt/updatedAt | DATETIME | 时间戳 |

**层级结构：** 两层 — 肌肉群（level 1，无 parentId）→ 主肌肉（level 2，parentId 指向肌肉群）

**层级示例：**
```
胸部 (chest, level 1)
├── 胸大肌 (level 2, parentId=胸部.id)
├── 胸小肌 (level 2)
└── 前锯肌 (level 2)

背部 (back, level 1)
├── 背阔肌 (level 2)
├── 中下斜方肌 (level 2)
├── 大圆肌 (level 2)
├── 小圆肌 (level 2)
└── 竖脊肌 (level 2)

腿部 (legs, level 1)
├── 股四头肌 (level 2)
├── 腘绳肌 (level 2)
├── 臀大肌 (level 2)
└── 小腿肌群 (level 2)

肩部 (shoulders, level 1)
├── 三角肌 (level 2)
└── 肩袖肌群 (level 2)

手臂 (arms, level 1)
├── 肱二头肌 (level 2)
├── 肱三头肌 (level 2)
└── 前臂肌群 (level 2)

核心 (core, level 1)
├── 腹直肌 (level 2)
├── 腹斜肌 (level 2)
├── 腹横肌 (level 2)
└── 下背肌群 (level 2)
```

**六个肌肉群：** 胸部(chest)、背部(back)、腿部(legs)、肩部(shoulders)、手臂(arms)、核心(core)

### exercises（动作库）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK) | 主键 |
| name | VARCHAR(200) | 动作名称 |
| category | ENUM | 分类同 muscles.group |
| equipment | ENUM | barbell/dumbbell/cable/machine/bodyweight/other |
| difficulty | ENUM | beginner/intermediate/advanced |
| description | TEXT | 动作说明（Markdown） |
| adjustmentNotes | TEXT | 细节调整（Markdown） |
| videoUrl | VARCHAR(500) | 视频教程链接 |
| isVariant | BOOLEAN | 是否是变体 |
| parentId | INT (FK, nullable) | 变体所属主动作 |
| tags | JSON | 标签数组 |
| status | ENUM | draft/published |
| createdAt/updatedAt | DATETIME | 时间戳 |

### exercise_muscles（动作-肌肉关联）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK) | 主键 |
| exerciseId | INT (FK) | 关联 exercises.id |
| muscleId | INT (FK) | 关联 muscles.id（主肌肉 level 2） |
| role | ENUM | primary / secondary |

**关联层级：** 关联到主肌肉（level 2），记录动作针对的主要和辅助肌肉。

---

## 技术实现

使用 **Prisma ORM** 管理数据库，无需手写原始 SQL。

### Prisma 模型定义

```prisma
model Muscle {
  id          Int    @id @default(autoincrement())
  name        String @db.VarChar(100)
  group       MuscleGroup  // chest/back/legs/shoulders/arms/core
  parentId    Int?   // 自关联，指向肌肉群
  sortOrder   Int    @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  parent      Muscle?  @relation("MuscleHierarchy", fields: [parentId], references: [id])
  children    Muscle[]  @relation("MuscleHierarchy")
  exercises   ExerciseMuscle[]
}

model Exercise {
  id              Int     @id @default(autoincrement())
  name            String  @db.VarChar(200)
  category        MuscleGroup
  equipment       Equipment // barbell/dumbbell/cable/machine/bodyweight/other
  difficulty      Difficulty // beginner/intermediate/advanced
  description     String? @db.Text
  adjustmentNotes String? @db.Text
  videoUrl        String? @db.VarChar(500)
  isVariant       Boolean @default(false)
  parentId        Int?    // 变体所属主动作
  tags            Json?   // 标签数组
  status          Status  @default(draft) // draft/published
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  parent          Exercise?  @relation("ExerciseVariant", fields: [parentId], references: [id])
  variants        Exercise[] @relation("ExerciseVariant")
  muscles         ExerciseMuscle[]
}

model ExerciseMuscle {
  id         Int      @id @default(autoincrement())
  exerciseId Int
  muscleId   Int
  role       MuscleRole // primary/secondary

  exercise   Exercise @relation(fields: [exerciseId], references: [id])
  muscle     Muscle   @relation(fields: [muscleId], references: [id])

  @@unique([exerciseId, muscleId, role])
}

enum MuscleGroup { chest back legs shoulders arms core }
enum Equipment   { barbell dumbbell cable machine bodyweight other }
enum Difficulty  { beginner intermediate advanced }
enum MuscleRole  { primary secondary }
enum Status      { draft published }
```

### 核心查询场景（Prisma API）

| 场景 | Prisma 查询 |
|------|-------------|
| 查找"胸部"相关动作 | `prisma.exercise.findMany({ where: { muscles: { some: { muscle: { group: 'chest' } } } } })` |
| 查找"胸大肌"相关动作 | `prisma.exercise.findMany({ where: { muscles: { some: { muscleId: 2, role: 'primary' } } } })` |
| 查找"杠铃"入门动作 | `prisma.exercise.findMany({ where: { equipment: 'barbell', difficulty: 'beginner' } })` |
| 复合查询（肌肉+器械+难度） | `prisma.exercise.findMany({ where: { category: 'chest', equipment: 'barbell', difficulty: 'intermediate' } })` |
| 获取动作及其肌肉关联 | `prisma.exercise.findUnique({ include: { muscles: { include: { muscle: true } } } })` |

---

## 数据生成流程

```
1. AI 生成肌肉层级树
   - 6个肌肉群（level 1）
   - 每个肌肉群下的主肌肉（level 2）
   ↓ 用户审核
2. Seed muscles 表
   ↓
3. AI 生成动作库
   - 每个主肌肉对应 5-8 个动作
   - 包含：名称、器械、难度、说明、调整要点、关联肌肉
   ↓ 用户审核
4. Seed exercises + exercise_muscles 表
   ↓
5. 管理界面：增删改查动作/肌肉，draft → published 审核流程
```

---

## 管理界面

### 肌肉管理
- 查看完整肌肉层级树
- 新增/编辑肌肉节点

### 动作管理
- 列表页：按分类/器械/难度/肌肉筛选
- 新增/编辑动作：名称、分类、器械、难度、肌肉关联（多选primary/secondary）、说明、调整要点、视频、标签
- 状态切换：draft → published

---

## 设计决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 肌肉层级 | muscles.parentId 自关联 | 一个字段解决层级问题（肌肉群→主肌肉） |
| 动作-肌肉关联 | 关联到 level 2 主肌肉 | 记录动作针对的主要和辅助肌肉 |
| 标签存储 | JSON 数组 | 标签查询不频繁，JSON 足够 |
| 动作变体 | parentId 自关联 | 一个字段区分变体归属 |
| 审核流程 | status 字段 (draft/published) | 支持 AI 生成 + 人工审核流程 |

---

## 预估数据量

- 肌肉：6个肌肉群 + ~30主肌肉 ≈ 36条
- 动作：100+ 条
- 关联：每动作平均关联 1-2 个主要肌肉 + 1-2 个辅助肌肉 ≈ 300-400 条