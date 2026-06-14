# Sprint 7：Long-term Memory + generatePlan LLM 化 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** ①让"用户上周说膝盖不好"3 个月后还记得（分层 Memory）；②把当前规则引擎的 `generatePlan` 升级为真正的 AI 生成（reasoning model + 用户历史 RAG + memory）；③Exercise 库改 pgvector / sqlite-vec 向量检索。

**Architecture:** 7 个 Task。T1（选型）→T2（Memory 抽取）→T3（Memory 召回）→T4（替换 UserContext）→T5（Exercise 向量化）→T6（generatePlan LLM 化）→T7（A/B 验证）。

**Tech Stack:** Mem0（推荐）或自建 / pgvector 或 sqlite-vec / DeepSeek R1 或 minimax reasoning / OpenAI text-embedding-3-small 或本地 embedding

**对应缺口:** G26、G27、G28

**依赖:** Sprint 6 V3（提供 memoryRecall 注入点）+ Sprint 2 评估集（验证不下降）

---

## 文件结构

```
backend/
├── src/memory/
│   ├── memoryStore.ts                      # T2 接口
│   ├── memoryStoreMem0.ts                  # T2 Mem0 实现（选型 A）
│   ├── memoryStoreCustom.ts                # T2 自建实现（选型 B 备用）
│   ├── memoryExtractor.ts                  # T2 异步抽取
│   ├── memoryRecall.ts                     # T3 召回
│   └── memoryTypes.ts                      # T2 类型
├── src/agents/v3/nodes/
│   ├── memoryRecall.ts                     # T3 V3 graph 节点
│   └── memoryWrite.ts                      # T2 V3 graph 节点（异步）
├── src/services/exerciseSearchService.ts    # T5
├── src/tools/generatePlan.ts                # T6 改造
├── src/agents/v3/nodes/llmCall.ts          # T3 注入 memory 段
├── prisma/schema.prisma                    # T2 UserMemory 表；T5 Exercise.embedding
└── tests/
    ├── unit/memory/*.test.ts
    ├── integration/cross-session-memory.int.test.ts # T3
    └── eval/golden-cases.json              # T6 新增 plan 生成 case
```

---

## Task 1: 评估并选型 Memory 框架

**Goal:** 在 Mem0 / Letta / Zep Graphiti / 自建 之间做技术选型，写 1 页 decision doc。

**Files:**
- Create: `docs/superpowers/plans/sprint7-memory-selection.md`

**评估维度:**
- 自部署难度
- 对 MySQL/Prisma 友好度（不强制额外的图库/向量库依赖）
- TypeScript SDK 成熟度
- 是否支持 Episodic/Semantic/Procedural 分层抽取
- 时间感知（Zep 的 Graphiti 强项）

**Steps:**

- [ ] **Step 1: 写候选对比**

| 维度 | Mem0 | Letta | Zep | 自建 |
|---|---|---|---|---|
| 自部署 | ✅ python，需 docker | ✅ 自带 server | ✅ python+postgres | ✅ |
| TS SDK | ✅ 完善 | ⚠️ 较弱 | ✅ | N/A |
| 分层抽取 | ✅ | ✅ | ✅（图谱）| 需手写 |
| 时间感知 | 弱 | 弱 | ⭐ 强 | 弱 |
| 评估 |  |  |  |  |

- [ ] **Step 2: 写 PoC**

跑 3 个核心场景：①跨会话偏好记忆 ②伤病记忆 ③目标演进。

- [ ] **Step 3: 决策**

推荐 Mem0：TS SDK 成熟 + 抽取分层完善 + 部署轻量。如 PoC 失败则降级"自建（基于现有 ChatMessage + UserMemory 表）"。

- [ ] **Step 4: Commit decision doc**

---

## Task 2: Memory Store 集成

**Goal:** 实现 MemoryStore 接口（抽象 Mem0 / 自建），新建 UserMemory 表，给 V3 graph 加 `memoryWrite` 异步节点。

**Files:**
- Modify: `backend/prisma/schema.prisma`
- Create: `backend/src/memory/memoryTypes.ts`、`memoryStore.ts`、`memoryStoreMem0.ts`、`memoryExtractor.ts`
- Create: `backend/src/agents/v3/nodes/memoryWrite.ts`

**Steps:**

- [ ] **Step 1: schema**

```prisma
model UserMemory {
  id          String   @id @default(cuid())
  userId      Int      @map("user_id")
  category    String   @db.VarChar(32)  // 'preference' | 'injury' | 'goal' | 'fact' | 'episode'
  content     String   @db.Text
  importance  Decimal  @default(0.5) @db.Decimal(3, 2)
  source      String?  @db.VarChar(100)  // chatMessageId or 'plan-execution-2026-06-15'
  embedding   Bytes?   // pgvector / sqlite-vec serialized
  metadata    Json?
  createdAt   DateTime @default(now()) @map("created_at")
  lastAccess  DateTime @default(now()) @map("last_access")

  @@index([userId, category])
  @@index([userId, createdAt])
  @@map("user_memory")
}
```

- [ ] **Step 2: MemoryStore 接口**

```typescript
export type MemoryCategory = 'preference' | 'injury' | 'goal' | 'fact' | 'episode';

export interface MemoryItem {
  id: string;
  userId: number;
  category: MemoryCategory;
  content: string;
  importance: number;
  source?: string;
  createdAt: Date;
}

export interface MemoryStore {
  add(userId: number, items: Omit<MemoryItem, 'id' | 'createdAt' | 'userId'>[]): Promise<void>;
  recall(userId: number, query: string, opts?: { topK?: number; categories?: MemoryCategory[] }): Promise<MemoryItem[]>;
  decay(userId: number): Promise<void>; // 周期性降低不常用 memory 的 importance
}
```

- [ ] **Step 3: Mem0 实现**

`memoryStoreMem0.ts` — 调 Mem0 SDK，把 `add` / `search` 适配到上面接口。

- [ ] **Step 4: 抽取器**

`memoryExtractor.ts` — 用 LLM 从对话中抽取记忆条目（输出 zod schema 强约束）：

```typescript
const ExtractSchema = z.object({
  memories: z.array(z.object({
    category: z.enum(['preference', 'injury', 'goal', 'fact', 'episode']),
    content: z.string().max(200),
    importance: z.number().min(0).max(1),
  })),
});

export async function extractMemoriesFromTurn(userMsg: string, aiReply: string, toolData: any): Promise<...> {
  // 调用 minimax 让它输出严格 JSON
}
```

- [ ] **Step 5: V3 节点**

```typescript
// memoryWrite.ts —— 异步触发，不阻塞主回复
export async function memoryWriteNode(state) {
  // fire-and-forget
  (async () => {
    try {
      const items = await extractMemoriesFromTurn(state.rawMessage, state.finalReply, state.finalToolData);
      if (items.length) await memoryStore.add(state.userId, items);
    } catch (e) { console.error('[memoryWrite]', e); }
  })();
  return {};
}
```

把 `memoryWrite` 节点放在 `final_reply` 之后、END 之前（或在 finalReply 内 fire-and-forget）。

- [ ] **Step 6: 测试 + Commit**

---

## Task 3: Memory 召回 + 注入 V3 graph

**Goal:** 在 `llm_call` 节点前加 `memory_recall`，查 Top-3 相关 memory 注入到 system prompt。

**Files:**
- Create: `backend/src/agents/v3/nodes/memoryRecall.ts`
- Modify: `backend/src/agents/v3/graph.ts`、`promptBuilder.ts`

**Steps:**

- [ ] **Step 1: memoryRecall 节点**

```typescript
export async function memoryRecallNode(state) {
  const items = await memoryStore.recall(state.userId, state.rawMessage, { topK: 3 });
  return { recalledMemories: items };
}
```

- [ ] **Step 2: graph 加边**

```typescript
graph.addNode('memory_recall', memoryRecallNode);
graph.addEdge('compress', 'memory_recall');
graph.addEdge('memory_recall', 'clarification_check');
```

- [ ] **Step 3: prompt 注入**

`buildSystemPrompt` 增加 `recalledMemories` 参数，渲染为：

```
【你之前记住的关于这位用户的事】
- [preference] {content}
- [injury] {content}
```

- [ ] **Step 4: 跨会话集成测试**

`tests/integration/cross-session-memory.int.test.ts`：
1. session1：发"我膝盖之前受过伤"
2. session2（3 天后模拟）：发"帮我生成计划"
3. 验证 generatePlan 的输出不含深蹲、单腿蹲等膝盖负重大的动作

- [ ] **Step 5: Commit**

---

## Task 4: 替换 UserContext.context_text 为按需召回

**Goal:** 当前 `userContextService` 一次性生成 90 天总结存到 `context_text`，过时即重新生成；改为：保留 `profile_snapshot`（基础信息），但 `context_text` 改为运行时按需从 Memory 召回。

**Files:**
- Modify: `backend/src/services/userContextService.ts`
- Modify: `backend/prisma/schema.prisma`（context_text 字段保留但不再用，标 @deprecated 注释）

**Steps:**

- [ ] **Step 1: profile_snapshot 仍由历史聚合服务负责（goal/experience/frequency/body_weight）**

- [ ] **Step 2: V3 graph 的 system prompt 不再用 context_text**

只用 `profile_snapshot` + `recalledMemories`。

- [ ] **Step 3: schema 留字段（向后兼容），通过 V3 enable flag 切换**

- [ ] **Step 4: 测试 + Commit**

---

## Task 5: Exercise 库向量检索

**Goal:** 把当前的 process-local 全量数组改为 pgvector / sqlite-vec 向量检索。

**Files:**
- Modify: `backend/prisma/schema.prisma` 加 `Exercise.embedding`
- Create: `backend/src/services/exerciseSearchService.ts`
- Modify: 各 tool / fallbackHandler 引用点

**Steps:**

- [ ] **Step 1: 决策向量库**

MySQL 8 没有原生向量类型，方案：
- A. MySQL 用 Bytes 存 embedding，纯 SQL 计算余弦（性能差但简单）
- B. 引入 Qdrant 独立服务
- C. 切到 PostgreSQL + pgvector（破坏性大）

推荐 **A 起步 + 后续按需迁 B**。Exercise 量级（百-千），全表扫余弦完全可接受。

- [ ] **Step 2: schema**

```prisma
model Exercise {
  // ... 现有字段 ...
  embedding Bytes? // float32 array, 768 维（minimax embed-large）or 1024 维
  embeddingModel String? @map("embedding_model") @db.VarChar(64)
  embeddingUpdatedAt DateTime? @map("embedding_updated_at")
}
```

- [ ] **Step 3: 离线 embed job**

`backend/scripts/embedExercises.ts` —— 拉所有 Exercise，对每条调 embedding API，存 Bytes。增量：只 embed `embeddingUpdatedAt < updatedAt` 的行。

- [ ] **Step 4: 检索服务**

`exerciseSearchService.ts`：
```typescript
export async function searchSimilar(query: string, topK = 10): Promise<Exercise[]> {
  const queryVec = await embed(query);
  const all = await prisma.exercise.findMany({ where: { embedding: { not: null } } });
  return all
    .map(e => ({ e, sim: cosine(deserialize(e.embedding), queryVec) }))
    .sort((a, b) => b.sim - a.sim)
    .slice(0, topK)
    .map(r => r.e);
}
```

- [ ] **Step 5: 各调用点替换**

`fitnessAgentV2/fallbackHandler.ts` 中按动作名匹配的逻辑改成"用 LLM 输出的动作名查 top-3 候选 → 让 LLM 二次确认"。

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(exercise): embedding-based similarity search (MySQL Bytes + in-app cosine)"
```

---

## Task 6: generatePlan LLM 化

**Goal:** 当前 `generatePlan.ts` 是纯规则引擎，改为：reasoning model + 用户 history RAG + memory + structured output。规则引擎作为 fallback。

**Files:**
- Modify: `backend/src/tools/generatePlan.ts`
- Create: `backend/src/services/planLLMService.ts`

**Steps:**

- [ ] **Step 1: 选 reasoning model**

候选：DeepSeek R1（性能好）/ minimax reasoning（如有）/ Claude thinking（贵但稳）。
新增环境变量 `REASONING_PROVIDER` / `REASONING_API_KEY` / `REASONING_MODEL` / `REASONING_BASE_URL`。

- [ ] **Step 2: planLLMService**

```typescript
const PlanSchema = z.object({
  goal: z.string(),
  weeklyFrequency: z.number().int().min(1).max(7),
  durationWeeks: z.number().int().min(2).max(24),
  schedule: z.array(z.object({
    dayOfWeek: z.number().int().min(1).max(7),
    focus: z.string(),
    exercises: z.array(z.object({
      name: z.string(),
      sets: z.number().int().min(1).max(10),
      reps: z.string(),  // e.g. "8-12"
      restSeconds: z.number().int().min(30).max(300),
      notes: z.string().optional(),
    })).min(1).max(12),
  })).min(1).max(7),
  rationale: z.string(),  // 给用户看的推理过程
});

export async function generatePlanLLM(input: PlanInput, ctx: {
  recentWorkouts: any[]; memories: MemoryItem[]; profile: any; allowedExercises: string[];
}) {
  const reasoning = await createReasoningModel();
  const result = await reasoning.invoke(buildPrompt(input, ctx));
  return PlanSchema.parse(JSON.parse(result.content));
}
```

- [ ] **Step 3: 改造 generatePlanTool**

```typescript
func: async ({ userId, user_profile }) => {
  const ctx = {
    recentWorkouts: await queryWorkoutsLast90Days(userId),
    memories: await memoryStore.recall(userId, 'training preferences injuries goals', { topK: 5 }),
    profile: user_profile,
    allowedExercises: await searchSimilar(user_profile.goal + ' ' + user_profile.equipment, 30).then(rs => rs.map(r => r.name)),
  };

  let plan;
  try {
    plan = await generatePlanLLM(input, ctx);
  } catch (e) {
    console.warn('[generatePlan] LLM failed, falling back to rules:', e);
    plan = await generatePlanByRules(input);  // 现有逻辑保留
  }

  const created = await planService.createPlan(userId, plan);
  return JSON.stringify({ aiReply: plan.rationale, dataType: 'plan', result: { planId: created.id, schedule: plan.schedule, goal: plan.goal } });
}
```

- [ ] **Step 4: 评估集加 5 个 plan 生成 case**

- [ ] **Step 5: Commit**

---

## Task 7: A/B 验证

**Goal:** 让 20 个用户分别走"LLM 生成"和"规则生成"，问卷收集满意度。

**Files:**
- Create: `backend/src/routes/feedback.ts`（接收 5 星评分）
- Modify: `fitlc-mini/pages/plan-detail/...` 显示评分按钮

**Steps:**

- [ ] **Step 1: feedback 表**

```prisma
model PlanFeedback {
  id Int @id @default(autoincrement())
  userId Int
  planId Int
  rating Int  // 1-5
  comment String? @db.Text
  generatedBy String @db.VarChar(8)  // 'llm' or 'rules'
  createdAt DateTime @default(now())
}
```

- [ ] **Step 2: 路由 + 小程序按钮**

- [ ] **Step 3: 灰度 50% 用户 LLM 生成 + 50% 规则生成（按 userId hash）**

- [ ] **Step 4: 7 天后看平均评分**

期望 LLM ≥ 4.0 / 规则 ≤ 3.5。

- [ ] **Step 5: Commit + 写复盘**

---

## Sprint 7 总验收门禁

- [ ] 跨会话记忆测试通过（session1 说膝盖伤，session2 生成计划不含深蹲）
- [ ] Exercise 库扩到 1000+ 时 latency 不变（向量检索 < 50ms）
- [ ] AI 生成计划满意度 4 星比例 ≥ 70%
- [ ] Sprint 2 评估集 + Sprint 3 红队 case 通过率不下降
- [ ] Memory 抽取 fire-and-forget，不阻塞主对话 reply
- [ ] `docs/PRD.md` 加"Long-term Memory 架构"章节
