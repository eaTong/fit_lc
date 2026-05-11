# FitLC 健身计划 2.0 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现健身计划 2.0 系统，包含三步问卷生成、AI 训练同步、环形进度追踪

**Architecture:**
- 后端：扩展 PlanService，新增 syncWorkoutToPlanExecution 方法实现训练到计划的自动同步
- 前端：新建 PlanWizard 三步问卷组件，改造 PlanExecute 支持编辑重量
- 小程序：适配相同的数据结构和 UI 组件

**Tech Stack:** React + TypeScript + Zustand (frontend), Node.js + Prisma (backend), 微信小程序

---

## 文件结构

```
backend/
├── prisma/schema.prisma                    # 字段重命名 targetSets/targetReps/targetWeight
├── src/
│   ├── services/planService.ts             # 新增 syncWorkoutToPlanExecution
│   ├── tools/saveWorkout.ts                # 调用同步逻辑
│   └── repositories/planRepository.ts      # 新增 findActive, recordExecutionFromWorkout

frontend/src/
├── components/plan/
│   ├── PlanWizard.tsx                      # 新增：三步问卷向导
│   ├── PlanPreviewCard.tsx                 # 新增：计划预览卡片
│   ├── ExerciseEditor.tsx                  # 新增：动作编辑弹窗
│   └── ExecutionProgressRing.tsx           # 新增：环形进度
├── pages/
│   ├── PlanGenerate.tsx                    # 改造：使用 PlanWizard
│   └── PlanExecute.tsx                     # 改造：集成环形进度 + 可编辑
├── stores/planStore.ts                     # 新增 getPlanWithStats, getExecutionCalendar
└── api/plans.ts                            # 新增 stats, calendar 端点
```

---

## Phase 1：核心闭环

### Task 1: Prisma Schema 扩展

**Files:**
- Modify: `backend/prisma/schema.prisma:147-169`
- Modify: `backend/src/repositories/planRepository.ts:46-64`
- Create: `backend/prisma/migrations/2026-05-12-rename-plan-exercise-fields.sql`

- [ ] **Step 1: 修改 Prisma schema 字段名**

将 `PlanExercise` 模型的字段重命名：
- `sets` → `targetSets`
- `reps` → `targetReps`
- `weight` → `targetWeight`
- `duration` → `targetDuration`

```prisma
model PlanExercise {
  id           Int      @id @default(autoincrement())
  planId       Int      @map("plan_id")
  dayOfWeek    Int      @map("day_of_week")
  exerciseId   Int?     @map("exercise_id")
  exerciseName String   @map("exercise_name") @db.VarChar(100)
  targetMuscles String? @map("target_muscles") @db.VarChar(100)

  // 字段重命名
  targetSets   Int      @default(3)  @map("target_sets")
  targetReps   String   @db.VarChar(20)  @map("target_reps")
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

- [ ] **Step 2: 创建数据库迁移 SQL**

```sql
-- backend/prisma/migrations/2026-05-12-rename-plan-exercise-fields.sql
ALTER TABLE `plan_exercises`
  CHANGE `sets` `target_sets` INT NOT NULL DEFAULT 3,
  CHANGE `reps` `target_reps` VARCHAR(20) NOT NULL,
  CHANGE `weight` `target_weight` DECIMAL(5,2),
  CHANGE `duration` `target_duration` INT;
```

- [ ] **Step 3: 更新 planRepository.ts 中的字段引用**

修改 `createWithExercises` 方法，使用新字段名：
```typescript
data: {
  planId: plan.id,
  dayOfWeek: exercise.dayOfWeek,
  exerciseId: exercise.exerciseId ?? null,
  exerciseName: exercise.exerciseName,
  targetMuscles: exercise.targetMuscles ?? null,
  targetSets: exercise.targetSets ?? 3,
  targetReps: exercise.targetReps ?? '8-12',
  targetWeight: exercise.targetWeight ? new Decimal(exercise.targetWeight.toString()) : null,
  targetDuration: exercise.targetDuration ?? null,
  restSeconds: exercise.restSeconds ?? 60,
  orderIndex: exercise.orderIndex ?? 0
}
```

- [ ] **Step 4: 更新 planService.ts 字段映射**

修改 `getPlanAnalysis` 方法中的字段引用：
```typescript
exercises: plan.exercises.map(e => ({
  id: e.id,
  name: e.exerciseName,
  targetMuscles: e.targetMuscles,
  dayOfWeek: e.dayOfWeek,
  targetSets: e.targetSets,
  targetReps: e.targetReps,
  targetWeight: e.targetWeight,
  exerciseId: e.exerciseId
})),
```

- [ ] **Step 5: 提交**

```bash
git add backend/prisma/schema.prisma backend/prisma/migrations/2026-05-12-rename-plan-exercise-fields.sql backend/src/repositories/planRepository.ts backend/src/services/planService.ts
git commit -m "feat(plan): rename plan_exercise fields to target* prefix"
```

---

### Task 2: 新增 syncWorkoutToPlanExecution 同步功能

**Files:**
- Modify: `backend/src/repositories/planRepository.ts`
- Modify: `backend/src/services/planService.ts`
- Modify: `backend/src/tools/saveWorkout.ts`
- Create: `backend/src/utils/fuzzyMatch.ts`

- [ ] **Step 1: 创建 fuzzyMatch 工具函数**

```typescript
// backend/src/utils/fuzzyMatch.ts
/**
 * 模糊匹配两个动作名称
 * 支持同义词、简称匹配
 * @param name1 计划中的动作名称
 * @param name2 用户训练的动作名称
 * @returns 是否匹配
 */
export function fuzzyMatch(name1: string, name2: string): boolean {
  const n1 = name1.toLowerCase().trim();
  const n2 = name2.toLowerCase().trim();

  // 完全相等
  if (n1 === n2) return true;

  // 包含匹配
  if (n1.includes(n2) || n2.includes(n1)) return true;

  // 移除常见词后匹配
  const clean1 = removeCommonWords(n1);
  const clean2 = removeCommonWords(n2);
  if (clean1 === clean2) return true;

  // Levenshtein 距离 ≤ 3
  if (levenshteinDistance(n1, n2) <= 3) return true;

  return false;
}

function removeCommonWords(name: string): string {
  const commonWords = ['杠铃', '哑铃', '器械', '训练', '练习', 'barbell', 'dumbbell', 'machine'];
  let result = name;
  for (const word of commonWords) {
    result = result.replace(new RegExp(word, 'gi'), '');
  }
  return result.trim();
}

function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}
```

- [ ] **Step 2: 在 planRepository 新增 findActive 方法**

```typescript
// backend/src/repositories/planRepository.ts
async findActive(userId: number) {
  return prisma.workoutPlan.findFirst({
    where: { userId, status: 'active' },
    include: {
      exercises: {
        orderBy: { orderIndex: 'asc' }
      }
    }
  });
},

async recordExecutionFromWorkout(data: {
  planId: number;
  planExerciseId: number;
  scheduledDate: string;
  completedReps: number;
  completedWeight: number;
}) {
  return prisma.planExecution.create({
    data: {
      planId: data.planId,
      planExerciseId: data.planExerciseId,
      scheduledDate: new Date(data.scheduledDate),
      completedAt: new Date(),
      completedReps: data.completedReps,
      completedWeight: new Decimal(data.completedWeight.toString()),
      status: 'completed'
    }
  });
}
```

- [ ] **Step 3: 在 planService 新增 syncWorkoutToPlanExecution**

```typescript
// backend/src/services/planService.ts
import { fuzzyMatch } from '../utils/fuzzyMatch';

async syncWorkoutToPlanExecution(userId: number, workout: {
  date: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }>;
}): Promise<{ synced: boolean; planId?: number; matchedCount: number }> {
  // 1. 查找用户的活跃计划
  const activePlan = await planRepository.findActive(userId);
  if (!activePlan) {
    return { synced: false, matchedCount: 0 };
  }

  // 2. 获取今日是星期几
  const workoutDate = new Date(workout.date);
  const dayOfWeek = workoutDate.getDay() === 0 ? 7 : workoutDate.getDay();

  // 3. 查找计划中该天的训练安排
  const planExercises = activePlan.exercises.filter(
    e => e.dayOfWeek === dayOfWeek
  );

  if (planExercises.length === 0) {
    return { synced: false, planId: activePlan.id, matchedCount: 0 };
  }

  // 4. 匹配动作并创建执行记录
  let matchedCount = 0;
  for (const exercise of workout.exercises) {
    const matchedPlanExercise = planExercises.find(pe =>
      fuzzyMatch(pe.exerciseName, exercise.name)
    );

    if (matchedPlanExercise) {
      await planRepository.recordExecutionFromWorkout({
        planId: activePlan.id,
        planExerciseId: matchedPlanExercise.id,
        scheduledDate: workout.date,
        completedReps: exercise.sets * exercise.reps,
        completedWeight: exercise.weight,
      });
      matchedCount++;
    }
  }

  return {
    synced: matchedCount > 0,
    planId: activePlan.id,
    matchedCount
  };
}
```

- [ ] **Step 4: 修改 saveWorkout 工具调用同步**

在 `saveWorkout.ts` 的成功返回前添加：

```typescript
// 在 return JSON.stringify({ aiReply, dataType: 'workout', result: {...} }) 之前

// 同步到活跃计划
try {
  const syncResult = await planService.syncWorkoutToPlanExecution(userId, {
    date: finalDate,
    exercises: exercises.map(e => ({
      name: e.name,
      sets: e.sets || 0,
      reps: e.reps || 0,
      weight: e.weight || 0
    }))
  });

  if (syncResult.synced) {
    const planName = (await planRepository.findById(syncResult.planId!))?.name || '计划';
    achievementMsg += `\n\n📋 已同步到您的【${planName}】`;
  }
} catch (syncError) {
  console.error('Failed to sync workout to plan:', syncError);
  // 不影响主流程
}
```

- [ ] **Step 5: 提交**

```bash
git add backend/src/utils/fuzzyMatch.ts backend/src/repositories/planRepository.ts backend/src/services/planService.ts backend/src/tools/saveWorkout.ts
git commit -m "feat(plan): add syncWorkoutToPlanExecution for AI workout sync"
```

---

### Task 3: 前端 PlanWizard 三步问卷组件

**Files:**
- Create: `frontend/src/components/plan/PlanWizard.tsx`
- Create: `frontend/src/components/plan/PlanPreviewCard.tsx`
- Create: `frontend/src/components/plan/StepGoalCycle.tsx`
- Create: `frontend/src/components/plan/StepFrequencyEquipment.tsx`
- Create: `frontend/src/components/plan/StepBodyData.tsx`
- Modify: `frontend/src/pages/PlanGenerate.tsx`

- [ ] **Step 1: 创建 PlanWizard 主组件**

```typescript
// frontend/src/components/plan/PlanWizard.tsx
import { useState } from 'react';
import StepGoalCycle from './StepGoalCycle';
import StepFrequencyEquipment from './StepFrequencyEquipment';
import StepBodyData from './StepBodyData';
import PlanPreviewCard from './PlanPreviewCard';
import Button from '../ui/Button';
import type { UserProfile } from '../../types';

interface PlanWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

type Step = 1 | 2 | 3;

export default function PlanWizard({ onComplete, onCancel }: PlanWizardProps) {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  const handleNext = (data: Partial<UserProfile>) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (step < 3) {
      setStep((step + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleComplete = (data: Partial<UserProfile>) => {
    const finalData = { ...formData, ...data } as UserProfile;
    onComplete(finalData);
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              s <= step ? 'bg-accent-primary text-white' : 'bg-primary-secondary text-text-muted'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 1 && (
        <StepGoalCycle
          initialData={formData}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <StepFrequencyEquipment
          initialData={formData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <StepBodyData
          initialData={formData}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: 创建 StepGoalCycle 组件**

```typescript
// frontend/src/components/plan/StepGoalCycle.tsx
import { useState } from 'react';
import Button from '../ui/Button';

const goalOptions = [
  { value: 'bulk', label: '增肌', icon: '💪', desc: '+肌肉量' },
  { value: 'cut', label: '减脂', icon: '🔥', desc: '-体脂率' },
  { value: 'maintain', label: '维持', icon: '⚖️', desc: '保持现状' },
];

const cycleOptions = [4, 8, 12, 24];

interface Props {
  initialData: any;
  onNext: (data: any) => void;
}

export default function StepGoalCycle({ initialData, onNext }: Props) {
  const [goal, setGoal] = useState(initialData.goal || 'bulk');
  const [cycle, setCycle] = useState(initialData.duration_weeks || 12);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">选择您的训练目标</h3>
        <div className="grid grid-cols-3 gap-4">
          {goalOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setGoal(opt.value)}
              className={`p-4 border-2 rounded transition-colors ${
                goal === opt.value
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              <div className="text-2xl mb-2">{opt.icon}</div>
              <div className="font-medium">{opt.label}</div>
              <div className="text-sm text-text-secondary">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">计划周期</h3>
        <div className="flex gap-3">
          {cycleOptions.map(c => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className={`px-4 py-2 border-2 rounded ${
                cycle === c
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              {c}周
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => onNext({ goal, duration_weeks: cycle })}>
          下一步 →
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建 StepFrequencyEquipment 组件**

```typescript
// frontend/src/components/plan/StepFrequencyEquipment.tsx
import { useState } from 'react';
import Button from '../ui/Button';

const equipmentOptions = [
  { value: '哑铃', label: '哑铃' },
  { value: '杠铃', label: '杠铃' },
  { value: '龙门架', label: '龙门架' },
  { value: '器械', label: '器械' },
  { value: '跑步机', label: '跑步机' },
  { value: '拉力带', label: '拉力带' },
  { value: '自重', label: '自重' },
];

const experienceOptions = [
  { value: 'beginner', label: '初学者' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
];

interface Props {
  initialData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function StepFrequencyEquipment({ initialData, onNext, onBack }: Props) {
  const [frequency, setFrequency] = useState(initialData.frequency || 3);
  const [equipment, setEquipment] = useState<string[]>(
    initialData.equipment ? initialData.equipment.split(',').map(e => e.trim()) : []
  );
  const [experience, setExperience] = useState(initialData.experience || 'beginner');

  const toggleEquipment = (eq: string) => {
    setEquipment(prev =>
      prev.includes(eq) ? prev.filter(e => e !== eq) : [...prev, eq]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">每周训练几次？</h3>
        <div className="flex gap-3 flex-wrap">
          {[2, 3, 4, 5, 6].map(f => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={`px-4 py-2 border-2 rounded ${
                frequency === f
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              {f}次
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">可用器械（多选）</h3>
        <div className="grid grid-cols-4 gap-3">
          {equipmentOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleEquipment(opt.value)}
              className={`px-3 py-2 border-2 rounded ${
                equipment.includes(opt.value)
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">训练经验</h3>
        <div className="flex gap-3">
          {experienceOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setExperience(opt.value)}
              className={`px-4 py-2 border-2 rounded ${
                experience === opt.value
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>← 上一步</Button>
        <Button
          variant="primary"
          onClick={() => onNext({ frequency, equipment: equipment.join(','), experience })}
          disabled={equipment.length === 0}
        >
          下一步 →
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 创建 StepBodyData 组件**

```typescript
// frontend/src/components/plan/StepBodyData.tsx
import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  initialData: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function StepBodyData({ initialData, onComplete, onBack }: Props) {
  const [height, setHeight] = useState(initialData.height || '');
  const [bodyWeight, setBodyWeight] = useState(initialData.body_weight || '');
  const [bodyFat, setBodyFat] = useState(initialData.body_fat || '');
  const [conditions, setConditions] = useState(initialData.conditions || '');
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">基本身体数据（帮助计算合适的重量）</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="身高 (cm)"
            type="number"
            value={height}
            onChange={v => setHeight(v)}
            placeholder="175"
          />
          <Input
            label="体重 (kg)"
            type="number"
            value={bodyWeight}
            onChange={v => setBodyWeight(v)}
            placeholder="70"
          />
        </div>
      </div>

      <button
        onClick={() => setShowMore(!showMore)}
        className="text-accent-primary text-sm"
      >
        {showMore ? '▲ 收起' : '▼ 更多选项'}（体脂率、伤病情况等）
      </button>

      {showMore && (
        <div className="space-y-4">
          <Input
            label="体脂率 (%) 可选"
            type="number"
            step="0.1"
            value={bodyFat}
            onChange={v => setBodyFat(v)}
            placeholder="18.5"
          />
          <div>
            <label className="block text-text-secondary text-sm mb-1">伤病/身体状况（可选）</label>
            <textarea
              value={conditions}
              onChange={e => setConditions(e.target.value)}
              rows={2}
              placeholder="如有伤病或身体状况请在此说明"
              className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>← 上一步</Button>
        <Button
          variant="primary"
          onClick={() => onComplete({
            height: Number(height),
            body_weight: Number(bodyWeight),
            body_fat: bodyFat ? Number(bodyFat) : undefined,
            conditions: conditions || undefined
          })}
          disabled={!height || !bodyWeight}
        >
          生成计划
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 创建 PlanPreviewCard 组件**

```typescript
// frontend/src/components/plan/PlanPreviewCard.tsx
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Exercise {
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  targetWeight: number | null;
}

interface PlanPreviewCardProps {
  plan: {
    name?: string;
    goal: string;
    duration_weeks: number;
    frequency: number;
    exercises: Exercise[];
  };
  onEdit?: () => void;
  onStart?: () => void;
  onSave?: () => void;
}

const goalLabels = { bulk: '增肌', cut: '减脂', maintain: '维持' };

export default function PlanPreviewCard({ plan, onEdit, onStart, onSave }: PlanPreviewCardProps) {
  // 按 dayOfWeek 分组
  const grouped = plan.exercises.reduce((acc, ex) => {
    const day = ex.dayOfWeek;
    if (!acc[day]) acc[day] = [];
    acc[day].push(ex);
    return acc;
  }, {} as Record<number, Exercise[]>);

  const dayNames = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {plan.name || `${goalLabels[plan.goal]}计划`}
        </h2>
        <div className="text-sm text-text-secondary">
          {goalLabels[plan.goal]} | 每周{plan.frequency}次 | {plan.duration_weeks}周
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {Object.entries(grouped)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([day, exercises]) => (
            <div key={day} className="border border-border rounded p-3">
              <div className="font-medium text-accent-primary mb-2">
                {dayNames[Number(day)]}
              </div>
              {exercises.map((ex, i) => (
                <div key={i} className="text-sm text-text-secondary py-1">
                  • {ex.exerciseName} {ex.targetSets}组 {ex.targetReps}
                  {ex.targetWeight && ` ${ex.targetWeight}kg`}
                </div>
              ))}
            </div>
          ))}
      </div>

      <div className="flex gap-3">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            编辑动作
          </Button>
        )}
        {onSave && (
          <Button variant="secondary" onClick={onSave}>
            保存计划
          </Button>
        )}
        {onStart && (
          <Button variant="primary" onClick={onStart}>
            开始执行
          </Button>
        )}
      </div>
    </Card>
  );
}
```

- [ ] **Step 6: 更新 PlanGenerate 使用 PlanWizard**

```typescript
// frontend/src/pages/PlanGenerate.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanStore } from '../stores/planStore';
import { useToastStore } from '../stores/toastStore';
import PlanWizard from '../components/plan/PlanWizard';
import PlanPreviewCard from '../components/plan/PlanPreviewCard';
import type { UserProfile } from '../types';

export default function PlanGenerate() {
  const navigate = useNavigate();
  const { generatePlan, isLoading } = usePlanStore();
  const { addToast } = useToastStore();
  const [showWizard, setShowWizard] = useState(true);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const handleComplete = async (data: UserProfile) => {
    try {
      // 调用生成 API
      const result = await generatePlan(data, undefined);
      // 获取完整计划详情用于预览
      // 实际应该调用 fetchPlan(result.plan_id) 获取完整数据
      setGeneratedPlan(result);
      addToast('计划已生成', 'success');
    } catch {
      addToast('生成失败，请重试', 'error');
    }
  };

  if (generatedPlan) {
    return (
      <div className="px-6 py-4 max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl font-bold mb-6">计划预览</h1>
        <PlanPreviewCard
          plan={generatedPlan}
          onStart={() => navigate(`/plans/${generatedPlan.id}`)}
          onSave={() => {
            setShowWizard(false);
            setGeneratedPlan(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="px-6 py-4 max-w-3xl mx-auto">
      <h1 className="font-heading text-3xl font-bold mb-6">生成健身计划</h1>
      <PlanWizard
        onComplete={handleComplete}
        onCancel={() => navigate('/plans')}
      />
    </div>
  );
}
```

- [ ] **Step 7: 提交**

```bash
git add frontend/src/components/plan/ frontend/src/pages/PlanGenerate.tsx
git commit -m "feat(plan): add PlanWizard 3-step form components"
```

---

### Task 4: 前端 PlanExecute 增强 - 环形进度 + 可编辑重量

**Files:**
- Create: `frontend/src/components/plan/ExecutionProgressRing.tsx`
- Modify: `frontend/src/pages/PlanExecute.tsx`
- Modify: `frontend/src/components/plan/ExerciseEditor.tsx`

- [ ] **Step 1: 创建 ExecutionProgressRing 组件**

```typescript
// frontend/src/components/plan/ExecutionProgressRing.tsx
interface Props {
  completed: number;
  total: number;
  size?: number;
}

export default function ExecutionProgressRing({ completed, total, size = 120 }: Props) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#333"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FF4500"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{completed}/{total}</span>
        <span className="text-sm text-text-secondary">完成</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 ExerciseEditor 弹窗组件**

```typescript
// frontend/src/components/plan/ExerciseEditor.tsx
import { useState } from 'react';
import Button from '../ui/Button';

interface Exercise {
  id?: number;
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  targetWeight: number | null;
}

interface Props {
  exercise: Exercise;
  onSave: (updates: Partial<Exercise>) => void;
  onCancel: () => void;
}

export default function ExerciseEditor({ exercise, onSave, onCancel }: Props) {
  const [sets, setSets] = useState(exercise.targetSets);
  const [reps, setReps] = useState(exercise.targetReps);
  const [weight, setWeight] = useState(exercise.targetWeight?.toString() || '');

  const handleSave = () => {
    onSave({
      targetSets: sets,
      targetReps: reps,
      targetWeight: weight ? Number(weight) : null
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-primary rounded-lg p-6 w-80 space-y-4">
        <h3 className="font-bold text-lg">编辑动作 - {exercise.exerciseName}</h3>

        <div>
          <label className="text-sm text-text-secondary">组数</label>
          <div className="flex gap-2 mt-1">
            {[3, 4, 5, 6].map(n => (
              <button
                key={n}
                onClick={() => setSets(n)}
                className={`w-10 h-10 rounded ${
                  sets === n ? 'bg-accent-primary' : 'bg-primary-secondary'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary">每组次数</label>
          <input
            type="text"
            value={reps}
            onChange={e => setReps(e.target.value)}
            className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 mt-1"
            placeholder="8-12"
          />
        </div>

        <div>
          <label className="text-sm text-text-secondary">重量 (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 mt-1"
            placeholder="60"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onCancel}>取消</Button>
          <Button variant="primary" onClick={handleSave}>确认完成</Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 更新 PlanExecute 页面**

```typescript
// frontend/src/pages/PlanExecute.tsx - 改造后的完整版本
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlanStore } from '../stores/planStore';
import { useToastStore } from '../stores/toastStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ExecutionProgressRing from '../components/plan/ExecutionProgressRing';
import ExerciseEditor from '../components/plan/ExerciseEditor';

const DAY_NAMES = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

interface ExerciseStatus {
  exerciseId: number;
  completed: boolean;
  completedWeight?: number;
  completedReps?: number;
}

interface PlanExercise {
  id: number;
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  targetWeight: number | null;
}

export default function PlanExecute() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentPlan, fetchPlan, recordExecution } = usePlanStore();
  const { addToast } = useToastStore();

  const [exerciseStatuses, setExerciseStatuses] = useState<Record<number, ExerciseStatus>>({});
  const [editingExercise, setEditingExercise] = useState<PlanExercise | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) fetchPlan(parseInt(id));
  }, [id, fetchPlan]);

  useEffect(() => {
    if (currentPlan?.exercises) {
      const statuses: Record<number, ExerciseStatus> = {};
      currentPlan.exercises.forEach((ex: any) => {
        if (ex.id) {
          statuses[ex.id] = {
            exerciseId: ex.id,
            completed: false,
            completedWeight: ex.targetWeight || ex.targetWeight,
            completedReps: parseInt(ex.targetReps || '0'),
          };
        }
      });
      setExerciseStatuses(statuses);
    }
  }, [currentPlan]);

  const today = new Date();
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

  const todayExercises = (currentPlan?.exercises || []).filter(
    (ex: any) => ex.dayOfWeek === dayOfWeek
  );

  const completedCount = Object.values(exerciseStatuses).filter(s => s.completed).length;
  const totalCount = todayExercises.length;

  const toggleExercise = (exerciseId: number) => {
    setExerciseStatuses(prev => ({
      ...prev,
      exerciseId: {
        ...prev[exerciseId],
        completed: !prev[exerciseId].completed,
      },
    }));
  };

  const openEditor = (ex: PlanExercise) => {
    setEditingExercise(ex);
  };

  const handleEditSave = (updates: Partial<ExerciseStatus>) => {
    if (editingExercise?.id) {
      setExerciseStatuses(prev => ({
        ...prev,
        [editingExercise.id]: {
          ...prev[editingExercise.id],
          ...updates,
          completed: true
        }
      }));
      setEditingExercise(null);
    }
  };

  const handleSubmit = async () => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      const date = today.toISOString().split('T')[0];
      for (const ex of todayExercises) {
        if (ex.id) {
          const status = exerciseStatuses[ex.id];
          await recordExecution(parseInt(id), {
            plan_exercise_id: ex.id,
            scheduled_date: date,
            completed_reps: status?.completedReps,
            completed_weight: status?.completedWeight,
            status: status?.completed ? 'completed' : 'skipped',
          });
        }
      }
      addToast('打卡成功！', 'success');
      navigate(`/plans/${id}`);
    } catch {
      addToast('打卡失败，请重试', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentPlan) {
    return <div className="px-6 py-4 text-center text-text-secondary">加载中...</div>;
  }

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-3xl font-bold">
          今日训练：{DAY_NAMES[dayOfWeek - 1]}
        </h1>
        <span className="text-text-secondary">
          {today.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center mb-6">
        <ExecutionProgressRing completed={completedCount} total={totalCount} />
      </div>

      {/* Exercise List */}
      <div className="space-y-4 mb-6">
        {todayExercises.map((ex: any) => {
          const status = ex.id ? exerciseStatuses[ex.id] : null;
          const isCompleted = status?.completed || false;

          return (
            <Card key={ex.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 border-2 flex items-center justify-center cursor-pointer ${
                      isCompleted ? 'bg-accent-primary border-accent-primary' : 'border-text-muted'
                    }`}
                    onClick={() => ex.id && toggleExercise(ex.id)}
                  >
                    {isCompleted && <span className="text-white text-sm">✓</span>}
                  </div>
                  <div>
                    <h3 className={`font-medium ${isCompleted ? 'line-through text-text-muted' : ''}`}>
                      {ex.exerciseName}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {ex.targetSets}组 × {ex.targetReps}
                      {ex.targetWeight && ` × ${ex.targetWeight}kg`}
                    </p>
                  </div>
                </div>

                {isCompleted && (
                  <span className="text-accent-primary text-sm">已完成</span>
                )}
              </div>

              {/* Edit button for non-completed */}
              {!isCompleted && ex.id && (
                <button
                  onClick={() => openEditor(ex)}
                  className="mt-2 text-sm text-accent-primary"
                >
                  编辑重量/次数
                </button>
              )}
            </Card>
          );
        })}
      </div>

      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? '提交中...' : '提交打卡'}
      </Button>

      {/* Exercise Editor Modal */}
      {editingExercise && (
        <ExerciseEditor
          exercise={editingExercise}
          onSave={handleEditSave}
          onCancel={() => setEditingExercise(null)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add frontend/src/components/plan/ExecutionProgressRing.tsx frontend/src/components/plan/ExerciseEditor.tsx frontend/src/pages/PlanExecute.tsx
git commit -m "feat(plan): enhance PlanExecute with progress ring and editable weights"
```

---

## Phase 2：数据可视化

### Task 5: 新增 PlanStatsCard 和 ExecutionCalendar

**Files:**
- Create: `frontend/src/components/plan/PlanStatsCard.tsx`
- Create: `frontend/src/components/plan/ExecutionCalendar.tsx`
- Create: `frontend/src/components/plan/WeeklyProgressBar.tsx`
- Modify: `frontend/src/pages/PlanDetail.tsx`

- [ ] **Step 1: 创建 PlanStatsCard 组件**

```typescript
// frontend/src/components/plan/PlanStatsCard.tsx
interface Props {
  total: number;
  completed: number;
  completionRate: number;
  streak: number;
}

export default function PlanStatsCard({ total, completed, completionRate, streak }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-primary-secondary border border-border rounded p-4 text-center">
        <div className="text-2xl font-bold">{completed}/{total}</div>
        <div className="text-sm text-text-secondary">已完成</div>
      </div>
      <div className="bg-primary-secondary border border-border rounded p-4 text-center">
        <div className="text-2xl font-bold">{completionRate}%</div>
        <div className="text-sm text-text-secondary">完成率</div>
      </div>
      <div className="bg-primary-secondary border border-border rounded p-4 text-center">
        <div className="text-2xl font-bold">{streak}天</div>
        <div className="text-sm text-text-secondary">连续打卡</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 WeeklyProgressBar 组件**

```typescript
// frontend/src/components/plan/WeeklyProgressBar.tsx
interface DayStatus {
  dayOfWeek: number;
  status: 'completed' | 'skipped' | 'pending' | 'rest';
  completedExercises: number;
  totalExercises: number;
}

interface Props {
  days: DayStatus[];
}

const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default function WeeklyProgressBar({ days }: Props) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'skipped': return '×';
      case 'rest': return '░';
      default: return '○';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'skipped': return 'bg-yellow-600';
      case 'rest': return 'bg-text-muted';
      default: return 'bg-border';
    }
  };

  return (
    <div className="bg-primary-secondary border border-border rounded p-4">
      <h3 className="text-sm font-medium mb-3">本周执行进度</h3>
      <div className="space-y-2">
        {days.map(day => (
          <div key={day.dayOfWeek} className="flex items-center gap-3">
            <span className="w-12 text-sm text-text-secondary">{dayNames[day.dayOfWeek - 1]}</span>
            <div className="flex-1 h-2 bg-border rounded overflow-hidden">
              <div
                className={`h-full ${getStatusColor(day.status)}`}
                style={{
                  width: day.status === 'pending'
                    ? `${(day.completedExercises / day.totalExercises) * 100}%`
                    : day.status === 'completed' ? '100%' : '0%'
                }}
              />
            </div>
            <span className="w-16 text-sm text-right">
              {getStatusIcon(day.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建 ExecutionCalendar 组件**

```typescript
// frontend/src/components/plan/ExecutionCalendar.tsx
interface DayData {
  date: string;
  status: 'completed' | 'skipped' | 'pending' | 'rest' | 'none';
}

interface Props {
  year: number;
  month: number;
  data: DayData[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function ExecutionCalendar({ year, month, data, onPrevMonth, onNextMonth }: Props) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const getDayStatus = (day: number): string => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = data.find(d => d.date === dateStr);
    return dayData?.status || 'none';
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === year &&
           today.getMonth() + 1 === month &&
           today.getDate() === day;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'skipped': return '×';
      case 'rest': return '░';
      default: return '';
    }
  };

  const getStatusColor = (status: string, isToday: boolean) => {
    if (isToday) return 'border-accent-primary';
    switch (status) {
      case 'completed': return 'bg-green-600/20 text-green-400';
      case 'skipped': return 'bg-yellow-600/20 text-yellow-400';
      case 'rest': return 'bg-text-muted/20 text-text-muted';
      default: return '';
    }
  };

  return (
    <div className="bg-primary-secondary border border-border rounded p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrevMonth} className="p-1">&lt;</button>
        <span className="font-medium">{year}年{month}月</span>
        <button onClick={onNextMonth} className="p-1">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {['一', '二', '三', '四', '五', '六', '日'].map(d => (
          <div key={d} className="text-text-muted py-1">{d}</div>
        ))}

        {/* Empty cells for first day offset */}
        {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const status = getDayStatus(day);
          const today = isToday(day);

          return (
            <div
              key={day}
              className={`
                aspect-square flex items-center justify-center rounded
                ${today ? 'border-2 border-accent-primary' : ''}
                ${getStatusColor(status, today)}
              `}
            >
              {day}
              {status !== 'none' && (
                <span className="absolute text-xs">{getStatusIcon(status)}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-4 text-xs">
        <span className="text-green-400">✓ 完成</span>
        <span className="text-yellow-400">× 跳过</span>
        <span className="text-text-muted">░ 休息</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 更新 PlanDetail 页面整合统计组件**

（此处需要查看并修改 PlanDetail 页面，假设路径为 `frontend/src/pages/PlanDetail.tsx`）

```typescript
// 在 PlanDetail 页面中添加：
import PlanStatsCard from '../components/plan/PlanStatsCard';
import WeeklyProgressBar from '../components/plan/WeeklyProgressBar';
import ExecutionCalendar from '../components/plan/ExecutionCalendar';
import { usePlanStore } from '../stores/planStore';

// 在组件中添加状态和方法获取统计数据
const { analysis } = usePlanStore();
```

- [ ] **Step 5: 提交**

```bash
git add frontend/src/components/plan/PlanStatsCard.tsx frontend/src/components/plan/WeeklyProgressBar.tsx frontend/src/components/plan/ExecutionCalendar.tsx
git commit -m "feat(plan): add stats card, weekly progress bar, and calendar components"
```

---

## Phase 3：AI 增强

### Task 6: 增强 generate_plan 工具支持 preferredExercises

**Files:**
- Modify: `backend/src/tools/generatePlan.ts`
- Modify: `backend/src/services/planService.ts`

- [ ] **Step 1: 更新 generate_plan schema**

```typescript
schema: z.object({
  userId: z.number().describe("用户ID"),
  user_profile: z.object({
    name: z.string().optional().describe("计划名称"),
    goal: z.enum(["bulk", "cut", "maintain"]).describe("健身目标"),
    frequency: z.number().describe("每周训练次数"),
    experience: z.enum(["beginner", "intermediate", "advanced"]).describe("训练经验"),
    equipment: z.string().describe("可用器械列表"),
    targetMuscles: z.array(z.string()).optional().describe("优先训练肌肉群"),
    conditions: z.string().optional().describe("身体状况"),
    body_weight: z.number().describe("体重kg"),
    body_fat: z.number().optional().describe("体脂率%"),
    height: z.number().describe("身高cm"),
    duration_weeks: z.number().describe("计划周期周")
  }),
  // 新增：用户预设动作
  preferred_exercises: z.array(z.object({
    name: z.string(),
    target_sets: z.number().optional(),
    target_reps: z.string().optional(),
    target_weight: z.number().optional()
  })).optional()
})
```

- [ ] **Step 2: 更新 func 处理 preferredExercises**

```typescript
func: async ({ userId, user_profile, preferred_exercises }) => {
  // ... existing validation ...

  // 合并用户预设动作到生成逻辑
  let exercises = await generateExercisesForProfile(user_profile);

  if (preferred_exercises && preferred_exercises.length > 0) {
    // 用用户预设的覆盖生成的
    exercises = exercises.map(ex => {
      const userEx = preferred_exercises.find(
        pe => fuzzyMatch(pe.name, ex.exerciseName)
      );
      if (userEx) {
        return {
          ...ex,
          targetSets: userEx.target_sets ?? ex.sets,
          targetReps: userEx.target_reps ?? ex.reps,
          targetWeight: userEx.target_weight ?? ex.weight
        };
      }
      return ex;
    });
  }

  // 创建计划
  const planId = await planService.createPlan(userId, user_profile, exercises);
  // ... rest of function
}
```

- [ ] **Step 3: 提交**

```bash
git add backend/src/tools/generatePlan.ts backend/src/services/planService.ts
git commit -m "feat(plan): enhance generate_plan with preferred_exercises support"
```

---

### Task 7: 小程序适配

**Files:**
- Create: `fitlc-mini/packageA/pages/plan-wizard/index.js`
- Create: `fitlc-mini/packageA/pages/plan-wizard/index.wxml`
- Create: `fitlc-mini/packageA/pages/plan-wizard/index.wxss`
- Modify: `fitlc-mini/packageA/pages/plan-execute/index.js`

- [ ] **Step 1: 创建小程序 PlanWizard**

```javascript
// fitlc-mini/packageA/pages/plan-wizard/index.js
Component({
  data: {
    step: 1,
    goal: 'bulk',
    duration_weeks: 12,
    frequency: 3,
    equipment: [],
    experience: 'beginner',
    height: '',
    body_weight: '',
    body_fat: '',
    conditions: ''
  },

  methods: {
    onGoalSelect(e) {
      this.setData({ goal: e.currentTarget.dataset.goal });
    },
    onCycleSelect(e) {
      this.setData({ duration_weeks: e.currentTarget.dataset.cycle });
    },
    onFrequencySelect(e) {
      this.setData({ frequency: e.currentTarget.dataset.freq });
    },
    onEquipmentToggle(e) {
      const eq = e.currentTarget.dataset.eq;
      const list = this.data.equipment;
      if (list.includes(eq)) {
        this.setData({ equipment: list.filter(i => i !== eq) });
      } else {
        this.setData({ equipment: [...list, eq] });
      }
    },
    onNextStep() {
      if (this.data.step < 3) {
        this.setData({ step: this.data.step + 1 });
      }
    },
    onPrevStep() {
      if (this.data.step > 1) {
        this.setData({ step: this.data.step - 1 });
      }
    },
    onGenerate() {
      const { planActions } = require('../../../store/actions');
      const { height, body_weight, body_fat, conditions, goal, duration_weeks, frequency, equipment, experience } = this.data;

      planActions.generatePlan({
        goal,
        duration_weeks,
        frequency,
        equipment: equipment.join(','),
        experience,
        height: parseFloat(height),
        body_weight: parseFloat(body_weight),
        body_fat: body_fat ? parseFloat(body_fat) : undefined,
        conditions: conditions || undefined
      }).then(res => {
        wx.showToast({ title: '计划已生成', icon: 'success' });
        wx.navigateBack();
      }).catch(err => {
        wx.showToast({ title: '生成失败', icon: 'none' });
      });
    }
  }
});
```

- [ ] **Step 2: 创建 wxml 模板**

```xml
<!-- fitlc-mini/packageA/pages/plan-wizard/index.wxml -->
<view class="container">
  <!-- Progress -->
  <view class="progress">
    <view class="{{step >= 1 ? 'active' : ''}}">1</view>
    <view class="{{step >= 2 ? 'active' : ''}}">2</view>
    <view class="{{step >= 3 ? 'active' : ''}}">3</view>
  </view>

  <!-- Step 1: Goal & Cycle -->
  <view wx:if="{{step === 1}}">
    <text class="title">选择您的训练目标</text>
    <view class="goal-grid">
      <view class="{{goal === 'bulk' ? 'selected' : ''}}" bindtap="onGoalSelect" data-goal="bulk">
        <text>💪</text><text>增肌</text>
      </view>
      <view class="{{goal === 'cut' ? 'selected' : ''}}" bindtap="onGoalSelect" data-goal="cut">
        <text>🔥</text><text>减脂</text>
      </view>
      <view class="{{goal === 'maintain' ? 'selected' : ''}}" bindtap="onGoalSelect" data-goal="maintain">
        <text>⚖️</text><text>维持</text>
      </view>
    </view>
    <text class="title">计划周期</text>
    <view class="cycle-grid">
      <view wx:for="{{[4, 8, 12, 24]}}" wx:key="*this"
        class="{{duration_weeks === item ? 'selected' : ''}}"
        bindtap="onCycleSelect" data-cycle="{{item}}">{{item}}周</view>
    </view>
    <button class="btn-next" bindtap="onNextStep">下一步 →</button>
  </view>

  <!-- Step 2: Frequency & Equipment -->
  <view wx:if="{{step === 2}}">
    <text class="title">每周训练几次？</text>
    <view class="freq-grid">
      <view wx:for="{{[2,3,4,5,6]}}" wx:key="*this"
        class="{{frequency === item ? 'selected' : ''}}"
        bindtap="onFrequencySelect" data-freq="{{item}}">{{item}}次</view>
    </view>
    <text class="title">可用器械</text>
    <view class="equipment-grid">
      <view wx:for="{{['哑铃','杠铃','龙门架','器械','跑步机','拉力带','自重']}}" wx:key="*this"
        class="{{equipment.includes(item) ? 'selected' : ''}}"
        bindtap="onEquipmentToggle" data-eq="{{item}}">{{item}}</view>
    </view>
    <view class="btn-row">
      <button bindtap="onPrevStep">← 上一步</button>
      <button class="primary" bindtap="onNextStep">下一步 →</button>
    </view>
  </view>

  <!-- Step 3: Body Data -->
  <view wx:if="{{step === 3}}">
    <text class="title">基本身体数据</text>
    <input placeholder="身高 (cm)" type="number" bindinput="e => setData({height: e.detail.value})" />
    <input placeholder="体重 (kg)" type="number" bindinput="e => setData({body_weight: e.detail.value})" />
    <button class="primary" bindtap="onGenerate">生成计划</button>
    <button bindtap="onPrevStep">← 上一步</button>
  </view>
</view>
```

- [ ] **Step 3: 更新小程序 plan-execute 页面**

在现有 `fitlc-mini/packageA/pages/plan-execute/index.js` 中：
1. 添加环形进度显示
2. 添加动作编辑功能

- [ ] **Step 4: 提交**

```bash
git add fitlc-mini/packageA/pages/plan-wizard/ fitlc-mini/packageA/pages/plan-execute/
git commit -m "feat(mini): add plan wizard and enhance plan execute page"
```

---

## 验证计划

完成所有任务后，验证以下场景：

1. **生成计划** - 通过 PlanWizard 三步生成计划 → 检查计划详情显示正确
2. **执行打卡** - 进入 PlanExecute → 点击编辑动作 → 修改重量 → 提交打卡 → 检查执行记录
3. **AI 同步** - 通过 AI 对话保存训练 → 检查活跃计划的执行记录是否自动创建
4. **统计显示** - 进入 PlanDetail → 检查统计卡片、周进度条、日历视图
5. **小程序** - 在小程序端完成相同操作流程

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-12-plan-v2-implementation.md`**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**