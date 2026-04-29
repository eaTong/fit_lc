// mini-program/src/subpkg/knowledge/muscles/detail.tsx
import { View, Text, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { useLoad } from '@tarojs/taro';
import { getMuscleDetail, type Muscle } from '../../../api/muscles';
import { getExercises } from '../../../api/exercises';
import ExerciseCard from '../../../components/ExerciseCard';
import './index.scss';

export default function MuscleDetail() {
  const [muscle, setMuscle] = useState<Muscle | null>(null);
  const [relatedExercises, setRelatedExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useLoad((params) => {
    loadMuscle(params.id);
  });

  const loadMuscle = async (id: number | string) => {
    setIsLoading(true);
    try {
      const [muscleData, exercisesData] = await Promise.all([
        getMuscleDetail(Number(id)),
        getExercises()
      ]);
      setMuscle(muscleData);
      // Filter exercises related to this muscle (simplified - would filter by muscleId in real app)
      setRelatedExercises(exercisesData.list.slice(0, 5));
    } catch (err) {
      console.error('Failed to load muscle:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !muscle) {
    return <View className="muscle-detail loading"><Text>加载中...</Text></View>;
  }

  return (
    <ScrollView className="muscle-detail" scrollY>
      <View className="header">
        <Text className="name">{muscle.name}</Text>
        <Text className="group">{muscle.group}</Text>
      </View>

      {muscle.function && (
        <View className="section">
          <Text className="section-title">肌肉功能</Text>
          <Text className="content">{muscle.function}</Text>
        </View>
      )}

      {muscle.origin && (
        <View className="section">
          <Text className="section-title">起点</Text>
          <Text className="content">{muscle.origin}</Text>
        </View>
      )}

      {muscle.insertion && (
        <View className="section">
          <Text className="section-title">止点</Text>
          <Text className="content">{muscle.insertion}</Text>
        </View>
      )}

      {muscle.trainingTips && (
        <View className="section">
          <Text className="section-title">训练技巧</Text>
          <Text className="content">{muscle.trainingTips}</Text>
        </View>
      )}

      {relatedExercises.length > 0 && (
        <View className="section">
          <Text className="section-title">关联动作</Text>
          {relatedExercises.map((ex) => (
            <ExerciseCard exercise={ex} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}