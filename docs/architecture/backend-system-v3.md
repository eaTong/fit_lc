# 七练后端系统架构 (当前版本 v3.0)

> **日期：** 2026-06-15
> **状态：** Master 已合并 Sprint 1-7 全部工作
> **对应代码：** master (ahead of origin: 70 commits)

---

## 1. 系统总览

```
┌──────────────────────────────────────────────────────┐
│                     客户端                            │
│  Web (React/Vite)  +  小程序 (WxApp)  +  Admin      │
└────────────────────────┬─────────────────────────────┘
                         │ HTTPS / JWT
                         ▼
┌──────────────────────────────────────────────────────┐
│              Express.js (Node.js)                     │
│  ┌────────────────────────────────────────────────┐  │
│  │  Middleware: auth.ts | rate-limit | cors       │  │
│  ├────────────────────────────────────────────────┤  │
│  │  Routes (12 路由)                              │  │
│  │  - /api/auth/*        - /api/chat/*            │  │
│  │  - /api/chat/stream   - /api/records/*         │  │
│  │  - /api/plans/*       - /api/exercises/*       │  │
│  │  - /api/muscles/*     - /api/admin/*           │  │
│  └────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Services    │  │  Agents      │  │  Tools       │
│              │  │              │  │              │
│ - chat       │  │ - V2 (legacy)│  │ - saveWorkout│
│ - plans      │  │ - V3         │  │ - saveMeasur │
│ - records    │  │   (LangGraph)│  │ - query*     │
│ - userCtx    │  │              │  │ - generatePlan│
│              │  │              │  │ - analyzeExec│
└──────────────┘  └──────────────┘  └──────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Memory      │  │  Security    │  │  Observability│
│              │  │              │  │              │
│ - recall     │  │ - classifier │  │ - Langfuse   │
│ - extract    │  │ - guardTool  │  │ - tracing    │
│ - store      │  │ - historyGd  │  │ - token/cost │
│              │  │ - sanitizExt │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  MySQL 8 (via Prisma)  │
            └────────────────────────┘
```

---

## 2. AI Agent 体系

### 2.1 双版本 Agent

| 版本 | 文件 | 状态 | 触发条件 |
|------|------|------|---------|
| **V2** | `fitnessAgentV2.ts` | 稳定主用 | 默认 |
| **V3** | `v3/graph.ts` (LangGraph) | 灰度中 | `FF_USE_V3=true` |

### 2.2 V2 Agent 流程（当前生产）

```
用户消息 → /chat/message 路由
    ↓
[1] L1 输入分类器 (glm-4-flash)
    ├─ malicious → 拒绝 (HTTP 200)
    ├─ suspicious → 注入 securityHint
    └─ benign → 继续
    ↓
[2] 历史窗口守卫
    └─ max 20 msgs / 8000 tokens + sanitize
    ↓
[3] Vision 预处理 (Zhipu GLM-4V-Flash)
    ├─ 成功 → 注入【图片解析结果】XML
    └─ 失败 → 降级到文本 (Sprint 1 T3)
    ↓
[4] 历史压缩 + 澄清会话检查
    ↓
[5] Memory 召回 (Sprint 7)
    └─ Top-K 相关记忆注入 prompt
    ↓
[6] 构建 system prompt
    ├─ AI 私教人设
    ├─ 外部内容防御约定 (XML 包裹)
    ├─ 用户背景 + 长期记忆
    └─ 当前轮次安全提示
    ↓
[7] 第一次 LLM 调用 (LLM 决策)
    ├─ 调用工具
    └─ 直接回复
    ↓
[8] 工具执行
    ├─ L3 工具白名单校验
    ├─ 参数范围校验 (zod)
    └─ 实际执行
    ↓
[9] 第二次 LLM 调用 (生成最终回复)
    ↓
[10] L4 Markdown 过滤
    └─ 外链/图片安全
    ↓
[11] 返回客户端 + 保存到 DB
    ↓
[12] 后台异步抽取记忆 (Sprint 7)
    └─ fire-and-forget
```

### 2.3 V3 Agent (LangGraph StateGraph)

```
START → vision → llmCall → (条件)
                          ├─ 有 tool → toolDispatch → finalReply → END
                          └─ 无 tool → finalReply → END

特性：
- Checkpoint (MemorySaver)
- HITL (interrupt) — save 类工具需用户确认
- 可灰度切换 (FF_USE_V3)
```

---

## 3. 6 层 Prompt Injection 防御

| 层 | 模块 | 作用 |
|----|------|------|
| **L1** | `injectionClassifier.ts` | glm-4-flash 分类 benign/suspicious/malicious |
| **L2** | `sanitizeExternalContent.ts` | XML 标签包裹 + 30+ 指令短语中和 |
| **L3** | `toolGuard.ts` | 角色白名单 + zod 参数范围 |
| **L4** | `outputSanitizer.ts` | 输出 Markdown 外链/图片过滤 |
| **L5** | `historyGuard.ts` | 20 msgs / 8000 tokens 切窗 |
| **CI** | `red-team.yml` | 红队评测阻断 PR (>5% 攻击成功率) |

---

## 4. Memory 系统

```
用户对话
    ↓
extractMemory()  (异步 fire-and-forget)
    ↓
LLM 抽取 (episodic / semantic / procedural)
    ↓
MySQL `user_memory` 表
    ↓
recallMemory(userId, query) — Top-K by importance
    ↓
buildMemoryContext() — 渲染到 system prompt
```

| Memory 类型 | 示例 |
|-------------|------|
| episodic | "上周膝盖受伤了" |
| semantic | "我不能做深蹲" |
| procedural | "我习惯早上训练" |

---

## 5. Observability 体系

### 5.1 Langfuse (已集成)

- `getLangfuse()` — 单例，无配置自动 noop
- `createTraceCallbacks()` — CallbackHandler 注入 LangChain
- 自动捕获：trace / token / cost
- SIGTERM/SIGINT flush hook

### 5.2 评估体系 (Sprint 2)

- 工具真单测 + SQLite
- CI 门禁：`llm-eval.yml` 阻断 < 80% pass rate

---

## 6. SSE 流式输出 (Sprint 4)

```
客户端 ──HTTP/POST /chat/stream──> Express
                                       │
                            setupSSEResponse()
                                       │
                  for await event in runAgentV2Stream()
                                       │
                            sendSSEEvent(res, event)
                                       │
                                       ▼
客户端 接收 SSE events:
  - { type: 'start' }
  - { type: 'vision_start' }
  - { type: 'thinking' }
  - { type: 'token', delta: '...' }
  - { type: 'tool_call', tool: '...' }
  - { type: 'tool_result', ... }
  - { type: 'final', toolData: ... }
  - { type: 'done' }
```

**支持客户端：**
- Web：EventSource API
- 小程序：`wx.request` + `enableChunked: true`

---

## 7. 工具集 (7 个 Tool)

| Tool | dataType | 输入校验 | 幂等性 |
|------|----------|----------|--------|
| saveWorkout | workout | zod + toolGuard | ✅ idempotencyKey |
| saveMeasurement | measurement | zod + toolGuard | ✅ idempotencyKey |
| queryWorkout | workout_query | zod | N/A |
| queryMeasurement | measurement_query | zod | N/A |
| generatePlan | plan | zod | LLM 化 (Sprint 7) |
| adjustPlan | plan_adjustment | zod | N/A |
| analyzeExecution | execution_analysis | zod | N/A |

**generatePlan 流程：**
```
用户请求生成计划
    ↓
1. recallMemory (Sprint 7) — 获取偏好/伤病
    ↓
2. planLLMService.generatePlanLLM()
    ├─ 成功 → zod 校验 → 保存计划
    └─ 失败 → 规则引擎 fallback
```

---

## 8. 关键配置 (env vars)

```bash
# AI Provider
AI_PROVIDER=minimax
MINIMAX_API_KEY=...
MINIMAX_CHAT_MODEL=MiniMax-M3
MINIMAX_VISION_MODEL=MiniMax-VL-01

# Reasoning Model (Plan LLM)
REASONING_API_KEY=...
REASONING_MODEL=...
REASONING_BASE_URL=...

# Zhipu (Vision/Classifier)
ZHIPU_API_KEY=...
ZHIPU_CHAT_MODEL=glm-4-plus
ZHIPU_VISION_MODEL=glm-4v-flash

# Langfuse
LANGFUSE_ENABLED=true
LANGFUSE_PUBLIC_KEY=...
LANGFUSE_SECRET_KEY=...
LANGFUSE_HOST=...

# Feature Flags
FF_USE_V3=false
FF_V3_PERCENT=10
FF_ENABLE_HITL=false
```

---

## 9. 启动方式

```bash
cd backend

# 1. 安装依赖
npm install --legacy-peer-deps

# 2. 生成 Prisma Client
npx prisma generate

# 3. 启动 (开发模式)
npm run dev      # tsx watch

# 4. 启动 (生产模式)
npm run build    # tsc
npm start        # node dist/index.js

# 测试
npm test         # Jest
```

**入口：** `src/index.ts` — 监听 `:3000` (默认)

---

## 10. 部署 Checklist

- [ ] `npx prisma migrate dev --name add_idempotency_key` (Sprint 1)
- [ ] `npx prisma migrate dev --name add_user_memory` (Sprint 7)
- [ ] 设置所有 env vars
- [ ] Langfuse 账号 + API keys
- [ ] MySQL 8 数据库
- [ ] 测试 `/api-docs` Swagger UI

---

## 11. 已实现 Sprint 总览

| Sprint | 内容 | 关键文件 |
|--------|------|----------|
| **S1** | 止血 + 第一层防护 | `chatMiniMax.ts` (timeouts), `sanitizeExternalContent.ts`, `langfuse.ts` |
| **S2** | 可观测体系 | `prismaTestKit.ts`, `.github/workflows/llm-eval.yml` |
| **S3** | PI 6 层防御 | `security/{injectionClassifier,toolGuard,outputSanitizer,historyGuard}.ts` |
| **S4** | SSE 流式 | `fitnessAgentV2Stream.ts`, `utils/sse.ts`, `routes/chat.ts` |
| **S5** | 可靠性 | (未实现) |
| **S6** | LangGraph V3 | `v3/{graph,state,nodes/*,checkpointer}.ts` |
| **S7** | Memory + Plan LLM | `memory/*`, `services/planLLMService.ts` |

---

## 12. 待完成 (Sprint 5/8 等)

| Sprint | 内容 |
|--------|------|
| S5 | 可靠性升级 (zhipu fallback, multi-provider) |
| S8 | MCP + 多 Agent 协作 |
