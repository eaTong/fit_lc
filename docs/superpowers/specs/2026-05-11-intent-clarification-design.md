# 意图澄清机制优化 - 设计文档

## 1. 概述

### 背景
当前 AI Agent 在处理用户健身记录时，当用户输入信息不完整（如"卧推80公斤"缺少组数次数），系统会尝试执行工具，验证失败后返回错误，导致：
1. 用户需要完整重复输入
2. 交互体验差
3. 容易造成信息丢失

### 目标
建立统一的 Clarification Manager 框架，实现：
- 意图识别后自动检测信息完整性
- 信息不完整时生成自然语言追问
- 携带已解析信息，避免用户重复输入
- 多轮澄清支持

## 2. 架构设计

### 新增文件结构
```
backend/src/agents/clarification/
├── ClarificationManager.ts   # 核心管理器
├── clarificationStore.ts     # 状态存储（内存）
├── types.ts                  # 类型定义
└── index.ts                 # 导出
```

### 核心流程
```
用户输入 → 意图识别 → 参数验证
                         ↓
              ┌─ 信息完整 → 执行工具
              │
              └─ 信息不完整 → 创建澄清会话 → 生成追问
                                              ↓
                              用户回复 → 合并上下文 → 重新验证
                                              ↓
                                      执行工具 → 返回结果
```

## 3. 核心组件

### 3.1 ClarificationSession 类型
```typescript
interface ClarificationSession {
  id: string;                    // 唯一标识 (uuid)
  toolName: string;              // 待执行的工具名
  userId: number;
  status: 'pending' | 'in_progress' | 'completed' | 'expired';
  createdAt: number;
  expiresAt: number;            // TTL: 5分钟

  partialInput: Record<string, any>;  // 已解析的字段
  missingFields: MissingField[];     // 缺失字段

  originalContext: {
    userMessage: string;
    llmInterpretation: string;
  };
}
```

### 3.2 ClarificationManager

**核心方法：**

| 方法 | 职责 |
|------|------|
| `createSession()` | 创建澄清会话，存储 partialInput 和 missingFields |
| `generatePrompt()` | 生成 LLM 追问提示词 |
| `completeSession()` | 合并用户补充的信息，返回完整输入 |
| `getActiveSession()` | 获取用户进行中的澄清会话 |
| `expireSession()` | 标记会话过期 |

### 3.3 clarificationStore

- 使用内存 Map 存储 (`Map<userId, ClarificationSession>`)
- TTL 5分钟自动清理
- 同一用户同时只允许一个澄清会话

## 4. 澄清与 Fallback 的协作

澄清机制与 Fallback Handler 的职责分工：

| 场景 | 处理方式 |
|------|----------|
| LLM 完全未调用工具 | Fallback Handler 正则解析（原有逻辑） |
| LLM 调用工具但参数不完整 | Clarification Manager 澄清流程（新增） |

**执行顺序**：
1. 检查 active session → 合并上下文
2. LLM 调用 → 工具验证
3. 验证失败且有 active session → 澄清流程
4. 验证失败且无 active session → Fallback 正则解析
5. 无工具调用 → Fallback 正则解析

## 5. Session 存储设计

澄清 session 绑定到用户级别，不绑定聊天会话：
```
clarification_store: Map<userId, ClarificationSession>
```

**设计决策**：
- 同一用户同时只允许一个澄清会话
- Session 存储在内存中，服务重启会丢失
- TTL 5分钟，超时自动清理

**为什么不绑定 chatSessionId？**
- 聊天会话可能跨多个 HTTP 请求
- 用户可能在任何时刻回复澄清
- 简单起见，同一用户共享一个 pending 状态

## 6. parseUserInput 实现

用户回复澄清后，需要从消息中提取补充的参数。使用 `fallbackHandler.tryParseWorkout()` 的解析逻辑，但做以下适配：

```typescript
async function extractClarification补充(
  message: string, 
  missingFields: MissingField[],
  partialInput: Record<string, any>
): Promise<Record<string, any>> {
  // 1. 尝试正则解析
  const workout = await tryParseWorkout(message, userId);
  
  // 2. 只提取 missingFields 中定义的字段
  if (workout?.exercises?.[0]) {
    const exercise = workout.exercises[0];
    const supplemented = { ...partialInput };
    
    if (missingFields.some(f => f.field.includes('sets')) && exercise.sets) {
      supplemented.sets = exercise.sets;
    }
    if (missingFields.some(f => f.field.includes('reps')) && exercise.reps) {
      supplemented.reps = exercise.reps;
    }
    // ... 其他字段
    
    return supplemented;
  }
  
  return {};
}
```

**特殊处理**：
- 如果缺失字段是 `sets/reps`（组合字段），从用户回复中整体提取
- 如果用户只回复数字（如"5组"），默认解析为 sets，假设每组10次（或询问）

## 7. 生成追问的策略

生成追问有两种策略：

| 策略 | 场景 | 优点 | 缺点 |
|------|------|------|------|
| **模板+插值** | 简单缺失 | 快速、无额外 LLM 调用 | 不够自然 |
| **LLM 生成** | 复杂场景 | 自然、上下文相关 | 增加延迟和成本 |

**默认策略**：模板插值，复杂时降级到 LLM

**模板示例**：
```
模板: "{partial_info}，请补充：{missing_labels}"
输入: partial_info="卧推80kg"，missing_labels="组数、每组次数"
输出: "卧推80kg，很棒！请问一共几组，每组几次？"
```

## 8. 交互流程

### 8.1 首次输入不完整

**用户**: "卧推80公斤"

**系统流程**:
1. LLM 识别意图 → 调用 save_workout({ name: "卧推", weight: 80 })
2. validateWorkoutInput 检测缺少 sets/reps
3. ClarificationManager.createSession() 创建会话
4. 生成追问: "卧推80kg，很棒！请问一共几组，每组几次？"
5. 返回追问给用户

### 8.2 用户回复澄清

**用户**: "5组每组8个"

**系统流程**:
1. 检测到 active session（userId 匹配）
2. extractClarification补充() 解析用户回复 → { sets: 5, reps: 8 }
3. ClarificationManager.completeSession() 合并 → { name: "卧推", weight: 80, sets: 5, reps: 8 }
4. 重新验证通过
5. 执行 save_workout
6. 返回成功结果

### 8.3 澄清超时

**用户**: （5分钟后回复）"5组每组8个"

**系统流程**:
1. getActiveSession() 返回 null（已过期）
2. 视为普通用户输入，走正常 LLM 流程
3. LLM 可能再次识别为 save_workout，再次进入澄清流程
4. 返回: "抱歉，之前的对话已过期，请重新描述训练信息"

## 9. 澄清循环终止

最多3次澄清后仍不完整时，停止追问：

```
clarificationLoopCount++ 
if (clarificationLoopCount >= 3) {
  return {
    reply: "抱歉，信息仍不完整。您可以：\n1. 重新完整描述训练\n2. 告诉我要跳过记录",
    toolData: null,
    clarificationEnded: true
  }
}
```

用户可选择：
- 重新完整描述（重启澄清流程）
- 告诉 AI "跳过"（放弃本次记录）

## 10. 错误处理

| 场景 | 处理 |
|------|------|
| 澄清超时（5分钟） | 返回"抱歉，之前的对话已过期，请重新描述" |
| 同一用户多个澄清请求 | 拒绝新的请求，返回当前进行中的澄清状态 |
| 澄清后仍不完整 | 再次创建会话（最多3次循环） |
| 服务重启 | 内存存储丢失，用户需重新开始澄清 |
| LLM 生成追问失败 | 降级到模板插值策略 |

## 11. 风险与限制

- **内存存储**: 服务重启后澄清状态丢失，用户需重新描述
- **最多3次澄清**: 防止无限循环
- **TTL 5分钟**: 长时间不回复自动过期
- **额外 LLM 调用**: 生成追问会增加少量延迟（可降级到模板）

## 12. 验收标准

- [ ] 用户输入"卧推80公斤"能正确追问
- [ ] 用户回复"5组每组8个"后能正确合并并执行
- [ ] 澄清超时后用户可重新开始
- [ ] 不影响正常的完整信息输入场景
- [ ] 多轮澄清（最多3次）后给出明确终止信息
