# Sprint 1 / Task 6：移除未用依赖 @langchain/anthropic

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 卸载 `backend/package.json` 中已安装但完全未使用的 `@langchain/anthropic`，减少依赖体积、消除供应链攻击面、避免 `npm audit` 噪音。

**Architecture:** `package.json:21` 含 `"@langchain/anthropic": "^1.3.29"`，但 `backend/src/` 下没有任何 import 引用。本任务做"再次确认 + 卸载 + lockfile 同步"。

**Tech Stack:** npm, package.json

**对应缺口:** G6 (Master Roadmap)

---

## 文件结构

```
backend/
├── package.json          # 修改：删除 @langchain/anthropic
└── package-lock.json     # 自动更新
```

---

## 步骤

### 步骤 1: 切分支

- [ ] **Step 1**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git checkout master
git pull
git checkout -b sprint1/task6-remove-unused-deps
```

---

### 步骤 2: 二次确认无引用

- [ ] **Step 2: 全仓搜索**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
grep -rn "@langchain/anthropic\|langchain_anthropic" \
  --include="*.ts" --include="*.tsx" --include="*.js" --include="*.json" \
  backend/ frontend/ fitlc-mini/ 2>/dev/null
```

期望：仅命中 `backend/package.json` 和 `backend/package-lock.json`，其他文件无任何引用。

> 如果在 ts/js 中发现引用，立刻停止本任务，把它的来龙去脉查清楚（是否未来计划用？是否实验残留？）再决定是删还是保留并真正接入。

---

### 步骤 3: 卸载依赖

- [ ] **Step 3**

```bash
cd /Users/eatong/eaTong_projects/fit_lc/backend
npm uninstall @langchain/anthropic
```

期望：`package.json` 中的依赖项被删除；`package-lock.json` 同步更新；node_modules 下相关包被移除。

---

### 步骤 4: 跑 TypeScript 编译

- [ ] **Step 4**

```bash
cd backend
npm run build
```

期望：构建成功。

---

### 步骤 5: 跑全量测试

- [ ] **Step 5**

```bash
cd backend
npm test
```

期望：所有测试通过。

---

### 步骤 6: 确认 package.json 干净

- [ ] **Step 6**

```bash
cd backend
grep "@langchain/anthropic" package.json
echo "exit: $?"
```

期望：grep 无输出，`exit: 1`（表示未命中）。

---

### 步骤 7: Commit

- [ ] **Step 7**

```bash
cd /Users/eatong/eaTong_projects/fit_lc
git add backend/package.json backend/package-lock.json
git commit -m "chore(deps): remove unused @langchain/anthropic

- No imports found in backend/src/ — never wired up
- Reduces install size and supply-chain attack surface
- Will be re-added in S5/S6 if/when we wire Anthropic as a real provider

Fixes G6 (Master Roadmap)
Refs: docs/superpowers/plans/2026-06-14-sprint1-task6-remove-unused-deps.md"
```

---

## 验收

- [x] `grep '"@langchain/anthropic"' backend/package.json` 无输出
- [x] `npm run build` 成功
- [x] `npm test` 全部通过
- [x] `ls backend/node_modules/@langchain/` 不含 `anthropic`
