# FitLC 功能入口整合设计

**日期：** 2026-04-29
**状态：** 已批准
**版本：** 1.0

---

## 一、整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    用户端 (Bottom Tab)
│  首页 │ 数据 │ 计划 │ 知识 │ 我的
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    管理端 (Sidebar)
│  [← 返回] │ 动作库维护 │ 肌肉库维护
└─────────────────────────────────────────────────────────┘
```

---

## 二、用户端 Bottom Tab 布局

### 2.1 Tab 定义

| Tab | 图标 | 路由 | 内容 |
|-----|------|------|------|
| **首页** | 🏠 | `/dashboard` | 看板 + 快捷对话卡片（跳转 /chat） |
| **数据** | 📊 | `/history` | 历史/趋势/围度（子Tab切换） |
| **计划** | 📋 | `/plans` | 计划列表 → 新建/详情/执行 |
| **知识** | 📚 | `/muscles` | 肌肉库/动作库（子Tab切换） |
| **我的** | 👤 | `/profile` | 个人中心 + 徽章 |

### 2.2 子Tab切换方案

数据页面（历史/趋势/围度）和知识页面（肌肉/动作）采用**顶部 Tab Bar** 切换：

- URL 不变，通过 React state 或 URL query param（如 `?tab=history`）区分
- 切换时更新 URL，保持可分享性

### 2.3 导航缺失修复

| 页面 | 原有状态 | 整合方案 |
|------|---------|---------|
| `/measurements` | 有页面无导航 | 归入"数据"Tab → 围度子Tab |
| `/badges` | 有页面无导航 | 归入"我的"Tab |
| `/plans/new` | 无导航入口 | 归入"计划"Tab → 右上角"+"按钮 |
| `/plans/:id/execute` | 无导航入口 | 从计划详情页进入 |

---

## 三、管理端 Sidebar 布局

### 3.1 布局结构

```
┌──────────┬─────────────────────────────────────────────┐
│ FITLC    │ [← 返回主应用]              [退出]          │
│ ──────── ├─────────────────────────────────────────────┤
│ 动作库   │                                             │
│ 肌肉库   │              内容区域                        │
│          │                                             │
└──────────┴─────────────────────────────────────────────┘
```

### 3.2 导航项

| 导航项 | 路由 |
|--------|------|
| 动作库维护 | `/admin/exercises` |
| 肌肉库维护 | `/admin/muscles` |

### 3.3 返回按钮

点击"返回主应用" → 跳转 `/chat`，保留 admin 权限状态。

---

## 四、路由与布局映射

| 路由 | 布局组件 |
|------|---------|
| `/dashboard` | BottomTabLayout |
| `/chat` | BottomTabLayout |
| `/history` | BottomTabLayout |
| `/trends` | BottomTabLayout |
| `/profile` | BottomTabLayout |
| `/plans*` | BottomTabLayout |
| `/muscles` | BottomTabLayout |
| `/exercises` | BottomTabLayout |
| `/measurements` | BottomTabLayout |
| `/badges` | BottomTabLayout |
| `/admin/*` | SidebarLayout |

---

## 五、组件结构

### 5.1 BottomTabLayout

```
<div className="min-h-screen flex flex-col">
  <Header />  // Logo + 用户信息
  <Outlet />  // 页面内容
  <BottomTabBar />  // 底部导航栏
</div>
```

### 5.2 SidebarLayout

```
<div className="min-h-screen flex">
  <aside className="w-48 bg-primary-secondary border-r-2 border-border">
    <SidebarNav />
  </aside>
  <div className="flex-1 flex flex-col">
    <Header />  // Logo + 返回按钮 + 退出
    <Outlet />
  </div>
</div>
```

### 5.3 BottomTabBar

| Tab | 图标 | 激活颜色 |
|-----|------|---------|
| 首页 | 🏠 | accent-orange |
| 数据 | 📊 | accent-orange |
| 计划 | 📋 | accent-orange |
| 知识 | 📚 | accent-orange |
| 我的 | 👤 | accent-orange |

---

## 六、视觉规范

### 6.1 用户端 Bottom Tab Bar

- 固定底部，高度 56px
- 背景：`#1A1A1A`
- 边框：`2px solid #333333`（顶部）
- Tab 项：图标 + 文字，垂直排列
- 激活态：图标和文字变 `accent-orange`
- 非激活态：图标和文字变 `text-secondary`

### 6.2 管理端 Sidebar

- 固定左侧，宽度 192px
- 背景：`#1A1A1A`
- 边框：`2px solid #333333`（右侧）
- 导航项：文字 + 图标，垂直排列
- 激活态：背景 `#252525`，文字 `accent-orange`
- 非激活态：文字 `text-secondary`

---

## 七、实施任务

1. 创建 `BottomTabLayout` 布局组件
2. 创建 `SidebarLayout` 布局组件
3. 重构 `App.tsx` 路由，区分布局
4. 创建 `BottomTabBar` 组件
5. 创建 `SidebarNav` 组件
6. 修复 `/measurements`、`/badges` 导航缺失
7. 更新现有页面移除重复的 Header（已由布局提供）
8. 添加 `Measurements` 页面到数据Tab逻辑

---

## 八、页面Tab子路由映射

### 数据Tab（`/history`）

| 子Tab | 路由 |
|-------|------|
| 历史 | `/history` 或 `/history?tab=history` |
| 趋势 | `/history?tab=trends` |
| 围度 | `/history?tab=measurements` |

### 知识Tab（`/muscles`）

| 子Tab | 路由 |
|-------|------|
| 肌肉库 | `/muscles` 或 `/muscles?tab=muscles` |
| 动作库 | `/muscles?tab=exercises` |
