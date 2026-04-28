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

export default function MeasurementCard({ label, value, date, trend, onClick, onDelete, measurement }: MeasurementCardProps) {
  // If measurement is provided, derive label and value from its first item (History page)
  const displayLabel = label ?? (measurement?.items[0] ? measurement.items[0].bodyPart : '');
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
      className="flex justify-between items-center py-3 px-4 border-b border-border cursor-pointer hover:bg-primary-tertiary transition-colors"
    >
      <div>
        <span className="text-text-primary">{displayLabel}</span>
        {displayDate && <span className="text-text-muted text-xs ml-2">{displayDate}</span>}
      </div>
      <div className="flex items-center gap-2">
        {displayValue !== null ? (
          <>
            <span className="text-text-primary font-heading">{displayValue}</span>
            <span className="text-text-muted text-sm">cm</span>
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