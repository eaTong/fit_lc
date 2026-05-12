import Card from '../ui/Card';
import Button from '../ui/Button';

interface Exercise {
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  targetWeight: number | null;
  dayOfWeek?: number;
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

const goalLabels: Record<string, string> = { bulk: '增肌', cut: '减脂', maintain: '维持' };

export default function PlanPreviewCard({ plan, onEdit, onStart, onSave }: PlanPreviewCardProps) {
  // 按 dayOfWeek 分组
  const grouped = (plan.exercises || []).reduce((acc, ex) => {
    const day = ex.dayOfWeek || 1;
    if (!acc[day]) acc[day] = [];
    acc[day].push(ex);
    return acc;
  }, {} as Record<number, Exercise[]>);

  const dayNames = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {plan.name || `${goalLabels[plan.goal] || '健身'}计划`}
        </h2>
        <div className="text-sm text-text-secondary">
          {goalLabels[plan.goal] || ''} | 每周{plan.frequency}次 | {plan.duration_weeks}周
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {Object.entries(grouped)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([day, exercises]) => (
            <div key={day} className="border border-border rounded p-3">
              <div className="font-medium text-accent-primary mb-2">
                {dayNames[Number(day)] || `Day ${day}`}
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