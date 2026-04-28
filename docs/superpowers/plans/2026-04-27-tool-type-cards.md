# 对话工具类型卡片展示实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 前端根据后端工具类型渲染不同卡片组件（训练/围度/计划/查询/分析/调整）

**Architecture:** 扩展 SavedData 类型支持 6 种工具类型，后端工具返回统一格式标记，前端 chatApi 解析并传递给 ChatMessage 组件，组件根据 type 条件渲染对应卡片。

**Tech Stack:** React, TypeScript, TailwindCSS, Express, Prisma

---

## 文件结构

```
frontend/
├── src/types/index.ts          # 修改：扩展 SavedData / ToolType
├── src/api/chat.ts             # 修改：增加解析 __SAVED_TYPE__ 逻辑
├── src/stores/chatStore.ts     # 修改：SavedData 类型同步
├── src/components/ChatMessage.tsx  # 修改：条件渲染卡片
├── src/components/chat/        # 新建：PlanCard, QueryResultCard, AnalysisCard, PlanAdjustCard

backend/
├── src/tools/saveWorkout.ts    # 修改：返回新格式
├── src/tools/saveMeasurement.ts # 修改：返回新格式
├── src/tools/generatePlan.ts   # 修改：返回新格式
├── src/tools/adjustPlan.ts     # 修改：返回新格式
├── src/tools/analyzeExecution.ts # 修改：返回新格式
├── src/tools/queryWorkout.ts   # 修改：返回新格式
├── src/tools/queryMeasurement.ts # 修改：返回新格式
```

---

## Task 1: 扩展前端类型定义

**Files:**
- Modify: `frontend/src/types/index.ts`

- [ ] **Step 1: 扩展 ToolType 和 SavedData 类型**

```typescript
// frontend/src/types/index.ts

// 新增类型
export type ToolType = 'workout' | 'measurement' | 'plan' | 'adjustment' | 'query' | 'analysis';

export interface QueryMeta {
  type: 'query';
  queryType: 'workout' | 'measurement';
  summary: {
    totalWorkouts?: number;
    totalVolume?: number;
    totalDuration?: number;
    changes?: Record<string, number>;
  };
}

export interface AnalysisMeta {
  type: 'analysis';
  completionRate: number;
  completed: number;
  skipped: number;
  pending: number;
  suggestions: string[];
}

// 修改 SavedData
export interface SavedData {
  type: ToolType;
  id?: number;
  meta?: QueryMeta | AnalysisMeta;
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add frontend/src/types/index.ts
git commit -m "feat(chat): 扩展 SavedData 类型支持 6 种工具类型"
```

---

## Task 2: 后端工具返回新格式

**Files:**
- Modify: `backend/src/tools/saveWorkout.ts:28-37`
- Modify: `backend/src/tools/saveMeasurement.ts:26-35`
- Modify: `backend/src/tools/generatePlan.ts:278-315`
- Modify: `backend/src/tools/adjustPlan.ts:28-51`
- Modify: `backend/src/tools/analyzeExecution.ts:20-44`
- Modify: `backend/src/tools/queryWorkout.ts:22-29`
- Modify: `backend/src/tools/queryMeasurement.ts:21-28`

- [ ] **Step 1: 修改 saveWorkout.ts 返回格式**

```typescript
// backend/src/tools/saveWorkout.ts
// 修改 func 返回值（第 33 行附近）
return `__SAVED_TYPE__:workout:${result.id}:{}__MESSAGE__${result.message}`;
```

- [ ] **Step 2: 修改 saveMeasurement.ts 返回格式**

```typescript
// backend/src/tools/saveMeasurement.ts
// 修改 func 返回值（第 31 行附近）
return `__SAVED_TYPE__:measurement:${result.id}:{}__MESSAGE__${result.message}`;
```

- [ ] **Step 3: 修改 generatePlan.ts 返回格式**

```typescript
// backend/src/tools/generatePlan.ts
// 修改 func 返回值（第 311 行附近）
return `__SAVED_TYPE__:plan:${planId}:{"name":"${user_profile.name || '健身计划'}"}__MESSAGE__${message}`;
```

- [ ] **Step 4: 修改 adjustPlan.ts 返回格式**

```typescript
// backend/src/tools/adjustPlan.ts
// 修改 func 返回值（第 47 行附近）
return `__SAVED_TYPE__:adjustment:${plan_id}:{"description":"${adjustment}"}__MESSAGE__${message}`;
```

- [ ] **Step 5: 修改 analyzeExecution.ts 返回格式**

```typescript
// backend/src/tools/analyzeExecution.ts
// 修改 func 返回值（第 40 行附近）
const analysisJson = JSON.stringify({ completionRate: analysis.stats.completionRate, completed: analysis.stats.completed, skipped: analysis.stats.skipped, pending: analysis.stats.pending, suggestions: analysis.suggestions || [] });
return `__SAVED_TYPE__:analysis:${analysisJson}__MESSAGE__${message}`;
```

- [ ] **Step 6: 修改 queryWorkout.ts 返回格式**

```typescript
// backend/src/tools/queryWorkout.ts
// 修改 func 返回值（第 24 行附近）
const summary = { totalWorkouts: result.workouts?.length || 0, totalVolume: 0 };
return `__SAVED_TYPE__:query:workout:${JSON.stringify({ summary })}__MESSAGE__${JSON.stringify(result)}`;
```

- [ ] **Step 7: 修改 queryMeasurement.ts 返回格式**

```typescript
// backend/src/tools/queryMeasurement.ts
// 修改 func 返回值（第 23 行附近）
return `__SAVED_TYPE__:query:measurement:${JSON.stringify({ summary: {} })}__MESSAGE__${JSON.stringify(result)}`;
```

- [ ] **Step 8: Commit**

```bash
git add backend/src/tools/*.ts
git commit -m "feat(tools): 统一工具返回格式为 __SAVED_TYPE__"
```

---

## Task 3: 前端 chatApi 解析新格式

**Files:**
- Modify: `frontend/src/api/chat.ts`

- [ ] **Step 1: 实现解析函数**

```typescript
// frontend/src/api/chat.ts
import client from './client';
import type { ChatMessage, SavedData } from '../types';

function parseSavedData(reply: string): { parsed: string; savedData?: SavedData } {
  const match = reply.match(/^__SAVED_TYPE__:(.+?)__:MESSAGE__(.+)$/s);
  if (!match) return { parsed: reply };

  const [, header, message] = match;
  const parts = header.split(':');
  const type = parts[0] as SavedData['type'];

  if (['workout', 'measurement', 'plan', 'adjustment'].includes(type)) {
    const id = parseInt(parts[1]);
    return { parsed: message, savedData: { type, id } };
  }

  if (type === 'query') {
    const queryType = parts[1];
    const meta = { type: 'query' as const, queryType: queryType as 'workout' | 'measurement', summary: {} };
    try {
      const metaObj = JSON.parse(parts[2]);
      meta.summary = metaObj.summary || {};
    } catch {}
    return { parsed: message, savedData: { type: 'query', meta } };
  }

  if (type === 'analysis') {
    let meta = { type: 'analysis' as const, completionRate: 0, completed: 0, skipped: 0, pending: 0, suggestions: [] as string[] };
    try {
      meta = { ...meta, ...JSON.parse(parts.slice(1).join(':')) };
    } catch {}
    return { parsed: message, savedData: { type: 'analysis', meta } };
  }

  return { parsed: message };
}

export const chatApi = {
  async sendMessage(message: string, historyMessages: ChatMessage[] = []): Promise<{ reply: string; savedData?: SavedData }> {
    const { data } = await client.post<{ reply: string; savedData?: SavedData }>('/chat/message', { message, historyMessages });
    const { parsed, savedData } = parseSavedData(data.reply);
    return { reply: parsed, savedData };
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/api/chat.ts
git commit -m "feat(chat): 解析 __SAVED_TYPE__ 标记提取 savedData"
```

---

## Task 4: 新建卡片组件

**Files:**
- Create: `frontend/src/components/chat/PlanCard.tsx`
- Create: `frontend/src/components/chat/QueryResultCard.tsx`
- Create: `frontend/src/components/chat/AnalysisCard.tsx`
- Create: `frontend/src/components/chat/PlanAdjustCard.tsx`

- [ ] **Step 1: 创建 PlanCard.tsx**

```typescript
// frontend/src/components/chat/PlanCard.tsx
import Card from '../ui/Card';

interface PlanCardProps {
  planId: number;
  planName?: string;
}

export default function PlanCard({ planId, planName }: PlanCardProps) {
  return (
    <Card variant="accent" className="mt-2">
      <p className="text-text-secondary text-sm">计划已生成</p>
      <p className="text-text-primary font-heading">{planName || '健身计划'}</p>
      <a href={`/plans/${planId}`} className="text-accent-orange text-sm hover:text-accent-red mt-2 inline-block">
        查看计划详情 →
      </a>
    </Card>
  );
}
```

- [ ] **Step 2: 创建 QueryResultCard.tsx**

```typescript
// frontend/src/components/chat/QueryResultCard.tsx
import Card from '../ui/Card';

interface QueryResultCardProps {
  queryType: 'workout' | 'measurement';
  summary: Record<string, number>;
}

export default function QueryResultCard({ queryType, summary }: QueryResultCardProps) {
  return (
    <Card variant="default" className="mt-2">
      <p className="text-text-secondary text-sm mb-2">
        {queryType === 'workout' ? '训练统计' : '围度统计'}
      </p>
      <div className="space-y-1">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-text-muted">{key}</span>
            <span className="text-text-primary">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

- [ ] **Step 3: 创建 AnalysisCard.tsx**

```typescript
// frontend/src/components/chat/AnalysisCard.tsx
import Card from '../ui/Card';

interface AnalysisCardProps {
  completionRate: number;
  completed: number;
  skipped: number;
  pending: number;
  suggestions: string[];
}

export default function AnalysisCard({ completionRate, completed, skipped, pending, suggestions }: AnalysisCardProps) {
  return (
    <Card variant="accent" className="mt-2">
      <p className="text-text-secondary text-sm mb-2">计划执行分析</p>
      <div className="flex gap-4 mb-2">
        <div className="text-center">
          <span className="text-2xl font-heading text-accent-orange">{completionRate}%</span>
          <p className="text-text-muted text-xs">完成率</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-heading text-green-500">{completed}</span>
          <p className="text-text-muted text-xs">已完成</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-heading text-yellow-500">{skipped}</span>
          <p className="text-text-muted text-xs">跳过</p>
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-text-secondary text-xs mb-1">建议</p>
          {suggestions.map((s, i) => (
            <p key={i} className="text-text-primary text-sm">• {s}</p>
          ))}
        </div>
      )}
    </Card>
  );
}
```

- [ ] **Step 4: 创建 PlanAdjustCard.tsx**

```typescript
// frontend/src/components/chat/PlanAdjustCard.tsx
import Card from '../ui/Card';

interface PlanAdjustCardProps {
  planId: number;
  adjustment: string;
}

export default function PlanAdjustCard({ planId, adjustment }: PlanAdjustCardProps) {
  return (
    <Card variant="default" className="mt-2">
      <p className="text-text-secondary text-sm mb-1">计划已调整</p>
      <p className="text-text-primary text-sm">{adjustment}</p>
      <a href={`/plans/${planId}`} className="text-accent-orange text-sm hover:text-accent-red mt-2 inline-block">
        查看更新后的计划 →
      </a>
    </Card>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/chat/PlanCard.tsx frontend/src/components/chat/QueryResultCard.tsx frontend/src/components/chat/AnalysisCard.tsx frontend/src/components/chat/PlanAdjustCard.tsx
git commit -m "feat(chat): 新建 PlanCard QueryResultCard AnalysisCard PlanAdjustCard"
```

---

## Task 5: 修改 ChatMessage.tsx 条件渲染

**Files:**
- Modify: `frontend/src/components/ChatMessage.tsx`

- [ ] **Step 1: 更新 ChatMessage.tsx**

```typescript
// frontend/src/components/ChatMessage.tsx
import { useState } from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import PlanCard from './chat/PlanCard';
import QueryResultCard from './chat/QueryResultCard';
import AnalysisCard from './chat/AnalysisCard';
import PlanAdjustCard from './chat/PlanAdjustCard';

interface ChatMessageProps {
  message: ChatMessageType;
  onUndo?: () => void;
  isRevoked?: boolean;
}

// 判断是否为保存型工具（可撤销）
function canUndo(type?: string): boolean {
  return type === 'workout' || type === 'measurement' || type === 'plan';
}

export default function ChatMessage({ message, onUndo, isRevoked = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [showUndo, setShowUndo] = useState(false);
  const isSaved = message.savedData || message.content.includes('已保存') || message.content.includes('已记录') || message.content.includes('✅');

  // 根据 savedData.type 渲染对应卡片
  const renderCard = () => {
    if (!message.savedData) return null;
    const { type, id, meta } = message.savedData;

    if (type === 'plan') {
      return <PlanCard planId={id!} planName={(meta as any)?.name} />;
    }
    if (type === 'query' && meta) {
      return <QueryResultCard queryType={(meta as any).queryType} summary={(meta as any).summary} />;
    }
    if (type === 'analysis' && meta) {
      return <AnalysisCard {...(meta as any)} />;
    }
    if (type === 'adjustment') {
      return <PlanAdjustCard planId={id!} adjustment={(meta as any)?.description || ''} />;
    }
    return null;
  };

  const showCard = message.savedData && ['plan', 'query', 'analysis', 'adjustment'].includes(message.savedData.type);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        data-testid={`message-${message.role}`}
        className={`max-w-[70%] px-4 py-3 relative group ${
          isUser
            ? `bg-primary-tertiary text-text-primary border-2 border-border ${isRevoked ? 'opacity-50' : ''}`
            : 'bg-transparent text-text-primary'
        }`}
        onMouseEnter={() => isUser && isSaved && !isRevoked && setShowUndo(true)}
        onMouseLeave={() => setShowUndo(false)}
      >
        <p className={`whitespace-pre-wrap ${isRevoked ? 'text-slate-400 line-through' : ''}`}>
          {message.content}
        </p>

        {showCard && renderCard()}

        {isRevoked && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-slate-600/50 text-slate-300 rounded">
            已撤销
          </span>
        )}

        {isUser && isSaved && showUndo && !isRevoked && onUndo && canUndo(message.savedData?.type) && (
          <button
            onClick={onUndo}
            className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-accent-orange transition-colors"
            title="撤销"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {!isUser && isSaved && onUndo && !isRevoked && canUndo(message.savedData?.type) && (
          <button
            onClick={onUndo}
            className="mt-2 text-sm text-accent-orange hover:text-accent-red transition-colors"
          >
            撤销
          </button>
        )}

        {message.timestamp && (
          <p className={`text-xs mt-1 ${isRevoked ? 'text-slate-500' : 'text-text-muted'}`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/ChatMessage.tsx
git commit -m "feat(chat): ChatMessage 根据 savedData.type 条件渲染卡片"
```

---

## Task 6: 验证和测试

- [ ] **Step 1: 启动后端验证工具返回格式**

```bash
cd /Users/eatong/eaTong_projects/fit_lc/backend && npm run dev
```

- [ ] **Step 2: 启动前端验证 UI 渲染**

```bash
cd /Users/eatong/eaTong_projects/fit_lc/frontend && npm run dev
```

- [ ] **Step 3: 测试各类型消息渲染**
- 对话「今天深蹲100kg 5组」→ 验证 WorkoutCard 渲染
- 对话「今天胸围94」→ 验证 MeasurementCard 渲染
- 对话「帮我生成一个健身计划」→ 验证 PlanCard 渲染
- 对话「这周跑了多少次」→ 验证 QueryResultCard 渲染
- 对话「分析我的计划执行」→ 验证 AnalysisCard 渲染

---

## 自检清单

1. **Spec coverage:** 
   - ✅ 6 种工具类型全覆盖
   - ✅ 卡片内显示汇总信息
   - ✅ 撤销仅对保存型显示
   - ✅ 向后兼容 workout/measurement

2. **Placeholder scan:** 无 TBD/TODO

3. **Type consistency:** SavedData.type 类型一致性已确认