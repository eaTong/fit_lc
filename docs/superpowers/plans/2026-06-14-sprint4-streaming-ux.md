# Sprint 4：SSE 流式输出 + UX 升级 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** 把对话从"一次性等 5-8s 才看到完整回复"升级为"SSE 流式 + 阶段事件"模式：TTFT < 500ms，调用工具时显式提示"正在查询训练记录…"。同时给小程序加自动重试 + 错误码区分 + 前端 idempotency_key。

**Architecture:** 6 个 Task。T1（runAgentV2Stream）+ T2（SSE 路由）是核心；T3（小程序 chunked）+ T4（小程序渲染）落地客户端；T5（错误处理）+ T6（idempotency_key）是 UX 收尾。可串行（T1→T2→T3→T4）+ T5/T6 并行。

**Tech Stack:** Express SSE / LangChain `model.stream()` / 微信小程序 `wx.request enableChunked: true` / Node.js Readable streams

**对应缺口:** G14、G15

**依赖:** Sprint 1（幂等 service）+ Sprint 2（Langfuse trace 验证 TTFT）

---

## 文件结构

```
backend/
├── src/
│   ├── agents/
│   │   ├── fitnessAgentV2Stream.ts          # T1 新增：流式版 agent
│   │   └── streamEvents.ts                  # T1 新增：事件类型
│   ├── routes/chat.ts                       # T2 新增 SSE 路由
│   └── utils/sse.ts                         # T2 新增：SSE 序列化助手
└── tests/
    ├── unit/agents/fitnessAgentV2Stream.test.ts  # T1
    └── e2e/streaming.e2e.test.ts            # T2

fitlc-mini/
├── api/chat.js                              # T3：sendMessageStream
├── utils/
│   ├── chunkedReader.js                     # T3：chunked 响应解析
│   ├── retry.js                             # T5：通用重试 helper
│   ├── errorCodes.js                        # T5：错误码定义
│   └── uuid.js                              # T6：UUID 生成
└── pages/chat/chat.js                       # T4 流式渲染、T5 错误处理、T6 idempotency_key
```

---

## Task 1: runAgentV2Stream

**Goal:** 创建流式版 agent，把"两次 LLM 调用 + tool"改造为"流式推送 token + 阶段事件"。

**Files:**
- Create: `backend/src/agents/streamEvents.ts`
- Create: `backend/src/agents/fitnessAgentV2Stream.ts`

**Steps:**

- [ ] **Step 1: 定义事件类型**

Create: `backend/src/agents/streamEvents.ts`

```typescript
export type StreamEvent =
  | { type: 'start'; traceId?: string }
  | { type: 'vision_start' }
  | { type: 'vision_done'; analysisPreview?: string }
  | { type: 'vision_error'; message: string }
  | { type: 'thinking' }                                    // 第一次 LLM 调用开始
  | { type: 'token'; delta: string }                        // 第二次 LLM 流式 token
  | { type: 'tool_call'; tool: string }                     // 开始调用工具
  | { type: 'tool_result'; tool: string; success: boolean; preview?: string }
  | { type: 'final'; toolData?: any; visionError?: string }
  | { type: 'done' }
  | { type: 'error'; message: string };
```

- [ ] **Step 2: 实现流式 agent**

Create: `backend/src/agents/fitnessAgentV2Stream.ts`

```typescript
import { AIMessage, HumanMessage, SystemMessage, ToolMessage } from '@langchain/core/messages';
import { preprocessVision } from './plugins/visionPreprocessor';
import { createChatModel } from './chatFactory';
import { executeToolsBatch, extractToolCallsFromResponse } from './toolExecutor';
import { buildSystemPrompt } from './promptBuilder';
import { compressHistory } from './historyCompressor';
import { clarificationManager } from './clarification';
import { createTraceCallbacks } from '../observability/langfuse';
import type { StreamEvent } from './streamEvents';
import { saveWorkoutTool /* ...其他 */ } from '../tools/saveWorkout';

const tools = [/* ...同 V2 */];

export async function* runAgentV2Stream(
  userId: number,
  message: string,
  userContext: any,
  historyMessages: any[],
  imageUrls: string[]
): AsyncGenerator<StreamEvent> {
  const callbacks = createTraceCallbacks({ userId, agentVersion: 'v2', imageCount: imageUrls.length });
  yield { type: 'start' };

  // 1. Vision
  yield { type: 'vision_start' };
  const vis = await preprocessVision(message, imageUrls);
  if (vis.error) {
    yield { type: 'vision_error', message: vis.error };
  } else if (vis.reply) {
    // vision-only 早退：直接 emit final + done
    yield { type: 'final', toolData: vis.toolData };
    yield { type: 'token', delta: vis.reply };
    yield { type: 'done' };
    return;
  } else {
    yield { type: 'vision_done', analysisPreview: vis.imageAnalysis?.slice(0, 80) };
  }
  const processedMessage = vis.error ? message : vis.message;

  // 2. 历史压缩
  const { recent, summary } = await compressHistory(historyMessages);

  // 3. clarification 检查（沿用现有逻辑，省略）
  // 4. build messages
  const systemPrompt = await buildSystemPrompt(userContext, summary, vis.error);
  const messages: any[] = [systemPrompt, ...recent.map((m: any) =>
    m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
  ), new HumanMessage(processedMessage)];

  // 5. 第一次 LLM 调用 — 让 LLM 决定是否调 tool
  yield { type: 'thinking' };
  const baseModel = await createChatModel(callbacks);
  const model = baseModel.bindTools(tools as any);
  const firstResp = await model.invoke(messages); // 这次非流式，因为我们要拿 tool_calls
  const toolCalls = extractToolCallsFromResponse(firstResp);

  let toolResults: any[] = [];
  if (toolCalls.length > 0) {
    for (const tc of toolCalls) yield { type: 'tool_call', tool: tc.name };
    toolResults = await executeToolsBatch(toolCalls, { userId });
    for (const r of toolResults) {
      yield { type: 'tool_result', tool: r.name, success: r.status === 'success', preview: r.result ? JSON.stringify(r.result).slice(0, 120) : undefined };
    }
    // 注入 tool 结果，准备第二次 LLM
    messages.push(firstResp);
    for (const r of toolResults) {
      messages.push(new ToolMessage({ tool_call_id: r.toolCallId, content: JSON.stringify(r.result ?? { error: r.error }) }));
    }
  } else {
    // 无 tool 调用：把第一次响应当作最终回复，流式逐字 emit
    const text = typeof firstResp.content === 'string' ? firstResp.content : '';
    for (const ch of chunkByGrapheme(text, 12)) {
      yield { type: 'token', delta: ch };
      await sleep(15);
    }
    yield { type: 'final', toolData: null, visionError: vis.error };
    yield { type: 'done' };
    return;
  }

  // 6. 第二次 LLM 调用 — 真正流式
  const streamIter = await model.stream(messages);
  let toolDataPayload: any = null;
  for (const r of toolResults) {
    if (r.result?.dataType) {
      toolDataPayload = r.result;
      break;
    }
  }
  for await (const chunk of streamIter) {
    const delta = typeof chunk.content === 'string'
      ? chunk.content
      : Array.isArray(chunk.content)
        ? chunk.content.map((c: any) => c.text || '').join('')
        : '';
    if (delta) yield { type: 'token', delta };
  }

  yield { type: 'final', toolData: toolDataPayload, visionError: vis.error };
  yield { type: 'done' };
}

function chunkByGrapheme(text: string, size: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }
```

- [ ] **Step 3: 测试 + Commit**

写至少 3 个测试：①工具路径（emit tool_call → tool_result → token → final → done）；②无工具路径；③vision-only 路径。

```bash
git commit -m "feat(agent): streaming variant of runAgentV2 with phase events"
```

---

## Task 2: SSE 路由

**Goal:** 提供 `POST /api/chat/message/stream`，把 StreamEvent 序列化为 SSE 推送。

**Files:**
- Create: `backend/src/utils/sse.ts`
- Modify: `backend/src/routes/chat.ts`

**Steps:**

- [ ] **Step 1: SSE 助手**

Create: `backend/src/utils/sse.ts`

```typescript
import type { Response } from 'express';

export function openSseStream(res: Response) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // nginx 不缓冲
  res.flushHeaders?.();
  return {
    send(event: string, data: any) {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    },
    end() {
      res.write(`event: close\ndata: {}\n\n`);
      res.end();
    },
  };
}
```

- [ ] **Step 2: SSE 路由**

Modify: `backend/src/routes/chat.ts`

```typescript
import { openSseStream } from '../utils/sse';
import { runAgentV2Stream } from '../agents/fitnessAgentV2Stream';

router.post('/message/stream', authMiddleware, messageRateLimit, async (req, res) => {
  const userId = req.user.id;
  const { message, imageUrls = [], idempotencyKey } = req.body;
  const cleanMessage = escapeHtml(message);

  // 持久化用户消息（同步阻塞）
  const userMsgRow = await prisma.chatMessage.create({
    data: { userId, role: 'user', content: cleanMessage, imageUrls: imageUrls.length ? imageUrls : null },
  });

  const sse = openSseStream(res);

  // 客户端断连兜底
  req.on('close', () => { /* 这里仅记录，stream loop 内 try 兜底 */ });

  try {
    const userContext = await refreshContextWithLock(userId).catch(() => null);
    const history = await getRecentMessages(userId, 50); // routes 内统一取
    const guardedHistory = guardHistory(history); // Sprint 3 T5

    let finalReply = '';
    let finalToolData: any = null;

    for await (const ev of runAgentV2Stream(userId, cleanMessage, userContext, guardedHistory, imageUrls)) {
      if (ev.type === 'token') finalReply += ev.delta;
      if (ev.type === 'final') finalToolData = ev.toolData;
      sse.send(ev.type, ev);
    }

    // 持久化 AI 回复
    await prisma.chatMessage.create({
      data: { userId, role: 'assistant', content: finalReply, savedData: finalToolData ?? undefined, parentId: userMsgRow.id },
    });
  } catch (e: any) {
    sse.send('error', { type: 'error', message: e.message || 'unknown' });
  } finally {
    sse.end();
  }
});
```

- [ ] **Step 3: e2e 测试**

Create: `backend/tests/e2e/streaming.e2e.test.ts` — 用 `supertest` + `EventSource` polyfill 验证事件序列与最终持久化。

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(api): SSE /chat/message/stream with phase events"
```

---

## Task 3: 小程序 chunked 适配

**Goal:** 微信小程序原生不支持 EventSource；用 `wx.request enableChunked: true` 接收 chunked HTTP，自己解析 SSE 帧。

**Files:**
- Create: `fitlc-mini/utils/chunkedReader.js`
- Modify: `fitlc-mini/api/chat.js`

**Steps:**

- [ ] **Step 1: chunkedReader**

Create: `fitlc-mini/utils/chunkedReader.js`

```javascript
/**
 * 解析 SSE 帧：event: foo\ndata: {...}\n\n
 */
function createSseParser(onEvent) {
  let buffer = '';
  return {
    feed(chunk) {
      buffer += chunk;
      const frames = buffer.split('\n\n');
      buffer = frames.pop() || '';
      for (const f of frames) {
        let event = 'message', data = '';
        for (const line of f.split('\n')) {
          if (line.startsWith('event: ')) event = line.slice(7);
          else if (line.startsWith('data: ')) data += line.slice(6);
        }
        if (data) {
          try { onEvent(event, JSON.parse(data)); }
          catch (e) { console.warn('[sse] parse fail', e); }
        }
      }
    },
  };
}

module.exports = { createSseParser };
```

- [ ] **Step 2: api/chat.js 新接口**

Modify: `fitlc-mini/api/chat.js`

```javascript
const { createSseParser } = require('../utils/chunkedReader');
const { BASE_URL, getToken } = require('./_config');

function sendMessageStream(content, imageUrls, idempotencyKey, onEvent) {
  return new Promise((resolve, reject) => {
    const requestTask = wx.request({
      url: `${BASE_URL}/chat/message/stream`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      enableChunked: true,
      data: { message: content, imageUrls, idempotencyKey },
      success: () => resolve(),
      fail: reject,
    });

    const parser = createSseParser((event, data) => {
      onEvent(event, data);
      if (event === 'close' || event === 'done') resolve();
    });

    requestTask.onChunkReceived?.((res) => {
      const text = arrayBufferToString(res.data);
      parser.feed(text);
    });
  });
}

function arrayBufferToString(buf) {
  if (typeof TextDecoder !== 'undefined') return new TextDecoder('utf-8').decode(buf);
  // 兼容老版本：用字节拼装
  const bytes = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return decodeURIComponent(escape(s));
}

module.exports.sendMessageStream = sendMessageStream;
```

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(mini): chunked SSE adapter for wx.request"
```

---

## Task 4: 小程序流式渲染

**Goal:** chat 页面边收 token 边追加到当前 AI 消息；tool_call / tool_result 显示阶段提示。

**Files:**
- Modify: `fitlc-mini/pages/chat/chat.js`

**Steps:**

- [ ] **Step 1: 改造 onSend 用流式**

Modify: `fitlc-mini/pages/chat/chat.js`

```javascript
const { sendMessageStream } = require('../../api/chat');
const { uuid } = require('../../utils/uuid'); // Task 6

async onSend() {
  const content = this.data.inputValue.trim();
  if (!content) return;
  const idempotencyKey = uuid();

  const userMsg = { tempId: `u-${Date.now()}`, role: 'user', content, time: Date.now() };
  const aiMsg = { tempId: `a-${Date.now()}`, role: 'assistant', content: '', streaming: true, stage: 'thinking', time: Date.now() };

  this.setData({
    messages: [...this.data.messages, userMsg, aiMsg],
    inputValue: '',
    isLoading: true,
    pendingImages: [],
  });

  try {
    await sendMessageStream(content, this.data.pendingImages, idempotencyKey, (event, data) => {
      const msgs = this.data.messages;
      const idx = msgs.findIndex(m => m.tempId === aiMsg.tempId);
      if (idx < 0) return;
      const m = { ...msgs[idx] };
      switch (event) {
        case 'thinking':         m.stage = '正在思考…'; break;
        case 'vision_start':     m.stage = '正在解析图片…'; break;
        case 'vision_done':      m.stage = '图片已解析'; break;
        case 'vision_error':     m.stage = `图片解析失败：${data.message}`; break;
        case 'tool_call':        m.stage = stageHint(data.tool); break;
        case 'tool_result':      m.stage = data.success ? '✅ ' + stageHint(data.tool, 'done') : '❌ 失败'; break;
        case 'token':            m.content += data.delta; m.stage = null; break;
        case 'final':            m.toolData = data.toolData; m.visionError = data.visionError; break;
        case 'done':             m.streaming = false; m.stage = null; break;
        case 'error':            m.stage = `❌ ${data.message}`; m.streaming = false; break;
      }
      msgs[idx] = m;
      this.setData({ messages: [...msgs] });
    });
  } finally {
    this.setData({ isLoading: false });
  }
}

function stageHint(tool, phase) {
  const map = {
    save_workout: phase === 'done' ? '已保存训练' : '正在保存训练…',
    save_measurement: phase === 'done' ? '已保存围度' : '正在保存围度…',
    query_workout: phase === 'done' ? '已查询历史' : '正在查询历史…',
    query_measurement: phase === 'done' ? '已查询围度' : '正在查询围度…',
    generate_plan: phase === 'done' ? '已生成计划' : '正在生成计划…',
    adjust_plan: phase === 'done' ? '已调整计划' : '正在调整计划…',
    analyze_execution: phase === 'done' ? '已分析执行' : '正在分析执行…',
  };
  return map[tool] || (phase === 'done' ? '完成' : '处理中…');
}
```

- [ ] **Step 2: 修改 wxml 渲染 stage**

Modify: `fitlc-mini/pages/chat/chat.wxml`

在 AI 消息渲染处增加 stage 显示（如灰色小字）。

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(mini): streaming render with phase stage hints"
```

---

## Task 5: 错误码区分 + 自动重试

**Files:**
- Create: `fitlc-mini/utils/retry.js`
- Create: `fitlc-mini/utils/errorCodes.js`
- Modify: `fitlc-mini/api/chat.js`

**Steps:**

- [ ] **Step 1: 定义错误码**

```javascript
// errorCodes.js
module.exports.ErrorCode = {
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
  NETWORK_DISCONNECTED: 'NETWORK_DISCONNECTED',
  RATE_LIMITED: 'RATE_LIMITED',         // 429
  UNAUTHORIZED: 'UNAUTHORIZED',         // 401
  SERVER_ERROR: 'SERVER_ERROR',         // 5xx
  BUSINESS_ERROR: 'BUSINESS_ERROR',     // 4xx (非 429/401)
  UNKNOWN: 'UNKNOWN',
};

module.exports.classifyError = function classifyError(err, statusCode) {
  if (err?.errMsg?.includes('timeout')) return module.exports.ErrorCode.NETWORK_TIMEOUT;
  if (err?.errMsg?.includes('fail') && !statusCode) return module.exports.ErrorCode.NETWORK_DISCONNECTED;
  if (statusCode === 429) return module.exports.ErrorCode.RATE_LIMITED;
  if (statusCode === 401) return module.exports.ErrorCode.UNAUTHORIZED;
  if (statusCode >= 500) return module.exports.ErrorCode.SERVER_ERROR;
  if (statusCode >= 400) return module.exports.ErrorCode.BUSINESS_ERROR;
  return module.exports.ErrorCode.UNKNOWN;
};
```

- [ ] **Step 2: 通用重试**

Create: `fitlc-mini/utils/retry.js`

```javascript
const { ErrorCode } = require('./errorCodes');
const RETRYABLE = new Set([ErrorCode.NETWORK_TIMEOUT, ErrorCode.NETWORK_DISCONNECTED, ErrorCode.SERVER_ERROR]);

async function withRetry(fn, opts = {}) {
  const { maxAttempts = 2, baseDelayMs = 800 } = opts;
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const code = e.errorCode;
      if (!RETRYABLE.has(code) || attempt === maxAttempts) throw e;
      await new Promise(r => setTimeout(r, baseDelayMs * Math.pow(2, attempt - 1)));
    }
  }
  throw lastErr;
}

module.exports = { withRetry };
```

- [ ] **Step 3: 在 chat.js 处理错误**

```javascript
catch (e) {
  const code = e.errorCode || ErrorCode.UNKNOWN;
  const friendly = {
    [ErrorCode.NETWORK_TIMEOUT]: '网络超时，请稍后再试',
    [ErrorCode.NETWORK_DISCONNECTED]: '网络好像断了，检查一下信号',
    [ErrorCode.RATE_LIMITED]: '操作太快了，1 分钟后再试',
    [ErrorCode.UNAUTHORIZED]: '登录已失效，请重新登录',
    [ErrorCode.SERVER_ERROR]: '服务器开小差，请稍后再试',
    [ErrorCode.BUSINESS_ERROR]: e.businessMessage || '请求出错',
    [ErrorCode.UNKNOWN]: '发送失败',
  }[code];
  wx.showToast({ title: friendly, icon: 'none' });
}
```

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(mini): error code classification + auto-retry on network errors"
```

---

## Task 6: 前端 idempotency_key

**Goal:** 小程序每次发送生成 UUID，发到后端实现端到端幂等。

**Files:**
- Create: `fitlc-mini/utils/uuid.js`
- Modify: `fitlc-mini/api/chat.js`、`fitlc-mini/pages/chat/chat.js`

**Steps:**

- [ ] **Step 1: 简易 UUIDv4**

Create: `fitlc-mini/utils/uuid.js`

```javascript
function uuid() {
  // RFC4122 v4 (math.random，UX 级别足够；安全场景需 wx.getRandomValues)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
module.exports = { uuid };
```

- [ ] **Step 2: 在 sendMessage(Stream) 透传**

```javascript
function sendMessage(content, imageUrls, idempotencyKey) {
  return post('/chat/message', { message: content, imageUrls, idempotencyKey });
}
```

页面 onSend 入口生成 uuid 一次，分别用于：
- 显示到本地 message（tempId）
- 发到后端（idempotencyKey）
- 重试时复用同一个 uuid（保证幂等）

- [ ] **Step 3: 后端透传到 saveWorkout/saveMeasurement**

Modify: `backend/src/routes/chat.ts` — 解析 body.idempotencyKey，通过 runAgentV2 透传到 tool args。注意：仅当 LLM 决定调 save_* 类工具时，把外层 idempotencyKey 作为默认值注入 tool input；LLM 自己生成的 idempotency_key 优先级更低。

- [ ] **Step 4: e2e 验证**

把消息发两次（同 idempotencyKey），后端 DB 仅 1 条；UI 第二次 reply 含"已经保存过…无需重复提交"。

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(mini+backend): end-to-end idempotency_key from UI to DB"
```

---

## Sprint 4 总验收门禁

- [ ] TTFT < 500ms（Langfuse 后台 First-Token-Latency P50）
- [ ] 小程序对话有阶段反馈（"正在思考…" → "正在保存训练…" → 流式逐字）
- [ ] 重复点击发送按钮（弱网模拟），DB 只有 1 条 Workout
- [ ] 网络抖动 1 次自动恢复成功率 ≥ 90%
- [ ] Sprint 2 评估集 + Sprint 3 红队 case 通过率不下降
- [ ] `docs/PRD.md` 加"流式对话协议"小节（SSE 事件类型清单）
