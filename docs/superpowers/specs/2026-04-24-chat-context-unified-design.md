# AI 聊天上下文增强设计（用户上下文 + 多轮对话）

## 背景与目标

当前 AI 对话有两个问题：
1. **没有用户上下文** - AI 不了解用户的健身目标、训练历史、身体数据
2. **没有对话历史** - 多轮对话时 AI 丢失之前的信息，追问后无法关联

**目标：**
1. 每次对话时向 AI 注入用户上下文（profile + 压缩的训练历史总结）
2. 传递最近 10 轮对话历史，让 AI 理解"当前在聊什么"
3. 每次对话后异步更新压缩上下文（增量更新）

## 用户交互流程

```
1. 用户打开聊天页面
2. 前端加载本地消息（LocalStorage）
3. 用户发送消息
4. 后端获取用户上下文（profile + 压缩总结）
5. 后端注入上下文 + 对话历史调用 AI
6. AI 回复用户
7. 后端异步更新压缩上下文（不阻塞响应）
8. 前端显示 AI 回复，保存到 LocalStorage
```

## 数据库设计

### 新增表 `user_contexts`

```sql
CREATE TABLE user_contexts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  context_text TEXT,              -- AI 增量生成的自然语言压缩总结
  profile_snapshot JSON,          -- 用户 profile 快照
  active_plan_name VARCHAR(255), -- 当前计划名称
  active_plan_status VARCHAR(50),-- 当前计划状态
  last_workout_date DATE,       -- 最后训练日期
  last_measurement_date DATE,   -- 最后围度日期
  total_workouts INT DEFAULT 0, -- 累计训练次数
  total_measurements INT DEFAULT 0,-- 累计围度记录次数
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 新增表 `chat_messages`

```sql
CREATE TABLE chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role ENUM('user', 'assistant') NOT NULL,
  content TEXT NOT NULL,
  saved_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_created (user_id, created_at)
);
```

## 后端实现

### 新增文件

**`src/repositories/userContextRepository.js`**
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
        profile.lastWorkoutDate,
        profile.lastMeasurementDate,
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

**`src/repositories/chatMessageRepository.js`**
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
    return rows.reverse(); //  oldest first for context
  }
};
```

**`src/services/userContextService.js`**
```javascript
import { userContextRepository } from '../repositories/userContextRepository.js';
import { workoutRepository } from '../repositories/workoutRepository.js';
import { measurementRepository } from '../repositories/measurementRepository.js';
import { planRepository } from '../repositories/planRepository.js';
import { createModel } from '../agents/chatMiniMax.js';

const locks = new Map();

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
    const response = await model.invoke([new HumanMessage(prompt)]);
    const newText = extractText(response);
    await userContextRepository.updateContextText(userId, newText);
  },

  async generateInitialContext(userId) {
    const profile = await userRepository.findById(userId);
    const workouts = await workoutRepository.findRecent(userId, 90);
    const measurements = await measurementRepository.findRecent(userId, 90);
    const activePlan = await planRepository.findActive(userId);

    await userContextRepository.updateSnapshot(userId, {
      goal: profile.goal,
      experience: profile.experience,
      frequency: profile.frequency,
      body_weight: profile.body_weight,
      lastWorkoutDate: workouts[0]?.date,
      lastMeasurementDate: measurements[0]?.date,
      totalWorkouts: workouts.length,
      totalMeasurements: measurements.length
    }, activePlan);

    const prompt = `根据以下用户数据，生成一段简洁的用户背景描述（100-200字）：
    ${JSON.stringify({ profile, workouts, measurements, activePlan })}
    重点：训练经验、目标、频率、主要动作及重量趋势、体型数据。`;

    const model = await createModel();
    const response = await model.invoke([new HumanMessage(prompt)]);
    const contextText = extractText(response);
    await userContextRepository.updateContextText(userId, contextText);
  }
};

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
```

**`src/services/chatHistoryService.js`**
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

### 修改现有代码

**`src/agents/fitnessAgent.js`**

```javascript
export async function runAgent(userId, message, userContext = null, historyMessages = []) {
  const model = await getModel();

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

  // First call
  const response = await model.invoke(messages);
  const toolCalls = extractToolCallsFromContent(response.content);

  if (toolCalls.length === 0) {
    return { reply: extractText(response.content), savedData: null };
  }

  // Execute tools and get final response
  let savedData = null;
  const toolMessages = [];
  for (const toolCall of toolCalls) {
    const result = await executeToolCall(toolCall.name, toolCall.input, userId);
    if (!savedData) savedData = extractSavedDataFromToolResult(result);
    toolMessages.push(new ToolMessage({ content: result, tool_call_id: toolCall.id }));
  }

  const finalResponse = await model.invoke([...messages, response, ...toolMessages]);
  return { reply: extractText(finalResponse.content), savedData };
}

function buildSystemPrompt(userContext) {
  const today = new Date();
  const toDateStr = d => d.toISOString().split('T')[0];
  const addDays = (d, n) => {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return toDateStr(r);
  };

  const todayStr = toDateStr(today);
  const dateInfo = {
    today: todayStr,
    yesterday: addDays(today, -1),
    tomorrow: addDays(today, 1),
    dayAfterTomorrow: addDays(today, 2),
    startOfWeek: toDateStr(new Date(today.setDate(today.getDate() - today.getDay() - 6))),
    startOfLastWeek: toDateStr(new Date(today.setDate(today.getDate() - 7))),
    endOfLastWeek: toDateStr(new Date(today.setDate(today.getDate() - 1)))
  };

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

【日期参考 - 今天：${dateInfo.today}】
- "今天" = ${dateInfo.today}
- "昨天" = ${dateInfo.yesterday}
- "明天" = ${dateInfo.tomorrow}
- "后天" = ${dateInfo.dayAfterTomorrow}
- "X天前" = ${dateInfo.today}往前推X天
- "上周X" = 本周一（${dateInfo.startOfWeek}）往前推7天再加X-1天
- "近一周" = ${addDays(new Date(), -7)} 至 ${dateInfo.today}
- "近一个月" = ${addDays(new Date(), -30)} 至 ${dateInfo.today}
- "近三个月" = ${addDays(new Date(), -90)} 至 ${dateInfo.today}

注意：如果用户说的日期无法确定，必须调用 query 工具查询，不要瞎猜日期。

【必须严格执行的工具调用规则】：
- 询问"训练历史"、"训练记录" → 必须调用 query_workout
- 询问"围度记录"、"身体数据" → 必须调用 query_measurement
- 询问"统计"、"分析" → 先调用 query 工具获取数据

工具调用格式：
- save_workout: { date: "YYYY-MM-DD", exercises: [...] }
- save_measurement: { date: "YYYY-MM-DD", measurements: [...] }
- query_workout: { start_date, end_date, exercise_type? }
- query_measurement: { start_date, end_date }

日期格式YYYY-MM-DD。`;
}

function extractText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.filter(p => p.type === 'text').map(p => p.text).join('');
  }
  return '';
}
```

**`src/routes/chat.js`**
```javascript
router.post('/message', async (req, res) => {
  try {
    const { message, historyMessages } = req.body;
    const userId = req.user.id;

    const userContext = await userContextService.getOrCreateContext(userId);
    const { reply, savedData } = await runAgent(
      userId,
      message,
      userContext,
      historyMessages || []
    );

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

## 前端实现

### 新增文件

**`src/api/chatHistory.ts`**
```typescript
import client from './client';
import type { ChatMessage } from '../types';

export const chatHistoryApi = {
  async getMessages(limit = 20): Promise<ChatMessage[]> {
    const { data } = await client.get('/chat/messages', { params: { limit } });
    return data.messages;
  },

  async syncMessages(messages: ChatMessage[]): Promise<void> {
    await client.post('/chat/messages/sync', { messages });
  }
};
```

### 修改文件

**`src/stores/chatStore.ts`**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chatApi } from '../api/chat';
import type { ChatMessage, SavedData } from '../types';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string, historyMessages: ChatMessage[]) => Promise<{ reply: string; savedData: SavedData }>;
  clearMessages: () => void;
  removeLastSavedData: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,

      sendMessage: async (content, historyMessages) => {
        set({ isLoading: true });
        try {
          const response = await chatApi.sendMessage(content, historyMessages);
          set(state => ({
            messages: [
              ...state.messages,
              { id: Date.now().toString(), role: 'user' as const, content, timestamp: new Date() },
              { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: response.reply, timestamp: new Date(), savedData: response.savedData }
            ],
            isLoading: false
          }));
          return response;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      clearMessages: () => set({ messages: [] }),
      removeLastSavedData: () => set(state => {
        const msgs = [...state.messages];
        for (let i = msgs.length - 1; i >= 0; i--) {
          if (msgs[i].savedData) {
            msgs[i] = { ...msgs[i], savedData: undefined };
            break;
          }
        }
        return { messages: msgs };
      })
    }),
    { name: 'chat-messages' }
  )
);

// 获取最近 N 轮对话
export function getRecentHistory(messages: ChatMessage[], rounds: number): ChatMessage[] {
  return messages.slice(-rounds * 2);
}
```

**`src/pages/Chat.tsx`** 改动
```typescript
import { useChatStore, getRecentHistory } from '../stores/chatStore';

export default function Chat() {
  const { messages, sendMessage, isLoading } = useChatStore();

  const handleSend = async (content: string) => {
    const history = getRecentHistory(messages, 10); // 最近 10 轮
    await sendMessage(content, history);
  };

  // ... rest of component
}
```

## 错误处理

1. **用户上下文不存在** - `getOrCreateContext()` 自动创建并触发初始生成
2. **历史消息为空** - 正常降级为单轮对话
3. **并发更新冲突** - 内存锁 `locks` 保证串行更新
4. **异步更新失败** - 不影响主流程，下次对话重试

## 测试要点

1. 对话功能正常（不报 403/500 错误）
2. 用户上下文正确注入到 AI prompt
3. 多轮对话中 AI 能关联之前的追问
4. 压缩上下文每次对话后更新
5. 用户补充信息后 AI 能正确保存
