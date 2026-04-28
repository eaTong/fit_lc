# FitLC 产品需求文档（正式版）

> **注意：** 本文档为正式版 PRD，记录已实现的功能。全部需求（包括未实现的）请参见 [PRD-planning.md](./PRD-planning.md)。

**版本：** 1.1
**日期：** 2026-04-28
**状态：** 已上线

---

## 目录

1. [产品概述](#1-产品概述)
2. [用户角色与权限](#2-用户角色与权限)
3. [核心功能模块](#3-核心功能模块)
   - 3.1 [AI对话记录](#31-ai对话记录)
   - 3.2 [训练动作库](#32-训练动作库)
   - 3.3 [肌肉库](#33-肌肉库)
   - 3.4 [历史记录管理](#34-历史记录管理)
   - 3.5 [数据趋势分析](#35-数据趋势分析)
   - 3.6 [健身计划](#36-健身计划)
4. [AI增强功能](#4-ai增强功能)
5. [技术架构](#5-技术架构)
6. [数据库设计](#6-数据库设计)
7. [API接口设计](#7-api接口设计)
8. [前端页面清单](#8-前端页面清单)
9. [非功能性需求](#9-非功能性需求)

---

## 1. 产品概述

### 1.1 产品定位
FitLC 是一款 AI 健身记录 SaaS 系统，通过自然语言对话自动记录健身数据和身体围度，支持历史数据查询与趋势分析。

### 1.2 核心价值
- **零门槛记录**：用户无需手动填写表单，直接用自然语言描述训练内容
- **智能解析**：AI 自动解析训练动作、组数、次数、重量等参数
- **数据洞察**：自动汇总训练统计和围度变化趋势

### 1.3 目标用户
| 用户类型 | 描述 |
|---------|------|
| 个人健身爱好者 | 希望快速记录训练、追踪围度变化的普通用户 |
| 健身教练 | 管理客户训练数据（未来扩展） |
| 系统管理员 | 维护动作库、肌肉库等基础数据 |

### 1.4 技术栈
| 层级 | 技术选型 |
|------|---------|
| 前端 | React 18 + Vite + TailwindCSS + Zustand + Axios + React Router v6 |
| 后端 | Node.js + Express.js + Prisma ORM |
| 数据库 | MySQL 8.0 |
| AI | LangChain.js + MiniMax Chat 模型 (Abab6/M2.7) |
| 认证 | JWT (JSON Web Token) |

---

## 2. 用户角色与权限

### 2.1 角色定义
| 角色 | 说明 | 权限范围 |
|------|------|---------|
| normal | 普通用户 | 使用AI对话、记录训练/围度、查看历史和趋势 |
| admin | 管理员 | 普通用户权限 + 动作库/肌肉库CRUD、AI增强操作 |

### 2.2 权限矩阵
| 功能 | normal | admin |
|------|--------|-------|
| AI对话记录训练 | ✓ | ✓ |
| AI对话记录围度 | ✓ | ✓ |
| 查看训练历史 | ✓ | ✓ |
| 查看围度历史 | ✓ | ✓ |
| 查看趋势图 | ✓ | ✓ |
| 动作库管理 | - | ✓ |
| 肌肉库管理 | - | ✓ |
| AI增强（批量生成） | - | ✓ |

### 2.3 新用户默认角色
新用户注册时自动分配 `normal` 角色。管理员角色需通过数据库手动分配。

---

## 3. 核心功能模块

### 3.1 AI对话记录

#### 3.1.1 功能描述
用户通过自然语言与AI对话，系统自动识别用户意图（记录训练/记录围度/查询数据）并执行相应操作。

#### 3.1.2 触发场景

**记录训练 (save_workout)**
```
触发示例：
- "今天跑了5公里"
- "深蹲100kg 5组每组8个"
- "练了30分钟hiit"
- "做了100个俯卧撑分5组"
```

**记录围度 (save_measurement)**
```
触发示例：
- "今天胸围94，腰围78"
- "测了一下臂围34"
- "腰又粗了，现在是80"
```

**查询训练 (query_workout)**
```
触发示例：
- "这周跑了多少次？"
- "上个月深蹲总重量多少？"
- "我的训练频率怎么样？"
- "对比一下这周和上周"
```

**查询围度 (query_measurement)**
```
触发示例：
- "我的围度有什么变化？"
- "胸围对比三个月前？"
- "最近腰有没有变细？"
```

#### 3.1.3 数据解析
| 参数 | 说明 |
|------|------|
| date | 训练/测量日期，格式 YYYY-MM-DD |
| exercises | 训练动作数组 [{name, sets, reps, weight, duration, distance}] |
| measurements | 围度数组 [{body_part, value}] |

#### 3.1.4 支持的身体部位
`chest`(胸) | `waist`(腰) | `hips`(臀) | `biceps`(臂) | `thighs`(腿) | `calves`(小腿)

#### 3.1.5 撤销功能
保存成功后，用户可通过"撤销"按钮撤回最近一次操作（软删除）。

#### 3.1.6 交互设计
- 消息列表展示用户消息和AI回复
- 保存成功时显示"已保存"标识和撤销按钮
- AI回复包含操作结果摘要

---

### 3.2 训练动作库

#### 3.2.1 功能描述
结构化的训练动作数据库，支持按肌肉群、器械、难度筛选动作详情查看。

#### 3.2.2 动作属性
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| name | VARCHAR(200) | 动作名称 |
| category | ENUM | 肌肉群：chest/back/legs/shoulders/arms/core |
| equipment | ENUM | 器械：barbell/dumbbell/cable/machine/bodyweight/other |
| difficulty | ENUM | 难度：beginner/intermediate/advanced |
| description | TEXT | 动作说明（Markdown） |
| adjustmentNotes | TEXT | 细节调整（Markdown） |
| videoUrl | VARCHAR(500) | 视频教程链接 |
| steps | TEXT | 动作步骤说明 |
| safetyNotes | TEXT | 安全注意事项 |
| commonMistakes | TEXT | 常见错误 |
| exerciseType | STRING | compound(复合动作)/isolation(孤立动作) |
| variantType | ENUM | equipment/difficulty/posture |
| conversionGuide | JSON | 变体转换指南 |
| tags | JSON | 标签数组 |
| status | ENUM | draft(待审核)/published(已发布) |
| isVariant | BOOLEAN | 是否是变体 |
| parentId | INT | 变体所属主动作 |

#### 3.2.3 动作-肌肉关联
| 字段 | 类型 | 说明 |
|------|------|------|
| exerciseId | INT | 动作ID |
| muscleId | INT | 肌肉ID（关联level 2主肌肉） |
| role | ENUM | primary(主要)/secondary(辅助) |

#### 3.2.4 动作变体
通过 `parentId` 自关联实现变体关系。例如：杠铃卧推 → 哑铃卧推 → 上斜卧推

#### 3.2.5 审核流程
1. AI或管理员创建动作 → status: `draft`
2. 管理员审核确认 → status: `published`
3. 已发布的动作才能被普通用户查询使用

#### 3.2.6 数据规模
预计 500+ 动作，覆盖 6 大肌肉群、多种器械和难度级别。

---

### 3.3 肌肉库

#### 3.3.1 功能描述
两层层级结构的肌肉数据库：肌肉群（Level 1）→ 主肌肉（Level 2）

#### 3.3.2 肌肉层级结构
```
胸部 (chest)
├── 胸大肌
├── 胸小肌
└── 前锯肌

背部 (back)
├── 背阔肌
├── 中下斜方肌
├── 大圆肌
├── 小圆肌
└── 竖脊肌

腿部 (legs)
├── 股四头肌
├── 腘绳肌
├── 臀大肌
└── 小腿肌群

肩部 (shoulders)
├── 三角肌
└── 肩袖肌群

手臂 (arms)
├── 肱二头肌
├── 肱三头肌
└── 前臂肌群

核心 (core)
├── 腹直肌
├── 腹斜肌
├── 腹横肌
└── 下背肌群
```

#### 3.3.3 肌肉属性
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| name | VARCHAR(100) | 肌肉名称 |
| group | ENUM | 肌肉群：chest/back/legs/shoulders/arms/core |
| parentId | INT | 父级肌肉ID，null=肌肉群本身 |
| sortOrder | INT | 排序序号 |
| origin | TEXT | 肌肉起点 |
| insertion | TEXT | 肌肉止点 |
| function | TEXT | 肌肉功能 |
| trainingTips | TEXT | 训练技巧 |

#### 3.3.4 数据统计
| 类型 | 数量 |
|------|------|
| 肌肉群 (Level 1) | 6 |
| 主肌肉 (Level 2) | ~20 |
| 总计 | ~26 |

---

### 3.4 历史记录管理

#### 3.4.1 训练记录 (workouts)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| userId | INT | 用户ID |
| date | DATE | 训练日期 |
| createdAt | DATETIME | 创建时间 |
| deletedAt | DATETIME | 软删除时间（NULL=未删除） |

#### 3.4.2 训练动作 (workout_exercises)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| workoutId | INT | 关联训练记录ID |
| exerciseName | VARCHAR(100) | 动作名称 |
| sets | INT | 组数 |
| reps | INT | 次数 |
| weight | DECIMAL(10,2) | 重量(kg) |
| duration | INT | 时长(分钟) |
| distance | DECIMAL(10,2) | 距离(公里) |
| createdAt | DATETIME | 创建时间 |

#### 3.4.3 围度记录 (body_measurements)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| userId | INT | 用户ID |
| date | DATE | 测量日期 |
| createdAt | DATETIME | 创建时间 |
| deletedAt | DATETIME | 软删除时间（NULL=未删除） |

#### 3.4.4 围度项目 (measurement_items)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| measurementId | INT | 关联围度记录ID |
| bodyPart | ENUM | 部位：chest/waist/hips/biceps/thighs/calves/other |
| value | DECIMAL(10,2) | 数值(cm) |
| createdAt | DATETIME | 创建时间 |

#### 3.4.5 软删除
所有记录支持软删除（设置 `deletedAt` 时间戳），已删除记录不参与统计计算。

---

### 3.5 数据趋势分析

#### 3.5.1 围度趋势图
- 折线图展示多个身体部位的围度变化
- 支持部位：胸围、腰围、臀围、臂围、腿围、小腿围
- 时间范围：最近30天/90天/6个月/1年/全部

#### 3.5.2 训练统计
- 柱状图展示每周训练次数
- 按动作类型分类统计

---

### 3.6 健身计划

#### 3.6.1 功能描述
用户可通过AI生成个性化训练计划，支持对话调整、可视化编辑、执行追踪和进度分析。

**与动作库/肌肉库的集成：**
- 计划动作关联 `exercises.id`，获取完整动作详情（步骤、安全提示、肌肉关联）
- 训练日直接关联目标肌肉群，便于AI理解和用户查看
- 器械选项复用动作库的 `Equipment` 枚举

#### 3.6.2 核心流程

**生成计划**
```
用户描述需求 → AI识别GENERATE_PLAN
→ 根据器械/难度从 exercises 筛选动作
→ 按肌肉群恢复周期分配训练日
→ 返回结构化计划（含 exerciseId）
→ 存入数据库
```

**对话调整**
```
用户提出调整 → AI识别ADJUST_PLAN → 解析意图 → 更新 plan_exercises
```

**执行打卡**
```
进入打卡页 → JOIN exercises 获取动作详情 → 完成打卡
→ 存入 plan_executions
→ AI 分析肌肉恢复状态给出建议
```

#### 3.6.3 肌肉群分配原则
| 肌肉类型 | 最优恢复时间 | 训练频率 |
|---------|-------------|---------|
| 大肌群（胸、背、腿） | 48-72小时 | 每周1-2次 |
| 小肌群（肩、臂、腹） | 24-48小时 | 每周2-3次 |

#### 3.6.4 计划状态
| 状态 | 说明 |
|------|------|
| draft | 草稿（未激活） |
| active | 进行中 |
| completed | 已完成 |
| paused | 已暂停 |

#### 3.6.4 AI Tools
| Tool | 功能 |
|------|------|
| generate_plan | 根据用户信息生成健身计划 |
| adjust_plan | 调整现有计划内容 |
| analyze_execution | 分析执行数据给出建议 |

#### 3.6.5 详情说明
详见 [健身计划详情页](PRD-details/06-workout-plan.md)

---

## 4. AI增强功能

### 4.1 动作详情AI生成

#### 4.1.1 功能描述
管理员可通过AI自动生成动作的详细描述信息。

#### 4.1.2 生成字段
| 字段 | 说明 |
|------|------|
| steps | 动作步骤说明（4-6步） |
| safetyNotes | 安全注意事项（2-3条） |
| commonMistakes | 常见错误（2-3条） |
| adjustmentNotes | 调整说明 |
| exerciseType | compound/isolation |
| suggestedMuscles | 建议关联肌肉列表 |

#### 4.1.3 肌肉关联关系类型
| 关系 | 说明 |
|------|------|
| agonist | 主发力的肌肉 |
| synergist | 协同发力的肌肉 |
| antagonist | 拮抗肌 |
| stabilizer | 稳定肌 |

### 4.2 肌肉详情AI生成

#### 4.2.1 生成字段
| 字段 | 说明 |
|------|------|
| origin | 肌肉起点 |
| insertion | 肌肉止点 |
| function | 肌肉功能 |
| trainingTips | 训练技巧 |

### 4.3 批量生成脚本
支持断点续传的批量生成工具，输出JSON文件供管理员审核后导入数据库。

---

## 5. 技术架构

### 5.1 系统架构图
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
    │  measurement_items /     │
    │  muscles / exercises /   │
    │  roles                  │
    └─────────────────────────┘
```

### 5.2 后端分层架构
```
Router → Service → Repository
```

| 层级 | 职责 |
|------|------|
| Router | HTTP路由、参数校验、权限校验 |
| Service | 业务逻辑、事务管理 |
| Repository | 数据库访问、ORM操作 |

### 5.3 LangChain Agent Tools
| Tool | 功能 |
|------|------|
| save_workout | 记录训练数据 |
| save_measurement | 记录身体围度 |
| query_workout | 查询训练历史 |
| query_measurement | 查询围度历史 |
| query_exercise | 查询动作库 |
| generate_plan | AI生成健身计划 |
| adjust_plan | 调整现有计划 |
| analyze_execution | 分析计划执行情况 |

---

## 6. 数据库设计

### 6.1 ER关系图
```
users 1 ───< user_roles >──── 1 roles
  │
  │
  └──< workouts >──< workout_exercises >── exercises >──< exercise_muscles >── muscles
  │
  └──< body_measurements >──< measurement_items >
  │
  └──< workout_plans >──< plan_exercises >── exercises
                  │
                  └──< plan_executions >── plan_exercises
```

### 6.2 表结构汇总
| 表名 | 说明 | 关键字段 |
|------|------|---------|
| users | 用户表 | id, email, password_hash |
| roles | 角色表 | id, name |
| user_roles | 用户角色关联 | userId, roleId |
| workouts | 训练记录 | id, userId, date, deletedAt |
| workout_exercises | 训练动作 | workoutId, name, sets, reps, weight, duration, distance |
| body_measurements | 围度记录 | id, userId, date, deletedAt |
| measurement_items | 围度项目 | measurementId, bodyPart, value |
| muscles | 肌肉层级 | id, name, group, parentId |
| exercises | 动作库 | id, name, category, equipment, difficulty, status |
| exercise_muscles | 动作肌肉关联 | exerciseId, muscleId, role |
| workout_plans | 健身计划 | id, userId, goal, frequency, status |
| plan_exercises | 计划动作 | planId, exerciseId, dayOfWeek, targetMuscles, sets, reps |
| plan_executions | 执行记录 | planId, planExerciseId, scheduledDate, status |
| exercises | 动作库 | id, name, category, equipment, difficulty, status |
| exercise_muscles | 动作肌肉关联 | exerciseId, muscleId, role |

### 6.3 索引设计
| 表 | 索引字段 |
|------|---------|
| users | email (UNIQUE) |
| workouts | userId, date, deletedAt |
| body_measurements | userId, date, deletedAt |
| exercises | category, equipment, difficulty, status |
| exercise_muscles | muscleId, (exerciseId, muscleId, role) UNIQUE |
| workout_plans | userId, status |
| plan_exercises | planId, dayOfWeek |
| plan_executions | planId, scheduledDate, status |

---

## 7. API接口设计

### 7.1 认证模块 `/api/auth`
| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /register | 用户注册 | 否 |
| POST | /login | 用户登录 | 否 |
| GET | /me | 获取当前用户 | 是 |

### 7.2 对话模块 `/api/chat`
| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /message | 发送AI消息 | 是 |

### 7.3 记录模块 `/api/records`
| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | /workouts | 获取训练记录 | 是 |
| GET | /measurements | 获取围度记录 | 是 |
| DELETE | /workout/:id | 软删除训练 | 是 |
| DELETE | /measurement/:id | 软删除围度 | 是 |
| POST | /workout/:id/restore | 恢复训练 | 是 |
| POST | /measurement/:id/restore | 恢复围度 | 是 |

### 7.4 动作库模块 `/api/exercises`
| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | / | 获取动作列表 | 是 |
| GET | /:id | 获取动作详情 | 是 |

### 7.5 管理模块 `/api/admin`
| 方法 | 路径 | 说明 | 认证 | 权限 |
|------|------|------|------|------|
| GET | /exercises | 动作列表 | 是 | admin |
| POST | /exercises | 创建动作 | 是 | admin |
| PUT | /exercises/:id | 更新动作 | 是 | admin |
| DELETE | /exercises/:id | 删除动作 | 是 | admin |
| PATCH | /exercises/:id/publish | 发布动作 | 是 | admin |
| POST | /exercises/generate | AI生成动作详情 | 是 | admin |
| GET | /muscles | 肌肉列表 | 是 | admin |
| POST | /muscles | 创建肌肉 | 是 | admin |
| PUT | /muscles/:id | 更新肌肉 | 是 | admin |
| DELETE | /muscles/:id | 删除肌肉 | 是 | admin |
| POST | /muscles/generate | AI生成肌肉详情 | 是 | admin |

### 7.6 健身计划模块 `/api/plans`
| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /generate | AI生成计划 | 是 |
| GET | / | 获取用户所有计划 | 是 |
| GET | /:id | 获取计划详情 | 是 |
| PUT | /:id | 更新计划 | 是 |
| DELETE | /:id | 删除计划 | 是 |
| POST | /:id/activate | 激活计划 | 是 |

### 7.7 计划动作 `/api/plans/:id/exercises`
| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | / | 获取计划动作 | 是 |
| POST | / | 添加动作 | 是 |
| PUT | /:exerciseId | 更新动作 | 是 |
| DELETE | /:exerciseId | 移除动作 | 是 |

### 7.8 执行记录 `/api/plans/:id/executions`
| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | / | 获取执行记录 | 是 |
| POST | / | 记录执行 | 是 |
| POST | /batch | 批量打卡 | 是 |
| GET | /analysis | 执行分析 | 是 |

---

## 8. 前端页面清单

### 8.1 页面列表
| 路径 | 页面名称 | 说明 | 权限 |
|------|---------|------|------|
| /dashboard | 数据看板 | 本周训练统计、最近训练、关键围度 | 登录用户 |
| /login | 登录页 | 用户登录 | 公开 |
| /register | 注册页 | 用户注册 | 公开 |
| /chat | AI对话页 | 核心功能，训练/围度记录 | 登录用户 |
| /history | 历史记录 | 训练和围度历史 | 登录用户 |
| /trends | 趋势分析 | 围度趋势图和训练统计 | 登录用户 |
| /profile | 个人中心 | 用户信息和设置 | 登录用户 |
| /exercises | 动作库 | 动作列表和筛选 | 登录用户 |
| /muscles | 肌肉库 | 肌肉层级树 | 登录用户 |
| /plans | 健身计划 | AI生成训练计划 | 登录用户 |
| /admin/exercises | 动作库维护 | 动作CRUD和AI增强 | admin |
| /admin/muscles | 肌肉库维护 | 肌肉CRUD和AI增强 | admin |

### 8.2 UI风格规范

#### 配色方案
| 类型 | 色值 | 用途 |
|------|------|------|
| 背景主色 | #0A0A0A | 深黑 |
| 背景次色 | #1A1A1A | 深灰卡片 |
| 背景三级 | #252525 | 稍浅灰 |
| 强调色主 | #FF4500 | 烈焰橙 |
| 强调色次 | #DC143C | 电红 |
| 文字主色 | #FFFFFF | 白色 |
| 文字次色 | #888888 | 灰色 |
| 边框色 | #333333 | 默认边框 |

#### 视觉风格
- 无圆角或极小圆角 (2-4px)
- 粗边框按钮 (2px solid)
- 几何线条装饰
- 卡片光晕效果
- 深色渐变背景

#### 动效
- 快速过渡 (150-200ms)
- 强调色hover闪烁效果

---

## 9. 非功能性需求

### 9.1 性能
- API响应时间 < 500ms（不含AI调用）
- 前端首屏加载 < 2s
- 支持100+并发用户

### 9.2 安全
- 密码bcrypt加密存储
- JWT token 7天过期
- 后端API必须权限校验
- SQL注入防护（Prisma ORM）

### 9.3 可用性
- 前端错误提示友好
- 网络错误自动重试（可选）
- 401自动跳转登录页

### 9.4 数据完整性
- 外键约束确保关联有效
- 软删除保留历史数据
- 事务保证数据一致性

---

## 附录

### A. 文档索引
| 文档 | 路径 |
|------|------|
| 系统设计 | `docs/superpowers/specs/2026-04-23-fit-lc-design.md` |
| 前端设计 | `docs/superpowers/specs/2026-04-23-fit-lc-frontend-design.md` |
| 健身计划设计 | `docs/superpowers/specs/2026-04-23-fit-lc-workout-plan-design.md` |
| 健身计划实施计划 | `docs/superpowers/plans/2026-04-23-fit-lc-workout-plan-implementation.md` |
| 动作库设计 | `docs/superpowers/specs/2026-04-24-exercise-library-design.md` |
| 动作库批量生成设计 | `docs/superpowers/specs/2026-04-25-exercise-library-generation-design.md` |
| 动作详情设计 | `docs/superpowers/specs/2026-04-25-exercise-detail-design.md` |
| 肌肉详情设计 | `docs/superpowers/specs/2026-04-25-muscle-detail-design.md` |
| RBAC设计 | `docs/superpowers/specs/2026-04-25-rbac-admin-design.md` |
| AI增强设计 | `docs/superpowers/specs/2026-04-25-exercise-ai-design.md` |
| PRD健身计划详情 | `docs/PRD-details/06-workout-plan.md` |

---

**文档版本历史**
| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2026-04-25 | 初始版本，整合所有模块需求 |
