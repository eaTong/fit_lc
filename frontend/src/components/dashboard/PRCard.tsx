import { type PersonalRecord } from '../../api/achievement';

interface PRCardProps {
  personalRecords: PersonalRecord[];
}

const recordTypeUnits: Record<string, string> = {
  weight: 'kg',
  reps: '次',
  duration: '分钟',
  distance: 'km',
};

export default function PRCard({ personalRecords }: PRCardProps) {
  const topPRs = personalRecords.slice(0, 3);

  if (topPRs.length === 0) {
    return (
      <div className="bg-primary-secondary rounded p-4">
        <h3 className="font-heading text-sm font-semibold text-text-secondary mb-2">
          🏆 个人最佳
        </h3>
        <p className="text-text-muted text-sm text-center py-4">暂无记录</p>
      </div>
    );
  }

  return (
    <div className="bg-primary-secondary rounded p-4" data-testid="pr-card">
      <h3 className="font-heading text-sm font-semibold text-text-secondary mb-3">
        🏆 个人最佳
      </h3>
      <div className="space-y-2">
        {topPRs.map((pr) => (
          <div
            key={`${pr.exerciseName}-${pr.recordType}`}
            className="flex items-center justify-between"
            data-testid="pr-card-item"
          >
            <span className="text-text-primary text-sm">{pr.exerciseName}</span>
            <span className="text-accent-orange font-medium text-sm">
              {pr.bestValue}
              <span className="text-text-secondary text-xs ml-1">
                {recordTypeUnits[pr.recordType] || ''}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
