# FitLC 小程序产品需求文档

> **注意：** 本文档为微信小程序版 PRD，记录已实现的功能。

**版本：** 1.1
**日期：** 2026-05-07
**状态：** 已上线

---

## 目录

1. [产品概述](#1-产品概述)
2. [技术架构](#2-技术架构)
3. [页面结构](#3-页面结构)
4. [核心功能模块](#4-核心功能模块)
5. [分包配置](#5-分包配置)
6. [数据模型](#6-数据模型)
7. [API接口](#7-api接口)

---

## 1. 产品概述

### 1.1 产品定位
FitLC 小程序是 AI 健身记录 SaaS 系统的移动端入口，通过自然语言对话自动记录健身数据和身体围度，与 Web 版共享后端服务和数据。

### 1.2 核心价值
- **即开即用**：无需下载，微信内即可使用
- **语音输入**：支持语音输入训练内容，方便运动中记录
- **实时同步**：与 Web 版数据完全同步

### 1.3 目标用户
| 用户类型 | 描述 |
|---------|------|
| 个人健身爱好者 | 运动中快速记录训练、追踪围度变化 |
| 健身教练 | 管理客户训练数据 |

### 1.4 与 Web 版差异

| 差异点 | Web 版 | 小程序 |
|--------|--------|--------|
| 入口 | 浏览器 | 微信 |
| 语音输入 | 需浏览器支持 | 原生支持 |
| 推送通知 | 需 PWA | 微信模板消息 |
| 分享 | Web URL | 小程序卡片 |

---

## 2. 技术架构

### 2.1 技术栈
| 层级 | 技术选型 |
|------|---------|
| 框架 | 微信小程序原生框架 |
| 样式 | WXSS (CSS 超集) |
| 状态管理 | 本地 Storage + globalData |
| 网络 | wx.request |
| 媒体 | 录音、相机、相册 |

### 2.2 项目结构
```
fitlc-mini/
├── pages/               # 主包页面
│   ├── chat/           # AI 对话页
│   ├── login/          # 登录页
│   ├── exercises/      # 动作库（整合肌肉库）
│   ├── profile/        # 个人中心
│   └── settings/       # 设置页
├── packageA/           # 分包A：健身计划
│   └── pages/
│       ├── plans/          # 计划列表
│       ├── plan-generate/  # 生成计划
│       ├── plan-detail/    # 计划详情
│       └── plan-execute/   # 执行打卡
├── packageB/           # 分包B：围度/日历
│   └── pages/
│       ├── measurements/   # 围度记录
│       └── calendar/       # 日历
├── packageC/           # 分包C：徽章/动作/相册
│   └── pages/
│       ├── badges/          # 徽章墙
│       ├── exercise-detail/ # 动作详情
│       └── gallery/        # 相册
├── api/                # API 客户端
├── store/              # 全局状态管理
├── assets/             # 静态资源
└── components/         # 公共组件
```

### 2.3 分包策略
小程序采用**独立分包**机制：
- **主包**：TabBar 页面（chat/exercises/profile）+ 登录页
- **分包A**：健身计划模块（plans/plan-generate/plan-detail/plan-execute）
- **分包B**：围度/日历模块（measurements/calendar）
- **分包C**：徽章/动作详情/相册（badges/exercise-detail/gallery）

---

## 3. 页面结构

### 3.1 TabBar 配置
| Tab | 页面路径 | 图标 |
|-----|---------|------|
| 对话 | /pages/chat/index | home.png |
| 动作库 | /pages/exercises/index | exercises.png |
| 我的 | /pages/profile/index | profile.png |

### 3.2 页面清单
| 路径 | 页面名称 | 包 | 说明 |
|------|---------|-----|------|
| /pages/chat/index | AI对话 | 主包 | 核心功能，训练/围度记录 |
| /pages/login/index | 登录 | 主包 | 用户登录 |
| /pages/exercises/index | 动作库 | 主包 | 动作列表+肌肉侧边栏 |
| /pages/profile/index | 个人中心 | 主包 | 头像、统计、身体数据、快速入口 |
| /pages/settings/index | 设置 | 主包 | 基础信息、身体数据 |
| /packageA/pages/plans/index | 计划列表 | 分包A | 用户所有计划 |
| /packageA/pages/plan-generate/index | 生成计划 | 分包A | AI 生成新计划 |
| /packageA/pages/plan-detail/index | 计划详情 | 分包A | 查看和编辑计划 |
| /packageA/pages/plan-execute/index | 执行打卡 | 分包A | 打卡记录 |
| /packageB/pages/measurements/index | 围度记录 | 分包B | 围度历史 |
| /packageB/pages/calendar/index | 日历 | 分包B | 月历打卡视图 |
| /packageC/pages/badges/index | 徽章墙 | 分包C | 用户徽章 |
| /packageC/pages/exercise-detail/index | 动作详情 | 分包C | 动作完整信息 |
| /packageC/pages/gallery/index | 相册 | 分包C | 照片浏览 |

---

## 4. 核心功能模块

### 4.1 AI 对话记录

#### 4.1.1 功能描述
用户通过自然语言与 AI 对话，系统自动识别意图并执行相应操作。

#### 4.1.2 触发场景
- **记录训练**：`"深蹲100kg 5组每组8个"`
- **记录围度**：`"今天胸围94，腰围78"`
- **查询训练**：`"这周跑了多少次？"`
- **查询围度**：`"我的围度有什么变化？"`

#### 4.1.3 输入模式
| 模式 | 说明 |
|------|------|
| 文字模式 | 文本输入框，发送按钮 |
| 语音模式 | 按住说话，松开发送 |

#### 4.1.4 图片支持
- 用户可选择相册图片或拍照
- 图片预览，可移除
- 图片 URL 保存到 ChatMessage

#### 4.1.5 消息展示
- 用户消息（右侧）+ AI 回复（左侧）
- 已保存标识 + 撤销按钮
- 时间戳显示
- **追问提示**（意图澄清机制）：`needsClarification=true` 时显示追问提示样式
- **澄清结束**：`clarificationEnded=true` 时显示澄清结束提示

#### 4.1.6 意图澄清机制
当用户输入信息不完整时，AI 自动追问。

| API 返回标识 | 说明 |
|-------------|------|
| `needsClarification: true` | 表示需要追问 |
| `clarificationSessionId` | 澄清会话 ID |
| `clarificationEnded: true` | 澄清结束但信息仍不完整 |

**示例流程**：
```
用户: "卧推80公斤"
AI: "卧推 80kg，很棒！请问一共几组，每组几次？" (needsClarification: true)

用户: "3组7次"
AI: "✅ 训练记录已保存！卧推 80kg x 3组 x 7次"
```

### 4.2 动作库

#### 4.2.1 布局结构
- **左侧**：肌肉列表（48px 宽度），垂直滚动
- **右侧**：肌肉详情 + 动作列表

#### 4.2.2 肌肉侧边栏
- "全部" 选项（显示所有动作）
- 6 大肌肉群（胸部/背部/腿部/肩部/手臂/核心）
- 子肌肉（点击展开）

#### 4.2.3 动作列表
- 动作卡片：名称、标签、简述
- 支持搜索和筛选（器械类型、难度）
- 点击跳转动作详情

#### 4.2.4 筛选器
| 筛选维度 | 选项 |
|---------|------|
| 器械 | 杠铃、哑铃、绳索、器械、自重 |
| 难度 | 初级、中级、高级 |

### 4.3 个人中心

#### 4.3.1 用户信息
- 头像 + 昵称
- 性别 + 邮箱
- 设置按钮

#### 4.3.2 统计行
| 指标 | 说明 |
|------|------|
| 训练 | 累计训练次数 |
| 容量 | 累计训练量 |
| 连续 | 连续打卡天数 |
| 徽章 | 获得徽章数 |

#### 4.3.3 身体数据
- 身高、体重、体脂、BMI
- 点击跳转设置页编辑

#### 4.3.4 快捷入口
| 入口 | 图标 | 跳转 |
|------|------|------|
| 训练记录 | 📋 | /packageB/pages/calendar/index |
| 围度记录 | 📏 | /packageB/pages/measurements/index |
| 训练计划 | 📅 | /packageA/pages/plans/index |
| 徽章墙 | 🏆 | /packageC/pages/badges/index |
| 相册 | 📷 | /packageC/pages/gallery/index |

### 4.4 健身计划

#### 4.4.1 计划列表
- 用户所有计划（草稿/进行中/已完成）
- 创建新计划入口

#### 4.4.2 AI 生成计划
- 用户描述需求 → AI 生成结构化计划
- 可视化编辑

#### 4.4.3 计划执行
- 进入打卡页 → 完成动作 → 记录
- AI 分析肌肉恢复状态

### 4.5 围度记录

#### 4.5.1 围度历史
- 折线图展示围度变化
- 身体部位：胸围、腰围、臀围、臂围、腿围

#### 4.5.2 左右对称部位
- 左/右臂围并排显示
- 左/右大腿围并排显示
- 左/右小腿围并排显示

### 4.6 日历

#### 4.6.1 月历视图
- 6×7 日期网格
- 有记录日期显示橙色小圆点
- 当天高亮边框

#### 4.6.2 记录详情
- 点击日期展开训练/围度记录

### 4.7 相册

#### 4.7.1 照片同步
- 聊天中发送的图片自动同步
- OSS 公开 URL

#### 4.7.2 浏览
- 按月份分组
- 网格布局
- 全屏预览

### 4.8 徽章

#### 4.8.1 徽章展示
- 获得的所有徽章
- 徽章详情（名称、描述、获得时间）

---

## 5. 分包配置

### 5.1 分包结构
```json
{
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/plans/index",
        "pages/plan-generate/index",
        "pages/plan-detail/index",
        "pages/plan-execute/index"
      ]
    },
    {
      "root": "packageB",
      "pages": [
        "pages/measurements/index",
        "pages/calendar/index"
      ]
    },
    {
      "root": "packageC",
      "pages": [
        "pages/badges/index",
        "pages/exercise-detail/index",
        "pages/gallery/index"
      ]
    }
  ]
}
```

### 5.2 分包加载策略
- **按需加载**：用户点击时才加载对应分包
- **预加载**：TabBar 切换时可预加载下一个分包

---

## 6. 数据模型

### 6.1 本地存储
| Key | 类型 | 说明 |
|-----|------|------|
| token | string | JWT 认证令牌 |
| userInfo | object | 用户基本信息 |
| chatMessages | array | 本地聊天记录缓存 |

### 6.2 全局状态 (globalData)
| Key | 类型 | 说明 |
|-----|------|------|
| user | object | 当前用户信息 |
| isLoggedIn | boolean | 登录状态 |

---

## 7. API 接口

### 7.1 认证模块
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/auth/login | 用户登录 |
| POST | /api/auth/register | 用户注册 |
| GET | /api/auth/me | 获取当前用户 |

### 7.2 对话模块
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/chat/messages | 获取聊天记录 |
| POST | /api/chat/message | 发送消息 |
| POST | /api/chat/revoke/:id | 撤销消息 |

### 7.3 记录模块
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/records/workouts | 训练历史 |
| GET | /api/records/measurements | 围度历史 |
| DELETE | /api/records/workout/:id | 软删除训练 |
| DELETE | /api/records/measurement/:id | 软删除围度 |
| POST | /api/records/workout/:id/restore | 恢复训练 |
| POST | /api/records/measurement/:id/restore | 恢复围度 |

### 7.4 围度记录（Inline Edit）

#### 7.4.1 网格布局
- 3列网格展示所有身体部位
- 左右对称部位（臂围/大腿围/小腿围）并排显示
- 最新记录值直接显示在网格中

#### 7.4.2 Inline Edit
- 点击网格单元 → 弹出输入框
- 输入框显示部位名称 placeholder
- 确认后调用 API 更新：`POST /api/records/measurement/:id/items`
- 支持同时修改多个部位后批量保存

### 7.5 动作库
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/exercises | 动作列表 |
| GET | /api/exercises/:id | 动作详情 |

### 7.6 健身计划
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/plans/generate | AI 生成计划 |
| GET | /api/plans | 计划列表 |
| GET | /api/plans/:id | 计划详情 |
| POST | /api/plans/:id/executions | 执行打卡 |

### 7.7 成就系统
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/achievements/badges | 用户徽章 |
| GET | /api/achievements/stats | 累计统计 |

### 7.8 相册
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/album/photos | 获取照片 |

---

## 附录

### A. 文档版本历史
| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2026-05-02 | 初始版本，微信小程序 PRD |
| 1.1 | 2026-05-07 | 新增围度记录Inline Edit功能；修复API端点（delete改用DELETE方法）；更新围度模块API |

### B. 相关文档
| 文档 | 路径 |
|------|------|
| Web PRD | docs/PRD.md |
| 规划版 PRD | docs/PRD-planning.md |
| 后端 API 文档 | /api-docs (开发环境) |