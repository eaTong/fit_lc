# Sprint 1 / Task 5：删除 V1 fitnessAgent

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 彻底删除已标记 `@deprecated` 的 `backend/src/agents/fitnessAgent.ts` 及其单测；确认无任何业务代码仍引用 V1；清掉 600+ 行 dead code 与额外的认知负担。

**Architecture:** V1 在 [fitnessAgent.ts:1-9](../../backend/src/agents/fitnessAgent.ts) 顶部已用 JSDoc 标 `@deprecated`，但文件仍在仓库中。`backend/src/routes/chat.ts:3` 已只引用 V2（`import { runAgentV2 as runAgent } from '../agents/fitnessAgentV2'`）。本任务做"确认 + 删除 + 清理引用"三步。

**Tech Stack:** TypeScript, Node.js

**对应缺口:** G5 (Master Roadmap)

---

## 文件结构

```
backend/
├── src/agents/fitnessAgent.ts                    # 删除
└── tests/backend/unit/agents/fitnessAgent.test.ts # 删除（如存在）
```

---

## 步骤

### 步骤 1: 切分支

- [ ] **Step 1**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git checkout master
git pull
git checkout -b sprint1/task5-remove-v1
```

---

### 步骤 2: 全仓搜索 V1 引用

- [ ] **Step 2: 找所有引用点**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
grep -rn "from .*fitnessAgent['\"]" --include="*.ts" --include="*.js" backend/
grep -rn "import.*fitnessAgent[^V]" --include="*.ts" --include="*.js" backend/
grep -rn "require.*fitnessAgent[^V]" --include="*.ts" --include="*.js" backend/
```

期望：除了：
- `backend/src/agents/fitnessAgent.ts` 自身
- `backend/tests/backend/unit/agents/fitnessAgent.test.ts`（如存在）

之外，无任何业务代码引用 V1。

如果发现新引用（除上述两个文件），先把它们改成 V2，然后再继续；否则删除会破坏构建。

---

### 步骤 3: 检查 fitnessAgent.test.ts 是否在测 V1 独有逻辑

- [ ] **Step 3: 检查测试覆盖**

```bash
cat backend/tests/backend/unit/agents/fitnessAgent.test.ts 2>/dev/null | head -50
```

如果文件存在，决策：
- 测试只覆盖 V1 行为 → 一并删除
- 测试覆盖某些 V2 也有的通用行为 → 把这些 case 迁移到 `fitnessAgentV2.test.ts`

> 实际项目中 V1 测试已经 mock 了 LLM 等依赖（详见 review 报告），其覆盖度也仅是 11 个 case 的骨架测试，没有不可替代的内容。直接删除即可。

---

### 步骤 4: 删除 V1 文件

- [ ] **Step 4**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git rm backend/src/agents/fitnessAgent.ts
git rm backend/tests/backend/unit/agents/fitnessAgent.test.ts 2>/dev/null || true
```

期望：第一个命令一定成功；第二个命令如果文件不存在则忽略错误。

---

### 步骤 5: 跑 TypeScript 编译

- [ ] **Step 5: 验证无残留引用**

```bash
cd backend
npm run build
```

期望：构建成功，无 "Cannot find module './agents/fitnessAgent'" 类错误。

如果有错误：根据错误信息修正引用，把它们改为 V2 等价 API。

---

### 步骤 6: 跑全量测试

- [ ] **Step 6**

```bash
cd backend
npm test
```

期望：所有测试通过。如果有测试 import 了被删的文件，删除/迁移它们。

---

### 步骤 7: 全仓再次搜索确认

- [ ] **Step 7**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
grep -rn "fitnessAgent[^V]" --include="*.ts" --include="*.js" backend/src/ backend/tests/
```

期望：无输出（或仅命中字符串/注释，不命中 import）。

---

### 步骤 8: 更新文档

- [ ] **Step 8: 清理过期引用**

Modify: `CLAUDE.md` —— 检查"Agent 架构"章节是否还提到 V1，若有则删除。

Modify: `docs/PRD.md` —— 同样检查"AI Agent"章节。

```bash
cd /Users/eatong/eaTong_projects/fit_lc
grep -n "fitnessAgent[^V]" CLAUDE.md docs/PRD.md docs/PRD-planning.md 2>/dev/null
```

针对每条命中，确认是否仍指向 V1 — 如果是，删除或改为 V2。

---

### 步骤 9: Commit

- [ ] **Step 9**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add -A
git commit -m "chore(agent): remove deprecated V1 fitnessAgent

- Delete backend/src/agents/fitnessAgent.ts (600+ lines dead code)
- Delete fitnessAgent.test.ts (covered by V2 tests)
- Confirm no remaining imports
- Clean up doc references in CLAUDE.md / PRD

Fixes G5 (Master Roadmap)
Refs: docs/superpowers/plans/2026-06-14-sprint1-task5-remove-v1.md"
```

---

## 验收

- [x] `backend/src/agents/fitnessAgent.ts` 不存在
- [x] `npm run build` 成功
- [x] `npm test` 全部通过
- [x] `grep -rn "fitnessAgent[^V]" backend/src/` 无业务代码命中
- [x] CLAUDE.md / PRD.md 无残留 V1 描述
