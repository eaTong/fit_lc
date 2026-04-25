# Task Plan: 动作库和肌肉库实施

**Goal:** 完成肌肉层级数据初始化和动作库基础数据建设

**Current Phase:** Phase 5 (管理界面 - 肌肉管理页面)

---

## Phases

### Phase 1: Prisma Schema 更新
- [x] 在 Prisma schema 中添加 muscles、exercises、exercise_muscles 模型
- [x] 生成 Prisma Client
- [x] 创建 migration
- **Status:** complete

### Phase 2: 肌肉数据初始化
- [x] 设计肌肉层级数据（6肌肉群 + 20主肌肉）
- [x] 创建 seed 脚本 `scripts/seed-muscles.sql`
- [x] 执行 seed 并验证数据正确性
- **Status:** complete

### Phase 3: 动作数据设计
- [ ] 定义动作数据模型和格式
- [ ] 规划动作覆盖范围（按肌肉群分配）
- [ ] 设计 seed 数据结构
- **Status:** pending

### Phase 4: 动作数据生成与导入
- [ ] 生成动作 seed 数据（每个主肌肉 5-8 个动作）
- [ ] 创建动作 seed 脚本
- [ ] 验证动作-肌肉关联
- **Status:** pending

### Phase 5: 管理界面
- [x] 肌肉管理页面（查看层级树、新增/编辑）
- [x] 动作管理页面（列表筛选、新增/编辑、审核）
- **Status:** complete

---

## Key Questions

1. 动作数据如何生成？AI 生成后人工审核，还是直接手工录入？
2. seed 数据是放入 SQL 文件还是独立 JSON/JS 文件？
3. 管理界面优先级：肌肉管理 vs 动作管理，哪个更迫切？

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| 肌肉层级：两层结构 | design spec 已定义，肌肉群(level 1) → 主肌肉(level 2) |
| 动作关联到 level 2 主肌肉 | 支持主要/辅助肌肉区分 |
| status draft/published 审核流程 | 支持 AI 生成 + 人工审核 |

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| - | - | - |