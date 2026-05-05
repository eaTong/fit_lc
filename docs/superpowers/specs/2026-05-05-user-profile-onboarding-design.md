# 用户画像引导与简化计划创建设计

**日期**: 2026-05-05
**状态**: Approved

## 目标

用户首次进入系统时引导填写个人信息，之后创建健身计划时自动读取这些数据，无需重复录入。

## 一、数据模型扩展

### UserProfile 表扩展

```prisma
model UserProfile {
  id           Int       @id @default(autoincrement())
  userId       Int       @unique @map("user_id")
  nickname     String?   @db.VarChar(50)
  avatar       String?   @db.VarChar(500)
  height       Float?    @db.Float          // 身高(cm)
  weight       Float?    @db.Float          // 体重(kg)
  bodyFat      Float?    @db.Float          // 体脂率(%)
  experience   String?   @map("experience")  // beginner/intermediate/advanced
  goal         String?   @map("goal")        // bulk/cut/maintain
  hasOnboarded Boolean   @default(false)    @map("has_onboarded")
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**变更说明**：
- 新增 `weight`、`bodyFat`、`experience`、`goal` 字段
- 新增 `hasOnboarded` 标记用户是否已完成引导

## 二、Onboarding 引导页

### 页面路径
`/onboarding`

### 触发条件
- 用户登录后检测 `hasOnboarded = false`
- 中间件强制跳转到 onboarding

### 路由守卫实现
```typescript
// 前端 App.tsx 中增加
<Route path="/onboarding" element={<OnboardingPage />} />

// 中间件：在 UserLayout 中检测
if (!user.hasOnboarded && path !== '/onboarding') {
  return <Navigate to="/onboarding" />;
}
```

### 表单字段

| 字段 | 类型 | 必填 | 验证 |
|------|------|------|------|
| 身高 | number | 是 | 150-220cm |
| 体重 | number | 是 | 40-200kg |
| 体脂 | number | 否 | 5-50% |
| 训练经验 | select | 是 | beginner/intermediate/advanced |
| 目标 | select | 是 | bulk/cut/maintain |

### 提交流程
1. 调用 `POST /api/users/profile` 保存数据
2. 更新 `hasOnboarded = true`
3. 跳转到 `/chat`

## 三、简化计划表单

### PlanForm 改造

**改造后只显示**：
- 训练目标（select，预填用户画像值，可修改）
- 每周训练次数（number，默认3）

**自动读取（隐藏字段）**：
- 身高、体重、体脂
- 训练经验
- 可用器械（暂无，放空）

**提交时合并**：
```typescript
const data: UserProfile = {
  ...userProfile,      // 从用户画像读取
  goal,                // 表单值
  frequency,            // 表单值
  duration_weeks,       // 表单值（默认12）
};
```

## 四、个人中心

### Profile 页面改造

**顶部个人信息卡片**：
- 昵称、头像
- 身高、体重、体脂
- 训练经验、目标

**编辑功能**：
- "编辑个人信息"按钮
- 点击跳转 `/profile/edit` 或弹窗编辑

## 五、API 设计

### 1. 创建/更新用户画像
```
POST /api/users/profile
Body: { height, weight, bodyFat?, experience, goal }
Response: { success: true, profile: {...} }
```

### 2. 获取用户画像
```
GET /api/users/profile
Response: { profile: { height, weight, bodyFat, experience, goal, hasOnboarded } }
```

### 3. 更新 hasOnboarded
```
PATCH /api/users/profile/onboarded
Body: { hasOnboarded: true }
```

## 六、实施顺序

1. **后端**：
   - 修改 Prisma schema
   - 创建 profile API 路由
   - 运行 migration

2. **前端**：
   - 创建 Onboarding 页面
   - 修改 App.tsx 路由守卫
   - 改造 PlanForm 简化版
   - 改造 Profile 页面

3. **测试**：
   - 首次登录跳转 onboarding
   - 填写后跳转到 chat
   - 创建计划时自动填充
   - 个人中心可查看/编辑