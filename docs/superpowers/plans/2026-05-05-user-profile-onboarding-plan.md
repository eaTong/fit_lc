# 用户画像引导与简化计划创建实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现首次登录引导页、用户画像存储、计划创建简化

**Architecture:** 前端首次登录检测跳转到Onboarding页，后端扩展UserProfile表存储完整信息，PlanForm从用户画像自动填充字段

**Tech Stack:** React + Zustand + Prisma + Express

---

## 文件结构

```
backend/
├── prisma/schema.prisma          # 扩展UserProfile表
├── src/routes/users.ts           # 扩展profile API
├── src/services/userService.ts   # 更新profile逻辑

frontend/
├── src/App.tsx                   # 添加onboarding路由
├── src/pages/Onboarding.tsx      # 新建：引导页
├── src/stores/authStore.ts       # 添加hasOnboarded状态
├── src/api/user.ts               # 新建：user API
├── src/components/PlanForm.tsx    # 简化为2字段
├── src/pages/Profile.tsx          # 添加个人信息卡片
```

---

## 实施任务

### Task 1: 扩展后端 UserProfile 表

**Files:**
- Modify: `backend/prisma/schema.prisma:323-335`

- [ ] **Step 1: 修改 Prisma schema**

```prisma
model UserProfile {
  id           Int       @id @default(autoincrement())
  userId       Int       @unique @map("user_id")
  nickname     String?   @db.VarChar(50)
  avatar       String?   @db.VarChar(500)
  height       Float?    @db.Float          // 身高(cm)
  weight       Float?    @db.Float          // 体重(kg) - 新增
  bodyFat      Float?    @db.Float          // 体脂率(%) - 新增
  experience   String?   @map("experience") // beginner/intermediate/advanced - 新增
  goal         String?   @map("goal")        // bulk/cut/maintain - 新增
  hasOnboarded Boolean   @default(false)    @map("has_onboarded") // 新增
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@map("user_profiles")
}
```

- [ ] **Step 2: 运行 Prisma migration**

```bash
cd backend
npx prisma db push 2>&1
```

Expected output: `The database is already in sync with the Prisma schema.`

- [ ] **Step 3: 提交**

```bash
git add backend/prisma/schema.prisma
git commit -m "feat: extend UserProfile with weight, bodyFat, experience, goal, hasOnboarded"
```

---

### Task 2: 扩展后端 Profile API

**Files:**
- Modify: `backend/src/routes/users.ts:19-27`
- Modify: `backend/src/services/userService.ts`

- [ ] **Step 1: 查看现有 userService**

```bash
cat backend/src/services/userService.ts | head -80
```

- [ ] **Step 2: 修改 PUT /me/profile 路由支持新字段**

```typescript
router.put('/me/profile', async (req, res) => {
  try {
    const { nickname, height, weight, bodyFat, experience, goal, avatar } = req.body;
    const profile = await userService.updateProfile(req.user.id, {
      nickname, height, weight, bodyFat, experience, goal, avatar
    });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
```

- [ ] **Step 3: 添加 PATCH /me/profile/onboarded 路由**

在 `backend/src/routes/users.ts` 末尾添加:

```typescript
router.patch('/me/profile/onboarded', async (req, res) => {
  try {
    const { hasOnboarded } = req.body;
    const profile = await userService.updateProfile(req.user.id, { hasOnboarded });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
```

- [ ] **Step 4: 更新 userService.updateProfile**

查看并修改 `backend/src/services/userService.ts` 中的 `updateProfile` 函数，确保支持新字段 `weight`, `bodyFat`, `experience`, `goal`, `hasOnboarded`

- [ ] **Step 5: 提交**

```bash
git add backend/src/routes/users.ts backend/src/services/userService.ts
git commit -m "feat: extend profile API with weight, bodyFat, experience, goal, hasOnboarded"
```

---

### Task 3: 创建前端 User API

**Files:**
- Create: `frontend/src/api/user.ts`

- [ ] **Step 1: 创建 user API**

```typescript
import client from './client';

export const userApi = {
  async getProfile(): Promise<{ profile: any }> {
    const { data } = await client.get('/users/me/profile');
    return data;
  },

  async updateProfile(profile: {
    nickname?: string;
    height?: number;
    weight?: number;
    bodyFat?: number;
    experience?: string;
    goal?: string;
    avatar?: string;
  }): Promise<{ profile: any }> {
    const { data } = await client.put('/users/me/profile', profile);
    return data;
  },

  async setOnboarded(): Promise<void> {
    await client.patch('/users/me/profile/onboarded', { hasOnboarded: true });
  },
};
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/api/user.ts
git commit -m "feat: add user API for profile management"
```

---

### Task 4: 更新前端 authStore

**Files:**
- Modify: `frontend/src/stores/authStore.ts`

- [ ] **Step 1: 查看现有 authStore**

```bash
cat frontend/src/stores/authStore.ts | head -50
```

- [ ] **Step 2: 添加 hasOnboarded 状态**

在 AuthState 接口中添加:
```typescript
hasOnboarded: boolean;
```

在 store 初始状态中添加:
```typescript
hasOnboarded: false,
```

- [ ] **Step 3: 在 login 成功后获取 profile 检查 onboarding 状态**

修改 login 函数，在登录成功后调用获取 profile 并设置 hasOnboarded

- [ ] **Step 4: 提交**

```bash
git add frontend/src/stores/authStore.ts
git commit -m "feat: add hasOnboarded state to authStore"
```

---

### Task 5: 创建 Onboarding 引导页

**Files:**
- Create: `frontend/src/pages/Onboarding.tsx`

- [ ] **Step 1: 创建 Onboarding 页面**

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/user';
import { useAuthStore } from '../stores/authStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const experienceOptions = [
  { value: 'beginner', label: '初学者' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
];

const goalOptions = [
  { value: 'bulk', label: '增肌' },
  { value: 'cut', label: '减脂' },
  { value: 'maintain', label: '维持' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const setHasOnboarded = useAuthStore((s) => s.setHasOnboarded);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [goal, setGoal] = useState('bulk');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApi.updateProfile({
        height: parseFloat(height),
        weight: parseFloat(weight),
        bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
        experience,
        goal,
      });
      await userApi.setOnboarded();
      setHasOnboarded(true);
      navigate('/chat');
    } catch (err) {
      console.error('Onboarding failed:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <h1 className="font-heading text-2xl font-bold text-accent-orange text-center mb-2">
          欢迎使用 FitLC
        </h1>
        <p className="text-text-secondary text-center mb-6">
          让我们先了解一下您的基本情况
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-1">身高 (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
                required
                min={150}
                max={220}
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-1">体重 (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
                required
                min={40}
                max={200}
              />
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-1">体脂率 (%) 可选</label>
            <input
              type="number"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              placeholder="18.5"
              className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
              step="0.1"
              min={5}
              max={50}
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-1">训练经验</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
            >
              {experienceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-1">训练目标</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
            >
              {goalOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? '保存中...' : '开始健身之旅'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: 添加 setHasOnboarded 方法到 authStore**

在 authStore 中添加:
```typescript
setHasOnboarded: (value: boolean) => set({ hasOnboarded: value }),
```

- [ ] **Step 3: 在 App.tsx 添加路由**

在 `frontend/src/App.tsx` 中添加:
```tsx
<Route path="/onboarding" element={<Onboarding />} />
```

- [ ] **Step 4: 提交**

```bash
git add frontend/src/pages/Onboarding.tsx frontend/src/stores/authStore.ts frontend/src/App.tsx
git commit -m "feat: add onboarding page for new users"
```

---

### Task 6: 添加路由守卫

**Files:**
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: 修改 UserLayout 添加 onboarding 守卫**

在 UserLayout 组件中添加:
```tsx
function UserLayout() {
  const { isAuthenticated, hasOnboarded } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" />;

  // 未完成 onboarding 且不在 onboarding 页面，强制跳转
  if (!hasOnboarded && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppTipBanner />
      <Outlet />
    </div>
  );
}
```

- [ ] **Step 2: 确保 onboarding 页面无需认证**

Onboarding 页面应该在 UserLayout 之外，或者添加白名单逻辑

- [ ] **Step 3: 提交**

```bash
git add frontend/src/App.tsx
git commit -m "feat: add onboarding guard to UserLayout"
```

---

### Task 7: 简化 PlanForm

**Files:**
- Modify: `frontend/src/components/PlanForm.tsx`

- [ ] **Step 1: 重写 PlanForm 为简化版**

新版本只包含 2 个可见字段：goal 和 frequency
其他字段从 userProfile 自动读取

```tsx
import { FormEvent, useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import { userApi } from '../api/user';
import Button from './ui/Button';

interface PlanFormProps {
  onSubmit: (data: UserProfile) => Promise<void>;
  isLoading?: boolean;
}

const goalOptions = [
  { value: 'bulk', label: '增肌' },
  { value: 'cut', label: '减脂' },
  { value: 'maintain', label: '维持' },
];

export default function PlanForm({ onSubmit, isLoading }: PlanFormProps) {
  const [goal, setGoal] = useState('bulk');
  const [frequency, setFrequency] = useState(3);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    userApi.getProfile().then(({ profile }) => {
      setUserProfile(profile);
      if (profile.goal) setGoal(profile.goal);
    }).catch(console.error);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data: UserProfile = {
      goal: goal as UserProfile['goal'],
      frequency,
      experience: (userProfile?.experience as UserProfile['experience']) || 'beginner',
      equipment: userProfile?.equipment || '徒手',
      body_weight: userProfile?.weight,
      height: userProfile?.height,
      body_fat: userProfile?.bodyFat,
      duration_weeks: 12,
    };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-text-secondary text-sm mb-1">训练目标</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
          >
            {goalOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-text-secondary text-sm mb-1">每周训练次数</label>
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            min={1}
            max={7}
            className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
          />
        </div>
      </div>

      <div className="text-text-secondary text-sm bg-primary-secondary p-3 rounded">
        <p>身高: {userProfile?.height || '—'} cm | 体重: {userProfile?.weight || '—'} kg</p>
        <p>训练经验: {userProfile?.experience === 'beginner' ? '初学' : userProfile?.experience === 'intermediate' ? '中级' : '高级'}</p>
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? '生成中...' : '生成健身计划'}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: 更新 types/index.ts 中的 UserProfile 确保一致性**

确保 UserProfile 接口的字段名与后端一致（bodyFat vs body_fat）

- [ ] **Step 3: 提交**

```bash
git add frontend/src/components/PlanForm.tsx frontend/src/types/index.ts
git commit -m "feat: simplify PlanForm to 2 visible fields with auto-filled profile data"
```

---

### Task 8: 改造 Profile 页面添加个人信息卡片

**Files:**
- Modify: `frontend/src/pages/Profile.tsx`

- [ ] **Step 1: 在 Profile 页面顶部添加个人信息卡片**

在 `<h1 className="font-heading text-3xl font-bold mb-6">我的</h1>` 之后添加:

```tsx
{/* 个人信息卡片 */}
<Card className="mb-6">
  <div className="flex items-center justify-between mb-2">
    <h2 className="font-heading text-lg font-semibold text-text-primary">基本信息</h2>
    <button className="text-accent-orange text-sm">编辑</button>
  </div>
  <div className="grid grid-cols-3 gap-4 text-center">
    <div>
      <div className="text-2xl font-bold text-accent-orange">{profile?.height || '—'}</div>
      <div className="text-text-secondary text-sm">身高(cm)</div>
    </div>
    <div>
      <div className="text-2xl font-bold text-accent-orange">{profile?.weight || '—'}</div>
      <div className="text-text-secondary text-sm">体重(kg)</div>
    </div>
    <div>
      <div className="text-2xl font-bold text-accent-orange">{profile?.bodyFat || '—'}</div>
      <div className="text-text-secondary text-sm">体脂(%)</div>
    </div>
  </div>
  <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4 text-center text-sm">
    <div>
      <span className="text-text-secondary">训练经验: </span>
      <span className="text-text-primary">
        {profile?.experience === 'beginner' ? '初学' : profile?.experience === 'intermediate' ? '中级' : '高级'}
      </span>
    </div>
    <div>
      <span className="text-text-secondary">目标: </span>
      <span className="text-text-primary">
        {profile?.goal === 'bulk' ? '增肌' : profile?.goal === 'cut' ? '减脂' : '维持'}
      </span>
    </div>
  </div>
</Card>
```

- [ ] **Step 2: 添加 useEffect 获取 profile 数据**

在 Profile 组件中添加:
```tsx
const [profile, setProfile] = useState<any>(null);

useEffect(() => {
  userApi.getProfile().then(({ profile }) => setProfile(profile)).catch(console.error);
}, []);
```

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/Profile.tsx
git commit -m "feat: add profile info card to Profile page"
```

---

## 实施检查清单

- [ ] Task 1: Prisma schema 扩展
- [ ] Task 2: Profile API 扩展
- [ ] Task 3: 前端 User API 创建
- [ ] Task 4: authStore 添加 hasOnboarded
- [ ] Task 5: Onboarding 页面创建
- [ ] Task 6: 路由守卫添加
- [ ] Task 7: PlanForm 简化
- [ ] Task 8: Profile 页面改造

---

## 测试场景

1. **首次登录**: 新用户登录后强制跳转到 /onboarding
2. **填写引导**: 填写表单后跳转到 /chat
3. **计划创建**: 再次进入 /plans/new 时表单已预填
4. **个人中心**: Profile 页面显示个人信息卡片
5. **编辑信息**: 可修改个人信息

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-05-user-profile-onboarding-plan.md`**

两个执行选项:
1. **Subagent-Driven (recommended)** - 我调度子代理逐任务执行
2. **Inline Execution** - 本会话内串行执行，批量提交

选择哪个？