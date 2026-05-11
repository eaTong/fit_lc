# FitLC 健身计划 2.0 设计方案

**日期：** 2026-05-12
**状态：** 待审核
**版本：** 2.0

## 1. 概述

### 项目目标
优化 FitLC 健身计划生成与执行追踪系统，实现：
- 用户操作简单直观
- 多入口支持（AI 对话 + 手动表单）
- 计划执行可视化追踪
- 灵活的重量/组数预设

### 核心功能
1. 三步问卷式计划生成（简化操作）
2. AI 对话生成（混合模式）
3. 执行打卡与进度追踪
4. 数据可视化仪表盘

---

## 2. 设计理念

**双入口 + 统一服务**

```
┌─────────────────────────────────────────────────────────┐
│                    用户                                │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
   ┌─────────────┐                 ┌─────────────┐
   │  AI 对话入口  │                 │  手动表单入口  │
   │  /chat      │                 │  /plans/new │
   └─────────────┘                 └─────────────┘
          │                               │
          └───────────────┬───────────────┘
                          ▼
              ┌─────────────────────┐
              │    统一计划服务       │
              │   PlanService       │
              │  (共享业务逻辑)       │
              └─────────────────────┘
```

**优势：**
- AI 生成和手动表单复用同一逻辑
- 计划数据结构完全一致
- 维护成本低，后续迭代统一

---

## 3. 数据模型

### 3.1 扩展 plan_exercises 表

```prisma
model PlanExercise {
  id           Int      @id @default(autoincrement())
  planId       Int      @map("plan_id")
  dayOfWeek    Int      @map("day_of_week")  // 1-7
  exerciseId   Int?     @map("exercise_id")
  exerciseName String   @map("exercise_name") @db.VarChar(100)
  targetMuscles String? @map("target_muscles") @db.VarChar(100)

  // 用户预设值（执行时可覆盖）
  targetSets   Int      @default(3)  @map("target_sets")
  targetReps   String   @db.VarChar(20)  @map("target_reps")  // 如 "8-12"
  targetWeight Decimal? @db.Decimal(5,2) @map("target_weight")
  targetDuration Int?   @map("target_duration")
  restSeconds  Int      @default(60) @map("rest_seconds")

  orderIndex   Int      @default(0) @map("order_index")
  createdAt    DateTime @default(now()) @map("created_at")

  plan       WorkoutPlan     @relation(fields: [planId], references: [id], onDelete: Cascade)
  exercise   Exercise?       @relation(fields: [exerciseId], references: [id])
  executions PlanExecution[]

  @@index([planId])
  @@map("plan_exercises")
}
```

### 3.2 PlanExecution 扩展

```prisma
model PlanExecution {
  id              Int       @id @default(autoincrement())
  planId          Int       @map("plan_id")
  planExerciseId  Int       @map("plan_exercise_id")
  scheduledDate   DateTime  @map("scheduled_date") @db.Date
  completedAt     DateTime? @map("completed_at")
  completedReps   Int?       @map("completed_reps")
  completedWeight Decimal?   @map("completed_weight") @db.Decimal(5, 2)
  status          String    @db.VarChar(20)  // pending | completed | skipped
  notes           String?   @db.Text
  createdAt       DateTime  @default(now()) @map("created_at")

  plan         WorkoutPlan  @relation(fields: [planId], references: [id])
  planExercise PlanExercise @relation(fields: [planExerciseId], references: [id])

  @@index([planId])
  @@index([scheduledDate])
  @@map("plan_executions")
}
```

---

## 4. AI 对话生成设计

### 4.1 混合模式交互流程

```
用户：我想增肌
AI：好的！为了给您生成个性化计划，请告诉我：
    1. 每周训练几次？（2-6次）
    2. 训练周期多长？（4-52周）
    3. 有哪些器械可用？（如哑铃、杠铃、跑步机）

用户：每周3次，12周，有哑铃和杠铃
AI：收到！还需要确认一下：
    - 您的身高体重？（便于计算合适的重量）
    - 有伤病或身体状况需要注意的吗？

用户：175cm，75kg，没有伤病
AI：正在为您生成增肌计划...

    ✅ 计划已生成！

    📋 12周增肌计划
    频率：每周3次
    训练日：周一/周三/周五

    周一 - 胸部+三头：
      • 杠铃卧推 4组 8-12次 60kg
      • 哑铃飞鸟 3组 12-15次 15kg
      • 绳索下压 3组 12次 25kg

    您可以：
    - 【查看详情】调整动作或重量
    - 【开始执行】今日即可开始
```

### 4.2 增强 generate_plan 工具

```typescript
schema: {
  userId: z.number(),
  user_profile: z.object({
    name: z.string().optional(),
    goal: z.enum(["bulk", "cut", "maintain"]),
    frequency: z.number().min(1).max(7),
    experience: z.enum(["beginner", "intermediate", "advanced"]),
    equipment: z.string(),
    conditions: z.string().optional(),
    body_weight: z.number(),
    body_fat: z.number().optional(),
    height: z.number(),
    duration_weeks: z.number().min(1).max(52),
  }),
  // 新增：预设动作列表（可选）
  preferredExercises: z.array(z.object({
    name: z.string(),
    targetSets: z.number().optional(),
    targetReps: z.string().optional(),
    targetWeight: z.number().optional(),
  })).optional()
}
```

### 4.3 AI 保存训练 → 计划执行自动同步

当用户在 AI 对话中保存训练记录时，系统自动检查是否有活跃计划需要同步：

**触发条件：**
- 用户通过 AI 对话保存了 workout（`save_workout` 工具执行成功）
- 用户有状态为 `active` 的计划
- 训练日期与计划的某训练日匹配

**同步逻辑：**

```typescript
interface WorkoutToExecutionSync {
  // 在 save_workout 工具执行后调用
  async syncWorkoutToPlanExecution(userId: number, workout: SavedWorkout): Promise<SyncResult> {
    // 1. 查找用户的活跃计划
    const activePlan = await planRepository.findActive(userId);
    if (!activePlan) return { synced: false, reason: 'no_active_plan' };

    // 2. 获取今日是星期几
    const today = new Date();
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

    // 3. 查找计划中该天的训练安排
    const planExercises = activePlan.exercises.filter(
      e => e.dayOfWeek === dayOfWeek
    );

    // 4. 匹配动作（模糊匹配动作名称）
    const matchedExecutions = [];
    for (const exercise of workout.exercises) {
      const matchedPlanExercise = planExercises.find(pe =>
        fuzzyMatch(pe.exerciseName, exercise.name)
      );

      if (matchedPlanExercise) {
        // 创建执行记录
        const execution = await planRepository.recordExecution({
          planId: activePlan.id,
          planExerciseId: matchedPlanExercise.id,
          scheduledDate: today.toISOString().split('T')[0],
          status: 'completed',
          completedReps: exercise.reps * exercise.sets,  // 总次数
          completedWeight: exercise.weight,
        });
        matchedExecutions.push(execution);
      }
    }

    return {
      synced: matchedExecutions.length > 0,
      matchedCount: matchedExecutions.length,
      planId: activePlan.id,
      executions: matchedExecutions
    };
  }
}
```

**同步时机：**
- 在 `save_workout` 工具执行成功后自动触发
- 无需用户额外操作
- 如果匹配到计划动作，AI 回复中增加提示："已同步到您的【增肌计划A】"

**AI 回复示例：**

```
✅ 训练记录已保存！

卧推 60kg 4×8
腿举 100kg 4×10

📋 已同步到您的【增肌计划A】- 周一训练
   • 杠铃卧推 ✓
   • 腿举 ✓

💡 继续保持！本周已完成 3/4 训练
```

**匹配规则：**
- 动作名称模糊匹配（支持同义词、简称）
- 例如："卧推" 匹配 "杠铃卧推"、"barbell bench press"
- 匹配阈值：Levenshtein 距离 ≤ 3 或包含相同关键词

**未匹配处理：**
- 如果今日计划没有对应动作，不影响正常保存
- AI 回复保持原样，不额外提示

---

## 5. 手动表单生成（三步问卷）

### Step 1：目标和周期

```
┌─────────────────────────────────────────────────────────┐
│  ← 返回          生成健身计划                    [1/3]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  选择您的训练目标                                        │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    💪      │  │    🔥      │  │    ⚖️      │     │
│  │   增肌     │  │   减脂     │  │   维持     │     │
│  │  +肌肉量   │  │  -体脂率   │  │  保持现状   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  计划周期                                               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │
│  │ 4周  │ │ 8周  │ │ 12周 │ │ 24周 │    ○ 其他         │
│  └──────┘ └──────┘ └──────┘ └──────┘                  │
│                                                         │
│                           [下一步 →]                   │
└─────────────────────────────────────────────────────────┘
```

### Step 2：训练频率和器械

```
┌─────────────────────────────────────────────────────────┐
│  ← 返回          生成健身计划                    [2/3]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  每周训练几次？                                          │
│                                                         │
│  ○ 2次    ○ 3次    ● 4次    ○ 5次    ○ 6次            │
│                                                         │
│  可用器械（多选）                                        │
│                                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│  │ ● 哑铃 │ │ ● 杠铃 │ │ ○ 龙门架│ │ ○ 器械 │         │
│  └────────┘ └────────┘ └────────┘ └────────┘         │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│  │ ○ 跑步机│ │ ○ 拉力带│ │ ○ 自重  │ │ ○ 其他 │         │
│  └────────┘ └────────┘ └────────┘ └────────┘         │
│                                                         │
│  训练经验                                               │
│  ○ 初学者    ● 中级    ○ 高级                          │
│                                                         │
│                           [下一步 →]                   │
└─────────────────────────────────────────────────────────┘
```

### Step 3：身体数据

```
┌─────────────────────────────────────────────────────────┐
│  ← 返回          生成健身计划                    [3/3]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  基本身体数据（帮助计算合适的重量）                      │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │ 身高 (cm)                    [ 175 ]     │           │
│  └─────────────────────────────────────────┘           │
│  ┌─────────────────────────────────────────┐           │
│  │ 体重 (kg)                    [ 75 ]     │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│  ▼ 更多选项（体脂率、伤病情况等）                        │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │ 体脂率 (%)                   [ 18 ]     │           │
│  └─────────────────────────────────────────┘           │
│  ┌─────────────────────────────────────────┐           │
│  │ 伤病/身体状况（可选）                     │           │
│  │ [ 无伤病                              ] │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│              [← 上一步]    [生成计划]                    │
└─────────────────────────────────────────────────────────┘
```

---

## 6. 执行打卡页面

### 6.1 今日训练打卡

```
┌─────────────────────────────────────────────────────────┐
│  ← 返回        今日训练：周一 - 胸部+三头         05/12 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │         ◯ 2/5 完成                      │           │
│  │        环形进度 40%                     │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│  周一训练安排                                            │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │ ✓  杠铃卧推                              │           │
│  │    目标: 4×8-12 @ 60kg                  │           │
│  │    ─────────────────────────────────    │           │
│  │    实际: 4×10 @ 62.5kg   [已完成后自动]  │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │ ○  哑铃飞鸟                              │           │
│  │    目标: 3×12-15 @ 15kg                 │           │
│  │    ─────────────────────────────────    │           │
│  │    组数: [3] 组  次数: [10] 次           │           │
│  │    重量: [____] kg                       │           │
│  │    [标记完成]                            │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│              [ 提交打卡 ]                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6.2 动作编辑弹窗

```
┌─────────────────────────────────────────────────────────┐
│  编辑动作 - 哑铃飞鸟                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  组数:  ○ 3  ● 4  ○ 5                                  │
│                                                         │
│  每组次数: [10] 次                                      │
│                                                         │
│  重量 (kg): [15] kg                                     │
│                                                         │
│       [ 取消 ]    [ 确认完成 ]                           │
└─────────────────────────────────────────────────────────┘
```

---

## 7. 统计仪表盘

### 7.1 计划详情页

```
┌─────────────────────────────────────────────────────────┐
│  ← 返回        增肌计划 A                         [活跃] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │  执行统计                    [日历视图]   │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │   12/18   │  │    67%    │  │   3天     │        │
│  │   已完成   │  │  完成率   │  │  连续打卡  │        │
│  └────────────┘  └────────────┘  └────────────┘        │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │          本周执行进度                    │           │
│  │                                       │           │
│  │  周一 ████████████░░░░ 完成 ✓         │           │
│  │  周二 ░░░░░░░░░░░░░░░░░░ 休息          │           │
│  │  周三 ████████████░░░░ 完成 ✓         │           │
│  │  周四 ░░░░░░░░░░░░░░░░░░ 休息          │           │
│  │  周五 ████████░░░░░░░░░ 跳过           │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │  AI 智能分析                             │           │
│  │                                         │           │
│  │  📊 最近两周执行率稳定在 85%             │           │
│  │  💡 建议：腿部训练重量可增加 2.5kg       │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│         [ 查看全部训练记录 ]    [ 调整计划 ]              │
└─────────────────────────────────────────────────────────┘
```

### 7.2 日历视图

```
┌─────────────────────────────────────────────────────────┐
│  2026年5月                                    [<][>]    │
├─────────────────────────────────────────────────────────┤
│  一  二  三  四  五  六  日                             │
├─────────────────────────────────────────────────────────┤
│  27  28  29  30   1   2   3                           │
│      ░   ░   ░                                      │
│  4   5   6   7   8   9  10                          │
│  ✓   ✓   ○   ░   ✓   ░   ○                          │
│  11  12  13  14  15  16  17                         │
│  ●   ○   ░   ✓   ●   ░   ○                          │
│  18  19  20  21  22  23  24                         │
├─────────────────────────────────────────────────────────┤
│  图例: ✓ 完成  ○ 未完成  ● 今天  ░ 休息                │
└─────────────────────────────────────────────────────────┘
```

---

## 8. 后端 API 设计

### 8.1 PlanService 核心方法

```typescript
interface PlanService {
  // 创建计划（AI 或手动表单共用）
  createPlan(userId: number, profile: UserProfile, exercises?: ExerciseInput[]): Promise<Plan>

  // 获取计划（含执行统计）
  getPlanWithStats(planId: number, userId: number): Promise<PlanWithStats>

  // 更新计划动作
  updatePlanExercise(exerciseId: number, updates: Partial<ExerciseInput>): Promise<void>

  // 批量打卡
  batchRecordExecution(planId: number, executions: ExecutionInput[]): Promise<ExecutionResult>

  // 获取执行分析
  getExecutionAnalysis(planId: number, userId: number): Promise<ExecutionAnalysis>

  // AI 保存训练后同步到计划执行（新增）
  syncWorkoutToPlanExecution(userId: number, workout: SavedWorkout): Promise<SyncResult>
}
```

### 8.2 新增 API 路由

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/plans/:id/stats` | 获取计划执行统计 |
| GET | `/plans/:id/calendar` | 获取日历视图数据 |
| DELETE | `/plans/:id/executions/:execId` | 删除执行记录 |
| POST | `/plans/sync-from-workout` | AI 保存训练后同步到计划执行（内部调用）|

### 8.3 响应结构

```typescript
interface PlanWithStats {
  plan: Plan;
  stats: {
    totalWorkouts: number;
    completedWorkouts: number;
    skippedWorkouts: number;
    completionRate: number;
    currentStreak: number;      // 连续打卡天数
    lastWorkoutDate: string;
  };
  weeklyProgress: WeekProgress[];
  aiSuggestions: string[];
}

interface WeekProgress {
  weekNumber: number;
  days: {
    dayOfWeek: number;
    status: 'completed' | 'skipped' | 'pending' | 'rest';
    completedExercises: number;
    totalExercises: number;
  }[];
}
```

---

## 9. 前端组件清单

| 组件 | 用途 | 类型 |
|------|------|------|
| `PlanWizard` | 三步问卷式表单 | 新增 |
| `PlanPreviewCard` | 计划预览/编辑 | 新增 |
| `ExerciseEditor` | 动作编辑弹窗 | 新增 |
| `ExecutionProgressRing` | 环形进度 | 新增 |
| `ExecutionCalendar` | 日历视图 | 新增 |
| `WeeklyProgressBar` | 周进度条 | 新增 |
| `PlanStatsCard` | 统计卡片（3个指标） | 新增 |
| `AISuggestionPanel` | AI 建议面板 | 新增 |
| `PlanForm` | 现有表单增强 | 改造 |
| `PlanExecute` | 执行打卡页增强 | 改造 |
| `Plans` | 计划列表页增强 | 改造 |

---

## 10. 实施优先级

### Phase 1：核心闭环（1-2周）
1. 改造 `PlanForm` → 三步问卷向导
2. 增强 `PlanExecute` → 可编辑重量的打卡页
3. 计划列表页增加统计概览
4. **新增 save_workout 后同步到活跃计划**

### Phase 2：数据可视化（1周）
5. 新增 `ExecutionProgressRing` 环形进度
6. 新增 `ExecutionCalendar` 日历视图
7. 新增 `PlanStatsCard` 统计面板

### Phase 3：AI 增强（1周）
8. 增强 `generate_plan` 工具 → 支持预设动作
9. 新增 `analyze_execution` 分析展示
10. AI 对话支持中途调整重量/组数

---

## 11. 小程序适配

小程序端保持一致的设计语言，使用原生组件实现：
- 环形进度使用 canvas 或 cover-view
- 日历使用 scroll-view 实现横向滚动
- 动作编辑使用 modal 组件

页面结构：
- `/packageA/pages/plans/index` - 计划列表
- `/packageA/pages/plan-detail/index` - 计划详情（含统计）
- `/packageA/pages/plan-execute/index` - 执行打卡
- `/packageA/pages/plan-wizard/index` - 三步生成向导

---

## 12. 错误处理

| 场景 | 处理方式 |
|------|----------|
| AI 无法生成计划 | 信息不足时询问补充 |
| 计划调整失败 | plan_id 不存在返回 403，调整描述不明确询问 |
| 打卡失败 | 网络错误 Toast 提示重试 |
| 动作编辑失败 | 显示具体错误信息 |
| 训练同步计划失败 | 不影响训练保存，记录错误日志，前端静默处理 |
| 执行记录删除失败 | 返回错误信息，引导用户重试 |

---

## 13. 后续优化方向

- 根据执行数据自动微调计划参数
- 基于用户反馈的学习优化
- 社区分享计划模板
- 与可穿戴设备数据同步