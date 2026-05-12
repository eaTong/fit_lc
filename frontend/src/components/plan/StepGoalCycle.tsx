import { useState } from 'react';
import Button from '../ui/Button';

const goalOptions = [
  { value: 'bulk', label: '增肌', icon: '💪', desc: '+肌肉量' },
  { value: 'cut', label: '减脂', icon: '🔥', desc: '-体脂率' },
  { value: 'maintain', label: '维持', icon: '⚖️', desc: '保持现状' },
];

const cycleOptions = [4, 8, 12, 24];

interface Props {
  initialData: any;
  onNext: (data: any) => void;
}

export default function StepGoalCycle({ initialData, onNext }: Props) {
  const [goal, setGoal] = useState(initialData.goal || 'bulk');
  const [cycle, setCycle] = useState(initialData.duration_weeks || 12);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">选择您的训练目标</h3>
        <div className="grid grid-cols-3 gap-4">
          {goalOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setGoal(opt.value)}
              className={`p-4 border-2 rounded transition-colors ${
                goal === opt.value
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              <div className="text-2xl mb-2">{opt.icon}</div>
              <div className="font-medium">{opt.label}</div>
              <div className="text-sm text-text-secondary">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">计划周期</h3>
        <div className="flex gap-3">
          {cycleOptions.map(c => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className={`px-4 py-2 border-2 rounded ${
                cycle === c
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              {c}周
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => onNext({ goal, duration_weeks: cycle })}>
          下一步 →
        </Button>
      </div>
    </div>
  );
}
