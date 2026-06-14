# Sprint 1 / Task 1：修复模型名集中化

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 消除 `chatMiniMax.ts` 硬编码 `"MiniMax-M3"` 与 `aiConfig.ts` 默认 `"MiniMax-Text-01"` 的不一致，统一从 `aiConfig.getModelName('chat')` 取模型 ID，保证部署确定性。

**Architecture:** `aiConfig.ts` 已有 `getModelName('chat' | 'vision')` 函数（行 50-55）；`chatMiniMax.ts:13, 46` 当前绕过它直接硬编码。本任务把 `chatMiniMax.ts` 的硬编码全部替换为调用 `getModelName('chat')`，并增加单测保证未来不再回退。

**Tech Stack:** TypeScript, Jest + babel-jest, `@langchain/openai`

**对应缺口:** G1 (Master Roadmap)

---

## 文件结构

```
backend/
├── src/
│   ├── agents/chatMiniMax.ts             # 修改：替换硬编码为 getModelName('chat')
│   ├── config/aiConfig.ts                # 修改：默认值从 MiniMax-Text-01 改为 MiniMax-M3（统一最新标准）
│   └── tools/utils/validation.ts         # 无需改
└── tests/backend/unit/agents/
    └── chatMiniMax.test.ts               # 新增：3 个测试断言模型名来源
```

---

## 任务

### 步骤 1: 创建分支

- [ ] **Step 1: 切到新分支**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git checkout -b sprint1/task1-fix-model-name
```

期望：`Switched to a new branch 'sprint1/task1-fix-model-name'`

---

### 步骤 2: 写失败测试

- [ ] **Step 2: 创建测试文件**

Create: `backend/tests/backend/unit/agents/chatMiniMax.test.ts`

```typescript
/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('chatMiniMax model name', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // 清掉 require 缓存，让 aiConfig.ts 在每个测试用新环境变量重新加载
    jest.resetModules();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('createMiniMaxModel 应使用 aiConfig.getModelName("chat") 作为 model', async () => {
    process.env.AI_PROVIDER = 'minimax';
    process.env.MINIMAX_API_KEY = 'test-key';
    delete process.env.MINIMAX_CHAT_MODEL; // 用默认值
    delete process.env.AI_MODEL_NAME;

    const { createMiniMaxModel } = await import('../../../../src/agents/chatMiniMax');
    const { getModelName } = await import('../../../../src/config/aiConfig');

    const model = createMiniMaxModel();
    // ChatOpenAI 的 model 字段（v1.x 用 model，老版本可能用 modelName）
    const actualModel = (model as any).model ?? (model as any).modelName;

    expect(actualModel).toBe(getModelName('chat'));
  });

  it('当环境变量 MINIMAX_CHAT_MODEL 被设置时，应使用该值', async () => {
    process.env.AI_PROVIDER = 'minimax';
    process.env.MINIMAX_API_KEY = 'test-key';
    process.env.MINIMAX_CHAT_MODEL = 'MiniMax-Custom-X';
    delete process.env.AI_MODEL_NAME;

    const { createMiniMaxModel } = await import('../../../../src/agents/chatMiniMax');

    const model = createMiniMaxModel();
    const actualModel = (model as any).model ?? (model as any).modelName;

    expect(actualModel).toBe('MiniMax-Custom-X');
  });

  it('当 AI_MODEL_NAME 被设置时，应优先于 MINIMAX_CHAT_MODEL', async () => {
    process.env.AI_PROVIDER = 'minimax';
    process.env.MINIMAX_API_KEY = 'test-key';
    process.env.MINIMAX_CHAT_MODEL = 'MiniMax-Custom-X';
    process.env.AI_MODEL_NAME = 'MiniMax-Override';

    const { createMiniMaxModel } = await import('../../../../src/agents/chatMiniMax');

    const model = createMiniMaxModel();
    const actualModel = (model as any).model ?? (model as any).modelName;

    expect(actualModel).toBe('MiniMax-Override');
  });
});
```

---

### 步骤 3: 运行测试验证失败

- [ ] **Step 3: 跑测试**

```bash
cd backend
npm test -- tests/backend/unit/agents/chatMiniMax.test.ts
```

期望：3 个测试全部 **FAIL**，原因是 `chatMiniMax.ts:13` 当前硬编码 `"MiniMax-M3"`，与 `getModelName('chat')`（默认返回 `"MiniMax-Text-01"`）不一致。

---

### 步骤 4: 修改 aiConfig.ts 默认值

- [ ] **Step 4: 把 minimax chat 默认值改为 MiniMax-M3**

Modify: `backend/src/config/aiConfig.ts:36`

替换：

```typescript
      chat: getEnv('MINIMAX_CHAT_MODEL', 'MiniMax-Text-01'),
```

为：

```typescript
      chat: getEnv('MINIMAX_CHAT_MODEL', 'MiniMax-M3'),
```

> 这里选择把默认值统一到 `MiniMax-M3`（已部署在线的最新模型，与最近 commit `5c9d9f4` 一致）。

---

### 步骤 5: 修改 chatMiniMax.ts 从 aiConfig 取值

- [ ] **Step 5: 替换硬编码**

Modify: `backend/src/agents/chatMiniMax.ts`

完整替换为：

```typescript
import { ChatOpenAI } from "@langchain/openai";
import type { OpenAIChatInput } from "@langchain/openai";
import { getModelName, requireApiKey } from "../config/aiConfig";

const MINIMAX_BASE_URL = "https://api.minimax.chat/v1";

/**
 * 创建 MiniMax ChatOpenAI 实例
 * 模型 ID 统一通过 aiConfig.getModelName('chat') 取，避免硬编码漂移。
 */
export function createMiniMaxModel(
  fields: Partial<OpenAIChatInput> & { maxTokens?: number } = {}
): ChatOpenAI {
  return new ChatOpenAI({
    apiKey: requireApiKey('minimax'),
    model: getModelName('chat'),
    temperature: fields.temperature ?? 0.7,
    maxTokens: fields.maxTokens ?? 4096,
    configuration: {
      baseURL: MINIMAX_BASE_URL,
    },
    ...fields,
  });
}

/**
 * 单例缓存
 */
let cachedModel: ChatOpenAI | null = null;

export async function createModel(): Promise<ChatOpenAI> {
  if (cachedModel) {
    return cachedModel;
  }
  cachedModel = createMiniMaxModel();
  return cachedModel;
}

/**
 * 测试用：重置单例缓存
 */
export function _resetCachedModel(): void {
  cachedModel = null;
}

// Legacy export for backwards compatibility
export class ChatMiniMax extends ChatOpenAI {
  minimaxApiKey: string;

  constructor(fields: Partial<OpenAIChatInput> & { maxTokens?: number } = {}) {
    const apiKey = (fields.apiKey as string) || requireApiKey('minimax');

    super({
      apiKey,
      model: (fields.model as string) || getModelName('chat'),
      temperature: fields.temperature ?? 0.7,
      maxTokens: fields.maxTokens ?? 4096,
      configuration: {
        baseURL: MINIMAX_BASE_URL,
      },
    });

    this.minimaxApiKey = apiKey;
  }
}
```

主要变更：
- 删除两处硬编码 `"MiniMax-M3"`，改用 `getModelName('chat')`
- `apiKey` 通过 `requireApiKey('minimax')` 统一校验（若缺失则抛错而非传空字符串）
- 新增 `_resetCachedModel()` 仅供测试使用

---

### 步骤 6: 运行测试验证通过

- [ ] **Step 6: 跑测试**

```bash
cd backend
npm test -- tests/backend/unit/agents/chatMiniMax.test.ts
```

期望：3 个测试全部 **PASS**。

---

### 步骤 7: 全仓搜索其他硬编码点

- [ ] **Step 7: 确认无遗漏**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
grep -rn "MiniMax-M3\|MiniMax-Text-01\|MiniMax-VL-01" backend/src/ --include="*.ts"
```

期望：除注释外，无业务代码引用这些常量字符串。如果有，按相同方式替换为 `getModelName('chat' | 'vision')`。

---

### 步骤 8: 跑全量后端单测

- [ ] **Step 8: 回归测试**

```bash
cd backend
npm test
```

期望：所有现有测试通过，无新增失败。

---

### 步骤 9: 更新文档

- [ ] **Step 9: 在 PRD 记录模型版本**

Modify: `docs/PRD.md` 第 7 章末尾或专门"运行时配置"章节，追加：

```markdown
### AI 模型配置

模型 ID 统一通过环境变量管理，禁止在代码中硬编码：

| 环境变量 | 默认值 | 用途 |
|---|---|---|
| `AI_PROVIDER` | `minimax` | AI 服务商 |
| `MINIMAX_CHAT_MODEL` | `MiniMax-M3` | MiniMax 主对话模型 |
| `MINIMAX_VISION_MODEL` | `MiniMax-VL-01` | MiniMax 视觉模型 |
| `ZHIPU_CHAT_MODEL` | `glm-4-plus` | 智谱主对话模型 |
| `ZHIPU_VISION_MODEL` | `glm-4v-flash` | 智谱视觉模型 |
| `AI_MODEL_NAME` | `undefined` | 全局覆盖（最高优先级） |

代码访问：`getModelName('chat' \| 'vision')` (`backend/src/config/aiConfig.ts:50`)
```

---

### 步骤 10: Commit

- [ ] **Step 10: 提交**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add backend/src/agents/chatMiniMax.ts \
        backend/src/config/aiConfig.ts \
        backend/tests/backend/unit/agents/chatMiniMax.test.ts \
        docs/PRD.md
git commit -m "fix(chat): centralize MiniMax model name via aiConfig.getModelName()

- Replace hardcoded 'MiniMax-M3' in chatMiniMax.ts with getModelName('chat')
- Sync aiConfig default to 'MiniMax-M3' (matches commit 5c9d9f4)
- Use requireApiKey() to fail fast on missing MINIMAX_API_KEY
- Add 3 unit tests guarding model name resolution

Fixes G1 (Master Roadmap)
Refs: docs/superpowers/plans/2026-06-14-sprint1-task1-fix-model-name.md"
```

---

## 验收

- [x] 3 个新增单测通过
- [x] 全量 `npm test` 通过
- [x] `grep -rn "MiniMax-M3" backend/src/` 无业务代码命中
- [x] `docs/PRD.md` 已记录模型配置
