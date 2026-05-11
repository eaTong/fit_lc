import { useState } from 'react';
import Button from '../ui/Button';

const equipmentOptions = [
  { value: '哑铃', label: '哑铃' },
  { value: '杠铃', label: '杠铃' },
  { value: '龙门架', label: '龙门架' },
  { value: '器械', label: '器械' },
  { value: '跑步机', label: '跑步机' },
  { value: '拉力带', label: '拉力带' },
  { value: '自重', label: '自重' },
];

const experienceOptions = [
  { value: 'beginner', label: '初学者' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
];

interface Props {
  initialData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function StepFrequencyEquipment({ initialData, onNext, onBack }: Props) {
  const [frequency, setFrequency] = useState(initialData.frequency || 3);
  const [equipment, setEquipment] = useState<string[]>(
    initialData.equipment ? initialData.equipment.split(',').map((e: string) => e.trim()) : []
  );
  const [experience, setExperience] = useState(initialData.experience || 'beginner');

  const toggleEquipment = (eq: string) => {
    setEquipment(prev =>
      prev.includes(eq) ? prev.filter(e => e !== eq) : [...prev, eq]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">每周训练几次？</h3>
        <div className="flex gap-3 flex-wrap">
          {[2, 3, 4, 5, 6].map(f => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={`px-4 py-2 border-2 rounded ${
                frequency === f
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              {f}次
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">可用器械（多选）</h3>
        <div className="grid grid-cols-4 gap-3">
          {equipmentOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleEquipment(opt.value)}
              className={`px-3 py-2 border-2 rounded ${
                equipment.includes(opt.value)
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">训练经验</h3>
        <div className="flex gap-3">
          {experienceOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setExperience(opt.value)}
              className={`px-4 py-2 border-2 rounded ${
                experience === opt.value
                  ? 'border-accent-primary bg-primary-secondary'
                  : 'border-border hover:border-accent-primary/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>← 上一步</Button>
        <Button
          variant="primary"
          onClick={() => onNext({ frequency, equipment: equipment.join(','), experience })}
          disabled={equipment.length === 0}
        >
          下一步 →
        </Button>
      </div>
    </div>
  );
}
