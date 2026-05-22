# 健身工具页面设计方案

## 概述

在微信小程序中新增"工具"TabBar页面，提供三个健身辅助工具入口，点击后跳转到各自的详情页。

## 入口

- **位置**：TabBar 第2位（对话之后，动作库之前）
- **Tab名称**：工具
- **Tab图标**：assets/tabbar/tools.png / tools-active.png

## 页面结构

```
pages/tools/
├── tools.js          # 工具入口页面
├── tools.wxml        # 入口卡片布局
├── tools.wxss        # 样式
├── tools.json        # 页面配置

tools-detail-10x10/    # 10*10训练详情页（分包A）
tools-detail-counter/ # 计数器详情页（分包A）
tools-detail-timer/    # 计时器详情页（分包A）
```

---

## 页面 1：工具入口（tools）

### 布局

入口页面以卡片网格展示三个工具：

| 工具 | 图标 | 名称 | 简介 |
|------|------|------|------|
| 10*10 | workout-icon | 10*10训练 | 10组×10次，组间休息 |
| 计数器 | counter-icon | 计数模式 | 目标次数，震动提醒 |
| 计时器 | timer-icon | 计时器 | 倒计时，专注训练 |

### 卡片样式

```
┌────────────────────────────────────┐
│  [图标]  10*10训练                  │
│         10组×10次，组间休息        │
│         ▶ 点击进入                 │
└────────────────────────────────────┘
```

- 卡片背景：#1A1A1A
- 卡片内边距：24rpx
- 图标尺寸：80rpx × 80rpx
- 卡片间距：20rpx
- 点击效果：背景变深 #252525

---

## 页面 2：10*10 训练详情（tools-detail-10x10）

### 页面结构

顶部 Tab：训练（默认激活）
右上角：历史记录入口（点击跳转到历史页面）

```
┌─────────────────────────────────────┐
│  [Tab: 训练]        [历史记录 >]     │
├─────────────────────────────────────┤
│                                     │
│         训练交互区域                 │
│                                     │
└─────────────────────────────────────┘
```

### Tab：训练

#### 配置阶段

| 字段 | 默认值 | 说明 |
|------|--------|------|
| 动作名称 | 俯卧撑 | 可选：俯卧撑、深蹲、自定义（文本输入） |
| 单次 PR | 自动获取 | 可手动输入，覆盖自动值 |
| 建议重量 | 自动计算 | PR 的 65%（10*10 推荐重量） |
| 组间休息 | 自动（60s） | 根据预计总时长自动建议，可手动调整 |
| 开始按钮 | — | 开始训练 |

**PR 计算逻辑：**
- 调用 `/api/records/pr/:exerciseName` 获取用户该动作的历史最大重量
- 10*10 推荐重量 = `Math.round(pr * 0.65 / 2.5) * 2.5`（取最接近的 2.5kg 倍数）
- 用户可手动调整重量

**自动建议休息时长逻辑：**

根据用户选择的动作和目标，计算预计总锻炼时长（不含休息），自动建议合适的组间歇：

| 预计总时长 | 建议休息 | 说明 |
|------------|----------|------|
| < 10 分钟 | 45 秒 | 短时高强度 |
| 10-20 分钟 | 60 秒 | 中等时长 |
| 20-30 分钟 | 90 秒 | 标准 10*10 |
| > 30 分钟 | 120 秒 | 长时恢复较慢 |

预计总时长计算：`(10组 × 10次 × 预计每次用时 + 9次 × 组间歇时长) / 60` 分钟
- 俯卧撑/深蹲：预计每次 3 秒
- 基准场景：10×10 + 60s 间歇 ≈ 18 分钟总时长

#### 训练阶段

**布局（从上到下）：**
1. 进度指示："第 3 组 / 10 组"
2. 当前重量显示："重量：15kg"
3. 当前组次数输入：
   - 大字号显示当前次数
   - 可点击 +/- 调整当前组完成次数（默认 10）
4. 大按钮："完成一组"（确认当前组次，进入休息）
5. 底部操作栏：[暂停]              [结束训练]

**状态逻辑：**
- 初始：组=1，次=10
- 点击 +/- 调整当前组次数
- 点击"完成一组"：组+1，次重置为10，进入休息倒计时
- 点击"暂停"：暂停计时，进入暂停状态
- 点击"结束训练"：进入结束阶段

**暂停状态：**
- 暂停时所有计时器停止
- 显示"已暂停"标识
- "继续"按钮替代"暂停"
- 可随时点击"结束训练"

#### 休息阶段

**布局：**
1. 提示文字："休息一下"
2. 大字号倒计时（60-1 递减）
3. "跳过休息"按钮
4. 底部：[暂停]              [结束训练]

**状态逻辑：**
- 倒计时结束 → 震动+提示音 → 自动进入下一组
- 用户可点击"跳过休息"提前开始
- 暂停时倒计时停止

#### 完成阶段

- 显示训练汇总："完成 8 组，共 75 次"（实际完成组数和总次数）
- 弹出确认对话框：
  - "已完成了 8 组，共 75 次俯卧撑，是否保存到训练记录？"
  - "保存" / "不保存"

**结束训练触发：** 点击右上角"结束训练"按钮

#### 保存数据格式

```typescript
{
  date: Date.now(),
  exercises: [{
    name: "俯卧撑",
    sets: 8,        // 实际完成组数
    reps: 75        // 实际完成总次数
  }],
  totalDuration: number // 秒，从开始到结束的总时长
}
```

### 历史记录页面（tools-history-10x10）

**布局：**
- 顶部：返回按钮 + 标题"10*10历史"
- 筛选时间：全部 / 本周 / 本月
- 列表：按时间倒序显示历史记录
- 每条记录显示：日期、动作名称、完成组数、总次数、总时长
- 支持点击重新执行（加载历史配置）
- 支持左滑删除

**历史记录来源：**
- 本地存储：工具使用记录（未保存到训练记录的）
- API：已保存的训练记录（筛选 `source: 'tools'`）

**合并展示逻辑：**
- 同时展示本地记录和已保存的训练记录
- 已保存的记录显示"已同步"标签
- 本地记录可手动保存到训练记录

**删除逻辑：**
- 本地记录：直接删除
- 已保存记录：调用 API 删除训练记录后同步删除本地缓存

---

## 页面 3：计数器详情（tools-detail-counter）

### 页面结构

顶部 Tab：计数（默认激活）
右上角：历史记录入口

```
┌─────────────────────────────────────┐
│  [Tab: 计数]        [历史记录 >]     │
├─────────────────────────────────────┤
│                                     │
│         计数交互区域                 │
│                                     │
└─────────────────────────────────────┘
```

### Tab：计数

#### 配置阶段

| 字段 | 默认值 |
|------|--------|
| 动作类型 | 俯卧撑 | 可选：俯卧撑、深蹲、自定义（文本输入） |
| 目标次数 | 20 | 可调 |

#### 计数阶段

**布局：**
1. 动作名称 + 目标显示："俯卧撑 / 目标 20 次"
2. 当前计数（大字号）："15"
3. 进度条：已完成 / 目标
4. 大按钮："计数 +1"
5. 底部操作栏：[暂停]              [结束]

**状态逻辑：**
- 每次点击：计数 +1
- 达到目标：震动+提示音，显示"恭喜完成！"
- 可继续计数（超过目标后累计显示）
- 点击"暂停"：暂停当前状态
- 点击"结束"：进入结束阶段

**暂停状态：**
- 显示"已暂停"标识
- 可随时点击"结束"

#### 完成阶段

- 显示汇总："完成 47 次俯卧撑"
- "保存记录" / "不保存" 按钮

#### 保存

- 保存格式：`sets: 1, reps: 实际完成总数`
- 例如：完成 47 次俯卧撑 → `{ name: "俯卧撑", sets: 1, reps: 47 }`

### 历史记录页面（tools-history-counter）

同 10*10 的历史页面逻辑，筛选和展示工具记录。

---

## 页面 4：计时器详情（tools-detail-timer）

### 页面结构

顶部 Tab：计时（默认激活）
右上角：历史记录入口

```
┌─────────────────────────────────────┐
│  [Tab: 计时]        [历史记录 >]     │
├─────────────────────────────────────┤
│                                     │
│         计时交互区域                 │
│                                     │
└─────────────────────────────────────┘
```

### Tab：计时

#### 配置阶段

**快速选项按钮：** 30s / 60s / 90s / 120s / 自定义

**自定义：** 点击后弹出数字键盘输入秒数

#### 计时阶段

**布局：**
1. 大字号倒计时显示（如 "01:30"）
2. 进度环（可选）
3. "暂停/继续" 按钮
4. "停止" 按钮

**状态逻辑：**
- 倒计时结束 → 震动+提示音 → 显示"时间到！"
- 点击"停止" → 返回配置阶段

#### 完成阶段

- 显示"时间到！"提示
- "再来一次" / "完成" 按钮

**"再来一次"逻辑：**
- 使用相同时长重新开始计时（跳过配置阶段）
- 计数器累加（usedCount + 1）

**"完成"逻辑：**
- 返回配置阶段

### 历史记录页面（tools-history-timer）

**说明：** 计时器历史仅记录使用记录，不保存到训练记录。

**布局：**
- 顶部：返回按钮 + 标题"计时器历史"
- 筛选时间
- 列表：按时间倒序显示使用记录
- 每条记录显示：日期、计时时长、使用次数
- 支持点击重新执行该时长（加载历史时长，直接进入计时）
- 支持左滑删除

---

## 技术实现

### 页面文件

```
pages/tools/
├── tools.js              # 工具入口页面
├── tools.wxml            # 入口卡片布局
├── tools.wxss            # 样式
└── tools.json            # 页面配置

pages/tools-detail-10x10/      # 10*10训练详情页
├── tools-detail-10x10.js
├── tools-detail-10x10.wxml
├── tools-detail-10x10.wxss
└── tools-detail-10x10.json

pages/tools-detail-counter/    # 计数器详情页
├── tools-detail-counter.js
├── tools-detail-counter.wxml
├── tools-detail-counter.wxss
└── tools-detail-counter.json

pages/tools-detail-timer/       # 计时器详情页
├── tools-detail-timer.js
├── tools-detail-timer.wxml
├── tools-detail-timer.wxss
└── tools-detail-timer.json

pages/tools-history-10x10/      # 10*10历史记录页
├── tools-history-10x10.js
├── tools-history-10x10.wxml
├── tools-history-10x10.wxss
└── tools-history-10x10.json

pages/tools-history-counter/    # 计数器历史记录页
├── tools-history-counter.js
├── tools-history-counter.wxml
├── tools-history-counter.wxss
└── tools-history-counter.json

pages/tools-history-timer/       # 计时器历史记录页
├── tools-history-timer.js
├── tools-history-timer.wxml
├── tools-history-timer.wxss
└── tools-history-timer.json
```

### 样式

- 背景色：#0A0A0A
- 卡片色：#1A1A1A
- 强调色：#FF4500
- 文字色：#FFFFFF / #888888
- 按钮：2px solid #FF4500，圆角 4px
- 大按钮高度：120rpx，便于点击

### API

保存训练记录调用现有接口：
```
POST /api/records/workout
Body: {
  date: number,
  exercises: [{ name: string, sets: number, reps: number }],
  totalDuration: number,
  source: "tools",           // 标识来源：tools | chat | plan
  toolType: "10x10" | "counter"  // 工具类型（仅 source=tools 时）
}

GET /api/records/workouts?source=tools  # 获取工具来源的记录

DELETE /api/records/workout/:id         # 删除训练记录
```

### 历史记录合并逻辑

**展示顺序：**
1. 先获取服务器记录（`savedToServer: true`）
2. 再获取本地记录（`savedToServer: false`）
3. 按时间倒序混合排列
4. 已保存记录显示"已同步"标签

**删除逻辑：**
- 本地记录：直接删除，调用 `wx.removeStorage`
- 已保存记录：先调用 `DELETE /api/records/workout/:id`，成功后再删除本地缓存

### 重新执行流程

**从历史记录点击重新执行：**
1. 点击历史记录项
2. 获取记录的完整配置（动作名称、目标、时长等）
3. 跳转详情页并预填配置
4. 直接进入训练/计数/计时状态（跳过配置阶段）

**数据传递：**
- 通过 URL 参数传递历史记录 ID
- 详情页 onLoad 时获取记录详情并恢复状态

### 数据存储

**本地存储结构：**
```javascript
{
  "tools_10x10_history": [
    {
      id: "local-xxx",
      date: Date.now(),
      exerciseName: "俯卧撑",
      sets: 8,
      reps: 75,
      totalDuration: 1080,
      savedToServer: false  // 是否已同步到服务器
    }
  ],
  "tools_counter_history": [...],
  "tools_timer_history": [
    {
      id: "local-yyy",
      date: Date.now(),
      duration: 60,
      usedCount: 3
    }
  ]
}
```

### 状态管理

每个工具详情页独立管理状态，使用页面自身 data。

### 提示音

- 使用 wx.vibrateLong() 震动
- 提示音使用 wx.playBackgroundAudio() 或简单系统提示

---

## 文件变更清单

### 新增文件

#### TabBar 和入口页面
1. `pages/tools/tools.js` - 工具入口页面逻辑
2. `pages/tools/tools.wxml` - 入口卡片布局
3. `pages/tools/tools.wxss` - 入口页面样式
4. `pages/tools/tools.json` - 页面配置
5. `assets/tabbar/tools.png` - TabBar 图标
6. `assets/tabbar/tools-active.png` - TabBar 选中图标

#### 10*10 训练
7. `pages/tools-detail-10x10/tools-detail-10x10.js` - 10*10详情页逻辑
8. `pages/tools-detail-10x10/tools-detail-10x10.wxml` - 10*10详情页结构
9. `pages/tools-detail-10x10/tools-detail-10x10.wxss` - 10*10详情页样式
10. `pages/tools-detail-10x10/tools-detail-10x10.json` - 页面配置
11. `pages/tools-history-10x10/tools-history-10x10.js` - 10*10历史页逻辑
12. `pages/tools-history-10x10/tools-history-10x10.wxml` - 10*10历史页结构
13. `pages/tools-history-10x10/tools-history-10x10.wxss` - 10*10历史页样式
14. `pages/tools-history-10x10/tools-history-10x10.json` - 页面配置

#### 计数器
15. `pages/tools-detail-counter/tools-detail-counter.js` - 计数器详情页逻辑
16. `pages/tools-detail-counter/tools-detail-counter.wxml` - 计数器详情页结构
17. `pages/tools-detail-counter/tools-detail-counter.wxss` - 计数器详情页样式
18. `pages/tools-detail-counter/tools-detail-counter.json` - 页面配置
19. `pages/tools-history-counter/tools-history-counter.js` - 计数器历史页逻辑
20. `pages/tools-history-counter/tools-history-counter.wxml` - 计数器历史页结构
21. `pages/tools-history-counter/tools-history-counter.wxss` - 计数器历史页样式
22. `pages/tools-history-counter/tools-history-counter.json` - 页面配置

#### 计时器
23. `pages/tools-detail-timer/tools-detail-timer.js` - 计时器详情页逻辑
24. `pages/tools-detail-timer/tools-detail-timer.wxml` - 计时器详情页结构
25. `pages/tools-detail-timer/tools-detail-timer.wxss` - 计时器详情页样式
26. `pages/tools-detail-timer/tools-detail-timer.json` - 页面配置
27. `pages/tools-history-timer/tools-history-timer.js` - 计时器历史页逻辑
28. `pages/tools-history-timer/tools-history-timer.wxml` - 计时器历史页结构
29. `pages/tools-history-timer/tools-history-timer.wxss` - 计时器历史页样式
30. `pages/tools-history-timer/tools-history-timer.json` - 页面配置

### 修改文件

1. `app.json` - 添加 TabBar 页面和图标配置，添加6个详情页路由
