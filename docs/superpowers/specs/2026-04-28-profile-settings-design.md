# 个人设置页面设计

## 概述

为 FitLC 用户提供完整的个人设置功能，包括：头像上传、个人信息编辑、健身目标设置、身体数据管理、密码修改。

## 背景

当前 `Profile.tsx` 仅有退出登录功能。用户无法：
- 上传/修改头像
- 编辑昵称等个人信息
- 管理健身目标/身高/体重
- 修改密码

且身高/体重需要历史记录以支持趋势分析。

## 设计

### 数据库模型

**新增 `UserProfile` 表：**
```prisma
model UserProfile {
  id         Int      @id @default(autoincrement())
  userId     Int      @unique @map("user_id")
  nickname   String?  @db.VarChar(50)
  avatar     String?  @db.VarChar(500)  // 头像OSS URL
  height     Float?   @db.Float         // 身高 cm（不变，一份存储）
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_profiles")
}
```

**注：`goal` 不存储在 UserProfile**，跟随用户活跃计划（`UserContext.activePlanName`），生成计划时可选择/修改目标。

**新增 `BodyMetrics` 表（体重/体脂历史，与围度记录明确区分）：**
```prisma
model BodyMetrics {
  id        Int      @id @default(autoincrement())
  userId    Int      @map("user_id")
  date      DateTime @db.Date
  weight    Float    @db.Float         // 体重 kg
  bodyFat   Float?   @db.Float         // 体脂率 %
  createdAt DateTime @default(now()) @map("created_at")

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, date])
  @@index([userId])
  @@map("body_metrics")
}
```

### API 设计

| 方法 | 路径 | 描述 |
|---|---|---|
| GET | `/api/users/me/profile` | 获取当前用户资料 |
| PUT | `/api/users/me/profile` | 更新用户资料（昵称/身高/头像OSS URL） |
| PUT | `/api/users/me/password` | 修改密码（需验证原密码） |
| POST | `/api/users/me/avatar` | 上传头像至阿里云 OSS |
| GET | `/api/users/me/metrics` | 获取体重/体脂历史 |
| POST | `/api/users/me/metrics` | 记录单条体重/体脂数据 |
| DELETE | `/api/users/me/account` | 删除账号（软删除，需验证密码） |

**头像上传响应：**
```json
{
  "url": "https://fitlc-oss.aliyuncs.com/avatars/user-123-1699999999.jpg"
}
```

**账号删除请求体：**
```json
{
  "password": "string"
}
```

### 前端页面结构

```
/profile
├── Tab: 个人信息
│   ├── 头像上传区（阿里云OSS）
│   ├── 昵称输入
│   └── 保存按钮
├── Tab: 身体数据
│   ├── 当前数据卡片（身高来自Profile，体重/体脂来自最新记录）
│   ├── 记录新数据表单（日期、体重、体脂）
│   ├── 历史记录列表
│   └── 趋势图表（可选）
└── Tab: 账号安全
    ├── 修改密码表单
    └── 删除账号（需验证密码，二次确认）
```

### UI 组件

| 组件 | 用途 |
|---|---|
| `AvatarUpload` | 头像上传区（阿里云OSS，支持预览） |
| `ProfileForm` | 个人信息表单（昵称/身高） |
| `MetricsForm` | 身体数据记录表单（体重/体脂） |
| `MetricsHistory` | 历史记录列表 |
| `PasswordForm` | 密码修改表单 |
| `DeleteAccountForm` | 删除账号表单（验证密码+二次确认） |

### 现有组件复用

- `Input` — 文本/数字输入
- `Button` — 操作按钮
- `Card` — 信息卡片
- `TabSwitcher` — Tab 切换

### Store 扩展

```typescript
// authStore.ts 扩展
interface AuthState {
  // ... 现有
  updateProfile: (data: UserProfileData) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;  // 返回 URL
  changePassword: (oldPw: string, newPw: string) => Promise<void>;
}
```

## 实施步骤

1. **数据库**：新增 `UserProfile` 和 `BodyMetrics` 模型，`goal` 不单独存储
2. **阿里云OSS集成**：配置 OSS上传，获取 `accessKeyId`/`accessKeySecret`/`bucket`
3. **后端路由**：新建 `users.ts` 路由，包含 profile/password/avatar/metrics/account
4. **后端服务**：新建 `userService.ts`
5. **前端 API**：新增 `userApi.ts`
6. **前端 Store**：扩展 `authStore`
7. **前端页面**：重构 `Profile.tsx`，新增表单和 Tab 逻辑
8. **前端组件**：新建 `AvatarUpload`、`MetricsHistory`、`DeleteAccountForm` 等
9. **账号删除**：软删除 `User.deletedAt`，清除 JWT

## 验收标准

- [ ] 用户可以上传头像至阿里云OSS并立即显示
- [ ] 用户可以编辑昵称、身高
- [ ] 用户可以记录体重/体脂历史
- [ ] 用户可以查看身体数据历史列表
- [ ] 用户可以修改密码（原密码验证）
- [ ] 用户可以删除账号（二次确认+密码验证）
- [ ] 所有表单有基础的客户端验证
- [ ] 修改成功后有 Toast 提示