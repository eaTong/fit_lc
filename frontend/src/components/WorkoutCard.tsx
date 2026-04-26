import type { Workout } from '../types';
import Button from './ui/Button';

interface WorkoutCardProps {
  workout: Workout;
  onDelete: (id: number) => void;
}

export default function WorkoutCard({ workout, onDelete }: WorkoutCardProps) {
  return (
    <div className="bg-primary-secondary border-2 border-border p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-heading font-semibold text-lg">{workout.date}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(workout.id)}
        >
          删除
        </Button>
      </div>

      <div className="space-y-2">
        {workout.exercises.map((ex) => (
          <div key={ex.id} className="text-text-secondary">
            <span className="text-text-primary font-medium">{ex.exerciseName}</span>
            {ex.sets && ex.sets.length > 0 && (
              <span className="ml-2">
                {ex.sets.map((s) => `${s.weight}kg×${s.reps}`).join(', ')}
              </span>
            )}
            {ex.distance && <span className="ml-2">{ex.distance}km</span>}
            {ex.duration && <span className="ml-2">{ex.duration}分钟</span>}
          </div>
        ))}
      </div>
    </div>
  );
}