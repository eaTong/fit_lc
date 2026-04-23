# FitLC 前端设计文档

**日期：** 2026-04-23
**状态：** 待批准
**版本：** 1.0

## 1. 概述

### 项目目标
为 FitLC AI健身记录SaaS系统构建React前端，通过自然语言对话记录健身数据和身体围度。

### 技术栈
- 框架：React + Vite
- 路由：React Router v6 (动态加载)
- 状态管理：Zustand
- 样式：TailwindCSS
- HTTP客户端：Axios + localStorage (Token存储)
- 图表：Recharts (趋势图)

---

## 2. 技术架构

```
┌─────────────────────────────────────────────────────┐
│               React + Vite 前端                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ Login   │  │ Chat    │  │History  │  │ Trends  │ │
│  │/Register│  │ 核心对话 │  │ 历史记录 │  │ 趋势图  │ │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘ │
│       └────────────┴────────────┴────────────┘       │
│                        │                              │
│                   Zustand Store                      │
│                        │                              │
│                   Axios 拦截器                        │
│                        │                              │
└────────────────────────┼──────────────────────────────┘
                         │ HTTP
                         ▼
                 Node.js 后端 API
```

### 路由结构
```
/             → 重定向到 /chat
/login         → 登录页
/register     → 注册页
/chat         → AI对话页 (核心)
/history      → 历史记录页
/trends       → 趋势图页
/profile      → 个人页
```

---

## 3. 数据模型

### 前端 TypeScript Types

```typescript
// 认证
interface User {
  id: number;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

// 训练记录
interface WorkoutSet {
  setNumber: number;
  reps: number;
  weight: number;
}

interface WorkoutExercise {
  id: number;
  exerciseName: string;
  duration?: number;
  distance?: number;
  sets: WorkoutSet[];
}

interface Workout {
  id: number;
  date: string;
  exercises: WorkoutExercise[];
}

// 围度记录
interface MeasurementItem {
  bodyPart: 'chest' | 'waist' | 'hips' | 'biceps' | 'thighs' | 'calves' | 'other';
  value: number;
}

interface Measurement {
  id: number;
  date: string;
  items: MeasurementItem[];
}

// 消息
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  savedData?: {
    type: 'workout' | 'measurement';
    id: number;
  };
}
```

---

## 4. API 集成

### Axios 配置
```typescript
// baseURL: 指向后端 API
// 请求拦截器：从 localStorage 提取 token，添加到 Header
// 响应拦截器：处理 401 自动跳转登录页
```

### API Endpoints

**认证 API (`/api/auth`)**
| 方法 | 路径 | 说明 | 请求体 | 响应 |
|------|------|------|--------|------|
| POST | /register | 注册 | `{email, password}` | `{token, user}` |
| POST | /login | 登录 | `{email, password}` | `{token, user}` |
| GET | /me | 获取当前用户 | - | `{user}` |

**对话 API (`/api/chat`)**
| 方法 | 路径 | 说明 | 请求体 | 响应 |
|------|------|------|--------|------|
| POST | /message | 发送消息 | `{message}` | `{reply}` |

**记录 API (`/api/records`)**
| 方法 | 路径 | 说明 | 查询参数 | 响应 |
|------|------|------|---------|------|
| GET | /workouts | 获取训练记录 | `?start=&end=` | `{workouts}` |
| GET | /measurements | 获取围度记录 | `?start=&end=` | `{measurements}` |
| DELETE | /workout/:id | 删除训练 | - | `{success}` |
| DELETE | /measurement/:id | 删除围度 | - | `{success}` |

---

## 5. 页面设计

### 5.1 登录/注册页

**布局：**
- 居中卡片式表单
- 顶部 Logo + 系统名称 "FITLC"
- Tab 切换：登录 / 注册
- 输入框：邮箱、密码
- 按钮：提交 (粗边框、烈焰橙)

**交互：**
- 注册：验证邮箱格式、密码长度
- 登录成功：存储 token，跳转 /chat
- 登录失败：显示错误信息

### 5.2 对话页 (核心)

**布局：**
```
┌─────────────────────────────────────────────┐
│ FITLC                            [历史][趋势][个人] │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ User: 今天深蹲100kg 5组               │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ AI: 已保存：深蹲 100kg x 5组 x 8次   │   │
│  │                         [撤销]      │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│ [输入消息...]                        [发送] │
└─────────────────────────────────────────────┘
```

**交互：**
- 发送消息 → POST /api/chat/message → 显示 AI 回复
- 保存成功时：显示"已保存"标识 + 撤销按钮
- 点击撤销 → DELETE /api/records/workout/:id
- 消息列表自动滚动到底部

### 5.3 历史记录页

**布局：**
```
┌─────────────────────────────────────────────┐
│ FITLC                            [历史][趋势][个人] │
├─────────────────────────────────────────────┤
│  [训练 Tab]  [围度 Tab]                      │
├─────────────────────────────────────────────┤
│  2026-04-23                                │
│  ┌─────────────────────────────────────┐   │
│  │ 深蹲: 100kg x 5组 x 8次              │   │
│  │ 跑步: 5km                            │   │
│  │                           [删除]     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  2026-04-22                                │
│  ┌─────────────────────────────────────┐   │
│  │ 胸围: 94cm, 腰围: 78cm              │   │
│  │                           [删除]     │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**交互：**
- Tab 切换：训练 / 围度
- GET /api/records/workouts 或 /measurements
- 点击删除 → 确认 → DELETE → 刷新列表
- 日期分组显示

### 5.4 趋势页

**布局：**
```
┌─────────────────────────────────────────────┐
│ FITLC                            [历史][趋势][个人] │
├─────────────────────────────────────────────┤
│  围度趋势 (折线图)                           │
│  ┌─────────────────────────────────────┐   │
│  │     /\      /\                      │   │
│  │    /  \    /  \   /\                │   │
│  │   /    \  /    \ /  \              │   │
│  │--+-----+------+----+------>         │   │
│  └─────────────────────────────────────┘   │
│  [胸围] [腰围] [臀围] [臂围]                │
├─────────────────────────────────────────────┤
│  训练统计 (柱状图)                           │
│  ┌─────────────────────────────────────┐   │
│  │   │  █                             │   │
│  │   │  █  █     █                    │   │
│  │   │  █  █  █  █  █                │   │
│  │   └──+--+--+--+--+--+──>            │   │
│  │     Mon Tue Wed Thu Fri Sat Sun      │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**图表库：** Recharts
- 围度折线图：多 series (Chest/Waist/Hips/Biceps)
- 训练柱状图：每周训练次数

### 5.5 个人页

**布局：**
```
┌─────────────────────────────────────────────┐
│ FITLC                            [历史][趋势][个人] │
├─────────────────────────────────────────────┤
│                                             │
│           ┌─────────────┐                   │
│           │     Avatar   │                   │
│           └─────────────┘                   │
│                                             │
│           user@example.com                  │
│                                             │
│           [ 退出登录 ]                       │
│                                             │
└─────────────────────────────────────────────┘
```

**交互：**
- 显示当前用户邮箱
- 点击退出登录 → 清除 token → 跳转 /login

---

## 6. UI 风格规范

### 配色方案
```css
/* 主色 */
background-primary: #0A0A0A      /* 深黑 */
background-secondary: #1A1A1A    /* 深灰卡片 */
background-tertiary: #252525     /* 稍浅灰 */

/* 强调色 */
accent-primary: #FF4500         /* 烈焰橙 */
accent-secondary: #DC143C       /* 电红 */

/* 文字 */
text-primary: #FFFFFF           /* 白色 */
text-secondary: #888888         /* 灰色 */
text-muted: #555555             /* 次要灰色 */

/* 边框 */
border-default: #333333
border-accent: #FF4500
```

### 字体
- 标题：粗体、等宽风格 (如: Oswald, Anton)
- 正文：清晰无衬线 (如: Inter, Roboto)
- 代码/数字：等宽 (如: JetBrains Mono)

### 视觉元素
- **无圆角** 或 极小圆角 (2-4px)
- **粗边框按钮** (2px solid)
- **几何线条装饰** (斜线、锐角元素)
- **卡片光晕** (box-shadow 带橙色/红色微光)
- **深色渐变背景**

### 动效
- 快速过渡 (150-200ms)
- 无缓动或 minimal easing
- 强调色 hover 闪烁效果
- 禁止：圆角、渐变柔边、弹性动画

---

## 7. 组件清单

| 组件 | 说明 |
|------|------|
| `AuthForm` | 登录/注册表单 |
| `ChatMessage` | 单条对话消息 |
| `ChatInput` | 对话输入框 |
| `WorkoutCard` | 训练记录卡片 |
| `MeasurementCard` | 围度记录卡片 |
| `TrendChart` | 趋势图表 |
| `TabSwitcher` | Tab切换器 |
| `Header` | 顶部导航栏 |
| `Button` | 通用按钮 |
| `Input` | 通用输入框 |

---

## 8. Zustand Store 结构

```typescript
// authStore
{
  token: string | null,
  user: User | null,
  isAuthenticated: boolean,
  login: (email, password) => void,
  register: (email, password) => void,
  logout: () => void,
}

// chatStore
{
  messages: ChatMessage[],
  isLoading: boolean,
  sendMessage: (content) => void,
  clearMessages: () => void,
}

// recordsStore
{
  workouts: Workout[],
  measurements: Measurement[],
  fetchWorkouts: (start?, end?) => void,
  fetchMeasurements: (start?, end?) => void,
  deleteWorkout: (id) => void,
  deleteMeasurement: (id) => void,
}
```

---

## 9. 错误处理

### 网络错误
- 请求失败 → Toast 提示 "网络错误，请重试"
- 401 Unauthorized → 自动跳转登录页

### 业务错误
- 登录失败 → 显示 "邮箱或密码错误"
- 保存失败 → 显示 "保存失败，请重试"
- 删除失败 → 显示 "删除失败，请重试"

---

## 10. MVP 简化策略

- 暂不支持深色/浅色主题切换（默认深色）
- 趋势图先实现折线图，柱状图后续
- 不实现头像上传
- 不实现编辑历史记录（只能删除）