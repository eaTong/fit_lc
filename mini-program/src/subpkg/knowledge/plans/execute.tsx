// mini-program/src/subpkg/knowledge/plans/execute.tsx
import { View, Text, Button, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { useLoad, useShow } from '@tarojs/taro';
import { usePlanStore } from '../../../store/plan';
import { getPlanDetail, executePlan } from '../../../api/plans';
import type { Plan } from '../../../api/plans';
import Taro from '@tarojs/taro';
import './index.scss';

export default function PlanExecute() {
  const { currentPlan, setCurrentPlan } = usePlanStore();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useLoad((params) => {
    loadPlan(params.id);
  });

  useShow(() => {
    if (currentPlan) {
      setPlan(currentPlan);
    }
  });

  const loadPlan = async (id: number | string) => {
    setIsLoading(true);
    try {
      const data = await getPlanDetail(Number(id));
      setPlan(data);
      setCurrentPlan(data);
    } catch (err) {
      console.error('Failed to load plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExercise = (exerciseId: number) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  const handleComplete = async () => {
    if (!plan) return;

    try {
      await executePlan(plan.id, {
        completedExerciseIds: Array.from(completedExercises)
      });
      Taro.showToast({ title: '打卡成功', icon: 'success' });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    } catch (err) {
      console.error('Failed to complete execution:', err);
      Taro.showToast({ title: '打卡失败', icon: 'none' });
    }
  };

  const progress = plan ? (completedExercises.size / plan.exercises.length) * 100 : 0;

  if (isLoading || !plan) {
    return <View className="plan-execute loading"><Text>加载中...</Text></View>;
  }

  return (
    <View className="plan-execute">
      <View className="header">
        <Text className="plan-name">{plan.name}</Text>
        <View className="progress-bar">
          <View className="progress-fill" style={{ width: `${progress}%` }} />
        </View>
        <Text className="progress-text">
          {completedExercises.size} / {plan.exercises.length} 已完成
        </Text>
      </View>

      <ScrollView className="exercise-list" scrollY>
        {plan.exercises.map((exercise) => (
          <View
            key={exercise.id}
            className={`exercise-item ${completedExercises.has(exercise.id) ? 'completed' : ''}`}
            onClick={() => toggleExercise(exercise.id)}
          >
            <View className="checkbox">
              {completedExercises.has(exercise.id) && <Text className="check">✓</Text>}
            </View>
            <View className="exercise-info">
              <Text className="exercise-name">{exercise.exerciseName}</Text>
              <Text className="exercise-detail">
                {exercise.sets}组 × {exercise.reps}次
                {exercise.weight > 0 ? ` @ ${exercise.weight}kg` : ''}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="footer">
        <Button
          className="complete-btn"
          onClick={handleComplete}
          disabled={completedExercises.size === 0}
        >
          完成打卡
        </Button>
      </View>
    </View>
  );
}