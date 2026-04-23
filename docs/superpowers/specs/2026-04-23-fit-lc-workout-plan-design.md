# FitLC 健身计划功能设计

**日期：** 2026-04-23
**状态：** 待批准
**版本：** 1.0

## 1. 概述

### 项目目标
为 FitLC AI 健身记录 SaaS 系统添加健身计划生成、管理和执行追踪功能。用户可通过自然语言对话或表单提交健身需求，AI 生成个性化训练计划，支持对话或可视化编辑调整计划，按计划执行并追踪进度，AI 根据执行情况给出优化建议。

### 核心功能
- 健身计划生成（AI + 表单）
- 计划可视化编辑
- 计划执行追踪与打卡
- AI 执行分析与计划优化建议

---

## 2. 技术架构

### 数据模型

#### workout_plans
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AUTO_INCREMENT) | 主键 |
| user_id | INT (FK) | 用户ID |
| name | VARCHAR(100) | 计划名称 |
| goal | ENUM('bulk', 'cut', 'maintain') | 目标 |
| frequency | INT | 每周训练次数 |
| experience | ENUM('beginner', 'intermediate', 'advanced') | 经验水平 |
| equipment | VARCHAR(255) | 可用器械 |
| conditions | TEXT | 身体状况/伤病 |
| body_weight | DECIMAL(5,2) | 体重(kg) |
| body_fat | DECIMAL(4,1) | 体脂率(%) |
| height | DECIMAL(5,1) | 身高(cm) |
| duration_weeks | INT | 计划周期(周) |
| status | ENUM('draft', 'active', 'completed', 'paused') | 状态 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**索引：** user_id, status

#### plan_exercises
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AUTO_INCREMENT) | 主键 |
| plan_id | INT (FK) | 计划ID |
| day_of_week | INT | 星期几(1-7) |
| exercise_name | VARCHAR(100) | 动作名称 |
| sets | INT | 组数 |
| reps | VARCHAR(20) | 次数(如 "8-12") |
| weight | DECIMAL(5,2) | 重量(kg) |
| duration | INT | 时长(分钟) |
| rest_seconds | INT | 组间休息(秒) |
| order_index | INT | 顺序 |
| created_at | DATETIME | 创建时间 |

**索引：** plan_id, day_of_week

#### plan_executions
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AUTO_INCREMENT) | 主键 |
| plan_id | INT (FK) | 计划ID |
| plan_exercise_id | INT (FK) | 计划动作ID |
| scheduled_date | DATE | 计划日期 |
| completed_at | DATETIME | 完成时间 |
| completed_reps | INT | 完成次数 |
| completed_weight | DECIMAL(5,2) | 完成重量 |
| status | ENUM('pending', 'completed', 'skipped') | 状态 |
| notes | TEXT | 备注 |
| created_at | DATETIME | 创建时间 |

**索引：** plan_id, scheduled_date, status

---

## 3. API 路由设计

### 计划管理 `/api/plans`

| 方法 | 路径 | 说明 | 请求体/响应 |
|------|------|------|-------------|
| POST | /generate | AI 生成计划 | body: user_profile → { plan, message } |
| GET | / | 获取用户所有计划 | → { plans } |
| GET | /:id | 获取计划详情 | → { plan, exercises, executions } |
| PUT | /:id | 更新计划(对话/手动) | body: { adjustment } 或 { exercises } |
| DELETE | /:id | 删除计划 | → { success } |
| POST | /:id/activate | 激活计划 | → { plan } |

### 执行记录 `/api/plans/:id/executions`

| 方法 | 路径 | 说明 | 请求体/响应 |
|------|------|------|-------------|
| GET | / | 获取执行记录 | → { executions } |
| POST | / | 记录执行 | body: { plan_exercise_id, completed_reps, completed_weight, notes } |
| POST | /batch | 批量打卡 | body: { date, exercises[] } |
| GET | /analysis | 获取执行分析 | → { stats, suggestions } |

### AI 对话 `/api/chat`

复现有 `/message` 接口扩展，当用户请求生成/调整计划时，fitness agent 调用对应 tools。

---

## 4. AI Tool 设计

### 4.1 generate_plan

```javascript
{
  name: "generate_plan",
  description: "当用户请求生成健身计划时使用，如'帮我生成健身计划'、'我想制定一个增肌计划'。

  用户需要提供：目标、每周训练频率、经验水平、可用器械、身体状况（伤病/限制）、体重/体脂/身高、计划周期。",
  schema: {
    userId: z.number().describe("用户ID"),
    user_profile: z.object({
      goal: z.enum(["bulk", "cut", "maintain"]).describe("目标：增肌/减脂/维持"),
      frequency: z.number().describe("每周训练次数"),
      experience: z.enum(["beginner", "intermediate", "advanced"]).describe("经验水平"),
      equipment: z.string().describe("可用器械"),
      conditions: z.string().optional().describe("身体状况/伤病"),
      body_weight: z.number().describe("体重(kg)"),
      body_fat: z.number().optional().describe("体脂率(%)"),
      height: z.number().describe("身高(cm)"),
      duration_weeks: z.number().describe("计划周期(周)")
    })
  }
}
```

### 4.2 adjust_plan

```javascript
{
  name: "adjust_plan",
  description: "当用户请求调整现有健身计划时使用，如'把周三换成练胸'、'增加有氧时间'、'重量太重了降低一点'。",
  schema: {
    userId: z.number().describe("用户ID"),
    plan_id: z.number().describe("计划ID"),
    adjustment: z.string().describe("调整描述")
  }
}
```

### 4.3 analyze_execution

```javascript
{
  name: "analyze_execution",
  description: "当用户询问计划执行情况、进度、或请求优化建议时使用。",
  schema: {
    userId: z.number().describe("用户ID"),
    plan_id: z.number().describe("计划ID")
  }
}
```

---

## 5. 前端页面设计

### 5.1 计划列表页 `/plans`

```
┌─────────────────────────────────────────────┐
│ FITLC                            [历史][趋势][个人] │
├─────────────────────────────────────────────┤
│  健身计划                      [生成新计划]   │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐   │
│  │ 增肌计划 A                      [进行中] │
│  │ 每周4次 | 12周                    [执行] │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ 减脂计划 B                      [已完成] │
│  │ 每周3次 | 8周                         │ │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### 5.2 计划详情页 `/plans/:id`

```
┌─────────────────────────────────────────────┐
│ FITLC                            [历史][趋势][个人] │
├─────────────────────────────────────────────┤
│  增肌计划 A           [对话调整] [可视化编辑] [激活] │
├─────────────────────────────────────────────┤
│  目标：增肌 | 每周4次 | 剩余8周 | 完成度 65%      │
├─────────────────────────────────────────────┤
│  [周一 胸部+三头] [周三 背+二头] [周五 腿+肩] [周日 有氧] │
├─────────────────────────────────────────────┤
│  周一：胸部+三头肌                           │
│  ┌─────────────────────────────────────┐   │
│  │ ≡ 杠铃卧推        4组  8-12次  60kg   │   │
│  │ ≡ 哑铃飞鸟        3组  12-15次 15kg   │   │
│  │ ≡ 绳索下压        3组  12次    25kg   │   │
│  └─────────────────────────────────────┘   │
│                    [开始执行]                │
├─────────────────────────────────────────────┤
│  AI 建议：最近执行率下降，建议增加休息日恢复    │
└─────────────────────────────────────────────┘
```

### 5.3 执行打卡页 `/plans/:id/execute`

```
┌─────────────────────────────────────────────┐
│ FITLC                            [历史][趋势][个人] │
├─────────────────────────────────────────────┤
│  今日训练：周一 - 胸部+三头              04-23 │
├─────────────────────────────────────────────┤
│  ✓ 杠铃卧推        4组  60kg    [完成]       │
│  ○ 哑铃飞鸟        3组  15kg    [完成]       │
│  ○ 绳索下压        3组  25kg    [完成]       │
├─────────────────────────────────────────────┤
│              [提交打卡]                      │
└─────────────────────────────────────────────┘
```

---

## 6. 核心流程

### 6.1 生成计划流程

```
1. 用户在 /plans/new 填写完整表单
2. 提交到 POST /api/plans/generate
3. 后端调用 generate_plan tool
4. AI 解析用户信息，生成结构化计划
5. 返回计划数据，存储到 workout_plans + plan_exercises
6. 用户可在详情页对话调整或可视化编辑
7. 用户点击"激活"开始执行
```

### 6.2 执行追踪流程

```
1. 用户点击"开始执行"
2. 进入 /plans/:id/execute 打卡页
3. 每完成一个动作点击"完成"
4. 填写实际重量/次数
5. 提交打卡 → POST /api/plans/:id/executions/batch
6. 数据存入 plan_executions
7. AI 分析执行数据，给出建议
```

### 6.3 对话调整流程

```
用户: "帮我生成一个健身计划"
AI: (识别为 GENERATE_PLAN 意图)
  → 调用 generate_plan tool
  → 返回计划 + message "已生成计划..."
  → 用户可继续说"把周三换成练胸"
  → AI 调用 adjust_plan tool 更新计划
```

---

## 7. UI 风格规范

沿用现有 FitLC 暗色主题：

```css
background-primary: #0A0A0A
background-secondary: #1A1A1A
accent-primary: #FF4500 (烈焰橙)
accent-secondary: #DC143C (电红)
text-primary: #FFFFFF
border-default: #333333
```

- 无圆角或极小圆角 (2-4px)
- 粗边框按钮 (2px solid)
- 几何线条装饰
- 卡片光晕效果

---

## 8. MVP 分阶段策略

### Phase 1: 基础计划生成
- 表单收集用户信息
- AI generate_plan tool
- 计划详情页展示
- 对话调整计划

### Phase 2: 执行追踪
- 打卡功能
- 执行记录存储
- AI analyze_execution tool

### Phase 3: 可视化编辑
- 计划页面拖拽调整
- 动作参数修改
- 进度图表

---

## 9. 错误处理

### AI 无法生成计划
- 信息不足时询问补充："请问你的训练目标是增肌还是减脂？"

### 计划调整失败
- plan_id 不存在或无权访问 → 返回 403
- 调整描述不明确 → 询问具体要调整什么

### 打卡失败
- 网络错误 → Toast 提示重试
- 数据验证失败 → 显示具体错误信息

---

## 10. 后续优化方向

- 根据执行数据自动微调计划参数
- 基于用户反馈的学习优化
- 社区分享计划模板
- 与可穿戴设备数据同步
