# FitLC - AI健身记录SaaS系统设计

**日期：** 2026-04-23
**状态：** 修订中（待用户确认）
**版本：** 1.1

## 1. 概述

### 项目目标
基于 LangChain.js 的多用户 SaaS 系统，通过自然语言对话自动记录健身数据和身体围度，并支持历史数据查询。

### 核心用户
个人健身爱好者

### 技术栈
- 前端：React + Vite
- 后端：Node.js (Express)
- 数据库：MySQL
- AI：MiniMax (通过 LangChain.js)

---

## 2. 架构设计

### 整体架构

```
┌─────────────────────────────────────────────────────┐
│               React + Vite 前端                      │
│            (用户对话界面 + 数据展示)                   │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP / REST API
                      ▼
┌─────────────────────────────────────────────────────┐
│                 Node.js 后端                         │
│  ┌─────────────────────────────────────────────┐    │
│  │          LangChain Agent                    │    │
│  │   - tools: save_workout, query_history...   │    │
│  │   - memory: conversation history            │    │
│  └─────────────────────────────────────────────┘    │
│                      │                               │
│                      ▼                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │SaveService │  │QueryService│  │AuthService │    │
│  └─────┬──────┘  └─────┬──────┘  └────────────┘    │
└────────┼───────────────┼────────────────────────────┘
         │               │
         ▼               ▼
    ┌─────────────────────────┐
    │         MySQL           │
    │  users / workouts /     │
    │  workout_exercises /    │
    │  body_measurements /   │
    │  measurement_items      │
    └─────────────────────────┘
```

### LangChain Agent 设计

**Tools:**
- `save_workout` - 当用户描述训练时使用，如"今天跑了5公里"、"深蹲100kg 5组"
- `save_measurement` - 当用户描述身体围度时使用，如"今天胸围94，腰围78"
- `query_workout` - 当用户询问训练记录时使用，如"我上周跑了多少次？"
- `query_measurement` - 当用户询问身体围度时使用，如"我的围度变化？"

**Memory:**
- 对话历史持久化（用于上下文理解）

**user_id 获取：**
- 从请求的 JWT token 中解析，不依赖用户输入
- Middleware 解析 token 并注入到 request context

---

## 3. 数据模型

### users
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AUTO_INCREMENT) | 主键 |
| email | VARCHAR(255) | 唯一邮箱 |
| password_hash | VARCHAR(255) | 密码哈希(bcrypt) |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**索引：** email (UNIQUE)

### workouts
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AUTO_INCREMENT) | 主键 |
| user_id | INT (FK) | 用户ID |
| date | DATE | 训练日期 |
| created_at | DATETIME | 创建时间 |
| deleted_at | DATETIME | 软删除时间（NULL=未删除） |

**索引：** user_id, date, deleted_at

### workout_exercises
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AUTO_INCREMENT) | 主键 |
| workout_id | INT (FK) | 训练ID |
| exercise_name | VARCHAR(100) | 运动名称 |
| sets | INT | 组数 |
| reps | INT | 次数 |
| weight | DECIMAL(10,2) | 重量(kg) |
| duration | INT | 时长(分钟) |
| distance | DECIMAL(10,2) | 距离(公里) |
| created_at | DATETIME | 创建时间 |

### body_measurements
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AUTO_INCREMENT) | 主键 |
| user_id | INT (FK) | 用户ID |
| date | DATE | 测量日期 |
| created_at | DATETIME | 创建时间 |
| deleted_at | DATETIME | 软删除时间（NULL=未删除） |

**索引：** user_id, date, deleted_at

### measurement_items
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AUTO_INCREMENT) | 主键 |
| measurement_id | INT (FK) | 围度记录ID |
| body_part | ENUM | 部位(chest/waist/hips/biceps/thighs/calves/other) |
| value | DECIMAL(10,2) | 数值(cm) |
| created_at | DATETIME | 创建时间 |

---

## 4. API 路由设计

### 认证模块 `/api/auth`
| 方法 | 路径 | 说明 | 请求体 | 响应 |
|------|------|------|--------|------|
| POST | /register | 注册 | `{email, password}` | `{token, user}` |
| POST | /login | 登录 | `{email, password}` | `{token, user}` |
| GET | /me | 获取当前用户 | - | `{user}` |

### 对话模块 `/api/chat`
| 方法 | 路径 | 说明 | 请求体 | 响应 |
|------|------|------|--------|------|
| POST | /message | 发送消息 | `{message}` | `{reply, savedData?, queryResult?}` |

**Header:** `Authorization: Bearer <token>`

### 历史记录模块 `/api/records`
| 方法 | 路径 | 说明 | 查询参数 | 响应 |
|------|------|------|---------|------|
| GET | /workouts | 获取训练记录 | `?start=&end=` | `{workouts}` |
| GET | /measurements | 获取围度记录 | `?start=&end=` | `{measurements}` |

### 撤销模块 `/api/records/:type/:id`
| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| DELETE | /records/workout/:id | 软删除训练 | workout_id |
| DELETE | /records/measurement/:id | 软删除围度 | measurement_id |
| POST | /records/workout/:id/restore | 恢复训练 | workout_id |
| POST | /records/measurement/:id/restore | 恢复围度 | measurement_id |

---

## 5. 认证流程

### 注册
```
用户注册 → 验证邮箱格式 → 检查邮箱唯一 →
bcrypt(password) → 写入 users → 生成 JWT → 返回 token
```

### 登录
```
用户登录 → 查找 email → bcrypt(compare) → 验证密码 →
生成 JWT → 返回 token
```

### JWT 结构
```json
{
  "userId": 123,
  "email": "user@example.com",
  "exp": 1234567890
}
```

### 中间件验证
```
请求 → 提取 Bearer token → 验证签名 → 解析 userId →
注入 request.context → 路由处理
```

---

## 6. 数据流

### 保存流程（SAVE_WORKOUT）
1. 用户说"今天深蹲100kg 5组每组8个"
2. 前端 POST /api/chat/message（含 JWT）
3. 后端验证 token，获取 user_id
4. Agent 识别为 SAVE_WORKOUT 意图
5. 解析出：exercise=深蹲, weight=100kg, sets=5, reps=8
6. 调用 save_workout tool → 写库
7. 返回："已保存：深蹲 100kg x 5组 x 8次" + savedData 元信息

### 保存流程（SAVE_MEASUREMENT）
1. 用户说"今天胸围94，腰围78"
2. Agent 识别为 SAVE_MEASUREMENT 意图
3. 解析出：chest=94, waist=78
4. 调用 save_measurement tool → 写库
5. 返回："已保存：胸围 94cm，腰围 78cm"

### 查询流程（QUERY）
1. 用户问"这周跑了多少次？"
2. Agent 识别为 QUERY 意图
3. 解析出：时间=这周, 类型=跑步
4. 调用 query_workout tool → 查库
5. 返回："这周跑了3次：周一5公里、周三3公里、周五6公里"

### 撤销流程
1. 用户收到保存成功消息
2. 用户说"撤销刚才的记录"
3. Agent 识别为 REVOKE 意图
4. 根据 savedData.id 调用 DELETE /api/records/workout/:id
5. 设置 deleted_at = NOW()
6. 返回："已撤销"

---

## 7. Tool 定义（详细）

### save_workout
```javascript
{
  name: "save_workout",
  description: "当用户要记录健身训练时使用。不要在询问围度时使用。

  触发示例：
  - "今天跑了5公里"
  - "深蹲100kg 5组每组8个"
  - "练了30分钟hiit"
  - "做了100个俯卧撑分5组"

  输入：user_id (从token自动获取), date, exercises数组",
  parameters: {
    type: "object",
    properties: {
      date: { type: "string", description: "训练日期 YYYY-MM-DD" },
      exercises: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            sets: { type: "number" },
            reps: { type: "number" },
            weight: { type: "number" },
            duration: { type: "number" },
            distance: { type: "number" }
          }
        }
      }
    },
    required: ["date", "exercises"]
  }
}
```

### save_measurement
```javascript
{
  name: "save_measurement",
  description: "当用户要记录身体围度时使用。不要在记录训练时使用。

  触发示例：
  - "今天胸围94，腰围78"
  - "测了一下臂围34"
  - "腰又粗了，现在是80"

  支持部位：chest(胸), waist(腰), hips(臀), biceps(臂), thighs(腿), calves(小腿)

  输入：user_id (从token自动获取), date, measurements数组",
  parameters: {
    type: "object",
    properties: {
      date: { type: "string", description: "测量日期 YYYY-MM-DD" },
      measurements: {
        type: "array",
        items: {
          type: "object",
          properties: {
            body_part: { type: "string", enum: ["chest","waist","hips","biceps","thighs","calves"] },
            value: { type: "number" }
          }
        }
      }
    },
    required: ["date", "measurements"]
  }
}
```

### query_workout
```javascript
{
  name: "query_workout",
  description: "当用户询问训练记录、训练历史、统计数据时使用。

  触发示例：
  - "这周跑了多少次？"
  - "上个月深蹲总重量多少？"
  - "我的训练频率怎么样？"
  - "对比一下这周和上周"

  输入：user_id (从token自动获取), start_date, end_date, exercise_type(可选)",
  parameters: {
    type: "object",
    properties: {
      start_date: { type: "string", description: "开始日期 YYYY-MM-DD" },
      end_date: { type: "string", description: "结束日期 YYYY-MM-DD" },
      exercise_type: { type: "string", description: "运动类型(可选)" }
    },
    required: ["start_date", "end_date"]
  }
}
```

### query_measurement
```javascript
{
  name: "query_measurement",
  description: "当用户询问身体围度、围度变化、对比时使用。

  触发示例：
  - "我的围度有什么变化？"
  - "胸围对比三个月前？"
  - "最近腰有没有变细？"

  输入：user_id (从token自动获取), start_date, end_date, body_part(可选)",
  parameters: {
    type: "object",
    properties: {
      start_date: { type: "string", description: "开始日期 YYYY-MM-DD" },
      end_date: { type: "string", description: "结束日期 YYYY-MM-DD" },
      body_part: { type: "string", description: "部位(可选)" }
    },
    required: ["start_date", "end_date"]
  }
}
```

---

## 8. 错误处理

### 意图识别失败
- AI 无法判断保存还是查询 → 询问用户澄清
- 例："没听明白，你要记录还是要查询？"

### 解析失败
- 识别到保存意图，但数据不完整 → 询问补充
- 例："深蹲记录了，但重量是多少？"

### 保存失败
- 数据库写入错误 → 返回"保存失败，请重试"，记录 error log

### 查询无数据
- 查不到结果 → 返回"暂无记录"

### 认证失败
- token 无效/过期 → 返回 401 Unauthorized

### 撤销失败
- 记录不存在或已删除 → 返回"记录不存在或已撤销"

---

## 9. MiniMax 集成

### 模型选择
- 使用 MiniMax Chat 模型（支持 function calling）
- 模型名称：`MiniMax/Abab6`

### 流式输出
- 支持 Server-Sent Events (SSE) 流式返回
- 提升用户体验，尤其是长回复时

### 配置
```javascript
{
  model: "MiniMax/Abab6",
  apiKey: process.env.MINIMAX_API_KEY,
  temperature: 0.7,
  streaming: true
}
```

---

## 10. 前端设计

### 技术选型
- React + Vite
- 状态管理：Zustand / React Context
- 样式：TailwindCSS（暗色主题）
- HTTP client：Axios

### UI风格
- 健身风格：暗色系，粗体字，有力量感
- 主色调：黑/深灰 + 亮橙/红作为强调色

### 核心页面
1. **登录/注册页** - 邮箱密码认证
2. **对话页** - AI对话界面，显示保存/查询结果，支持撤销按钮
3. **历史记录页** - 查看训练和围度历史
4. **趋势页** - 数据可视化（可选）

---

## 11. MVP 简化策略

- 暂不做订阅收费系统
- 暂不限制对话次数
- 先实现核心的保存和查询功能
- 撤销功能先做软删除，恢复功能后续补充

---

## 12. 下一步

进入 implementation planning 阶段