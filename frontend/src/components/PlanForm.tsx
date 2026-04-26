import { FormEvent, useState } from 'react';
import type { UserProfile } from '../types';
import Input from './ui/Input';
import Button from './ui/Button';

interface PlanFormProps {
  onSubmit: (data: UserProfile) => Promise<void>;
  isLoading?: boolean;
}

const goalOptions = [
  { value: 'bulk', label: '增肌' },
  { value: 'cut', label: '减脂' },
  { value: 'maintain', label: '维持' },
];

const experienceOptions = [
  { value: 'beginner', label: '初学者' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
];

export default function PlanForm({ onSubmit, isLoading }: PlanFormProps) {
  const [goal, setGoal] = useState<UserProfile['goal']>('bulk');
  const [frequency, setFrequency] = useState(3);
  const [experience, setExperience] = useState<UserProfile['experience']>('beginner');
  const [durationWeeks, setDurationWeeks] = useState(12);
  const [equipment, setEquipment] = useState('');
  const [bodyWeight, setBodyWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [bodyFat, setBodyFat] = useState<number | ''>('');
  const [conditions, setConditions] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data: UserProfile = {
      goal,
      frequency,
      experience,
      duration_weeks: durationWeeks,
      equipment,
      body_weight: bodyWeight as number,
      height: height as number,
      body_fat: bodyFat || undefined,
      conditions: conditions || undefined,
    };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Goal */}
        <div>
          <label className="block text-text-secondary text-sm mb-1">训练目标</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as UserProfile['goal'])}
            className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange transition-colors duration-150"
          >
            {goalOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Frequency */}
        <Input
          label="每周训练次数"
          type="number"
          min={1}
          max={7}
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
        />

        {/* Experience */}
        <div>
          <label className="block text-text-secondary text-sm mb-1">训练经验</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as UserProfile['experience'])}
            className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange transition-colors duration-150"
          >
            {experienceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <Input
          label="计划周期（周）"
          type="number"
          min={1}
          max={52}
          value={durationWeeks}
          onChange={(e) => setDurationWeeks(Number(e.target.value))}
        />

        {/* Equipment */}
        <Input
          label="可用器械"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          placeholder="例如：哑铃、杠铃、跑步机"
        />

        {/* Body Weight */}
        <Input
          label="体重（kg）"
          type="number"
          min={30}
          max={200}
          value={bodyWeight}
          onChange={(e) => setBodyWeight(e.target.value ? Number(e.target.value) : '')}
          placeholder="例如：70"
        />

        {/* Height */}
        <Input
          label="身高（cm）"
          type="number"
          min={100}
          max={220}
          value={height}
          onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
          placeholder="例如：175"
        />

        {/* Body Fat (optional) */}
        <Input
          label="体脂率（%）可选"
          type="number"
          min={5}
          max={50}
          step={0.1}
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value ? Number(e.target.value) : '')}
          placeholder="例如：18.5"
        />
      </div>

      {/* Conditions (optional) */}
      <div>
        <label className="block text-text-secondary text-sm mb-1">身体状况/伤病（可选）</label>
        <textarea
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          rows={3}
          placeholder="如有伤病或身体状况请在此说明"
          className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-orange transition-colors duration-150 resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? '生成中...' : '生成健身计划'}
      </Button>
    </form>
  );
}