# 10×10 动作搜索功能实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 10×10 训练页面的动作选择从固定 picker 改为支持实时搜索的输入框，自动从服务器动作库筛选匹配动作。

**Architecture:** 替换原有 picker 为 input 输入框 + 结果下拉列表。使用 300ms 防抖调用后端 `/api/exercises` API 搜索动作。本地缓存最近使用的动作（最多 10 个）。

**Tech Stack:** 微信小程序原生框架 + storage.js 本地缓存

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `fitlc-mini/utils/storage.js` | 添加最近动作缓存的读写方法 |
| `fitlc-mini/api/exercise.js` | 新建，封装动作搜索 API 调用 |
| `fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.js` | 添加搜索、防抖、状态管理逻辑 |
| `fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.wxml` | 替换 picker 为 input + 结果列表 |
| `fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.wxss` | 添加结果列表样式 |

---

## Task 1: 添加 storage.js 最近动作缓存方法

**Files:**
- Modify: `fitlc-mini/utils/storage.js`

- [ ] **Step 1: 添加最近动作缓存的常量和导出方法**

在 `TOOLS_HISTORY_PREFIX` 旁添加 `RECENT_EXERCISES_KEY`，并添加两个方法：

```javascript
// fitlc-mini/utils/storage.js

const RECENT_EXERCISES_KEY = 'recent_exercises';

/**
 * 获取最近使用的动作
 * @returns {Array} 最近动作数组，每个元素 {id, name, category, equipment}
 */
function getRecentExercises() {
  try {
    const data = wx.getStorageSync(RECENT_EXERCISES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('getRecentExercises failed:', e);
    return [];
  }
}

/**
 * 保存最近使用的动作
 * @param {Array} exercises - 动作数组
 * @returns {boolean} 是否保存成功
 */
function saveRecentExercises(exercises) {
  try {
    // 最多保留 10 个
    const trimmed = exercises.slice(0, 10);
    wx.setStorageSync(RECENT_EXERCISES_KEY, JSON.stringify(trimmed));
    return true;
  } catch (e) {
    console.error('saveRecentExercises failed:', e);
    return false;
  }
}

// 更新 module.exports
module.exports = {
  getCachedMessages,
  setCachedMessages,
  getToolsHistory,
  saveToolsHistory,
  getRecentExercises,  // 新增
  saveRecentExercises   // 新增
};
```

- [ ] **Step 2: 验证修改**

确认 storage.js 中有 `getRecentExercises` 和 `saveRecentExercises` 两个导出方法。

- [ ] **Step 3: 提交**

```bash
git add fitlc-mini/utils/storage.js
git commit -m "feat(mini): 添加最近动作缓存方法

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 2: 创建 exercise.js API 模块

**Files:**
- Create: `fitlc-mini/api/exercise.js`

- [ ] **Step 1: 创建 exercise API 模块**

```javascript
// fitlc-mini/api/exercise.js
const client = require('./client');

/**
 * 搜索动作
 * @param {string} keyword - 搜索关键词
 * @param {number} pageSize - 返回数量，默认 20
 * @returns {Promise<Array>} 动作列表
 */
function searchExercises(keyword, pageSize = 20) {
  return client.get('/exercises', {
    name: keyword,
    status: 'published',
    pageSize: pageSize
  }).then(res => {
    return res.exercises || [];
  });
}

module.exports = {
  searchExercises
};
```

- [ ] **Step 2: 提交**

```bash
git add fitlc-mini/api/exercise.js
git commit -m "feat(mini): 添加动作搜索 API 模块

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 3: 修改 tools-detail-10x10.js 添加搜索逻辑

**Files:**
- Modify: `fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.js`

- [ ] **Step 1: 添加 data 状态**

在 `data` 对象中添加：

```javascript
data: {
    // ... 现有字段 ...

    // 动作搜索相关
    exerciseInput: '',           // 输入框内容
    exerciseResults: [],         // 搜索结果列表
    showExerciseList: false,     // 是否显示结果列表
    isSearching: false,          // 是否正在搜索
    selectedExercise: null,      // 选中的动作对象 {id, name, category, equipment}
    searchTimer: null,            // 防抖定时器
    recentExercises: []           // 最近使用的动作
},
```

- [ ] **Step 2: 在 onLoad 中加载最近动作**

```javascript
onLoad(options) {
    // 加载最近使用的动作
    const recent = storage.getRecentExercises();
    this.setData({ recentExercises: recent.slice(0, 5) });

    // 检查是否有历史记录ID传入（重新执行）
    if (options.recordId) {
      this.loadHistoryRecord(options.recordId);
    }
},
```

- [ ] **Step 3: 添加 onExerciseInput 方法**

```javascript
// 动作搜索输入
onExerciseInput(e) {
    const keyword = e.detail.value;
    this.setData({ exerciseInput: keyword });

    // 防抖 300ms
    if (this.data.searchTimer) {
      clearTimeout(this.data.searchTimer);
    }

    if (!keyword.trim()) {
      this.setData({
        exerciseResults: this.data.recentExercises,
        showExerciseList: true,
        isSearching: false
      });
      return;
    }

    this.setData({ isSearching: true });

    this.data.searchTimer = setTimeout(() => {
      this.doSearch(keyword);
    }, 300);
},
```

- [ ] **Step 4: 添加 doSearch 方法**

```javascript
// 执行搜索
doSearch(keyword) {
    const api = require('../../api/exercise');

    api.searchExercises(keyword)
      .then(exercises => {
        this.setData({
          exerciseResults: exercises,
          showExerciseList: true,
          isSearching: false
        });
      })
      .catch(err => {
        console.error('search exercises failed:', err);
        this.setData({
          exerciseResults: [],
          showExerciseList: true,
          isSearching: false,
          searchError: true
        });
      });
},
```

- [ ] **Step 5: 添加 onExerciseSelect 方法**

```javascript
// 选择动作
onExerciseSelect(e) {
    const exercise = e.currentTarget.dataset.exercise;
    const { recentExercises } = this.data;

    // 更新选中动作
    this.setData({
      selectedExercise: exercise,
      exerciseInput: exercise.name,
      showExerciseList: false
    });

    // 更新最近使用列表
    const filtered = recentExercises.filter(e => e.id !== exercise.id);
    const updated = [exercise, ...filtered];
    storage.saveRecentExercises(updated);
    this.setData({ recentExercises: updated.slice(0, 5) });
},
```

- [ ] **Step 6: 添加 onExerciseFocus 方法**

```javascript
// 输入框获得焦点
onExerciseFocus() {
    const { recentExercises, exerciseInput } = this.data;
    if (exerciseInput.trim()) {
      this.setData({ showExerciseList: true });
    } else {
      this.setData({
        exerciseResults: recentExercises.slice(0, 5),
        showExerciseList: true
      });
    }
},
```

- [ ] **Step 7: 添加 onExerciseBlur 方法**

```javascript
// 输入框失去焦点
onExerciseBlur() {
    // 延迟隐藏，优先处理点击事件
    setTimeout(() => {
      this.setData({ showExerciseList: false });
    }, 200);
},
```

- [ ] **Step 8: 提交**

```bash
git add fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.js
git commit -m "feat(mini): 10x10训练添加动作搜索功能

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 4: 修改 tools-detail-10x10.wxml 替换 picker

**Files:**
- Modify: `fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.wxml`

- [ ] **Step 1: 替换动作选择区域**

将原有的 picker：
```xml
<view class="form-item">
  <text class="form-label">动作名称</text>
  <view class="exercise-picker">
    <picker mode="selector" range="{{exercises}}" value="{{exerciseIndex}}" bindchange="onExerciseChange">
      <view class="picker-value">{{exercises[exerciseIndex]}}</view>
    </picker>
  </view>
</view>
```

替换为：
```xml
<view class="form-item">
  <text class="form-label">动作名称</text>
  <view class="exercise-input-wrap">
    <input
      class="exercise-input"
      type="text"
      value="{{exerciseInput}}"
      placeholder="搜索动作名称..."
      bindinput="onExerciseInput"
      bindfocus="onExerciseFocus"
      bindblur="onExerciseBlur"
    />
    <view class="exercise-loading" wx:if="{{isSearching}}">
      <text class="loading-icon">⟳</text>
    </view>
  </view>

  <!-- 搜索结果列表 -->
  <view class="exercise-list {{showExerciseList ? 'show' : ''}}" wx:if="{{showExerciseList}}">
    <block wx:if="{{exerciseResults.length > 0}}">
      <view
        class="exercise-item"
        wx:for="{{exerciseResults}}"
        wx:key="id"
        bindtap="onExerciseSelect"
        data-exercise="{{item}}"
      >
        <text class="exercise-name">{{item.name}}</text>
        <text class="exercise-tags">{{item.category}} / {{item.equipment}}</text>
      </view>
    </block>
    <block wx:else>
      <view class="exercise-empty">
        <text wx:if="{{isSearching}}">搜索中...</text>
        <text wx:elif="{{exerciseInput.trim()}}">未找到匹配动作</text>
        <text wx:else>请输入动作名称搜索</text>
      </view>
    </block>
  </view>

  <!-- 选中动作标签 -->
  <view class="selected-exercise-tag" wx:if="{{selectedExercise && !showExerciseList}}">
    <text class="tag-text">{{selectedExercise.category}} / {{selectedExercise.equipment}}</text>
  </view>
</view>
```

- [ ] **Step 2: 提交**

```bash
git add fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.wxml
git commit -m "feat(mini): 10x10训练替换picker为搜索输入框

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 5: 修改 tools-detail-10x10.wxss 添加样式

**Files:**
- Modify: `fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.wxss`

- [ ] **Step 1: 添加样式**

在文件末尾添加：

```css
/* 动作搜索输入框 */
.exercise-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.exercise-input {
  width: 100%;
  height: 80rpx;
  padding: 0 30rpx;
  background: #252525;
  border: 2px solid #333333;
  border-radius: 4px;
  color: #FFFFFF;
  font-size: 28rpx;
}

.exercise-input:focus {
  border-color: #FF4500;
}

.exercise-loading {
  position: absolute;
  right: 30rpx;
  display: flex;
  align-items: center;
}

.loading-icon {
  font-size: 32rpx;
  color: #888888;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 搜索结果列表 */
.exercise-list {
  display: none;
  margin-top: 10rpx;
  max-height: 200px;
  overflow-y: auto;
  background: #1A1A1A;
  border: 2px solid #333333;
  border-radius: 4px;
}

.exercise-list.show {
  display: block;
}

.exercise-item {
  display: flex;
  flex-direction: column;
  padding: 20rpx 30rpx;
  border-bottom: 1px solid #252525;
}

.exercise-item:last-child {
  border-bottom: none;
}

.exercise-item:active {
  background: #252525;
}

.exercise-name {
  font-size: 28rpx;
  color: #FFFFFF;
  margin-bottom: 6rpx;
}

.exercise-tags {
  font-size: 22rpx;
  color: #888888;
}

.exercise-empty {
  padding: 40rpx 30rpx;
  text-align: center;
  color: #888888;
  font-size: 26rpx;
}

/* 选中动作标签 */
.selected-exercise-tag {
  margin-top: 10rpx;
}

.tag-text {
  display: inline-block;
  padding: 6rpx 16rpx;
  background: #252525;
  border-radius: 4px;
  color: #FF4500;
  font-size: 22rpx;
}
```

- [ ] **Step 2: 提交**

```bash
git add fitlc-mini/pages/tools-detail-10x10/tools-detail-10x10.wxss
git commit -m "feat(mini): 10x10训练添加搜索结果列表样式

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## 验证检查清单

- [ ] 打开 10×10 训练页面，输入框显示 placeholder "搜索动作名称..."
- [ ] 输入关键词（如"俯卧"），下方显示匹配动作列表
- [ ] 点击列表中某动作，输入框显示动作名，下方显示动作标签
- [ ] 无网络时显示"网络错误"
- [ ] 无匹配时显示"未找到匹配动作"
- [ ] 打开页面时空输入显示最近使用的动作（如有缓存）