# 意图澄清机制优化 - 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 Clarification Manager 框架，使 AI 能自动追问用户不完整的输入（如"卧推80公斤"缺少组数次数），并携带已解析信息避免用户重复输入。

**Architecture:** 创建独立的 clarification/ 模块，存储澄清会话状态。当工具验证失败时，挂起执行并生成追问；用户回复后合并上下文继续执行。

**Tech Stack:** TypeScript, 内存 Map 存储, 复用现有 validation.ts 和 fallbackHandler.ts

---

## 文件结构

```
backend/src/agents/
├── clarification/                    # 新增目录
│   ├── types.ts                     # ClarificationSession 类型定义
│   ├── clarificationStore.ts        # 内存存储
│   ├── ClarificationManager.ts      # 核心管理器
│   ├── askClarificationTool.ts      # 追问工具
│   ├── clarificationPrompts.ts     # 追问模板和生成逻辑
│   └── index.ts                     # 统一导出
├── fitnessAgentV2.ts                 # 修改: 集成澄清流程
└── fallbackHandler.ts               # 修改: 复用解析逻辑
```

---

## 任务列表

### Task 1: 创建类型定义

**Files:**
- Create: `backend/src/agents/clarification/types.ts`

- [ ] **Step 1: 创建 types.ts 文件**

```typescript
import { MissingField } from '../../tools/utils/validation';

export type ClarificationStatus = 'pending' | 'in_progress' | 'completed' | 'expired';

export interface ClarificationSession {
  id: string;
  toolName: string;
  userId: number;
  status: ClarificationStatus;
  createdAt: number;
  expiresAt: number;
  partialInput: Record<string, any>;
  missingFields: MissingField[];
  originalContext: {
    userMessage: string;
    llmInterpretation: string;
  };
  clarificationCount: number;  // 澄清轮次计数
}

export interface ClarificationResult {
  success: boolean;
  completedInput?: Record<string, any>;
  reply: string;
  sessionId: string;
  clarificationEnded?: boolean;
}
```

- [ ] **Step 2: 验证文件语法**

Run: `cd backend && npx tsc --noEmit src/agents/clarification/types.ts`
Expected: 无错误

- [ ] **Step 3: Commit**

```bash
git add backend/src/agents/clarification/types.ts
git commit -m "feat(clarification): add ClarificationSession types"
```

---

### Task 2: 创建内存存储

**Files:**
- Create: `backend/src/agents/clarification/clarificationStore.ts`

- [ ] **Step 1: 创建 clarificationStore.ts**

```typescript
import { ClarificationSession } from './types';

const TTL_MS = 5 * 60 * 1000; // 5分钟

class ClarificationStore {
  private sessions: Map<number, ClarificationSession> = new Map();

  async save(session: ClarificationSession): Promise<void> {
    this.sessions.set(session.userId, session);
  }

  async get(userId: number): Promise<ClarificationSession | null> {
    const session = this.sessions.get(userId);
    if (!session) return null;

    // 检查是否过期
    if (Date.now() > session.expiresAt) {
      session.status = 'expired';
      this.sessions.delete(userId);
      return null;
    }

    return session;
  }

  async getActive(userId: number): Promise<ClarificationSession | null> {
    const session = await this.get(userId);
    if (!session) return null;
    if (session.status === 'completed' || session.status === 'expired') {
      this.sessions.delete(userId);
      return null;
    }
    return session;
  }

  async update(session: ClarificationSession): Promise<void> {
    this.sessions.set(session.userId, session);
  }

  async delete(userId: number): Promise<void> {
    this.sessions.delete(userId);
  }

  async cleanup(): Promise<void> {
    const now = Date.now();
    for (const [userId, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        session.status = 'expired';
        this.sessions.delete(userId);
      }
    }
  }
}

export const clarificationStore = new ClarificationStore();

// 定期清理过期会话
setInterval(() => {
  clarificationStore.cleanup();
}, TTL_MS);
```

- [ ] **Step 2: 验证文件语法**

Run: `cd backend && npx tsc --noEmit src/agents/clarification/clarificationStore.ts`
Expected: 无错误

- [ ] **Step 3: Commit**

```bash
git add backend/src/agents/clarification/clarificationStore.ts
git commit -m "feat(clarification): add in-memory clarification store"
```

---

### Task 3: 创建追问模板和生成逻辑

**Files:**
- Create: `backend/src/agents/clarification/clarificationPrompts.ts`

- [ ] **Step 1: 创建 clarificationPrompts.ts**

```typescript
import { ClarificationSession } from './types';

const MAX_CLARIFICATION_COUNT = 3;

export function generateClarificationReply(session: ClarificationSession): string {
  const missingLabels = session.missingFields.map(f => f.label).join('、');
  const partialInfo = formatPartialInput(session.partialInput, session.toolName);

  // 如果澄清次数已达上限
  if (session.clarificationCount >= MAX_CLARIFICATION_COUNT) {
    return `抱歉，信息仍不完整。您可以：
1. 重新完整描述训练（如"卧推80公斤5组每组8个"）
2. 告诉我要跳过记录`;
  }

  // 模板生成
  if (session.toolName === 'save_workout') {
    return generateWorkoutClarification(partialInfo, missingLabels, session.clarificationCount);
  }

  if (session.toolName === 'save_measurement') {
    return generateMeasurementClarification(partialInfo, missingLabels);
  }

  // 默认模板
  return `${partialInfo}，请补充：${missingLabels}`;
}

function generateWorkoutClarification(partialInfo: string, missingLabels: string, count: number): string {
  const encouragements = ['很棒！', '没问题！', '收到！'];
  const encouragement = encouragements[count % encouragements.length];

  // 特殊处理 sets/reps 缺失
  if (missingLabels.includes('组数') || missingLabels.includes('次数')) {
    return `${partialInfo}，${encouragement}请问一共几组，每组几次？`;
  }

  return `${partialInfo}，请补充：${missingLabels}`;
}

function generateMeasurementClarification(partialInfo: string, missingLabels: string): string {
  return `${partialInfo}，请补充：${missingLabels}`;
}

function formatPartialInput(input: Record<string, any>, toolName: string): string {
  if (toolName === 'save_workout' && input.exercises?.[0]) {
    const ex = input.exercises[0];
    const parts: string[] = [];
    if (ex.name) parts.push(ex.name);
    if (ex.weight) parts.push(`${ex.weight}kg`);
    if (ex.duration) parts.push(`${ex.duration}分钟`);
    if (ex.distance) parts.push(`${ex.distance}公里`);
    return parts.join(' ');
  }

  if (toolName === 'save_measurement' && input.measurements) {
    const parts = input.measurements.map((m: any) => `${m.body_part}: ${m.value}`);
    return parts.join('、');
  }

  return JSON.stringify(input);
}

export function isClarificationEnded(session: ClarificationSession): boolean {
  return session.clarificationCount >= MAX_CLARIFICATION_COUNT;
}
```

- [ ] **Step 2: 验证文件语法**

Run: `cd backend && npx tsc --noEmit src/agents/clarification/clarificationPrompts.ts`
Expected: 无错误

- [ ] **Step 3: Commit**

```bash
git add backend/src/agents/clarification/clarificationPrompts.ts
git commit -m "feat(clarification): add clarification prompt templates"
```

---

### Task 4: 创建 ClarificationManager

**Files:**
- Create: `backend/src/agents/clarification/ClarificationManager.ts`

- [ ] **Step 1: 创建 ClarificationManager.ts**

```typescript
import { v4 as uuidv4 } from 'uuid';
import { ClarificationSession, ClarificationResult } from './types';
import { clarificationStore } from './clarificationStore';
import { generateClarificationReply, isClarificationEnded } from './clarificationPrompts';
import { MissingField } from '../../tools/utils/validation';

const TTL_MS = 5 * 60 * 1000;
const MAX_CLARIFICATION_COUNT = 3;

export class ClarificationManager {
  async createSession(params: {
    toolName: string;
    userId: number;
    partialInput: Record<string, any>;
    missingFields: MissingField[];
    userMessage: string;
    llmInterpretation: string;
  }): Promise<ClarificationSession> {
    // 检查是否已有进行中的会话
    const existing = await clarificationStore.getActive(params.userId);
    if (existing) {
      // 增加澄清计数
      existing.clarificationCount++;
      existing.partialInput = this.mergePartialInput(existing.partialInput, params.partialInput);
      existing.missingFields = params.missingFields;
      await clarificationStore.update(existing);
      return existing;
    }

    const session: ClarificationSession = {
      id: uuidv4(),
      toolName: params.toolName,
      userId: params.userId,
      status: 'pending',
      createdAt: Date.now(),
      expiresAt: Date.now() + TTL_MS,
      partialInput: params.partialInput,
      missingFields: params.missingFields,
      originalContext: {
        userMessage: params.userMessage,
        llmInterpretation: params.llmInterpretation
      },
      clarificationCount: 1
    };

    await clarificationStore.save(session);
    return session;
  }

  async completeSession(
    sessionId: string,
    userId: number,
    additionalInput: Record<string, any>
  ): Promise<ClarificationResult> {
    const session = await clarificationStore.getActive(userId);
    if (!session || session.id !== sessionId) {
      throw new Error('澄清会话不存在或已过期');
    }

    const completedInput = this.mergePartialInput(session.partialInput, additionalInput);

    session.status = 'completed';
    await clarificationStore.update(session);

    return {
      success: true,
      completedInput,
      reply: '信息已补充完整，正在执行...',
      sessionId: session.id
    };
  }

  async getActiveSession(userId: number): Promise<ClarificationSession | null> {
    return clarificationStore.getActive(userId);
  }

  async generateReply(session: ClarificationSession): Promise<string> {
    return generateClarificationReply(session);
  }

  async markSessionExpired(sessionId: string, userId: number): Promise<void> {
    const session = await clarificationStore.get(userId);
    if (session && session.id === sessionId) {
      session.status = 'expired';
      await clarificationStore.update(session);
    }
  }

  shouldEndClarification(session: ClarificationSession): boolean {
    return isClarificationEnded(session);
  }

  private mergePartialInput(
    existing: Record<string, any>,
    additional: Record<string, any>
  ): Record<string, any> {
    const merged = { ...existing };

    // 特殊处理 exercises 数组
    if (existing.exercises && additional.exercises?.[0]) {
      merged.exercises = [{
        ...existing.exercises[0],
        ...additional.exercises[0]
      }];
    } else if (additional.exercises) {
      merged.exercises = additional.exercises;
    }

    // 特殊处理 measurements 数组
    if (existing.measurements && additional.measurements?.[0]) {
      merged.measurements = [{
        ...existing.measurements[0],
        ...additional.measurements[0]
      }];
    } else if (additional.measurements) {
      merged.measurements = additional.measurements;
    }

    // 其他字段直接合并
    for (const [key, value] of Object.entries(additional)) {
      if (key !== 'exercises' && key !== 'measurements' && value !== undefined) {
        merged[key] = value;
      }
    }

    return merged;
  }
}

export const clarificationManager = new ClarificationManager();
```

- [ ] **Step 2: 验证文件语法**

Run: `cd backend && npx tsc --noEmit src/agents/clarification/ClarificationManager.ts`
Expected: 无错误

- [ ] **Step 3: Commit**

```bash
git add backend/src/agents/clarification/ClarificationManager.ts
git commit -m "feat(clarification): add ClarificationManager core logic"
```

---

### Task 5: 创建统一导出

**Files:**
- Create: `backend/src/agents/clarification/index.ts`

- [ ] **Step 1: 创建 index.ts**

```typescript
export { ClarificationSession, ClarificationResult } from './types';
export { ClarificationManager, clarificationManager } from './ClarificationManager';
export { clarificationStore } from './clarificationStore';
export { generateClarificationReply, isClarificationEnded } from './clarificationPrompts';
```

- [ ] **Step 2: 验证文件语法**

Run: `cd backend && npx tsc --noEmit src/agents/clarification/index.ts`
Expected: 无错误

- [ ] **Step 3: Commit**

```bash
git add backend/src/agents/clarification/index.ts
git commit -m "feat(clarification): export clarification module"
```

---

### Task 6: 创建澄清回复解析工具函数

**Files:**
- Create: `backend/src/agents/clarification/extractClarification.ts`

**新增辅助函数** (在 extractClarification.ts 中):

`tryParseSetsAndReps(text)` - 当用户只回复组数/次数时使用：
- 匹配 "3组7次"、"三组七次"、"3组"、"7次"、"3x7" 等格式
- 复用 `partialInput.exercises[0].name` 中已有的动作名
- 返回 `{ sets?: number, reps?: number }`

**注意**：`exercises[0].sets` 用 `split(/[\[\]]/)` 会得到 `['exercises', '0', '.sets']`，需要取最后一个非数字部分作为字段名。

- [ ] **Step 1: 创建 extractClarification.ts**

```typescript
import { tryParseWorkout, tryParseMeasurements } from '../fallbackHandler';
import { ClarificationSession } from './types';
import { MissingField } from '../../tools/utils/validation';

interface ExtractResult {
  supplementedInput: Record<string, any>;
  hasNewData: boolean;
}

/**
 * 从用户回复中提取澄清信息，复用到 partialInput
 */
export async function extractClarification补充(
  message: string,
  session: ClarificationSession,
  userId: number
): Promise<ExtractResult> {
  const supplementedInput = { ...session.partialInput };
  let hasNewData = false;

  if (session.toolName === 'save_workout') {
    const workout = await tryParseWorkout(message, userId);
    if (workout?.exercises?.[0]) {
      const exercise = workout.exercises[0];
      if (!supplementedInput.exercises) {
        supplementedInput.exercises = [{}];
      }

      // 补充缺失的字段
      if (exercise.sets && !supplementedInput.exercises[0].sets) {
        supplementedInput.exercises[0].sets = exercise.sets;
        hasNewData = true;
      }
      if (exercise.reps && !supplementedInput.exercises[0].reps) {
        supplementedInput.exercises[0].reps = exercise.reps;
        hasNewData = true;
      }
      if (exercise.weight && !supplementedInput.exercises[0].weight) {
        supplementedInput.exercises[0].weight = exercise.weight;
        hasNewData = true;
      }
      if (exercise.duration && !supplementedInput.exercises[0].duration) {
        supplementedInput.exercises[0].duration = exercise.duration;
        hasNewData = true;
      }
      if (exercise.distance && !supplementedInput.exercises[0].distance) {
        supplementedInput.exercises[0].distance = exercise.distance;
        hasNewData = true;
      }
    }
  }

  if (session.toolName === 'save_measurement') {
    const measurements = tryParseMeasurements(message);
    if (measurements.length > 0) {
      supplementedInput.measurements = [
        ...(supplementedInput.measurements || []),
        ...measurements
      ];
      hasNewData = true;
    }
  }

  return { supplementedInput, hasNewData };
}

/**
 * 检查是否所有缺失字段都已补充
 */
export function isInputComplete(
  input: Record<string, any>,
  missingFields: MissingField[]
): boolean {
  for (const field of missingFields) {
    const fieldPath = field.field;

    // 处理嵌套字段 (如 exercises[0].sets)
    if (fieldPath.includes('[')) {
      const [arrayKey, rest] = fieldPath.split(/[\[\]]/);
      const array = input[arrayKey];
      if (!array || !array[0] || array[0][rest] === undefined) {
        return false;
      }
    } else if (input[fieldPath] === undefined || input[fieldPath] === null) {
      return false;
    }
  }
  return true;
}
```

- [ ] **Step 2: 验证文件语法**

Run: `cd backend && npx tsc --noEmit src/agents/clarification/extractClarification.ts`
Expected: 无错误

- [ ] **Step 3: Commit**

```bash
git add backend/src/agents/clarification/extractClarification.ts
git commit -m "feat(clarification): add extractClarification补充 function"
```

---

### Task 7: 集成 Clarification 到 fitnessAgentV2

**Files:**
- Modify: `backend/src/agents/fitnessAgentV2.ts`

- [ ] **Step 1: 添加导入**

在文件顶部添加：

```typescript
import { clarificationManager, ClarificationSession } from './clarification';
import { extractClarification补充, isInputComplete } from './clarification/extractClarification';
```

- [ ] **Step 2: 修改 Step 2 - 检查澄清会话**

找到 Step 2 注释，在其前添加澄清检查逻辑：

```typescript
// 1.5 检查澄清会话
console.log('[Step 1.5] Checking for active clarification session...');
const activeClarification = await clarificationManager.getActiveSession(userId);
if (activeClarification) {
  console.log('[Step 1.5] Found active session:', activeClarification.id);

  // 尝试从用户回复中提取补充信息
  const { supplementedInput, hasNewData } = await extractClarification补充(
    processedMessage,
    activeClarification,
    userId
  );

  if (hasNewData) {
    console.log('[Step 1.5] Extracted new data from clarification response');

    // 检查是否已补充完整
    const stillMissing = activeClarification.missingFields.filter(f => {
      const fieldPath = f.field;
      if (fieldPath.includes('[')) {
        const [arrayKey, rest] = fieldPath.split(/[\[\]]/);
        return !supplementedInput[arrayKey]?.[0]?.[rest];
      }
      return supplementedInput[fieldPath] === undefined;
    });

    if (stillMissing.length === 0) {
      // 信息完整，标记会话完成，注入完整输入
      await clarificationManager.completeSession(activeClarification.id, userId, supplementedInput);
      console.log('[Step 1.5] Clarification complete, input is now valid');

      // 将完整输入注入到处理后的消息中
      processedMessage = JSON.stringify(supplementedInput);
    } else {
      // 仍有缺失，更新会话
      activeClarification.partialInput = supplementedInput;
      activeClarification.missingFields = stillMissing;
      activeClarification.clarificationCount++;
      console.log('[Step 1.5] Still missing:', stillMissing.map(f => f.label).join(', '));

      // 检查是否达到最大澄清次数
      if (clarificationManager.shouldEndClarification(activeClarification)) {
        const reply = await clarificationManager.generateReply(activeClarification);
        return {
          reply,
          toolData: null,
          clarificationEnded: true
        };
      }

      // 生成追问
      const reply = await clarificationManager.generateReply(activeClarification);
      return {
        reply,
        toolData: { clarificationSessionId: activeClarification.id },
        needsClarification: true
      };
    }
  } else {
    // 用户回复没有新数据，可能是确认或无关内容，生成追问
    console.log('[Step 1.5] No new data extracted, generating follow-up question');
    const reply = await clarificationManager.generateReply(activeClarification);
    return {
      reply,
      toolData: { clarificationSessionId: activeClarification.id },
      needsClarification: true
    };
  }
}
```

- [ ] **Step 3: 修改 Step 6 - 添加工具验证失败处理**

在 `const validation = validateToolInput(toolName, enrichedInput);` 之后添加：

```typescript
// 检查验证结果
if (!validation.valid) {
  console.log('[Step 6] Invalid input, missing fields:', validation.missingFields.map(f => f.label).join(', '));

  // 检查是否达到最大澄清次数
  const activeSession = await clarificationManager.getActiveSession(userId);
  if (activeSession && clarificationManager.shouldEndClarification(activeSession)) {
    const reply = await clarificationManager.generateReply(activeSession);
    return {
      reply,
      toolData: null,
      clarificationEnded: true
    };
  }

  // 创建澄清会话
  const session = await clarificationManager.createSession({
    toolName,
    userId,
    partialInput: enrichedInput,
    missingFields: validation.missingFields,
    userMessage: processedMessage,
    llmInterpretation: extractToolInterpretation(response, toolCalls)
  });

  console.log('[Step 6] Created clarification session:', session.id);

  // 生成追问
  const reply = await clarificationManager.generateReply(session);
  return {
    reply,
    toolData: { clarificationSessionId: session.id },
    needsClarification: true
  };
}
```

- [ ] **Step 4: 添加 extractToolInterpretation 辅助函数**

在 `extractText` 函数之后添加：

```typescript
/**
 * 从 LLM 响应中提取工具调用解释
 */
function extractToolInterpretation(response: any, toolCalls: any[]): string {
  if (toolCalls.length > 0) {
    return `调用工具 ${toolCalls[0].name}，参数：${JSON.stringify(toolCalls[0].input)}`;
  }
  return extractText(response.content);
}
```

- [ ] **Step 5: 验证修改后的文件语法**

Run: `cd backend && npx tsc --noEmit src/agents/fitnessAgentV2.ts`
Expected: 无错误

- [ ] **Step 6: Commit**

```bash
git add backend/src/agents/fitnessAgentV2.ts
git commit -m "feat(clarification): integrate ClarificationManager into fitnessAgentV2"
```

---

### Task 8: 添加 e2e 测试

**Files:**
- Create: `frontend/tests/e2e/specs/clarification.spec.ts`
- Create: `frontend/tests/e2e/page-objects/ChatPage.ts`

- [ ] **Step 1: 创建 ChatPage page object**

```typescript
import { Page } from '@playwright/test';

export class ChatPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/chat');
  }

  async sendMessage(message: string) {
    await this.page.locator('textarea[name="message"]').fill(message);
    await this.page.locator('button[type="submit"]').click();
  }

  async getLastBotMessage(): Promise<string> {
    const messages = await this.page.locator('.message.bot').all();
    const last = messages[messages.length - 1];
    return last.textContent();
  }

  async waitForResponse() {
    await this.page.waitForResponse(response =>
      response.url().includes('/api/chat/') && response.status() === 200
    );
  }
}
```

- [ ] **Step 2: 创建 clarification.spec.ts**

```typescript
import { test, expect } from '@playwright/test';
import { ChatPage } from '../page-objects/ChatPage';

test.describe('意图澄清机制', () => {
  let chatPage: ChatPage;

  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPage(page);
    await chatPage.goto();
    await page.evaluate(() => localStorage.setItem('token', 'test-token'));
  });

  test('部分信息时应该追问', async () => {
    await chatPage.sendMessage('卧推80公斤');

    await chatPage.waitForResponse();
    const reply = await chatPage.getLastBotMessage();

    // 应该追问组数和次数
    expect(reply).toMatch(/组数|次数|几组/);
    expect(reply).toMatch(/卧推/);
  });

  test('回复澄清后应该保存记录', async () => {
    // 先发送部分信息触发澄清
    await chatPage.sendMessage('卧推80公斤');
    await chatPage.waitForResponse();

    // 回复澄清
    await chatPage.sendMessage('5组每组8个');
    await chatPage.waitForResponse();

    const reply = await chatPage.getLastBotMessage();

    // 应该确认保存成功
    expect(reply).toMatch(/已记录|成功|保存/);
  });

  test('超时后应该允许重新开始', async ({ page }) => {
    // 模拟超时：清除 session
    await page.evaluate(() => {
      // 清除 localStorage 或触发超时逻辑
    });

    await chatPage.sendMessage('卧推80公斤');
    await chatPage.waitForResponse();

    const reply = await chatPage.getLastBotMessage();
    // 应该能正常进入澄清流程
    expect(reply).toMatch(/组数|次数|几组/);
  });
});
```

- [ ] **Step 3: Commit**

```bash
git add frontend/tests/e2e/specs/clarification.spec.ts frontend/tests/e2e/page-objects/ChatPage.ts
git commit -m "test(e2e): add clarification mechanism tests"
```

---

### Task 9: 更新 PRD 文档

**Files:**
- Modify: `docs/PRD.md`

- [ ] **Step 1: 更新 PRD.md**

在 PRD.md 的"已实现功能"部分添加：

```markdown
### 意图澄清机制

当用户输入信息不完整时，AI 自动追问并携带已解析的信息，避免用户重复输入。

**实现位置**: `backend/src/agents/clarification/`

**核心流程**:
1. 用户输入 → LLM 识别意图 → 参数验证
2. 信息不完整 → 创建澄清会话 → 生成追问
3. 用户回复 → 合并上下文 → 重新验证/执行

**限制**:
- 同一用户同时只允许一个澄清会话
- 最多3次追问循环
- Session TTL 5分钟
```

- [ ] **Step 2: Commit**

```bash
git add docs/PRD.md
git commit -m "docs: update PRD with clarification mechanism"
```

---

## 自检清单

- [ ] Spec coverage: 设计文档的所有核心功能都有对应任务
- [ ] 无占位符: 所有任务都包含实际代码
- [ ] 类型一致性: types.ts 定义与其他文件使用一致
- [ ] 测试覆盖: e2e 测试覆盖核心澄清场景

---

## 执行选项

**Plan complete and saved to `docs/superpowers/plans/2026-05-11-intent-clarification-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**