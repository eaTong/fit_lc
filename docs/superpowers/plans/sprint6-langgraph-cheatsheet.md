# LangGraph Cheat Sheet

> Sprint 6 团队最佳实践

## 1. 状态定义

```typescript
import { z } from 'zod';

const AgentState = z.object({
  messages: z.array(z.any()).default([]),
  toolCalls: z.array(z.any()).default([]),
  finalReply: z.string().optional(),
  // ...
});
```

## 2. StateGraph

```typescript
import { StateGraph, START, END } from '@langchain/langgraph';

const workflow = new StateGraph(AgentState)
  .addNode('nodeName', nodeFunction)
  .addEdge(START, 'nodeName')
  .addEdge('nodeName', END)
  .addConditionalEdges('nodeA', conditionFn, { 'resultA': 'nodeB' });
```

## 3. 节点函数

```typescript
function nodeName(state: AgentState): Partial<AgentState> {
  // 返回要更新的字段
  return { messages: [...state.messages, 'new'] };
}
```

## 4. 条件边

```typescript
function shouldCallTool(state: AgentState): 'tools' | 'reply' {
  return state.messages.some(m => m.tool_calls?.length) ? 'tools' : 'reply';
}

workflow.addConditionalEdges('model', shouldCallTool, {
  'tools': 'tools',
  'reply': 'reply'
});
```

## 5. Checkpoint 持久化

```typescript
import { MemorySaver } from '@langchain/langgraph/checkpointer';

const checkpointer = new MemorySaver();
const graph = workflow.compile({ checkpointer });

// 带状态恢复
const config = { configurable: { thread_id: 'user-123' } };
const result = await graph.invoke(input, config);
```

## 6. Streaming

```typescript
// streamMode: 'values' | 'updates' | 'messages'
for await (const chunk of graph.stream(input, { streamMode: 'values' })) {
  console.log(chunk);
}
```

## 7. HITL (Human-in-the-Loop)

```typescript
import { interrupt } from '@langchain/langgraph';

function shouldInterrupt(state: AgentState): boolean {
  if (state.needsApproval) {
    return interrupt('Approve this action?');
  }
  return false;
}

// 恢复执行
await graph.invoke(Command(resume='approved'));
```

## 8. 本项目集成思路

- **状态**：复用现有 `userId`, `message`, `history`, `toolData`
- **节点**：vision → compress → clarify → llmCall → toolDispatch → validate → finalReply
- **边**：条件边处理 tool 调用决策 + 失败重试
- **Checkpoint**：复用 Prisma 已有表或新建

## 9. API 对比

| V2 手写 | V3 LangGraph |
|--------|--------------|
| `await model.invoke()` | `graph.invoke()` |
| 手动流程控制 | 状态机自动路由 |
| 无状态持久化 | Checkpoint 恢复 |
| 无循环支持 | 条件边循环 |
| 无 HITL | `interrupt()` |

## 10. 依赖

```bash
npm install @langchain/langgraph
```