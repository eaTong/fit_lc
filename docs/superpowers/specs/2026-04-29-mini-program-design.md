# FitLC 微信小程序设计文档

**版本：** 1.0
**日期：** 2026-04-29
**状态：** 设计中

---

## 1. 概述

### 1.1 产品定位
FitLC 微信小程序是 AI 健身记录 SaaS 系统的移动端入口，为 normal 用户提供健身记录、围度追踪、计划执行等核心功能。

### 1.2 设计目标
- 功能均衡：保留 Web 端核心功能，小程序化适配
- 包体积可控：主包 + 分包结构
- 品牌一致：沿用 Web 端暗色主题 + 烈焰橙强调色

### 1.3 技术选型
| 项目 | 选型 |
|-----|------|
| 框架 | Taro 4.x + React |
| 状态 | Zustand（小程序适配版，与 Web 端一致） |
| UI | 暗色主题 (#0A0A0A) + 烈焰橙 (#FF4500) |
| 登录 | 微信静默登录（UnionID） |
| 数据 | 全从现有后端 API 获取 |

---

## 2. 页面结构

### 2.1 Tab 导航（5个）

| # | Tab | 路径 | 说明 |
|---|-----|------|------|
| 1 | 对话 | /pages/chat/index | AI 对话核心 |
| 2 | 记录 | /pages/records/index | 训练/围度历史 |
| 3 | 趋势 | /pages/trends/index | 数据趋势分析 |
| 4 | 动作库 | /pages/exercises/index | 动作库 + 肌肉库 |
| 5 | 我的 | /pages/profile/index | 个人中心、计划入口 |

### 2.2 分包结构

**主包（main）**

| 页面 | 路径 |
|------|------|
| 对话 | pages/chat/index |
| 记录 | pages/records/index |
| 趋势 | pages/trends/index |
| 动作库（Tab入口） | pages/exercises/index |
| 计划（Tab入口） | pages/plans/index |
| 我的 | pages/profile/index |
| 设置 | pages/settings/index |
| 徽章 | pages/badges/index |
| 日历 | pages/calendar/index |

**分包（knowledge）**

| 页面 | 路径 |
|------|------|
| 动作详情 | pages/exercises/detail |
| 肌肉详情 | pages/muscles/detail |
| 计划执行 | pages/plans/execute |

### 2.3 页面关系图

```
Tab: 对话 (chat)
└── 消息列表 → AI 对话

Tab: 记录 (records)
└── 分段切换：训练 / 围度
    └── 记录列表

Tab: 趋势 (trends)
└── 围度趋势折线图
└── 训练统计柱状图

Tab: 动作库 (exercises)
├── 动作库列表 → 动作详情
└── 肌肉库列表 → 肌肉详情

Tab: 我的 (profile)
├── 用户信息卡片
├── 连续打卡天数
├── 计划列表 → 计划执行
├── 快捷入口：日历、徽章、设置
└── 退出登录
```

---

## 3. 页面详细设计

### 3.1 对话页 (chat/index)

**功能描述**
用户通过自然语言与 AI 对话，系统自动识别意图并记录训练/围度数据。

**页面结构**
```
├── 消息列表（scroll-view）
│   ├── 用户消息（右侧，橙色背景）
│   └── AI 回复（左侧，深灰背景）
│       ├── Markdown 渲染内容
│       └── 保存成功后：撤销按钮
├── 加载状态
│   └── "正在思考..." 加载动画
└── 输入区域（底部fixed）
    ├── 多行输入框
    └── 发送按钮
```

**首次训练庆祝动画**
- 触发条件：totalWorkouts === 1
- 展示：🎉 emoji 跳动 + "恭喜完成首次训练！"
- 持续 3 秒后消失

### 3.2 记录页 (records/index)

**功能描述**
展示用户训练和围度历史记录。

**页面结构**
```
├── 顶部 Tab 分段控件
│   ├── 训练
│   └── 围度
├── 记录列表（按日期分组）
│   └── 日期分组
│       └── 记录卡片
│           ├── 训练：动作列表 + 组数×次数/重量
│           └── 围度：部位 + 数值
├── 空状态
│   └── 引导卡片：示例语句 + 跳转 Chat 按钮
└── FAB 按钮
    └── 跳转 Chat 快速记录
```

### 3.3 趋势页 (trends/index)

**功能描述**
展示围度变化趋势和训练统计。

**页面结构**
```
├── 顶部 Tab
│   ├── 围度趋势
│   └── 训练统计
├── 围度趋势 Tab
│   ├── 部位选择器（胸/腰/臀/臂/腿/小腿）
│   ├── 折线图（Recharts）
│   └── 时间范围选择器：30天/90天/6个月/1年
└── 训练统计 Tab
    ├── 柱状图（每周训练次数）
    └── 肌肉群训练量饼图
```

### 3.4 动作库页 (exercises/index)

**功能描述**
动作库和肌肉库合并在同一 Tab，通过顶部切换访问。

**页面结构**
```
├── 顶部 Tab
│   ├── 动作库
│   └── 肌肉库
├── 动作库 Tab
│   ├── 筛选栏
│   │   ├── 肌肉群：全部/胸/背/腿/肩/臂/核心
│   │   ├── 器械：全部/杠铃/哑铃/龙门架/器械/自重
│   │   └── 难度：全部/入门/中级/高级
│   └── 动作卡片列表
│       ├── 动作名称
│       ├── 肌肉群标签
│       └── 难度标签
└── 肌肉库 Tab
    └── 两层层级列表
        ├── 肌肉群（Level 1，可展开）
        └── 主肌肉（Level 2）
```

**动作详情页 (exercises/detail)**
```
├── 动作名称 + 难度/器械标签
├── 动作类型（复合/孤立）
├── 动作步骤
├── 安全注意事项
├── 常见错误
├── 细节调整
├── 变体转换指南
└── 关联肌肉展示
```

**肌肉详情页 (muscles/detail)**
```
├── 肌肉名称
├── 肌肉功能
├── 起点 / 止点
├── 训练技巧
└── 关联动作列表
```

### 3.5 我的页 (profile/index)

**功能描述**
个人中心，承载健身计划入口。

**页面结构**
```
├── 用户信息卡片
│   ├── 头像（微信头像）
│   ├── 昵称
│   └── 累计训练次数
├── 连续打卡天数卡片
│   └── 点击进入日历页
├── 计划区域
│   ├── 当前计划卡片（进行中）
│   │   ├── 计划名称
│   │   ├── 进度条
│   │   └── 开始执行按钮
│   └── 我的计划列表
│       └── 计划卡片（可点击进入执行页）
├── 快捷入口
│   ├── 日历
│   ├── 徽章
│   └── 设置
└── 退出登录按钮
```

**计划执行页 (plans/execute)**
```
├── 计划名称 + 当前进度
├── 今日训练日
├── 动作列表
│   └── 动作卡片
│       ├── 动作名称
│       ├── 组数×次数
│       └── 重量/时长
├── 打卡按钮
└── AI 反馈（执行后）
```

---

## 4. 导航设计

### 4.1 页面栈
采用统一页面栈，所有页面在同一个栈内，通过 `wx.navigateTo` 跳转。

### 4.2 跳转规则

| 从 | 到 | 方式 |
|----|----|------|
| Tab 页面 | Tab 页面 | switchTab |
| Tab 页面 | 子页面 | navigateTo |
| 子页面 | 子页面 | navigateTo |
| 子页面 | Tab 页面 | reLaunch |

### 4.3 分包加载
- 分包页面通过 navigateTo 首次访问时自动下载
- 动作详情、肌肉详情、计划执行均放入 knowledge 分包

---

## 5. 登录设计

### 5.1 静默登录流程

```
小程序启动
  → wx.login() 获取 code
  → 调用后端 /api/auth/wechat { code }
  → 后端返回 JWT token
  → 存储 token，进入对话页
```

### 5.2 后端接口（需新增）

```
POST /api/auth/wechat
Body: { code: string }
Response: { token: string, user: User }
```

### 5.3 登录状态
- Token 存储于 wx.getStorageSync('token')
- 请求拦截器自动附加 Authorization header
- 401 响应 → 清除 token → 重新登录

---

## 6. API 对接

### 6.1 现有可用接口

| 模块 | 接口 | 说明 |
|-----|------|------|
| 认证 | POST /api/auth/wechat | 微信登录（新增） |
| 对话 | GET /api/chat/messages | 获取聊天记录 |
| 对话 | POST /api/chat/message | 发送消息 |
| 记录 | GET /api/records/workouts | 训练历史 |
| 记录 | GET /api/records/measurements | 围度历史 |
| 趋势 | GET /api/achievements/stats | 累计统计 |
| 趋势 | GET /api/achievements/muscle-volume | 肌肉群训练量 |
| 动作 | GET /api/exercises | 动作列表 |
| 动作 | GET /api/exercises/:id | 动作详情 |
| 肌肉 | GET /api/admin/muscles | 肌肉列表 |
| 计划 | GET /api/plans | 计划列表 |
| 计划 | GET /api/plans/:id | 计划详情 |
| 计划 | POST /api/plans/:id/executions | 执行打卡 |
| 成就 | GET /api/achievements/badges | 用户徽章 |
| 成就 | GET /api/achievements/personal-records | 个人最佳 |

---

## 7. UI 规范

### 7.1 配色方案

| 用途 | 色值 |
|------|------|
| 背景主色 | #0A0A0A |
| 背景次色 | #1A1A1A |
| 背景三级 | #252525 |
| 强调色主 | #FF4500（烈焰橙） |
| 强调色次 | #DC143C（电红） |
| 文字主色 | #FFFFFF |
| 文字次色 | #888888 |
| 边框色 | #333333 |

### 7.2 视觉风格
- 无圆角或极小圆角 (2-4px)
- 粗边框按钮 (2px solid)
- 快速过渡动画 (150-200ms)
- 卡片光晕效果

### 7.3 动效
- Tab 切换：150ms ease-out
- 页面跳转：200ms slide
- 加载动画：脉冲效果
- 庆祝动画：🎉 emoji 跳动 3s

---

## 8. 分包策略

### 8.1 分包配置

```json
{
  "subPackages": [
    {
      "root": "subpkg/knowledge",
      "pages": [
        "pages/exercises/detail",
        "pages/muscles/detail",
        "pages/plans/execute"
      ]
    }
  ]
}
```

### 8.2 分包页面访问入口

| 页面 | 从何处进入 |
|------|-----------|
| 动作详情 | 动作库 Tab → 动作列表点击 |
| 肌肉详情 | 动作库 Tab → 肌肉库切换 → 肌肉点击 |
| 计划执行 | 我的 Tab → 计划列表点击 |

---

## 9. 状态管理

### 9.1 Store 设计（与 Web 端一致）

```typescript
useAuthStore     // token、用户信息、登录状态
useChatStore     // 消息列表、加载状态
useRecordsStore  // 训练历史、围度历史
usePlanStore     // 计划列表、当前计划
```

### 9.2 本地存储
- Token：wx.getStorageSync('token')
- 用户信息：wx.getStorageSync('user')
- 聊天消息：内存（每次会话重新拉取）

---

## 10. 待后端配合事项

1. **新增微信登录接口** `POST /api/auth/wechat`
   - 接收微信 code，换取 UnionID
   - 已注册用户返回 JWT
   - 未注册用户自动创建账户（role: normal）
   - User 表需增加 wechatOpenid / unionid 字段

2. **肌肉库接口权限**
   - 当前 `/api/admin/muscles` 需要 admin 权限
   - normal 用户访问肌肉库需要新增 `/api/muscles` 接口（只读）
