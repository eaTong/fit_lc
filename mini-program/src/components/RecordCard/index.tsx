import { View, Text } from '@tarojs/components';
import type { Workout, Measurement } from '../../api/records';
import './index.scss';

interface RecordCardProps {
  type: 'workout' | 'measurement';
  data: Workout | Measurement;
  onClick?: () => void;
}

export default function RecordCard({ type, data, onClick }: RecordCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  if (type === 'workout') {
    const workout = data as Workout;
    return (
      <View className="record-card" onClick={onClick}>
        <View className="card-header">
          <Text className="date">{formatDate(workout.date)}</Text>
        </View>
        <View className="exercises">
          {workout.exercises.map((ex, i) => (
            <Text key={i} className="exercise-tag">
              {ex.exerciseName} {ex.sets}组×{ex.reps} {ex.weight > 0 ? `${ex.weight}kg` : ''}
            </Text>
          ))}
        </View>
      </View>
    );
  }

  const measurement = data as Measurement;
  return (
    <View className="record-card" onClick={onClick}>
      <View className="card-header">
        <Text className="date">{formatDate(measurement.date)}</Text>
      </View>
      <View className="measurements">
        {measurement.items.map((item, i) => (
          <Text key={i} className="measurement-tag">
            {item.bodyPart} {item.value}cm
          </Text>
        ))}
      </View>
    </View>
  );
}