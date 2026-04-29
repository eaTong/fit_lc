# 日历页面设计文档

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal：**新增日历页面，默认显示当月日历，通过小圆点显示有训练/围度记录的日期，点击日期展开显示当天详情

**Architecture：**React 单页应用，使用独立路由 `/calendar`，通过 recordsStore 获取训练和围度数据

**Tech Stack：**React + TypeScript + TailwindCSS + Zustand + React Router v6

---

## 1. 入口

- 用户在 `/profile` 页面点击"连续打卡"卡片，跳转 `/calendar`
- 页面使用 SettingsLayout（无底部 Tab，有顶部返回导航）

## 2. 页面结构

### 2.1 顶部导航栏
- 左侧：返回按钮（navigate(-1)）
- 中间：页面标题"日历"
- 右侧："今天"按钮（快速跳转当月当天）

### 2.2 月份切换
- 显示格式：`yyyy年m月`
- 左右箭头切换上一月/下一月
- 点击"今天"按钮回到当前月份

### 2.3 周头
- 固定显示：`一  二  三  四  五  六  日`

### 2.4 日期网格
- 42格布局（6行×7列）
- 每个日期格显示日期数字
- 有记录的日期右下角显示橙色小圆点（●）
- 当天高亮显示（橙色边框）
- 点击有记录的日期展开详情

### 2.5 展开详情区域
- 点击日期后，日历下方展开显示当天记录
- 顶部显示选中日期：`────── 4月7日 ───────────`
- 训练记录列表：动作名 + 组数×次数/距离
- 围度记录列表：部位和数值
- 再次点击日期或点击其他区域收起

## 3. 数据获取

### 3.1 进入页面时
- 调用 `fetchWorkouts(startOfMonth, endOfMonth)`
- 调用 `fetchMeasurements(startOfMonth, endOfMonth)`
- 存储在 recordsStore 中

### 3.2 标记有记录的日期
- 训练记录存在：`hasWorkout: true`
- 围度记录存在：`hasMeasurement: true`
- 有任意记录显示小圆点

## 4. 路由配置

```tsx
// App.tsx
<Route element={<SettingsLayout />}>
  <Route path="/calendar" element={<Calendar />} />
</Route>
```

## 5. 组件清单

| 组件 | 文件 | 说明 |
|------|------|------|
| Calendar | `pages/Calendar.tsx` | 主页面 |
| CalendarGrid | `components/calendar/CalendarGrid.tsx` | 日期网格组件 |
| CalendarDay | `components/calendar/CalendarDay.tsx` | 单个日期格子 |
| CalendarDetail | `components/calendar/CalendarDetail.tsx` | 展开的详情面板 |

## 6. 状态管理

```typescript
// recordsStore 已有的方法
fetchWorkouts: (start?: string, end?: string) => Promise<void>
fetchMeasurements: (start?: string, end?: string) => Promise<void>
workouts: Workout[]
measurements: Measurement[]
```

## 7. 样式

- 日期格：无记录时正常显示，有记录时右下角显示橙色圆点
- 当天：2px 橙色边框
- 选中日期：背景色高亮
- 小圆点：w-1.5 h-1.5 rounded-full bg-accent-orange
