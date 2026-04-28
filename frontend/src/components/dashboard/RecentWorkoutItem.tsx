// frontend/src/components/dashboard/RecentWorkoutItem.tsx
import type { Workout } from '../../types';

interface RecentWorkoutItemProps {
  workout: Workout;
}

export default function RecentWorkoutItem({ workout }: RecentWorkoutItemProps) {
  const totalVolume = workout.exercises.reduce((sum, ex) => {
    return sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0);
  }, 0);

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <div>
        <p className="text-text-primary font-medium">{workout.date}</p>
        <p className="text-text-secondary text-sm truncate max-w-[200px]">
          {workout.exercises.map((ex) => ex.exerciseName).join(', ')}
        </p>
      </div>
      <div className="text-right flex-shrink-0 ml-4">
        <p className="text-text-primary font-heading">{workout.exercises.length} 个动作</p>
        {totalVolume > 0 && (
          <p className="text-text-secondary text-xs">
            {totalVolume.toLocaleString()} kg
          </p>
        )}
      </div>
    </div>
  );
}