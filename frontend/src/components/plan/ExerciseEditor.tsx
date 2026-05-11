import { useState } from 'react';
import Button from '../ui/Button';

interface Exercise {
  id?: number;
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  targetWeight: number | null;
}

interface Props {
  exercise: Exercise;
  onSave: (updates: Partial<Exercise>) => void;
  onCancel: () => void;
}

export default function ExerciseEditor({ exercise, onSave, onCancel }: Props) {
  const [sets, setSets] = useState(exercise.targetSets);
  const [reps, setReps] = useState(exercise.targetReps);
  const [weight, setWeight] = useState(exercise.targetWeight?.toString() || '');

  const handleSave = () => {
    onSave({
      targetSets: sets,
      targetReps: reps,
      targetWeight: weight ? Number(weight) : null
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-primary rounded-lg p-6 w-80 space-y-4">
        <h3 className="font-bold text-lg">编辑动作 - {exercise.exerciseName}</h3>

        <div>
          <label className="text-sm text-text-secondary">组数</label>
          <div className="flex gap-2 mt-1">
            {[3, 4, 5, 6].map(n => (
              <button
                key={n}
                onClick={() => setSets(n)}
                className={`w-10 h-10 rounded ${
                  sets === n ? 'bg-accent-primary' : 'bg-primary-secondary'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary">每组次数</label>
          <input
            type="text"
            value={reps}
            onChange={e => setReps(e.target.value)}
            className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 mt-1"
            placeholder="8-12"
          />
        </div>

        <div>
          <label className="text-sm text-text-secondary">重量 (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 mt-1"
            placeholder="60"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onCancel}>取消</Button>
          <Button variant="primary" onClick={handleSave}>确认完成</Button>
        </div>
      </div>
    </div>
  );
}