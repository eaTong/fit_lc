# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供在此代码库中工作的指导。

## 项目概述

FitLC 是一个 AI 健身记录 SaaS 系统，通过自然语言自动记录健身数据和身体围度。基于 LangChain.js 和 MiniMax AI 构建。

**技术栈：**
- 前端：React + Vite + TailwindCSS（暗色主题）
- 后端：Node.js + Express + MySQL
- AI：LangChain.js + MiniMax Chat 模型

## 项目结构

```
fit_lc/
├── docs/
│   ├── superpowers/
│   │   ├── specs/      # 需求与设计规格
│   │   └── plans/      # 实施计划
├── backend/            # Express.js API 服务（规划中）
└── frontend/           # React 应用（规划中）
```

**文档规则：**
- 所有需求 → `docs/需求/`（或 `docs/superpowers/specs/`）
- 已确认的计划 → `docs/计划/`（或 `docs/superpowers/plans/`）

## 后端架构

**分层设计：** Router → Service → Repository

```
backend/src/
├── index.js           # 入口，Express 应用配置
├── config/database.js # MySQL 连接池
├── middleware/auth.js  # JWT 认证中间件
├── routes/            # /api/auth, /api/chat, /api/records
├── services/          # authService, saveService, queryService
├── repositories/     # userRepository, workoutRepository, measurementRepository
├── agents/fitnessAgent.js  # LangChain Agent
└── tools/             # saveWorkout, saveMeasurement, queryWorkout, queryMeasurement
```

## 数据库模型

**表：** `users`, `workouts`, `workout_exercises`, `body_measurements`, `measurement_items`

- 软删除：通过 `deleted_at` 列实现
- 外键：exercise/measurement items 使用 CASCADE delete

## 常用命令

```bash
# 后端
cd backend
npm install              # 安装依赖
npm run dev              # 使用 --watch 运行
npm test                 # 运行测试
npm run init-db          # 初始化 MySQL 数据库

# 运行单个测试
npm test -- tests/auth.test.js
```

## 环境变量

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=fitlc
JWT_SECRET=
MINIMAX_API_KEY=
```

## API 路由

| 模块 | 路径 | 认证 | 说明 |
|------|------|------|------|
| Auth | POST /api/auth/register | 否 | 用户注册 |
| Auth | POST /api/auth/login | 否 | 用户登录 |
| Auth | GET /api/auth/me | 是 | 获取当前用户 |
| Chat | POST /api/chat/message | 是 | AI 对话（LangChain Agent） |
| Records | GET /api/records/workouts | 是 | 获取训练记录 |
| Records | GET /api/records/measurements | 是 | 获取围度记录 |
| Records | DELETE /api/records/workout/:id | 是 | 软删除训练记录 |
| Records | POST /api/records/workout/:id/restore | 是 | 恢复训练记录 |

## LangChain Agent Tools

- `save_workout` - 记录训练（组数、次数、重量、时长、距离）
- `save_measurement` - 记录身体围度（胸、腰、臀、臂、腿、小腿）
- `query_workout` - 按日期范围查询训练历史
- `query_measurement` - 按日期范围查询围度历史

Agent 使用 MiniMax/Abab6 模型，支持 function calling。用户 ID 从 JWT token 中间件提取并传递给 tools。
