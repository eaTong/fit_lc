interface MeasurementCardProps {
  bodyPart: string;
  label: string;
  value: number | null;
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

export default function MeasurementCard({ bodyPart, label, value, date, trend, onClick }: MeasurementCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center py-3 px-4 border-b border-border cursor-pointer hover:bg-primary-tertiary transition-colors ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div>
        <span className="text-text-primary">{label}</span>
        {date && <span className="text-text-muted text-xs ml-2">{date}</span>}
      </div>
      <div className="flex items-center gap-2">
        {value !== null ? (
          <>
            <span className="text-text-primary font-heading">{value}</span>
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