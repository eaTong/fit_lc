# FitLC 微信小程序 - Phase 1: 基础架构

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建微信小程序基础架构，包括项目初始化、Store状态管理、API层封装、公共组件库

**Architecture:** 基于微信小程序原生开发，使用 Store 单例模式管理全局状态，API 层统一封装 wx.request，离线数据通过 Storage + 队列管理

**Tech Stack:** 微信小程序原生 (ES6+SCSS)、ECharts 小程序版

---

## 文件结构

```
fitlc-mini/
├── app.js                      # 应用入口，全局 store 初始化
├── app.json                    # 全局配置，TabBar、页面注册
├── app.wxss                    # 全局样式
├── project.config.json          # 项目配置
├── sitemap.json                 # 索引配置
├── config/
│   └── index.js                # 环境配置（API_BASE_URL等）
├── store/
│   ├── index.js                # Store 单例，状态定义
│   └── actions.js              # Store actions（登录、聊天等）
├── api/
│   ├── client.js               # 请求封装（拦截器、错误处理）
│   ├── auth.js                 # 认证 API
│   ├── user.js                 # 用户 API
│   ├── chat.js                 # 聊天 API
│   ├── records.js              # 记录 API
│   ├── plans.js                # 计划 API
│   ├── exercises.js            # 动作库 API
│   ├── muscles.js              # 肌肉库 API
│   ├── achievement.js          # 成就 API
│   └── album.js                # 相册 API
├── utils/
│   ├── storage.js              # Storage 工具封装
│   ├── offline.js              # 离线队列管理
│   ├── format.js               # 格式化工具（日期、数字等）
│   └── promise.js              # Promise 包装 wx.request
├── components/
│   ├── button/                 # 按钮组件
│   ├── card/                   # 卡片组件
│   ├── modal/                  # 模态框组件
│   ├── toast/                  # 轻提示组件
│   ├── tab-switcher/           # Tab 切换组件
│   ├── confirm-dialog/         # 确认对话框
│   ├── date-range-picker/      # 日期范围选择
│   └── icons/                  # 图标组件
├── pages/                      # 主包页面
│   ├── chat/                   # Tab1: 首页 Chat
│   ├── exercises/              # Tab2: 动作库
│   └── profile/                # Tab3: 我的
└── sitemap.json
```

---

## 任务列表

### Task 1: 项目初始化

**Files:**
- Create: `fitlc-mini/app.js`
- Create: `fitlc-mini/app.json`
- Create: `fitlc-mini/app.wxss`
- Create: `fitlc-mini/project.config.json`
- Create: `fitlc-mini/sitemap.json`
- Create: `fitlc-mini/config/index.js`

- [ ] **Step 1: 创建项目目录和配置文件**

创建 `fitlc-mini/` 目录结构：
- app.js: 应用入口，getApp() + 全局 store 初始化
- app.json: 注册页面（login, chat, exercises, profile），配置 TabBar
- app.wxss: 全局样式（暗色主题变量）
- project.config.json: 开发者工具项目配置
- sitemap.json: 索引配置

```json
// app.json
{
  "pages": [
    "pages/login/index",
    "pages/chat/index",
    "pages/exercises/index",
    "pages/profile/index"
  ],
  "tabBar": {
    "color": "#888888",
    "selectedColor": "#FF4500",
    "backgroundColor": "#1A1A1A",
    "borderStyle": "black",
    "list": [
      { "pagePath": "pages/chat/index", "text": "首页", "iconPath": "assets/tabbar/home.png", "selectedIconPath": "assets/tabbar/home-active.png" },
      { "pagePath": "pages/exercises/index", "text": "动作", "iconPath": "assets/tabbar/exercises.png", "selectedIconPath": "assets/tabbar/exercises-active.png" },
      { "pagePath": "pages/profile/index", "text": "我的", "iconPath": "assets/tabbar/profile.png", "selectedIconPath": "assets/tabbar/profile-active.png" }
    ]
  },
  "window": {
    "backgroundTextStyle": "dark",
    "navigationBarBackgroundColor": "#0A0A0A",
    "navigationBarTitleText": "FitLC",
    "navigationBarTextStyle": "white"
  },
  "requiredBackgroundModes": ["audio"]
}
```

```javascript
// config/index.js
module.exports = {
  API_BASE_URL: 'https://fitlc.com/api',  // 需替换为实际域名
  APP_ID: 'wxxxxxxxxxxxx',  // 微信小程序 AppID
  STORAGE_KEY: {
    TOKEN: 'fitlc_token',
    USER: 'fitlc_user',
    CHAT_MESSAGES: 'fitlc_chat_messages',
    LAST_SYNC: 'fitlc_last_sync',
    OFFLINE_QUEUE: 'fitlc_offline_queue'
  },
  CHAT_CACHE_LIMIT: 50,
  SYNC_INTERVAL: 5000  // 离线同步检查间隔 ms
};
```

- [ ] **Step 2: 创建 app.js 入口文件**

```javascript
// app.js
const Store = require('./store');
const config = require('./config');

App({
  store: null,
  config,

  onLaunch() {
    // 初始化 Store
    this.store = new Store();

    // 检查网络状态
    this.checkNetwork();

    // 启动时尝试同步离线数据
    this.syncOfflineData();
  },

  onShow() {
    // 每次进入小程序检查网络并同步
    this.syncOfflineData();
  },

  checkNetwork() {
    wx.getNetworkType({
      success: (res) => {
        this.globalData.networkType = res.networkType;
        this.store.setState({ isOffline: res.networkType === 'none' });
      }
    });
  },

  syncOfflineData() {
    const offlineQueue = wx.getStorageSync(this.config.STORAGE_KEY.OFFLINE_QUEUE) || [];
    if (offlineQueue.length === 0) return;

    if (this.globalData.networkType === 'none') return;

    // 延迟执行，等待网络稳定
    setTimeout(() => {
      const offline = require('./utils/offline');
      offline.syncQueue();
    }, this.config.SYNC_INTERVAL);
  },

  globalData: {
    networkType: 'wifi',
    isOffline: false
  }
});
```

- [ ] **Step 3: 创建全局样式 app.wxss**

```css
/* app.wxss - 暗色主题 */
page {
  background-color: #0A0A0A;
  color: #FFFFFF;
  font-size: 28rpx;
  line-height: 1.5;
}

/* 颜色变量 */
--color-bg-primary: #0A0A0A;
--color-bg-secondary: #1A1A1A;
--color-bg-tertiary: #252525;
--color-accent: #FF4500;
--color-accent-red: #DC143C;
--color-text-primary: #FFFFFF;
--color-text-secondary: #888888;
--color-border: #333333;

/* 通用样式 */
.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex-1 { flex: 1; }
.gap-sm { gap: 16rpx; }
.gap-md { gap: 24rpx; }
.gap-lg { gap: 32rpx; }
.mt-sm { margin-top: 16rpx; }
.mt-md { margin-top: 24rpx; }
.mt-lg { margin-top: 32rpx; }
.mb-sm { margin-bottom: 16rpx; }
.mb-md { margin-bottom: 24rpx; }
.mb-lg { margin-bottom: 32rpx; }
.p-sm { padding: 16rpx; }
.p-md { padding: 24rpx; }
.p-lg { padding: 32rpx; }
.text-secondary { color: var(--color-text-secondary); }
.text-accent { color: var(--color-accent); }
.bg-secondary { background-color: var(--color-bg-secondary); }
.bg-tertiary { background-color: var(--color-bg-tertiary); }
```

- [ ] **Step 4: 提交代码**

```bash
cd fitlc-mini
git init
git add -A
git commit -m "feat: init mini program project structure"
```

---

### Task 2: Store 状态管理

**Files:**
- Create: `fitlc-mini/store/index.js`
- Create: `fitlc-mini/store/actions.js`

- [ ] **Step 1: 创建 Store 单例**

```javascript
// store/index.js
class Store {
  constructor() {
    this.state = {
      // 认证
      token: null,
      user: null,
      isAuthenticated: false,

      // 聊天
      chatMessages: [],
      isLoading: false,

      // 动作库
      exercises: [],
      muscleHierarchy: [],

      // 计划
      plans: [],
      currentPlan: null,

      // 记录
      workouts: [],
      measurements: [],
      latestMeasurement: null,

      // 成就
      badges: [],
      personalRecords: [],

      // UI 状态
      isOffline: false,

      // 缓存
      lastSyncTime: null
    };

    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // 返回取消订阅函数
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  }

  // 清空所有状态（登出时）
  clear() {
    this.state = {
      ...this.state,
      token: null,
      user: null,
      isAuthenticated: false,
      chatMessages: [],
      plans: [],
      currentPlan: null,
      workouts: [],
      measurements: []
    };
    this.notify();
  }
}

module.exports = Store;
```

- [ ] **Step 2: 创建 Store Actions**

```javascript
// store/actions.js
const config = require('../config');
const api = require('../api/client');

// 认证 action
const authActions = {
  login(code) {
    return api.post('/auth/wechat', { code }).then(res => {
      const app = getApp();
      wx.setStorageSync(config.STORAGE_KEY.TOKEN, res.token);
      wx.setStorageSync(config.STORAGE_KEY.USER, res.user);
      app.store.setState({
        token: res.token,
        user: res.user,
        isAuthenticated: true
      });
      return res;
    });
  },

  logout() {
    const app = getApp();
    wx.removeStorageSync(config.STORAGE_KEY.TOKEN);
    wx.removeStorageSync(config.STORAGE_KEY.USER);
    app.store.clear();
  },

  checkAuth() {
    const token = wx.getStorageSync(config.STORAGE_KEY.TOKEN);
    const user = wx.getStorageSync(config.STORAGE_KEY.USER);
    if (token && user) {
      const app = getApp();
      app.store.setState({ token, user, isAuthenticated: true });
      return true;
    }
    return false;
  }
};

// 聊天 action
const chatActions = {
  sendMessage(message, imageUrls = []) {
    const app = getApp();
    app.store.setState({ isLoading: true });

    return api.post('/chat/message', {
      message,
      imageUrls,
      historyMessages: app.store.getState().chatMessages.slice(-20)
    }).then(res => {
      const messages = [...app.store.getState().chatMessages, res.message];
      app.store.setState({ chatMessages: messages, isLoading: false });

      // 缓存消息
      const cacheLimit = config.CHAT_CACHE_LIMIT;
      if (messages.length > cacheLimit) {
        const cached = messages.slice(-cacheLimit);
        wx.setStorageSync(config.STORAGE_KEY.CHAT_MESSAGES, cached);
      }

      // 如果有 savedData，可能需要刷新相关数据
      if (res.savedData) {
        recordActions.syncAfterSave(res.savedData);
      }

      return res;
    }).catch(err => {
      app.store.setState({ isLoading: false });
      throw err;
    });
  },

  loadMessages(limit = 50) {
    const app = getApp();
    return api.get('/chat/messages', { limit }).then(messages => {
      app.store.setState({ chatMessages: messages });
      wx.setStorageSync(config.STORAGE_KEY.CHAT_MESSAGES, messages.slice(-config.CHAT_CACHE_LIMIT));
      return messages;
    });
  },

  clearMessages() {
    const app = getApp();
    app.store.setState({ chatMessages: [] });
    wx.removeStorageSync(config.STORAGE_KEY.CHAT_MESSAGES);
  },

  revokeMessage(messageId) {
    const app = getApp();
    const messages = app.store.getState().chatMessages.map(m => {
      if (m.id === messageId) {
        return { ...m, revoked: true };
      }
      return m;
    });
    app.store.setState({ chatMessages: messages });
  }
};

// 记录 action
const recordActions = {
  fetchWorkouts(start, end) {
    const app = getApp();
    return api.get('/records/workouts', { start, end }).then(res => {
      app.store.setState({ workouts: res.workouts });
      return res.workouts;
    });
  },

  fetchMeasurements(start, end) {
    const app = getApp();
    return api.get('/records/measurements', { start, end }).then(res => {
      app.store.setState({ measurements: res.measurements });
      return res.measurements;
    });
  },

  deleteWorkout(id) {
    return api.delete(`/records/workout/${id}`).then(() => {
      const app = getApp();
      const workouts = app.store.getState().workouts.filter(w => w.id !== id);
      app.store.setState({ workouts });
    });
  },

  deleteMeasurement(id) {
    return api.delete(`/records/measurement/${id}`).then(() => {
      const app = getApp();
      const measurements = app.store.getState().measurements.filter(m => m.id !== id);
      app.store.setState({ measurements });
    });
  },

  fetchLatestMeasurement() {
    const app = getApp();
    return api.get('/users/me/measurements/latest').then(res => {
      app.store.setState({ latestMeasurement: res.measurements });
      return res.measurements;
    });
  },

  syncAfterSave(savedData) {
    // 保存成功后刷新相关数据
    if (savedData.type === 'workout') {
      this.fetchWorkouts();
    } else if (savedData.type === 'measurement') {
      this.fetchMeasurements();
      this.fetchLatestMeasurement();
    }
  }
};

// 计划 action
const planActions = {
  fetchPlans() {
    const app = getApp();
    return api.get('/plans').then(res => {
      app.store.setState({ plans: res.plans });
      return res.plans;
    });
  },

  fetchPlan(id) {
    const app = getApp();
    return api.get(`/plans/${id}`).then(res => {
      app.store.setState({ currentPlan: res.plan });
      return res.plan;
    });
  },

  generatePlan(userProfile) {
    return api.post('/plans/generate', userProfile).then(res => {
      const app = getApp();
      app.store.setState({ currentPlan: { id: res.plan_id } });
      return res;
    });
  },

  activatePlan(id) {
    return api.post(`/plans/${id}/activate`).then(() => {
      const app = getApp();
      const plans = app.store.getState().plans.map(p => {
        if (p.id === id) return { ...p, status: 'active' };
        return p;
      });
      app.store.setState({ plans });
    });
  },

  recordExecution(planId, execution) {
    return api.post(`/plans/${planId}/execute`, execution);
  }
};

// 动作库 action
const exerciseActions = {
  fetchExercises(filters = {}) {
    const app = getApp();
    return api.get('/exercises', filters).then(res => {
      app.store.setState({ exercises: res.exercises });
      return res.exercises;
    });
  },

  fetchExercise(id) {
    return api.get(`/exercises/${id}`);
  },

  fetchHierarchy() {
    const app = getApp();
    return api.get('/muscles/hierarchy').then(res => {
      app.store.setState({ muscleHierarchy: res.hierarchy });
      return res.hierarchy;
    });
  }
};

// 成就 action
const achievementActions = {
  fetchBadges() {
    const app = getApp();
    return api.get('/achievements/badges').then(res => {
      app.store.setState({ badges: res.badges });
      return res.badges;
    });
  },

  fetchPersonalRecords() {
    const app = getApp();
    return api.get('/achievements/personal-records').then(res => {
      app.store.setState({ personalRecords: res.personalRecords });
      return res.personalRecords;
    });
  }
};

module.exports = {
  authActions,
  chatActions,
  recordActions,
  planActions,
  exerciseActions,
  achievementActions
};
```

- [ ] **Step 3: 提交代码**

```bash
git add store/index.js store/actions.js
git commit -m "feat: add Store singleton and actions"
```

---

### Task 3: API 层封装

**Files:**
- Create: `fitlc-mini/api/client.js`
- Create: `fitlc-mini/utils/promise.js`
- Create: `fitlc-mini/api/auth.js`
- Create: `fitlc-mini/api/user.js`
- Create: `fitlc-mini/api/chat.js`
- Create: `fitlc-mini/api/records.js`
- Create: `fitlc-mini/api/plans.js`
- Create: `fitlc-mini/api/exercises.js`
- Create: `fitlc-mini/api/muscles.js`
- Create: `fitlc-mini/api/achievement.js`
- Create: `fitlc-mini/api/album.js`

- [ ] **Step 1: 创建 Promise 包装工具**

```javascript
// utils/promise.js
/**
 * 将微信 API 包装为 Promise
 */
const promisify = (fn) => {
  return (args) => {
    return new Promise((resolve, reject) => {
      fn({
        ...args,
        success: resolve,
        fail: reject
      });
    });
  };
};

module.exports = { promisify };
```

- [ ] **Step 2: 创建 API 客户端**

```javascript
// api/client.js
const config = require('../config');
const { promisify } = require('../utils/promise');

// promisify wx API
const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.API_BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wx.getStorageSync(config.STORAGE_KEY.TOKEN) || ''}`,
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 401) {
          // token 过期，清除登录状态
          wx.removeStorageSync(config.STORAGE_KEY.TOKEN);
          wx.removeStorageSync(config.STORAGE_KEY.USER);
          wx.switchTab({ url: '/pages/chat/index' });
          wx.showToast({ title: '登录已过期', icon: 'none' });
          reject(new Error('Unauthorized'));
          return;
        }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          wx.showToast({ title: res.data.message || '请求失败', icon: 'none' });
          reject(res.data);
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络错误', icon: 'none' });
        reject(err);
      }
    });
  });
};

// GET 请求
const get = (url, data) => request({ url, method: 'GET', data });

// POST 请求
const post = (url, data) => request({ url, method: 'POST', data });

// PUT 请求
const put = (url, data) => request({ url, method: 'PUT', data });

// DELETE 请求
const del = (url, data) => request({ url, method: 'DELETE', data });

// 上传文件
const upload = (url, filePath, name = 'file') => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${config.API_BASE_URL}${url}`,
      filePath,
      name,
      header: {
        'Authorization': `Bearer ${wx.getStorageSync(config.STORAGE_KEY.TOKEN) || ''}`
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        resolve(data);
      },
      fail: reject
    });
  });
};

module.exports = { request, get, post, put, del, upload };
```

- [ ] **Step 3: 创建 API 模块**

```javascript
// api/auth.js
const { post } = require('./client');

module.exports = {
  wechatLogin(code) {
    return post('/auth/wechat', { code });
  },

  register(email, password) {
    return post('/auth/register', { email, password });
  },

  login(email, password) {
    return post('/auth/login', { email, password });
  },

  getCurrentUser() {
    return post('/auth/me', {});
  }
};
```

```javascript
// api/user.js
const { get, put, post, del } = require('./client');

module.exports = {
  getProfile() {
    return get('/users/me/profile');
  },

  updateProfile(data) {
    return put('/users/me/profile', data);
  },

  changePassword(oldPassword, newPassword) {
    return put('/users/me/password', { oldPassword, newPassword });
  },

  getMetrics(page = 1, limit = 10) {
    return get('/users/me/metrics', { page, limit });
  },

  addMetric(data) {
    return post('/users/me/metrics', data);
  },

  deleteAccount(password) {
    return del('/users/me/account', { password });
  },

  getLatestMeasurements() {
    return get('/users/me/measurements/latest');
  },

  getMeasurementHistory(bodyPart, page = 1, limit = 10) {
    return get('/users/me/measurements/history', { bodyPart, page, limit });
  },

  getCoachConfig() {
    return get('/users/coach-config');
  },

  updateCoachConfig(data) {
    return put('/users/coach-config', data);
  }
};
```

```javascript
// api/chat.js
const { get, post } = require('./client');

module.exports = {
  sendMessage(message, historyMessages = [], imageUrls = []) {
    return post('/chat/message', { message, historyMessages, imageUrls });
  },

  getMessages(limit = 20) {
    return get('/chat/messages', { limit });
  }
};
```

```javascript
// api/records.js
const { get, del } = require('./client');

module.exports = {
  getWorkouts(start, end) {
    return get('/records/workouts', { start, end });
  },

  getMeasurements(start, end) {
    return get('/records/measurements', { start, end });
  },

  deleteWorkout(id) {
    return del(`/records/workout/${id}`);
  },

  deleteMeasurement(id) {
    return del(`/records/measurement/${id}`);
  },

  getStats() {
    return get('/records/stats');
  }
};
```

```javascript
// api/plans.js
const { get, post, put, del } = require('./client');

module.exports = {
  getPlans() {
    return get('/plans');
  },

  getPlan(id) {
    return get(`/plans/${id}`);
  },

  generatePlan(userProfile, exercises) {
    return post('/plans/generate', { userProfile, exercises });
  },

  updatePlan(id, data) {
    return put(`/plans/${id}`, data);
  },

  deletePlan(id) {
    return del(`/plans/${id}`);
  },

  activatePlan(id) {
    return post(`/plans/${id}/activate`);
  },

  recordExecution(id, execution) {
    return post(`/plans/${id}/execute`, execution);
  },

  getAnalysis(id) {
    return get(`/plans/${id}/analysis`);
  }
};
```

```javascript
// api/exercises.js
const { get, post, put, del } = require('./client');

module.exports = {
  getExercises(filters = {}) {
    return get('/exercises', filters);
  },

  getExercise(id) {
    return get(`/exercises/${id}`);
  }
};
```

```javascript
// api/muscles.js
const { get } = require('./client');

module.exports = {
  getMuscles() {
    return get('/muscles');
  },

  getHierarchy() {
    return get('/muscles/hierarchy');
  },

  getMuscle(id) {
    return get(`/muscles/${id}`);
  }
};
```

```javascript
// api/achievement.js
const { get, post } = require('./client');

module.exports = {
  getPersonalRecords() {
    return get('/achievements/personal-records');
  },

  getTopRecords(limit = 10) {
    return get('/achievements/personal-records/top', { limit });
  },

  getBadges() {
    return get('/achievements/badges');
  },

  getMilestones() {
    return get('/achievements/milestones');
  },

  getStats() {
    return get('/achievements/stats');
  },

  checkAchievements(type, data) {
    return post('/achievements/check', { type, data });
  },

  getMuscleVolume(start, end) {
    return get('/achievements/muscle-volume', { start, end });
  }
};
```

```javascript
// api/album.js
const { get, del, upload } = require('./client');

module.exports = {
  getPhotos(year, month) {
    return get('/album/photos', { year, month });
  },

  deletePhoto(id) {
    return del(`/album/photos/${id}`);
  },

  uploadImage(filePath) {
    return upload('/upload/image', filePath, 'file');
  }
};
```

- [ ] **Step 4: 提交代码**

```bash
git add api/ utils/promise.js
git commit -m "feat: add API layer with request client and modules"
```

---

### Task 4: 离线工具

**Files:**
- Create: `fitlc-mini/utils/storage.js`
- Create: `fitlc-mini/utils/offline.js`
- Create: `fitlc-mini/utils/format.js`

- [ ] **Step 1: 创建 Storage 工具**

```javascript
// utils/storage.js
const config = require('../config');

/**
 * 同步存储
 */
const set = (key, value) => {
  try {
    wx.setStorageSync(key, value);
    return true;
  } catch (e) {
    console.error('Storage set error:', e);
    return false;
  }
};

/**
 * 同步获取
 */
const get = (key, defaultValue = null) => {
  try {
    const value = wx.getStorageSync(key);
    return value !== '' ? value : defaultValue;
  } catch (e) {
    console.error('Storage get error:', e);
    return defaultValue;
  }
};

/**
 * 同步删除
 */
const remove = (key) => {
  try {
    wx.removeStorageSync(key);
  } catch (e) {
    console.error('Storage remove error:', e);
  }
};

/**
 * 清除所有存储
 */
const clear = () => {
  try {
    wx.clearStorageSync();
  } catch (e) {
    console.error('Storage clear error:', e);
  }
};

/**
 * 获取离线队列
 */
const getOfflineQueue = () => {
  return get(config.STORAGE_KEY.OFFLINE_QUEUE, []);
};

/**
 * 添加到离线队列
 */
const addToOfflineQueue = (type, data) => {
  const queue = getOfflineQueue();
  queue.push({
    type,
    data,
    timestamp: Date.now()
  });
  // 限制队列大小
  if (queue.length > 100) {
    queue.shift();
  }
  set(config.STORAGE_KEY.OFFLINE_QUEUE, queue);
};

/**
 * 清空离线队列
 */
const clearOfflineQueue = () => {
  remove(config.STORAGE_KEY.OFFLINE_QUEUE);
};

/**
 * 获取缓存消息
 */
const getCachedMessages = () => {
  return get(config.STORAGE_KEY.CHAT_MESSAGES, []);
};

module.exports = {
  set,
  get,
  remove,
  clear,
  getOfflineQueue,
  addToOfflineQueue,
  clearOfflineQueue,
  getCachedMessages
};
```

- [ ] **Step 2: 创建离线队列管理**

```javascript
// utils/offline.js
const storage = require('./storage');
const api = require('../api/client');

/**
 * 检查网络状态
 */
const isNetworkAvailable = () => {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success: (res) => {
        resolve(res.networkType !== 'none');
      },
      fail: () => resolve(false)
    });
  });
};

/**
 * 同步离线队列
 */
const syncQueue = async () => {
  const isAvailable = await isNetworkAvailable();
  if (!isAvailable) return;

  const queue = storage.getOfflineQueue();
  if (queue.length === 0) return;

  console.log(`Syncing ${queue.length} offline items...`);

  for (const item of queue) {
    try {
      await processQueueItem(item);
    } catch (err) {
      console.error('Failed to sync item:', item, err);
      // 继续处理下一项，不阻塞
    }
  }

  storage.clearOfflineQueue();
  storage.set('lastSyncTime', Date.now());
};

/**
 * 处理队列中的单个项
 */
const processQueueItem = (item) => {
  switch (item.type) {
    case 'chat_message':
      return api.post('/chat/message', {
        message: item.data.message,
        imageUrls: item.data.imageUrls || [],
        isOffline: true,
        timestamp: item.timestamp
      });

    case 'workout':
      // 通过 Chat 消息保存，不需要单独处理
      return Promise.resolve();

    case 'measurement':
      // 通过 Chat 消息保存，不需要单独处理
      return Promise.resolve();

    default:
      console.warn('Unknown offline item type:', item.type);
      return Promise.resolve();
  }
};

/**
 * 记录离线操作
 */
const recordOffline = (type, data) => {
  storage.addToOfflineQueue(type, data);
};

/**
 * 监听网络状态变化
 */
const watchNetworkChange = (callback) => {
  wx.onNetworkStatusChange((res) => {
    if (res.isConnected) {
      // 网络恢复，尝试同步
      syncQueue();
    }
    callback(res);
  });
};

module.exports = {
  isNetworkAvailable,
  syncQueue,
  recordOffline,
  watchNetworkChange
};
```

- [ ] **Step 3: 创建格式化工具**

```javascript
// utils/format.js
/**
 * 格式化日期
 */
const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
};

/**
 * 格式化相对时间
 */
const formatRelativeTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)}小时前`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}天前`;

  return formatDate(timestamp);
};

/**
 * 格式化数字（重量、围度等）
 */
const formatNumber = (num, unit = '') => {
  if (typeof num !== 'number') return num;
  return `${num}${unit}`;
};

/**
 * 格式化训练动作
 */
const formatWorkoutExercise = (exercise) => {
  const sets = exercise.sets.map(s => `${s.weight}kg×${s.reps}`).join(' / ');
  return `${exercise.exerciseName}: ${sets}`;
};

/**
 * 格式化围度
 */
const formatMeasurement = (bodyPart, value) => {
  const partNames = {
    chest: '胸围',
    waist: '腰围',
    hips: '臀围',
    biceps: '臂围',
    thighs: '大腿',
    calves: '小腿',
    weight: '体重',
    bodyFat: '体脂'
  };
  return `${partNames[bodyPart] || bodyPart}: ${value}cm`;
};

/**
 * 截断文本
 */
const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

module.exports = {
  formatDate,
  formatRelativeTime,
  formatNumber,
  formatWorkoutExercise,
  formatMeasurement,
  truncate
};
```

- [ ] **Step 4: 提交代码**

```bash
git add utils/storage.js utils/offline.js utils/format.js
git commit -m "feat: add offline storage and formatting utilities"
```

---

### Task 5: 公共组件库

**Files:**
- Create: `fitlc-mini/components/button/index.js`
- Create: `fitlc-mini/components/button/index.wxml`
- Create: `fitlc-mini/components/button/index.wxss`
- Create: `fitlc-mini/components/card/index.js`
- Create: `fitlc-mini/components/card/index.wxml`
- Create: `fitlc-mini/components/card/index.wxss`
- Create: `fitlc-mini/components/modal/index.js`
- Create: `fitlc-mini/components/modal/index.wxml`
- Create: `fitlc-mini/components/modal/index.wxss`
- Create: `fitlc-mini/components/toast/index.js`
- Create: `fitlc-mini/components/toast/index.wxml`
- Create: `fitlc-mini/components/toast/index.wxss`
- Create: `fitlc-mini/components/tab-switcher/index.js`
- Create: `fitlc-mini/components/tab-switcher/index.wxml`
- Create: `fitlc-mini/components/tab-switcher/index.wxss`
- Create: `fitlc-mini/components/confirm-dialog/index.js`
- Create: `fitlc-mini/components/confirm-dialog/index.wxml`
- Create: `fitlc-mini/components/confirm-dialog/index.wxss`

- [ ] **Step 1: 创建 Button 组件**

```javascript
// components/button/index.js
Component({
  properties: {
    type: {
      type: String,
      value: 'primary'  // primary / secondary / outline / danger
    },
    size: {
      type: String,
      value: 'md'  // sm / md / lg
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    openType: {
      type: String,
      value: ''
    }
  },

  methods: {
    onTap() {
      if (this.properties.disabled || this.properties.loading) return;
      this.triggerEvent('tap');
    }
  }
});
```

```xml
<!-- components/button/index.wxml -->
<button
  class="btn btn-{{type}} btn-{{size}} {{disabled ? 'btn-disabled' : ''}}"
  disabled="{{disabled}}"
  loading="{{loading}}"
  open-type="{{openType}}"
  bindtap="onTap"
>
  <slot />
</button>
```

```css
/* components/button/index.wxss */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.15s;
}

/* size */
.btn-sm { padding: 12rpx 24rpx; font-size: 24rpx; }
.btn-md { padding: 16rpx 32rpx; font-size: 28rpx; }
.btn-lg { padding: 20rpx 40rpx; font-size: 32rpx; }

/* type - primary */
.btn-primary {
  background-color: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}
.btn-primary:active {
  background-color: #e03e00;
}

/* type - secondary */
.btn-secondary {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}
.btn-secondary:active {
  background-color: var(--color-bg-secondary);
}

/* type - outline */
.btn-outline {
  background-color: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}
.btn-outline:active {
  background-color: var(--color-accent);
  color: #fff;
}

/* type - danger */
.btn-danger {
  background-color: var(--color-accent-red);
  color: #fff;
  border-color: var(--color-accent-red);
}
.btn-danger:active {
  background-color: #b01030;
}

/* disabled */
.btn-disabled {
  opacity: 0.5;
  pointer-events: none;
}
```

- [ ] **Step 2: 创建 Card 组件**

```javascript
// components/card/index.js
Component({
  properties: {
    title: String,
    extra: String
  }
});
```

```xml
<!-- components/card/index.wxml -->
<view class="card">
  <view wx:if="{{title}}" class="card-header">
    <text class="card-title">{{title}}</text>
    <text wx:if="{{extra}}" class="card-extra">{{extra}}</text>
  </view>
  <view class="card-body">
    <slot />
  </view>
</view>
```

```css
/* components/card/index.wxss */
.card {
  background-color: var(--color-bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--color-text-primary);
}

.card-extra {
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.card-body {
  /* slot 内容样式由使用者控制 */
}
```

- [ ] **Step 3: 创建 Modal 组件**

```javascript
// components/modal/index.js
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    closable: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    onMaskTap() {
      if (this.properties.closable) {
        this.onClose();
      }
    }
  }
});
```

```xml
<!-- components/modal/index.wxml -->
<view wx:if="{{show}}" class="modal-mask" bindtap="onMaskTap">
  <view class="modal-content" catchtap>
    <view class="modal-header">
      <text class="modal-title">{{title}}</text>
      <text wx:if="{{closable}}" class="modal-close" bindtap="onClose">✕</text>
    </view>
    <view class="modal-body">
      <slot />
    </view>
  </view>
</view>
```

```css
/* components/modal/index.wxss */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--color-bg-secondary);
  border-radius: 8px;
  width: 80%;
  max-height: 80vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
}

.modal-close {
  font-size: 40rpx;
  color: var(--color-text-secondary);
}

.modal-body {
  padding: 32rpx;
}
```

- [ ] **Step 4: 创建 Toast 组件**

```javascript
// components/toast/index.js
// Toast 使用 wx.showToast / wx.showModal 代替，无需自定义组件
// 如需自定义，可以实现一个单例模式的通知组件
module.exports = {
  show(title, icon = 'none', duration = 2000) {
    wx.showToast({ title, icon, duration });
  },
  success(title) {
    wx.showToast({ title, icon: 'success', duration: 2000 });
  },
  fail(title) {
    wx.showToast({ title, icon: 'error', duration: 2000 });
  },
  loading(title = '加载中...') {
    wx.showToast({ title, icon: 'loading', duration: 3000 });
  },
  hide() {
    wx.hideToast();
  }
};
```

```javascript
// components/toast/index.js 实际为工具函数，无需 wxml/wxss
// 为保持组件目录结构，这里创建占位文件
```

- [ ] **Step 5: 创建 TabSwitcher 组件**

```javascript
// components/tab-switcher/index.js
Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    current: {
      type: String,
      value: ''
    }
  },

  methods: {
    onTabTap(e) {
      const tab = e.currentTarget.dataset.tab;
      this.triggerEvent('change', { tab });
    }
  }
});
```

```xml
<!-- components/tab-switcher/index.wxml -->
<view class="tab-switcher">
  <view
    wx:for="{{tabs}}"
    wx:key="key"
    class="tab-item {{current === item.key ? 'active' : ''}}"
    data-tab="{{item.key}}"
    bindtap="onTabTap"
  >
    <text>{{item.label}}</text>
  </view>
</view>
```

```css
/* components/tab-switcher/index.wxss */
.tab-switcher {
  display: flex;
  background-color: var(--color-bg-secondary);
  border-radius: 8px;
  padding: 8rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 16rpx 24rpx;
  font-size: 28rpx;
  color: var(--color-text-secondary);
  border-radius: 4px;
  transition: all 0.15s;
}

.tab-item.active {
  background-color: var(--color-accent);
  color: #fff;
}
```

- [ ] **Step 6: 创建 ConfirmDialog 组件**

```javascript
// components/confirm-dialog/index.js
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '确认'
    },
    message: {
      type: String,
      value: ''
    },
    confirmText: {
      type: String,
      value: '确认'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    confirmType: {
      type: String,
      value: 'primary'  // primary / danger
    }
  },

  methods: {
    onConfirm() {
      this.triggerEvent('confirm');
    },
    onCancel() {
      this.triggerEvent('cancel');
    }
  }
});
```

```xml
<!-- components/confirm-dialog/index.wxml -->
<modal wx:if="{{show}}" title="{{title}}" bindconfirm="onConfirm" bindcancel="onCancel" confirmText="{{confirmText}}" cancelText="{{cancelText}}">
  <text>{{message}}</text>
</modal>
```

```css
/* components/confirm-dialog/index.wxss */
/* 使用微信内置 modal，无需额外样式 */
```

- [ ] **Step 7: 提交代码**

```bash
git add components/
git commit -m "feat: add public component library (Button, Card, Modal, Toast, TabSwitcher, ConfirmDialog)"
```

---

## 自检清单

### Spec 覆盖检查
- [x] 项目初始化 - Task 1
- [x] Store 状态管理 - Task 2
- [x] API 层封装 - Task 3
- [x] 离线工具 - Task 4
- [x] 公共组件库 - Task 5

### 占位符扫描
- [ ] 无 "TBD"、"TODO" 等占位符
- [ ] 所有代码块都有实际内容
- [ ] 所有步骤都有具体命令和预期输出

### 类型一致性
- [ ] Store state 的属性名在各 Task 中一致
- [ ] API 模块导出的方法名一致
- [ ] 组件属性名一致

---

## 执行方式

**Plan 1 基础架构 完成。后续执行选项：**

1. **Subagent-Driven (推荐)** - 每个 Task 由独立 subagent 执行，期间审查
2. **Inline Execution** - 在当前 session 批量执行，带检查点

选择哪种方式？