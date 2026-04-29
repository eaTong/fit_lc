import { type CumulativeStats } from '../../api/achievement';

interface CumulativeStatsCardProps {
  stats: CumulativeStats;
  isLoading?: boolean;
}

export default function CumulativeStatsCard({ stats, isLoading }: CumulativeStatsCardProps) {
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}k`;
    }
    return volume.toString();
  };

  return (
    <div className="bg-primary-tertiary rounded p-4" data-testid="cumulative-stats-card">
      <h3 className="font-heading text-sm font-semibold text-text-secondary mb-3">
        📊 累计数据
      </h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center" data-testid="total-workouts">
          <div className="text-xl font-bold text-accent-orange">
            {isLoading ? '—' : stats.totalWorkouts}
          </div>
          <div className="text-xs text-text-secondary">总训练次</div>
        </div>
        <div className="text-center" data-testid="total-volume">
          <div className="text-xl font-bold text-accent-orange">
            {isLoading ? '—' : formatVolume(stats.totalVolume)}
          </div>
          <div className="text-xs text-text-secondary">总训练量</div>
        </div>
        <div className="text-center" data-testid="streak-days">
          <div className="text-xl font-bold text-accent-orange">
            {isLoading ? '—' : stats.streakDays}
          </div>
          <div className="text-xs text-text-secondary">最长连续</div>
        </div>
      </div>
    </div>
  );
}
