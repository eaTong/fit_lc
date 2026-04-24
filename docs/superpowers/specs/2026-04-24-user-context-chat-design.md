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
- `getUserContext(userId)` - 获取用户上下文用于注入 prompt
- `refreshContext(userId)` - 调用 AI 生成新压缩总结
- `appendMessageAndRefreshContext(userId, role, content, savedData)` - 保存消息并刷新上下文

**`src/services/chatHistoryService.js`**
- `saveMessage(userId, role, content, savedData)` - 保存单条消息
- `getMessages(userId, limit)` - 获取消息历史

### 3. 修改现有代码

**`src/agents/fitnessAgent.js`**
- 修改 `runAgent(userId, message)` 返回完整的消息对象
- 保持工具调用逻辑不变

**`src/routes/chat.js`**
```javascript
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    // 1. 获取用户上下文
    const userContext = await userContextService.getUserContext(userId);

    // 2. 注入上下文调用 AI
    const { reply, savedData } = await runAgent(userId, message, userContext);

    // 3. 异步保存消息并更新上下文（不阻塞响应）
    setImmediate(() => {
      chatHistoryService.saveMessage(userId, 'user', message);
      chatHistoryService.saveMessage(userId, 'assistant', reply, savedData);
      userContextService.refreshContext(userId);
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
${userContext.context_text}

【当前状态】
- 健身目标：${profile.goal}
- 健身经验：${profile.experience}
- 训练频率：每周${profile.frequency}次
- 当前体重：${profile.body_weight}kg
- 当前计划：${planName}（${planStatus}）
```

`context_text` 示例（AI 生成）：
```
用户是一位有6个月力量训练经验的健身者，目标增肌，每周训练4次。
训练以深蹲、卧推、硬拉三大项为主。近3个月深蹲从80kg进步到100kg（+25%），
卧推从60kg进步到75kg（+25%），硬拉从100kg进步到120kg（+20%）。
训练频率稳定，每周深蹲和卧推各2次，硬拉1次。最近一次训练是4月24日的深蹲100kg 5x8。
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

1. **每次对话后** - `chatHistoryService.saveMessage()` 之后异步调用 `userContextService.refreshContext()`
2. **用户保存新记录后** - `saveWorkout` 或 `saveMeasurement` 工具执行后

## 压缩上下文生成逻辑

```javascript
async function generateContextText(userId) {
  // 1. 获取用户 profile
  const profile = await userRepository.findById(userId);

  // 2. 获取最近训练历史（近3个月）
  const workouts = await workoutRepository.findRecent(userId, 90);
  const measurements = await measurementRepository.findRecent(userId, 90);

  // 3. 获取当前活跃计划
  const activePlan = await planRepository.findActive(userId);

  // 4. 组装数据调用 AI 生成总结
  const prompt = `根据以下用户数据，生成一段简洁的用户背景描述（100-200字）：
  ${JSON.stringify({ profile, workouts, measurements, activePlan })}
  重点描述：训练经验、目标、训练频率、主要动作及重量趋势、体型数据。`;

  const response = await model.invoke([new HumanMessage(prompt)]);
  return response.content;
}
```

## 错误处理

1. **用户上下文不存在** - 首次对话时自动创建空的 user_contexts
2. **AI 生成总结失败** - 使用上一次成功的总结，不阻塞用户
3. **异步更新失败** - 不影响主流程，下次对话时重试

## 测试要点

1. 对话功能正常（不报 403/500 错误）
2. 用户上下文正确注入到 AI prompt
3. 历史消息正确保存和加载
4. 压缩上下文每次对话后更新
5. 新增记录后上下文能反映变化
