import { View, Text } from '@tarojs/components';
import type { Exercise } from '../../api/exercises';
import './index.scss';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

export default function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <View className="exercise-card" onClick={onClick}>
      <View className="card-body">
        <Text className="name">{exercise.name}</Text>
        <View className="tags">
          <Text className="tag category">{exercise.category}</Text>
          <Text className="tag equipment">{exercise.equipment}</Text>
          <Text className="tag difficulty">{exercise.difficulty}</Text>
        </View>
      </View>
    </View>
  );
}