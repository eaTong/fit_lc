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
│ 登录    │ 训练    │ 记录    │    内容库      │
│ Chat    │ 计划    │ 历史    │    动作/肌肉   │
│ Profile │ 执行    │ 趋势    │    成就/相册   │
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
├── pages/                 # 页面
│   ├── login/
│   ├── chat/
│   ├── profile/
│   ├── plans/
│   ├── plan-detail/
│   ├── plan-execute/
│   ├── plan-generate/
│   ├── history/
│   ├── trends/
│   ├── measurements/
│   ├── calendar/
│   ├── exercises/         # Tab2: 动作库列表 (主包)
│   ├── exercises-detail/ # 动作详情 (分包C)
│   ├── muscles/          # 肌肉库 (分包C)
│   ├── muscle-detail/    # 肌肉详情 (分包C)
│   ├── badges/           # 徽章墙 (分包C)
│   ├── gallery/          # 相册 (分包C)
│   ├── plans/            # 计划列表 (分包A)
│   ├── plan-detail/      # 计划详情 (分包A)
│   ├── plan-execute/     # 计划执行 (分包A)
│   ├── plan-generate/    # 计划生成 (分包A)
│   ├── history/           # 历史记录 (分包B)
│   ├── trends/            # 趋势分析 (分包B)
│   ├── measurements/      # 围度记录 (分包B)
│   └── calendar/           # 日历 (分包B)
└── sitemap.json           # 索引
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
- Chat 核心
- Profile

### Phase 3: 分包功能
- 分包A 训练计划
- 分包B 记录历史
- 分包C 内容库

### Phase 4: 离线 & 优化
- 离线队列
- 同步机制
- 性能优化

---

*文档创建时间: 2026/05/01*