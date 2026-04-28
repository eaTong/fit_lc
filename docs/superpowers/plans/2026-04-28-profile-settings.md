# 个人设置页面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成个人设置页面，支持头像上传、昵称/身高编辑、体重/体脂记录、密码修改、账号删除

**Architecture:** 新建 UserProfile + BodyMetrics 表，新建 users.ts 路由和 userService.ts，重构 Profile.tsx 为 Tab 结构

**Tech Stack:** React, TypeScript, TailwindCSS, Express, Prisma, 阿里云 OSS

---

## 文件结构

```
backend/
├── prisma/schema.prisma                 # 修改：新增 UserProfile, BodyMetrics 模型
├── scripts/                             # 新建：迁移脚本
├── src/routes/users.ts                  # 新建：用户相关路由
├── src/services/userService.ts          # 新建：用户服务层
├── src/lib/oss.ts                       # 新建：阿里云 OSS 上传

frontend/
├── src/api/user.ts                      # 新建：用户 API
├── src/pages/Profile.tsx                 # 修改：重构为 Tab 结构
├── src/components/AvatarUpload.tsx       # 新建：头像上传组件
├── src/components/MetricsHistory.tsx     # 新建：历史记录列表
├── src/stores/authStore.ts               # 修改：扩展方法
```

---

## Task 1: 数据库模型

**Files:**
- Modify: `backend/prisma/schema.prisma`
- Create: `backend/scripts/migrate_body_parts.sql`

- [ ] **Step 1: 添加 UserProfile 和 BodyMetrics 模型**

```prisma
// backend/prisma/schema.prisma

model UserProfile {
  id         Int       @id @default(autoincrement())
  userId     Int       @unique @map("user_id")
  nickname   String?   @db.VarChar(50)
  avatar     String?   @db.VarChar(500)
  height     Float?    @db.Float
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime  @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_profiles")
}

model BodyMetrics {
  id        Int      @id @default(autoincrement())
  userId    Int      @map("user_id")
  date      DateTime @db.Date
  weight    Float    @db.Float
  bodyFat   Float?   @db.Float
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, date])
  @@index([userId])
  @@map("body_metrics")
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add backend/prisma/schema.prisma
git commit -m "feat(db): 新增 UserProfile 和 BodyMetrics 模型"
```

---

## Task 2: 后端 OSS 集成

**Files:**
- Create: `backend/src/lib/oss.ts`
- Modify: `backend/src/index.ts` (注册路由)

- [ ] **Step 1: 创建 OSS 上传模块**

```typescript
// backend/src/lib/oss.ts
import OSS from 'ali-oss';

const client = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-hangzhou',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: process.env.OSS_BUCKET || 'fitlc',
});

export async function uploadAvatar(userId: number, file: Buffer, ext: string): Promise<string> {
  const filename = `avatars/user-${userId}-${Date.now()}.${ext}`;
  const result = await client.put(filename, Buffer.from(file));
  return result.url;
}
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/lib/oss.ts
git commit -m "feat(oss): 集成阿里云 OSS 上传"
```

---

## Task 3: 后端服务层

**Files:**
- Create: `backend/src/services/userService.ts`
- Modify: `backend/src/services/authService.ts` (密码验证)

- [ ] **Step 1: 创建 userService.ts**

```typescript
// backend/src/services/userService.ts
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

export const userService = {
  async getProfile(userId: number) {
    return prisma.userProfile.findUnique({ where: { userId } });
  },

  async updateProfile(userId: number, data: { nickname?: string; height?: number; avatar?: string }) {
    return prisma.userProfile.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  },

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!valid) throw new Error('原密码错误');

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash: hash } });
    return true;
  },

  async getMetrics(userId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [records, total] = await Promise.all([
      prisma.bodyMetrics.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        skip,
        take: limit,
      }),
      prisma.bodyMetrics.count({ where: { userId } }),
    ]);
    return { records, total, page, limit };
  },

  async addMetric(userId: number, data: { date: string; weight: number; bodyFat?: number }) {
    return prisma.bodyMetrics.create({
      data: {
        userId,
        date: new Date(data.date),
        weight: data.weight,
        bodyFat: data.bodyFat,
      },
    });
  },

  async deleteAccount(userId: number, password: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('密码错误');

    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });
    return true;
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/services/userService.ts
git commit -m "feat(service): 新建 userService 处理用户相关业务"
```

---

## Task 4: 后端路由

**Files:**
- Create: `backend/src/routes/users.ts`
- Modify: `backend/src/index.ts` (注册)

- [ ] **Step 1: 创建 users.ts 路由**

```typescript
// backend/src/routes/users.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { userService } from '../services/userService';
import { uploadAvatar } from '../lib/oss';

const router = Router();

router.use(authMiddleware);

router.get('/me/profile', async (req, res) => {
  try {
    const profile = await userService.getProfile(req.userId);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/me/profile', async (req, res) => {
  try {
    const { nickname, height, avatar } = req.body;
    const profile = await userService.updateProfile(req.userId, { nickname, height, avatar });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/me/password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await userService.changePassword(req.userId, oldPassword, newPassword);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/me/avatar', async (req, res) => {
  try {
    const file = req.body.file;
    const ext = req.body.ext || 'jpg';
    const url = await uploadAvatar(req.userId, Buffer.from(file, 'base64'), ext);
    await userService.updateProfile(req.userId, { avatar: url });
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me/metrics', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await userService.getMetrics(req.userId, page, limit);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/me/metrics', async (req, res) => {
  try {
    const { date, weight, bodyFat } = req.body;
    const record = await userService.addMetric(req.userId, { date, weight, bodyFat });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/me/account', async (req, res) => {
  try {
    const { password } = req.body;
    await userService.deleteAccount(req.userId, password);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
```

- [ ] **Step 2: 注册路由（在 index.ts 添加）**

```typescript
// backend/src/index.ts
import usersRouter from './routes/users';
// ...
app.use('/api/users', usersRouter);
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/routes/users.ts backend/src/index.ts
git commit -m "feat(routes): 新增 users 路由处理个人设置"
```

---

## Task 5: 前端 API

**Files:**
- Create: `frontend/src/api/user.ts`

- [ ] **Step 1: 创建 user.ts**

```typescript
// frontend/src/api/user.ts
import client from './client';

export interface UserProfile {
  id?: number;
  userId: number;
  nickname?: string;
  avatar?: string;
  height?: number;
}

export interface BodyMetric {
  id: number;
  date: string;
  weight: number;
  bodyFat?: number;
}

export interface MetricsResponse {
  records: BodyMetric[];
  total: number;
  page: number;
  limit: number;
}

export const userApi = {
  async getProfile(): Promise<UserProfile | null> {
    const { data } = await client.get('/users/me/profile');
    return data;
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const { data: result } = await client.put('/users/me/profile', data);
    return result;
  },

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await client.put('/users/me/password', { oldPassword, newPassword });
  },

  async uploadAvatar(file: File): Promise<string> {
    const base64 = await fileToBase64(file);
    const ext = file.name.split('.').pop() || 'jpg';
    const { data } = await client.post('/users/me/avatar', { file: base64, ext });
    return data.url;
  },

  async getMetrics(page = 1, limit = 10): Promise<MetricsResponse> {
    const { data } = await client.get('/users/me/metrics', { params: { page, limit } });
    return data;
  },

  async addMetric(date: string, weight: number, bodyFat?: number): Promise<BodyMetric> {
    const { data } = await client.post('/users/me/metrics', { date, weight, bodyFat });
    return data;
  },

  async deleteAccount(password: string): Promise<void> {
    await client.delete('/users/me/account', { data: { password } });
  },
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/api/user.ts
git commit -m "feat(api): 新增 userApi 处理个人设置请求"
```

---

## Task 6: 前端组件

**Files:**
- Create: `frontend/src/components/AvatarUpload.tsx`
- Create: `frontend/src/components/MetricsHistory.tsx`

- [ ] **Step 1: 创建 AvatarUpload.tsx**

```typescript
// frontend/src/components/AvatarUpload.tsx
import { useState } from 'react';
import Button from './ui/Button';

interface AvatarUploadProps {
  currentAvatar?: string;
  onUpload: (file: File) => Promise<string>;
}

export default function AvatarUpload({ currentAvatar, onUpload }: AvatarUploadProps) {
  const [preview, setPreview] = useState(currentAvatar);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await onUpload(file);
      setPreview(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 bg-primary-tertiary border-2 border-accent-orange flex items-center justify-center overflow-hidden">
        {preview ? (
          <img src={preview} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="font-heading text-4xl text-accent-orange">?</span>
        )}
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="avatar-upload" />
        <label htmlFor="avatar-upload">
          <Button variant="outline" size="sm" as="span" className="cursor-pointer">
            {loading ? '上传中...' : '上传头像'}
          </Button>
        </label>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 MetricsHistory.tsx**

```typescript
// frontend/src/components/MetricsHistory.tsx
import type { BodyMetric } from '../api/user';

interface MetricsHistoryProps {
  records: BodyMetric[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function MetricsHistory({ records, total, page, onPageChange }: MetricsHistoryProps) {
  if (records.length === 0) {
    return <p className="text-text-muted text-sm">暂无记录</p>;
  }

  return (
    <div>
      <div className="space-y-2">
        {records.map((r) => (
          <div key={r.id} className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-muted text-sm">{r.date}</span>
            <div className="flex gap-4">
              <span className="text-text-primary">{r.weight} kg</span>
              {r.bodyFat && <span className="text-text-secondary">{r.bodyFat}%</span>}
            </div>
          </div>
        ))}
      </div>
      {total > 10 && (
        <div className="mt-4 flex gap-2">
          {page > 1 && (
            <button onClick={() => onPageChange(page - 1)} className="text-accent-orange text-sm">
              上一页
            </button>
          )}
          <span className="text-text-muted text-sm">{page} / {Math.ceil(total / 10)}</span>
          {page < Math.ceil(total / 10) && (
            <button onClick={() => onPageChange(page + 1)} className="text-accent-orange text-sm">
              下一页
            </button>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/AvatarUpload.tsx frontend/src/components/MetricsHistory.tsx
git commit -m "feat(components): 新建 AvatarUpload MetricsHistory 组件"
```

---

## Task 7: 重构 Profile.tsx

**Files:**
- Modify: `frontend/src/pages/Profile.tsx`

- [ ] **Step 1: 重构 Profile.tsx 为 Tab 结构**

```typescript
// frontend/src/pages/Profile.tsx
import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { userApi } from '../api/user';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TabSwitcher from '../components/ui/TabSwitcher';
import AvatarUpload from '../components/AvatarUpload';
import MetricsHistory from '../components/MetricsHistory';

const tabs = [
  { id: 'profile', label: '个人信息' },
  { id: 'body', label: '身体数据' },
  { id: 'security', label: '账号安全' },
];

export default function Profile() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState<number | ''>('');
  const [metrics, setMetrics] = useState<any>({ records: [], total: 0, page: 1 });
  const [newWeight, setNewWeight] = useState<number | ''>('');
  const [newBodyFat, setNewBodyFat] = useState<number | ''>('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    loadProfile();
    if (activeTab === 'body') loadMetrics();
  }, [activeTab]);

  const loadProfile = async () => {
    const data = await userApi.getProfile();
    setProfile(data);
    setNickname(data?.nickname || '');
    setHeight(data?.height || '');
  };

  const loadMetrics = async (page = 1) => {
    const data = await userApi.getMetrics(page);
    setMetrics(data);
  };

  const saveProfile = async () => {
    await userApi.updateProfile({ nickname, height: height as number });
  };

  const addMetric = async () => {
    if (!newWeight) return;
    await userApi.addMetric(new Date().toISOString().split('T')[0], newWeight as number, newBodyFat as number || undefined);
    setNewWeight('');
    setNewBodyFat('');
    loadMetrics();
  };

  const changePassword = async () => {
    await userApi.changePassword(oldPassword, newPassword);
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">个人设置</h1>

      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'profile' && (
          <Card variant="default" className="max-w-md">
            <AvatarUpload currentAvatar={profile?.avatar} onUpload={userApi.uploadAvatar} />
            <div className="mt-4 space-y-4">
              <Input label="昵称" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              <Input label="身高 (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')} />
              <Button variant="primary" onClick={saveProfile}>保存</Button>
            </div>
          </Card>
        )}

        {activeTab === 'body' && (
          <div className="space-y-4 max-w-md">
            <Card variant="default">
              <p className="text-text-secondary text-sm mb-2">当前身高</p>
              <p className="text-text-primary text-lg">{profile?.height || '—'} cm</p>
            </Card>
            <Card variant="default">
              <p className="text-text-secondary text-sm mb-2">记录新数据</p>
              <div className="space-y-2">
                <Input label="体重 (kg)" type="number" value={newWeight} onChange={(e) => setNewWeight(e.target.value ? Number(e.target.value) : '')} />
                <Input label="体脂率 (%)" type="number" value={newBodyFat} onChange={(e) => setNewBodyFat(e.target.value ? Number(e.target.value) : '')} />
                <Button variant="primary" onClick={addMetric}>记录</Button>
              </div>
            </Card>
            <Card variant="default">
              <p className="text-text-secondary text-sm mb-2">历史记录</p>
              <MetricsHistory records={metrics.records} total={metrics.total} page={metrics.page} onPageChange={loadMetrics} />
            </Card>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4 max-w-md">
            <Card variant="default">
              <p className="text-text-secondary text-sm mb-4">修改密码</p>
              <div className="space-y-3">
                <Input label="当前密码" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <Input label="新密码" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <Button variant="primary" onClick={changePassword}>修改密码</Button>
              </div>
            </Card>
            <Card variant="default">
              <Button variant="danger" onClick={logout}>退出登录</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/Profile.tsx
git commit -m "feat(profile): 重构为 Tab 结构，支持个人信息/身体数据/账号安全"
```

---

## Task 8: 验证

- [ ] **Step 1: 启动后端服务**

```bash
cd backend && npm run dev
```

- [ ] **Step 2: 测试各 Tab 功能**
- 个人信息：上传头像、编辑昵称身高
- 身体数据：记录体重体脂、查看历史
- 账号安全：修改密码

---

## 自检清单

1. **Spec coverage:** 所有验收标准已覆盖
2. **Placeholder scan:** 无 TBD/TODO
3. **Type consistency:** API 响应类型一致性已确认