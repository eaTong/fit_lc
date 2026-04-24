# 聊天多轮对话上下文关联设计

## 背景与问题

当前 AI 对话是单轮独立的。当用户输入信息不全时，AI 会追问，但追问后用户回答了，AI 却可能丢失了之前的上下文。

**问题场景：**
```
用户：今天运动了
AI：请问您做了什么运动？具体做了几组、多少重量？
用户：深蹲100kg 5组8个
AI：（不知道用户之前说了"今天运动了"，可能又重复问）
```

## 目标

让 AI 在多轮对话中正确关联上下文，当用户补充信息后，AI 能结合之前的问题和回答形成完整理解。

## 解决方案

### 核心改动

每次调用 `runAgent` 时，除了当前消息和用户上下文外，额外传入**对话历史**。

### 函数签名变更

```javascript
// 之前
runAgent(userId, message, userContext)

// 之后
runAgent(userId, message, userContext, historyMessages)
```

### 消息组装顺序

```javascript
const messages = [
  new SystemMessage(systemPrompt),           // 1. 系统提示词（包含用户背景）
  ...historyMessages.map(m => m.role === 'user'
    ? new HumanMessage(m.content)
    : new AIMessage(m.content)),           // 2. 对话历史
  new HumanMessage(message)                 // 3. 当前消息
];
```

### historyMessages 格式

```javascript
// 前端传入的格式
[
  { role: 'user', content: '今天运动了', timestamp: '2026-04-24T10:00:00' },
  { role: 'assistant', content: '请问您做了什么运动？具体做了几组、多少重量？' },
  { role: 'user', content: '深蹲100kg 5组8个' },
]
```

### 限制消息轮数

只传**最近 10 轮对话**（约 20 条消息），控制 token 消耗。

### 前端改动

**`src/stores/chatStore.ts`**
```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  savedData?: SavedData;
}

// 发送消息时，传递最近 10 轮对话
const sendMessage = async (content: string) => {
  // 获取最近 10 轮对话（20 条消息）
  const historyMessages = getRecentHistory(10);

  const response = await chatApi.sendMessage(content, userContext, historyMessages);
  // ...
};

// 取最近 N 轮对话
function getRecentHistory(rounds: number): ChatMessage[] {
  const messages = Array.from(store.getState().messages);
  // 保留最后 N 轮对话
  return messages.slice(-rounds * 2);
}
```

### 后端改动

**`src/routes/chat.js`**
```javascript
router.post('/message', async (req, res) => {
  try {
    const { message, historyMessages } = req.body;  // 从请求获取历史
    const userId = req.user.id;

    // 1. 获取用户上下文
    const userContext = await userContextService.getOrCreateContext(userId);

    // 2. 注入上下文 + 历史调用 AI
    const { reply, savedData } = await runAgent(
      userId,
      message,
      userContext,
      historyMessages || []
    );

    // 3. 异步更新压缩上下文
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

**`src/agents/fitnessAgent.js`**
```javascript
export async function runAgent(userId, message, userContext = null, historyMessages = []) {
  const model = await getModel();

  // 构建系统提示词（包含用户上下文）
  const systemPrompt = buildSystemPrompt(userContext);

  // 组装消息列表
  const messages = [
    new SystemMessage(systemPrompt),
    ...historyMessages.map(m =>
      m.role === 'user'
        ? new HumanMessage(m.content)
        : new AIMessage(m.content)
    ),
    new HumanMessage(message)
  ];

  // ... 其余逻辑不变 ...
}
```

**`src/api/chat.ts`** (前端)
```typescript
interface SendMessageRequest {
  message: string;
  historyMessages?: ChatMessage[];
}

export const chatApi = {
  async sendMessage(
    message: string,
    userContext: UserContext,
    historyMessages: ChatMessage[] = []
  ): Promise<{ reply: string; savedData: SavedData }> {
    const { data } = await client.post('/chat/message', {
      message,
      historyMessages
    });
    return data;
  }
};
```

## 用户上下文 + 对话历史的关系

| 信息类型 | 内容 | 作用 |
|----------|------|------|
| 用户上下文 | profile + 压缩训练总结 | 帮助 AI 理解"用户是谁" |
| 对话历史 | 最近 10 轮对话 | 帮助 AI 理解"当前在聊什么" |

两者组合让 AI 既了解用户背景，又能在多轮对话中保持连贯。

## 错误处理

1. **historyMessages 为空** - 正常降级为单轮对话
2. **historyMessages 格式错误** - 后端忽略或使用空数组
3. **historyMessages 过长** - 前端限制最多 20 条消息

## 测试场景

1. 用户说"今天运动了" → AI 追问"做了什么"
2. 用户回答"深蹲100kg" → AI 正确关联"今天运动了"并保存
3. 用户问"上次训练是什么时候" → AI 能结合历史上下文
4. 多轮对话后，AI 不会重复问同样的问题
