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
└── frontend/src/             # React 应用
```

## 文档结构

- `docs/PRD.md` — **正式版 PRD**（已实现的功能）
- `docs/PRD-planning.md` — **规划版 PRD**（全部需求路线图，包括未实现的）
- `docs/requirements-roadmap.md` — 功能优先级和依赖路线图
- `docs/superpowers/plans/` — 各功能的详细实施计划

**维护规则：**
- 功能完成并测试通过后，**必须同步**更新 `docs/PRD.md`
- 所有规划中的需求记录在 `docs/PRD-planning.md`
- 功能实施前创建计划文档于 `docs/superpowers/plans/`
- 数据模型变更 → 更新 `docs/PRD.md` 第7章数据库设计
- API 变更 → 更新 `docs/PRD.md` 第8章 API 接口设计
- 新功能入口 → 更新 `docs/PRD.md` 第9章前端页面清单

**提交前检查清单：**
1. 代码是否完成且通过测试？
2. `docs/PRD.md` 是否同步更新？（表结构、API、章节）
3. `docs/PRD-planning.md` 对应需求状态是否改为"已实现"？
4. 前端 Store/Type 是否同步新增？
5. **e2e 测试是否补充？**（`frontend/tests/e2e/specs/` 下新增 spec 文件和 page-object）

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

## API 文档

后端已集成 Swagger UI，提供完整的 API 接口文档。

**访问地址：** `/api-docs`（开发环境）

当接口不清晰时，可访问 Swagger UI 查看：
- 每个接口的请求参数和返回值
- 请求示例（Example Value）
- 响应状态码说明

## 常用命令

```bash
# 后端
cd backend
npm run dev              # 开发模式（tsx watch）
npm run build            # 编译 TypeScript
npm start                # 运行生产版本
npm test                 # 运行所有测试
npm run test:unit        # 运行单元测试
npm run init-db          # 初始化 MySQL 数据库（运行 seed 脚本）

# 前端
cd frontend
npm run dev              # 开发模式（Vite）
npm run build            # 构建生产版本（先运行 TypeScript 检查）
npm test                 # 运行测试（vitest）
npm test -- --run        # 单次运行所有测试（CI 模式）
```

## 前端设计要求

### 技术栈
React 18 + Vite + TypeScript + TailwindCSS + Zustand + Axios + React Router v6 + Recharts

### 状态管理
使用 Zustand 管理状态，主要 Store：
- `authStore` - 认证状态（token、用户信息、角色）
- `chatStore` - 对话状态（消息列表）
- `recordsStore` - 记录状态（训练/围度历史、最近训练、最后围度）
- `planStore` - 计划状态

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
| `/dashboard` | 数据看板 | 登录用户 |
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
| `/admin/muscles` | 肌肉库维护 | admin |

前端源码位于 `frontend/src/`，使用 `ErrorBoundary` 处理未捕获异常。

## Agent 架构

### 目录结构
```
backend/src/
├── agents/
│   ├── fitnessAgent.ts      # 主 Agent (LangChain Agent)
│   ├── chatFactory.ts       # Chat 模型工厂
│   ├── chatMiniMax.ts       # MiniMax Chat 实现
│   ├── chatZhipu.ts         # 智谱 Chat 实现
│   └── plugins/
│       └── visionPreprocessor.ts  # 图片预处理插件
└── tools/
    ├── saveWorkout.ts       # 保存训练记录
    ├── saveMeasurement.ts   # 保存围度记录
    ├── queryWorkout.ts      # 查询训练历史
    ├── queryMeasurement.ts  # 查询围度历史
    ├── generatePlan.ts       # AI 生成健身计划
    ├── adjustPlan.ts         # 调整健身计划
    └── analyzeExecution.ts  # 分析计划执行
```

### Tools 定义

所有 Tool 返回统一格式：
```typescript
interface ToolResponse<T = any> {
  aiReply: string;   // AI 对话回复
  dataType: string; // 数据类型标识
  result: T;        // 结构化数据
}
```

| Tool | dataType | 功能 | result 关键字段 |
|------|----------|------|----------------|
| saveWorkout | `workout` | 保存训练记录 | id, date, exercises, feedback, achievements |
| saveMeasurement | `measurement` | 保存围度记录 | id, date, measurements, achievements |
| queryWorkout | `workout_query` | 查询训练历史 | workouts[], summary |
| queryMeasurement | `measurement_query` | 查询围度历史 | measurements[], summary |
| generatePlan | `plan` | AI 生成计划 | planId, schedule[], goal |
| adjustPlan | `plan_adjustment` | 调整计划 | planId, adjustment |
| analyzeExecution | `execution_analysis` | 分析执行情况 | stats, suggestions |

### Plugins

**VisionPreprocessor** (`agents/plugins/visionPreprocessor.ts`)
- 拦截含图片的消息，调用智谱 GLM-4V-Flash 分析
- 将分析结果注入到消息上下文中供主 AI 使用
- 返回格式：`{ message: string, imageAnalysis: string | null }`

### Agent 返回结构

`runAgent()` 返回：
```typescript
{
  reply: string,      // AI 最终对话回复
  toolData: ToolResponse | null  // 完整的 tool 返回数据
}

// ToolResponse 格式：
{
  aiReply: string,    // AI 回复文本（用于展示）
  dataType: string,   // 数据类型：workout | measurement | workout_query | measurement_query | plan | adjustment | analysis
  result: object      // 具体数据（根据 dataType 不同结构不同）
}
```

## 小程序 (fitlc-mini)

### 项目位置
`../fitlc-mini/` - 微信小程序原生项目

### 技术栈
- 框架：微信小程序原生框架
- 样式：WXSS (CSS 超集)
- 状态管理：本地 Storage + globalData
- 网络：wx.request

### 分包策略
采用**独立分包**机制，减少主包体积：

| 分包 | 页面 | 说明 |
|------|------|------|
| 主包 | chat, login, exercises, profile, settings | TabBar 页面 + 登录 |
| 分包A | plans, plan-generate, plan-detail, plan-execute | 健身计划 |
| 分包B | measurements, calendar | 围度记录 + 日历 |
| 分包C | badges, exercise-detail, gallery | 徽章 + 动作详情 + 相册 |

### 核心功能
- **AI 对话**：文字/语音输入，支持图片
- **动作库**：左侧肌肉侧边栏 + 右侧动作列表
- **个人中心**：统计、快捷入口、身体数据
- **健身计划**：AI 生成、可视化编辑、执行打卡
- **围度记录**：折线图、左右对称部位
- **日历**：月历视图、记录详情

### 与 Web 共用
与 Web 版共享后端 API：
- 认证：`/api/auth/*`
- 对话：`/api/chat/*`
- 记录：`/api/records/*`
- 计划：`/api/plans/*`

详细文档见 [docs/PRD-mini.md](docs/PRD-mini.md)
