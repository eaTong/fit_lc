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
  completedWeight: number | null;
  completedReps: string;
}

interface ExerciseForEdit {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseForEdit | null>(null);

  useEffect(() => {
    if (id) {
      fetchPlan(parseInt(id));
    }
  }, [id, fetchPlan]);

  useEffect(() => {
    if (currentPlan?.exercises) {
      const statuses: Record<number, ExerciseStatus> = {};
      currentPlan.exercises.forEach((ex) => {
        if (ex.id) {
          statuses[ex.id] = {
            exerciseId: ex.id,
            completed: false,
            completedWeight: ex.targetWeight ?? ex.weight ?? null,
            completedReps: ex.targetReps ?? ex.reps ?? '8-12',
          };
        }
      });
      setExerciseStatuses(statuses);
    }
  }, [currentPlan]);

  const today = new Date();
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // Convert Sunday from 0 to 7

  const todayExercises = currentPlan?.exercises?.filter(
    (ex) => ex.day_of_week === dayOfWeek
  ) || [];

  const toggleExercise = (exerciseId: number) => {
    setExerciseStatuses((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        completed: !prev[exerciseId].completed,
      },
    }));
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

  const completedCount = Object.values(exerciseStatuses).filter(s => s.completed).length;

  const openExerciseEditor = (ex: typeof todayExercises[0]) => {
    if (!ex.id) return;
    const status = exerciseStatuses[ex.id];
    setEditingExercise({
      id: ex.id,
      exerciseName: ex.exercise_name,
      targetSets: ex.targetSets ?? ex.sets ?? 3,
      targetReps: status?.completedReps ?? ex.targetReps ?? ex.reps ?? '8-12',
      targetWeight: status?.completedWeight ?? ex.targetWeight ?? ex.weight ?? null,
    });
  };

  const handleEditSave = (updates: { targetSets: number; targetReps: string; targetWeight: number | null }) => {
    if (!editingExercise) return;
    setExerciseStatuses(prev => ({
      ...prev,
      [editingExercise.id]: {
        ...prev[editingExercise.id],
        completedWeight: updates.targetWeight,
        completedReps: updates.targetReps,
      },
    }));
    setEditingExercise(null);
  };

  if (!currentPlan) {
    return (
      <div className="px-6 py-4 text-center text-text-secondary">
        加载中...
      </div>
    );
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

      {todayExercises.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-text-secondary">今天没有安排训练</p>
          <Button
            variant="outline"
            onClick={() => navigate(`/plans/${id}`)}
            className="mt-4"
          >
            返回计划
          </Button>
        </Card>
      ) : (
        <>
          <div className="flex justify-center mb-8">
            <ExecutionProgressRing completed={completedCount} total={todayExercises.length} />
          </div>

          <div className="space-y-4 mb-6">
            {todayExercises.map((ex) => {
              const status = ex.id ? exerciseStatuses[ex.id] : null;
              const isCompleted = status?.completed || false;

              return (
                <Card key={ex.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 border-2 flex items-center justify-center cursor-pointer ${
                          isCompleted
                            ? 'bg-accent-primary border-accent-primary'
                            : 'border-text-muted'
                        }`}
                        onClick={() => ex.id && toggleExercise(ex.id)}
                      >
                        {isCompleted && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium ${isCompleted ? 'line-through text-text-muted' : ''}`}>
                          {ex.exercise_name}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          {ex.targetSets ?? ex.sets}组 × {status?.completedReps ?? ex.targetReps ?? ex.reps}
                          {status?.completedWeight ? ` × ${status.completedWeight}kg` : (ex.targetWeight ?? ex.weight ? ` × ${ex.targetWeight ?? ex.weight}kg` : '')}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openExerciseEditor(ex)}
                      className="text-accent-primary text-sm px-3 py-1 border border-accent-primary rounded hover:bg-accent-primary/10"
                    >
                      编辑
                    </button>
                  </div>
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
        </>
      )}

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
