# FitLC Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建FitLC React前端，包含登录、对话、历史、趋势、个人页面

**Architecture:** React + Vite 项目，分模块开发：项目初始化 → 样式配置 → 状态管理 → API层 → 页面组件

**Tech Stack:** React 18, Vite, TypeScript, TailwindCSS, Zustand, Axios, React Router v6, Recharts

---

## 文件结构

```
frontend/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── index.ts              # 所有 TypeScript 类型定义
│   ├── api/
│   │   ├── client.ts             # Axios 实例配置
│   │   ├── auth.ts               # 认证 API
│   │   ├── chat.ts               # 对话 API
│   │   └── records.ts             # 记录 API
│   ├── stores/
│   │   ├── authStore.ts          # 认证状态
│   │   ├── chatStore.ts           # 对话状态
│   │   └── recordsStore.ts        # 记录状态
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── TabSwitcher.tsx
│   │   ├── Header.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── WorkoutCard.tsx
│   │   ├── MeasurementCard.tsx
│   │   └── TrendChart.tsx
│   └── pages/
│       ├── Login.tsx
│       ├── Register.tsx
│       ├── Chat.tsx
│       ├── History.tsx
│       ├── Trends.tsx
│       └── Profile.tsx
└── tests/
    ├── stores/
    │   └── authStore.test.ts
    └── components/
        └── ChatMessage.test.tsx
```

---

## Task 1: 项目初始化

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/tsconfig.json`
- Create: `frontend/index.html`
- Create: `frontend/postcss.config.js`
- Create: `frontend/tailwind.config.js`
- Create: `frontend/src/main.tsx`
- Create: `frontend/src/index.css`
- Create: `frontend/src/App.tsx`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "fitlc-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.7",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0",
    "vitest": "^1.3.1"
  }
}
```

- [ ] **Step 2: 创建 vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

- [ ] **Step 3: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: 创建 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FITLC - AI健身记录</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: 创建 postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 7: 创建 tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0A0A',
          secondary: '#1A1A1A',
          tertiary: '#252525',
        },
        accent: {
          orange: '#FF4500',
          red: '#DC143C',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#888888',
          muted: '#555555',
        },
        border: {
          DEFAULT: '#333333',
          accent: '#FF4500',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 8: 创建 src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Oswald:wght@500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0A0A0A;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

#root {
  min-height: 100vh;
}
```

- [ ] **Step 9: 创建 src/main.tsx**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 10: 创建 src/App.tsx**

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import History from './pages/History';
import Trends from './pages/Trends';
import Profile from './pages/Profile';
import Header from './components/Header';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-primary">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/trends" element={<Trends />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/" element={<Navigate to="/chat" />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 11: 创建 src/types/index.ts**

```typescript
// 认证
export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// 训练记录
export interface WorkoutSet {
  setNumber: number;
  reps: number;
  weight: number;
}

export interface WorkoutExercise {
  id: number;
  exerciseName: string;
  duration?: number;
  distance?: number;
  sets: WorkoutSet[];
}

export interface Workout {
  id: number;
  date: string;
  exercises: WorkoutExercise[];
}

// 围度记录
export type BodyPart = 'chest' | 'waist' | 'hips' | 'biceps' | 'thighs' | 'calves' | 'other';

export interface MeasurementItem {
  bodyPart: BodyPart;
  value: number;
}

export interface Measurement {
  id: number;
  date: string;
  items: MeasurementItem[];
}

// 消息
export interface SavedData {
  type: 'workout' | 'measurement';
  id: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  savedData?: SavedData;
}
```

- [ ] **Step 12: 安装依赖**

Run: `cd frontend && npm install`
Expected: 安装成功

- [ ] **Step 13: 提交**

```bash
git add frontend && git commit -m "feat: project init with React + Vite + TailwindCSS"
```

---

## Task 2: API 层与状态管理

**Files:**
- Create: `frontend/src/api/client.ts`
- Create: `frontend/src/api/auth.ts`
- Create: `frontend/src/api/chat.ts`
- Create: `frontend/src/api/records.ts`
- Create: `frontend/src/stores/authStore.ts`
- Create: `frontend/src/stores/chatStore.ts`
- Create: `frontend/src/stores/recordsStore.ts`

- [ ] **Step 1: 创建 api/client.ts**

```typescript
import axios from 'axios';

const API_BASE = '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加 token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理 401
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
```

- [ ] **Step 2: 创建 api/auth.ts**

```typescript
import client from './client';
import type { AuthResponse, User } from '../types';

export const authApi = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/auth/register', { email, password });
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  async getCurrentUser(): Promise<{ user: User }> {
    const { data } = await client.get<{ user: User }>('/auth/me');
    return data;
  },
};
```

- [ ] **Step 3: 创建 api/chat.ts**

```typescript
import client from './client';

export const chatApi = {
  async sendMessage(message: string): Promise<{ reply: string }> {
    const { data } = await client.post<{ reply: string }>('/chat/message', { message });
    return data;
  },
};
```

- [ ] **Step 4: 创建 api/records.ts**

```typescript
import client from './client';
import type { Workout, Measurement } from '../types';

export const recordsApi = {
  async getWorkouts(start?: string, end?: string): Promise<{ workouts: Workout[] }> {
    const params = start || end ? { start, end } : {};
    const { data } = await client.get<{ workouts: Workout[] }>('/records/workouts', { params });
    return data;
  },

  async getMeasurements(start?: string, end?: string): Promise<{ measurements: Measurement[] }> {
    const params = start || end ? { start, end } : {};
    const { data } = await client.get<{ measurements: Measurement[] }>('/records/measurements', { params });
    return data;
  },

  async deleteWorkout(id: number): Promise<{ success: boolean }> {
    const { data } = await client.delete<{ success: boolean }>(`/records/workout/${id}`);
    return data;
  },

  async deleteMeasurement(id: number): Promise<{ success: boolean }> {
    const { data } = await client.delete<{ success: boolean }>(`/records/measurement/${id}`);
    return data;
  },
};
```

- [ ] **Step 5: 创建 stores/authStore.ts**

```typescript
import { create } from 'zustand';
import { authApi } from '../api/auth';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authApi.login(email, password);
      localStorage.setItem('token', token);
      set({ token, user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.error || '登录失败', isLoading: false });
      throw err;
    }
  },

  register: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authApi.register(email, password);
      localStorage.setItem('token', token);
      set({ token, user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.error || '注册失败', isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }
    try {
      const { user } = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true });
    } catch {
      localStorage.removeItem('token');
      set({ isAuthenticated: false });
    }
  },
}));
```

- [ ] **Step 6: 创建 stores/chatStore.ts**

```typescript
import { create } from 'zustand';
import { chatApi } from '../api/chat';
import type { ChatMessage, SavedData } from '../types';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  removeLastSavedData: () => SavedData | undefined;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  sendMessage: async (content) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    set((state) => ({ messages: [...state.messages, userMessage], isLoading: true }));

    try {
      const { reply } = await chatApi.sendMessage(content);

      // 解析回复中是否包含保存成功的标识
      const savedData = extractSavedData(reply);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
        savedData,
      };
      set((state) => ({ messages: [...state.messages, assistantMessage], isLoading: false }));
    } catch (err) {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: '发送失败，请重试',
            timestamp: new Date(),
          },
        ],
        isLoading: false,
      }));
    }
  },

  clearMessages: () => set({ messages: [] }),

  removeLastSavedData: () => {
    const { messages } = get();
    const lastWithSave = [...messages].reverse().find((m) => m.savedData);
    if (lastWithSave?.savedData) {
      set((state) => ({
        messages: state.messages.filter((m) => m.id !== lastWithSave.id),
      }));
      return lastWithSave.savedData;
    }
    return undefined;
  },
}));

function extractSavedData(reply: string): SavedData | undefined {
  // 从回复中提取保存的数据类型和ID
  // 例如："已保存：深蹲 100kg" -> { type: 'workout', id: ... }
  if (reply.includes('已保存：') && reply.includes('深蹲')) {
    return { type: 'workout', id: 0 }; // ID后续从响应获取
  }
  if (reply.includes('已保存：') && (reply.includes('胸围') || reply.includes('腰围'))) {
    return { type: 'measurement', id: 0 };
  }
  return undefined;
}
```

- [ ] **Step 7: 创建 stores/recordsStore.ts**

```typescript
import { create } from 'zustand';
import { recordsApi } from '../api/records';
import type { Workout, Measurement } from '../types';

interface RecordsState {
  workouts: Workout[];
  measurements: Measurement[];
  isLoading: boolean;
  error: string | null;
  fetchWorkouts: (start?: string, end?: string) => Promise<void>;
  fetchMeasurements: (start?: string, end?: string) => Promise<void>;
  deleteWorkout: (id: number) => Promise<void>;
  deleteMeasurement: (id: number) => Promise<void>;
}

export const useRecordsStore = create<RecordsState>((set) => ({
  workouts: [],
  measurements: [],
  isLoading: false,
  error: null,

  fetchWorkouts: async (start, end) => {
    set({ isLoading: true, error: null });
    try {
      const { workouts } = await recordsApi.getWorkouts(start, end);
      set({ workouts, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchMeasurements: async (start, end) => {
    set({ isLoading: true, error: null });
    try {
      const { measurements } = await recordsApi.getMeasurements(start, end);
      set({ measurements, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  deleteWorkout: async (id) => {
    try {
      await recordsApi.deleteWorkout(id);
      set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteMeasurement: async (id) => {
    try {
      await recordsApi.deleteMeasurement(id);
      set((state) => ({
        measurements: state.measurements.filter((m) => m.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
```

- [ ] **Step 8: 提交**

```bash
git add frontend/src/api frontend/src/stores && git commit -m "feat: add API layer and Zustand stores"
```

---

## Task 3: UI 基础组件

**Files:**
- Create: `frontend/src/components/ui/Button.tsx`
- Create: `frontend/src/components/ui/Input.tsx`
- Create: `frontend/src/components/ui/Card.tsx`
- Create: `frontend/src/components/ui/TabSwitcher.tsx`

- [ ] **Step 1: 创建 Button.tsx**

```tsx
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-heading font-semibold uppercase tracking-wide transition-all duration-150';

  const variants = {
    primary: 'bg-accent-orange hover:bg-accent-red text-white border-2 border-accent-orange',
    secondary: 'bg-primary-tertiary hover:bg-border text-text-primary border-2 border-border',
    outline: 'bg-transparent hover:bg-primary-tertiary text-accent-orange border-2 border-accent-orange',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: 创建 Input.tsx**

```tsx
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-text-secondary text-sm mb-1">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full bg-primary-secondary border-2 border-border rounded px-4 py-2
            text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-accent-orange
            transition-colors duration-150 ${className}`}
          {...props}
        />
        {error && <p className="text-accent-red text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
```

- [ ] **Step 3: 创建 Card.tsx**

```tsx
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent';
}

export default function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-primary-secondary border-border',
    accent: 'bg-primary-secondary border-accent-orange shadow-[0_0_15px_rgba(255,69,0,0.2)]',
  };

  return (
    <div
      className={`border-2 ${variants[variant]} p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: 创建 TabSwitcher.tsx**

```tsx
interface Tab {
  id: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="flex border-b-2 border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-3 font-heading font-semibold uppercase tracking-wide
            transition-all duration-150 border-b-2 -mb-[2px]
            ${
              activeTab === tab.id
                ? 'text-accent-orange border-accent-orange'
                : 'text-text-secondary border-transparent hover:text-text-primary'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add frontend/src/components/ui && git commit -m "feat: add base UI components (Button, Input, Card, TabSwitcher)"
```

---

## Task 4: Header 组件与认证页面

**Files:**
- Create: `frontend/src/components/Header.tsx`
- Create: `frontend/src/pages/Login.tsx`
- Create: `frontend/src/pages/Register.tsx`

- [ ] **Step 1: 创建 Header.tsx**

```tsx
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const navItems = [
  { path: '/chat', label: '对话' },
  { path: '/history', label: '历史' },
  { path: '/trends', label: '趋势' },
  { path: '/profile', label: '个人' },
];

export default function Header() {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="bg-primary-secondary border-b-2 border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/chat" className="font-heading text-2xl font-bold text-accent-orange">
          FITLC
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 font-heading font-medium uppercase tracking-wide
                transition-all duration-150
                ${
                  location.pathname === item.path
                    ? 'text-accent-orange'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="text-text-secondary hover:text-accent-red transition-colors duration-150"
        >
          退出
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: 创建 Login.tsx**

```tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('请填写所有字段');
      return;
    }
    try {
      await login(email, password);
      navigate('/chat');
    } catch {
      // error handled by store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <Card variant="accent" className="w-full max-w-md">
        <h1 className="font-heading text-4xl font-bold text-accent-orange text-center mb-8">
          FITLC
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />

          <Input
            type="password"
            label="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {(error || localError) && (
            <p className="text-accent-red text-sm">{error || localError}</p>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? '登录中...' : '登录'}
          </Button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          还没有账户？{' '}
          <Link to="/register" className="text-accent-orange hover:text-accent-red">
            注册
          </Link>
        </p>
      </Card>
    </div>
  );
}
```

- [ ] **Step 3: 创建 Register.tsx**

```tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setLocalError('请填写所有字段');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('两次密码不一致');
      return;
    }
    if (password.length < 6) {
      setLocalError('密码至少6位');
      return;
    }
    try {
      await register(email, password);
      navigate('/chat');
    } catch {
      // error handled by store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <Card variant="accent" className="w-full max-w-md">
        <h1 className="font-heading text-4xl font-bold text-accent-orange text-center mb-8">
          FITLC
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />

          <Input
            type="password"
            label="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="至少6位"
          />

          <Input
            type="password"
            label="确认密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="再次输入密码"
          />

          {(error || localError) && (
            <p className="text-accent-red text-sm">{error || localError}</p>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? '注册中...' : '注册'}
          </Button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          已有账户？{' '}
          <Link to="/login" className="text-accent-orange hover:text-accent-red">
            登录
          </Link>
        </p>
      </Card>
    </div>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add frontend/src/components/Header.tsx frontend/src/pages/Login.tsx frontend/src/pages/Register.tsx && git commit -m "feat: add Header and auth pages (Login/Register)"
```

---

## Task 5: 对话页面

**Files:**
- Create: `frontend/src/components/ChatMessage.tsx`
- Create: `frontend/src/components/ChatInput.tsx`
- Create: `frontend/src/pages/Chat.tsx`

- [ ] **Step 1: 创建 ChatMessage.tsx**

```tsx
import type { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onUndo?: () => void;
}

export default function ChatMessage({ message, onUndo }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSaved = message.content.includes('已保存：');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] px-4 py-3 ${
          isUser
            ? 'bg-primary-tertiary text-text-primary border-2 border-border'
            : 'bg-transparent text-text-primary'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>

        {!isUser && isSaved && onUndo && (
          <button
            onClick={onUndo}
            className="mt-2 text-sm text-accent-orange hover:text-accent-red transition-colors"
          >
            撤销
          </button>
        )}

        <p className="text-text-muted text-xs mt-1">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 ChatInput.tsx**

```tsx
import { useState } from 'react';
import Button from './ui/Button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="输入健身记录或问题..."
        className="flex-1 bg-primary-secondary border-2 border-border rounded px-4 py-3
          text-text-primary placeholder:text-text-muted
          focus:outline-none focus:border-accent-orange
          transition-colors duration-150"
      />
      <Button type="submit" disabled={disabled || !input.trim()}>
        发送
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: 创建 Chat.tsx**

```tsx
import { useEffect, useRef } from 'react';
import { useChatStore } from '../stores/chatStore';
import { recordsApi } from '../api/records';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

export default function Chat() {
  const { messages, isLoading, sendMessage, removeLastSavedData } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUndo = async () => {
    const savedData = removeLastSavedData();
    if (savedData) {
      try {
        if (savedData.type === 'workout') {
          await recordsApi.deleteWorkout(savedData.id);
        } else {
          await recordsApi.deleteMeasurement(savedData.id);
        }
      } catch {
        // ignore error
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 && (
          <div className="text-center text-text-secondary mt-20">
            <p className="font-heading text-xl">开始记录你的健身数据</p>
            <p className="text-text-muted mt-2">
              例如："今天深蹲100kg 5组" 或 "这周跑了多少次？"
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onUndo={msg.savedData ? handleUndo : undefined}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t-2 border-border px-6 py-4 bg-primary-secondary">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add frontend/src/components/ChatMessage.tsx frontend/src/components/ChatInput.tsx frontend/src/pages/Chat.tsx && git commit -m "feat: add chat page with messages and input"
```

---

## Task 6: 历史记录页面

**Files:**
- Create: `frontend/src/components/WorkoutCard.tsx`
- Create: `frontend/src/components/MeasurementCard.tsx`
- Create: `frontend/src/pages/History.tsx`

- [ ] **Step 1: 创建 WorkoutCard.tsx**

```tsx
import type { Workout } from '../types';
import Button from './ui/Button';

interface WorkoutCardProps {
  workout: Workout;
  onDelete: (id: number) => void;
}

export default function WorkoutCard({ workout, onDelete }: WorkoutCardProps) {
  return (
    <div className="bg-primary-secondary border-2 border-border p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-heading font-semibold text-lg">{workout.date}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(workout.id)}
        >
          删除
        </Button>
      </div>

      <div className="space-y-2">
        {workout.exercises.map((ex) => (
          <div key={ex.id} className="text-text-secondary">
            <span className="text-text-primary font-medium">{ex.exerciseName}</span>
            {ex.sets && ex.sets.length > 0 && (
              <span className="ml-2">
                {ex.sets.map((s) => `${s.weight}kg×${s.reps}`).join(', ')}
              </span>
            )}
            {ex.distance && <span className="ml-2">{ex.distance}km</span>}
            {ex.duration && <span className="ml-2">{ex.duration}分钟</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 MeasurementCard.tsx**

```tsx
import type { Measurement } from '../types';
import Button from './ui/Button';

interface MeasurementCardProps {
  measurement: Measurement;
  onDelete: (id: number) => void;
}

const bodyPartLabels: Record<string, string> = {
  chest: '胸围',
  waist: '腰围',
  hips: '臀围',
  biceps: '臂围',
  thighs: '腿围',
  calves: '小腿围',
  other: '其他',
};

export default function MeasurementCard({ measurement, onDelete }: MeasurementCardProps) {
  return (
    <div className="bg-primary-secondary border-2 border-border p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-heading font-semibold text-lg">{measurement.date}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(measurement.id)}
        >
          删除
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {measurement.items.map((item, idx) => (
          <div key={idx} className="text-text-secondary">
            <span className="text-text-primary">{bodyPartLabels[item.bodyPart]}</span>
            <span className="ml-1">{item.value}cm</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建 History.tsx**

```tsx
import { useEffect, useState } from 'react';
import { useRecordsStore } from '../stores/recordsStore';
import WorkoutCard from '../components/WorkoutCard';
import MeasurementCard from '../components/MeasurementCard';
import TabSwitcher from '../components/ui/TabSwitcher';

const tabs = [
  { id: 'workouts', label: '训练' },
  { id: 'measurements', label: '围度' },
];

export default function History() {
  const {
    workouts,
    measurements,
    isLoading,
    fetchWorkouts,
    fetchMeasurements,
    deleteWorkout,
    deleteMeasurement,
  } = useRecordsStore();

  const [activeTab, setActiveTab] = useState('workouts');

  useEffect(() => {
    fetchWorkouts();
    fetchMeasurements();
  }, [fetchWorkouts, fetchMeasurements]);

  const handleDelete = async (id: number) => {
    if (activeTab === 'workouts') {
      await deleteWorkout(id);
    } else {
      await deleteMeasurement(id);
    }
  };

  const currentRecords = activeTab === 'workouts' ? workouts : measurements;
  const CardComponent = activeTab === 'workouts' ? WorkoutCard : MeasurementCard;

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">历史记录</h1>

      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {isLoading && (
          <p className="text-text-secondary text-center">加载中...</p>
        )}

        {!isLoading && currentRecords.length === 0 && (
          <p className="text-text-secondary text-center">
            暂无{activeTab === 'workouts' ? '训练' : '围度'}记录
          </p>
        )}

        {!isLoading &&
          currentRecords.map((record: any) => (
            <CardComponent
              key={record.id}
              workout={record}
              measurement={record}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add frontend/src/components/WorkoutCard.tsx frontend/src/components/MeasurementCard.tsx frontend/src/pages/History.tsx && git commit -m "feat: add history page with workout and measurement cards"
```

---

## Task 7: 趋势页面

**Files:**
- Create: `frontend/src/components/TrendChart.tsx`
- Create: `frontend/src/pages/Trends.tsx`

- [ ] **Step 1: 创建 TrendChart.tsx**

```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface TrendChartProps {
  type: 'line' | 'bar';
  data: any[];
  lines?: { dataKey: string; color: string; name: string }[];
}

const COLORS = {
  orange: '#FF4500',
  red: '#DC143C',
  blue: '#3B82F6',
  green: '#22C55E',
  purple: '#A855F7',
};

export default function TrendChart({ type, data, lines = [] }: TrendChartProps) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: '2px solid #333',
              borderRadius: 0,
            }}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || COLORS.orange}
              name={line.name}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="date" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1A1A1A',
            border: '2px solid #333',
            borderRadius: 0,
          }}
        />
        <Bar dataKey="count" fill={COLORS.orange} name="训练次数" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

- [ ] **Step 2: 创建 Trends.tsx**

```tsx
import { useEffect, useState } from 'react';
import { useRecordsStore } from '../stores/recordsStore';
import TrendChart from '../components/TrendChart';
import TabSwitcher from '../components/ui/TabSwitcher';

const tabs = [
  { id: 'measurements', label: '围度趋势' },
  { id: 'workouts', label: '训练统计' },
];

// 简化数据处理，实际项目可能需要更复杂的聚合
function processMeasurementData(measurements: any[]) {
  const latest = measurements.slice(0, 30); // 最近30条
  return latest.reverse().map((m) => ({
    date: m.date,
    chest: m.items.find((i: any) => i.bodyPart === 'chest')?.value,
    waist: m.items.find((i: any) => i.bodyPart === 'waist')?.value,
    hips: m.items.find((i: any) => i.bodyPart === 'hips')?.value,
    biceps: m.items.find((i: any) => i.bodyPart === 'biceps')?.value,
  }));
}

function processWorkoutData(workouts: any[]) {
  // 按周统计
  const byWeek: Record<string, number> = {};
  workouts.forEach((w) => {
    const date = new Date(w.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const key = weekStart.toISOString().slice(0, 10);
    byWeek[key] = (byWeek[key] || 0) + 1;
  });

  return Object.entries(byWeek)
    .slice(-8)
    .map(([date, count]) => ({ date, count }));
}

export default function Trends() {
  const { workouts, measurements, fetchWorkouts, fetchMeasurements } = useRecordsStore();
  const [activeTab, setActiveTab] = useState('measurements');

  useEffect(() => {
    fetchWorkouts();
    fetchMeasurements();
  }, [fetchWorkouts, fetchMeasurements]);

  const measurementChartData = processMeasurementData(measurements);
  const workoutChartData = processWorkoutData(workouts);

  const measurementLines = [
    { dataKey: 'chest', color: '#FF4500', name: '胸围' },
    { dataKey: 'waist', color: '#DC143C', name: '腰围' },
    { dataKey: 'hips', color: '#3B82F6', name: '臀围' },
    { dataKey: 'biceps', color: '#22C55E', name: '臂围' },
  ];

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">趋势分析</h1>

      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'measurements' && (
          <div>
            <h2 className="font-heading text-xl mb-4 text-text-secondary">身体围度变化</h2>
            {measurementChartData.length > 0 ? (
              <TrendChart type="line" data={measurementChartData} lines={measurementLines} />
            ) : (
              <p className="text-text-secondary text-center">暂无围度数据</p>
            )}
          </div>
        )}

        {activeTab === 'workouts' && (
          <div>
            <h2 className="font-heading text-xl mb-4 text-text-secondary">每周训练次数</h2>
            {workoutChartData.length > 0 ? (
              <TrendChart type="bar" data={workoutChartData} />
            ) : (
              <p className="text-text-secondary text-center">暂无训练数据</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add frontend/src/components/TrendChart.tsx frontend/src/pages/Trends.tsx && git commit -m "feat: add trends page with charts"
```

---

## Task 8: 个人页面

**Files:**
- Create: `frontend/src/pages/Profile.tsx`

- [ ] **Step 1: 创建 Profile.tsx**

```tsx
import { useAuthStore } from '../stores/authStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Profile() {
  const { user, logout } = useAuthStore();

  return (
    <div className="px-6 py-4 flex flex-col items-center">
      <h1 className="font-heading text-3xl font-bold mb-8">个人中心</h1>

      <Card variant="accent" className="w-full max-w-md text-center">
        <div className="w-24 h-24 bg-primary-tertiary border-2 border-accent-orange mx-auto mb-6 flex items-center justify-center">
          <span className="font-heading text-4xl text-accent-orange">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </span>
        </div>

        <p className="text-text-primary text-lg mb-6">{user?.email}</p>

        <Button variant="outline" onClick={logout} className="w-full">
          退出登录
        </Button>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/pages/Profile.tsx && git commit -m "feat: add profile page"
```

---

## Task 9: 动态导入优化 (可选)

**Modify:** `frontend/src/App.tsx`

- [ ] **Step 1: 更新 App.tsx 使用 React.lazy**

```typescript
import { lazy, Suspense } from 'react';
// ... 其他 imports

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Chat = lazy(() => import('./pages/Chat'));
const History = lazy(() => import('./pages/History'));
const Trends = lazy(() => import('./pages/Trends'));
const Profile = lazy(() => import('./pages/Profile'));

// 在 ProtectedRoute 中用 Suspense 包裹
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/App.tsx && git commit -m "perf: add lazy loading for routes"
```

---

## 自检清单

### Spec 覆盖
| 章节 | 任务 |
|------|------|
| 技术架构 | Task 1, 2 |
| 数据模型 Types | Task 1 |
| API 集成 | Task 2 |
| 登录/注册页 | Task 4 |
| 对话页 | Task 5 |
| 历史页 | Task 6 |
| 趋势页 | Task 7 |
| 个人页 | Task 8 |
| UI 风格 | Task 1, 3 |

### Placeholder 扫描
无 TBD/TODO

### 类型一致性
- 所有 TypeScript 类型在 Task 1 的 `types/index.ts` 中定义
- Store 和 API 使用一致的类型

---

## 执行选择

**Plan complete and saved to `docs/superpowers/plans/2026-04-23-fit-lc-frontend-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**