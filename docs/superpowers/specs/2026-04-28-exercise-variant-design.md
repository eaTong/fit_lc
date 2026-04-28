# 动作变体系统设计

**日期：** 2026-04-28
**状态：** 设计完成，待实施

---

## 1. 背景与目标

### 1.1 现状
当前 `Exercise` 模型已有 `parentId`（自关联）字段用于表达"变体关系"，但存在以下问题：
- `parentId` 是单向一对多关系，无法表达"一个动作有多个变体、且每个变体与它的关系各有差异"
- 无专门展示"动作变体差异"的 UI
- 历史记录直接存动作 ID，查询时无法利用变体关系

### 1.2 目标
- 建立标准化的动作变体关系管理（多对多，每对关系记录差异说明）
- 在动作详情页展示"相关变体"及其差异
- AI 记录训练时按动作名称直接精确匹配，无需处理变体层级

---

## 2. 数据模型设计

### 2.1 新增关系表

```prisma
model ExerciseVariant {
  id              Int      @id @default(autoincrement())
  exerciseId     Int      @map("exercise_id")
  variantId       Int      @map("variant_id")
  variantType     String   // 'equipment' | 'difficulty' | 'posture'
  differenceNotes String? @db.Text // 与该变体的差异说明
  createdAt       DateTime @default(now()) @map("created_at")

  exercise   Exercise @relation(fields: [exerciseId], references: [id])
  variant    Exercise @relation("ExerciseVariants", fields: [variantId], references: [id])

  @@unique([exerciseId, variantId])
  @@index([exerciseId])
  @@index([variantId])
}
```

### 2.2 关系说明
- `exerciseId` — 主动作（参考动作）
- `variantId` — 变体动作
- `differenceNotes` — 从 `exerciseId` 视角看，与 `variantId` 的差异（例如："杠铃卧推 → 哑铃卧推：重量需下调20%，动作幅度更自由"）
- 关系是**有向的**：A→B 和 B→A 是两条独立记录，各自记录差异
- 同一对动作可以同时存在 equipment 变体和 difficulty 变体两种关系

### 2.3 修改 Exercise 模型

移除 `parentId` 和 `isVariant` 字段（不再需要），保留：
- `variantType` — 保留作为动作自身属性，表示"该动作是什么类型的变体"
- `conversionGuide` — 保留，动作自身的使用/转换指南（与 `ExerciseVariant.differenceNotes` 互补）

---

## 3. 功能模块设计

### 3.1 Admin 动作管理

**新增变体关系：**
- 在 `/admin/exercises` 页面，为动作增加"添加变体"功能
- 选择目标变体动作 → 选择变体类型（equipment/difficulty/posture）→ 填写差异说明
- 同一对动作可添加多个变体关系（不同 variantType）

**编辑/删除变体关系：**
- 在动作详情展开区显示所有已关联变体
- 可编辑差异说明或删除关系

### 3.2 动作详情页展示

在 `/exercises/:id` 详情页（或 Admin 详情弹窗），展示：

**相关变体列表：**
- 该动作的变体（`variantId` where `exerciseId` = 当前动作）
- 反向关系：该动作作为其他动作的变体（`exerciseId` where `variantId` = 当前动作）
- 每条关系显示：变体名称、variantType 标签、差异说明

**变体卡片展示：**
```
┌─────────────────────────────────┐
│ 🔄 哑铃卧推           [器械变体] │
│ 差异：从杠铃卧推切换时，重量需     │
│ 降低约20%，注意手臂角度控制      │
└─────────────────────────────────┘
```

### 3.3 AI 记录行为

**不变。** 记录训练时按动作名称直接精确匹配：
- 用户说"卧推" → 匹配"卧推"动作
- 用户说"哑铃卧推" → 匹配"哑铃卧推"动作
- AI 无需处理变体关系，无需追问变体确认

变体关系在**展示层**使用，不影响记录逻辑。

### 3.4 历史数据查询

历史记录中的 `workout_exercises.exercise_name` 直接存储动作名称。

变体关系不改变历史存储方式，历史查询结果直接展示动作名称。

如需展示动作的变体信息（如"查看这条记录的器械类型"），可通过 `exerciseId` join `Exercise` 获取 `variantType`。

---

## 4. API 设计

### 4.1 Admin 变体关系管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/admin/exercises/:id/variants` | 获取某动作的所有变体关系 |
| POST | `/admin/exercises/:id/variants` | 添加变体关系 |
| PUT | `/admin/exercises/variants/:variantId` | 编辑变体关系 |
| DELETE | `/admin/exercises/variants/:variantId` | 删除变体关系 |

**POST /admin/exercises/:id/variants 请求体：**
```json
{
  "variantId": 5,
  "variantType": "equipment",
  "differenceNotes": "从杠铃切换时，重量需下调20%"
}
```

**GET /admin/exercises/:id/variants 响应：**
```json
{
  "asSource": [
    {
      "id": 1,
      "variantId": 5,
      "variantName": "哑铃卧推",
      "variantType": "equipment",
      "differenceNotes": "从杠铃切换时，重量需下调20%"
    }
  ],
  "asTarget": [
    {
      "id": 2,
      "exerciseId": 3,
      "exerciseName": "上斜杠铃卧推",
      "variantType": "posture",
      "differenceNotes": "相比平卧，角度更针对上胸"
    }
  ]
}
```

### 4.2 动作详情

**GET /api/exercises/:id** 响应中增加：
```json
{
  "variants": [
    {
      "id": 1,
      "exerciseId": 2,
      "exerciseName": "杠铃卧推",
      "variantType": "equipment",
      "differenceNotes": "哑铃卧推的优势是角度更自由"
    }
  ]
}
```

---

## 5. 前端 UI 设计

### 5.1 Admin 动作列表

在每个动作的展开区（已有），新增"变体管理"区块：
- 列出 asSource（该动作的变体）和 asTarget（以该动作为变体的动作）
- 每个变体显示：名称、类型标签、差异说明简要
- "添加变体"按钮打开弹窗选择动作

### 5.2 动作详情弹窗

在 Admin 详情弹窗中增加"相关变体"区块，展示格式参考 3.3。

### 5.3 用户端动作库（可选后续）

`/exercises` 页面保持平铺展示（不变）。

动作详情页（如果后续有）展示"相关变体"和差异说明。

---

## 6. 实施范围

本次实施不包括：
- 用户端动作详情页（`/exercises/:id` 详情页尚未存在）
- 历史记录查看变体元数据

本次实施包括：
- Prisma schema 修改（新增 ExerciseVariant 表）
- Admin 变体关系 CRUD API
- Admin 页面增加变体管理 UI
- 动作详情响应增加 variants 字段

---

## 7. 依赖与风险

- 无新依赖外部服务
- 移除 `parentId` 字段需做数据库迁移
- 历史数据中的 `parentId` 无数据可以不管
