# Chat Context Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable AI to understand user background (profile + training history) and maintain multi-turn conversation context.

**Architecture:** Inject user context (compressed training summary) and conversation history (last 10 rounds) into AI prompts. Update compressed context incrementally after each conversation.

**Tech Stack:** Backend: Node.js/Express, LangChain, MySQL. Frontend: React/Zustand, Axios.

---

## File Structure

```
backend/src/
├── repositories/
│   ├── userContextRepository.js  (NEW)
│   └── chatMessageRepository.js   (NEW)
├── services/
│   ├── userContextService.js      (NEW)
│   └── chatHistoryService.js      (NEW)
├── agents/
│   └── fitnessAgent.js            (MODIFY - add historyMessages support)
└── routes/
    └── chat.js                    (MODIFY - get context, pass to runAgent)

frontend/src/
├── stores/
│   └── chatStore.ts               (MODIFY - add history parameter)
├── api/
│   └── chat.ts                   (MODIFY - add historyMessages)
└── pages/
    └── Chat.tsx                  (MODIFY - pass history)
```

---

## Task 1: Create Database Migration

**Files:**
- Modify: `backend/scripts/init-db.sql`

- [ ] **Step 1: Add user_contexts and chat_messages tables to init-db.sql**

Add at the end of the file:

```sql
-- User context for AI prompts
CREATE TABLE IF NOT EXISTS user_contexts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  context_text TEXT,
  profile_snapshot JSON,
  active_plan_name VARCHAR(255),
  active_plan_status VARCHAR(50),
  last_workout_date DATE,
  last_measurement_date DATE,
  total_workouts INT DEFAULT 0,
  total_measurements INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Chat messages for history
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role ENUM('user', 'assistant') NOT NULL,
  content TEXT NOT NULL,
  saved_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_created (user_id, created_at)
);
```

- [ ] **Step 2: Run database migration**

```bash
cd backend && npm run init-db
```

Expected: Tables created without error

- [ ] **Step 3: Commit**

```bash
git add backend/scripts/init-db.sql && git commit -m "feat: add user_contexts and chat_messages tables"
```

---

## Task 2: Create Backend Repositories

**Files:**
- Create: `backend/src/repositories/userContextRepository.js`
- Create: `backend/src/repositories/chatMessageRepository.js`

- [ ] **Step 1: Create userContextRepository.js**

```javascript
import pool from '../config/database.js';

export const userContextRepository = {
  async create(userId) {
    await pool.execute(
      'INSERT INTO user_contexts (user_id) VALUES (?)',
      [userId]
    );
  },

  async getByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM user_contexts WHERE user_id = ?',
      [userId]
    );
    return rows[0] || null;
  },

  async updateSnapshot(userId, profile, activePlan) {
    await pool.execute(
      `UPDATE user_contexts SET
       profile_snapshot = ?,
       active_plan_name = ?,
       active_plan_status = ?,
       last_workout_date = ?,
       last_measurement_date = ?,
       total_workouts = ?,
       total_measurements = ?
       WHERE user_id = ?`,
      [
        JSON.stringify(profile),
        activePlan?.name || null,
        activePlan?.status || null,
        profile.lastWorkoutDate || null,
        profile.lastMeasurementDate || null,
        profile.totalWorkouts || 0,
        profile.totalMeasurements || 0,
        userId
      ]
    );
  },

  async updateContextText(userId, contextText) {
    await pool.execute(
      'UPDATE user_contexts SET context_text = ? WHERE user_id = ?',
      [contextText, userId]
    );
  }
};
```

- [ ] **Step 2: Create chatMessageRepository.js**

```javascript
import pool from '../config/database.js';

export const chatMessageRepository = {
  async create(userId, role, content, savedData = null) {
    const [result] = await pool.execute(
      'INSERT INTO chat_messages (user_id, role, content, saved_data) VALUES (?, ?, ?, ?)',
      [userId, role, content, savedData ? JSON.stringify(savedData) : null]
    );
    return result.insertId;
  },

  async getRecentMessages(userId, limit = 20) {
    const [rows] = await pool.execute(
      `SELECT id, role, content, saved_data, created_at
       FROM chat_messages
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT ?`,
      [userId, limit]
    );
    return rows.reverse();
  }
};
```

- [ ] **Step 3: Verify files compile**

```bash
cd backend && node -c src/repositories/userContextRepository.js && node -c src/repositories/chatMessageRepository.js
```

Expected: No syntax errors

- [ ] **Step 4: Commit**

```bash
git add backend/src/repositories/userContextRepository.js backend/src/repositories/chatMessageRepository.js && git commit -m "feat: add user context and chat message repositories"
```

---

## Task 3: Create Backend Services

**Files:**
- Create: `backend/src/services/userContextService.js`
- Create: `backend/src/services/chatHistoryService.js`

- [ ] **Step 1: Create userContextService.js**

```javascript
import { userContextRepository } from '../repositories/userContextRepository.js';
import { workoutRepository } from '../repositories/workoutRepository.js';
import { measurementRepository } from '../repositories/measurementRepository.js';
import { createModel } from '../agents/chatMiniMax.js';

const locks = new Map();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractText(response) {
  if (typeof response.content === 'string') return response.content;
  if (Array.isArray(response.content)) {
    return response.content.find(p => p.type === 'text')?.text || '';
  }
  return '';
}

export const userContextService = {
  async getOrCreateContext(userId) {
    let ctx = await userContextRepository.getByUserId(userId);
    if (!ctx) {
      await userContextRepository.create(userId);
      ctx = await userContextRepository.getByUserId(userId);
      setImmediate(() => this.generateInitialContext(userId));
    }
    return ctx;
  },

  async refreshContextWithLock(userId, latestDialogue) {
    while (locks.get(userId)) {
      await sleep(100);
    }
    locks.set(userId, true);
    try {
      await this.refreshContext(userId, latestDialogue);
    } finally {
      locks.delete(userId);
    }
  },

  async refreshContext(userId, latestDialogue) {
    const current = await userContextRepository.getByUserId(userId);
    if (!current) return;

    const prompt = `【当前用户压缩上下文】
${current.context_text || '（首次生成）'}

【本次对话信息】
${latestDialogue}

【任务】
根据"本次对话信息"更新"当前用户压缩上下文"。规则：
- 包含新的训练记录 → 更新训练趋势（动作、重量、频率）
- 包含新的围度数据 → 更新体型数据
- 涉及训练计划 → 更新计划信息
- 保持简洁，控制在 200 字以内
- 只输出更新后的完整上下文，不要解释`;

    const model = await createModel();
    const response = await model.invoke([{ role: 'user', content: prompt }]);
    const newText = extractText(response);
    await userContextRepository.updateContextText(userId, newText);
  },

  async generateInitialContext(userId) {
    // Get user profile
    const [userRows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    const user = userRows[0];
    if (!user) return;

    // Get recent workouts
    const [workoutRows] = await pool.execute(
      `SELECT w.date, we.exercise_name, we.sets, we.reps, we.weight
       FROM workouts w
       LEFT JOIN workout_exercises we ON w.id = we.workout_id
       WHERE w.user_id = ? AND w.deleted_at IS NULL
       ORDER BY w.date DESC
       LIMIT 20`,
      [userId]
    );

    // Get recent measurements
    const [measurementRows] = await pool.execute(
      `SELECT m.date, mi.body_part, mi.value
       FROM body_measurements m
       LEFT JOIN measurement_items mi ON m.id = mi.measurement_id
       WHERE m.user_id = ? AND m.deleted_at IS NULL
       ORDER BY m.date DESC
       LIMIT 10`,
      [userId]
    );

    // Get active plan
    const [planRows] = await pool.execute(
      "SELECT name, status FROM workout_plans WHERE user_id = ? AND status = 'active' LIMIT 1",
      [userId]
    );
    const activePlan = planRows[0] || null;

    // Calculate stats
    const profile = {
      goal: user.goal || '未知',
      experience: user.experience || '未知',
      frequency: user.frequency || 0,
      body_weight: user.body_weight || '未知',
      totalWorkouts: workoutRows.length,
      totalMeasurements: measurementRows.length,
      lastWorkoutDate: workoutRows[0]?.date || null,
      lastMeasurementDate: measurementRows[0]?.date || null
    };

    await userContextRepository.updateSnapshot(userId, profile, activePlan);

    // Generate context text
    const dataPrompt = `根据以下用户数据，生成一段简洁的用户背景描述（100-200字）：
    用户：${JSON.stringify(profile)}
    训练记录：${JSON.stringify(workoutRows.slice(0, 10))}
    围度记录：${JSON.stringify(measurementRows.slice(0, 5))}
    当前计划：${JSON.stringify(activePlan)}
    重点：训练经验、目标、频率、主要动作及重量趋势、体型数据。`;

    const model = await createModel();
    const response = await model.invoke([{ role: 'user', content: dataPrompt }]);
    const contextText = extractText(response);
    await userContextRepository.updateContextText(userId, contextText);
  }
};
```

- [ ] **Step 2: Create chatHistoryService.js**

```javascript
import { chatMessageRepository } from '../repositories/chatMessageRepository.js';

export const chatHistoryService = {
  async saveMessage(userId, role, content, savedData = null) {
    return chatMessageRepository.create(userId, role, content, savedData);
  },

  async getMessages(userId, limit = 20) {
    return chatMessageRepository.getRecentMessages(userId, limit);
  }
};
```

- [ ] **Step 3: Verify files compile**

```bash
cd backend && node -c src/services/userContextService.js && node -c src/services/chatHistoryService.js
```

Expected: No syntax errors

- [ ] **Step 4: Commit**

```bash
git add backend/src/services/userContextService.js backend/src/services/chatHistoryService.js && git commit -m "feat: add user context and chat history services"
```

---

## Task 4: Modify fitnessAgent.js

**Files:**
- Modify: `backend/src/agents/fitnessAgent.js:88-220`

- [ ] **Step 1: Read current runAgent function and buildSystemPrompt**

Current code at line 88-220. The function needs to:
1. Accept new parameters: `userContext` and `historyMessages`
2. Add `buildSystemPrompt()` helper that includes user context
3. Build messages array with history

- [ ] **Step 2: Modify runAgent function signature**

Change line 88 from:
```javascript
export async function runAgent(userId, message) {
```

To:
```javascript
export async function runAgent(userId, message, userContext = null, historyMessages = []) {
```

- [ ] **Step 3: Add buildSystemPrompt function and modify message building**

After line 29 (getModel function), add the buildSystemPrompt function:

```javascript
function buildSystemPrompt(userContext) {
  const today = new Date();
  const toDateStr = d => d.toISOString().split('T')[0];
  const addDays = (d, n) => {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return toDateStr(r);
  };

  const todayStr = toDateStr(today);
  const yesterdayStr = addDays(today, -1);
  const tomorrowStr = addDays(today, 1);
  const dayAfterTomorrowStr = addDays(today, 2);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() - 6);
  const startOfWeekStr = toDateStr(startOfWeek);

  let contextSection = '';
  if (userContext?.context_text) {
    const snap = userContext.profile_snapshot ? JSON.parse(userContext.profile_snapshot) : {};
    contextSection = `【用户背景】
${userContext.context_text}

【当前状态】
- 健身目标：${snap.goal || '未知'}
- 健身经验：${snap.experience || '未知'}
- 训练频率：每周${snap.frequency || 0}次
- 当前体重：${snap.body_weight || '未知'}kg
- 当前计划：${userContext.active_plan_name || '无'}（${userContext.active_plan_status || 'N/A'}）`;
  }

  return `你是健身数据记录助手。用中文回答。

${contextSection}

【日期参考 - 今天：${todayStr}】
当用户使用相对日期时，必须根据以下规则计算实际日期：
- "今天" = ${todayStr}
- "昨天" = ${yesterdayStr}
- "明天" = ${tomorrowStr}
- "后天" = ${dayAfterTomorrowStr}
- "X天前" = ${todayStr} 往前推 X 天
- "上周X"（如上周三）= 本周一（${startOfWeekStr}）往前推7天，再加 X-1 天
- "近一周" = ${addDays(new Date(), -7)} 至 ${todayStr}
- "近一个月" = ${addDays(new Date(), -30)} 至 ${todayStr}
- "近三个月" = ${addDays(new Date(), -90)} 至 ${todayStr}

注意：如果用户说的日期无法确定，必须调用 query 工具查询，不要瞎猜日期。

【必须严格执行的工具调用规则】：
当用户询问以下内容时，必须立即调用对应工具，不得自行编造数据：
- 询问"训练历史"、"训练记录"、"运动记录" → 必须调用 query_workout
- 询问"围度记录"、"身体数据" → 必须调用 query_measurement
- 询问"统计"、"分析"类问题 → 先调用 query_workout 或 query_measurement 获取数据

工具调用格式：
- save_workout: { date: "YYYY-MM-DD", exercises: [...] }
- save_measurement: { date: "YYYY-MM-DD", measurements: [...] }
- query_workout: { start_date: "YYYY-MM-DD", end_date: "YYYY-MM-DD", exercise_type?: "运动类型" }
- query_measurement: { start_date: "YYYY-MM-DD", end_date: "YYYY-MM-DD" }

日期格式YYYY-MM-DD。`;
}
```

- [ ] **Step 4: Modify message building (around line 152-156)**

Change from:
```javascript
  // Build messages using proper message classes
  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage(message)
  ];
```

To:
```javascript
  // Build messages with user context and history
  const systemPrompt = buildSystemPrompt(userContext);
  const messages = [
    new SystemMessage(systemPrompt),
    ...historyMessages.map(m =>
      m.role === 'user'
        ? new HumanMessage(m.content)
        : new AIMessage(m.content)
    ),
    new HumanMessage(message)
  ];
```

- [ ] **Step 5: Add extractText function at end of file**

Add after the runAgent function (around line 195):
```javascript
function extractText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.filter(p => p.type === 'text').map(p => p.text).join('');
  }
  return '';
}
```

- [ ] **Step 6: Test the changes**

```bash
cd backend && npm run dev &
sleep 3
# Test with a simple message
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"message":"你好","historyMessages":[]}'
```

Expected: AI responds with greeting, no errors

- [ ] **Step 7: Commit**

```bash
git add backend/src/agents/fitnessAgent.js && git commit -m "feat: add user context and history support to fitnessAgent"
```

---

## Task 5: Modify chat Routes

**Files:**
- Modify: `backend/src/routes/chat.js`

- [ ] **Step 1: Modify chat route to get context and pass to runAgent**

Change from:
```javascript
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userId = req.user.id;
    const { reply, savedData } = await runAgent(userId, message);

    res.json({ reply, savedData });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process message', details: err.message });
  }
});
```

To:
```javascript
import { userContextService } from '../services/userContextService.js';

router.post('/message', async (req, res) => {
  try {
    const { message, historyMessages } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userId = req.user.id;

    // Get or create user context
    const userContext = await userContextService.getOrCreateContext(userId);

    // Call agent with context and history
    const { reply, savedData } = await runAgent(
      userId,
      message,
      userContext,
      historyMessages || []
    );

    // Async refresh context (don't wait)
    setImmediate(() => {
      const dialogue = `用户：${message}\nAI：${reply}${savedData ? '\n[保存了' + savedData.type + '记录]' : ''}`;
      userContextService.refreshContextWithLock(userId, dialogue);
    });

    res.json({ reply, savedData });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process message', details: err.message });
  }
});
```

- [ ] **Step 2: Test the changes**

```bash
# Test with history
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"message":"深蹲100kg 5组8个","historyMessages":[{"role":"user","content":"今天运动了"},{"role":"assistant","content":"请问您做了什么运动？"}]}'
```

Expected: AI remembers "今天运动了" context and saves correctly

- [ ] **Step 3: Commit**

```bash
git add backend/src/routes/chat.js && git commit -m "feat: inject user context into chat and pass history"
```

---

## Task 6: Modify Frontend Chat Store

**Files:**
- Modify: `frontend/src/stores/chatStore.ts`

- [ ] **Step 1: Read current chatStore implementation**

```typescript
// Current interface - need to add historyMessages parameter to sendMessage
interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<{ reply: string; savedData: SavedData }>;
  // ...
}
```

- [ ] **Step 2: Modify sendMessage to accept historyMessages**

Change from:
```typescript
sendMessage: async (content: string) => {
  set({ isLoading: true });
  try {
    const response = await chatApi.sendMessage(content);
    // ...
  }
}
```

To:
```typescript
sendMessage: async (content: string, historyMessages: ChatMessage[] = []) => {
  set({ isLoading: true });
  try {
    const response = await chatApi.sendMessage(content, historyMessages);
    // ...
  }
}
```

And update the chatApi.sendMessage call:

```typescript
// In chatApi.sendMessage
async sendMessage(message: string, historyMessages: ChatMessage[] = []): Promise<{ reply: string; savedData: SavedData }> {
  const { data } = await client.post('/chat/message', {
    message,
    historyMessages
  });
  return data;
}
```

- [ ] **Step 3: Add getRecentHistory helper export**

Add at end of file:
```typescript
// Get last N rounds of conversation (2 messages per round)
export function getRecentHistory(messages: ChatMessage[], rounds: number): ChatMessage[] {
  return messages.slice(-rounds * 2);
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd frontend && npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add frontend/src/stores/chatStore.ts frontend/src/api/chat.ts && git commit -m "feat: pass history messages to chat API"
```

---

## Task 7: Modify Chat Page

**Files:**
- Modify: `frontend/src/pages/Chat.tsx`

- [ ] **Step 1: Import getRecentHistory**

Add to imports:
```typescript
import { useChatStore, getRecentHistory } from '../stores/chatStore';
```

- [ ] **Step 2: Pass history when calling sendMessage**

Find where sendMessage is called and add history:

```typescript
const handleSend = async (content: string) => {
  const history = getRecentHistory(messages, 10); // Last 10 rounds
  await sendMessage(content, history);
};
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd frontend && npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/Chat.tsx && git commit -m "feat: pass conversation history to AI"
```

---

## Task 8: Integration Test

**Files:**
- Test manually via curl or frontend

- [ ] **Step 1: Start backend and test multi-turn conversation**

```bash
# Register/login to get token
TOKEN="<your_token>"

# First message - incomplete info
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"message":"今天运动了","historyMessages":[]}'

# Second message - with history from first exchange
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"message":"深蹲100kg 5组8个","historyMessages":[{"role":"user","content":"今天运动了"},{"role":"assistant","content":"请问您做了什么运动？具体做了几组、多少重量？"}]}'
```

Expected: Second response should mention "今天运动了" context and save the workout.

- [ ] **Step 2: Test frontend**

```bash
cd frontend && npm run dev
```

Open browser, login, go to chat:
1. Say "今天运动了" - AI should ask follow-up
2. Say "深蹲100kg 5组8个" - AI should save and confirm

---

## Task 9: Verify User Context in Database

- [ ] **Step 1: Check user_contexts table after conversation**

```bash
mysql -u root fitlc -e "SELECT user_id, context_text, profile_snapshot FROM user_contexts LIMIT 1\G"
```

Expected: context_text contains AI-generated summary about the user.

---

## Summary

After all tasks complete:
- Backend creates/updates user context on each conversation
- Frontend passes last 10 rounds of conversation history
- AI receives both user background (context) and conversation flow (history)
- Multi-turn conversations maintain context across exchanges
