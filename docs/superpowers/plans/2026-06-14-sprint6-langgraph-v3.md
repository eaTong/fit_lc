# Sprint 6：LangGraph V3 编排重写 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** 用 LangGraph 替换手写两次 LLM 调用编排，获得状态机 + 循环 + 条件边 + 持久化 Checkpoint + HITL。最终目标：V3 评估通过率 ≥ V2 + 5%，且能表达"tool 失败 → 重新规划"这类多步推理。

**Architecture:** 8 个 Task。T1（依赖+调研）→T2（StateGraph 节点）→T3（Checkpoint 持久化）→T4（HITL）→T5（灰度路由）→T6（A/B 对比）→T7（V2 下线）→T8（Prompt 版本管理）。

**Tech Stack:** `@langchain/langgraph` / Prisma 自实现 BaseCheckpointSaver / LangSmith Studio (可选，本地可视化)

**对应缺口:** G23、G24、G25

**依赖:** Sprint 2（评估集）+ Sprint 4（SSE 改造的流式生成器思路复用）+ Sprint 5（fallback / prompt cache）

---

## 文件结构

```
backend/
├── src/agents/v3/
│   ├── index.ts                            # T2 入口
│   ├── graph.ts                            # T2 主 StateGraph
│   ├── state.ts                            # T2 状态定义
│   ├── nodes/
│   │   ├── vision.ts                       # T2
│   │   ├── compress.ts                     # T2
│   │   ├── clarificationCheck.ts           # T2
│   │   ├── llmCall.ts                      # T2
│   │   ├── toolDispatch.ts                 # T2
│   │   ├── validate.ts                     # T2
│   │   ├── hitlGate.ts                     # T4
│   │   └── finalReply.ts                   # T2
│   ├── edges.ts                            # T2 条件边定义
│   ├── checkpointer.ts                     # T3 PrismaCheckpointSaver
│   └── runV3.ts                            # T2 外部 API（runAgentV3 / runAgentV3Stream）
├── src/config/featureFlags.ts              # T5
├── src/routes/chat.ts                      # T5 灰度路由
├── prisma/schema.prisma                    # T3 Checkpoint 表
└── tests/
    ├── unit/agents/v3/                     # 每个节点独立单测
    ├── integration/v3-graph.int.test.ts    # T2
    ├── integration/v3-checkpoint.int.test.ts # T3
    ├── integration/v3-hitl.int.test.ts     # T4
    └── eval/runEval.ts                     # T6 扩展支持 V3 对比
```

---

## Task 1: 引入 LangGraph + 调研

**Goal:** 安装 `@langchain/langgraph`，搭一个最小 hello-world 验证 ts API，整理给团队的最佳实践 cheat sheet。

**Files:**
- Modify: `backend/package.json`
- Create: `docs/superpowers/plans/sprint6-langgraph-cheatsheet.md`

**Steps:**

- [ ] **Step 1: 安装**

```bash
cd backend
npm install @langchain/langgraph
```

- [ ] **Step 2: 跑官方 example**

跟着 [LangGraph.js Quickstart](https://langchain-ai.github.io/langgraphjs/) 把 ReAct + Tool Calling 的 demo 跑通；存档代码到 `backend/scripts/langgraph-demo.ts`。

- [ ] **Step 3: 写 cheat sheet**

Create: `docs/superpowers/plans/sprint6-langgraph-cheatsheet.md` — 记录：
- StateGraph / Annotation API
- addNode / addEdge / addConditionalEdges
- Checkpoint 接口
- Streaming 接口（`graph.stream(input, { streamMode: 'values'|'updates'|'messages' })`）
- HITL（`interrupt()` / `Command(resume=...)`）

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(deps+docs): add @langchain/langgraph + cheat sheet"
```

---

## Task 2: 设计并实现 V3 StateGraph

**Goal:** 把当前 `fitnessAgentV2Stream` 的 10 步流程改造为 StateGraph。

**Files:**
- Create: `backend/src/agents/v3/state.ts`、`graph.ts`、`edges.ts`、`nodes/*.ts`、`runV3.ts`、`index.ts`

**Steps:**

- [ ] **Step 1: 定义 State**

Create: `backend/src/agents/v3/state.ts`

```typescript
import { Annotation } from '@langchain/langgraph';
import { BaseMessage } from '@langchain/core/messages';

export const FitnessAgentState = Annotation.Root({
  userId: Annotation<number>(),
  rawMessage: Annotation<string>(),
  imageUrls: Annotation<string[]>({ reducer: (_, n) => n, default: () => [] }),
  visionResult: Annotation<{ message: string; analysis: string | null; error?: string } | null>({
    reducer: (_, n) => n, default: () => null,
  }),
  history: Annotation<BaseMessage[]>({ reducer: (_, n) => n, default: () => [] }),
  historySummary: Annotation<string | null>({ reducer: (_, n) => n, default: () => null }),
  messages: Annotation<BaseMessage[]>({
    reducer: (cur, next) => [...cur, ...(Array.isArray(next) ? next : [next])],
    default: () => [],
  }),
  toolCalls: Annotation<any[]>({ reducer: (_, n) => n, default: () => [] }),
  toolResults: Annotation<any[]>({ reducer: (_, n) => n, default: () => [] }),
  finalReply: Annotation<string>({ reducer: (_, n) => n, default: () => '' }),
  finalToolData: Annotation<any>({ reducer: (_, n) => n, default: () => null }),
  iteration: Annotation<number>({ reducer: (_, n) => n, default: () => 0 }),
  needsClarification: Annotation<boolean>({ reducer: (_, n) => n, default: () => false }),
  needsHITL: Annotation<{ reason: string; preview: any } | null>({ reducer: (_, n) => n, default: () => null }),
  errors: Annotation<string[]>({ reducer: (cur, n) => [...cur, ...(Array.isArray(n) ? n : [n])], default: () => [] }),
});

export type FitnessAgentStateT = typeof FitnessAgentState.State;
```

- [ ] **Step 2: 实现节点**

每个节点是 `async (state) => Partial<State>`。以 `vision.ts` 为例：

Create: `backend/src/agents/v3/nodes/vision.ts`

```typescript
import { preprocessVision } from '../../plugins/visionPreprocessor';
import type { FitnessAgentStateT } from '../state';

export async function visionNode(state: FitnessAgentStateT) {
  const r = await preprocessVision(state.rawMessage, state.imageUrls);
  return {
    visionResult: { message: r.message, analysis: r.imageAnalysis, error: r.error },
  };
}
```

其余节点（compress / clarificationCheck / llmCall / toolDispatch / validate / finalReply）按照 fitnessAgentV2Stream 的对应步骤拆分。

`llmCall.ts` 关键：

```typescript
import { createChatModel } from '../../chatFactory';
import { buildSystemPrompt } from '../../promptBuilder';
import { tools } from '../tools';
import { AIMessage, HumanMessage } from '@langchain/core/messages';

export function makeLlmCallNode(callbacks?: any[]) {
  return async (state: FitnessAgentStateT) => {
    const sys = await buildSystemPrompt(state.userContext ?? null, state.historySummary, state.visionResult?.error);
    const baseModel = await createChatModel(callbacks);
    const model = baseModel.bindTools(tools as any);
    const ai = await model.invoke([sys, ...state.history, ...state.messages, new HumanMessage(state.visionResult?.message ?? state.rawMessage)]);
    return {
      messages: [ai],
      toolCalls: (ai as any).tool_calls ?? [],
      iteration: state.iteration + 1,
    };
  };
}
```

`toolDispatch.ts` 复用 `executeToolsBatch`；`validate.ts` 把当前 fitnessAgentV2 中的 validation 错误注入流程提取出来；`finalReply.ts` 流式生成最终 reply（用 model.stream 推送到外层 generator）。

- [ ] **Step 3: 装配 graph**

Create: `backend/src/agents/v3/graph.ts`

```typescript
import { StateGraph, START, END } from '@langchain/langgraph';
import { FitnessAgentState, FitnessAgentStateT } from './state';
import { visionNode } from './nodes/vision';
import { compressNode } from './nodes/compress';
import { clarificationCheckNode } from './nodes/clarificationCheck';
import { makeLlmCallNode } from './nodes/llmCall';
import { toolDispatchNode } from './nodes/toolDispatch';
import { validateNode } from './nodes/validate';
import { hitlGateNode } from './nodes/hitlGate';
import { finalReplyNode } from './nodes/finalReply';

const MAX_ITERATIONS = 3;

export function buildGraph(callbacks?: any[]) {
  const graph = new StateGraph(FitnessAgentState)
    .addNode('vision', visionNode)
    .addNode('compress', compressNode)
    .addNode('clarification_check', clarificationCheckNode)
    .addNode('llm_call', makeLlmCallNode(callbacks))
    .addNode('tool_dispatch', toolDispatchNode)
    .addNode('validate', validateNode)
    .addNode('hitl_gate', hitlGateNode)
    .addNode('final_reply', finalReplyNode);

  graph.addEdge(START, 'vision');
  graph.addEdge('vision', 'compress');
  graph.addEdge('compress', 'clarification_check');

  // clarification 失败时 → 直接 final_reply（追问用户）
  graph.addConditionalEdges('clarification_check', (s: FitnessAgentStateT) => {
    if (s.needsClarification) return 'final_reply';
    return 'llm_call';
  });

  // LLM 决定是否调 tool
  graph.addConditionalEdges('llm_call', (s: FitnessAgentStateT) => {
    if (s.toolCalls.length === 0) return 'final_reply';
    return 'hitl_gate';
  });

  // HITL：高风险 tool 调用前暂停
  graph.addConditionalEdges('hitl_gate', (s: FitnessAgentStateT) => {
    if (s.needsHITL) return END;          // 等用户 resume
    return 'tool_dispatch';
  });

  graph.addEdge('tool_dispatch', 'validate');

  // validate 失败且未超 MAX_ITERATIONS → 回到 llm_call 让 LLM 重新规划
  graph.addConditionalEdges('validate', (s: FitnessAgentStateT) => {
    const hasError = s.errors.length > 0 && s.errors[s.errors.length - 1].includes('validation');
    if (hasError && s.iteration < MAX_ITERATIONS) return 'llm_call';
    return 'final_reply';
  });

  graph.addEdge('final_reply', END);
  return graph.compile();
}
```

- [ ] **Step 4: runV3 入口**

Create: `backend/src/agents/v3/runV3.ts`

```typescript
import { buildGraph } from './graph';
import { createTraceCallbacks } from '../../observability/langfuse';
import type { StreamEvent } from '../streamEvents';

export async function* runAgentV3Stream(
  userId: number,
  message: string,
  userContext: any,
  history: any[],
  imageUrls: string[]
): AsyncGenerator<StreamEvent> {
  const callbacks = createTraceCallbacks({ userId, agentVersion: 'v3', imageCount: imageUrls.length });
  const graph = buildGraph(callbacks);

  yield { type: 'start' };

  for await (const chunk of graph.stream(
    { userId, rawMessage: message, imageUrls, history },
    { streamMode: 'updates', configurable: { thread_id: `user-${userId}` } }
  )) {
    // chunk 形如 { nodeName: stateUpdate }
    for (const [nodeName, update] of Object.entries(chunk)) {
      yield translateNodeUpdateToEvent(nodeName, update);
    }
  }
  yield { type: 'done' };
}
```

- [ ] **Step 5: 节点单测 + 图集成测试**

每个节点至少 1 个单测；`tests/integration/v3-graph.int.test.ts` 测完整路径。

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(agent-v3): LangGraph StateGraph for fitness agent (parity with V2)"
```

---

## Task 3: Checkpoint 持久化（用 Prisma 实现 BaseCheckpointSaver）

**Goal:** 支持对话中断后从最后一个 checkpoint 恢复（用户合上小程序、网络断、HITL 暂停等场景）。

**Files:**
- Modify: `backend/prisma/schema.prisma` 加 `AgentCheckpoint` 表
- Create: `backend/src/agents/v3/checkpointer.ts`

**Steps:**

- [ ] **Step 1: schema 加表**

```prisma
model AgentCheckpoint {
  id         String   @id @default(cuid())
  threadId   String   @map("thread_id") @db.VarChar(64)
  checkpoint Json
  metadata   Json?
  parentId   String?  @map("parent_id")
  createdAt  DateTime @default(now()) @map("created_at")

  @@index([threadId, createdAt])
  @@map("agent_checkpoint")
}
```

`npx prisma migrate dev --name add_agent_checkpoint`

- [ ] **Step 2: 实现 PrismaCheckpointSaver**

Create: `backend/src/agents/v3/checkpointer.ts`

```typescript
import { BaseCheckpointSaver, type Checkpoint, type CheckpointMetadata, type CheckpointTuple } from '@langchain/langgraph';
import prisma from '../../config/prisma';

export class PrismaCheckpointSaver extends BaseCheckpointSaver {
  async put(config: any, checkpoint: Checkpoint, metadata: CheckpointMetadata) {
    const threadId = config.configurable?.thread_id;
    await prisma.agentCheckpoint.create({
      data: {
        id: checkpoint.id,
        threadId,
        checkpoint: checkpoint as any,
        metadata: metadata as any,
        parentId: config.configurable?.checkpoint_id || null,
      },
    });
    return { configurable: { thread_id: threadId, checkpoint_id: checkpoint.id } };
  }

  async getTuple(config: any): Promise<CheckpointTuple | undefined> {
    const threadId = config.configurable?.thread_id;
    const checkpointId = config.configurable?.checkpoint_id;
    const row = checkpointId
      ? await prisma.agentCheckpoint.findUnique({ where: { id: checkpointId } })
      : await prisma.agentCheckpoint.findFirst({ where: { threadId }, orderBy: { createdAt: 'desc' } });
    if (!row) return undefined;
    return {
      config: { configurable: { thread_id: threadId, checkpoint_id: row.id } },
      checkpoint: row.checkpoint as any,
      metadata: row.metadata as any,
      parentConfig: row.parentId ? { configurable: { thread_id: threadId, checkpoint_id: row.parentId } } : undefined,
    };
  }

  async *list(config: any) {
    const threadId = config.configurable?.thread_id;
    const rows = await prisma.agentCheckpoint.findMany({ where: { threadId }, orderBy: { createdAt: 'desc' } });
    for (const r of rows) {
      yield {
        config: { configurable: { thread_id: threadId, checkpoint_id: r.id } },
        checkpoint: r.checkpoint as any,
        metadata: r.metadata as any,
      };
    }
  }
}
```

- [ ] **Step 3: 在 buildGraph 注入**

```typescript
import { PrismaCheckpointSaver } from './checkpointer';
const checkpointer = new PrismaCheckpointSaver();
// graph.compile({ checkpointer });
```

- [ ] **Step 4: 集成测试**

`tests/integration/v3-checkpoint.int.test.ts` — 跑一半对话杀进程，新进程从同 thread_id 继续，验证状态恢复。

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(agent-v3): Prisma-backed checkpoint persistence (resume across restarts)"
```

---

## Task 4: HITL（Human-in-the-Loop）节点

**Goal:** 高风险操作（删除计划、批量修改、大体重突变）暂停等待用户确认。

**Files:**
- Modify: `backend/src/agents/v3/nodes/hitlGate.ts`
- Create: `backend/src/routes/chat.ts` 加 `/chat/hitl/resume`

**Steps:**

- [ ] **Step 1: hitlGate 节点**

```typescript
import { interrupt } from '@langchain/langgraph';
import type { FitnessAgentStateT } from '../state';

const HIGH_RISK_TOOLS = new Set(['delete_plan', 'bulk_delete_workout']);
const HIGH_RISK_PARAMS = (tc: any) => {
  if (tc.name === 'save_measurement' && tc.args.measurements?.some((m: any) => m.value > 200)) return true; // 异常体重
  return false;
};

export async function hitlGateNode(state: FitnessAgentStateT) {
  const risky = state.toolCalls.find((tc) => HIGH_RISK_TOOLS.has(tc.name) || HIGH_RISK_PARAMS(tc));
  if (!risky) return { needsHITL: null };

  // 暂停并等待外部 resume
  const userDecision = interrupt({
    reason: `high-risk tool: ${risky.name}`,
    preview: risky,
  });

  // resume 时这里继续执行
  if (userDecision === 'confirm') return { needsHITL: null };
  return { needsHITL: null, toolCalls: [] };  // 用户拒绝 → 清空 tool 调用直接结束
}
```

- [ ] **Step 2: resume 路由**

```typescript
router.post('/hitl/resume', authMiddleware, async (req, res) => {
  const { threadId, decision } = req.body; // 'confirm' | 'reject'
  const graph = buildGraph();
  const result = await graph.invoke({}, { configurable: { thread_id: threadId }, command: { resume: decision } });
  res.json({ reply: result.finalReply });
});
```

- [ ] **Step 3: 集成测试 + Commit**

```bash
git commit -m "feat(agent-v3): HITL gate for high-risk tools with /chat/hitl/resume endpoint"
```

---

## Task 5: 灰度路由（V2 / V3 切换）

**Files:**
- Create: `backend/src/config/featureFlags.ts`
- Modify: `backend/src/routes/chat.ts`

**Steps:**

- [ ] **Step 1: featureFlags**

```typescript
import crypto from 'crypto';

export interface FeatureFlags { agentV3Enabled: boolean; agentV3Rollout: number; }

export const featureFlags: FeatureFlags = {
  agentV3Enabled: process.env.FEATURE_AGENT_V3 === 'true',
  agentV3Rollout: parseFloat(process.env.FEATURE_AGENT_V3_ROLLOUT || '0'),
};

export function shouldUseAgentV3(userId: number): boolean {
  if (!featureFlags.agentV3Enabled) return false;
  if (featureFlags.agentV3Rollout >= 1) return true;
  if (featureFlags.agentV3Rollout <= 0) return false;
  const hash = crypto.createHash('sha1').update(`v3-${userId}`).digest('hex');
  const bucket = parseInt(hash.slice(0, 8), 16) / 0xffffffff;
  return bucket < featureFlags.agentV3Rollout;
}
```

- [ ] **Step 2: 路由分流**

```typescript
import { shouldUseAgentV3 } from '../config/featureFlags';

router.post('/message/stream', /* ... */ async (req, res) => {
  const userId = req.user.id;
  const generator = shouldUseAgentV3(userId)
    ? runAgentV3Stream(userId, message, userContext, history, imageUrls)
    : runAgentV2Stream(userId, message, userContext, history, imageUrls);
  for await (const ev of generator) sse.send(ev.type, ev);
  // ...
});
```

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(rollout): featureFlags + V3 gradual rollout by userId hash"
```

---

## Task 6: V3 vs V2 A/B 对比

**Goal:** 用 Sprint 2 评估集同时跑 V2 和 V3，输出对比报告。

**Files:**
- Modify: `backend/tests/eval/runEval.ts`

**Steps:**

- [ ] **Step 1: 让 runEval 接受 agentVersion 参数**

```typescript
const agentVersion = process.env.EVAL_AGENT_VERSION || 'v2';
const runFn = agentVersion === 'v3' ? runAgentV3 : runAgentV2;
// ... 在 results 文件名加 -v2 / -v3 ...
```

- [ ] **Step 2: 跑两次**

```bash
EVAL_AGENT_VERSION=v2 npm run eval
EVAL_AGENT_VERSION=v3 npm run eval
```

- [ ] **Step 3: 对比脚本**

`backend/tests/eval/compareVersions.ts` — 读两份结果，逐 case 对比 passed/latency/tokens，输出 diff 表。

- [ ] **Step 4: Commit**

```bash
git commit -m "test(eval): A/B comparison V2 vs V3 (pass rate + latency + tokens)"
```

---

## Task 7: V2 下线

**Goal:** V3 评估通过率 ≥ V2 + 5% 并稳定运行 7 天后，删除 V2 代码。

**Files:**
- Delete: `backend/src/agents/fitnessAgentV2.ts`、`fitnessAgentV2Stream.ts`
- Modify: `backend/src/routes/chat.ts`、`backend/src/config/featureFlags.ts`

**Steps:**

- [ ] **Step 1: 灰度到 100%**

环境变量 `FEATURE_AGENT_V3_ROLLOUT=1.0` 部署，观察 24h。

- [ ] **Step 2: 删除 V2**

```bash
git rm backend/src/agents/fitnessAgentV2.ts backend/src/agents/fitnessAgentV2Stream.ts
# 把所有 import V2 的地方改成 V3
```

- [ ] **Step 3: 删除 featureFlags 切换逻辑（保留 flag 框架供后续 Sprint 复用）**

- [ ] **Step 4: 测试 + Commit**

```bash
git commit -m "chore(agent): remove V2 after V3 stable for 7 days"
```

---

## Task 8: Prompt 版本管理（与 Sprint 2 T4 衔接）

**Goal:** Sprint 2 T4 已经把 prompt 迁到 Langfuse；本任务把"V3 节点级 prompt"也迁过去，并实现一键回滚（Langfuse 的 label rollback 功能）。

**Files:**
- 各 V3 节点中所有内联 prompt 都改为 `await getPromptText(name, fallback)`

**Steps:**

- [ ] **Step 1: 列出所有 V3 内联 prompt**

```bash
grep -rn "你是\|系统提示\|分析以下" backend/src/agents/v3/ | head -50
```

- [ ] **Step 2: 在 Langfuse 后台创建对应 prompt（命名规范 `fitlc.v3.<node>.<purpose>`）**

- [ ] **Step 3: 代码改造**

把每条内联 prompt 替换为 `await getPromptText('fitlc.v3.llmCall.system', INLINE_FALLBACK)`。

- [ ] **Step 4: 文档**

`docs/PRD.md` 新增"Prompt 版本管理"章节：所有用户面 prompt 的命名空间、版本切换流程、回滚步骤。

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(agent-v3): migrate all node prompts to Langfuse Prompt Management"
```

---

## Sprint 6 总验收门禁

- [ ] V3 评估通过率 ≥ V2 + 5%
- [ ] V3 latency P50 不超过 V2 + 10%（LangGraph 编排开销可接受）
- [ ] tool 失败时 V3 自动 LLM 重新规划（验证 condition edge 工作）
- [ ] 对话中断后能从 checkpoint 恢复（HITL 流程验证）
- [ ] 灰度从 10% 平稳过渡到 100%，无明显回归
- [ ] V2 代码已删除
- [ ] Sprint 3 红队 case 通过率不下降
- [ ] `docs/PRD.md` 加"Agent 架构 V3"章节
