# FitLC 微信小程序设计文档

**版本：** 1.0
**日期：** 2026-04-29
**状态：** 设计中

---

## 1. 产品概述

### 1.1 产品定位
FitLC 微信小程序是 Web 端的移动端版本，通过自然语言对话自动记录健身数据和身体围度，支持历史数据查询与趋势分析。

### 1.2 与 Web 端关系
- **独立项目**，代码不共享
- **API 共用**，复用 Web 端后端接口
- **风格一致**，采用 Web 端相同配色和交互逻辑

### 1.3 技术栈
| 层级 | 技术选型 |
|------|---------|
| 框架 | 微信小程序原生框架 |
| 状态管理 | MobX（微信推荐） |
| 网络请求 | wx.request 封装 |
| 样式 | wxss + Web 端配色 |
| 登录 | 静默登录 + 账号绑定 |

---

## 2. 登录流程

### 2.1 流程设计
```
用户首次访问
    ↓
wx.login 获取 code
    ↓
调用后端 API 换取 openid
    ↓
判断是否已绑定账号
    ├── 已绑定 → 自动登录 → 进入首页
    └── 未绑定 → 引导绑定账号
                    ├── 绑定已有账号（输入账号密码）
                    └── 注册新账号
```

### 2.2 Token 管理
- 存储 JWT + refresh_token
- 过期前自动静默刷新
- 刷新失败引导重新登录

---

## 3. 页面结构

### 3.1 底部 Tab 导航（5个Tab，与 Web 一致）

| Tab | 图标 | 主页面 | 功能 |
|-----|------|--------|------|
| 首页 | 🏠 | chat | AI 对话，记录训练/围度 |
| 数据 | 📊 | history | 训练历史、围度记录（子Tab切换） |
| 计划 | 📋 | plans | 健身计划列表 |
| 知识 | 📚 | muscles | 肌肉库、动作库（子Tab切换） |
| 我的 | 👤 | profile | 个人信息、设置、徽章 |

### 3.2 Tab 详细页面映射

**首页 Tab：**
- `/pages/chat/chat` - AI 对话页

**数据 Tab（子 Tab 切换）：**
- `/pages/history/history` - 训练/围度历史
- `/pages/trends/trends` - 趋势分析
- `/pages/calendar/calendar` - 日历

**计划 Tab：**
- `/pages/plans/plans` - 计划列表
- `/pages/plan-detail/plan-detail` - 计划详情
- `/pages/plan-execute/plan-execute` - 计划执行

**知识 Tab（子 Tab 切换）：**
- `/pages/muscles/muscles` - 肌肉库
- `/pages/exercises/exercises` - 动作库

**我的 Tab：**
- `/pages/profile/profile` - 个人中心
- `/pages/settings/settings` - 设置
- `/pages/security/security` - 账号安全
- `/pages/badges/badges` - 徽章

### 3.3 页面层级
- 页面栈限制最多 10 层
- Tab 间切换使用 `wx.switchTab` 保持页面状态
- 非 Tab 页面使用 `wx.navigateTo`

---

## 4. 分包策略

### 4.1 分包原则
主包限制 2MB，按 Tab 分包减少主包体积。

### 4.2 分包结构
```
主包：
  - tabBar 页面（chat, history, plans, muscles, profile）
  - 登录相关（login, bind-account）

分包1（数据）：
  - history, trends, calendar

分包2（计划）：
  - plans, plan-detail, plan-execute

分包3（知识）：
  - muscles, exercises

分包4（我的）：
  - settings, security, badges
```

---

## 5. 配色方案（与 Web 一致）

| 用途 | 色值 |
|------|------|
| 背景主色 | #0A0A0A |
| 背景次色 | #1A1A1A |
| 背景三级 | #252525 |
| 强调色主 | #FF4500 |
| 强调色次 | #DC143C |
| 文字主色 | #FFFFFF |
| 文字次色 | #888888 |
| 边框色 | #333333 |

---

## 6. 核心页面设计

### 6.1 聊天页面（首页）
```
┌─────────────────────────┐
│ FitLC            ◉ 更多 │
├─────────────────────────┤
│                         │
│  用户：今天跑了5公里     │
│                         │
│  AI：已记录！🏃        │
│  训练内容：跑步 5公里   │
│  [撤销]                 │
│                         │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 输入训练内容...      │ │
│ └─────────────────────┘ │
│ [📷] [🎤] [➕] [发送] │
└─────────────────────────┘
```

### 6.2 历史记录页面（数据 Tab）
```
┌─────────────────────────┐
│ ← 数据                  │
├─────────────────────────┤
│ [训练] [围度] [日历] [趋势] │ ← 子 Tab
├─────────────────────────┤
│ 📅 2026-04-29          │
│ 🏋️ 深蹲 4组×45kg      │
│ 📏 围度：胸94/腰78     │
│                         │
│ 📅 2026-04-28          │
│ 🏃 跑步 5公里          │
└─────────────────────────┘
```

### 6.3 日历页面
```
┌─────────────────────────┐
│ ← 日历            今天   │
├─────────────────────────┤
│       < 2026年4月  >    │
├─────────────────────────┤
│ 一  二  三  四  五  六  日│
│         1  2  3  4  5  │
│  6  7● 8  9 10 11 12  │
│ ...                     │
├─────────────────────────┤
│ ─────── 4月7日 ─────── │
│ 🏋️ 深蹲 4组×45kg      │
│ 🏃 跑步 5公里          │
└─────────────────────────┘
```

### 6.4 个人中心页面（我的 Tab）
```
┌─────────────────────────┐
│           我的          │
├─────────────────────────┤
│ 👤 用户昵称            │
│    累计训练 128 次     │
│    连续打卡 12 天      │
├─────────────────────────┤
│ 📅 连续打卡            │ ← 跳转日历
│ ⚙️ 设置                │ ← 跳转设置
│ 🏆 徽章                │ ← 跳转徽章
│ 🔐 账号安全            │ ← 跳转安全
└─────────────────────────┘
```

---

## 7. 组件设计

### 7.1 通用组件（与 Web 端一致风格）
- Card - 卡片容器
- Button - 按钮
- Input - 输入框
- TabBar - 底部导航（5个Tab）
- Header - 顶部导航栏

### 7.2 业务组件
- ChatMessage - 聊天消息
- ChatInput - 对话输入框（支持拍照/语音/更多）
- WorkoutCard - 训练记录卡片
- MeasurementCard - 围度记录卡片
- CalendarGrid - 日历网格
- StatCard - 统计卡片
- AchievementBadge - 成就徽章

---

## 8. API 接口

### 8.1 需要适配的接口
与 Web 端共用以下 API 接口：

| 模块 | 接口 | 说明 |
|------|------|------|
| 认证 | POST /api/auth/login | 账号密码登录 |
| 认证 | POST /api/auth/register | 注册 |
| 认证 | POST /api/auth/refresh | 刷新 token |
| 用户 | GET /api/user/profile | 获取用户信息 |
| 用户 | PUT /api/user/profile | 更新用户信息 |
| 聊天 | GET /api/chat/messages | 获取消息历史 |
| 聊天 | POST /api/chat/message | 发送消息 |
| 训练 | GET /api/records/workouts | 获取训练记录 |
| 训练 | DELETE /api/records/workouts/:id | 删除训练记录 |
| 围度 | GET /api/records/measurements | 获取围度记录 |
| 围度 | DELETE /api/records/measurements/:id | 删除围度记录 |
| 计划 | GET /api/plans | 获取计划列表 |
| 计划 | GET /api/plans/:id | 获取计划详情 |
| 计划 | POST /api/plans/:id/execute | 执行计划 |
| 肌肉 | GET /api/muscles | 获取肌肉库 |
| 动作 | GET /api/exercises | 获取动作库 |
| 成就 | GET /api/achievements | 获取成就 |

### 8.2 小程序特有接口
| 接口 | 说明 |
|------|------|
| POST /api/auth/wechat/code | 微信 code 换 openid |
| POST /api/auth/wechat/bind | 绑定微信与账号 |

---

## 9. 功能清单

### 9.1 核心功能（普通用户）
- [ ] 微信登录 + 账号绑定
- [ ] AI 对话记录训练
- [ ] AI 对话记录围度
- [ ] 查看训练历史
- [ ] 查看围度历史
- [ ] 日历查看打卡记录
- [ ] 趋势分析图表
- [ ] 健身计划查看
- [ ] 计划执行记录
- [ ] 肌肉库浏览
- [ ] 动作库浏览
- [ ] 个人设置
- [ ] 账号安全（改密码）
- [ ] 成就徽章展示
- [ ] 撤销功能

### 9.2 交互功能
- [ ] 消息 Markdown 渲染
- [ ] 图片识别记录
- [ ] 语音输入
- [ ] 下拉刷新
- [ ] 上拉加载更多

---

## 10. 项目结构

```
fitlc-mini/
├── app.js                 # 应用入口
├── app.json               # 应用配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
├── sitemap.json           # 站点地图
│
├── pages/
│   ├── chat/              # 首页 Tab - AI 对话
│   ├── history/            # 数据 Tab - 历史记录
│   ├── trends/             # 数据 Tab - 趋势分析
│   ├── calendar/           # 数据 Tab - 日历
│   ├── plans/              # 计划 Tab - 计划列表
│   ├── plan-detail/        # 计划 Tab - 计划详情
│   ├── plan-execute/       # 计划 Tab - 计划执行
│   ├── muscles/            # 知识 Tab - 肌肉库
│   ├── exercises/          # 知识 Tab - 动作库
│   ├── profile/            # 我的 Tab - 个人中心
│   ├── settings/           # 我的 Tab - 设置
│   ├── security/           # 我的 Tab - 账号安全
│   ├── badges/             # 我的 Tab - 徽章
│   ├── login/              # 登录页
│   └── bind-account/       # 账号绑定页
│
├── components/             # 通用组件
│   ├── Card/
│   ├── Button/
│   ├── Input/
│   ├── TabBar/
│   ├── Header/
│   ├── ChatMessage/
│   ├── ChatInput/
│   ├── WorkoutCard/
│   ├── CalendarGrid/
│   └── ...
│
├── stores/                # 状态管理
│   ├── authStore.js        # 认证状态
│   ├── chatStore.js        # 聊天状态
│   ├── recordsStore.js     # 记录状态
│   └── achievementStore.js # 成就状态
│
├── api/                   # API 调用
│   ├── request.js          # 请求封装
│   ├── auth.js             # 认证接口
│   ├── user.js             # 用户接口
│   ├── chat.js             # 聊天接口
│   ├── records.js          # 记录接口
│   ├── plans.js            # 计划接口
│   └── muscles.js          # 肌肉接口
│
├── utils/                 # 工具函数
│   ├── format.js           # 格式化
│   ├── validate.js         # 校验
│   └── markdown.js         # Markdown 解析
│
└── styles/                # 样式文件
    └── variables.wxss      # CSS 变量
```
