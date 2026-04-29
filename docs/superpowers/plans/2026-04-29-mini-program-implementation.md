# FitLC 微信小程序实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建 FitLC 微信小程序，5 个 Tab + 分包结构，支持 normal 用户全功能

**Architecture:**
- Taro 4.x + React 多端小程序，主包承载 5 个 Tab 页面和基础子页面，分包(knowledge)承载动作详情、肌肉详情、计划执行
- Zustand 状态管理，与 Web 端 Store 设计一致
- 全量对接现有后端 API，新增微信登录接口和肌肉库只读接口

**Tech Stack:** Taro 4.x + React + TypeScript + Zustand + TailwindCSS

---

## 文件结构

```
mini-program/
├── src/
│   ├── app.config.ts              # Taro 全局配置（分包、Tab、窗口）
│   ├── app.tsx                   # 应用入口
│   ├── app.scss                  # 全局样式
│   ├── pages/                    # 主包页面
│   │   ├── chat/
│   │   │   └── index.tsx         # Tab: 对话
│   │   ├── records/
│   │   │   └── index.tsx         # Tab: 记录
│   │   ├── trends/
│   │   │   └── index.tsx         # Tab: 趋势
│   │   ├── exercises/
│   │   │   └── index.tsx         # Tab: 动作库
│   │   ├── plans/
│   │   │   └── index.tsx         # Tab: 计划
│   │   ├── profile/
│   │   │   └── index.tsx         # Tab: 我的
│   │   ├── settings/
│   │   │   └── index.tsx         # 设置
│   │   ├── badges/
│   │   │   └── index.tsx         # 徽章
│   │   └── calendar/
│   │       └── index.tsx         # 日历
│   ├── subpkg/                   # 分包页面
│   │   └── knowledge/
│   │       ├── exercises/
│   │       │   └── detail.tsx    # 动作详情
│   │       ├── muscles/
│   │       │   └── detail.tsx    # 肌肉详情
│   │       └── plans/
│   │           └── execute.tsx   # 计划执行
│   ├── store/                    # 状态管理
│   │   ├── auth.ts               # 认证状态
│   │   ├── chat.ts               # 对话状态
│   │   ├── records.ts            # 记录状态
│   │   └── plan.ts               # 计划状态
│   ├── api/                      # API 请求
│   │   ├── request.ts           # 请求封装
│   │   ├── auth.ts              # 认证 API
│   │   ├── chat.ts              # 对话 API
│   │   ├── records.ts           # 记录 API
│   │   ├── exercises.ts         # 动作 API
│   │   ├── muscles.ts           # 肌肉 API
│   │   ├── plans.ts             # 计划 API
│   │   └── achievements.ts      # 成就 API
│   ├── components/              # 通用组件
│   │   ├── MessageBubble/       # 消息气泡
│   │   ├── RecordCard/         # 记录卡片
│   │   ├── ExerciseCard/       # 动作卡片
│   │   ├── MuscleTree/         # 肌肉层级树
│   │   ├── TrendChart/         # 趋势图表
│   │   ├── LoadingDots/        # 加载动画
│   │   └── Celebration/         # 庆祝动画
│   └── styles/
│       └── theme.scss           # 主题变量
```

**后端新增文件：**

```
backend/src/
├── routes/auth.wechat.ts        # 微信登录路由
└── routes/muscles.readonly.ts   # 肌肉库只读路由（normal 用户）
```

---

## 前置依赖

本计划假设后端已完成以下改造：
1. `POST /api/auth/wechat` 接口已实现
2. `GET /api/muscles` 接口已实现（normal 用户可访问）
3. CORS 已配置允许小程序域名

---

## Phase 1: 项目初始化

### Task 1: 创建 Taro 项目

**Files:**
- Create: `mini-program/` (项目根目录)
- Create: `mini-program/package.json`
- Create: `mini-program/taro.config.ts`
- Create: `mini-program/tsconfig.json`

- [ ] **Step 1: 创建项目目录和 package.json**

```json
{
  "name": "fitlc-mini-program",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev:weapp": "taro build --type weapp --watch",
    "build:weapp": "taro build --type weapp"
  },
  "dependencies": {
    "@tarojs/cli": "4.x",
    "@tarojs/taro": "4.x",
    "@tarojs/plugin-framework-react": "4.x",
    "@tarojs/react": "4.x",
    "react": "^18.0.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.0",
    "marked": "^12.0.0",
    "react-markdown": "^9.0.0",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: 创建 Taro 配置**

```typescript
// mini-program/taro.config.ts
export default defineConfig({
  appId: 'your-appid',
  date: '2026-04-29',
  targets: ['weapp'],
  designWidth: 375,
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  framework: 'react',
  compilationDate: new Date().toISOString()
}
```

- [ ] **Step 3: Commit**

```bash
git add mini-program/
git commit -m "feat: scaffold Taro 4.x mini-program project"
```

---

### Task 2: 配置 app.config.ts（全局配置）

**Files:**
- Create: `mini-program/src/app.config.ts`

- [ ] **Step 1: 写入 app.config.ts**

```typescript
export default defineAppConfig({
  pages: [
    'pages/chat/index',
    'pages/records/index',
    'pages/trends/index',
    'pages/exercises/index',
    'pages/plans/index',
    'pages/profile/index',
    'pages/settings/index',
    'pages/badges/index',
    'pages/calendar/index'
  ],
  subPackages: [
    {
      root: 'subpkg/knowledge',
      pages: [
        'exercises/detail',
        'muscles/detail',
        'plans/execute'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0A0A0A',
    navigationBarTitleText: 'FitLC',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#888888',
    selectedColor: '#FF4500',
    backgroundColor: '#1A1A1A',
    borderStyle: 'black',
    list: [
      { pagePath: 'pages/chat/index', text: '对话', iconPath: 'assets/tab-chat.png', selectedIconPath: 'assets/tab-chat-active.png' },
      { pagePath: 'pages/records/index', text: '记录', iconPath: 'assets/tab-records.png', selectedIconPath: 'assets/tab-records-active.png' },
      { pagePath: 'pages/trends/index', text: '趋势', iconPath: 'assets/tab-trends.png', selectedIconPath: 'assets/tab-trends-active.png' },
      { pagePath: 'pages/exercises/index', text: '动作库', iconPath: 'assets/tab-exercises.png', selectedIconPath: 'assets/tab-exercises-active.png' },
      { pagePath: 'pages/profile/index', text: '我的', iconPath: 'assets/tab-profile.png', selectedIconPath: 'assets/tab-profile-active.png' }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '获取位置用于记录训练'
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add mini-program/src/app.config.ts
git commit -m "feat: configure app.config.ts with 5 tabs and subpackage"
```

---

## Phase 2: 主题和全局样式

### Task 3: 配置暗色主题

**Files:**
- Create: `mini-program/src/app.scss`
- Create: `mini-program/src/styles/theme.scss`

- [ ] **Step 1: 创建主题变量文件**

```scss
// mini-program/src/styles/theme.scss
$bg-primary: #0A0A0A;
$bg-secondary: #1A1A1A;
$bg-tertiary: #252525;
$accent-primary: #FF4500;
$accent-secondary: #DC143C;
$text-primary: #FFFFFF;
$text-secondary: #888888;
$border-color: #333333;
$border-radius: 4px;
```

- [ ] **Step 2: 创建全局样式**

```scss
// mini-program/src/app.scss
@import './styles/theme.scss';

page {
  background-color: $bg-primary;
  color: $text-primary;
  font-size: 28px;
  line-height: 1.5;
}

view, text {
  box-sizing: border-box;
}

.btn-primary {
  background-color: $accent-primary;
  color: $text-primary;
  border: 2px solid $accent-primary;
  border-radius: $border-radius;
  padding: 20px 40px;
  font-size: 28px;
  &:active {
    opacity: 0.8;
  }
}

.btn-outline {
  background-color: transparent;
  color: $accent-primary;
  border: 2px solid $accent-primary;
  border-radius: $border-radius;
  padding: 20px 40px;
  font-size: 28px;
}

.card {
  background-color: $bg-secondary;
  border-radius: $border-radius;
  padding: 24px;
}
```

- [ ] **Step 3: Commit**

```bash
git add mini-program/src/styles/theme.scss mini-program/src/app.scss
git commit -m "feat: add dark theme with orange accent colors"
```

---

## Phase 3: 公共模块

### Task 4: 请求封装和 API 客户端

**Files:**
- Create: `mini-program/src/api/request.ts`
- Create: `mini-program/src/api/auth.ts`
- Create: `mini-program/src/api/chat.ts`
- Create: `mini-program/src/api/records.ts`
- Create: `mini-program/src/api/exercises.ts`
- Create: `mini-program/src/api/muscles.ts`
- Create: `mini-program/src/api/plans.ts`
- Create: `mini-program/src/api/achievements.ts`

- [ ] **Step 1: 创建请求封装**

```typescript
// mini-program/src/api/request.ts
import Taro from '@tarojs/taro';
import { useAuthStore } from '../store/auth';

const BASE_URL = 'http://localhost:3000/api';

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, string>;
}

export async function request<T = any>(options: RequestOptions): Promise<T> {
  const { url, method = 'GET', data, params } = options;

  let fullUrl = `${BASE_URL}${url}`;
  if (params) {
    const queryString = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    fullUrl += `?${queryString}`;
  }

  const token = wx.getStorageSync('token');

  const header: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: fullUrl,
      method,
      data,
      header,
      success: (res) => {
        if (res.statusCode === 401) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('user');
          wx.reLaunch({ url: '/pages/chat/index' });
          reject(new Error('Unauthorized'));
          return;
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else {
          reject(new Error((res.data as any)?.message || 'Request failed'));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
```

- [ ] **Step 2: 创建 auth API**

```typescript
// mini-program/src/api/auth.ts
import { request } from './request';

export interface WechatLoginRequest {
  code: string;
}

export interface WechatLoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    avatar?: string;
  };
}

export async function wechatLogin(code: string): Promise<WechatLoginResponse> {
  return request<WechatLoginResponse>({
    url: '/auth/wechat',
    method: 'POST',
    data: { code }
  });
}

export async function getCurrentUser() {
  return request<WechatLoginResponse['user']>({
    url: '/auth/me'
  });
}
```

- [ ] **Step 3: 创建其他 API 文件**

```typescript
// mini-program/src/api/chat.ts
import { request } from './request';

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  savedData?: any;
  createdAt: string;
}

export async function getChatMessages() {
  return request<ChatMessage[]>({
    url: '/chat/messages'
  });
}

export interface SendMessageRequest {
  content: string;
}

export interface SendMessageResponse {
  message: ChatMessage;
}

export async function sendMessage(content: string): Promise<SendMessageResponse> {
  return request<SendMessageResponse>({
    url: '/chat/message',
    method: 'POST',
    data: { content }
  });
}
```

```typescript
// mini-program/src/api/records.ts
import { request } from './request';

export interface WorkoutExercise {
  id: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
  duration?: number;
  distance?: number;
}

export interface Workout {
  id: number;
  date: string;
  exercises: WorkoutExercise[];
  createdAt: string;
}

export interface MeasurementItem {
  bodyPart: string;
  value: number;
}

export interface Measurement {
  id: number;
  date: string;
  items: MeasurementItem[];
  createdAt: string;
}

export async function getWorkouts() {
  return request<Workout[]>({
    url: '/records/workouts'
  });
}

export async function getMeasurements() {
  return request<Measurement[]>({
    url: '/records/measurements'
  });
}

export async function deleteWorkout(id: number) {
  return request({
    url: `/records/workout/${id}`,
    method: 'DELETE'
  });
}

export async function deleteMeasurement(id: number) {
  return request({
    url: `/records/measurement/${id}`,
    method: 'DELETE'
  });
}

export async function restoreWorkout(id: number) {
  return request({
    url: `/records/workout/${id}/restore`,
    method: 'POST'
  });
}

export async function restoreMeasurement(id: number) {
  return request({
    url: `/records/measurement/${id}/restore`,
    method: 'POST'
  });
}
```

```typescript
// mini-program/src/api/exercises.ts
import { request } from './request';

export interface Exercise {
  id: number;
  name: string;
  category: string;
  equipment: string;
  difficulty: string;
  description?: string;
  steps?: string;
  safetyNotes?: string;
  commonMistakes?: string;
  adjustmentNotes?: string;
  exerciseType?: string;
  conversionGuide?: any;
  tags?: string[];
}

export interface ExerciseListParams {
  category?: string;
  equipment?: string;
  difficulty?: string;
  page?: number;
  pageSize?: number;
}

export async function getExercises(params?: ExerciseListParams) {
  return request<{ list: Exercise[]; total: number }>({
    url: '/exercises',
    params: params as Record<string, string>
  });
}

export async function getExerciseDetail(id: number) {
  return request<Exercise>({
    url: `/exercises/${id}`
  });
}
```

```typescript
// mini-program/src/api/muscles.ts
import { request } from './request';

export interface Muscle {
  id: number;
  name: string;
  group: string;
  parentId: number | null;
  origin?: string;
  insertion?: string;
  function?: string;
  trainingTips?: string;
  children?: Muscle[];
}

export async function getMuscles() {
  return request<Muscle[]>({
    url: '/muscles'
  });
}

export async function getMuscleDetail(id: number) {
  return request<Muscle>({
    url: `/muscles/${id}`
  });
}
```

```typescript
// mini-program/src/api/plans.ts
import { request } from './request';

export interface PlanExercise {
  id: number;
  exerciseId: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
  dayOfWeek: number;
}

export interface Plan {
  id: number;
  name: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  startDate?: string;
  exercises: PlanExercise[];
  createdAt: string;
}

export async function getPlans() {
  return request<Plan[]>({
    url: '/plans'
  });
}

export async function getPlanDetail(id: number) {
  return request<Plan>({
    url: `/plans/${id}`
  });
}

export async function activatePlan(id: number) {
  return request({
    url: `/plans/${id}/activate`,
    method: 'POST'
  });
}

export async function executePlan(planId: number, data: any) {
  return request({
    url: `/plans/${planId}/executions`,
    method: 'POST',
    data
  });
}
```

```typescript
// mini-program/src/api/achievements.ts
import { request } from './request';

export interface Stats {
  totalWorkouts: number;
  totalVolume: number;
  streakDays: number;
  weeklyWorkouts: number;
  monthlyWorkouts: number;
}

export interface MuscleVolume {
  group: string;
  name: string;
  volume: number;
  percentage: number;
}

export interface Badge {
  id: number;
  code: string;
  name: string;
  description: string;
  category: string;
  tier: string;
  achievedAt?: string;
}

export interface PersonalRecord {
  id: number;
  exerciseName: string;
  recordType: string;
  bestValue: number;
  achievedAt: string;
}

export async function getStats() {
  return request<Stats>({
    url: '/achievements/stats'
  });
}

export async function getMuscleVolume() {
  return request<MuscleVolume[]>({
    url: '/achievements/muscle-volume'
  });
}

export async function getBadges() {
  return request<Badge[]>({
    url: '/achievements/badges'
  });
}

export async function getPersonalRecords() {
  return request<PersonalRecord[]>({
    url: '/achievements/personal-records'
  });
}
```

- [ ] **Step 4: Commit**

```bash
git add mini-program/src/api/
git commit -m "feat: add API client modules for all endpoints"
```

---

### Task 5: 状态管理 Store

**Files:**
- Create: `mini-program/src/store/auth.ts`
- Create: `mini-program/src/store/chat.ts`
- Create: `mini-program/src/store/records.ts`
- Create: `mini-program/src/store/plan.ts`

- [ ] **Step 1: 创建 auth Store**

```typescript
// mini-program/src/store/auth.ts
import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  nickname: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: wx.getStorageSync('token') || null,
  user: wx.getStorageSync('user') || null,
  isLoggedIn: !!wx.getStorageSync('token'),

  setAuth: (token, user) => {
    wx.setStorageSync('token', token);
    wx.setStorageSync('user', user);
    set({ token, user, isLoggedIn: true });
  },

  clearAuth: () => {
    wx.removeStorageSync('token');
    wx.removeStorageSync('user');
    set({ token: null, user: null, isLoggedIn: false });
  }
}));
```

- [ ] **Step 2: 创建 chat Store**

```typescript
// mini-program/src/store/chat.ts
import { create } from 'zustand';
import type { ChatMessage } from '../api/chat';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateLastMessage: (message) =>
    set((state) => ({
      messages: state.messages.map((m, i) =>
        i === state.messages.length - 1 ? message : m
      )
    })),

  setLoading: (isLoading) => set({ isLoading }),

  clearMessages: () => set({ messages: [] })
}));
```

- [ ] **Step 3: 创建 records Store**

```typescript
// mini-program/src/store/records.ts
import { create } from 'zustand';
import type { Workout, Measurement } from '../api/records';

interface RecordsState {
  workouts: Workout[];
  measurements: Measurement[];
  isLoading: boolean;
  setWorkouts: (workouts: Workout[]) => void;
  setMeasurements: (measurements: Measurement[]) => void;
  setLoading: (loading: boolean) => void;
  addWorkout: (workout: Workout) => void;
  removeWorkout: (id: number) => void;
  addMeasurement: (measurement: Measurement) => void;
  removeMeasurement: (id: number) => void;
}

export const useRecordsStore = create<RecordsState>((set) => ({
  workouts: [],
  measurements: [],
  isLoading: false,

  setWorkouts: (workouts) => set({ workouts }),
  setMeasurements: (measurements) => set({ measurements }),
  setLoading: (isLoading) => set({ isLoading }),

  addWorkout: (workout) =>
    set((state) => ({ workouts: [workout, ...state.workouts] })),

  removeWorkout: (id) =>
    set((state) => ({
      workouts: state.workouts.filter((w) => w.id !== id)
    })),

  addMeasurement: (measurement) =>
    set((state) => ({ measurements: [measurement, ...state.measurements] })),

  removeMeasurement: (id) =>
    set((state) => ({
      measurements: state.measurements.filter((m) => m.id !== id)
    }))
}));
```

- [ ] **Step 4: 创建 plan Store**

```typescript
// mini-program/src/store/plan.ts
import { create } from 'zustand';
import type { Plan } from '../api/plans';

interface PlanState {
  plans: Plan[];
  currentPlan: Plan | null;
  isLoading: boolean;
  setPlans: (plans: Plan[]) => void;
  setCurrentPlan: (plan: Plan | null) => void;
  setLoading: (loading: boolean) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  plans: [],
  currentPlan: null,
  isLoading: false,

  setPlans: (plans) => set({ plans }),
  setCurrentPlan: (currentPlan) => set({ currentPlan }),
  setLoading: (isLoading) => set({ isLoading })
}));
```

- [ ] **Step 5: Commit**

```bash
git add mini-program/src/store/
git commit -m "feat: add Zustand stores for auth, chat, records, plan"
```

---

## Phase 4: 通用组件

### Task 6: 通用组件开发

**Files:**
- Create: `mini-program/src/components/LoadingDots/index.tsx`
- Create: `mini-program/src/components/Celebration/index.tsx`
- Create: `mini-program/src/components/MessageBubble/index.tsx`
- Create: `mini-program/src/components/RecordCard/index.tsx`
- Create: `mini-program/src/components/ExerciseCard/index.tsx`
- Create: `mini-program/src/components/TrendChart/index.tsx`

- [ ] **Step 1: 创建 LoadingDots 组件**

```tsx
// mini-program/src/components/LoadingDots/index.tsx
import { View, Text } from '@tarojs/components';
import './index.scss';

export default function LoadingDots() {
  return (
    <View className="loading-dots">
      <Text className="dot">·</Text>
      <Text className="dot">·</Text>
      <Text className="dot">·</Text>
    </View>
  );
}
```

```scss
// mini-program/src/components/LoadingDots/index.scss
.loading-dots {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 24px;

  .dot {
    font-size: 48px;
    color: $accent-primary;
    animation: pulse 1.4s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes pulse {
  0%, 60%, 100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}
```

- [ ] **Step 2: 创建 Celebration 庆祝动画组件**

```tsx
// mini-program/src/components/Celebration/index.tsx
import { View, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';

interface CelebrationProps {
  show: boolean;
}

export default function Celebration({ show }: CelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <View className="celebration">
      <Text className="emoji">🎉</Text>
      <Text className="title">恭喜完成首次训练！</Text>
      <Text className="subtitle">坚持记录，你就是最棒的！</Text>
    </View>
  );
}
```

```scss
// mini-program/src/components/Celebration/index.scss
.celebration {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $bg-secondary;
  border: 2px solid $accent-primary;
  border-radius: $border-radius;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 1000;

  .emoji {
    font-size: 80px;
    animation: bounce 0.6s ease infinite;
  }

  .title {
    font-size: 32px;
    color: $text-primary;
    font-weight: bold;
  }

  .subtitle {
    font-size: 24px;
    color: $text-secondary;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
```

- [ ] **Step 3: 创建 MessageBubble 消息气泡组件**

```tsx
// mini-program/src/components/MessageBubble/index.tsx
import { View, Text, RichText } from '@tarojs/components';
import { memo } from 'react';
import type { ChatMessage } from '../../api/chat';
import './index.scss';

interface MessageBubbleProps {
  message: ChatMessage;
  onUndo?: () => void;
}

function MessageBubble({ message, onUndo }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
      <View className="bubble">
        {!isUser && (
          <RichText nodes={message.content} className="content" />
        )}
        {isUser && <Text className="content">{message.content}</Text>}
        {message.savedData && !isUser && (
          <View className="saved-indicator">
            <Text className="saved-text">已保存</Text>
            {onUndo && (
              <Text className="undo-btn" onClick={onUndo}>撤销</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export default memo(MessageBubble);
```

```scss
// mini-program/src/components/MessageBubble/index.scss
.message-bubble {
  display: flex;
  margin-bottom: 24px;

  &.user {
    justify-content: flex-end;

    .bubble {
      background-color: $accent-primary;
      color: $text-primary;
      max-width: 70%;
    }
  }

  &.assistant {
    justify-content: flex-start;

    .bubble {
      background-color: $bg-secondary;
      color: $text-primary;
      max-width: 80%;
    }
  }

  .bubble {
    padding: 20px 24px;
    border-radius: $border-radius;

    .content {
      font-size: 28px;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    .saved-indicator {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid $border-color;

      .saved-text {
        font-size: 22px;
        color: $accent-primary;
      }

      .undo-btn {
        font-size: 22px;
        color: $text-secondary;
        text-decoration: underline;
      }
    }
  }
}
```

- [ ] **Step 4: 创建 RecordCard 记录卡片组件**

```tsx
// mini-program/src/components/RecordCard/index.tsx
import { View, Text } from '@tarojs/components';
import type { Workout, Measurement } from '../../api/records';
import './index.scss';

interface RecordCardProps {
  type: 'workout' | 'measurement';
  data: Workout | Measurement;
  onClick?: () => void;
}

export default function RecordCard({ type, data, onClick }: RecordCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  if (type === 'workout') {
    const workout = data as Workout;
    return (
      <View className="record-card" onClick={onClick}>
        <View className="card-header">
          <Text className="date">{formatDate(workout.date)}</Text>
        </View>
        <View className="exercises">
          {workout.exercises.map((ex, i) => (
            <Text key={i} className="exercise-tag">
              {ex.exerciseName} {ex.sets}组×{ex.reps} {ex.weight > 0 ? `${ex.weight}kg` : ''}
            </Text>
          ))}
        </View>
      </View>
    );
  }

  const measurement = data as Measurement;
  return (
    <View className="record-card" onClick={onClick}>
      <View className="card-header">
        <Text className="date">{formatDate(measurement.date)}</Text>
      </View>
      <View className="measurements">
        {measurement.items.map((item, i) => (
          <Text key={i} className="measurement-tag">
            {item.bodyPart} {item.value}cm
          </Text>
        ))}
      </View>
    </View>
  );
}
```

```scss
// mini-program/src/components/RecordCard/index.scss
.record-card {
  background-color: $bg-secondary;
  border-radius: $border-radius;
  padding: 24px;
  margin-bottom: 16px;

  .card-header {
    margin-bottom: 16px;

    .date {
      font-size: 26px;
      color: $text-secondary;
    }
  }

  .exercises, .measurements {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .exercise-tag, .measurement-tag {
      background-color: $bg-tertiary;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 24px;
      color: $text-primary;
    }
  }
}
```

- [ ] **Step 5: 创建 ExerciseCard 动作卡片组件**

```tsx
// mini-program/src/components/ExerciseCard/index.tsx
import { View, Text } from '@tarojs/components';
import type { Exercise } from '../../api/exercises';
import './index.scss';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

export default function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <View className="exercise-card" onClick={onClick}>
      <View className="card-body">
        <Text className="name">{exercise.name}</Text>
        <View className="tags">
          <Text className="tag category">{exercise.category}</Text>
          <Text className="tag equipment">{exercise.equipment}</Text>
          <Text className="tag difficulty">{exercise.difficulty}</Text>
        </View>
      </View>
    </View>
  );
}
```

```scss
// mini-program/src/components/ExerciseCard/index.scss
.exercise-card {
  background-color: $bg-secondary;
  border-radius: $border-radius;
  padding: 24px;
  margin-bottom: 16px;

  .card-body {
    .name {
      display: block;
      font-size: 30px;
      color: $text-primary;
      margin-bottom: 16px;
    }

    .tags {
      display: flex;
      gap: 12px;

      .tag {
        padding: 6px 14px;
        border-radius: 4px;
        font-size: 22px;

        &.category {
          background-color: rgba($accent-primary, 0.2);
          color: $accent-primary;
        }

        &.equipment {
          background-color: $bg-tertiary;
          color: $text-secondary;
        }

        &.difficulty {
          background-color: $bg-tertiary;
          color: $text-secondary;
        }
      }
    }
  }
}
```

- [ ] **Step 6: 创建 TrendChart 趋势图表组件**

```tsx
// mini-program/src/components/TrendChart/index.tsx
import { View, Text } from '@tarojs/components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Cell, Legend } from 'recharts';
import './index.scss';

const COLORS = ['#FF4500', '#DC143C', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

interface TrendChartProps {
  type: 'line' | 'bar' | 'pie';
  data: any[];
  dataKey?: string;
  xAxisKey?: string;
}

export default function TrendChart({ type, data, dataKey, xAxisKey }: TrendChartProps) {
  if (type === 'line') {
    return (
      <View className="trend-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis dataKey={xAxisKey || 'date'} stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333333' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Line type="monotone" dataKey={dataKey || 'value'} stroke="#FF4500" strokeWidth={2} dot={{ fill: '#FF4500' }} />
          </LineChart>
        </ResponsiveContainer>
      </View>
    );
  }

  if (type === 'bar') {
    return (
      <View className="trend-chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis dataKey={xAxisKey || 'week'} stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333333' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Bar dataKey={dataKey || 'count'} fill="#FF4500" />
          </BarChart>
        </ResponsiveContainer>
      </View>
    );
  }

  if (type === 'pie') {
    return (
      <View className="trend-chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#888888"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333333' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </View>
    );
  }

  return null;
}
```

```scss
// mini-program/src/components/TrendChart/index.scss
.trend-chart {
  width: 100%;
  background-color: $bg-secondary;
  border-radius: $border-radius;
  padding: 24px;
}
```

- [ ] **Step 7: Commit**

```bash
git add mini-program/src/components/
git commit -m "feat: add common components - LoadingDots, Celebration, MessageBubble, RecordCard, ExerciseCard, TrendChart"
```

---

## Phase 5: 主包页面（Tab 页）

### Task 7: 对话页 (chat/index)

**Files:**
- Create: `mini-program/src/pages/chat/index.tsx`
- Create: `mini-program/src/pages/chat/index.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/pages/chat/index.tsx
import { View, ScrollView, Text, Input, Button } from '@tarojs/components';
import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../../store/chat';
import { useAuthStore } from '../../store/auth';
import { useRecordsStore } from '../../store/records';
import { getChatMessages, sendMessage } from '../../api/chat';
import { getStats } from '../../api/achievements';
import MessageBubble from '../../components/MessageBubble';
import LoadingDots from '../../components/LoadingDots';
import Celebration from '../../components/Celebration';
import './index.scss';

export default function ChatPage() {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<any>(null);
  const { messages, setMessages, addMessage, setLoading, isLoading } = useChatStore();
  const { isLoggedIn } = useAuthStore();
  const { addWorkout, addMeasurement } = useRecordsStore();
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      handleWechatLogin();
    } else {
      loadMessages();
      checkFirstWorkout();
    }
  }, [isLoggedIn]);

  const handleWechatLogin = async () => {
    try {
      const { wechatLogin, setAuth } = await import('../../api/auth');
      const loginRes = await Taro.login();
      const result = await wechatLogin(loginRes.code);
      setAuth(result.token, result.user);
      loadMessages();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const msgs = await getChatMessages();
      setMessages(msgs);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkFirstWorkout = async () => {
    try {
      const stats = await getStats();
      if (stats.totalWorkouts === 1) {
        setShowCelebration(true);
      }
    } catch (err) {
      console.error('Failed to check stats:', err);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user' as const,
      content: inputValue,
      createdAt: new Date().toISOString()
    };

    addMessage(userMessage);
    setInputValue('');
    setLoading(true);

    try {
      addMessage({
        id: Date.now() + 1,
        role: 'assistant',
        content: '正在思考...',
        createdAt: new Date().toISOString()
      });

      const result = await sendMessage(inputValue);
      const finalMessage = result.message;

      // Update the "thinking" message with actual response
      useChatStore.getState().updateLastMessage(finalMessage);

      // If saved data came back, add to records
      if (finalMessage.savedData) {
        if (finalMessage.savedData.type === 'workout') {
          addWorkout(finalMessage.savedData.workout);
        } else if (finalMessage.savedData.type === 'measurement') {
          addMeasurement(finalMessage.savedData.measurement);
        }
      }
    } catch (err) {
      useChatStore.getState().updateLastMessage({
        id: Date.now(),
        role: 'assistant',
        content: '抱歉，服务出错了，请稍后重试。',
        createdAt: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = async (messageId: number) => {
    // Call delete API and remove from store
    console.log('Undo for message:', messageId);
  };

  return (
    <View className="chat-page">
      <ScrollView
        className="messages"
        scrollWithAnimation
        scrollTop={999999}
        ref={scrollRef}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onUndo={msg.savedData ? () => handleUndo(msg.id) : undefined}
          />
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <View className="loading-wrapper">
            <LoadingDots />
          </View>
        )}
      </ScrollView>

      <View className="input-area">
        <Input
          className="input"
          type="text"
          placeholder="描述你的训练或围度..."
          placeholderClass="input-placeholder"
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
          onConfirm={handleSend}
        />
        <Button className="send-btn" onClick={handleSend} disabled={isLoading}>
          发送
        </Button>
      </View>

      <Celebration show={showCelebration} />
    </View>
  );
}
```

- [ ] **Step 2: 创建页面样式**

```scss
// mini-program/src/pages/chat/index.scss
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $bg-primary;

  .messages {
    flex: 1;
    padding: 24px;
    overflow-y: auto;

    .loading-wrapper {
      display: flex;
      justify-content: flex-start;
    }
  }

  .input-area {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
    background-color: $bg-secondary;
    border-top: 1px solid $border-color;

    .input {
      flex: 1;
      background-color: $bg-tertiary;
      border-radius: $border-radius;
      padding: 16px 20px;
      font-size: 28px;
      color: $text-primary;

      &.input-placeholder {
        color: $text-secondary;
      }
    }

    .send-btn {
      background-color: $accent-primary;
      color: $text-primary;
      border: none;
      border-radius: $border-radius;
      padding: 16px 32px;
      font-size: 28px;

      &:active {
        opacity: 0.8;
      }

      &[disabled] {
        opacity: 0.5;
      }
    }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add mini-program/src/pages/chat/
git commit -m "feat: implement chat page with message list, input, and loading states"
```

---

### Task 8: 记录页 (records/index)

**Files:**
- Create: `mini-program/src/pages/records/index.tsx`
- Create: `mini-program/src/pages/records/index.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/pages/records/index.tsx
import { View, Text, ScrollView, Button } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useRecordsStore } from '../../store/records';
import { getWorkouts, getMeasurements } from '../../api/records';
import RecordCard from '../../components/RecordCard';
import './index.scss';

type TabType = 'workout' | 'measurement';

export default function RecordsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('workout');
  const { workouts, measurements, setWorkouts, setMeasurements, setLoading, isLoading } = useRecordsStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [workoutData, measurementData] = await Promise.all([
        getWorkouts(),
        getMeasurements()
      ]);
      setWorkouts(workoutData);
      setMeasurements(measurementData);
    } catch (err) {
      console.error('Failed to load records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFabClick = () => {
    wx.switchTab({ url: '/pages/chat/index' });
  };

  const renderEmptyState = () => (
    <View className="empty-state">
      <Text className="empty-title">还没有记录</Text>
      <Text className="empty-desc">试试说："今天深蹲 80kg 做了 5 组"</Text>
      <Button className="start-btn" onClick={handleFabClick}>
        去记录
      </Button>
    </View>
  );

  const renderWorkoutList = () => {
    if (workouts.length === 0) return renderEmptyState();

    // Group by date
    const grouped = workouts.reduce((acc, workout) => {
      const date = workout.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(workout);
      return acc;
    }, {} as Record<string, typeof workouts>);

    return Object.entries(grouped).map(([date, records]) => (
      <View key={date} className="date-group">
        <Text className="date-label">{date}</Text>
        {records.map((workout) => (
          <RecordCard key={workout.id} type="workout" data={workout} />
        ))}
      </View>
    ));
  };

  const renderMeasurementList = () => {
    if (measurements.length === 0) return renderEmptyState();

    const grouped = measurements.reduce((acc, measurement) => {
      const date = measurement.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(measurement);
      return acc;
    }, {} as Record<string, typeof measurements>);

    return Object.entries(grouped).map(([date, records]) => (
      <View key={date} className="date-group">
        <Text className="date-label">{date}</Text>
        {records.map((measurement) => (
          <RecordCard key={measurement.id} type="measurement" data={measurement} />
        ))}
      </View>
    ));
  };

  return (
    <View className="records-page">
      <View className="tab-header">
        <View
          className={`tab ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <Text>训练</Text>
        </View>
        <View
          className={`tab ${activeTab === 'measurement' ? 'active' : ''}`}
          onClick={() => setActiveTab('measurement')}
        >
          <Text>围度</Text>
        </View>
      </View>

      <ScrollView className="records-list" scrollY>
        {activeTab === 'workout' ? renderWorkoutList() : renderMeasurementList()}
      </ScrollView>

      <Button className="fab" onClick={handleFabClick}>+</Button>
    </View>
  );
}
```

- [ ] **Step 2: 创建页面样式**

```scss
// mini-program/src/pages/records/index.scss
.records-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $bg-primary;

  .tab-header {
    display: flex;
    background-color: $bg-secondary;
    padding: 16px;

    .tab {
      flex: 1;
      text-align: center;
      padding: 16px 0;
      color: $text-secondary;
      font-size: 28px;
      border-bottom: 2px solid transparent;

      &.active {
        color: $accent-primary;
        border-bottom-color: $accent-primary;
      }
    }
  }

  .records-list {
    flex: 1;
    padding: 24px;
    overflow-y: auto;

    .date-group {
      margin-bottom: 32px;

      .date-label {
        display: block;
        font-size: 24px;
        color: $text-secondary;
        margin-bottom: 16px;
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 50px;

    .empty-title {
      font-size: 32px;
      color: $text-primary;
      margin-bottom: 16px;
    }

    .empty-desc {
      font-size: 26px;
      color: $text-secondary;
      text-align: center;
      margin-bottom: 40px;
    }

    .start-btn {
      background-color: $accent-primary;
      color: $text-primary;
      border: none;
      border-radius: $border-radius;
      padding: 20px 60px;
    }
  }

  .fab {
    position: fixed;
    right: 32px;
    bottom: 32px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: $accent-primary;
    color: $text-primary;
    font-size: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba($accent-primary, 0.4);
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add mini-program/src/pages/records/
git commit -m "feat: implement records page with workout/measurement tabs and empty state"
```

---

### Task 9: 趋势页 (trends/index)

**Files:**
- Create: `mini-program/src/pages/trends/index.tsx`
- Create: `mini-program/src/pages/trends/index.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/pages/trends/index.tsx
import { View, Text, ScrollView, Picker } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { getStats, getMuscleVolume } from '../../api/achievements';
import { getMeasurements } from '../../api/records';
import TrendChart from '../../components/TrendChart';
import './index.scss';

type TrendTab = 'measurement' | 'workout';
type BodyPart = 'chest' | 'waist' | 'hips' | 'biceps' | 'thighs' | 'calves';
type TimeRange = '30' | '90' | '180' | '365' | 'all';

const BODY_PARTS: { label: string; value: BodyPart }[] = [
  { label: '胸围', value: 'chest' },
  { label: '腰围', value: 'waist' },
  { label: '臀围', value: 'hips' },
  { label: '臂围', value: 'biceps' },
  { label: '腿围', value: 'thighs' },
  { label: '小腿围', value: 'calves' }
];

const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: '30天', value: '30' },
  { label: '90天', value: '90' },
  { label: '6个月', value: '180' },
  { label: '1年', value: '365' },
  { label: '全部', value: 'all' }
];

export default function TrendsPage() {
  const [activeTab, setActiveTab] = useState<TrendTab>('measurement');
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('chest');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('90');
  const [stats, setStats] = useState<any>(null);
  const [muscleVolume, setMuscleVolume] = useState<any[]>([]);
  const [measurementHistory, setMeasurementHistory] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      const [statsData, volumeData, measurementsData] = await Promise.all([
        getStats(),
        getMuscleVolume(),
        getMeasurements()
      ]);
      setStats(statsData);
      setMuscleVolume(volumeData);
      setMeasurementHistory(measurementsData);
    } catch (err) {
      console.error('Failed to load trends data:', err);
    }
  };

  const getMeasurementTrendData = () => {
    const now = Date.now();
    const rangeDays = selectedTimeRange === 'all' ? 9999 : parseInt(selectedTimeRange);
    const cutoff = now - rangeDays * 24 * 60 * 60 * 1000;

    return measurementHistory
      .filter((m) => new Date(m.date).getTime() > cutoff)
      .map((m) => {
        const item = m.items.find((i: any) => i.bodyPart === selectedBodyPart);
        return {
          date: m.date,
          value: item?.value || 0
        };
      })
      .filter((d) => d.value > 0);
  };

  const getWorkoutTrendData = () => {
    // Weekly workout count for the last N weeks
    const weeks = selectedTimeRange === '30' ? 4 : selectedTimeRange === '90' ? 12 : 52;
    return Array.from({ length: weeks }, (_, i) => ({
      week: `第${i + 1}周`,
      count: Math.floor(Math.random() * 7) // TODO: calculate from actual data
    }));
  };

  const getMuscleVolumeData = () => {
    return muscleVolume.map((mv) => ({
      name: mv.name,
      value: mv.volume
    }));
  };

  return (
    <View className="trends-page">
      <View className="tab-header">
        <View
          className={`tab ${activeTab === 'measurement' ? 'active' : ''}`}
          onClick={() => setActiveTab('measurement')}
        >
          <Text>围度趋势</Text>
        </View>
        <View
          className={`tab ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <Text>训练统计</Text>
        </View>
      </View>

      <ScrollView className="content" scrollY>
        {activeTab === 'measurement' && (
          <View className="trend-section">
            <View className="selectors">
              <Picker
                mode="selector"
                range={BODY_PARTS}
                rangeKey="label"
                onChange={(e) => setSelectedBodyPart(BODY_PARTS[e.detail.value].value)}
              >
                <View className="picker">
                  <Text>{BODY_PARTS.find((p) => p.value === selectedBodyPart)?.label}</Text>
                  <Text className="arrow">▼</Text>
                </View>
              </Picker>
              <Picker
                mode="selector"
                range={TIME_RANGES}
                rangeKey="label"
                onChange={(e) => setSelectedTimeRange(TIME_RANGES[e.detail.value].value)}
              >
                <View className="picker">
                  <Text>{TIME_RANGES.find((t) => t.value === selectedTimeRange)?.label}</Text>
                  <Text className="arrow">▼</Text>
                </View>
              </Picker>
            </View>
            <TrendChart type="line" data={getMeasurementTrendData()} dataKey="value" xAxisKey="date" />
          </View>
        )}

        {activeTab === 'workout' && (
          <View className="trend-section">
            <Text className="section-title">每周训练次数</Text>
            <TrendChart type="bar" data={getWorkoutTrendData()} dataKey="count" xAxisKey="week" />

            <Text className="section-title">肌肉群训练量</Text>
            <TrendChart type="pie" data={getMuscleVolumeData()} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
```

- [ ] **Step 2: 创建页面样式**

```scss
// mini-program/src/pages/trends/index.scss
.trends-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $bg-primary;

  .tab-header {
    display: flex;
    background-color: $bg-secondary;
    padding: 16px;

    .tab {
      flex: 1;
      text-align: center;
      padding: 16px 0;
      color: $text-secondary;
      font-size: 28px;
      border-bottom: 2px solid transparent;

      &.active {
        color: $accent-primary;
        border-bottom-color: $accent-primary;
      }
    }
  }

  .content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;

    .trend-section {
      .section-title {
        display: block;
        font-size: 28px;
        color: $text-primary;
        margin-bottom: 16px;
        margin-top: 32px;

        &:first-child {
          margin-top: 0;
        }
      }

      .selectors {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;

        .picker {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: $bg-secondary;
          padding: 16px 24px;
          border-radius: $border-radius;
          color: $text-primary;
          font-size: 26px;

          .arrow {
            color: $text-secondary;
            font-size: 20px;
          }
        }
      }
    }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add mini-program/src/pages/trends/
git commit -m "feat: implement trends page with measurement/workout tabs and charts"
```

---

### Task 10: 动作库页 (exercises/index)

**Files:**
- Create: `mini-program/src/pages/exercises/index.tsx`
- Create: `mini-program/src/pages/exercises/index.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/pages/exercises/index.tsx
import { View, Text, ScrollView, Input } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { getExercises, getMuscles, type Exercise, type Muscle } from '../../api';
import ExerciseCard from '../../components/ExerciseCard';
import './index.scss';

type TabType = 'exercises' | 'muscles';

const CATEGORIES = ['全部', '胸', '背', '腿', '肩', '臂', '核心'];
const EQUIPMENTS = ['全部', '杠铃', '哑铃', '龙门架', '器械', '自重'];
const DIFFICULTIES = ['全部', '入门', '中级', '高级'];

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('exercises');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedEquipment, setSelectedEquipment] = useState('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState('全部');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'exercises') {
      loadExercises();
    }
  }, [selectedCategory, selectedEquipment, selectedDifficulty]);

  const loadData = async () => {
    if (activeTab === 'exercises') {
      loadExercises();
    } else {
      loadMuscles();
    }
  };

  const loadExercises = async () => {
    setIsLoading(true);
    try {
      const params: any = {};
      if (selectedCategory !== '全部') params.category = selectedCategory;
      if (selectedEquipment !== '全部') params.equipment = selectedEquipment;
      if (selectedDifficulty !== '全部') params.difficulty = selectedDifficulty;

      const result = await getExercises(params);
      setExercises(result.list);
    } catch (err) {
      console.error('Failed to load exercises:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMuscles = async () => {
    setIsLoading(true);
    try {
      const data = await getMuscles();
      // Build tree structure
      const rootMuscles = data.filter((m) => m.parentId === null);
      const musclesWithChildren = rootMuscles.map((root) => ({
        ...root,
        children: data.filter((m) => m.parentId === root.id)
      }));
      setMuscles(musclesWithChildren);
    } catch (err) {
      console.error('Failed to load muscles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseClick = (exercise: Exercise) => {
    wx.navigateTo({ url: `/subpkg/knowledge/exercises/detail?id=${exercise.id}` });
  };

  const handleMuscleClick = (muscle: Muscle) => {
    wx.navigateTo({ url: `/subpkg/knowledge/muscles/detail?id=${muscle.id}` });
  };

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const renderExercisesTab = () => (
    <View className="exercises-tab">
      <ScrollView className="filters" scrollX>
        <View className="filter-row">
          <Text className="filter-label">肌肉群:</Text>
          {CATEGORIES.map((cat) => (
            <View
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <Text>{cat}</Text>
            </View>
          ))}
        </View>
        <View className="filter-row">
          <Text className="filter-label">器械:</Text>
          {EQUIPMENTS.map((eq) => (
            <View
              key={eq}
              className={`filter-chip ${selectedEquipment === eq ? 'active' : ''}`}
              onClick={() => setSelectedEquipment(eq)}
            >
              <Text>{eq}</Text>
            </View>
          ))}
        </View>
        <View className="filter-row">
          <Text className="filter-label">难度:</Text>
          {DIFFICULTIES.map((diff) => (
            <View
              key={diff}
              className={`filter-chip ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              <Text>{diff}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <ScrollView className="exercise-list" scrollY>
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onClick={() => handleExerciseClick(exercise)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderMusclesTab = () => (
    <ScrollView className="muscle-list" scrollY>
      {muscles.map((muscleGroup) => (
        <View key={muscleGroup.id} className="muscle-group">
          <View
            className="group-header"
            onClick={() => toggleGroup(muscleGroup.name)}
          >
            <Text className="group-name">{muscleGroup.name}</Text>
            <Text className={`expand-icon ${expandedGroups.has(muscleGroup.name) ? 'expanded' : ''}`}>
              ▶
            </Text>
          </View>
          {expandedGroups.has(muscleGroup.name) && (
            <View className="muscle-children">
              {muscleGroup.children?.map((muscle) => (
                <View
                  key={muscle.id}
                  className="muscle-item"
                  onClick={() => handleMuscleClick(muscle)}
                >
                  <Text>{muscle.name}</Text>
                  <Text className="arrow">›</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View className="exercises-page">
      <View className="tab-header">
        <View
          className={`tab ${activeTab === 'exercises' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
          <Text>动作库</Text>
        </View>
        <View
          className={`tab ${activeTab === 'muscles' ? 'active' : ''}`}
          onClick={() => setActiveTab('muscles')}
        >
          <Text>肌肉库</Text>
        </View>
      </View>

      {activeTab === 'exercises' ? renderExercisesTab() : renderMusclesTab()}
    </View>
  );
}
```

- [ ] **Step 2: 创建页面样式**

```scss
// mini-program/src/pages/exercises/index.scss
.exercises-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $bg-primary;

  .tab-header {
    display: flex;
    background-color: $bg-secondary;
    padding: 16px;

    .tab {
      flex: 1;
      text-align: center;
      padding: 16px 0;
      color: $text-secondary;
      font-size: 28px;
      border-bottom: 2px solid transparent;

      &.active {
        color: $accent-primary;
        border-bottom-color: $accent-primary;
      }
    }
  }

  .exercises-tab {
    display: flex;
    flex-direction: column;
    flex: 1;

    .filters {
      background-color: $bg-secondary;
      padding: 16px 24px;

      .filter-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        overflow-x: auto;
        white-space: nowrap;

        &:last-child {
          margin-bottom: 0;
        }

        .filter-label {
          font-size: 24px;
          color: $text-secondary;
          flex-shrink: 0;
        }

        .filter-chip {
          padding: 8px 20px;
          background-color: $bg-tertiary;
          border-radius: 4px;
          font-size: 24px;
          color: $text-primary;
          flex-shrink: 0;

          &.active {
            background-color: $accent-primary;
          }
        }
      }
    }

    .exercise-list {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
  }

  .muscle-list {
    flex: 1;
    padding: 24px;
    overflow-y: auto;

    .muscle-group {
      margin-bottom: 16px;

      .group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $bg-secondary;
        padding: 24px;
        border-radius: $border-radius;

        .group-name {
          font-size: 30px;
          color: $text-primary;
          font-weight: bold;
        }

        .expand-icon {
          font-size: 24px;
          color: $text-secondary;
          transition: transform 0.2s;

          &.expanded {
            transform: rotate(90deg);
          }
        }
      }

      .muscle-children {
        margin-top: 8px;

        .muscle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: $bg-tertiary;
          padding: 20px 24px;
          margin-bottom: 8px;
          border-radius: $border-radius;

          Text {
            font-size: 28px;
            color: $text-primary;
          }

          .arrow {
            color: $text-secondary;
            font-size: 32px;
          }
        }
      }
    }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add mini-program/src/pages/exercises/
git commit -m "feat: implement exercises page with exercises/muscles tabs and filters"
```

---

### Task 11: 我的页 (profile/index)

**Files:**
- Create: `mini-program/src/pages/profile/index.tsx`
- Create: `mini-program/src/pages/profile/index.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/pages/profile/index.tsx
import { View, Text, Image, Button } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import { usePlanStore } from '../../store/plan';
import { getStats } from '../../api/achievements';
import { getPlans } from '../../api/plans';
import './index.scss';

interface Stats {
  totalWorkouts: number;
  streakDays: number;
}

export default function ProfilePage() {
  const { user, clearAuth } = useAuthStore();
  const { plans, setPlans, setCurrentPlan } = usePlanStore();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, plansData] = await Promise.all([
        getStats(),
        getPlans()
      ]);
      setStats(statsData);
      setPlans(plansData);

      // Set current active plan
      const activePlan = plansData.find((p: any) => p.status === 'active');
      if (activePlan) setCurrentPlan(activePlan);
    } catch (err) {
      console.error('Failed to load profile data:', err);
    }
  };

  const handleLogout = () => {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          clearAuth();
          wx.reLaunch({ url: '/pages/chat/index' });
        }
      }
    });
  };

  const handlePlanClick = (plan: any) => {
    setCurrentPlan(plan);
    wx.navigateTo({ url: '/subpkg/knowledge/plans/execute?id=${plan.id}' });
  };

  const activePlan = plans.find((p: any) => p.status === 'active');

  return (
    <ScrollView className="profile-page" scrollY>
      <View className="user-card">
        <Image
          className="avatar"
          src={user?.avatar || 'https://via.placeholder.com/120'}
          mode="aspectFill"
        />
        <View className="user-info">
          <Text className="nickname">{user?.nickname || '用户'}</Text>
          <Text className="stats">累计训练 {stats?.totalWorkouts || 0} 次</Text>
        </View>
      </View>

      <View className="streak-card" onClick={() => wx.navigateTo({ url: '/pages/calendar/index' })}>
        <View className="streak-info">
          <Text className="streak-number">{stats?.streakDays || 0}</Text>
          <Text className="streak-label">连续打卡天数</Text>
        </View>
        <Text className="arrow">›</Text>
      </View>

      <View className="section">
        <Text className="section-title">健身计划</Text>
        {activePlan ? (
          <View className="current-plan" onClick={() => handlePlanClick(activePlan)}>
            <View className="plan-info">
              <Text className="plan-name">{activePlan.name}</Text>
              <View className="progress-bar">
                <View className="progress-fill" style={{ width: '30%' }} />
              </View>
            </View>
            <Button className="start-btn">开始执行</Button>
          </View>
        ) : (
          <View className="empty-plan">
            <Text className="empty-text">还没有计划</Text>
            <Button className="create-btn" onClick={() => wx.switchTab({ url: '/pages/chat/index' })}>
              AI 生成计划
            </Button>
          </View>
        )}

        {plans.filter((p: any) => p.status !== 'active').length > 0 && (
          <View className="plan-list">
            {plans
              .filter((p: any) => p.status !== 'active')
              .map((plan: any) => (
                <View
                  key={plan.id}
                  className="plan-item"
                  onClick={() => handlePlanClick(plan)}
                >
                  <Text className="plan-name">{plan.name}</Text>
                  <Text className="arrow">›</Text>
                </View>
              ))}
          </View>
        )}
      </View>

      <View className="section">
        <Text className="section-title">快捷入口</Text>
        <View className="quick-links">
          <View className="link-item" onClick={() => wx.navigateTo({ url: '/pages/calendar/index' })}>
            <Text>日历</Text>
            <Text className="arrow">›</Text>
          </View>
          <View className="link-item" onClick={() => wx.navigateTo({ url: '/pages/badges/index' })}>
            <Text>徽章</Text>
            <Text className="arrow">›</Text>
          </View>
          <View className="link-item" onClick={() => wx.navigateTo({ url: '/pages/settings/index' })}>
            <Text>设置</Text>
            <Text className="arrow">›</Text>
          </View>
        </View>
      </View>

      <Button className="logout-btn" onClick={handleLogout}>
        退出登录
      </Button>
    </ScrollView>
  );
}
```

- [ ] **Step 2: 创建页面样式**

```scss
// mini-program/src/pages/profile/index.scss
.profile-page {
  height: 100vh;
  background-color: $bg-primary;
  padding: 24px;

  .user-card {
    display: flex;
    align-items: center;
    gap: 24px;
    background-color: $bg-secondary;
    padding: 32px;
    border-radius: $border-radius;
    margin-bottom: 24px;

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    .user-info {
      .nickname {
        display: block;
        font-size: 36px;
        color: $text-primary;
        font-weight: bold;
        margin-bottom: 12px;
      }

      .stats {
        font-size: 26px;
        color: $text-secondary;
      }
    }
  }

  .streak-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $bg-secondary;
    padding: 32px;
    border-radius: $border-radius;
    margin-bottom: 24px;

    .streak-info {
      .streak-number {
        display: block;
        font-size: 60px;
        color: $accent-primary;
        font-weight: bold;
      }

      .streak-label {
        font-size: 26px;
        color: $text-secondary;
      }
    }

    .arrow {
      font-size: 40px;
      color: $text-secondary;
    }
  }

  .section {
    margin-bottom: 32px;

    .section-title {
      display: block;
      font-size: 28px;
      color: $text-secondary;
      margin-bottom: 16px;
      padding-left: 8px;
    }

    .current-plan {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $bg-secondary;
      padding: 24px;
      border-radius: $border-radius;

      .plan-info {
        flex: 1;

        .plan-name {
          display: block;
          font-size: 30px;
          color: $text-primary;
          margin-bottom: 16px;
        }

        .progress-bar {
          height: 8px;
          background-color: $bg-tertiary;
          border-radius: 4px;

          .progress-fill {
            height: 100%;
            background-color: $accent-primary;
            border-radius: 4px;
          }
        }
      }

      .start-btn {
        background-color: $accent-primary;
        color: $text-primary;
        border: none;
        border-radius: $border-radius;
        padding: 16px 32px;
        font-size: 26px;
        margin-left: 24px;
      }
    }

    .empty-plan {
      background-color: $bg-secondary;
      padding: 40px;
      border-radius: $border-radius;
      text-align: center;

      .empty-text {
        display: block;
        font-size: 28px;
        color: $text-secondary;
        margin-bottom: 24px;
      }

      .create-btn {
        background-color: $accent-primary;
        color: $text-primary;
        border: none;
        border-radius: $border-radius;
        padding: 16px 40px;
        font-size: 28px;
      }
    }

    .plan-list {
      margin-top: 16px;

      .plan-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $bg-secondary;
        padding: 24px;
        border-radius: $border-radius;
        margin-bottom: 12px;

        .plan-name {
          font-size: 28px;
          color: $text-primary;
        }

        .arrow {
          font-size: 32px;
          color: $text-secondary;
        }
      }
    }

    .quick-links {
      background-color: $bg-secondary;
      border-radius: $border-radius;

      .link-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        border-bottom: 1px solid $border-color;

        &:last-child {
          border-bottom: none;
        }

        Text {
          font-size: 28px;
          color: $text-primary;
        }

        .arrow {
          font-size: 32px;
          color: $text-secondary;
        }
      }
    }
  }

  .logout-btn {
    background-color: transparent;
    color: $accent-secondary;
    border: 2px solid $accent-secondary;
    border-radius: $border-radius;
    padding: 20px;
    font-size: 28px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add mini-program/src/pages/profile/
git commit -m "feat: implement profile page with user info, streak, plans, and quick links"
```

---

## Phase 6: 主包子页面

### Task 12: 设置页 (settings/index)

**Files:**
- Create: `mini-program/src/pages/settings/index.tsx`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/pages/settings/index.tsx
import { View, Text, Switch } from '@tarojs/components';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import './index.scss';

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <ScrollView className="settings-page" scrollY>
      <View className="section">
        <Text className="section-title">个人信息</Text>
        <View className="setting-item">
          <Text className="label">昵称</Text>
          <Text className="value">{user?.nickname || '-'}</Text>
        </View>
        <View className="setting-item">
          <Text className="label">邮箱</Text>
          <Text className="value">{user?.email || '-'}</Text>
        </View>
      </View>

      <View className="section">
        <Text className="section-title">通知设置</Text>
        <View className="setting-item">
          <Text className="label">训练提醒</Text>
          <Switch color="#FF4500" />
        </View>
        <View className="setting-item">
          <Text className="label">围度更新提醒</Text>
          <Switch color="#FF4500" />
        </View>
      </View>

      <View className="section">
        <Text className="section-title">关于</Text>
        <View className="setting-item">
          <Text className="label">版本</Text>
          <Text className="value">1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}
```

```scss
// mini-program/src/pages/settings/index.scss
.settings-page {
  height: 100vh;
  background-color: $bg-primary;
  padding: 24px;

  .section {
    margin-bottom: 32px;

    .section-title {
      display: block;
      font-size: 24px;
      color: $text-secondary;
      margin-bottom: 16px;
      padding-left: 8px;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $bg-secondary;
      padding: 24px;
      border-radius: $border-radius;
      margin-bottom: 8px;

      .label {
        font-size: 28px;
        color: $text-primary;
      }

      .value {
        font-size: 28px;
        color: $text-secondary;
      }
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add mini-program/src/pages/settings/
git commit -m "feat: implement settings page"
```

---

### Task 13: 徽章页 (badges/index)

**Files:**
- Create: `mini-program/src/pages/badges/index.tsx`
- Create: `mini-program/src/pages/badges/index.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/pages/badges/index.tsx
import { View, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { getBadges } from '../../api/achievements';
import type { Badge } from '../../api/achievements';
import './index.scss';

const TIER_COLORS: Record<string, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2'
};

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      const data = await getBadges();
      setBadges(data);
    } catch (err) {
      console.error('Failed to load badges:', err);
    }
  };

  const achieved = badges.filter((b) => b.achievedAt);
  const locked = badges.filter((b) => !b.achievedAt);

  return (
    <ScrollView className="badges-page" scrollY>
      <View className="section">
        <Text className="section-title">已获得 ({achieved.length})</Text>
        <View className="badge-grid">
          {achieved.map((badge) => (
            <View key={badge.id} className="badge-card earned">
              <View
                className="badge-icon"
                style={{ backgroundColor: TIER_COLORS[badge.tier] || '#888' }}
              >
                <Text className="icon">🏆</Text>
              </View>
              <Text className="badge-name">{badge.name}</Text>
              <Text className="badge-desc">{badge.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="section">
        <Text className="section-title">未解锁 ({locked.length})</Text>
        <View className="badge-grid">
          {locked.map((badge) => (
            <View key={badge.id} className="badge-card locked">
              <View className="badge-icon grayscale">
                <Text className="icon">🔒</Text>
              </View>
              <Text className="badge-name">{badge.name}</Text>
              <Text className="badge-desc">{badge.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
```

```scss
// mini-program/src/pages/badges/index.scss
.badges-page {
  height: 100vh;
  background-color: $bg-primary;
  padding: 24px;

  .section {
    margin-bottom: 40px;

    .section-title {
      display: block;
      font-size: 28px;
      color: $text-primary;
      margin-bottom: 24px;
    }

    .badge-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      .badge-card {
        background-color: $bg-secondary;
        border-radius: $border-radius;
        padding: 24px;
        text-align: center;

        &.locked {
          opacity: 0.5;
        }

        .badge-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;

          &.grayscale {
            background-color: $bg-tertiary;
          }

          .icon {
            font-size: 40px;
          }
        }

        .badge-name {
          display: block;
          font-size: 26px;
          color: $text-primary;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .badge-desc {
          display: block;
          font-size: 22px;
          color: $text-secondary;
        }
      }
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add mini-program/src/pages/badges/
git commit -m "feat: implement badges page with earned and locked badges"
```

---

### Task 14: 日历页 (calendar/index)

**Files:**
- Create: `mini-program/src/pages/calendar/index.tsx`
- Create: `mini-program/src/pages/calendar/index.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/pages/calendar/index.tsx
import { View, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { getWorkouts, getMeasurements } from '../../api/records';
import type { Workout, Measurement } from '../../api/records';
import './index.scss';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [dayRecords, setDayRecords] = useState<{ workouts: Workout[]; measurements: Measurement[] }>({
    workouts: [],
    measurements: []
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dayWorkouts = workouts.filter((w) => w.date === selectedDate);
      const dayMeasurements = measurements.filter((m) => m.date === selectedDate);
      setDayRecords({ workouts: dayWorkouts, measurements: dayMeasurements });
    }
  }, [selectedDate, workouts, measurements]);

  const loadData = async () => {
    try {
      const [workoutData, measurementData] = await Promise.all([
        getWorkouts(),
        getMeasurements()
      ]);
      setWorkouts(workoutData);
      setMeasurements(measurementData);
    } catch (err) {
      console.error('Failed to load calendar data:', err);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatDateStr = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const hasRecord = (day: number) => {
    const dateStr = formatDateStr(day);
    return (
      workouts.some((w) => w.date === dateStr) ||
      measurements.some((m) => m.date === dateStr)
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <View className="calendar-page">
      <View className="calendar-header">
        <Text className="arrow" onClick={prevMonth}>‹</Text>
        <Text className="month-label">
          {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
        </Text>
        <Text className="arrow" onClick={nextMonth}>›</Text>
      </View>

      <View className="weekday-row">
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <Text key={day} className="weekday">{day}</Text>
        ))}
      </View>

      <View className="days-grid">
        {days.map((day, index) => (
          <View
            key={index}
            className={`day-cell ${day === null ? 'empty' : ''} ${isToday(day!) ? 'today' : ''} ${selectedDate === formatDateStr(day!) ? 'selected' : ''}`}
            onClick={() => day && setSelectedDate(formatDateStr(day))}
          >
            {day && (
              <>
                <Text className="day-number">{day}</Text>
                {hasRecord(day) && <View className="record-dot" />}
              </>
            )}
          </View>
        ))}
      </View>

      {selectedDate && (
        <View className="day-detail">
          <Text className="detail-title">{selectedDate} 记录</Text>
          {dayRecords.workouts.length > 0 && (
            <View className="record-section">
              <Text className="record-type">训练</Text>
              {dayRecords.workouts.map((w) => (
                <View key={w.id} className="record-item">
                  <Text>{w.exercises.map((e) => e.exerciseName).join(', ')}</Text>
                </View>
              ))}
            </View>
          )}
          {dayRecords.measurements.length > 0 && (
            <View className="record-section">
              <Text className="record-type">围度</Text>
              {dayRecords.measurements.map((m) => (
                <View key={m.id} className="record-item">
                  <Text>{m.items.map((i) => `${i.bodyPart} ${i.value}cm`).join(', ')}</Text>
                </View>
              ))}
            </View>
          )}
          {dayRecords.workouts.length === 0 && dayRecords.measurements.length === 0 && (
            <Text className="no-record">暂无记录</Text>
          )}
        </View>
      )}
    </View>
  );
}
```

```scss
// mini-program/src/pages/calendar/index.scss
.calendar-page {
  height: 100vh;
  background-color: $bg-primary;
  padding: 24px;

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    .arrow {
      font-size: 48px;
      color: $accent-primary;
      padding: 0 20px;
    }

    .month-label {
      font-size: 32px;
      color: $text-primary;
      font-weight: bold;
    }
  }

  .weekday-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 16px;

    .weekday {
      text-align: center;
      font-size: 24px;
      color: $text-secondary;
    }
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;

    .day-cell {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $bg-secondary;
      border-radius: $border-radius;
      position: relative;

      &.empty {
        background-color: transparent;
      }

      &.today {
        border: 2px solid $accent-primary;
      }

      &.selected {
        background-color: $accent-primary;
      }

      .day-number {
        font-size: 28px;
        color: $text-primary;
      }

      .record-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: $accent-primary;
        position: absolute;
        bottom: 8px;
      }
    }
  }

  .day-detail {
    margin-top: 40px;
    padding: 24px;
    background-color: $bg-secondary;
    border-radius: $border-radius;

    .detail-title {
      display: block;
      font-size: 28px;
      color: $text-primary;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .record-section {
      margin-bottom: 20px;

      .record-type {
        display: block;
        font-size: 24px;
        color: $text-secondary;
        margin-bottom: 12px;
      }

      .record-item {
        padding: 12px 16px;
        background-color: $bg-tertiary;
        border-radius: 4px;
        margin-bottom: 8px;

        Text {
          font-size: 26px;
          color: $text-primary;
        }
      }
    }

    .no-record {
      font-size: 26px;
      color: $text-secondary;
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add mini-program/src/pages/calendar/
git commit -m "feat: implement calendar page with month navigation and record dots"
```

---

## Phase 7: 分包页面

### Task 15: 动作详情页 (exercises/detail)

**Files:**
- Create: `mini-program/src/subpkg/knowledge/exercises/detail.tsx`
- Create: `mini-program/src/subpkg/knowledge/exercises/detail.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/subpkg/knowledge/exercises/detail.tsx
import { View, Text, RichText, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useLoad } from '@tarojs/taro';
import { getExerciseDetail, type Exercise } from '../../../api/exercises';
import './index.scss';

export default function ExerciseDetail() {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useLoad((params) => {
    loadExercise(params.id);
  });

  const loadExercise = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await getExerciseDetail(id);
      setExercise(data);
    } catch (err) {
      console.error('Failed to load exercise:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !exercise) {
    return <View className="loading">加载中...</View>;
  }

  return (
    <ScrollView className="exercise-detail" scrollY>
      <View className="header">
        <Text className="name">{exercise.name}</Text>
        <View className="tags">
          <Text className="tag category">{exercise.category}</Text>
          <Text className="tag equipment">{exercise.equipment}</Text>
          <Text className="tag difficulty">{exercise.difficulty}</Text>
          {exercise.exerciseType && <Text className="tag type">{exercise.exerciseType}</Text>}
        </View>
      </View>

      {exercise.description && (
        <View className="section">
          <Text className="section-title">动作说明</Text>
          <RichText nodes={exercise.description} className="content" />
        </View>
      )}

      {exercise.steps && (
        <View className="section">
          <Text className="section-title">动作步骤</Text>
          <RichText nodes={exercise.steps} className="content" />
        </View>
      )}

      {exercise.safetyNotes && (
        <View className="section">
          <Text className="section-title">安全注意事项</Text>
          <RichText nodes={exercise.safetyNotes} className="content warning" />
        </View>
      )}

      {exercise.commonMistakes && (
        <View className="section">
          <Text className="section-title">常见错误</Text>
          <RichText nodes={exercise.commonMistakes} className="content" />
        </View>
      )}

      {exercise.adjustmentNotes && (
        <View className="section">
          <Text className="section-title">细节调整</Text>
          <RichText nodes={exercise.adjustmentNotes} className="content" />
        </View>
      )}

      {exercise.conversionGuide && (
        <View className="section">
          <Text className="section-title">变体转换指南</Text>
          <RichText nodes={JSON.stringify(exercise.conversionGuide)} className="content" />
        </View>
      )}
    </ScrollView>
  );
}
```

```scss
// mini-program/src/subpkg/knowledge/exercises/detail.scss
.exercise-detail {
  height: 100vh;
  background-color: $bg-primary;
  padding: 24px;

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: $text-secondary;
    font-size: 28px;
  }

  .header {
    margin-bottom: 32px;

    .name {
      display: block;
      font-size: 40px;
      color: $text-primary;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .tag {
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 24px;

        &.category {
          background-color: rgba($accent-primary, 0.2);
          color: $accent-primary;
        }

        &.equipment, &.difficulty, &.type {
          background-color: $bg-tertiary;
          color: $text-secondary;
        }
      }
    }
  }

  .section {
    margin-bottom: 32px;

    .section-title {
      display: block;
      font-size: 28px;
      color: $accent-primary;
      font-weight: bold;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid $border-color;
    }

    .content {
      font-size: 28px;
      color: $text-primary;
      line-height: 1.8;

      &.warning {
        color: $accent-secondary;
      }
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add mini-program/src/subpkg/knowledge/exercises/
git commit -m "feat: implement exercise detail page in subpackage"
```

---

### Task 16: 肌肉详情页 (muscles/detail)

**Files:**
- Create: `mini-program/src/subpkg/knowledge/muscles/detail.tsx`
- Create: `mini-program/src/subpkg/knowledge/muscles/detail.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/subpkg/knowledge/muscles/detail.tsx
import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useLoad } from '@tarojs/taro';
import { getMuscleDetail, type Muscle } from '../../../api/muscles';
import { getExercises } from '../../../api/exercises';
import ExerciseCard from '../../../components/ExerciseCard';
import './index.scss';

export default function MuscleDetail() {
  const [muscle, setMuscle] = useState<Muscle | null>(null);
  const [relatedExercises, setRelatedExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useLoad((params) => {
    loadMuscle(params.id);
  });

  const loadMuscle = async (id: number) => {
    setIsLoading(true);
    try {
      const [muscleData, exercisesData] = await Promise.all([
        getMuscleDetail(id),
        getExercises()
      ]);
      setMuscle(muscleData);
      // Filter exercises related to this muscle (simplified - in real app would filter by muscleId)
      setRelatedExercises(exercisesData.list.slice(0, 5));
    } catch (err) {
      console.error('Failed to load muscle:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !muscle) {
    return <View className="loading">加载中...</View>;
  }

  return (
    <ScrollView className="muscle-detail" scrollY>
      <View className="header">
        <Text className="name">{muscle.name}</Text>
        <Text className="group">{muscle.group}</Text>
      </View>

      {muscle.function && (
        <View className="section">
          <Text className="section-title">肌肉功能</Text>
          <Text className="content">{muscle.function}</Text>
        </View>
      )}

      {muscle.origin && (
        <View className="section">
          <Text className="section-title">起点</Text>
          <Text className="content">{muscle.origin}</Text>
        </View>
      )}

      {muscle.insertion && (
        <View className="section">
          <Text className="section-title">止点</Text>
          <Text className="content">{muscle.insertion}</Text>
        </View>
      )}

      {muscle.trainingTips && (
        <View className="section">
          <Text className="section-title">训练技巧</Text>
          <Text className="content">{muscle.trainingTips}</Text>
        </View>
      )}

      {relatedExercises.length > 0 && (
        <View className="section">
          <Text className="section-title">关联动作</Text>
          {relatedExercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
```

```scss
// mini-program/src/subpkg/knowledge/muscles/detail.scss
.muscle-detail {
  height: 100vh;
  background-color: $bg-primary;
  padding: 24px;

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: $text-secondary;
    font-size: 28px;
  }

  .header {
    margin-bottom: 32px;

    .name {
      display: block;
      font-size: 40px;
      color: $text-primary;
      font-weight: bold;
      margin-bottom: 12px;
    }

    .group {
      font-size: 26px;
      color: $accent-primary;
      text-transform: capitalize;
    }
  }

  .section {
    margin-bottom: 32px;

    .section-title {
      display: block;
      font-size: 28px;
      color: $accent-primary;
      font-weight: bold;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid $border-color;
    }

    .content {
      font-size: 28px;
      color: $text-primary;
      line-height: 1.8;
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add mini-program/src/subpkg/knowledge/muscles/
git commit -m "feat: implement muscle detail page in subpackage"
```

---

### Task 17: 计划执行页 (plans/execute)

**Files:**
- Create: `mini-program/src/subpkg/knowledge/plans/execute.tsx`
- Create: `mini-program/src/subpkg/knowledge/plans/execute.scss`

- [ ] **Step 1: 创建页面逻辑**

```tsx
// mini-program/src/subpkg/knowledge/plans/execute.tsx
import { View, Text, Button, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useLoad, useShow } from '@tarojs/taro';
import { usePlanStore } from '../../../store/plan';
import { getPlanDetail, executePlan } from '../../../api/plans';
import type { Plan } from '../../../api/plans';
import './index.scss';

export default function PlanExecute() {
  const { currentPlan, setCurrentPlan } = usePlanStore();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useLoad((params) => {
    loadPlan(params.id);
  });

  useShow(() => {
    if (currentPlan) {
      setPlan(currentPlan);
    }
  });

  const loadPlan = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await getPlanDetail(id);
      setPlan(data);
      setCurrentPlan(data);
    } catch (err) {
      console.error('Failed to load plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExercise = (exerciseId: number) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  const handleComplete = async () => {
    if (!plan) return;

    try {
      await executePlan(plan.id, {
        completedExerciseIds: Array.from(completedExercises)
      });
      wx.showToast({ title: '打卡成功', icon: 'success' });
      wx.navigateBack();
    } catch (err) {
      console.error('Failed to complete execution:', err);
      wx.showToast({ title: '打卡失败', icon: 'none' });
    }
  };

  const progress = plan ? (completedExercises.size / plan.exercises.length) * 100 : 0;

  if (isLoading || !plan) {
    return <View className="loading">加载中...</View>;
  }

  return (
    <View className="plan-execute">
      <View className="header">
        <Text className="plan-name">{plan.name}</Text>
        <View className="progress-bar">
          <View className="progress-fill" style={{ width: `${progress}%` }} />
        </View>
        <Text className="progress-text">
          {completedExercises.size} / {plan.exercises.length} 已完成
        </Text>
      </View>

      <ScrollView className="exercise-list" scrollY>
        {plan.exercises.map((exercise) => (
          <View
            key={exercise.id}
            className={`exercise-item ${completedExercises.has(exercise.id) ? 'completed' : ''}`}
            onClick={() => toggleExercise(exercise.id)}
          >
            <View className="checkbox">
              {completedExercises.has(exercise.id) && <Text className="check">✓</Text>}
            </View>
            <View className="exercise-info">
              <Text className="exercise-name">{exercise.exerciseName}</Text>
              <Text className="exercise-detail">
                {exercise.sets}组 × {exercise.reps}次
                {exercise.weight > 0 ? ` @ ${exercise.weight}kg` : ''}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="footer">
        <Button
          className="complete-btn"
          onClick={handleComplete}
          disabled={completedExercises.size === 0}
        >
          完成打卡
        </Button>
      </View>
    </View>
  );
}
```

```scss
// mini-program/src/subpkg/knowledge/plans/execute.scss
.plan-execute {
  height: 100vh;
  background-color: $bg-primary;
  display: flex;
  flex-direction: column;

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: $text-secondary;
    font-size: 28px;
  }

  .header {
    padding: 32px 24px;
    background-color: $bg-secondary;
    border-bottom: 1px solid $border-color;

    .plan-name {
      display: block;
      font-size: 36px;
      color: $text-primary;
      font-weight: bold;
      margin-bottom: 24px;
    }

    .progress-bar {
      height: 12px;
      background-color: $bg-tertiary;
      border-radius: 6px;
      margin-bottom: 12px;

      .progress-fill {
        height: 100%;
        background-color: $accent-primary;
        border-radius: 6px;
        transition: width 0.3s ease;
      }
    }

    .progress-text {
      font-size: 24px;
      color: $text-secondary;
    }
  }

  .exercise-list {
    flex: 1;
    padding: 24px;
    overflow-y: auto;

    .exercise-item {
      display: flex;
      align-items: center;
      gap: 20px;
      background-color: $bg-secondary;
      padding: 24px;
      border-radius: $border-radius;
      margin-bottom: 16px;

      &.completed {
        opacity: 0.6;

        .exercise-name {
          text-decoration: line-through;
        }
      }

      .checkbox {
        width: 48px;
        height: 48px;
        border: 2px solid $border-color;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .check {
          color: $accent-primary;
          font-size: 32px;
          font-weight: bold;
        }
      }

      .exercise-info {
        flex: 1;

        .exercise-name {
          display: block;
          font-size: 30px;
          color: $text-primary;
          margin-bottom: 8px;
        }

        .exercise-detail {
          font-size: 24px;
          color: $text-secondary;
        }
      }
    }
  }

  .footer {
    padding: 24px;
    background-color: $bg-secondary;
    border-top: 1px solid $border-color;

    .complete-btn {
      width: 100%;
      background-color: $accent-primary;
      color: $text-primary;
      border: none;
      border-radius: $border-radius;
      padding: 24px;
      font-size: 32px;
      font-weight: bold;

      &[disabled] {
        opacity: 0.5;
      }
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add mini-program/src/subpkg/knowledge/plans/
git commit -m "feat: implement plan execute page in subpackage"
```

---

## Phase 8: 后端 API

### Task 18: 后端微信登录接口

**Files:**
- Modify: `backend/prisma/schema.prisma`
- Modify: `backend/src/routes/auth.ts` (现有)
- Create: `backend/src/routes/auth.wechat.ts`

- [ ] **Step 1: 更新 Prisma schema**

```prisma
// backend/prisma/schema.prisma

model User {
  id              Int       @id @default(autoincrement())
  email           String?   @unique
  passwordHash    String?
  nickname        String?
  avatar          String?
  wechatOpenid    String?   @unique
  wechatUnionid   String?   @unique
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  // ... existing relations
}
```

- [ ] **Step 2: 创建微信登录路由**

```typescript
// backend/src/routes/auth.wechat.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fitlc-secret';

const WECHAT_APPID = process.env.WECHAT_APPID;
const WECHAT_SECRET = process.env.WECHAT_SECRET;

router.post('/wechat', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'code is required' });
    }

    // Exchange code for session_key and openid
    const wechatRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: WECHAT_APPID,
        secret: WECHAT_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, unionid, session_key, errcode, errmsg } = wechatRes.data;

    if (errcode) {
      console.error('Wechat API error:', errcode, errmsg);
      return res.status(400).json({ message: 'Invalid code' });
    }

    // Find or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { wechatOpenid: openid },
          ...(unionid ? [{ wechatUnionid: unionid }] : [])
        ]
      }
    });

    if (!user) {
      // Create new user with normal role
      user = await prisma.user.create({
        data: {
          wechatOpenid: openid,
          wechatUnionid: unionid,
          nickname: `用户${Date.now().toString().slice(-6)}`,
          roles: {
            create: {
              role: {
                connect: { name: 'normal' }
              }
            }
          }
        }
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: 'normal' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Wechat login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
```

- [ ] **Step 3: 注册路由**

```typescript
// backend/src/index.ts
import authWechatRoutes from './routes/auth.wechat';

// 在 auth 路由注册后添加
app.use('/api/auth', authWechatRoutes);
```

- [ ] **Step 4: Commit**

```bash
git add backend/src/routes/auth.wechat.ts backend/prisma/schema.prisma backend/src/index.ts
git commit -m "feat: add WeChat login endpoint for mini-program"
```

---

### Task 19: 后端肌肉库只读接口

**Files:**
- Modify: `backend/src/routes/auth.ts` (现有)
- Create: `backend/src/routes/muscles.readonly.ts`

- [ ] **Step 1: 创建肌肉库只读路由**

```typescript
// backend/src/routes/muscles.readonly.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/muscles - List all muscles (for normal users)
router.get('/', async (req, res) => {
  try {
    const muscles = await prisma.muscle.findMany({
      orderBy: [
        { group: 'asc' },
        { sortOrder: 'asc' }
      ]
    });

    res.json(muscles);
  } catch (error) {
    console.error('Failed to fetch muscles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/muscles/:id - Get muscle detail
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const muscle = await prisma.muscle.findUnique({
      where: { id: parseInt(id) },
      include: {
        exercises: {
          include: {
            exercise: true
          }
        }
      }
    });

    if (!muscle) {
      return res.status(404).json({ message: 'Muscle not found' });
    }

    res.json(muscle);
  } catch (error) {
    console.error('Failed to fetch muscle detail:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
```

- [ ] **Step 2: 注册路由**

```typescript
// backend/src/index.ts
import musclesReadonlyRoutes from './routes/muscles.readonly';

// 在现有路由注册后添加
app.use('/api/muscles', musclesReadonlyRoutes);
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/routes/muscles.readonly.ts backend/src/index.ts
git commit -m "feat: add readonly muscles API endpoint for normal users"
```

---

## Phase 9: 收尾

### Task 20: TabBar 图标资源

**Files:**
- Create: `mini-program/src/assets/` (图标文件)

- [ ] **Step 1: 添加占位图标**

需要添加 10 个图标文件：
- tab-chat.png / tab-chat-active.png
- tab-records.png / tab-records-active.png
- tab-trends.png / tab-trends-active.png
- tab-exercises.png / tab-exercises-active.png
- tab-profile.png / tab-profile-active.png

> 注：实际项目需要设计符合 FitLC 品牌的图标，此处为占位

- [ ] **Step 2: Commit**

```bash
git add mini-program/src/assets/
git commit -m "feat: add tab bar icon assets (placeholder)"
```

---

## 实施总结

| Phase | 内容 | 预计任务数 |
|-------|------|-----------|
| 1 | 项目初始化 | 2 |
| 2 | 主题和全局样式 | 1 |
| 3 | 公共模块（API + Store） | 2 |
| 4 | 主包 Tab 页面 | 5 |
| 5 | 主包子页面 | 3 |
| 6 | 分包页面 | 3 |
| 7 | 后端 API | 2 |
| 8 | 收尾 | 1 |

**总计：19 个任务**

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-29-mini-program-implementation.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**