// mini-program/src/subpkg/knowledge/exercises/detail.tsx
import { View, Text, RichText, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { useLoad } from '@tarojs/taro';
import { getExerciseDetail, type Exercise } from '../../../api/exercises';
import './index.scss';

export default function ExerciseDetail() {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useLoad((params) => {
    loadExercise(params.id);
  });

  const loadExercise = async (id: number | string) => {
    setIsLoading(true);
    try {
      const data = await getExerciseDetail(Number(id));
      setExercise(data);
    } catch (err) {
      console.error('Failed to load exercise:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !exercise) {
    return <View className="exercise-detail loading"><Text>加载中...</Text></View>;
  }

  return (
    <ScrollView className="exercise-detail" scrollY>
      <View className="header">
        <Text className="name">{exercise.name}</Text>
        <View className="tags">
          <Text className="tag category">{exercise.category}</Text>
          <Text className="tag equipment">{exercise.equipment}</Text>
          <Text className="tag difficulty">{exercise.difficulty}</Text>
          {exercise.exerciseType && <Text className="tag type">{exercise.exerciseType}</Text>}
        </View>
      </View>

      {exercise.description && (
        <View className="section">
          <Text className="section-title">动作说明</Text>
          <RichText nodes={exercise.description} className="content" />
        </View>
      )}

      {exercise.steps && (
        <View className="section">
          <Text className="section-title">动作步骤</Text>
          <RichText nodes={exercise.steps} className="content" />
        </View>
      )}

      {exercise.safetyNotes && (
        <View className="section">
          <Text className="section-title">安全注意事项</Text>
          <RichText nodes={exercise.safetyNotes} className="content warning" />
        </View>
      )}

      {exercise.commonMistakes && (
        <View className="section">
          <Text className="section-title">常见错误</Text>
          <RichText nodes={exercise.commonMistakes} className="content" />
        </View>
      )}

      {exercise.adjustmentNotes && (
        <View className="section">
          <Text className="section-title">细节调整</Text>
          <RichText nodes={exercise.adjustmentNotes} className="content" />
        </View>
      )}

      {exercise.conversionGuide && (
        <View className="section">
          <Text className="section-title">变体转换指南</Text>
          <RichText nodes={JSON.stringify(exercise.conversionGuide)} className="content" />
        </View>
      )}
    </ScrollView>
  );
}