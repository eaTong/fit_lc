# 用户上下文增强的 AI 聊天功能设计

## 背景与目标

当前 AI 对话没有用户上下文，每次对话都是独立的。AI 不了解用户的健身目标、训练历史、身体数据。

**目标：**
1. 保存对话历史（混合存储：MySQL + LocalStorage）
2. 每次对话时向 AI 注入用户上下文（profile + 压缩的训练历史总结）
3. 每次对话后异步更新压缩上下文

## 用户交互流程

```
1. 用户打开聊天页面
2. 前端加载最近 N 条对话（LocalStorage）+ 更多历史（MySQL）
3. 用户发送消息
4. 后端注入用户上下文到 system prompt
5. AI 回复用户
6. 后端异步更新压缩上下文（不阻塞响应）
7. 前端显示 AI 回复，保存到 LocalStorage
8. 定期（如有必要）同步 LocalStorage 到 MySQL
```

## 数据库设计

### 新增表 `user_contexts`

```sql
CREATE TABLE user_contexts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  context_text TEXT,              -- AI 生成的自然语言压缩总结
  profile_snapshot JSON,          -- 用户 profile 快照
  last_workout_date DATE,         -- 最后训练日期
  last_measurement_date DATE,    -- 最后围度日期
  total_workouts INT DEFAULT 0,  -- 累计训练次数
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
  saved_data JSON,               -- savedData 快照 { id, type }
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_created (user_id, created_at)
);
```

## 后端实现

### 1. 新增 Repository

**`src/repositories/userContextRepository.js`**
- `create(userId)` - 初始化用户上下文
- `getByUserId(userId)` - 获取用户上下文
- `updateSnapshot(userId, profileSnapshot, workoutStats, measurementStats)` - 更新快照
- `updateContextText(userId, contextText)` - 更新 AI 生成的总结

**`src/repositories/chatMessageRepository.js`**
- `create(userId, role, content, savedData)` - 保存消息
- `getRecentMessages(userId, limit)` - 获取最近消息

### 2. 新增 Service

**`src/services/userContextService.js`**
```javascript
// 内存锁，防止并发更新
const locks = new Map();

export const userContextService = {
  // 获取或创建用户上下文（首次时生成初始压缩上下文）
  async getOrCreateContext(userId) {
    let ctx = await userContextRepository.getByUserId(userId);
    if (!ctx) {
      // 首次：创建记录并生成初始上下文
      await userContextRepository.create(userId);
      ctx = await userContextRepository.getByUserId(userId);
      // 异步生成初始压缩上下文
      setImmediate(() => this.generateInitialContext(userId));
    }
    return ctx;
  },

  // 增量刷新上下文（带锁，防止并发）
  async refreshContextWithLock(userId, latestDialogue) {
    // 等待锁
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

  // 获取用户上下文用于注入 prompt
  async getUserContext(userId) {
    return userContextRepository.getByUserId(userId);
  },

  // 增量更新压缩上下文
  async refreshContext(userId, latestDialogue) {
    const currentContext = await userContextRepository.getByUserId(userId);
    if (!currentContext) return;

    const prompt = buildRefreshPrompt(currentContext.context_text, latestDialogue);
    const response = await model.invoke([new HumanMessage(prompt)]);
    const newContextText = extractText(response);

    await userContextRepository.updateContextText(userId, newContextText);
  },

  // 全量生成初始上下文（首次调用或上下文丢失时）
  async generateInitialContext(userId) {
    const profile = await userRepository.findById(userId);
    const workouts = await workoutRepository.findRecent(userId, 90);
    const measurements = await measurementRepository.findRecent(userId, 90);
    const activePlan = await planRepository.findActive(userId);

    const prompt = `根据以下用户数据，生成一段简洁的用户背景描述（100-200字）：
    ${JSON.stringify({ profile, workouts, measurements, activePlan })}
    重点描述：训练经验、目标、训练频率、主要动作及重量趋势、体型数据。`;

    const response = await model.invoke([new HumanMessage(prompt)]);
    const contextText = extractText(response);

    await userContextRepository.updateContextText(userId, contextText);
    await userContextRepository.updateSnapshot(userId, profile, activePlan);
  }
};
```

**`src/services/chatHistoryService.js`**
- `saveMessage(userId, role, content, savedData)` - 保存单条消息
- `getMessages(userId, limit)` - 获取消息历史

### 3. 修改现有代码

**`src/agents/fitnessAgent.js`**
```javascript
// 修改函数签名，增加 userContext 参数
export async function runAgent(userId, message, userContext = null) {
  const model = await getModel();

  // System prompt 组装
  let systemPrompt = buildSystemPrompt(userContext); // 见下方

  // ... 其余逻辑保持不变 ...
}

// 新增：构建带用户上下文的 system prompt
function buildSystemPrompt(userContext) {
  const dateInfo = calculateDateInfo(); // 日期计算逻辑

  let contextSection = '';
  if (userContext?.context_text) {
    contextSection = `【用户背景】
${userContext.context_text}

【当前状态】
- 健身目标：${userContext.profile_snapshot?.goal || '未知'}
- 健身经验：${userContext.profile_snapshot?.experience || '未知'}
- 训练频率：每周${userContext.profile_snapshot?.frequency || 0}次
- 当前体重：${userContext.profile_snapshot?.body_weight || '未知'}kg
- 当前计划：${userContext.active_plan_name || '无'}`;
  }

  return `你是健身数据记录助手。用中文回答。

${contextSection}

【日期参考 - 今天：${dateInfo.today}】
当用户使用相对日期时，必须根据以下规则计算实际日期：
- "今天" = ${dateInfo.today}
- "昨天" = ${dateInfo.yesterday}
- "明天" = ${dateInfo.tomorrow}
...（其余日期规则保持不变）

【必须严格执行的工具调用规则】：
...（工具调用规则保持不变）`;
}
```

**`src/routes/chat.js`**
```javascript
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    // 1. 获取或初始化用户上下文
    let userContext = await userContextService.getOrCreateContext(userId);

    // 2. 注入上下文调用 AI
    const { reply, savedData } = await runAgent(userId, message, userContext);

    // 3. 异步增量更新上下文（不阻塞响应）
    // 使用锁机制防止并发更新导致数据错乱
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

**`src/routes/records.js` / `src/routes/plans.js`**
- 保存新记录后，触发 `userContextService.refreshContext(userId)`

### 4. 用户上下文格式

注入到 AI prompt 的用户上下文：

```
【用户背景】
${userContext.context_text || '（暂无背景信息）'}

${userContext.profile_snapshot ? `【当前状态】
- 健身目标：${userContext.profile_snapshot.goal || '未知'}
- 健身经验：${userContext.profile_snapshot.experience || '未知'}
- 训练频率：每周${userContext.profile_snapshot.frequency || 0}次
- 当前体重：${userContext.profile_snapshot.body_weight || '未知'}kg
- 当前计划：${userContext.profile_snapshot.active_plan_name || '无'}` : ''}
```

**说明**：`context_text` 由 AI 生成增量更新，`profile_snapshot` 在初始生成时写入、后续保存新记录时更新。

`context_text` 示例（AI 增量生成）：
```
用户是一位有6个月力量训练经验的健身者，目标增肌。训练以深蹲、卧推、硬拉三大项为主。
近3个月深蹲从80kg进步到120kg（+50%），卧推从60kg进步到75kg（+25%）。
训练频率稳定在每周4次。最近一次训练是4月25日的深蹲120kg 5x8。
体脂率约15%，胸围95cm，腰围80cm。
```

## 前端实现

### 1. Chat Store 改动

**`src/stores/chatStore.ts`**
- 添加 `messages: ChatMessage[]` 持久化到 LocalStorage
- `sendMessage()` 后保存到 LocalStorage
- 定期（如每次发送消息后）同步到 MySQL

### 2. Chat 页面改动

**`src/pages/Chat.tsx`**
- 页面加载时从 LocalStorage 读取历史消息
- 每次发送消息后自动同步到后端（MySQL）

### 3. 新增 API

**`src/api/chatHistory.ts`**
```typescript
export const chatHistoryApi = {
  async getMessages(limit = 50): Promise<ChatMessage[]> { ... },
  async syncMessages(messages: ChatMessage[]): Promise<void> { ... }
}
```

## 更新压缩上下文的时机

**每次对话后** - 将"用户消息 + AI 回复"作为整体传入 `refreshContextWithLock()`，AI 增量更新压缩上下文。

`savedData`（如 `已保存深蹲记录`）会包含在对话信息中，AI 会据此更新训练趋势。

**核心原则**：每次对话后都进行增量压缩，上下文始终保持最新。

## 压缩上下文生成逻辑（增量更新）

采用**增量压缩**而非全量重算：每次对话后，将当前压缩上下文 + 最新对话信息发送给 AI，让 AI 增量更新。

```javascript
async function refreshContext(userId, latestDialogue) {
  // 1. 获取当前压缩上下文
  const currentContext = await userContextRepository.getByUserId(userId);

  // 2. 组装增量压缩 prompt
  const prompt = `【当前用户压缩上下文】
${currentContext.context_text || '（首次生成，无历史上下文）'}

【本次对话信息】
${latestDialogue}

【任务】
请根据"本次对话信息"，更新"当前用户压缩上下文"。规则：
- 如果本次对话包含新的训练记录，更新训练趋势（动作、重量、频率）
- 如果本次对话包含新的围度数据，更新体型数据
- 如果本次对话涉及训练计划变化，更新计划信息
- 保持上下文简洁精炼，控制在 200 字以内
- 只输出更新后的完整上下文，不要解释`;

  const response = await model.invoke([new HumanMessage(prompt)]);
  const newContextText = extractText(response);

  // 3. 保存新的压缩上下文
  await userContextRepository.updateContextText(userId, newContextText);
}
```

**增量更新示例：**

输入：
```
【当前用户压缩上下文】
用户是一位有6个月力量训练经验的健身者，目标增肌。训练以深蹲、卧推、硬拉为主。
近3个月深蹲从80kg进步到100kg，卧推从60kg进步到75kg。

【本次对话信息】
用户：2026年4月25日深蹲120kg 5组8个
AI：已记录！深蹲重量又创新高了！
```

输出：
```
用户是一位有6个月力量训练经验的健身者，目标增肌。训练以深蹲、卧推、硬拉为主。
近3个月深蹲从80kg进步到120kg（+50%），卧推从60kg进步到75kg（+25%）。
训练频率稳定在每周4次。最近一次训练是4月25日的深蹲120kg 5x8。
```

## 初始压缩上下文生成

首次生成时没有历史上下文，需要全量拉取数据：

```javascript
async function generateInitialContext(userId) {
  const profile = await userRepository.findById(userId);
  const workouts = await workoutRepository.findRecent(userId, 90);
  const measurements = await workoutRepository.findRecent(userId, 90);
  const activePlan = await planRepository.findActive(userId);

  const prompt = `根据以下用户数据，生成一段简洁的用户背景描述（100-200字）：
  ${JSON.stringify({ profile, workouts, measurements, activePlan })}
  重点描述：训练经验、目标、训练频率、主要动作及重量趋势、体型数据。`;

  const response = await model.invoke([new HumanMessage(prompt)]);
  return response.content;
}
```

## 错误处理

1. **用户上下文不存在** - `getOrCreateContext()` 自动创建并触发初始生成
2. **AI 生成总结失败** - 使用上一次成功的总结，异步更新失败不影响主流程
3. **并发更新冲突** - 使用内存锁 `locks` 保证同一用户串行更新
4. **初始上下文生成中** - 此时 `context_text` 为空，AI 对话仍可正常进行，只是没有背景信息

## 测试要点

1. 对话功能正常（不报 403/500 错误）
2. 用户上下文正确注入到 AI prompt
3. 历史消息正确保存和加载
4. 压缩上下文每次对话后更新
5. 新增记录后上下文能反映变化
