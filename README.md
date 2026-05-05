# FitLC - AI 健身记录 SaaS 系统

基于 LangChain.js 和 MiniMax AI 的智能健身记录平台，通过自然语言自动记录健身数据和身体围度。

## 技术栈

**后端**
- Node.js + Express + TypeScript
- Prisma ORM + MySQL
- LangChain.js + MiniMax Chat 模型
- JWT 认证

**前端**
- React 18 + Vite + TypeScript
- TailwindCSS（暗色主题）
- Zustand 状态管理
- Recharts 数据可视化
- React Router v6

## 项目结构

```
fit_lc/
├── backend/              # 后端服务
│   ├── src/
│   │   ├── index.ts      # Express 应用入口
│   │   ├── lib/prisma.ts # Prisma 客户端单例
│   │   ├── middleware/    # 认证中间件
│   │   ├── routes/       # API 路由
│   │   ├── services/     # 业务逻辑
│   │   ├── repositories/ # 数据访问层
│   │   ├── agents/       # LangChain Agent
│   │   └── tools/        # Agent Tools
│   ├── prisma/
│   │   └── schema.prisma # 数据模型
│   └── scripts/
│       ├── init-db.sql  # 数据库表结构
│       └── seed.sql     # 初始数据（角色/用户/肌肉/动作）
├── frontend/             # React Web 应用
│   └── src/
│       ├── components/   # 公共组件
│       ├── pages/        # 页面组件
│       ├── store/        # Zustand Store
│       └── api/          # API 客户端
├── fitlc-mini/           # 微信小程序
│   ├── pages/            # 页面（chat/login/exercises/profile/settings）
│   ├── packageA/         # 分包A（健身计划）
│   ├── packageB/         # 分包B（围度/日历）
│   ├── packageC/         # 分包C（徽章/动作详情/相册）
│   ├── api/              # API 客户端
│   └── store/            # 状态管理
├── docs/                 # 文档
│   ├── PRD.md           # Web版产品需求文档
│   ├── PRD-mini.md      # 小程序产品需求文档
│   └── PRD-planning.md  # 规划版需求文档
└── scripts/              # 工具脚本
```

## 快速开始

### 环境要求

- Node.js >= 18
- MySQL 8.0+
- npm 或 yarn

### 1. 初始化数据库

```bash
cd backend
npm install

# 创建数据库并导入表结构
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS fitlc;"
mysql -u root -p fitlc < scripts/init-db.sql

# 导入初始数据（角色、测试用户、肌肉群、动作库）
mysql -u root -p fitlc < scripts/seed.sql
```

### 2. 配置环境变量

```bash
# backend/.env
DATABASE_URL="mysql://user:password@localhost:3306/fitlc"
JWT_SECRET="your-secret-key"
MINIMAX_API_KEY="your-minimax-api-key"
```

### 3. 启动后端

```bash
cd backend
npm run dev
```

后端服务运行在 http://localhost:3000

### 4. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端运行在 http://localhost:5173

## 功能特性

### AI 对话记录
- 自然语言输入训练计划
- 自动识别动作、组数、重量
- 支持围度测量记录

### 训练计划
- 创建个人训练计划
- 按计划执行打卡
- AI 个性化反馈

### 数据趋势
- 围度变化折线图
- 训练统计柱状图
- 肌肉群训练量饼图

### 动作库 / 肌肉库
- 动作详情与步骤
- 肌肉功能与训练技巧
- 关联动作推荐

## API 接口

| 模块 | 接口 | 说明 |
|------|------|------|
| 认证 | POST /api/auth/register | 用户注册 |
| 认证 | POST /api/auth/login | 用户登录 |
| 对话 | GET /api/chat/messages | 获取聊天记录 |
| 对话 | POST /api/chat/message | 发送消息 |
| 记录 | GET /api/records/workouts | 训练历史 |
| 记录 | GET /api/records/measurements | 围度历史 |
| 动作 | GET /api/exercises | 动作列表 |
| 计划 | GET /api/plans | 计划列表 |
| 计划 | POST /api/plans/:id/executions | 执行打卡 |

## 开发指南

### 命令

```bash
# 后端
npm run dev        # 开发模式（tsx watch）
npm run build      # 编译 TypeScript
npm start          # 生产运行
npm test           # 运行测试

# 前端
npm run dev        # Vite 开发服务器
npm run build      # 生产构建
npm test           # Vitest 测试
```

### 代码规范

- 使用 TypeScript strict 模式
- 后端分层：Routes → Services → Repositories
- 前端状态管理使用 Zustand
- 多表操作使用 Prisma `$transaction`

### 测试

```bash
# E2E 测试（需先启动服务）
cd frontend
npm test
```

## 文档

- [PRD.md](docs/PRD.md) - 完整产品需求文档
- [CLAUDE.md](CLAUDE.md) - Claude Code 开发指南
- [requirements-roadmap.md](docs/requirements-roadmap.md) - 功能路线图

## License

Private
