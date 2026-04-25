# 用户角色权限系统设计

## 需求概述

增加用户角色（管理员、普通用户），动作库和肌肉库维护功能仅管理员可访问。

## 1. 数据库设计

### 1.1 新增数据模型

```prisma
model Role {
  id        Int       @id @default(autoincrement())
  name      String    @unique @map("name") // admin, normal
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

### 1.2 初始化数据

预置角色数据：
- `admin` (管理员)
- `normal` (普通用户)

新用户注册时，自动分配 `normal` 角色。

管理员账户通过数据库手动插入 `UserRole` 关联创建。

### 1.3 现有模型更新

User 模型添加关系：
```prisma
model User {
  // ... existing fields
  roles     UserRole[]
}
```

## 2. 后端设计

### 2.1 中间件设计

```javascript
// middleware/auth.js

// 扩展 req.user
req.user = { id, email, roles: ['admin', 'normal'] }

// 新增角色检查中间件
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user?.roles?.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
```

### 2.2 路由结构

```
routes/
├── admin/
│   ├── exercises.js    # 动作库 CRUD
│   └── muscles.js      # 肌肉库 CRUD
```

### 2.3 API 路由

#### 动作库管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/admin/exercises | 动作列表 |
| POST | /api/admin/exercises | 创建动作 |
| PUT | /api/admin/exercises/:id | 更新动作 |
| DELETE | /api/admin/exercises/:id | 删除动作 |
| PATCH | /api/admin/exercises/:id/publish | 发布动作 |

#### 肌肉库管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/admin/muscles | 肌肉列表（含层级） |
| POST | /api/admin/muscles | 创建肌肉 |
| PUT | /api/admin/muscles/:id | 更新肌肉 |
| DELETE | /api/admin/muscles/:id | 删除肌肉 |

### 2.4 JWT Token 扩展

登录时从数据库查询用户角色，签发到 JWT 中：

```javascript
// authService.login
const userRoles = await roleRepository.findByUserId(userId);
const roles = userRoles.map(ur => ur.role.name);
const token = jwt.sign(
  { userId, email, roles },
  JWT_SECRET,
  { expiresIn: '7d' }
);

// authMiddleware 扩展
req.user = { id, email, roles };
```

**注意**：如果管理员权限在数据库中被修改，已签发的 JWT 在过期前仍保有旧权限。接受这个限制直到 token 过期。

## 3. 前端设计

### 3.1 菜单权限控制

根据用户角色动态渲染菜单：
- 管理员可见：`动作库维护`、`肌肉库维护`
- 普通用户：不可见这两个菜单

### 3.2 路由守卫

```javascript
// 路由配置
const adminRoutes = [
  { path: '/admin/exercises', component: ExerciseManage },
  { path: '/admin/muscles', component: MuscleManage },
];

// 守卫逻辑
function AdminRoute({ component }) {
  const { roles } = useUser();
  if (!roles?.includes('admin')) {
    return <Navigate to="/" />;
  }
  return component;
}
```

## 4. 实现顺序

1. 数据库迁移 - 添加 Role、UserRole 表
2. 后端 - 角色中间件、admin 路由
3. 前端 - 菜单权限控制、admin 页面

## 5. 安全考虑

- 管理员 API 必须经过 `requireRole('admin')` 中间件
- 前端菜单隐藏不等于安全，后端必须做权限验证
