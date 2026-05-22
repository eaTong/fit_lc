# 10×10 训练动作选择 - 实时搜索功能

## 概述

将 10×10 训练页面的动作选择从固定 picker 改为支持实时搜索的输入框，自动从服务器动作库筛选匹配动作。

## 交互设计

### 输入区域

- 替换原有 `<picker mode="selector">` 为 `<input>` 输入框
- placeholder 显示"搜索动作名称..."
- 输入框获取焦点时自动清空当前输入
- 每次按键触发搜索（防抖 300ms）
- 加载中时输入框右侧显示 loading 动画

### 结果列表

- 位置：输入框下方，紧邻
- 高度：200px，超出可滚动
- 每行内容：动作名称 + 类别标签（格式：`{category} / {equipment}`）
- 点击某行：选中该动作，收起列表，输入框显示动作名
- 无匹配结果：显示"未找到匹配动作"
- 网络错误：显示"网络错误，点击重试"

### 初始状态

- 空输入时显示最近使用的动作（从缓存读取，最多 5 个）
- 如无缓存则显示"请输入动作名称搜索"

### 选中状态

- 输入框显示选中动作名称
- 下方显示动作标签（不可编辑）

## API 调用

### 请求

```
GET /api/exercises?name={keyword}&status=published&pageSize=20
```

### 防抖

- 300ms 防抖，避免每 keystroke 都请求
- 取消 pending 请求

### 缓存

- 最近使用动作缓存到 `storage.js`，key: `recentExercises`
- 每次选中动作时更新缓存（最多保留 10 个）

## 数据结构

### 响应数据

```json
{
  "exercises": [
    {
      "id": 1,
      "name": "俯卧撑",
      "category": "chest",
      "equipment": "bodyweight"
    }
  ],
  "total": 50
}
```

### 本地缓存

```json
{
  "recentExercises": [
    { "id": 1, "name": "俯卧撑", "category": "chest", "equipment": "bodyweight" },
    ...
  ]
}
```

## 文件变更

### 前端

| 文件 | 变更 |
|------|------|
| `pages/tools-detail-10x10/tools-detail-10x10.wxml` | 替换 picker 为 input + 结果列表 |
| `pages/tools-detail-10x10/tools-detail-10x10.js` | 添加搜索逻辑、防抖、API 调用 |
| `pages/tools-detail-10x10/tools-detail-10x10.wxss` | 列表样式 |

### 后端

无需变更，已有 `GET /api/exercises` 支持 `name` 和 `status` 参数。

## 状态处理

| 状态 | UI 表现 |
|------|---------|
| 初始/空输入 | 显示最近使用动作（最多 5 个），或提示"请输入动作名称搜索" |
| 加载中 | 输入框右侧显示加载动画 |
| 有结果 | 列表展示匹配动作 |
| 无结果 | 显示"未找到匹配动作" |
| 网络错误 | 显示"网络错误，点击重试"，点击可重新搜索 |

## 实现步骤

1. 在 `tools-detail-10x10.js` 添加 `searchExercises` 方法（防抖 + API 调用）
2. 在 `tools-detail-10x10.wxml` 替换 picker 为 input + 结果列表
3. 在 `tools-detail-10x10.wxss` 添加结果列表样式
4. 添加 `storage.js` 的 `getRecentExercises` / `saveRecentExercises` 方法
5. 选中动作时更新最近使用缓存