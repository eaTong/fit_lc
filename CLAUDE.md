# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

FitLC 是一个 AI 健身记录 SaaS 系统，通过自然语言自动记录健身数据和身体围度。基于 LangChain.js 和 MiniMax AI 构建。

**技术栈：**
- 前端：React + Vite + TailwindCSS（暗色主题）
- 后端：Node.js + Express + MySQL + Prisma ORM
- AI：LangChain.js + MiniMax Chat 模型

## 项目结构

```
fit_lc/
├── backend/
│   ├── src/
│   │   ├── index.ts           # 入口，Express 应用配置
│   │   ├── lib/prisma.ts      # Prisma 客户端单例
│   │   ├── middleware/        # auth.ts (JWT 认证)
│   │   ├── routes/            # Router 层
│   │   ├── services/          # Service 层（业务逻辑）
│   │   ├── repositories/      # Repository 层（数据访问）
│   │   ├── agents/            # LangChain Agent
│   │   └── tools/             # Agent Tools (saveWorkout, saveMeasurement 等)
│   ├── prisma/
│   │   └── schema.prisma      # 数据库模型定义
│   └── scripts/               # 初始化脚本和 seed 数据
└── frontend/                 # React 应用（规划中）
```

## 事务一致性要求

**所有涉及多表操作的后端方法必须使用 Prisma `$transaction` 确保原子性。**

典型模式：
```typescript
const result = await prisma.$transaction(async (tx) => {
  const entity = await tx.model.create({ data: {...} });
  // 关联操作
  await tx.relatedModel.create({ data: {...} });
  return entity;
});
```

## 数据库模型

Prisma schema 定义于 `backend/prisma/schema.prisma`：

- `User` - 用户（通过 `UserRole` 关联 `Role`）
- `Role` - 角色（`normal` 角色需通过 seed 脚本初始化）
- `Workout` / `WorkoutExercise` - 训练记录及动作明细
- `BodyMeasurement` / `MeasurementItem` - 身体围度记录
- `WorkoutPlan` / `PlanExercise` / `PlanExecution` - 训练计划
- `Muscle` - 肌肉层级树（肌肉群 → 主肌肉，如"胸部 → 上胸/中胸/下胸"）
- `Exercise` / `ExerciseMuscle` - 动作库及动作-肌肉关联
- `UserContext` - 用户上下文（最后训练日期、活跃计划等）
- `ChatMessage` - 对话历史

**软删除：** 使用 `deletedAt` 字段实现。

## 常用命令

```bash
cd backend

npm run dev              # 开发模式（tsx watch）
npm run build            # 编译 TypeScript
npm start                # 运行生产版本

npm test                 # 运行所有测试
npm run test:unit        # 运行单元测试
npm run test:chat         # 测试 Chat Agent
npm run test:chat:single  # 单轮对话测试
npm run test:chat:e2e     # 端到端对话测试

npm run init-db          # 初始化 MySQL 数据库（运行 seed 脚本）
```

**Seed 脚本位置：** `backend/scripts/seed-*.sql`

## 前端设计要求

### 技术栈
React 18 + Vite + TypeScript + TailwindCSS + Zustand + Axios + React Router v6 + Recharts

### 状态管理
使用 Zustand 管理状态，主要 Store：
- `authStore` - 认证状态（token、用户信息、角色）
- `chatStore` - 对话状态（消息列表）
- `recordsStore` - 记录状态（训练/围度历史）

### UI 风格（暗色主题）

**配色方案：**
| 用途 | 色值 |
|------|------|
| 背景主色 | `#0A0A0A` (深黑) |
| 背景次色 | `#1A1A1A` (卡片) |
| 背景三级 | `#252525` |
| 强调色 | `#FF4500` (烈焰橙), `#DC143C` (电红) |
| 文字主色 | `#FFFFFF` |
| 文字次色 | `#888888` |
| 边框色 | `#333333` |

**视觉风格：**
- 无圆角或极小圆角 (2-4px)
- 粗边框按钮 (2px solid)
- 快速过渡动画 (150-200ms)
- 卡片光晕效果

### 页面路由
| 路径 | 页面 | 权限 |
|------|------|------|
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/chat` | AI 对话 | 登录用户 |
| `/history` | 历史记录 | 登录用户 |
| `/trends` | 趋势分析 | 登录用户 |
| `/profile` | 个人中心 | 登录用户 |
| `/exercises` | 动作库 | 登录用户 |
| `/muscles` | 肌肉库 | 登录用户 |
| `/plans` | 健身计划 | 登录用户 |
| `/plans/:id/execute` | 计划执行 | 登录用户 |
| `/admin/exercises` | 动作库管理 | admin |
| `/admin/muscles` | 肌肉库管理 | admin |

前端源码位于 `frontend/src/`，使用 `ErrorBoundary` 处理未捕获异常。
