import type { Measurement } from '../types';
import Button from './ui/Button';

interface MeasurementCardProps {
  measurement: Measurement;
  onDelete: (id: number) => void;
}

const bodyPartLabels: Record<string, string> = {
  chest: '胸围',
  waist: '腰围',
  hips: '臀围',
  biceps: '臂围',
  thighs: '腿围',
  calves: '小腿围',
  other: '其他',
};

export default function MeasurementCard({ measurement, onDelete }: MeasurementCardProps) {
  return (
    <div className="bg-primary-secondary border-2 border-border p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-heading font-semibold text-lg">{measurement.date}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(measurement.id)}
        >
          删除
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {measurement.items.map((item, idx) => (
          <div key={idx} className="text-text-secondary">
            <span className="text-text-primary">{bodyPartLabels[item.bodyPart]}</span>
            <span className="ml-1">{item.value}cm</span>
          </div>
        ))}
      </div>
    </div>
  );
}