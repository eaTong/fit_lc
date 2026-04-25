# 用户角色权限系统实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 增加用户角色（管理员、普通用户），动作库和肌肉库维护功能仅管理员可访问。

**Architecture:**
- 数据库：新增 Role 和 UserRole 关联表，用户多角色支持
- 后端：JWT 中嵌入用户角色，requireRole 中间件保护 admin 路由
- 前端：基于角色的动态菜单，AdminRoute 守卫保护管理页面

**Tech Stack:** Prisma ORM, Express.js, React Router, Zustand

---

## 任务清单

### Task 1: 数据库迁移 - 添加角色表

**Files:**
- Modify: `backend/prisma/schema.prisma:1-242`
- Run: `cd backend && npx prisma migrate dev --name add_roles`

- [ ] **Step 1: 修改 Prisma Schema**

在 `backend/prisma/schema.prisma` 的 User model 后添加：

```prisma
model Role {
  id        Int       @id @default(autoincrement())
  name      String    @unique @map("name") @db.VarChar(50)
  createdAt DateTime  @default(now()) @map("created_at")

  users     UserRole[]

  @@map("roles")
}

model UserRole {
  id        Int      @id @default(autoincrement())
  userId    Int      @map("user_id")
  roleId    Int      @map("role_id")
  createdAt DateTime @default(now()) @map("created_at")

  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  role     Role     @relation(fields: [roleId], references: [id])

  @@unique([userId, roleId])
  @@map("user_roles")
}
```

在 User model 中添加关系：
```prisma
model User {
  // ... existing fields
  roles     UserRole[]
}
```

- [ ] **Step 2: 运行迁移**

Run: `cd /Users/eatong/eaTong_projects/fit_lc/backend && npx prisma migrate dev --name add_roles`
Expected: Migration created successfully

- [ ] **Step 3: 创建角色种子数据脚本**

Create: `backend/prisma/seed-roles.sql`
```sql
-- 插入预置角色
INSERT INTO roles (name, created_at) VALUES ('admin', NOW()), ('normal', NOW())
ON DUPLICATE KEY UPDATE name = name;
```

- [ ] **Step 4: 执行种子脚本**

Run: `mysql -u root fitlc < backend/prisma/seed-roles.sql`

- [ ] **Step 5: 提交**

```bash
git add backend/prisma/schema.prisma backend/prisma/migrations/
git add backend/prisma/seed-roles.sql
git commit -m "feat: 添加 Role 和 UserRole 数据模型"
```

---

### Task 2: 后端 - 创建 roleRepository

**Files:**
- Create: `backend/src/repositories/roleRepository.ts`
- Test: `backend/tests/repositories/roleRepository.test.ts`

- [ ] **Step 1: 创建 roleRepository**

Create: `backend/src/repositories/roleRepository.ts`
```typescript
import prisma from '../lib/prisma';

export const roleRepository = {
  async findByUserId(userId: number) {
    return prisma.userRole.findMany({
      where: { userId },
      include: { role: true }
    });
  },

  async findByName(name: string) {
    return prisma.role.findUnique({
      where: { name }
    });
  },

  async createUserRole(userId: number, roleId: number) {
    return prisma.userRole.create({
      data: { userId, roleId }
    });
  },

  async deleteUserRoles(userId: number) {
    return prisma.userRole.deleteMany({
      where: { userId }
    });
  }
};
```

- [ ] **Step 2: 编写测试**

Create: `backend/tests/repositories/roleRepository.test.ts`
```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { roleRepository } from '../../src/repositories/roleRepository';
import prisma from '../../src/lib/prisma';

describe('roleRepository', () => {
  beforeAll(async () => {
    // 清理测试数据
    await prisma.userRole.deleteMany({ where: { userId: 9999 } });
  });

  it('findByUserId should return user roles', async () => {
    const roles = await roleRepository.findByUserId(1);
    expect(Array.isArray(roles)).toBe(true);
  });

  it('findByName should return role by name', async () => {
    const role = await roleRepository.findByName('admin');
    expect(role).toBeTruthy();
    expect(role?.name).toBe('admin');
  });
});
```

- [ ] **Step 3: 运行测试**

Run: `cd backend && npm test -- tests/repositories/roleRepository.test.ts`
Expected: PASS

- [ ] **Step 4: 提交**

```bash
git add backend/src/repositories/roleRepository.ts backend/tests/repositories/roleRepository.test.ts
git commit -m "feat: 添加 roleRepository"
```

---

### Task 3: 后端 - 更新 authService 添加角色到 JWT

**Files:**
- Modify: `backend/src/services/authService.ts:1-54`

- [ ] **Step 1: 修改 authService 导入**

确认文件顶部有 roleRepository 导入：
```typescript
import { roleRepository } from '../repositories/roleRepository';
```

- [ ] **Step 2: 修改 generateToken 方法**

```typescript
generateToken(userId: number, email: string) {
  // 获取用户角色
  const userRoles = await roleRepository.findByUserId(userId);
  const roles = userRoles.map(ur => ur.role.name);

  return jwt.sign(
    { userId, email, roles },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
```

- [ ] **Step 3: 验证修改后的 authService**

Run: `cd backend && npm test -- tests/auth.test.ts`
Expected: PASS

- [ ] **Step 4: 提交**

```bash
git add backend/src/services/authService.ts
git commit -m "feat: JWT 包含用户角色信息"
```

---

### Task 4: 后端 - 更新 authMiddleware 添加 requireRole

**Files:**
- Modify: `backend/src/middleware/auth.ts:1-17`

- [ ] **Step 1: 修改 authMiddleware**

```javascript
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      roles: decoded.roles || []
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user?.roles?.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
```

- [ ] **Step 2: 提交**

```bash
git add backend/src/middleware/auth.ts
git commit -m "feat: 添加 requireRole 中间件"
```

---

### Task 5: 后端 - 创建 admin 路由 - 动作库

**Files:**
- Create: `backend/src/routes/adminExercises.js`
- Create: `backend/src/routes/adminMuscles.js`
- Modify: `backend/src/index.js`

- [ ] **Step 1: 创建动作库管理路由**

Create: `backend/src/routes/adminExercises.js`
```javascript
import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { exerciseRepository } from '../repositories/exerciseRepository.js';

const router = Router();

router.use(authMiddleware);
router.use(requireRole('admin'));

// GET /api/admin/exercises - 动作列表
router.get('/', async (req, res) => {
  try {
    const { category, equipment, difficulty, status } = req.query;
    const exercises = await exerciseRepository.findAll({
      category,
      equipment,
      difficulty,
      status
    });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/exercises - 创建动作
router.post('/', async (req, res) => {
  try {
    const exercise = await exerciseRepository.create(req.body);
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/exercises/:id - 更新动作
router.put('/:id', async (req, res) => {
  try {
    const exercise = await exerciseRepository.update(
      parseInt(req.params.id),
      req.body
    );
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/exercises/:id - 删除动作
router.delete('/:id', async (req, res) => {
  try {
    await exerciseRepository.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/admin/exercises/:id/publish - 发布动作
router.patch('/:id/publish', async (req, res) => {
  try {
    const exercise = await exerciseRepository.update(
      parseInt(req.params.id),
      { status: 'published' }
    );
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
```

- [ ] **Step 2: 创建肌肉库管理路由**

Create: `backend/src/routes/adminMuscles.js`
```javascript
import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { muscleRepository } from '../repositories/muscleRepository.js';

const router = Router();

router.use(authMiddleware);
router.use(requireRole('admin'));

// GET /api/admin/muscles - 肌肉列表（含层级）
router.get('/', async (req, res) => {
  try {
    const muscles = await muscleRepository.getHierarchy();
    res.json(muscles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/muscles - 创建肌肉
router.post('/', async (req, res) => {
  try {
    const muscle = await muscleRepository.create(req.body);
    res.json(muscle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/muscles/:id - 更新肌肉
router.put('/:id', async (req, res) => {
  try {
    const muscle = await muscleRepository.update(
      parseInt(req.params.id),
      req.body
    );
    res.json(muscle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/muscles/:id - 删除肌肉
router.delete('/:id', async (req, res) => {
  try {
    await muscleRepository.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
```

- [ ] **Step 3: 注册路由到 index.js**

Read `backend/src/index.js` first, then add:
```javascript
import adminExercisesRouter from './routes/adminExercises.js';
import adminMusclesRouter from './routes/adminMuscles.js';

// 在现有路由注册后添加：
app.use('/api/admin/exercises', adminExercisesRouter);
app.use('/api/admin/muscles', adminMusclesRouter);
```

- [ ] **Step 4: 提交**

```bash
git add backend/src/routes/adminExercises.js backend/src/routes/adminMuscles.js backend/src/index.js
git commit -m "feat: 添加管理员动作库和肌肉库路由"
```

---

### Task 6: 后端 - 自动分配 normal 角色给新用户

**Files:**
- Modify: `backend/src/services/authService.ts`

- [ ] **Step 1: 修改 register 方法**

在 `authService.ts` 的 `register` 方法中，创建用户后自动分配 normal 角色：

```typescript
async register(email: string, password: string) {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw new Error('Email already registered');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userRepository.create(email, passwordHash);

  // 自动分配 normal 角色
  const normalRole = await roleRepository.findByName('normal');
  if (normalRole) {
    await roleRepository.createUserRole(user.id, normalRole.id);
  }

  const token = this.generateToken(user.id, user.email);
  return { token, user: { id: user.id, email: user.email } };
}
```

- [ ] **Step 2: 运行测试**

Run: `cd backend && npm test -- tests/auth.test.ts`
Expected: PASS

- [ ] **Step 3: 提交**

```bash
git add backend/src/services/authService.ts
git commit -m "feat: 新用户自动分配 normal 角色"
```

---

### Task 7: 前端 - 更新 User 类型和 authStore

**Files:**
- Modify: `frontend/src/types/index.ts:1-11`
- Modify: `frontend/src/stores/authStore.ts`

- [ ] **Step 1: 更新 User 类型**

```typescript
export interface User {
  id: number;
  email: string;
  roles?: string[];
}
```

- [ ] **Step 2: 更新 authStore 存储 roles**

修改 login 和 checkAuth 方法，从 API 响应或 JWT 解码获取 roles：

```typescript
login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
    const { token, user } = await authApi.login(email, password);
    // 解析 token 获取 roles
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles = payload.roles || [];
    localStorage.setItem('token', token);
    set({ token, user: { ...user, roles }, isAuthenticated: true, isLoading: false });
  } catch (err: any) {
    set({ error: err.response?.data?.error || '登录失败', isLoading: false });
    throw err;
  }
},
```

同样更新 `checkAuth` 方法。

- [ ] **Step 3: 提交**

```bash
git add frontend/src/types/index.ts frontend/src/stores/authStore.ts
git commit -m "feat: 前端支持用户角色"
```

---

### Task 8: 前端 - Header 菜单权限控制

**Files:**
- Modify: `frontend/src/components/Header.tsx`

- [ ] **Step 1: 修改 Header 组件**

```tsx
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Header() {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.roles?.includes('admin');

  const navItems = [
    { path: '/chat', label: '对话' },
    { path: '/history', label: '历史' },
    { path: '/trends', label: '趋势' },
    { path: '/profile', label: '个人' },
    { path: '/plans', label: '计划' },
    { path: '/muscles', label: '肌肉' },
    { path: '/exercises', label: '动作' },
  ];

  const adminItems = [
    { path: '/admin/exercises', label: '动作库维护' },
    { path: '/admin/muscles', label: '肌肉库维护' },
  ];

  return (
    <header className="bg-primary-secondary border-b-2 border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/chat" className="font-heading text-2xl font-bold text-accent-orange">
          FITLC
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 font-heading font-medium uppercase tracking-wide
                transition-all duration-150
                ${
                  location.pathname === item.path
                    ? 'text-accent-orange'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && adminItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 font-heading font-medium uppercase tracking-wide
                transition-all duration-150
                ${
                  location.pathname === item.path
                    ? 'text-accent-orange'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="text-text-secondary hover:text-accent-red transition-colors duration-150"
        >
          退出
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/Header.tsx
git commit -m "feat: Header 根据角色显示管理员菜单"
```

---

### Task 9: 前端 - 创建管理员页面

**Files:**
- Create: `frontend/src/pages/admin/Exercises.tsx`
- Create: `frontend/src/pages/admin/Muscles.tsx`
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: 创建管理员动作库页面**

Create: `frontend/src/pages/admin/Exercises.tsx`
```tsx
import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';

export default function AdminExercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const data = await adminApi.getExercises();
      setExercises(data);
    } catch (err) {
      console.error('Failed to load exercises', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>加载中...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-heading font-bold text-text-primary mb-6">动作库维护</h1>
      {/* 动作列表和 CRUD 表单 */}
      <div className="bg-primary-secondary rounded-lg p-4">
        {exercises.map((exercise: any) => (
          <div key={exercise.id} className="border-b border-border py-2">
            {exercise.name} - {exercise.category}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建管理员肌肉库页面**

Create: `frontend/src/pages/admin/Muscles.tsx`
```tsx
import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';

export default function AdminMuscles() {
  const [muscles, setMuscles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMuscles();
  }, []);

  const loadMuscles = async () => {
    try {
      const data = await adminApi.getMuscles();
      setMuscles(data);
    } catch (err) {
      console.error('Failed to load muscles', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>加载中...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-heading font-bold text-text-primary mb-6">肌肉库维护</h1>
      <div className="bg-primary-secondary rounded-lg p-4">
        {muscles.map((muscle: any) => (
          <div key={muscle.id} className="border-b border-border py-2">
            {muscle.name} - {muscle.group}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建 admin API 客户端**

Create: `frontend/src/api/admin.ts`
```typescript
import client from './client';

export const adminApi = {
  async getExercises() {
    const { data } = await client.get('/admin/exercises');
    return data;
  },

  async createExercise(exercise: any) {
    const { data } = await client.post('/admin/exercises', exercise);
    return data;
  },

  async updateExercise(id: number, exercise: any) {
    const { data } = await client.put(`/admin/exercises/${id}`, exercise);
    return data;
  },

  async deleteExercise(id: number) {
    await client.delete(`/admin/exercises/${id}`);
  },

  async publishExercise(id: number) {
    const { data } = await client.patch(`/admin/exercises/${id}/publish`);
    return data;
  },

  async getMuscles() {
    const { data } = await client.get('/admin/muscles');
    return data;
  },

  async createMuscle(muscle: any) {
    const { data } = await client.post('/admin/muscles', muscle);
    return data;
  },

  async updateMuscle(id: number, muscle: any) {
    const { data } = await client.put(`/admin/muscles/${id}`, muscle);
    return data;
  },

  async deleteMuscle(id: number) {
    await client.delete(`/admin/muscles/${id}`);
  },
};
```

- [ ] **Step 4: 更新 App.tsx 添加路由和 AdminRoute**

```tsx
import AdminExercises from './pages/admin/Exercises';
import AdminMuscles from './pages/admin/Muscles';

// 添加 AdminRoute 守卫
function AdminRoute({ component }: { component: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  if (!user?.roles?.includes('admin')) {
    return <Navigate to="/chat" />;
  }
  return component;
}

// 在路由中添加：
<Route path="/admin/exercises" element={<AdminRoute component={<AdminExercises />} />} />
<Route path="/admin/muscles" element={<AdminRoute component={<AdminMuscles />} />} />
```

- [ ] **Step 5: 提交**

```bash
git add frontend/src/pages/admin/Exercises.tsx frontend/src/pages/admin/Muscles.tsx
git add frontend/src/api/admin.ts frontend/src/App.tsx
git commit -m "feat: 添加管理员页面和路由"
```

---

## 实施检查清单

- [ ] 数据库迁移成功
- [ ] 管理员可以访问 /api/admin/exercises 和 /api/admin/muscles
- [ ] 普通用户访问 admin API 返回 403
- [ ] 新用户注册后 roles 包含 'normal'
- [ ] 登录后 JWT payload 包含 roles
- [ ] 前端 Header 显示管理员菜单（仅 admin 用户）
- [ ] 普通用户看不到管理员菜单
- [ ] 普通用户访问 /admin/* 被重定向

---

## 后续步骤

1. 完善管理员动作库页面的 CRUD UI
2. 完善管理员肌肉库页面的 CRUD UI
3. 添加管理员分配角色功能（可选）
