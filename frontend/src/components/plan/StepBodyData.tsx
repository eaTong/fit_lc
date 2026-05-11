import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  initialData: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function StepBodyData({ initialData, onComplete, onBack }: Props) {
  const [height, setHeight] = useState(initialData.height || '');
  const [bodyWeight, setBodyWeight] = useState(initialData.body_weight || '');
  const [bodyFat, setBodyFat] = useState(initialData.body_fat || '');
  const [conditions, setConditions] = useState(initialData.conditions || '');
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">基本身体数据（帮助计算合适的重量）</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="身高 (cm)"
            type="number"
            value={height}
            onChange={(v) => setHeight(v)}
            placeholder="175"
          />
          <Input
            label="体重 (kg)"
            type="number"
            value={bodyWeight}
            onChange={(v) => setBodyWeight(v)}
            placeholder="70"
          />
        </div>
      </div>

      <button
        onClick={() => setShowMore(!showMore)}
        className="text-accent-primary text-sm"
      >
        {showMore ? '▲ 收起' : '▼ 更多选项'}（体脂率、伤病情况等）
      </button>

      {showMore && (
        <div className="space-y-4">
          <Input
            label="体脂率 (%) 可选"
            type="number"
            step="0.1"
            value={bodyFat}
            onChange={(v) => setBodyFat(v)}
            placeholder="18.5"
          />
          <div>
            <label className="block text-text-secondary text-sm mb-1">伤病/身体状况（可选）</label>
            <textarea
              value={conditions}
              onChange={e => setConditions(e.target.value)}
              rows={2}
              placeholder="如有伤病或身体状况请在此说明"
              className="w-full bg-primary-secondary border-2 border-border rounded px-4 py-2 text-text-primary"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>← 上一步</Button>
        <Button
          variant="primary"
          onClick={() => onComplete({
            height: Number(height),
            body_weight: Number(bodyWeight),
            body_fat: bodyFat ? Number(bodyFat) : undefined,
            conditions: conditions || undefined
          })}
          disabled={!height || !bodyWeight}
        >
          生成计划
        </Button>
      </div>
    </div>
  );
}
