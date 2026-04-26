import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlanStore } from '../stores/planStore';
import { useToastStore } from '../stores/toastStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import type { Plan } from '../types';

const goalLabels: Record<Plan['goal'], string> = {
  bulk: '增肌',
  cut: '减脂',
  maintain: '维持',
};

const dayLabels: Record<number, string> = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日',
};

const statusColors: Record<Plan['status'], string> = {
  draft: 'bg-text-muted text-text-secondary',
  active: 'bg-green-600 text-white',
  completed: 'bg-blue-600 text-white',
  paused: 'bg-accent-orange text-white',
};

function StatusBadge({ status }: { status: Plan['status'] }) {
  const labels: Record<Plan['status'], string> = {
    draft: '草稿',
    active: '进行中',
    completed: '已完成',
    paused: '已暂停',
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${statusColors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function PlanDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentPlan: plan, isLoading, fetchPlan, activatePlan } = usePlanStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (id) {
      fetchPlan(Number(id));
    }
  }, [id, fetchPlan]);

  const handleActivate = async () => {
    if (!plan) return;
    try {
      await activatePlan(plan.id);
      addToast('计划已激活', 'success');
    } catch {
      addToast('激活失败，请重试', 'error');
    }
  };

  const handleStartExecution = () => {
    if (!plan) return;
    navigate(`/plans/${plan.id}/execute`);
  };

  if (isLoading) {
    return (
      <div className="px-6 py-4">
        <p className="text-text-secondary text-center">加载中...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="px-6 py-4">
        <p className="text-text-secondary text-center">计划不存在</p>
      </div>
    );
  }

  // Group exercises by day_of_week
  const exercisesByDay: Record<number, typeof plan.exercises> = {};
  for (let day = 1; day <= 7; day++) {
    exercisesByDay[day] = plan.exercises?.filter((e) => e.day_of_week === day) || [];
  }

  return (
    <div className="px-6 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-heading text-3xl font-bold">{plan.name}</h1>
        <StatusBadge status={plan.status} />
      </div>

      {/* Plan Info */}
      <Card className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-text-muted">目标</span>
            <p className="font-semibold text-text-primary">{goalLabels[plan.goal]}</p>
          </div>
          <div>
            <span className="text-text-muted">频率</span>
            <p className="font-semibold text-text-primary">每周{plan.frequency}次</p>
          </div>
          <div>
            <span className="text-text-muted">时长</span>
            <p className="font-semibold text-text-primary">{plan.duration_weeks}周</p>
          </div>
          <div>
            <span className="text-text-muted">经验</span>
            <p className="font-semibold text-text-primary">
              {plan.experience === 'beginner' ? '初级' : plan.experience === 'intermediate' ? '中级' : '高级'}
            </p>
          </div>
        </div>
      </Card>

      {/* Exercises by Day */}
      <div className="space-y-4 mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => {
          const exercises = exercisesByDay[day];
          if (!exercises || exercises.length === 0) return null;

          return (
            <Card key={day}>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-3">
                {dayLabels[day]}
              </h3>
              <ul className="space-y-2">
                {exercises.map((exercise, index) => (
                  <li
                    key={exercise.id || index}
                    className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                  >
                    <div>
                      <span className="text-text-primary font-medium">{exercise.exercise_name}</span>
                    </div>
                    <div className="text-sm text-text-secondary text-right">
                      <span>{exercise.sets}组 x {exercise.reps}次</span>
                      {exercise.weight && <span> @ {exercise.weight}kg</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {plan.status === 'draft' && (
          <Button variant="primary" onClick={handleActivate}>
            激活计划
          </Button>
        )}
        {plan.status === 'active' && (
          <Button variant="primary" onClick={handleStartExecution}>
            开始执行
          </Button>
        )}
        <Button variant="secondary" onClick={() => navigate('/plans')}>
          返回列表
        </Button>
      </div>
    </div>
  );
}