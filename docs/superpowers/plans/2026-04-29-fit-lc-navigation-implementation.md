# FitLC 导航整合实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将用户端改造为 Bottom Tab 布局，管理端改造为 Sidebar 布局，统一入口导航。

**Architecture:**
- 用户端：`BottomTabLayout` 包裹路由，底部 Tab Bar 导航
- 管理端：`SidebarLayout` 包裹路由，左侧 Sidebar 导航
- 子Tab页面（数据/知识）通过 URL query param (`?tab=xxx`) 切换

**Tech Stack:** React + React Router v6 + TailwindCSS

---

## 任务清单

- [ ] Task 1: 创建 BottomTabLayout 布局组件
- [ ] Task 2: 创建 SidebarLayout 布局组件
- [ ] Task 3: 创建 BottomTabBar 组件
- [ ] Task 4: 创建 SidebarNav 组件
- [ ] Task 5: 重构 App.tsx 路由区分布局
- [ ] Task 6: 简化 Header.tsx（移除页面级导航）
- [ ] Task 7: History 页面添加数据子Tab逻辑
- [ ] Task 8: Muscles 页面添加知识子Tab逻辑
- [ ] Task 9: Profile 页面添加徽章入口
- [ ] Task 10: 管理端页面接入 SidebarLayout

---

## Task 1: 创建 BottomTabLayout 布局组件

**Files:**
- Create: `frontend/src/layouts/BottomTabLayout.tsx`

- [ ] **Step 1: 创建 BottomTabLayout.tsx**

```tsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';

export default function BottomTabLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/layouts/BottomTabLayout.tsx
git commit -m "feat: create BottomTabLayout component"
```

---

## Task 2: 创建 SidebarLayout 布局组件

**Files:**
- Create: `frontend/src/layouts/SidebarLayout.tsx`

- [ ] **Step 1: 创建 SidebarLayout.tsx**

```tsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function SidebarLayout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex bg-primary">
      {/* Sidebar */}
      <aside className="w-48 bg-primary-secondary border-r-2 border-border flex flex-col">
        <div className="p-4 border-b-2 border-border">
          <span className="font-heading text-xl font-bold text-accent-orange">
            FITLC
          </span>
          <span className="text-text-secondary text-sm ml-2">管理端</span>
        </div>
        <nav className="flex-1 py-4">
          <SidebarNav />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-primary-secondary border-b-2 border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>←</span>
            <span>返回主应用</span>
          </button>
          <button
            onClick={logout}
            className="text-text-secondary hover:text-accent-red transition-colors"
          >
            退出
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/layouts/SidebarLayout.tsx
git commit -m "feat: create SidebarLayout component"
```

---

## Task 3: 创建 BottomTabBar 组件

**Files:**
- Create: `frontend/src/components/BottomTabBar.tsx`

- [ ] **Step 1: 创建 BottomTabBar.tsx**

```tsx
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/dashboard', label: '首页', icon: '🏠' },
  { path: '/history', label: '数据', icon: '📊' },
  { path: '/plans', label: '计划', icon: '📋' },
  { path: '/muscles', label: '知识', icon: '📚' },
  { path: '/profile', label: '我的', icon: '👤' },
];

export default function BottomTabBar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/chat';
    }
    if (path === '/history') {
      return location.pathname.startsWith('/history') ||
             location.pathname.startsWith('/trends') ||
             location.pathname.startsWith('/measurements');
    }
    if (path === '/muscles') {
      return location.pathname.startsWith('/muscles') ||
             location.pathname.startsWith('/exercises');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary-secondary border-t-2 border-border">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors
              ${isActive(tab.path) ? 'text-accent-orange' : 'text-text-secondary'}`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/BottomTabBar.tsx
git commit -m "feat: create BottomTabBar component"
```

---

## Task 4: 创建 SidebarNav 组件

**Files:**
- Create: `frontend/src/components/SidebarNav.tsx`

- [ ] **Step 1: 创建 SidebarNav.tsx**

```tsx
import { Link, useLocation } from 'react-router-dom';

const adminNavItems = [
  { path: '/admin/exercises', label: '动作库维护', icon: '🏋️' },
  { path: '/admin/muscles', label: '肌肉库维护', icon: '💪' },
];

export default function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-2">
      {adminNavItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded transition-colors
              ${isActive
                ? 'bg-tertiary text-accent-orange'
                : 'text-text-secondary hover:bg-tertiary hover:text-text-primary'
              }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/SidebarNav.tsx
git commit -m "feat: create SidebarNav component"
```

---

## Task 5: 重构 App.tsx 路由区分布局

**Files:**
- Modify: `frontend/src/App.tsx:83-114`

- [ ] **Step 1: 更新 App.tsx**

将 `frontend/src/App.tsx` 的路由结构改为：

```tsx
import { Component, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import BottomTabLayout from './layouts/BottomTabLayout';
import SidebarLayout from './layouts/SidebarLayout';
import ToastContainer from './components/Toast';
import AppTipBanner from './components/AppTipBanner';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import History from './pages/History';
import Trends from './pages/Trends';
import Profile from './pages/Profile';
import Plans from './pages/Plans';
import PlanGenerate from './pages/PlanGenerate';
import PlanDetail from './pages/PlanDetail';
import PlanExecute from './pages/PlanExecute';
import Muscles from './pages/Muscles';
import Exercises from './pages/Exercises';
import Measurements from './pages/Measurements';
import AdminExercises from './pages/admin/Exercises';
import AdminMuscles from './pages/admin/Muscles';
import Dashboard from './pages/Dashboard';
import Badges from './pages/Badges';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen bg-primary">
          <div className="text-accent-red font-heading text-xl">加载失败，请刷新页面</div>
        </div>
      );
    }
    return this.props.children;
  }
}

function useAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return { isAuthenticated };
}

// 用户端布局（Bottom Tab）
function UserLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <div className="min-h-screen flex flex-col">
      <AppTipBanner />
      <Outlet />
    </div>
  );
}

// 管理端布局（Sidebar）
function AdminLayout() {
  const user = useAuthStore((s) => s.user);
  if (!user?.roles?.includes('admin')) {
    return <Navigate to="/chat" />;
  }
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen bg-primary">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 用户端路由 - Bottom Tab 布局 */}
            <Route element={<UserLayout />}>
              <Route element={<BottomTabLayout />}>
                <Route path="/chat" element={<Chat />} />
                <Route path="/history" element={<History />} />
                <Route path="/trends" element={<Trends />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/plans/new" element={<PlanGenerate />} />
                <Route path="/plans/:id" element={<PlanDetail />} />
                <Route path="/plans/:id/execute" element={<PlanExecute />} />
                <Route path="/muscles" element={<Muscles />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/measurements" element={<Measurements />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/badges" element={<Badges />} />
                <Route path="/" element={<Navigate to="/chat" />} />
              </Route>
            </Route>

            {/* 管理端路由 - Sidebar 布局 */}
            <Route element={<AdminLayout />}>
              <Route element={<SidebarLayout />}>
                <Route path="/admin/exercises" element={<AdminExercises />} />
                <Route path="/admin/muscles" element={<AdminMuscles />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/App.tsx
git commit -m "refactor: restructure routes with BottomTab and Sidebar layouts"
```

---

## Task 6: 简化 Header.tsx

**Files:**
- Modify: `frontend/src/components/Header.tsx`

- [ ] **Step 1: 更新 Header.tsx**

移除页面级导航（已由 BottomTabBar 提供），只保留 Logo + 用户信息：

```tsx
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Header() {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="bg-primary-secondary border-b-2 border-border px-6 py-3">
      <div className="flex items-center justify-between">
        <Link to="/chat" className="font-heading text-2xl font-bold text-accent-orange">
          FITLC
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-text-secondary text-sm">
              {user.email}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/Header.tsx
git commit -m "refactor: simplify Header to just logo and user info"
```

---

## Task 7: History 页面添加数据子Tab逻辑

**Files:**
- Modify: `frontend/src/pages/History.tsx`

- [ ] **Step 1: 更新 History.tsx**

在 History 页面添加数据 Tab 切换（历史/趋势/围度）：

```tsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HistoryTab from '../components/tabs/HistoryTab';
import TrendsTab from '../components/tabs/TrendsTab';
import MeasurementsTab from '../components/tabs/MeasurementsTab';

type DataTab = 'history' | 'trends' | 'measurements';

export default function History() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as DataTab) || 'history';

  const setTab = (tab: DataTab) => {
    setSearchParams({ tab });
  };

  const tabs: { key: DataTab; label: string }[] = [
    { key: 'history', label: '训练历史' },
    { key: 'trends', label: '趋势分析' },
    { key: 'measurements', label: '围度记录' },
  ];

  return (
    <div className="p-4">
      {/* 子Tab切换 */}
      <div className="flex border-b-2 border-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTab(tab.key)}
            className={`px-4 py-2 font-heading uppercase tracking-wide transition-colors
              ${currentTab === tab.key
                ? 'text-accent-orange border-b-2 border-accent-orange -mb-px'
                : 'text-text-secondary hover:text-text-primary'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab内容 */}
      <div className="mt-4">
        {currentTab === 'history' && <HistoryTab />}
        {currentTab === 'trends' && <TrendsTab />}
        {currentTab === 'measurements' && <MeasurementsTab />}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 Tab 组件**

创建以下组件：
- `frontend/src/components/tabs/HistoryTab.tsx` - 从现有 History.tsx 提取
- `frontend/src/components/tabs/TrendsTab.tsx` - 从 Trends.tsx 提取
- `frontend/src/components/tabs/MeasurementsTab.tsx` - 从 Measurements.tsx 提取

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/History.tsx
git add frontend/src/components/tabs/
git commit -m "feat: add data tab switching to History page"
```

---

## Task 8: Muscles 页面添加知识子Tab逻辑

**Files:**
- Modify: `frontend/src/pages/Muscles.tsx`

- [ ] **Step 1: 更新 Muscles.tsx**

添加知识 Tab 切换（肌肉库/动作库）：

```tsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MusclesList from '../components/tabs/MusclesList';
import ExercisesList from '../components/tabs/ExercisesList';

type KnowledgeTab = 'muscles' | 'exercises';

export default function Muscles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as KnowledgeTab) || 'muscles';

  const setTab = (tab: KnowledgeTab) => {
    setSearchParams({ tab });
  };

  const tabs: { key: KnowledgeTab; label: string }[] = [
    { key: 'muscles', label: '肌肉库' },
    { key: 'exercises', label: '动作库' },
  ];

  return (
    <div className="p-4">
      {/* 子Tab切换 */}
      <div className="flex border-b-2 border-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTab(tab.key)}
            className={`px-4 py-2 font-heading uppercase tracking-wide transition-colors
              ${currentTab === tab.key
                ? 'text-accent-orange border-b-2 border-accent-orange -mb-px'
                : 'text-text-secondary hover:text-text-primary'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab内容 */}
      <div className="mt-4">
        {currentTab === 'muscles' && <MusclesList />}
        {currentTab === 'exercises' && <ExercisesList />}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 Tab 组件**

创建以下组件：
- `frontend/src/components/tabs/MusclesList.tsx` - 从 Muscles.tsx 提取
- `frontend/src/components/tabs/ExercisesList.tsx` - 从 Exercises.tsx 提取

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/Muscles.tsx
git add frontend/src/components/tabs/
git commit -m "feat: add knowledge tab switching to Muscles page"
```

---

## Task 9: Profile 页面添加徽章入口

**Files:**
- Modify: `frontend/src/pages/Profile.tsx`

- [ ] **Step 1: 更新 Profile.tsx**

在 Profile 页面添加徽章入口链接：

在现有的设置/信息区域添加徽章入口卡片：

```tsx
import { Link } from 'react-router-dom';

// 在 Profile 页面添加：
<Link
  to="/badges"
  className="flex items-center gap-3 p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
>
  <span className="text-2xl">🏆</span>
  <div>
    <div className="font-heading text-text-primary">我的徽章</div>
    <div className="text-sm text-text-secondary">查看已获得的成就</div>
  </div>
</Link>
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/pages/Profile.tsx
git commit -m "feat: add badges link to Profile page"
```

---

## Task 10: 管理端页面接入 SidebarLayout

**Files:**
- Modify: `frontend/src/pages/admin/Exercises.tsx`
- Modify: `frontend/src/pages/admin/Muscles.tsx`

- [ ] **Step 1: 更新 AdminExercises.tsx**

移除顶部的 Header 组件调用（已由 SidebarLayout 提供）：

```tsx
// 删除 import Header from '../../components/Header';
// 删除 <Header />
```

- [ ] **Step 2: 更新 AdminMuscles.tsx**

同样移除 Header 组件调用。

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/admin/Exercises.tsx frontend/src/pages/admin/Muscles.tsx
git commit -m "refactor: remove Header from admin pages (now handled by SidebarLayout)"
```

---

## 实施检查清单

- [ ] BottomTabLayout 正确渲染 Header + Outlet + BottomTabBar
- [ ] SidebarLayout 正确渲染 Sidebar + TopBar + Outlet
- [ ] BottomTabBar 5个Tab正确高亮当前页面
- [ ] SidebarNav 2个导航项正确高亮
- [ ] App.tsx 用户端路由使用 BottomTabLayout，管理端使用 SidebarLayout
- [ ] History 页面正确切换历史/趋势/围度子Tab
- [ ] Muscles 页面正确切换肌肉/动作子Tab
- [ ] Profile 页面显示徽章入口
- [ ] 管理页面不再重复渲染 Header
- [ ] 页面可正常访问，底部Tab可点击跳转
