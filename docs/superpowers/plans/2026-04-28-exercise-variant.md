# 动作变体系统实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现动作变体多对多关系管理，包括数据库 schema 变更、Admin API 和前端 UI。

**Architecture:**
- 新增 `ExerciseVariant` 关系表，支持多对多变体关系，每对关系记录差异说明
- 移除 `Exercise.parentId` 和 `isVariant` 字段（后续迁移处理）
- Admin API 提供变体关系 CRUD，前端在动作管理页展示变体管理区块
- 动作详情接口响应增加 `variants` 字段

**Tech Stack:** Prisma + MySQL + Express + React + TypeScript

---

## 文件结构

```
backend/
├── prisma/schema.prisma                          # 新增 ExerciseVariant 模型，移除 parentId/isVariant
├── src/
│   ├── repositories/exerciseVariantRepository.ts # NEW - 变体关系数据访问
│   └── routes/adminExercises.ts                  # MODIFY - 增加变体关系 CRUD 路由

frontend/src/
├── pages/admin/Exercises.tsx                    # MODIFY - 增加变体管理 UI
└── api/admin.ts                                 # MODIFY - 增加变体关系 API 调用
```

---

## Task 1: Prisma Schema 变更

**Files:**
- Modify: `backend/prisma/schema.prisma`

- [ ] **Step 1: 添加 ExerciseVariant 模型并移除 parentId/isVariant**

在 `Exercise` 模型中：
- 移除 `isVariant Boolean @default(false)` 字段
- 移除 `parentId Int?` 字段及其自关联关系

新增 `ExerciseVariant` 模型：
```prisma
model ExerciseVariant {
  id              Int      @id @default(autoincrement())
  exerciseId     Int      @map("exercise_id")
  variantId       Int      @map("variant_id")
  variantType     String   // 'equipment' | 'difficulty' | 'posture'
  differenceNotes String? @db.Text
  createdAt       DateTime @default(now()) @map("created_at")

  exercise   Exercise @relation(fields: [exerciseId], references: [id], onDelete: Cascade)
  variant    Exercise @relation("ExerciseVariants", fields: [variantId], references: [id])

  @@unique([exerciseId, variantId])
  @@index([exerciseId])
  @@index([variantId])
}
```

在 `Exercise` 模型中添加新关系：
```prisma
// 新增：多对多变体关系（替代 parentId 自关联）
variants     ExerciseVariant[] @relation("ExerciseVariants")
asVariant    ExerciseVariant[] @relation("ExerciseVariantTargets")
```

- [ ] **Step 2: 生成迁移**

Run: `cd backend && npx prisma migrate dev --name add_exercise_variant`

预期输出: `Your migration is ready. Please run ...`

- [ ] **Step 3: Commit**

```bash
git add backend/prisma/schema.prisma backend/prisma/migrations/
git commit -m "feat(exercise): add ExerciseVariant model, remove parentId/isVariant"
```

---

## Task 2: ExerciseVariant Repository

**Files:**
- Create: `backend/src/repositories/exerciseVariantRepository.ts`

- [ ] **Step 1: 创建 repository**

```typescript
import prisma from '../lib/prisma';

export const exerciseVariantRepository = {
  async findByExerciseId(exerciseId: number) {
    // 获取 asSource（该动作的变体）和 asTarget（以该动作为变体）
    const [asSource, asTarget] = await Promise.all([
      prisma.exerciseVariant.findMany({
        where: { exerciseId },
        include: { variant: { select: { id: true, name: true } } }
      }),
      prisma.exerciseVariant.findMany({
        where: { variantId: exerciseId },
        include: { exercise: { select: { id: true, name: true } } }
      })
    ]);
    return { asSource, asTarget };
  },

  async create(data: { exerciseId: number; variantId: number; variantType: string; differenceNotes?: string }) {
    return prisma.exerciseVariant.create({ data });
  },

  async update(id: number, data: { variantType?: string; differenceNotes?: string }) {
    return prisma.exerciseVariant.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.exerciseVariant.delete({ where: { id } });
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/repositories/exerciseVariantRepository.ts
git commit -m "feat(exercise): add exerciseVariantRepository"
```

---

## Task 3: Admin 变体关系 API

**Files:**
- Modify: `backend/src/routes/adminExercises.ts`

- [ ] **Step 1: 添加变体关系路由**

在 `adminExercises.ts` 末尾添加：

```typescript
// Validation schemas
const variantRelationSchema = z.object({
  variantId: z.number().min(1, '请选择变体动作'),
  variantType: z.enum(['equipment', 'difficulty', 'posture']),
  differenceNotes: z.string().optional(),
});

const updateVariantSchema = z.object({
  variantType: z.enum(['equipment', 'difficulty', 'posture']).optional(),
  differenceNotes: z.string().optional(),
});

// GET /api/admin/exercises/:id/variants - 获取某动作的所有变体关系
router.get('/:id/variants', async (req: Request, res: Response) => {
  try {
    const exerciseId = parseInt(String(req.params.id));
    const result = await exerciseVariantRepository.findByExerciseId(exerciseId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/exercises/:id/variants - 添加变体关系
router.post('/:id/variants', async (req: Request, res: Response) => {
  try {
    const validationResult = variantRelationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid data', details: validationResult.error.errors });
    }
    const exerciseId = parseInt(String(req.params.id));
    const variant = await exerciseVariantRepository.create({
      exerciseId,
      ...validationResult.data,
    });
    res.json(variant);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/exercises/variants/:id - 编辑变体关系 (:id = ExerciseVariant.id)
router.put('/variants/:id', async (req: Request, res: Response) => {
  try {
    const validationResult = updateVariantSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid data', details: validationResult.error.errors });
    }
    const variant = await exerciseVariantRepository.update(
      parseInt(String(req.params.id)),
      validationResult.data
    );
    res.json(variant);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/exercises/variants/:id - 删除变体关系
router.delete('/variants/:id', async (req: Request, res: Response) => {
  try {
    await exerciseVariantRepository.delete(parseInt(String(req.params.id)));
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});
```

- [ ] **Step 2: 添加 import**

在文件顶部添加：
```typescript
import { exerciseVariantRepository } from '../repositories/exerciseVariantRepository';
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/routes/adminExercises.ts
git commit -m "feat(admin): add exercise variant relationship CRUD API"
```

---

## Task 4: 前端 Admin API

**Files:**
- Modify: `frontend/src/api/admin.ts`

- [ ] **Step 1: 添加变体关系 API**

在 `adminApi` 对象中添加：

```typescript
async getExerciseVariants(exerciseId: number) {
  const { data } = await client.get(`/admin/exercises/${exerciseId}/variants`);
  return data;
},

async createExerciseVariant(exerciseId: number, variant: { variantId: number; variantType: string; differenceNotes?: string }) {
  const { data } = await client.post(`/admin/exercises/${exerciseId}/variants`, variant);
  return data;
},

async updateExerciseVariant(id: number, variant: { variantType?: string; differenceNotes?: string }) {
  const { data } = await client.put(`/admin/exercises/variants/${id}`, variant);
  return data;
},

async deleteExerciseVariant(id: number) {
  await client.delete(`/admin/exercises/variants/${id}`);
},
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/api/admin.ts
git commit -m "feat(admin): add exercise variant API calls"
```

---

## Task 5: Admin 动作页面变体管理 UI

**Files:**
- Modify: `frontend/src/pages/admin/Exercises.tsx`

- [ ] **Step 1: 添加变体管理状态和加载函数**

在组件内添加：
```typescript
const [variantModalExerciseId, setVariantModalExerciseId] = useState<number | null>(null);
const [exerciseVariants, setExerciseVariants] = useState<{asSource: any[]; asTarget: any[]}>({asSource: [], asTarget: []});
const [variantLoading, setVariantLoading] = useState(false);
const [newVariant, setNewVariant] = useState({ variantId: '', variantType: 'equipment', differenceNotes: '' });

const loadVariants = async (exerciseId: number) => {
  setVariantLoading(true);
  try {
    const data = await adminApi.getExerciseVariants(exerciseId);
    setExerciseVariants(data);
  } catch (err) {
    console.error('Failed to load variants', err);
  } finally {
    setVariantLoading(false);
  }
};

const openVariantModal = (exerciseId: number) => {
  setVariantModalExerciseId(exerciseId);
  loadVariants(exerciseId);
};

const handleAddVariant = async () => {
  if (!variantModalExerciseId || !newVariant.variantId) return;
  try {
    await adminApi.createExerciseVariant(variantModalExerciseId, {
      variantId: parseInt(newVariant.variantId),
      variantType: newVariant.variantType,
      differenceNotes: newVariant.differenceNotes,
    });
    setNewVariant({ variantId: '', variantType: 'equipment', differenceNotes: '' });
    await loadVariants(variantModalExerciseId);
  } catch (err) {
    console.error('Failed to add variant', err);
  }
};

const handleDeleteVariant = async (variantRelationId: number) => {
  if (!confirm('确定要删除此变体关系吗？')) return;
  try {
    await adminApi.deleteExerciseVariant(variantRelationId);
    if (variantModalExerciseId) await loadVariants(variantModalExerciseId);
  } catch (err) {
    console.error('Failed to delete variant', err);
  }
};
```

- [ ] **Step 2: 在展开区添加"变体管理"按钮**

在展开区 `expandedExerciseId === exercise.id` 的内容中，`肌肉关联` 信息块后面添加：

```tsx
<div className="flex justify-end mt-2">
  <Button size="sm" variant="outline" onClick={() => openVariantModal(exercise.id!)}>
    变体管理
  </Button>
</div>
```

- [ ] **Step 3: 添加变体管理弹窗**

在 `Modal` 组件后添加新的变体管理弹窗：

```tsx
{/* 变体管理弹窗 */}
<Modal
  isOpen={variantModalExerciseId !== null}
  onClose={() => setVariantModalExerciseId(null)}
  title="变体管理"
  size="lg"
>
  <div className="space-y-4">
    {/* asSource: 该动作的变体 */}
    <div>
      <h4 className="text-sm font-medium mb-2">该动作的变体</h4>
      {variantLoading ? (
        <div className="text-text-muted text-sm">加载中...</div>
      ) : exerciseVariants.asSource.length === 0 ? (
        <div className="text-text-muted text-sm">暂无变体</div>
      ) : (
        <div className="space-y-2">
          {exerciseVariants.asSource.map((v) => (
            <div key={v.id} className="bg-primary-tertiary p-2 rounded text-sm flex justify-between items-start">
              <div>
                <div className="font-medium">{v.variant.name}</div>
                <div className="text-text-muted text-xs">
                  {v.variantType === 'equipment' ? '器械' : v.variantType === 'difficulty' ? '难度' : '姿势'}：{v.differenceNotes || '无'}
                </div>
              </div>
              <Button size="sm" variant="danger" onClick={() => handleDeleteVariant(v.id)}>删除</Button>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* asTarget: 以该动作为变体的动作 */}
    <div>
      <h4 className="text-sm font-medium mb-2">以该动作为变体</h4>
      {exerciseVariants.asTarget.length === 0 ? (
        <div className="text-text-muted text-sm">暂无</div>
      ) : (
        <div className="space-y-2">
          {exerciseVariants.asTarget.map((v) => (
            <div key={v.id} className="bg-primary-tertiary p-2 rounded text-sm flex justify-between items-start">
              <div>
                <div className="font-medium">{v.exercise.name}</div>
                <div className="text-text-muted text-xs">
                  {v.variantType === 'equipment' ? '器械' : v.variantType === 'difficulty' ? '难度' : '姿势'}：{v.differenceNotes || '无'}
                </div>
              </div>
              <Button size="sm" variant="danger" onClick={() => handleDeleteVariant(v.id)}>删除</Button>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* 添加新变体 */}
    <div className="border-t border-border pt-4">
      <h4 className="text-sm font-medium mb-2">添加变体关系</h4>
      <div className="space-y-2">
        <select
          value={newVariant.variantId}
          onChange={(e) => setNewVariant({ ...newVariant, variantId: e.target.value })}
          className="w-full bg-primary-tertiary border border-border px-3 py-2"
        >
          <option value="">选择变体动作</option>
          {exercises
            .filter((ex) => ex.id !== variantModalExerciseId)
            .map((ex) => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
        </select>
        <select
          value={newVariant.variantType}
          onChange={(e) => setNewVariant({ ...newVariant, variantType: e.target.value })}
          className="w-full bg-primary-tertiary border border-border px-3 py-2"
        >
          <option value="equipment">器械变体</option>
          <option value="difficulty">难度变体</option>
          <option value="posture">姿势变体</option>
        </select>
        <textarea
          value={newVariant.differenceNotes}
          onChange={(e) => setNewVariant({ ...newVariant, differenceNotes: e.target.value })}
          placeholder="差异说明（如：重量需下调20%）"
          rows={2}
          className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
        />
        <Button size="sm" variant="primary" onClick={handleAddVariant} disabled={!newVariant.variantId}>
          添加
        </Button>
      </div>
    </div>
  </div>
</Modal>
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/admin/Exercises.tsx
git commit -m "feat(admin): add variant management UI in exercises page"
```

---

## Task 6: 动作详情 API 增加 variants 字段

**Files:**
- Modify: `backend/src/repositories/exerciseRepository.ts`
- Modify: `backend/src/routes/exercises.ts`

- [ ] **Step 1: 修改 findById 返回 variants**

在 `exerciseRepository.ts` 的 `findById` 方法中，在 include 添加 `variants` 关系：

```typescript
async findById(id: number) {
  return prisma.exercise.findUnique({
    where: { id },
    include: {
      muscles: { include: { muscle: true } },
      parent: { select: { id: true, name: true } },
      variants: {
        select: {
          id: true,
          variantId: true,
          variantType: true,
          differenceNotes: true,
          variant: { select: { id: true, name: true } }
        }
      },
    },
  });
},
```

- [ ] **Step 2: 修改响应格式添加 variants**

在 `exercises.ts` 的 `/:id` GET 路由中，确保响应包含 variants 字段。由于 `findById` 已包含 variants，响应自动包含。

- [ ] **Step 3: Commit**

```bash
git add backend/src/repositories/exerciseRepository.ts backend/src/routes/exercises.ts
git commit -m "feat(api): add variants field to exercise detail response"
```

---

## Task 7: 数据库迁移验证

- [ ] **Step 1: 验证迁移**

Run: `cd backend && npx prisma migrate dev --name add_exercise_variant`

如果已有迁移，检查迁移文件是否存在且正确。

- [ ] **Step 2: 验证 Prisma Client**

Run: `cd backend && npx prisma generate`

预期: 生成成功，无错误

- [ ] **Step 3: Commit 迁移文件（如有）**

```bash
git add backend/prisma/migrations/
git commit -m "chore: add exercise variant migration"
```

---

## 自检清单

**1. Spec 覆盖检查：**
- [x] Prisma schema 变更（ExerciseVariant 模型，移除 parentId/isVariant）
- [x] Admin 变体关系 CRUD API（GET/POST/PUT/DELETE）
- [x] Admin 页面变体管理 UI（弹窗形式）
- [x] 动作详情响应增加 variants 字段

**2. 占位符扫描：**
- 无 TBD/TODO
- 无 "添加适当错误处理" 等模糊描述
- 所有代码步骤都有完整代码块

**3. 类型一致性：**
- ExerciseVariant.variantType: `'equipment' | 'difficulty' | 'posture'` — 全程一致
- API 路由参数 `:id` = ExerciseVariant.id — 全程一致
- Repository 方法参数与调用匹配
