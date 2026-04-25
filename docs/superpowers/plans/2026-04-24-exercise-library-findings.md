# Findings & Decisions

## Requirements
- 肌肉层级树：6 个肌肉群 → 主肌肉（两层结构）
- 动作库：100+ 动作，关联主要/辅助肌肉
- 支持动作变体、审核流程(draft/published)
- AI 生成计划时选择动作，用户 App 中选择动作记录训练

## Research Findings
- Prisma schema 中自关联 `parentId` 实现肌肉层级
- `exercise_muscles` 连接表记录动作-肌肉关联，role 区 primary/secondary
- 动作变体通过 `parentId` 自关联实现
- JSON 字段存储 tags（查询不频繁场景）

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| muscles.parentId 自关联 | 一个字段解决层级问题（肌肉群→主肌肉） |
| 动作-肌肉关联到 level 2 主肌肉 | 记录动作针对的主要和辅助肌肉 |
| 标签存储 JSON 数组 | 标签查询不频繁，JSON 足够 |
| 动作变体 parentId 自关联 | 一个字段区分变体归属 |
| 审核流程 status draft/published | 支持 AI 生成 + 人工审核流程 |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| - | - |

## Resources
- `docs/superpowers/specs/2026-04-24-exercise-library-design.md` - 设计规格
- `docs/superpowers/plans/2026-04-24-exercise-library-implementation-plan.md` - 实施计划

## Visual/Browser Findings
-