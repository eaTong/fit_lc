# Sprint 1 / Task 8：Langfuse 最小接入

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Sprint 1 结束时把 Langfuse 接入到 `runAgentV2` 与 `chatFactory`，让每次对话产生一个 Trace，每次 LLM 调用 / tool 调用各产生一个 Span，自动捕获 prompt、response、tokens、cost、latency。本任务只做"最小可用集成"，不做 Prompt Management、Dataset、LLM-as-judge（那些放 Sprint 2）。

**Architecture:**
- Langfuse 提供两种集成方式：
  - **CallbackHandler**（推荐，自动捕获 LangChain 内部事件）
  - **Manual SDK**（手动 `trace()` / `span()`，更细粒度）
- 本任务采用 **CallbackHandler + 顶层 trace** 的混合方式：
  - chatFactory 在创建 model 时把 CallbackHandler 注入到 `model.invoke(messages, { callbacks: [handler] })`
  - runAgentV2 在入口手动 `langfuse.trace({ userId, sessionId })` 创建顶层 trace，traceId 透传给 callbacks
- Trace 元数据：`userId`、`sessionId`（从 ChatMessage.parentId 链取或新生成）、`messageId`（保存后的 ChatMessage.id）
- 环境变量：`LANGFUSE_PUBLIC_KEY` / `LANGFUSE_SECRET_KEY` / `LANGFUSE_HOST` / `LANGFUSE_ENABLED`（false 时降级 noop）

**Tech Stack:** `langfuse` SDK, `langfuse-langchain`, TypeScript

**对应缺口:** G7 (Master Roadmap, 第一阶段)

---

## 文件结构

```
backend/
├── src/
│   ├── observability/
│   │   ├── langfuse.ts                       # 新增：单例 + handler 工厂 + 健康检查
│   │   └── langfuse.types.ts                 # 新增：trace metadata 类型
│   ├── agents/
│   │   ├── chatFactory.ts                    # 修改：接受 callbacks 透传
│   │   ├── chatMiniMax.ts                    # 修改：createMiniMaxModel 接受 callbacks
│   │   └── fitnessAgentV2.ts                 # 修改：runAgentV2 创建顶层 trace
│   ├── routes/chat.ts                        # 修改：把 trace.id 写入 ChatMessage.meta（可选）
│   └── index.ts                              # 修改：进程退出时 langfuse.shutdown()
├── package.json                              # 新增：langfuse + langfuse-langchain
├── .env.example                              # 新增 4 个 Langfuse 环境变量
└── tests/backend/unit/observability/
    └── langfuse.test.ts                      # 新增
```

---

## 步骤

### 步骤 1: 切分支

- [ ] **Step 1**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git checkout master
git pull
git checkout -b sprint1/task8-langfuse-minimal
```

---

### 步骤 2: 安装依赖

- [ ] **Step 2**

```bash
cd backend
npm install langfuse langfuse-langchain
```

期望：`package.json` 新增两个依赖。

```bash
grep -E '"langfuse|langfuse-langchain"' package.json
```

应有两行命中。

---

### 步骤 3: 创建 langfuse.types.ts

- [ ] **Step 3**

Create: `backend/src/observability/langfuse.types.ts`

```typescript
export interface TraceMetadata {
  userId: number;
  sessionId?: string;
  messageId?: number;
  imageCount?: number;
  hasClarificationContext?: boolean;
  agentVersion: 'v2' | 'v3';
}

export interface SpanMetadata {
  step: string;
  retries?: number;
  errorLabel?: string;
}
```

---

### 步骤 4: 写 langfuse.ts 测试

- [ ] **Step 4**

Create: `backend/tests/backend/unit/observability/langfuse.test.ts`

```typescript
/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('langfuse observability bootstrap', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.LANGFUSE_ENABLED;
    delete process.env.LANGFUSE_PUBLIC_KEY;
    delete process.env.LANGFUSE_SECRET_KEY;
    delete process.env.LANGFUSE_HOST;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('LANGFUSE_ENABLED=false 时 getLangfuse() 返回 null', async () => {
    process.env.LANGFUSE_ENABLED = 'false';
    const mod = await import('../../../../src/observability/langfuse');
    const fuse = mod.getLangfuse();
    expect(fuse).toBeNull();
  });

  it('未配置 PUBLIC/SECRET key 时 getLangfuse() 返回 null 并打印 warn', async () => {
    process.env.LANGFUSE_ENABLED = 'true';
    const mod = await import('../../../../src/observability/langfuse');
    const fuse = mod.getLangfuse();
    expect(fuse).toBeNull();
  });

  it('完整配置时 getLangfuse() 返回非 null', async () => {
    process.env.LANGFUSE_ENABLED = 'true';
    process.env.LANGFUSE_PUBLIC_KEY = 'pk-test';
    process.env.LANGFUSE_SECRET_KEY = 'sk-test';
    process.env.LANGFUSE_HOST = 'https://cloud.langfuse.com';
    const mod = await import('../../../../src/observability/langfuse');
    const fuse = mod.getLangfuse();
    expect(fuse).not.toBeNull();
  });

  it('createTraceCallbacks 在 langfuse 未启用时返回空数组', async () => {
    process.env.LANGFUSE_ENABLED = 'false';
    const mod = await import('../../../../src/observability/langfuse');
    const cbs = mod.createTraceCallbacks({ userId: 1, agentVersion: 'v2' });
    expect(cbs).toEqual([]);
  });

  it('createTraceCallbacks 在启用时返回 1 个 CallbackHandler', async () => {
    process.env.LANGFUSE_ENABLED = 'true';
    process.env.LANGFUSE_PUBLIC_KEY = 'pk-test';
    process.env.LANGFUSE_SECRET_KEY = 'sk-test';
    process.env.LANGFUSE_HOST = 'https://cloud.langfuse.com';
    const mod = await import('../../../../src/observability/langfuse');
    const cbs = mod.createTraceCallbacks({ userId: 1, agentVersion: 'v2' });
    expect(cbs).toHaveLength(1);
  });
});
```

---

### 步骤 5: 跑测试验证失败

- [ ] **Step 5**

```bash
cd backend
npm test -- tests/backend/unit/observability/langfuse.test.ts
```

期望：所有测试 **FAIL**（模块未实现）。

---

### 步骤 6: 实现 langfuse.ts 单例

- [ ] **Step 6**

Create: `backend/src/observability/langfuse.ts`

```typescript
import { Langfuse } from 'langfuse';
import { CallbackHandler } from 'langfuse-langchain';
import type { TraceMetadata } from './langfuse.types';

let cached: Langfuse | null | undefined; // undefined = uninitialized, null = disabled

/**
 * 获取 Langfuse 单例。未配置或显式禁用时返回 null（让上游降级 noop）。
 */
export function getLangfuse(): Langfuse | null {
  if (cached !== undefined) return cached;

  const enabled = process.env.LANGFUSE_ENABLED !== 'false';
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  const baseUrl = process.env.LANGFUSE_HOST;

  if (!enabled || !publicKey || !secretKey || !baseUrl) {
    if (enabled && (!publicKey || !secretKey || !baseUrl)) {
      console.warn('[Langfuse] disabled: missing PUBLIC_KEY / SECRET_KEY / HOST');
    }
    cached = null;
    return null;
  }

  cached = new Langfuse({
    publicKey,
    secretKey,
    baseUrl,
    flushAt: 10,
    flushInterval: 2000,
  });
  console.log('[Langfuse] initialized:', baseUrl);
  return cached;
}

/**
 * 创建一个 CallbackHandler 给 LangChain 调用注入（LLM/tool 自动 trace）
 */
export function createTraceCallbacks(meta: TraceMetadata): any[] {
  const fuse = getLangfuse();
  if (!fuse) return [];

  const handler = new CallbackHandler({
    publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
    secretKey: process.env.LANGFUSE_SECRET_KEY!,
    baseUrl: process.env.LANGFUSE_HOST!,
    userId: String(meta.userId),
    sessionId: meta.sessionId,
    metadata: {
      agentVersion: meta.agentVersion,
      messageId: meta.messageId,
      imageCount: meta.imageCount,
      hasClarificationContext: meta.hasClarificationContext,
    },
  });

  return [handler];
}

/**
 * 进程退出时调用，确保未发送的 events 被 flush
 */
export async function shutdownLangfuse(): Promise<void> {
  const fuse = getLangfuse();
  if (fuse) {
    await fuse.shutdownAsync();
  }
}

/**
 * 测试用：重置缓存
 */
export function _resetForTest(): void {
  cached = undefined;
}
```

---

### 步骤 7: 跑测试验证通过

- [ ] **Step 7**

```bash
cd backend
npm test -- tests/backend/unit/observability/langfuse.test.ts
```

期望：5 个测试全部 **PASS**。如果第 1、4 个测试 fail（因为 cached 在前次测试被设值），把它们的 beforeEach 改为：

```typescript
beforeEach(async () => {
  // 清掉缓存
  jest.resetModules();
});
```

并把 import 改为动态 import（已是 `await import(...)`，符合）。同时在 langfuse.ts 暴露 `_resetForTest`，并在测试 `beforeEach` 里调一次。

---

### 步骤 8: 让 createMiniMaxModel 接受 callbacks

- [ ] **Step 8**

Modify: `backend/src/agents/chatMiniMax.ts`

把签名扩展为接受 `callbacks`：

```typescript
import { ChatOpenAI } from "@langchain/openai";
import type { OpenAIChatInput } from "@langchain/openai";
import { getModelName, requireApiKey } from "../config/aiConfig";

const MINIMAX_BASE_URL = "https://api.minimax.chat/v1";

export interface CreateModelOptions extends Partial<OpenAIChatInput> {
  maxTokens?: number;
  callbacks?: any[];
}

export function createMiniMaxModel(fields: CreateModelOptions = {}): ChatOpenAI {
  const { callbacks, ...openAiFields } = fields;
  return new ChatOpenAI({
    apiKey: requireApiKey('minimax'),
    model: getModelName('chat'),
    temperature: openAiFields.temperature ?? 0.7,
    maxTokens: openAiFields.maxTokens ?? 4096,
    timeout: 30_000,
    maxRetries: 2,
    callbacks,                          // ← 新增
    configuration: { baseURL: MINIMAX_BASE_URL },
    ...openAiFields,
  });
}
```

---

### 步骤 9: 让 chatFactory.createChatModel 接受 callbacks

- [ ] **Step 9**

Modify: `backend/src/agents/chatFactory.ts`

```typescript
export async function createChatModel(callbacks?: any[]) {
  const provider = getCurrentProvider();
  if (provider === 'minimax') {
    return createMiniMaxModel({ callbacks });
  } else if (provider === 'zhipu') {
    // zhipu 包装暂不支持 callbacks（在 S5 修复），先 noop 透传
    return createZhipuLangChainModel();
  }
  throw new Error(`Unsupported AI provider: ${provider}`);
}
```

---

### 步骤 10: runAgentV2 创建顶层 trace + 注入 callbacks

- [ ] **Step 10**

Modify: `backend/src/agents/fitnessAgentV2.ts`

**(a) import**

```typescript
import { getLangfuse, createTraceCallbacks } from '../observability/langfuse';
import type { TraceMetadata } from '../observability/langfuse.types';
```

**(b) 把模块级 `cachedModel` 改为不再 bind 一次性 callbacks**

当前实现里 `cachedModel = model.bindTools(tools)` 是单例，没法 per-call 注入 callbacks。改造方案：取消"caching bound model"，每次调用都新 bind：

```typescript
async function getModel(callbacks?: any[]) {
  const baseModel = await createChatModel(callbacks); // 通过 callbacks
  return baseModel.bindTools(tools as any);
}
```

注：失去了模型实例缓存的微小性能提升（每次 new ChatOpenAI），但 ChatOpenAI 构造很轻量，可接受。如有性能担心，可在 Sprint 5 改造为"复用 baseModel + bindTools(tools, callbacks)"模式。

**(c) `runAgentV2` 入口**

在 `_runAgentV2Inner`（Task 4 引入的 inner 函数）最前面加：

```typescript
async function _runAgentV2Inner(
  userId: number,
  message: string,
  userContext: any = null,
  historyMessages: Array<{ role: string; content: string }> = [],
  imageUrls: string[] = []
) {
  const traceMeta: TraceMetadata = {
    userId,
    agentVersion: 'v2',
    imageCount: imageUrls.length,
    hasClarificationContext: false, // 会在 Step 1.6 之后更新
  };
  const callbacks = createTraceCallbacks(traceMeta);

  // 顶层 trace：可选，CallbackHandler 已经会自动建 trace；这里手动建是为了能把 userInput 完整记录
  const fuse = getLangfuse();
  const trace = fuse?.trace({
    name: 'runAgentV2',
    userId: String(userId),
    metadata: traceMeta,
    input: { message: message.slice(0, 500), imageUrls },
  });

  try {
    // ... 原有 vision / compress / clarification / LLM / tool 逻辑 ...
    // 唯一变化：所有 model.invoke(...) 调用从
    //   await model.invoke(messages)
    // 改为
    //   await model.invoke(messages, { callbacks })
    // 注：如果用的是 step 10b 的 getModel(callbacks)，bindTools 后的 model 内部已有 callbacks，不需要再传

    const result = { reply, toolData /* ... */ };
    trace?.update({ output: { reply: result.reply?.slice(0, 500) } });
    return result;
  } catch (e: any) {
    trace?.update({ output: { error: e.message } });
    throw e;
  }
}
```

**(d) `getModel()` 调用点改为 `getModel(callbacks)`**

定位现有调用：
```typescript
const model = await getModel();
const response = await model.invoke(messages);
```

改为：
```typescript
const model = await getModel(callbacks);
const response = await model.invoke(messages);
```

> Step 8/9/10 一起完成"callbacks 沿管线注入"的改造。

---

### 步骤 11: 进程退出时 flush

- [ ] **Step 11**

Modify: `backend/src/index.ts`

在文件末尾（或现有 SIGTERM/SIGINT handler 旁）追加：

```typescript
import { shutdownLangfuse } from './observability/langfuse';

const gracefulShutdown = async (signal: string) => {
  console.log(`[index] received ${signal}, flushing langfuse...`);
  await shutdownLangfuse();
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

> 如果 index.ts 已有 SIGTERM handler，把 `await shutdownLangfuse()` 加进去即可，不要重复注册。

---

### 步骤 12: 更新 .env.example

- [ ] **Step 12**

Modify: `backend/.env.example`

追加：

```ini
# Langfuse Observability (S1 T8)
# 留空或 LANGFUSE_ENABLED=false 时不上报，runAgentV2 自动降级
LANGFUSE_ENABLED=true
LANGFUSE_HOST=https://cloud.langfuse.com
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
```

如果项目还没有 `.env.example`，从 `.env` 复制一份并把敏感值清空。

---

### 步骤 13: 跑全量测试

- [ ] **Step 13**

```bash
cd backend
npm test
```

期望：所有测试通过；新增 5 个 langfuse 测试通过。

如有旧测试因 `runAgentV2` 签名/行为改变（model.invoke 接受第二个参数 options）而失败，更新 mock。

---

### 步骤 14: 手工验证 trace 出现在 Langfuse

- [ ] **Step 14**

1. 在 [https://cloud.langfuse.com](https://cloud.langfuse.com) 注册账号，创建 project，拿到 publicKey/secretKey
2. 填入 `backend/.env`：
   ```
   LANGFUSE_ENABLED=true
   LANGFUSE_HOST=https://cloud.langfuse.com
   LANGFUSE_PUBLIC_KEY=pk-xxx
   LANGFUSE_SECRET_KEY=sk-xxx
   ```
3. 启动后端：`cd backend && npm run dev`
4. 用小程序或 curl 发送一条对话：
   ```bash
   curl -X POST http://localhost:3000/api/chat/message \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"message": "今天卧推 80kg 5 组 8 次"}'
   ```
5. 在 Langfuse 后台 Traces 页面应能看到名为 `runAgentV2` 的 trace；点开应看到嵌套的 LLM generation span（含 prompt、completion、tokens、cost）

把成功截图存入 `docs/superpowers/plans/task8-langfuse-evidence.md`。

---

### 步骤 15: 更新文档

- [ ] **Step 15**

Modify: `docs/PRD.md` 新增"AI 可观测性"小节：

```markdown
### AI 可观测性（Langfuse）

后端通过 Langfuse 自动捕获每次对话的全链路 trace：

- **Trace 维度**：userId、sessionId、agentVersion、imageCount
- **Span 维度**：LLM 调用（prompt、completion、tokens、cost、latency）、tool 调用
- **环境变量**：`LANGFUSE_ENABLED` / `LANGFUSE_HOST` / `LANGFUSE_PUBLIC_KEY` / `LANGFUSE_SECRET_KEY`
- **降级**：未配置时静默 no-op，不阻塞业务

后台地址：`<LANGFUSE_HOST>/project/<project-id>/traces`
```

Modify: `CLAUDE.md` 在"Agent 架构"末尾追加：

```markdown
### 可观测性

每次对话通过 Langfuse 捕获 trace；本地开发可在 `.env` 设 `LANGFUSE_ENABLED=false` 关闭。
```

---

### 步骤 16: Commit

- [ ] **Step 16**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add backend/src/observability/ \
        backend/src/agents/chatMiniMax.ts \
        backend/src/agents/chatFactory.ts \
        backend/src/agents/fitnessAgentV2.ts \
        backend/src/index.ts \
        backend/package.json backend/package-lock.json \
        backend/.env.example \
        backend/tests/backend/unit/observability/ \
        docs/PRD.md CLAUDE.md \
        docs/superpowers/plans/task8-langfuse-evidence.md
git commit -m "feat(observability): minimal Langfuse integration for trace + cost

- New backend/src/observability/langfuse.ts: lazy singleton + CallbackHandler factory
- chatFactory + chatMiniMax accept callbacks; runAgentV2 creates top-level trace
- SIGTERM/SIGINT shutdown hook flushes pending events
- Disabled gracefully when env keys absent
- 5 new unit tests
- Manual e2e: trace visible in Langfuse Cloud with LLM generation + tokens + cost

Fixes G7 (Master Roadmap, minimal). Full eval/dataset/prompt-mgmt in Sprint 2.
Refs: docs/superpowers/plans/2026-06-14-sprint1-task8-langfuse-minimal.md"
```

---

## 验收

- [x] 5 个新增单测通过
- [x] 全量 `npm test` 通过
- [x] Langfuse 后台能看到至少 5 条 trace（手工触发）
- [x] 每条 trace 含：userId、agentVersion、LLM generation span、tokens、cost
- [x] 设 `LANGFUSE_ENABLED=false` 重启，对话照常工作（降级 noop）
- [x] `docs/PRD.md` 已记录可观测性
