import { type Badge } from '../../api/achievement';

interface BadgeCardProps {
  badge: Badge;
}

const tierColors: Record<string, { bg: string; border: string; text: string }> = {
  bronze: { bg: 'bg-amber-900/30', border: 'border-amber-700', text: 'text-amber-400' },
  silver: { bg: 'bg-gray-600/30', border: 'border-gray-400', text: 'text-gray-300' },
  gold: { bg: 'bg-yellow-800/30', border: 'border-yellow-500', text: 'text-yellow-400' },
  platinum: { bg: 'bg-purple-900/30', border: 'border-purple-400', text: 'text-purple-300' },
};

export default function BadgeCard({ badge }: BadgeCardProps) {
  const tierStyle = tierColors[badge.tier] || tierColors.bronze;
  const isEarned = !!badge.achievedAt;

  return (
    <div
      className={`p-4 rounded border ${
        isEarned ? tierStyle.bg : 'bg-primary-tertiary opacity-50'
      } ${isEarned ? tierStyle.border : 'border-border'} relative`}
    >
      {!isEarned && (
        <div className="absolute top-2 right-2 text-text-muted text-xs">🔒</div>
      )}

      <div className="text-center">
        <div
          className={`text-3xl mb-2 ${isEarned ? '' : 'grayscale opacity-50'}`}
        >
          🎖️
        </div>
        <h3 className={`font-heading text-sm font-semibold ${isEarned ? tierStyle.text : 'text-text-secondary'}`}>
          {badge.name}
        </h3>
        <p className="text-text-muted text-xs mt-1 line-clamp-2">
          {badge.description}
        </p>
        {isEarned && badge.achievedAt && (
          <p className="text-text-muted text-xs mt-2">
            获得于 {new Date(badge.achievedAt).toLocaleDateString('zh-CN')}
          </p>
        )}
      </div>
    </div>
  );
}
