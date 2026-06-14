# Sprint 5：可靠性升级 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** 把单机部署假设的代码改造为可水平扩展：①UserContext 锁改 Redis；②修复或废弃 zhipu 主对话；③provider fallback；④模型实例支持用户级覆盖；⑤Exercise 缓存改 Redis；⑥Prompt Caching；⑦多实例部署验证。

**Architecture:** 7 个 Task。T1 引入 Redis 是基础（其他 Task 依赖），T2/T3/T6 改造模型层，T4 用户级覆盖，T5 缓存，T7 e2e 验收。

**Tech Stack:** ioredis / redlock / LangChain Runnable.withFallbacks / docker-compose

**对应缺口:** G17、G18、G19、G20、G21、G22

**依赖:** Sprint 2（Langfuse trace 用于验证 fallback 真发生了）

---

## 文件结构

```
backend/
├── src/
│   ├── infrastructure/
│   │   ├── redis.ts                          # T1 新增：Redis 单例
│   │   └── distributedLock.ts                # T1 新增：分布式锁
│   ├── cache/
│   │   └── exerciseCache.ts                  # T5 新增：Redis 缓存 + Pub/Sub 失效
│   ├── services/userContextService.ts        # T1 重构
│   ├── agents/
│   │   ├── chatFactory.ts                    # T3 加 fallback
│   │   ├── chatMiniMax.ts                    # T4 接受 perCallConfig
│   │   ├── chatZhipu.ts                      # T2 实现真 BaseChatModel
│   │   └── promptBuilder.ts                  # T6 prompt caching
│   └── observability/promptCacheStats.ts     # T6 新增：caching 命中率指标
├── docker-compose.yml                         # T7 新增：多 pod 部署 + redis
├── tests/integration/
│   ├── distributedLock.int.test.ts           # T1
│   ├── chatFactory.fallback.int.test.ts      # T3
│   └── multi-pod.int.test.ts                 # T7
└── prisma/                                   # 无 schema 变更
```

---

## Task 1: UserContext 自旋锁改 Redis

**Goal:** `userContextService.ts:18, 43-53` 的 `Map<userId, boolean>` 锁是进程内的，多 pod 部署会冲突。改用 Redis 分布式锁（SET NX EX + Lua 释放）。

**Files:**
- Create: `backend/src/infrastructure/redis.ts`
- Create: `backend/src/infrastructure/distributedLock.ts`
- Modify: `backend/src/services/userContextService.ts`
- Create: `backend/tests/integration/distributedLock.int.test.ts`

**Steps:**

- [ ] **Step 1: 安装依赖**

```bash
cd backend
npm install ioredis
```

- [ ] **Step 2: Redis 单例**

Create: `backend/src/infrastructure/redis.ts`

```typescript
import Redis from 'ioredis';

let cached: Redis | null = null;

export function getRedis(): Redis {
  if (cached) return cached;
  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  cached = new Redis(url, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
  });
  cached.on('error', (e) => console.error('[redis]', e.message));
  return cached;
}

export async function closeRedis() {
  if (cached) { await cached.quit(); cached = null; }
}
```

- [ ] **Step 3: 分布式锁**

Create: `backend/src/infrastructure/distributedLock.ts`

```typescript
import { getRedis } from './redis';
import { randomBytes } from 'crypto';

const RELEASE_LUA = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end`;

export interface LockHandle { key: string; token: string; }

export async function acquireLock(
  key: string,
  ttlMs: number,
  waitMs = 0,
  pollMs = 50,
): Promise<LockHandle | null> {
  const redis = getRedis();
  const token = randomBytes(12).toString('hex');
  const start = Date.now();

  while (true) {
    const ok = await redis.set(key, token, 'PX', ttlMs, 'NX');
    if (ok === 'OK') return { key, token };
    if (Date.now() - start >= waitMs) return null;
    await new Promise((r) => setTimeout(r, pollMs));
  }
}

export async function releaseLock(h: LockHandle): Promise<boolean> {
  const redis = getRedis();
  const r = (await redis.eval(RELEASE_LUA, 1, h.key, h.token)) as number;
  return r === 1;
}

export async function withLock<T>(
  key: string,
  ttlMs: number,
  fn: () => Promise<T>,
  waitMs = 5000,
): Promise<T | null> {
  const lock = await acquireLock(key, ttlMs, waitMs);
  if (!lock) return null;
  try { return await fn(); }
  finally { await releaseLock(lock); }
}
```

- [ ] **Step 4: 改造 userContextService**

Modify: `backend/src/services/userContextService.ts`

把 `refreshContextWithLock` 内的 `Map.set/delete` 锁逻辑替换为 `withLock(\`uc:lock:${userId}\`, 30_000, async () => { ... })`。

- [ ] **Step 5: 集成测试**

Create: `backend/tests/integration/distributedLock.int.test.ts` — 启 2 个并发任务抢同一 key，验证只有 1 个拿到锁。

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(infra): Redis-backed distributed lock for UserContext refresh"
```

---

## Task 2: 修复或废弃 zhipu 分支

**Goal:** 当前 `chatFactory.ts:36-39` 的 zhipu 包装把 `bindTools` 实现为 no-op，切到 zhipu 立即报废。两个选项：

- **A. 修复**：把 ZhipuChat 包成真正的 LangChain `BaseChatModel`（实现 `_call` + tool_calls 解析）
- **B. 降级**：明确声明 zhipu 只做 vision，主对话不支持

本 Sprint 选 **B（降级）**，因为成本低且与现状语义一致；A 可放到 Sprint 8（多 provider 时一起）。

**Files:**
- Modify: `backend/src/agents/chatFactory.ts`
- Modify: `backend/src/config/aiConfig.ts`

**Steps:**

- [ ] **Step 1: chatFactory 抛错而非 no-op**

Modify: `chatFactory.ts`

```typescript
export async function createChatModel(callbacks?: any[]) {
  const provider = getCurrentProvider();
  if (provider === 'minimax') return createMiniMaxModel({ callbacks });
  if (provider === 'zhipu') {
    throw new Error(
      'Zhipu provider does not support main chat (tool calling). ' +
      'Set AI_PROVIDER=minimax or wait for S8 multi-provider work.'
    );
  }
  throw new Error(`Unsupported AI provider: ${provider}`);
}
```

- [ ] **Step 2: aiConfig 校验启动失败**

Modify: `backend/src/config/aiConfig.ts` 在 module bootstrap 时 check：

```typescript
if (aiConfig.provider === 'zhipu') {
  console.error('[aiConfig] FATAL: AI_PROVIDER=zhipu is not supported for main chat; vision-only mode is via chatZhipu directly');
  // 不立刻 process.exit，让 chatFactory 抛错时给出明确堆栈
}
```

- [ ] **Step 3: Commit**

```bash
git commit -m "fix(agent): zhipu provider explicitly rejected for main chat (tool-calling unsupported)"
```

---

## Task 3: Provider Fallback

**Goal:** minimax 主对话挂掉时，自动降级到一个备用模型（如内部部署的 deepseek-r1 兼容服务），不让用户对话中断。

**Files:**
- Create: `backend/src/agents/chatFallback.ts`
- Modify: `backend/src/agents/chatFactory.ts`

**Steps:**

- [ ] **Step 1: 设计 fallback 配置**

Modify: `backend/src/config/aiConfig.ts`

```typescript
export interface FallbackConfig {
  enabled: boolean;
  url: string;
  apiKey: string;
  model: string;
}

export const fallbackConfig: FallbackConfig = {
  enabled: process.env.FALLBACK_ENABLED === 'true',
  url: process.env.FALLBACK_BASE_URL || '',
  apiKey: process.env.FALLBACK_API_KEY || '',
  model: process.env.FALLBACK_MODEL || '',
};
```

- [ ] **Step 2: 实现 fallback wrapper**

Create: `backend/src/agents/chatFallback.ts`

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { fallbackConfig } from '../config/aiConfig';

export function createFallbackModel(): ChatOpenAI | null {
  if (!fallbackConfig.enabled || !fallbackConfig.url || !fallbackConfig.apiKey) return null;
  return new ChatOpenAI({
    apiKey: fallbackConfig.apiKey,
    model: fallbackConfig.model,
    temperature: 0.7,
    timeout: 30_000,
    maxRetries: 1,
    configuration: { baseURL: fallbackConfig.url },
  });
}
```

- [ ] **Step 3: 接入 chatFactory**

```typescript
import { createFallbackModel } from './chatFallback';

export async function createChatModel(callbacks?: any[]) {
  const primary = createMiniMaxModel({ callbacks });
  const backup = createFallbackModel();
  if (!backup) return primary;
  return primary.withFallbacks({ fallbacks: [backup] });
}
```

> 注：LangChain v1 的 `withFallbacks` API；如 API 名不同请按当前版本 SDK 调整（如 `bindFallbacks` / `Runnable.withFallbacks`）。

- [ ] **Step 4: 集成测试**

把 minimax base URL 改为不可达 host，验证返回的不是 500 而是 fallback 模型的 reply（Langfuse trace 应能看到主 fail + backup OK）。

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(agent): per-call provider fallback (LangChain withFallbacks)"
```

---

## Task 4: 模型实例用户级覆盖

**Goal:** admin 用 temperature=0.3（保守）、normal 用 0.7（活泼）；未来按 plan 类型差异化。

**Files:**
- Modify: `backend/src/agents/chatMiniMax.ts`、`chatFactory.ts`、`fitnessAgentV2.ts`

**Steps:**

- [ ] **Step 1: 扩展 createMiniMaxModel 接受 perCallConfig**

```typescript
export interface PerCallConfig {
  temperature?: number;
  maxTokens?: number;
}

export function createMiniMaxModel(
  fields: CreateModelOptions & { perCall?: PerCallConfig } = {}
): ChatOpenAI {
  const cfg = fields.perCall || {};
  return new ChatOpenAI({
    apiKey: requireApiKey('minimax'),
    model: getModelName('chat'),
    temperature: cfg.temperature ?? fields.temperature ?? 0.7,
    maxTokens: cfg.maxTokens ?? fields.maxTokens ?? 4096,
    timeout: 30_000,
    maxRetries: 2,
    callbacks: fields.callbacks,
    configuration: { baseURL: MINIMAX_BASE_URL },
  });
}
```

- [ ] **Step 2: chatFactory 接受 perCall**

```typescript
export async function createChatModel(callbacks?: any[], perCall?: PerCallConfig) {
  // ... 透传到 createMiniMaxModel({ callbacks, perCall }) ...
}
```

- [ ] **Step 3: runAgentV2 在调用前决定**

```typescript
const perCall: PerCallConfig = userContext?.user?.role === 'admin'
  ? { temperature: 0.3 }
  : { temperature: 0.7 };
const model = await getModel(callbacks, perCall);
```

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(agent): per-call model config (temperature) based on user role"
```

---

## Task 5: Exercise 缓存改 Redis

**Goal:** `fitnessAgentV2.ts:40-56` 的 `cachedExerciseNames` 是 process-local；改 Redis + Pub/Sub 失效通知。

**Files:**
- Create: `backend/src/cache/exerciseCache.ts`
- Modify: `backend/src/agents/fallbackHandler.ts`、`fitnessAgentV2.ts`
- Modify: `backend/src/routes/admin/exercises.ts`（写入时 publish 失效）

**Steps:**

- [ ] **Step 1: 实现 exerciseCache**

```typescript
import { getRedis } from '../infrastructure/redis';
import prisma from '../config/prisma';

const KEY = 'exercise:all-names';
const TTL = 3600; // 1h
const CHANNEL = 'exercise:invalidated';

let localCache: { names: string[]; loadedAt: number } | null = null;
const LOCAL_TTL_MS = 60_000; // 进程内 1 分钟二级缓存（减少 redis 往返）

export async function getAllExerciseNames(): Promise<string[]> {
  if (localCache && Date.now() - localCache.loadedAt < LOCAL_TTL_MS) return localCache.names;

  const redis = getRedis();
  const cached = await redis.get(KEY);
  if (cached) {
    const names = JSON.parse(cached);
    localCache = { names, loadedAt: Date.now() };
    return names;
  }

  const exercises = await prisma.exercise.findMany({ select: { name: true }, where: { deletedAt: null } });
  const names = exercises.map(e => e.name);
  await redis.set(KEY, JSON.stringify(names), 'EX', TTL);
  localCache = { names, loadedAt: Date.now() };
  return names;
}

export async function invalidateExerciseCache(): Promise<void> {
  const redis = getRedis();
  await redis.del(KEY);
  await redis.publish(CHANNEL, 'invalidate');
}

// 订阅失效消息：每个 pod 启动时调用一次
let subscribed = false;
export function subscribeInvalidation() {
  if (subscribed) return;
  subscribed = true;
  const redis = getRedis().duplicate(); // 订阅需要独立连接
  redis.subscribe(CHANNEL);
  redis.on('message', () => { localCache = null; });
}
```

- [ ] **Step 2: 各调用点替换**

把 fitnessAgentV2.ts / fallbackHandler.ts / extractClarification.ts 中的 `cachedExerciseNames` 引用全部改成 `await getAllExerciseNames()`。

- [ ] **Step 3: 写入时失效**

在 `backend/src/routes/admin/exercises.ts` 的 create/update/delete 路由末尾追加 `await invalidateExerciseCache()`。

- [ ] **Step 4: 进程启动时订阅**

Modify: `backend/src/index.ts`

```typescript
import { subscribeInvalidation } from './cache/exerciseCache';
subscribeInvalidation();
```

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(cache): Redis-backed exercise name cache with Pub/Sub invalidation"
```

---

## Task 6: Prompt Caching

**Goal:** 把 system prompt 中"固定不变"的部分（persona / defense / tool-rules）单独缓存，每个用户在 5 分钟内的多轮对话共用同一份"固定段 + 用户上下文段"的拼接结果。

**Files:**
- Modify: `backend/src/agents/promptBuilder.ts`
- Create: `backend/src/observability/promptCacheStats.ts`

**Steps:**

- [ ] **Step 1: 客户端缓存**

Modify: `promptBuilder.ts`

```typescript
import LRU from 'lru-cache';
const promptCache = new LRU<string, { systemPrompt: SystemMessage; createdAt: number }>({
  max: 1000,
  ttl: 5 * 60 * 1000,
});

export async function buildSystemPrompt(
  userContext: UserContext | null,
  historySummary?: string | null,
  visionError?: string | null,
  securityHint?: string | null,
): Promise<SystemMessage> {
  // 缓存键：用户 + summary hash + flags（vision/security hint 改变就重新拼）
  const cacheKey = JSON.stringify({
    uid: userContext?.userId ?? 'anon',
    sumHash: hashShort(historySummary || ''),
    visionFlag: !!visionError,
    secFlag: !!securityHint,
    // 不放具体 visionError/securityHint 文案，让缓存粒度合理
  });
  const cached = promptCache.get(cacheKey);
  if (cached) { recordHit(); return cached.systemPrompt; }
  recordMiss();

  // ... 原有拼接逻辑（含 getPromptText） ...

  const sys = new SystemMessage(fullPrompt);
  promptCache.set(cacheKey, { systemPrompt: sys, createdAt: Date.now() });
  return sys;
}

function hashShort(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(h);
}
```

- [ ] **Step 2: 命中率统计**

Create: `backend/src/observability/promptCacheStats.ts`

```typescript
let hits = 0, misses = 0;
export function recordHit() { hits++; }
export function recordMiss() { misses++; }
export function getStats() { return { hits, misses, hitRate: hits + misses === 0 ? 0 : hits / (hits + misses) }; }
```

- [ ] **Step 3: 通过 /admin/usage 暴露**

Modify: `routes/adminUsage.ts` 加 `/prompt-cache` 端点返回 stats。

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(perf): in-process LRU prompt cache (5min TTL) + hit-rate stats"
```

---

## Task 7: 多实例部署验证

**Goal:** 用 docker-compose 起 2 个 backend + 1 个 redis + 1 个 mysql，跑端到端验证锁、缓存、fallback、prompt cache 在分布式下都正确。

**Files:**
- Create: `backend/docker-compose.dev.yml`
- Create: `backend/tests/integration/multi-pod.int.test.ts`

**Steps:**

- [ ] **Step 1: docker-compose**

Create: `backend/docker-compose.dev.yml`

```yaml
version: '3.9'
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: dev
      MYSQL_DATABASE: fitlc
    ports: ['3307:3306']

  redis:
    image: redis:7-alpine
    ports: ['6380:6379']

  backend-a:
    build: .
    ports: ['3001:3000']
    environment:
      DATABASE_URL: mysql://root:dev@mysql:3306/fitlc
      REDIS_URL: redis://redis:6379
      MINIMAX_API_KEY: ${MINIMAX_API_KEY}
      LANGFUSE_ENABLED: 'false'
    depends_on: [mysql, redis]

  backend-b:
    build: .
    ports: ['3002:3000']
    environment:
      DATABASE_URL: mysql://root:dev@mysql:3306/fitlc
      REDIS_URL: redis://redis:6379
      MINIMAX_API_KEY: ${MINIMAX_API_KEY}
      LANGFUSE_ENABLED: 'false'
    depends_on: [mysql, redis]
```

- [ ] **Step 2: 集成测试**

Create: `backend/tests/integration/multi-pod.int.test.ts`

测试场景：
- 同一 userId 同时向 backend-a 和 backend-b 发请求 → 只有 1 个生成 UserContext（验证 Redis 锁）
- backend-a 修改 Exercise → backend-b 立刻拿到失效后的新数据（验证 Pub/Sub）
- 主 LLM 不可达时 fallback 起作用（验证 fallback）

- [ ] **Step 3: 跑测试 + Commit**

```bash
docker-compose -f docker-compose.dev.yml up -d
cd backend && npm run test:integration -- multi-pod
git commit -m "test(integration): multi-pod deployment validates lock/cache/fallback"
```

---

## Sprint 5 总验收门禁

- [ ] 2 个 backend pod 并发同 userId 请求，UserContext 仅生成 1 次（Redis 锁验证）
- [ ] 修改 Exercise 后 2 个 pod 都能在 5s 内拿到新数据（Pub/Sub 验证）
- [ ] minimax 模拟不可达，fallback 模型接管，对话不中断
- [ ] system prompt token 用量降低 ≥ 50%（prompt cache hit rate ≥ 60%）
- [ ] zhipu 主对话路径明确报错而非 no-op
- [ ] Sprint 2-3 全部基线测试通过
- [ ] `docs/PRD.md` 加"高可用部署"章节
