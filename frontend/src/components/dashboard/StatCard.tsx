import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: string; // emoji e.g. "🔥"
}

export default function StatCard({ title, value, unit, subtitle, icon }: StatCardProps) {
  return (
    <Card className="flex flex-col justify-between min-h-[120px]">
      <div className="flex items-start justify-between">
        <span className="text-text-secondary text-sm font-medium uppercase tracking-wide">
          {title}
        </span>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="font-heading text-3xl font-bold text-text-primary">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span className="text-text-secondary text-lg">{unit}</span>}
      </div>
      {subtitle && <p className="text-text-secondary text-xs mt-1">{subtitle}</p>}
    </Card>
  );
}