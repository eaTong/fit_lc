# Sprint 1 / Task 3：Vision 失败降级不阻塞主流程

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 当 `visionPreprocessor` 返回 `error` 时，`runAgentV2` 不再提前终止整条对话；改为以"vision 暂时不可用"作为降级上下文，让主 LLM 接收用户原始 message 并照常工作，同时把 `visionError` 透传给前端供 UI 提示。

**Architecture:**
- 当前 [fitnessAgentV2.ts:86-93](../../backend/src/agents/fitnessAgentV2.ts) 在 vision 报错时 `return { reply: '图片解析失败了…', toolData: null, visionError }` 终止后续步骤。
- 改造后：vision 报错时不再 `return`，而是把 `processedMessage` 设为"用户原始 message"，并在后续注入一条系统级提示告诉主 LLM"图片解析失败，请基于文字部分继续帮助用户"。
- `visionError` 仍透传给前端，前端可选展示"图片未解析"的小提示，但对话不中断。

**Tech Stack:** TypeScript, Jest + babel-jest, LangChain.js

**对应缺口:** G3 (Master Roadmap)

---

## 文件结构

```
backend/
├── src/agents/
│   ├── fitnessAgentV2.ts                  # 修改：vision 报错 → 降级而非终止
│   ├── promptBuilder.ts                   # 修改：注入 vision 失败提示
│   └── plugins/visionPreprocessor.ts      # 无需改（已返回 error 字段）
└── tests/backend/unit/agents/
    └── fitnessAgentV2.visionDegrade.test.ts   # 新增
```

---

## 步骤

### 步骤 1: 切分支

- [ ] **Step 1: 创建分支**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git checkout master
git pull
git checkout -b sprint1/task3-vision-degrade
```

---

### 步骤 2: 写失败测试

- [ ] **Step 2: 新增 vision 降级测试**

Create: `backend/tests/backend/unit/agents/fitnessAgentV2.visionDegrade.test.ts`

```typescript
/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

const mockPreprocessVision = jest.fn();
const mockInvoke = jest.fn();

jest.unstable_mockModule('../../../../src/agents/plugins/visionPreprocessor', () => ({
  preprocessVision: mockPreprocessVision,
}));

jest.unstable_mockModule('../../../../src/agents/chatFactory', () => ({
  createChatModel: async () => ({
    bindTools: () => ({
      invoke: mockInvoke,
    }),
  }),
}));

jest.unstable_mockModule('../../../../src/agents/clarification', () => ({
  clarificationManager: {
    getActiveSession: async () => null,
  },
}));

jest.unstable_mockModule('../../../../src/services/userContextService', () => ({
  userContextService: {
    refreshContextWithLock: async () => ({}),
  },
}));

const { runAgentV2, clearModelCache } = await import('../../../../src/agents/fitnessAgentV2');

describe('runAgentV2 vision graceful degradation', () => {
  beforeEach(() => {
    mockPreprocessVision.mockReset();
    mockInvoke.mockReset();
    clearModelCache();
  });

  it('vision 失败时不应提前终止，主 LLM 应被调用', async () => {
    mockPreprocessVision.mockResolvedValueOnce({
      message: '帮我看看我的训练姿势',
      imageAnalysis: null,
      error: '图片解析失败：API密钥无效',
    });

    mockInvoke.mockResolvedValueOnce({
      content: '我暂时看不到图片，但可以根据你的描述给建议……',
      tool_calls: [],
    });

    const result = await runAgentV2(
      10,
      '帮我看看我的训练姿势',
      null,
      [],
      ['https://example.com/x.jpg']
    );

    expect(mockInvoke).toHaveBeenCalled(); // 关键：主 LLM 必须被调用
    expect(result.reply).toContain('暂时看不到图片');
    expect(result.visionError).toBe('图片解析失败：API密钥无效');
  });

  it('vision 失败时，传给 LLM 的 system prompt 应包含 vision 不可用提示', async () => {
    mockPreprocessVision.mockResolvedValueOnce({
      message: '看下这张',
      imageAnalysis: null,
      error: '图片解析失败：请求过于频繁',
    });

    let capturedMessages: any[] = [];
    mockInvoke.mockImplementationOnce(async (messages: any[]) => {
      capturedMessages = messages;
      return { content: '好的', tool_calls: [] };
    });

    await runAgentV2(10, '看下这张', null, [], ['https://x.com/img.jpg']);

    const systemMsg = capturedMessages.find((m: any) => m._getType?.() === 'system');
    expect(systemMsg).toBeDefined();
    const systemText = typeof systemMsg.content === 'string' ? systemMsg.content : JSON.stringify(systemMsg.content);
    expect(systemText).toMatch(/图片解析(失败|不可用)/);
  });

  it('vision 成功（无 error）时行为不变', async () => {
    mockPreprocessVision.mockResolvedValueOnce({
      message: '【图片解析结果】\n体态正常\n\n用户原始消息：看下',
      imageAnalysis: '体态正常',
      reply: '📸 **图片分析结果**\n\n体态正常',
      toolData: { aiReply: '📸 体态正常', dataType: 'image_analysis', result: { imageAnalysis: '体态正常' } },
    });

    const result = await runAgentV2(10, '看下', null, [], ['https://x.com/img.jpg']);

    // vision 成功有 reply 时，应早退不调用主 LLM
    expect(mockInvoke).not.toHaveBeenCalled();
    expect(result.reply).toContain('图片分析结果');
    expect(result.visionError).toBeUndefined();
  });
});
```

---

### 步骤 3: 运行测试验证失败

- [ ] **Step 3: 跑测试**

```bash
cd backend
npm test -- tests/backend/unit/agents/fitnessAgentV2.visionDegrade.test.ts
```

期望：**第 1 和第 2 个测试 FAIL**（当前 agent 在 vision 报错时直接 return，不会调用 invoke）。第 3 个测试 PASS（vision 成功路径未改动）。

---

### 步骤 4: 修改 promptBuilder.ts 接受 visionError 参数

- [ ] **Step 4: buildSystemPrompt 增加可选参数**

Modify: `backend/src/agents/promptBuilder.ts`

修改函数签名与系统提示词：

```typescript
export function buildSystemPrompt(
  userContext: UserContext | null,
  historySummary?: string | null,
  visionError?: string | null,
): SystemMessage {
  // ... 现有逻辑保持不变 ...

  // 在 coachPersona 之后、return 之前加入 vision 失败提示
  let visionFailureSection = '';
  if (visionError) {
    visionFailureSection = `\n【系统通知 - 图片解析不可用】
本轮对话中用户发送了图片，但图片解析服务暂时不可用（${visionError}）。
请按以下方式处理：
1. 不要假装看到了图片，不要编造图片内容
2. 对用户表达歉意（"图片暂时看不到"），并请求用户用文字描述
3. 基于用户的文字部分继续提供帮助
`;
  }

  const fullPrompt = [
    coachPersona,
    contextSection,
    historySection,
    visionFailureSection,   // ← 新加入
    // ... 其余拼接保持原顺序 ...
  ].filter(Boolean).join('\n\n');

  return new SystemMessage(fullPrompt);
}
```

> **执行注意**：你需要打开 promptBuilder.ts 看完整的 prompt 拼接顺序（约第 60-128 行），把 `visionFailureSection` 插到合适位置。它应当出现在 persona 之后、tools 调用规则之前。

---

### 步骤 5: 修改 fitnessAgentV2.ts 降级逻辑

- [ ] **Step 5: 删除提前 return，改为降级**

Modify: `backend/src/agents/fitnessAgentV2.ts:78-103`

把当前的：

```typescript
  // 1. Vision 预处理
  console.log('[Step 1] Vision preprocessing...');
  const visionResult = await preprocessVision(message, imageUrls);
  let processedMessage = visionResult.message;
  let visionError = visionResult.error || undefined;

  // 如果 vision 报错，直接返回错误，不继续执行后续流程
  if (visionError) {
    console.log('[FitnessAgentV2] Vision preprocessing failed, returning error early');
    return {
      reply: `图片解析失败了：${visionError}\n\nAI无法分析这张图片，你可以换个图片试试，或者直接描述你的健身需求。`,
      toolData: null,
      visionError
    };
  }

  // 如果 vision 成功并且有直接返回的 reply，直接返回，不再调用主模型
  if (visionResult.reply) {
    console.log('[FitnessAgentV2] Vision preprocessing succeeded with direct reply, returning early');
    return {
      reply: visionResult.reply,
      toolData: visionResult.toolData || null,
      visionError: undefined
    };
  }
```

替换为：

```typescript
  // 1. Vision 预处理
  console.log('[Step 1] Vision preprocessing...');
  const visionResult = await preprocessVision(message, imageUrls);
  let processedMessage = visionResult.message;
  let visionError = visionResult.error || undefined;

  // 如果 vision 失败：降级（不终止），让主 LLM 基于文字继续帮助用户
  // visionError 会通过 promptBuilder 注入到 system prompt，并通过返回值透传给前端
  if (visionError) {
    console.warn('[FitnessAgentV2] Vision failed, degrading to text-only:', visionError);
    processedMessage = message; // 用用户原始 message，不带【图片解析结果】前缀
  } else if (visionResult.reply) {
    // vision 成功且 plugin 决定直接返回（图片分析独立回复，无需主 LLM）
    console.log('[FitnessAgentV2] Vision succeeded with direct reply, returning early');
    return {
      reply: visionResult.reply,
      toolData: visionResult.toolData || null,
      visionError: undefined,
    };
  }
```

---

### 步骤 6: 把 visionError 传给 buildSystemPrompt

- [ ] **Step 6: 找到 buildSystemPrompt 调用点并传 visionError**

在 `fitnessAgentV2.ts` 中找到调用 `buildSystemPrompt(...)` 的位置（按当前实现约在 Step 4 构造 messages 时），把签名补全：

```typescript
const systemPrompt = buildSystemPrompt(userContext, historySummary, visionError);
```

---

### 步骤 7: 确保 visionError 出现在返回值

- [ ] **Step 7: 返回值透传**

`runAgentV2` 的最终 return 应保证 `visionError` 字段被透传（即便是 undefined）。在每一处 return 语句中确认包含：

```typescript
return {
  reply,
  toolData,
  // ... 其他字段
  visionError,  // ← 保证带上
};
```

---

### 步骤 8: 运行测试验证通过

- [ ] **Step 8: 跑测试**

```bash
cd backend
npm test -- tests/backend/unit/agents/fitnessAgentV2.visionDegrade.test.ts
```

期望：3 个测试全部 **PASS**。

---

### 步骤 9: 跑全量回归

- [ ] **Step 9: 全量测试**

```bash
cd backend
npm test
```

期望：所有测试通过。如果有旧测试断言"vision 报错应立刻返回错误回复"，更新它适配新行为。

---

### 步骤 10: 小程序端 visionError 展示

- [ ] **Step 10: 小程序 chat 页面读 visionError**

Modify: `fitlc-mini/pages/chat/chat.js`

在收到服务端响应、追加 AI 消息时，如果 `res.visionError` 存在，在该消息底部追加小提示。找到发送成功后处理响应的位置，追加：

```javascript
if (res.visionError) {
  // 在 AI 消息后追加一条系统提示
  const updatedMessages = [...this.data.messages, {
    role: 'system',
    type: 'visionWarning',
    content: `📷 图片暂时未能解析（${res.visionError}），请用文字补充`,
    tempId: `sys-${Date.now()}`,
  }];
  this.setData({ messages: updatedMessages });
}
```

> 执行时需阅读 `fitlc-mini/pages/chat/chat.js` 找到现有的"成功响应处理"代码块（约第 326-340 行），把上述逻辑插到 AI 消息已追加之后。

---

### 步骤 11: 更新文档

- [ ] **Step 11: 在 PRD 记录降级策略**

Modify: `docs/PRD.md`

在"对话流程"或"AI Agent"章节追加：

```markdown
### 图片解析降级策略

当 Vision 服务（智谱 GLM-4V-Flash）出现故障（401/429/超时/内容过滤等）时：

1. 后端不终止对话，把 `processedMessage` 设为用户原始 message
2. 在 system prompt 注入"图片解析不可用"提示，要求主 LLM 不假装看图、请求用户文字描述
3. 响应体附带 `visionError` 字段说明失败原因
4. 小程序/前端在 AI 消息下方展示降级提示
```

---

### 步骤 12: Commit

- [ ] **Step 12: 提交**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add backend/src/agents/fitnessAgentV2.ts \
        backend/src/agents/promptBuilder.ts \
        backend/tests/backend/unit/agents/fitnessAgentV2.visionDegrade.test.ts \
        fitlc-mini/pages/chat/chat.js \
        docs/PRD.md
git commit -m "fix(agent): graceful degrade when vision preprocessor fails

- Don't terminate runAgentV2 on vision errors; degrade to text-only
- Inject 'vision unavailable' notice into system prompt
- Propagate visionError to client for UI hint
- Add 3 unit tests covering: degrade / system-prompt-injection / success-unchanged
- Mini-program shows inline warning when visionError present

Fixes G3 (Master Roadmap)
Refs: docs/superpowers/plans/2026-06-14-sprint1-task3-vision-graceful-degrade.md"
```

---

## 验收

- [x] 3 个新增单测通过
- [x] 全量 `npm test` 通过
- [x] 手工验证：在 `.env` 把 `ZHIPU_API_KEY` 设为错误值，发送带图片的消息 → 收到正常回复（基于文字），同时 UI 出现"图片暂时未能解析"提示
- [x] `docs/PRD.md` 已记录降级策略
