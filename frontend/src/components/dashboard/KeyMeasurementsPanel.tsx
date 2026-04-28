import Card from '../ui/Card';
import type { Measurement } from '../../types';

interface KeyMeasurementsPanelProps {
  measurement: Measurement | null;
}

const BODY_PART_LABELS: Record<string, string> = {
  chest: '胸围',
  waist: '腰围',
  biceps: '臂围',
};

export default function KeyMeasurementsPanel({ measurement }: KeyMeasurementsPanelProps) {
  if (!measurement) {
    return (
      <Card className="min-h-[180px] flex flex-col items-center justify-center">
        <p className="text-text-secondary text-center">暂无围度记录</p>
        <p className="text-text-secondary text-xs text-center mt-1">
          在对话中记录即可查看
        </p>
      </Card>
    );
  }

  const keyParts = ['chest', 'waist', 'biceps'] as const;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-text-primary">关键围度</h3>
        <span className="text-text-secondary text-sm">{measurement.date}</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {keyParts.map((part) => {
          const item = measurement.items.find((i) => i.bodyPart === part);
          return (
            <div key={part} className="text-center">
              <p className="text-text-secondary text-xs uppercase mb-1">
                {BODY_PART_LABELS[part]}
              </p>
              <p className="font-heading text-2xl font-bold text-text-primary">
                {item ? item.value : '—'}
              </p>
              <p className="text-text-secondary text-xs">cm</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}