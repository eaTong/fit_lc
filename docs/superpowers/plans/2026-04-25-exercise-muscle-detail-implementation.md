# 动作库和肌肉库信息补充实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为动作库和肌肉库补充详细信息字段

**Architecture:**
- 数据库：Prisma Schema 扩展 Exercise 和 Muscle 模型
- 后端：Repository 层支持新字段的 CRUD
- 前端：管理员页面支持编辑和展示新字段

**Tech Stack:** Prisma ORM, Express.js, React

---

## 任务清单

### Task 1: 数据库迁移 - 添加动作库新字段

**Files:**
- Modify: `backend/prisma/schema.prisma:226-252`
- Run: `cd backend && npx prisma migrate dev --name add_exercise_detail_fields`

- [ ] **Step 1: 修改 Prisma Schema**

在 `backend/prisma/schema.prisma` 的 Exercise 模型中添加新字段：

在 `@@map("exercises")` 之前添加：
```prisma
  // 新增：动作详情
  steps           String?  @db.Text    // 动作步骤说明
  safetyNotes     String?  @db.Text    // 注意事项
  commonMistakes  String?  @db.Text   // 常见错误
  exerciseType    String?             // 'compound' 复合动作 / 'isolation' 孤立动作

  // 新增：变体关系
  variantType     String?             // 变体类型：equipment / difficulty / posture
  conversionGuide Json?               // 变体转换指南
```

- [ ] **Step 2: 运行迁移**

Run: `cd /Users/eatong/eaTong_projects/fit_lc/backend && npx prisma migrate dev --name add_exercise_detail_fields`
Expected: Migration created successfully

- [ ] **Step 3: 提交**

```bash
git add backend/prisma/schema.prisma backend/prisma/migrations/
git commit -m "feat: 动作库添加详情字段"
```

---

### Task 2: 数据库迁移 - 添加肌肉库新字段

**Files:**
- Modify: `backend/prisma/schema.prisma:208-224`
- Run: `cd backend && npx prisma migrate dev --name add_muscle_detail_fields`

- [ ] **Step 1: 修改 Prisma Schema**

在 `backend/prisma/schema.prisma` 的 Muscle 模型中添加新字段：

在 `exercises ExerciseMuscle[]` 之前添加：
```prisma
  // 新增：肌肉详情
  origin        String?  @db.Text  // 起点
  insertion     String?  @db.Text  // 止点
  function      String?  @db.Text  // 功能
  trainingTips  String?  @db.Text  // 训练技巧
```

- [ ] **Step 2: 运行迁移**

Run: `cd /Users/eatong/eaTong_projects/fit_lc/backend && npx prisma migrate dev --name add_muscle_detail_fields`
Expected: Migration created successfully

- [ ] **Step 3: 提交**

```bash
git add backend/prisma/schema.prisma backend/prisma/migrations/
git commit -m "feat: 肌肉库添加详情字段"
```

---

### Task 3: 后端 - 更新 exerciseRepository 支持新字段

**Files:**
- Modify: `backend/src/repositories/exerciseRepository.ts`

- [ ] **Step 1: 读取现有 exerciseRepository**

文件：`backend/src/repositories/exerciseRepository.ts`

- [ ] **Step 2: 更新 create 方法**

在 `create` 方法的 data 对象中添加新字段：

```typescript
async create(data: {
  // ... existing fields
  steps?: string;
  safetyNotes?: string;
  commonMistakes?: string;
  exerciseType?: string;
  variantType?: string;
  conversionGuide?: any;
}) {
  return prisma.exercise.create({
    data: {
      // ... existing fields
      steps: data.steps,
      safetyNotes: data.safetyNotes,
      commonMistakes: data.commonMistakes,
      exerciseType: data.exerciseType,
      variantType: data.variantType,
      conversionGuide: data.conversionGuide,
    },
  });
}
```

- [ ] **Step 3: 更新 update 方法**

在 `update` 方法中添加新字段支持：

```typescript
async update(id: number, data: {
  // ... existing fields
  steps?: string;
  safetyNotes?: string;
  commonMistakes?: string;
  exerciseType?: string;
  variantType?: string;
  conversionGuide?: any;
}) {
  return prisma.exercise.update({
    where: { id },
    data: {
      // ... existing fields
      steps: data.steps,
      safetyNotes: data.safetyNotes,
      commonMistakes: data.commonMistakes,
      exerciseType: data.exerciseType,
      variantType: data.variantType,
      conversionGuide: data.conversionGuide,
    },
  });
}
```

- [ ] **Step 4: 提交**

```bash
git add backend/src/repositories/exerciseRepository.ts
git commit -m "feat: exerciseRepository 支持详情字段"
```

---

### Task 4: 后端 - 更新 muscleRepository 支持新字段

**Files:**
- Modify: `backend/src/repositories/muscleRepository.ts`

- [ ] **Step 1: 读取现有 muscleRepository**

文件：`backend/src/repositories/muscleRepository.ts`

- [ ] **Step 2: 更新 create 方法**

在 `create` 方法中添加新字段：

```typescript
async create(data: { name: string; group: string; parentId?: number; sortOrder?: number; origin?: string; insertion?: string; function?: string; trainingTips?: string }) {
  return prisma.muscle.create({
    data: {
      name: data.name,
      group: data.group,
      parentId: data.parentId ?? null,
      sortOrder: data.sortOrder ?? 0,
      origin: data.origin,
      insertion: data.insertion,
      function: data.function,
      trainingTips: data.trainingTips,
    }
  });
}
```

- [ ] **Step 3: 更新 update 方法**

```typescript
async update(id: number, data: { name?: string; sortOrder?: number; origin?: string; insertion?: string; function?: string; trainingTips?: string }) {
  return prisma.muscle.update({
    where: { id },
    data: {
      name: data.name,
      sortOrder: data.sortOrder,
      origin: data.origin,
      insertion: data.insertion,
      function: data.function,
      trainingTips: data.trainingTips,
    }
  });
}
```

- [ ] **Step 4: 提交**

```bash
git add backend/src/repositories/muscleRepository.ts
git commit -m "feat: muscleRepository 支持详情字段"
```

---

### Task 5: 前端 - 更新动作管理页面支持新字段

**Files:**
- Modify: `frontend/src/pages/admin/Exercises.tsx`

- [ ] **Step 1: 读取现有 Exercises.tsx**

文件：`frontend/src/pages/admin/Exercises.tsx`

- [ ] **Step 2: 添加表单字段**

在现有表单中添加新字段：

```tsx
// 在现有字段后添加
<div className="mb-4">
  <label className="block text-text-secondary mb-1">动作步骤</label>
  <textarea
    value={formData.steps || ''}
    onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
    rows={3}
  />
</div>

<div className="mb-4">
  <label className="block text-text-secondary mb-1">注意事项</label>
  <textarea
    value={formData.safetyNotes || ''}
    onChange={(e) => setFormData({ ...formData, safetyNotes: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
    rows={2}
  />
</div>

<div className="mb-4">
  <label className="block text-text-secondary mb-1">常见错误</label>
  <textarea
    value={formData.commonMistakes || ''}
    onChange={(e) => setFormData({ ...formData, commonMistakes: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
    rows={2}
  />
</div>

<div className="mb-4">
  <label className="block text-text-secondary mb-1">动作类型</label>
  <select
    value={formData.exerciseType || ''}
    onChange={(e) => setFormData({ ...formData, exerciseType: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
  >
    <option value="">请选择</option>
    <option value="compound">复合动作</option>
    <option value="isolation">孤立动作</option>
  </select>
</div>

<div className="mb-4">
  <label className="block text-text-secondary mb-1">变体类型</label>
  <select
    value={formData.variantType || ''}
    onChange={(e) => setFormData({ ...formData, variantType: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
  >
    <option value="">请选择</option>
    <option value="equipment">器械变体</option>
    <option value="difficulty">难度变体</option>
    <option value="posture">姿势变体</option>
  </select>
</div>
```

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/admin/Exercises.tsx
git commit -m "feat: 动作管理页面支持详情字段"
```

---

### Task 6: 前端 - 更新肌肉管理页面支持新字段

**Files:**
- Modify: `frontend/src/pages/admin/Muscles.tsx`

- [ ] **Step 1: 读取现有 Muscles.tsx**

文件：`frontend/src/pages/admin/Muscles.tsx`

- [ ] **Step 2: 添加表单字段**

在现有表单中添加新字段：

```tsx
// 在现有字段后添加
<div className="mb-4">
  <label className="block text-text-secondary mb-1">起点</label>
  <textarea
    value={formData.origin || ''}
    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
    rows={2}
  />
</div>

<div className="mb-4">
  <label className="block text-text-secondary mb-1">止点</label>
  <textarea
    value={formData.insertion || ''}
    onChange={(e) => setFormData({ ...formData, insertion: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
    rows={2}
  />
</div>

<div className="mb-4">
  <label className="block text-text-secondary mb-1">功能</label>
  <textarea
    value={formData.function || ''}
    onChange={(e) => setFormData({ ...formData, function: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
    rows={2}
  />
</div>

<div className="mb-4">
  <label className="block text-text-secondary mb-1">训练技巧</label>
  <textarea
    value={formData.trainingTips || ''}
    onChange={(e) => setFormData({ ...formData, trainingTips: e.target.value })}
    className="w-full bg-primary border border-border rounded px-3 py-2 text-text-primary"
    rows={2}
  />
</div>
```

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/admin/Muscles.tsx
git commit -m "feat: 肌肉管理页面支持详情字段"
```

---

## 实施检查清单

- [ ] Exercise 模型迁移成功，包含 steps, safetyNotes, commonMistakes, exerciseType, variantType, conversionGuide
- [ ] Muscle 模型迁移成功，包含 origin, insertion, function, trainingTips
- [ ] exerciseRepository 支持新字段的创建和更新
- [ ] muscleRepository 支持新字段的创建和更新
- [ ] 前端动作管理页面可以编辑和展示新字段
- [ ] 前端肌肉管理页面可以编辑和展示新字段
