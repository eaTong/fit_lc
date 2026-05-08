import type { Measurement } from '../types';

interface MeasurementCardProps {
  measurement?: Measurement;
  onDelete?: (id: number) => void;
  bodyPart?: string;
  label?: string;
  value?: number | null;
  date?: string;
  trend?: 'up' | 'down' | 'flat';
  onClick?: () => void;
  className?: string;
}

const trendColors = {
  up: 'text-red-500',
  down: 'text-green-500',
  flat: 'text-text-muted',
};

const trendIcons = {
  up: '↑',
  down: '↓',
  flat: '—',
};

// Body part English to Chinese mapping
const bodyPartLabels: Record<string, string> = {
  chest: '胸围',
  waist: '腰围',
  hips: '臀围',
  biceps: '臂围',
  biceps_l: '左臂围',
  biceps_r: '右臂围',
  thighs: '大腿围',
  thigh_l: '左大腿围',
  thigh_r: '右大腿围',
  calves: '小腿围',
  calf_l: '左小腿围',
  calf_r: '右小腿围',
  weight: '体重',
  bodyFat: '体脂率',
};

export default function MeasurementCard({ label, value, date, trend, onClick, onDelete, measurement, className = '' }: MeasurementCardProps) {
  // If measurement is provided, derive label and value from its first item (History page)
  const rawBodyPart = measurement?.items[0] ? measurement.items[0].bodyPart : '';
  const displayLabel = label ?? (rawBodyPart ? (bodyPartLabels[rawBodyPart] || rawBodyPart) : '');
  const displayValue = value ?? measurement?.items[0]?.value ?? null;
  const displayDate = date ?? measurement?.date;

  const handleClick = () => {
    if (onDelete && measurement) {
      onDelete(measurement.id);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-primary-tertiary transition-colors ${className}`}
    >
      <div>
        <span className="text-text-primary">{displayLabel}</span>
        {displayDate && <span className="text-text-muted text-xs ml-2">{displayDate}</span>}
      </div>
      <div className="flex items-center gap-2">
        {displayValue !== null ? (
          <>
            <span className="text-text-primary font-heading">{displayValue}</span>
            <span className="text-text-muted text-sm">{rawBodyPart === 'weight' || rawBodyPart === 'bodyFat' ? '' : 'cm'}</span>
            {trend && (
              <span className={`text-lg ${trendColors[trend]}`}>{trendIcons[trend]}</span>
            )}
          </>
        ) : (
          <span className="text-text-muted">—</span>
        )}
      </div>
    </div>
  );
}