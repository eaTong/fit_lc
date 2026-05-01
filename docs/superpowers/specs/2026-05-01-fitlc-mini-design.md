# FitLC 微信小程序设计方案

**版本：** v1.0
**日期：** 2026-05-01
**状态：** 规划中

---

## 1. 项目概述

### 1.1 背景
FitLC 已有 Web 版（React + Vite + TailwindCSS），功能完整。用户希望扩展到微信小程序平台，实现移动端健身记录。

### 1.2 目标
开发 FitLC 微信小程序完整版，复刻 Web 版核心功能，支持离线使用。

### 1.3 技术选型

| 层级 | 技术 |
|------|------|
| 框架 | 微信小程序原生 (ES6+SCSS) |
| 状态管理 | Store 单例模式 |
| 网络层 | wx.request 封装（类 axios 拦截器） |
| 离线 | Storage + 请求队列 |
| 图表 | ECharts (小程序版) |
| 后端 | 复用现有 FitLC API (HTTPS) |

---

## 2. 架构设计

### 2.1 整体架构

```
┌──────────────────────────────────────────────────┐
│                    小程序客户端                    │
├──────────┬──────────┬──────────┬────────────────┤
│  主包    │  分包A   │  分包B   │    分包C       │
│ ≤2MB    │ ≤2MB    │ ≤2MB    │    ≤2MB        │
│          │          │          │               │
│ 登录页   │ 计划列表 │ 历史记录 │ 动作详情      │
│ Chat    │ 计划详情 │ 趋势分析 │ 肌肉库        │
│ Exercises│ 计划执行 │ 围度记录 │ 肌肉详情      │
│ Profile │ 计划生成 │ 日历     │ 徽章墙        │
│          │          │          │ 相册          │
├──────────┴──────────┴──────────┴────────────────┤
│                   公共层                          │
│  Store (单例) │ API (wx.request封装) │ Storage   │
│  组件库 (Button/Card/Modal) │ 图表(ECharts)   │
├──────────────────────────────────────────────────┤
│                   微信能力层                      │
│  login / storage / image / share                 │
└──────────────────────────────────────────────────┘
        ↕ HTTPS (已备案域名)
┌──────────────────────────────────────────────────┐
│               现有后端 FitLC API                 │
│   /api/auth/wechat │ /api/chat/message ...       │
└──────────────────────────────────────────────────┘
```

### 2.2 分包策略

| 分包 | 页面 | 预估大小 |
|------|------|----------|
| **主包** | 登录页、首页(Chat)、动作库(Exercises)、我的(Profile) | ≤ 2MB |
| **A (训练)** | Plans列表、PlanDetail、PlanExecute、PlanGenerate | ≤ 2MB |
| **B (记录)** | History、Trends、Measurements、Calendar | ≤ 2MB |
| **C (内容)** | Exercises详情、Muscles、MuscleDetail、Badges、Gallery | ≤ 2MB |

**底部 Tab 结构：**
- 首页（Chat） - AI 对话，训练/围度记录
- 动作（Exercises） - 动作库浏览和筛选
- 我的（Profile） - 用户信息、统计、快捷入口

**说明：** Dashboard 功能合并到 Profile 页面，不再单独建页。动作库列表作为 Tab，详情页放入分包 C。

**主包限制：** 小程序主包 ≤ 4MB，每个分包 ≤ 2MB。

### 2.3 模块依赖关系

```
主包 (底部 Tab 导航)
├── Tab 1: 首页 (Chat)
│   └── AI 对话，训练/围度记录
├── Tab 2: 动作 (Exercises)
│   └── 动作库列表 + 肌肉筛选
├── Tab 3: 我的 (Profile)
│   └── 用户信息、统计、快捷入口
│       ├── 训练记录 → History
│       ├── 围度记录 → Measurements
│       ├── 趋势分析 → Trends
│       ├── 日历 → Calendar
│       ├── 训练计划 → Plans
│       ├── 徽章墙 → Badges
│       └── 相册 → Gallery
│
├── 分包A (训练计划 - 从 Tab 或 Profile 进入)
│   ├── Plans list → PlanDetail
│   └── PlanDetail → PlanExecute
│
├── 分包B (记录历史 - 从 Profile 快捷入口进入)
│   ├── History
│   ├── Trends (图表)
│   ├── Measurements
│   └── Calendar
│
└── 分包C (内容详情 - 从 Exercises/Muscles 进入)
    ├── ExerciseDetail
    ├── Muscles → MuscleDetail
    ├── Badges
    └── Gallery
```

---

## 3. 页面清单

### 3.1 主包页面（底部 Tab）

| 页面 | 路径 | 功能 |
|------|------|------|
| 登录页 | pages/login/index | 微信静默登录，token 管理 |
| Tab1: 首页(Chat) | pages/chat/index | AI 对话，训练/围度记录 |
| Tab2: 动作(Exercises) | pages/exercises/index | 动作库列表，肌肉筛选 |
| Tab3: 我的(Profile) | pages/profile/index | 用户信息，统计，快捷入口 |

**Tab 导航结构：**
```
┌─────────────┬─────────────┬─────────────┐
│   首页      │    动作      │    我的      │
│   (Chat)   │ (Exercises) │  (Profile)  │
└─────────────┴─────────────┴─────────────┘
```

### 3.2 分包A - 训练计划

| 页面 | 路径 | 功能 |
|------|------|------|
| 计划列表 | pages/plans/index | 计划卡片，状态筛选 |
| 计划详情 | pages/plan-detail/index | 动作列表，按星期分组 |
| 计划执行 | pages/plan-execute/index | 每日打卡，填写完成数据 |
| 计划生成 | pages/plan-generate/index | AI 生成计划表单 |

### 3.3 分包B - 记录历史

| 页面 | 路径 | 功能 |
|------|------|------|
| 历史记录 | pages/history/index | 训练/围度历史列表 |
| 趋势分析 | pages/trends/index | 折线图，肌肉容量图 |
| 围度记录 | pages/measurements/index | 围度卡片，历史查看 |
| 日历 | pages/calendar/index | 月历视图，日期详情 |

### 3.4 分包C - 内容详情

| 页面 | 路径 | 功能 |
|------|------|------|
| 动作详情 | pages/exercise-detail/index | 动作信息，步骤，肌肉 |
| 肌肉库 | pages/muscles/index | 肌肉层级树 |
| 肌肉详情 | pages/muscle-detail/index | 肌肉详情，解剖说明 |
| 徽章墙 | pages/badges/index | 成就徽章展示 |
| 相册 | pages/gallery/index | 照片墙，按月分组 |

**说明：** 分包C 从 Tab2(动作) 或其他入口进入后按需加载。

---

## 4. 功能模块详细设计

### 4.1 登录模块

**流程：**
```
1. 小程序启动 → wx.login() 获取 code
2. code 发到后端 /api/auth/wechat → 换回 token
3. token 存 Storage，后续请求带 token
4. token 过期 → 重新 wx.login() 刷新
```

**静默登录策略：**
- 已注册用户：自动静默登录，体验与 App 一致
- 新用户（首次微信授权）：自动创建账号，返回 token，后续补充昵称

**页面权限：**
- 登录页（pages/login）：无需登录，游客可访问
- 其他所有页面：需携带有效 token，无 token 跳转登录页

### 4.2 Chat 模块

**功能：**
- 自然语言输入（文本）
- 语音输入（录音 → 后端转文字）
- 图片输入（拍照/相册 → 发给 AI 分析）
- 消息列表展示（用户/AI 分边）
- savedData 撤销功能

**离线支持：**
- 只缓存最近 50 条消息到 Storage
- 离线时展示缓存消息
- 联网后加载最新消息
- 离线期间用户发送的消息：存入离线队列，联网后按序上传
- 消息冲突处理：以服务器时间戳为准，离线消息标记 `pending`

### 4.3 记录模块

**功能：**
- 训练记录：动作 + 组数 + 次数 + 重量
- 围度记录：身体部位 + 数值

**离线支持：**
- 离线时操作写入本地队列
- Storage 结构：`offlineQueue: [{type, data, timestamp}]`
- 联网后按时间顺序上传
- 冲突处理：服务器时间戳优先

### 4.4 趋势分析模块

**图表类型：**
| 图表 | 用途 | 库 |
|------|------|-----|
| 折线图 | 围度趋势、体重趋势 | ECharts (小程序版) line |
| 柱状图 | 每周训练次数 | ECharts bar |
| 饼图 | 肌肉群训练容量占比 | ECharts pie |
| 环形图 | 计划完成进度 | ECharts gauge |

**推荐使用 ECharts 小程序版**（社区活跃，功能全）而非 wx-charts。

### 4.5 动作库 / 肌肉库

**数据策略：**
- 小程序端只做展示，数据从 API 实时拉取
- 不预置本地数据，减少包体积
- 离线时展示最后缓存的数据（如果有过请求）

---

## 5. 组件库设计

### 5.1 基础组件

| 组件 | 说明 |
|------|------|
| Button | variants: primary/secondary/outline/danger, sizes: sm/lg |
| Card | 容器卡片，bg-tertiary + 圆角 + 边框 |
| Input | 表单输入，带 label |
| Modal | 弹窗遮罩 |
| TabSwitcher | 水平 Tab 切换 |
| ConfirmDialog | 确认对话框 |
| DateRangePicker | 日期范围选择 |
| Toast | 轻提示 |

### 5.2 业务组件

| 组件 | 页面 | 说明 |
|------|------|------|
| ChatMessage | Chat | 消息气泡，支持撤销按钮 |
| ChatInput | Chat | 输入框 + 语音/图片按钮 |
| WorkoutCard | History | 训练记录卡片 |
| MeasurementCard | Measurements | 围度卡片 |
| PlanCard | Plans | 计划卡片，展示进度 |
| ExerciseCard | Exercises | 动作卡片 |
| BadgeCard | Badges | 徽章卡片 |
| PhotoGrid | Gallery | 照片网格 |
| PhotoViewer | Gallery | 照片预览模态框 |
| CalendarGrid | Calendar | 月历网格 |
| CalendarDetail | Calendar | 日期详情面板 |

---

## 6. 状态管理设计

### 6.1 Store 单例模式

```javascript
// store/index.js
class Store {
  constructor() {
    this.state = {
      token: null,
      user: null,
      chatMessages: [],
      plans: [],
      // ...
    };
    this.listeners = [];
  }

  getState() { return this.state; }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }
}

export const store = new Store();
```

### 6.2 页面使用方式

```javascript
// page.js
const app = getApp();
Page({
  data: { user: null },
  onLoad() {
    this.unsubscribe = app.store.subscribe(state => {
      this.setData({ user: state.user });
    });
  },
  onUnload() {
    this.unsubscribe();
  }
});
```

---

## 7. API 层设计

### 7.1 请求封装

```javascript
// api/client.js
const request = (options) => {
  const token = wx.getStorageSync('token');
  return wx.request({
    url: `${BASE_URL}${options.url}`,
    method: options.method || 'GET',
    data: options.data,
    header: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.header,
    },
    success: (res) => {
      if (res.statusCode === 401) {
        // token 过期，重新登录
        wx.redirectTo({ url: '/pages/login/index' });
      }
      return res.data;
    },
    fail: (err) => {
      wx.showToast({ title: '网络错误', icon: 'none' });
      return Promise.reject(err);
    }
  });
};
```

### 7.2 API 模块划分

| 模块 | 文件 | 说明 |
|------|------|------|
| 认证 | api/auth.js | login, register, wechat |
| 用户 | api/user.js | profile, metrics, coach-config |
| 聊天 | api/chat.js | message, messages |
| 记录 | api/records.js | workouts, measurements, stats |
| 计划 | api/plans.js | plans, generate, execute |
| 动作库 | api/exercises.js | list, detail |
| 肌肉库 | api/muscles.js | list, hierarchy |
| 成就 | api/achievement.js | badges, personal-records |
| 相册 | api/album.js | photos |

---

## 8. 离线策略设计

### 8.1 存储限制

微信小程序存储限制：
- 单个 key ≤ 1MB
- 总容量 ≤ 10MB

### 8.2 缓存策略

| 数据类型 | 缓存方式 | 过期策略 |
|----------|----------|----------|
| token | Storage sync | 7天或过期时刷新 |
| userInfo | Storage sync | 7天 |
| chatMessages | Storage sync | 只存最近50条 |
| lastSyncTime | Storage sync | 每次同步更新 |

### 8.3 离线队列

```javascript
// 写入离线队列
const queueOffline = (type, data) => {
  const queue = wx.getStorageSync('offlineQueue') || [];
  queue.push({ type, data, timestamp: Date.now() });
  wx.setStorageSync('offlineQueue', queue);
};

// 联网后同步
const syncOfflineQueue = async () => {
  const queue = wx.getStorageSync('offlineQueue') || [];
  for (const item of queue) {
    await uploadRecord(item);
  }
  wx.removeStorageSync('offlineQueue');
};
```

### 8.4 冲突处理

- 训练/围度记录以服务器时间戳为准
- 本地记录标记 `pending` 状态
- 用户可查看"待同步"状态

---

## 9. 微信能力使用

| 能力 | API | 用途 |
|------|-----|------|
| 登录 | wx.login() | 获取 code，换 token |
| 存储 | wx.setStorageSync / getStorageSync | 本地数据 |
| 图片选择 | wx.chooseImage | 围度照片上传 |
| 图片预览 | wx.previewImage | 相册大图查看 |
| 录音 |RecorderManager | 语音输入 |
| 分享 | onShareAppMessage | 分享训练记录 |

---

## 10. 后端适配要求

### 10.1 必需条件

1. **HTTPS**：所有 API 必须 HTTPS
2. **已备案域名**：需在微信公众平台配置
3. **CORS**：后端需支持小程序的跨域请求（或用小程序专用 BFF）

### 10.2 新增 API

| 端点 | 方法 | 说明 |
|------|------|------|
| /api/auth/wechat | POST | 微信 code 换 token（新用户自动创建账号） |

**实现逻辑：**
```
POST /api/auth/wechat
Body: { code: "微信登录code" }

响应：
- 已注册用户：{ token, user }
- 新用户：{ token, user } (自动创建，user 信息从微信 API 获取昵称/头像)
```

### 10.3 Token 格式

```json
{
  "token": "jwt_token_string",
  "user": { "id": 1, "email": "xxx" }
}
```

---

## 11. 目录结构

```
fitlc-mini/
├── app.js                 # 应用入口
├── app.json               # 全局配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置 (工具生成)
├── sitemap.json           # 索引配置
├── api/
│   ├── client.js          # 请求封装
│   ├── auth.js            # 认证
│   ├── user.js            # 用户
│   ├── chat.js            # 对话
│   ├── records.js         # 记录
│   ├── plans.js           # 计划
│   ├── exercises.js       # 动作库
│   ├── muscles.js         # 肌肉库
│   ├── achievement.js      # 成就
│   └── album.js           # 相册
├── store/
│   └── index.js           # 状态管理
├── utils/
│   ├── storage.js         # 存储工具
│   ├── offline.js         # 离线队列
│   └── format.js          # 格式化工具
├── components/           # 公共组件
│   ├── button/
│   ├── card/
│   ├── modal/
│   ├── toast/
│   └── ...
├── pages/                 # 页面（按分包组织）
│   ├── login/              # 主包：登录页
│   ├── chat/               # 主包：首页 Tab1
│   ├── exercises/          # 主包：动作库 Tab2
│   ├── profile/            # 主包：我的 Tab3
│   ├── plans/              # 分包A：计划列表
│   ├── plan-detail/        # 分包A：计划详情
│   ├── plan-execute/       # 分包A：计划执行
│   ├── plan-generate/      # 分包A：计划生成
│   ├── history/            # 分包B：历史记录
│   ├── trends/             # 分包B：趋势分析
│   ├── measurements/       # 分包B：围度记录
│   ├── calendar/           # 分包B：日历
│   ├── exercises-detail/   # 分包C：动作详情
│   ├── muscles/            # 分包C：肌肉库（入口：Tab2 动作库）
│   ├── muscle-detail/      # 分包C：肌肉详情
│   ├── badges/             # 分包C：徽章墙
│   └── gallery/            # 分包C：相册
```

---

## 12. 开发计划

### Phase 1: 基础架构
- 项目初始化
- Store 设计
- API 层封装
- 组件库基础

### Phase 2: 主包功能
- 登录模块
- Chat 核心（Tab1）
- Exercises 动作库（Tab2）
- Profile（Tab3）

### Phase 3: 分包功能
- 分包A 训练计划
- 分包B 记录历史
- 分包C 内容库

### Phase 4: 离线 & 优化
- 离线队列
- 同步机制
- 性能优化

---

## 13. 页面实现详情

### 13.1 主包页面

#### 13.1.1 登录页 (pages/login)

```
┌─────────────────────────────────┐
│          空 (无 TabBar)         │
├─────────────────────────────────┤
│                                 │
│         ┌─────────────┐         │
│         │  FITLC      │         │
│         │  Logo       │         │
│         └─────────────┘         │
│                                 │
│    ┌───────────────────────┐    │
│    │  微信授权登录          │    │
│    │  (button open-type)   │    │
│    └───────────────────────┘    │
│                                 │
│      登录即表示同意用户协议       │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：无 TabBar，无 Header
- 交互：button open-type="getPhoneNumber" → wx.login() → /api/auth/wechat
- 成功 → wx.switchTab({ url: '/pages/chat/index' })
- 失败 → showToast('登录失败')
- Storage: token, userInfo
```

#### 13.1.2 首页 Tab1 - Chat (pages/chat)

```
┌─────────────────────────────────┐
│ FITLC Logo         user@email   │ ← Header
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🤖 AI: 欢迎使用 FitLC...  │  │ ← 消息列表 (可滚动)
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 👤 用户: 今天练了胸部     │  │
│  │    ✓ 已保存               │  │ ← savedData 撤销按钮
│  └───────────────────────────┘  │
│                                 │
│  ...                            │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 输入框...          🎤 📷   │ │ ← ChatInput
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│  [首页]    [动作]     [我的]    │ ← TabBar
└─────────────────────────────────┘

实现方式：
- 布局：TabBar 布局，Header 固定
- 状态：store.chatMessages, store.isLoading
- 生命周期：onShow → 检查网络 → syncOfflineQueue()
- 交互：
  - 发送消息 → sendMessage() → 加入消息列表 → 滚动到底部
  - 语音按钮 → RecorderManager → 上传 → 获取文字
  - 图片按钮 → chooseImage → 上传 → 发送给 AI
- 离线支持：
  - 离线时消息存入 offlineQueue
  - 联网后自动同步
- 动画：消息气泡 slide-in，新消息滚动到底部
```

#### 13.1.3 Tab2 - 动作库 (pages/exercises)

```
┌─────────────────────────────────┐
│ FITLC Logo         user@email   │ ← Header
├─────────────────────────────────┤
│ ┌─────────┬───────────────────┐ │
│ │ 肌肉筛选│  🔍 搜索          │ │ ← 搜索栏
│ │         ├───────────────────┤ │
│ │ 胸部     │  类别▼ 器材▼ 难度▼│ │ ← 过滤器
│ │ ├ 上胸   ├───────────────────┤ │
│ │ ├ 中胸   │ ┌─────┐ ┌─────┐  │ │ ← 动作卡片网格
│ │ └ 下胸   │ │动作1│ │动作2│  │ │
│ │背部      │ └─────┘ └─────┘  │ │
│ │ ├ 背阔   │ ┌─────┐ ┌─────┐  │ │
│ │ └ ...    │ │动作3│ │动作4│  │ │
│ └─────────┴───────────────────┘ │
├─────────────────────────────────┤
│  [首页]    [动作]     [我的]    │ ← TabBar
└─────────────────────────────────┘

实现方式：
- 布局：左侧肌肉筛选（可收起）+ 右侧动作卡片网格
- 状态：store.exercises, store.muscleHierarchy, filters
- 生命周期：onLoad → fetchExercises(), fetchHierarchy()
- 交互：
  - 点击肌肉 → setFilter({ muscleId }) → 刷新列表
  - 点击动作卡片 → navigateTo('/pages/exercises-detail/index?id=xxx')
  - 点击"肌肉库"按钮 → navigateTo('/pages/muscles/index')
- 筛选：本地筛选，不请求 API（已有数据）
```

#### 13.1.4 Tab3 - 我的 (pages/profile)

```
┌─────────────────────────────────┐
│ FITLC Logo         user@email   │ ← Header
├─────────────────────────────────┤
│                                 │
│       ┌────────┐               │
│       │ 头像   │  昵称         │ ← 用户信息行
│       │        │  邮箱         │
│       └────────┘               │
│                                 │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐  │ ← 统计卡片行
│  │12  │ │3.2T│ │5天 │ │8   │  │
│  │训练 │ │容量│ │连续│ │徽章│  │
│  └────┘ └────┘ └────┘ └────┘  │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🏋️ 体重: 75kg   5天前   │ │ ← 身体指标
│  │ 📏 体脂: 18%            │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌───────┐ ┌───────┐ ┌───────┐│ ← 快捷入口网格
│  │训练记录│ │围度记录│ │训练计划││
│  └───────┘ └───────┘ └───────┘│
│  ┌───────┐ ┌───────┐ ┌───────┐│
│  │趋势分析│ │日历   │ │徽章墙 ││
│  └───────┘ └───────┘ └───────┘│
│  ┌───────┐ ┌───────┐           │
│  │相册   │ │动作库 │           │
│  └───────┘ └───────┘           │
│                                 │
├─────────────────────────────────┤
│  [首页]    [动作]     [我的]    │ ← TabBar
└─────────────────────────────────┘

实现方式：
- 布局：用户信息 + 统计行 + 快捷入口网格
- 状态：store.user, store.stats, store.latestMeasurement
- 生命周期：onShow → fetchUserInfo(), fetchStats(), fetchLatestMeasurement()
- 快捷入口跳转：
  - 训练记录 → /pages/history/index
  - 围度记录 → /pages/measurements/index
  - 训练计划 → /pages/plans/index
  - 趋势分析 → /pages/trends/index
  - 日历 → /pages/calendar/index
  - 徽章墙 → /pages/badges/index
  - 相册 → /pages/gallery/index
  - 动作库 → /pages/exercises/index
```

---

### 13.2 分包A - 训练计划

#### 13.2.1 计划列表 (pages/plans)

```
┌─────────────────────────────────┐
│ ← 返回            [+] 创建       │
├─────────────────────────────────┤
│                                 │
│  [全部] [草稿] [激活] [完成] [暂停]│ ← Tab 筛选
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📋 增肌计划              │   │
│  │ 每周4次 · 12周           │   │ ← PlanCard
│  │ 进度: 60% (18/30天)      │   │
│  │ [查看] [执行]            │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📋 减脂计划              │   │
│  │ 状态: 草稿               │   │
│  │ [编辑] [删除]           │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：返回按钮 + 新建按钮 + Tab 筛选 + 计划卡片列表
- 状态：store.plans, currentTab
- 生命周期：onLoad → fetchPlans()
- 交互：
  - Tab 切换 → 筛选 plans.filter(p => p.status === tab)
  - 点击 [查看] → navigateTo('/pages/plan-detail/index?id=xxx')
  - 点击 [执行] → navigateTo('/pages/plan-execute/index?id=xxx')
  - 点击 [+] → navigateTo('/pages/plan-generate/index')
  - 长按/删除 → ConfirmDialog → deletePlan()
```

#### 13.2.2 计划详情 (pages/plan-detail)

```
┌─────────────────────────────────┐
│ ← 返回      [编辑] [删除]        │
├─────────────────────────────────┤
│                                 │
│  增肌计划                        │
│  每周4次 · 12周 · 初学者        │
│  状态: 🔵 激活                   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 周一: 胸部 + 肱二头肌    │   │
│  │  ├ 卧推 4×10 @ 60kg     │   │ ← PlanExerciseCard
│  │  ├ 上胸 4×12            │   │
│  │  └ 哑铃弯举 3×12        │   │
│  ├─────────────────────────┤   │
│  │ 周三: 背部 + 肱三头肌    │   │
│  │  └ ...                  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │     [开始今日训练]       │   │ ← 状态=激活时显示
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：计划信息卡 + 按星期分组的动作列表 + 操作按钮
- 状态：store.currentPlan
- 生命周期：onLoad → fetchPlan(id)
- 交互：
  - 动作按 day_of_week 分组展示
  - 点击 [开始今日训练] → navigateTo('/pages/plan-execute/index?id=xxx&day=1')
  - 点击 [编辑] → navigateTo('/pages/plan-generate/index?edit=xxx')
```

#### 13.2.3 计划执行 (pages/plan-execute)

```
┌─────────────────────────────────┐
│ ← 返回     周一训练              │
├─────────────────────────────────┤
│                                 │
│  今日动作: 3 个                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ☑ 卧推                  │   │
│  │ 计划: 4×10 @ 60kg       │   │ ← 可勾选卡片
│  │ 完成: [___] kg × [___]  │   │ ← 输入实际数据
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ☐ 上胸哑铃飞鸟          │   │
│  │ 计划: 3×12             │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │      提交打卡            │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：动作列表（可勾选）+ 完成数据输入 + 提交按钮
- 状态：本地 useState 管理每个动作的完成状态
- 生命周期：onLoad → fetchPlan(id) → 获取今日应该执行的 exercises
- 交互：
  - 点击勾选框 → toggle completed
  - 输入完成重量/次数
  - 点击 [提交打卡] → 遍历所有动作 → recordExecution() → showToast → navigateBack
- 离线：执行记录写入 offlineQueue
```

#### 13.2.4 计划生成 (pages/plan-generate)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  AI 生成训练计划                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 目标:                   │   │
│  │ ○ 增肌  ○ 减脂  ○ 保持  │   │ ← RadioGroup
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 训练频率: [每周 3-5 次] │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 经验水平: ▼ 初学者      │   │ ← Select
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 可用器材:               │   │
│  │ □ 哑铃 □ 杠铃 □ 拉力架  │   │ ← CheckboxGroup
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │     生成计划              │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：表单（目标/频率/经验/器材/周期）+ 生成按钮
- 状态：本地 useState 管理表单数据
- 交互：
  - 选择目标/经验 → radio/select 组件
  - 选择器材 → checkbox 组件
  - 点击 [生成计划] → showLoading → generatePlan() → hideLoading → navigateTo plan
```

---

### 13.3 分包B - 记录历史

#### 13.3.1 历史记录 (pages/history)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  [全部] [2026年5月] [筛选]       │ ← Tab + DateRangePicker
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🏋️ 胸部 + 肱二头肌       │   │
│  │ 2026/05/01 14:30        │   │ ← WorkoutCard
│  │ [上胸 4×12] [中胸 4×10]  │   │
│  │              [🗑️ 删除]  │   │
│  └─────────────────────────┘   │
│                                 │
│  ...                            │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：Tab 切换 + 日期筛选 + 记录卡片列表
- 状态：store.workouts, currentTab
- 生命周期：onLoad → fetchWorkouts(start, end)
- 交互：
  - Tab 切换 → 筛选日期范围
  - 点击 [删除] → ConfirmDialog → deleteWorkout()
```

#### 13.3.2 趋势分析 (pages/trends)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💡 AI 洞察摘要          │   │ ← AIInsightSummary
│  │ 您的胸部训练有所进步... │   │
│  └─────────────────────────┘   │
│                                 │
│  [围度] [训练] [肌肉群]         │ ← Tab 切换图表
│                                 │
│  ┌─────────────────────────┐   │
│  │      📈 围度趋势图       │   │ ← ECharts LineChart
│  │   105├──────────        │   │
│  │   100├─────●────        │   │
│  │    95├─●────────        │   │
│  │      └───────→          │   │
│  │       4月 5月 6月       │   │
│  └─────────────────────────┘   │
│                                 │
│  日期: [2026-03-01] ～ [2026-05-01] │ ← DateRangePicker
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：AI 摘要 + Tab 切换图表类型 + ECharts 图表 + 日期选择器
- 状态：本地 useState (selectedTab, dateRange)
- 生命周期：onLoad → fetchStats() + fetchMuscleVolume()
- 交互：
  - Tab 切换 → 切换图表组件
  - 日期范围变化 → 重新请求数据
- 图表：ECharts 小程序版 (line/bar/pie)
```

#### 13.3.3 围度记录 (pages/measurements)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  身体围度记录                    │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 上身围度               │   │
│  │  ┌─────┐ ┌─────┐       │   │
│  │  │胸围 │ │腰围 │       │   │ ← MeasurementCard
│  │  │102cm│ │78cm │       │   │
│  │  └─────┘ └─────┘       │   │
│  │  ┌─────┐               │   │
│  │  │臀围 │               │   │
│  │  │95cm │               │   │
│  │  └─────┘               │   │
│  └─────────────────────────┘   │
│                                 │
│  ...                            │
│                                 │
│  ┌─────────────────────────┐   │
│  │    添加新记录            │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：围度卡片分组（上身/臂部/腿部）+ 添加按钮
- 状态：store.measurements, latestMeasurement
- 生命周期：onLoad → fetchMeasurements() + fetchLatest()
- 交互：
  - 点击围度卡片 → Modal 显示历史趋势
  - 点击 [添加新记录] → showToast('请在首页聊天记录围度') 或跳转 Chat
```

#### 13.3.4 日历 (pages/calendar)

```
┌─────────────────────────────────┐
│ ← 返回      FITLC Logo → /profile│
├─────────────────────────────────┤
│                                 │
│      [<] 2026年5月 [>]          │ ← 月份导航
│                                 │
│  日  一  二  三  四  五  六     │
│ ┌──┬──┬──┬──┬──┬──┬──┐        │
│ │  │   │   │   │ 1 │ 2 │ 3 │   │ ← CalendarGrid
│ ├──┼──┼──┼──┼──┼──┼──┼──┤        │
│ │ 4│ 5 │ 6 │ 7 │ 8 │ 9 │10 │   │ ← 有记录日期高亮
│ ...                             │
│ └──┴──┴──┴──┴──┴──┴──┘        │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📋 5月1日               │   │ ← CalendarDetail
│  │ 🏋️ 胸部 + 肱二头肌      │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：月份导航 + 月历网格 + 日期详情面板
- 状态：本地 useState (currentMonth, selectedDate)
- 生命周期：onLoad → fetchMonthData(year, month)
- 交互：
  - 点击 [<] [>] → 切换月份
  - 点击日期 → 显示该日期的训练/围度记录
  - 有记录的日期显示小红点
```

---

### 13.4 分包C - 内容详情

#### 13.4.1 动作详情 (pages/exercises-detail)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │      视频区域            │   │ ← Video 或 Image
│  │      [播放按钮]          │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 卧推 (Barbell Bench     │   │
│  │ Press)                  │   │
│  │ 类别: 胸部 | 器材: 杠铃  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💪 目标肌肉             │   │
│  │ 主肌: 胸大肌            │   │
│  │ 协同: 肱三头肌          │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📝 动作步骤             │   │
│  │ 1. 躺在平板凳上...      │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ⚠️ 安全提示             │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：视频/图片区 + 信息卡 + 肌肉/步骤/安全提示区块
- 状态：store.currentExercise
- 生命周期：onLoad → fetchExercise(id)
- 交互：滚动查看各区块内容
```

#### 13.4.2 肌肉库 (pages/muscles)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  肌肉库                         │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ▼ 胸部                   │   │ ← 可折叠节点
│  │   ├ 上胸                 │   │
│  │   ├ 中胸                 │   │ ← MuscleCard
│  │   └ 下胸                 │   │
│  ├─────────────────────────┤   │
│  │ ▶ 背部                   │   │
│  ├─────────────────────────┤   │
│  │ ▶ 肩部                   │   │
│  ├─────────────────────────┤   │
│  │ ▶ 臂部                   │   │
│  ├─────────────────────────┤   │
│  │ ▶ 腿部                   │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：肌肉层级树（可折叠）
- 状态：store.muscleHierarchy
- 生命周期：onLoad → fetchHierarchy()
- 交互：
  - 点击节点 [▼] → 展开/收起子肌肉
  - 点击肌肉名称 → navigateTo('/pages/muscle-detail/index?id=xxx')
```

#### 13.4.3 肌肉详情 (pages/muscle-detail)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  胸大肌 (Pectoralis Major)      │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📍 位置                 │   │
│  │ 位于胸廓前表面，分为    │   │
│  │ 上、中、下三部分        │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💪 功能                 │   │
│  │ 屈曲、内收、内旋手臂    │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔗 关联动作             │   │
│  │ • 卧推                  │   │
│  │ • 俯卧撑                │   │
│  │ • 哑铃飞鸟              │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：肌肉名称 + 位置/功能/关联动作信息区块
- 状态：store.currentMuscle
- 生命周期：onLoad → fetchMuscle(id)
- 交互：滚动查看 + 点击关联动作跳转 ExerciseDetail
```

#### 13.4.4 徽章墙 (pages/badges)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  成就徽章                        │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🏆 已获得 (8)           │   │
│  │ ┌────┐ ┌────┐ ┌────┐   │   │
│  │ │🏅  │ │🏅  │ │🏅  │   │   │ ← BadgeCard (彩色)
│  │ │初学者│ │5次  │ │10次 │   │ │
│  │ └────┘ └────┘ └────┘   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔒 未解锁 (12)           │   │
│  │ ┌────┐ ┌────┐ ┌────┐   │   │
│  │ │ ？  │ │ ？  │ │ ？  │   │   │ ← BadgeCard (灰色)
│  │ └────┘ └────┘ └────┘   │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：已获得/未解锁两个分区，每个 BadgeCard 网格
- 状态：store.badges
- 生命周期：onLoad → fetchBadges()
- 交互：点击徽章 → Modal 显示详情
```

#### 13.4.5 相册 (pages/gallery)

```
┌─────────────────────────────────┐
│ ← 返回            空              │
├─────────────────────────────────┤
│                                 │
│  照片墙         [月份 ▾]         │ ← 月份选择
│                                 │
│  2026年5月                       │
│  ┌────┐ ┌────┐ ┌────┐          │
│  │ 📷 │ │ 📷 │ │ 📷 │          │ ← PhotoGrid
│  └────┘ └────┘ └────┘          │
│  ┌────┐ ┌────┐                  │
│  │ 📷 │ │ 📷 │                  │
│  └────┘ └────┘                  │
│                                 │
└─────────────────────────────────┘

实现方式：
- 布局：月份选择 + PhotoGrid（按月分组）
- 状态：store.photosByMonth
- 生命周期：onLoad → fetchPhotos()
- 交互：
  - 点击月份 → 筛选显示该月照片
  - 点击图片 → PhotoViewer 模态框（大图预览 + 删除）
```

---

### 13.5 数据获取模式总结

| 模式 | 页面示例 | 说明 |
|------|----------|------|
| onLoad + store | Chat, Exercises, Profile | 页面加载时从 store 获取数据 |
| onLoad + fetch | PlanDetail, PlanExecute | 页面加载时请求 API |
| onShow + store | Profile (Tab3) | 每次 Tab 切换时刷新数据 |
| 本地 useState | PlanGenerate, PlanExecute | 表单数据本地管理 |
| 本地 useState + fetch | Calendar, Trends | 依赖用户交互（选择日期/Tab）触发请求 |

---

### 13.6 组件使用汇总

| 页面 | 使用的公共组件 |
|------|---------------|
| Login | Button |
| Chat | ChatMessage, ChatInput, Toast |
| Exercises | ExerciseCard, SearchBar, FilterBar |
| Profile | StatCard, QuickAccessGrid |
| Plans | PlanCard, TabSwitcher, ConfirmDialog |
| PlanDetail | PlanExerciseCard |
| PlanExecute | CheckboxCard, NumberInput |
| PlanGenerate | RadioGroup, Select, CheckboxGroup |
| History | WorkoutCard, DateRangePicker |
| Trends | AIInsightSummary, Chart (ECharts), DateRangePicker |
| Measurements | MeasurementCard, Modal |
| Calendar | CalendarGrid, CalendarDetail |
| ExerciseDetail | VideoPlayer, InfoCard, StepsCard |
| Muscles | MuscleTree (可折叠) |
| Badges | BadgeCard, Modal |
| Gallery | PhotoGrid, PhotoViewer |

---

*文档创建时间: 2026/05/01*
*最后更新: 2026/05/01 (补充页面实现详情)*