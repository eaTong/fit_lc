import { type Badge } from '../../api/achievement';
import BadgeCard from './BadgeCard';

interface BadgeGridProps {
  badges: Badge[];
}

export default function BadgeGrid({ badges }: BadgeGridProps) {
  if (badges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">暂无徽章记录</p>
        <p className="text-text-muted text-sm mt-2">完成训练即可获得徽章</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <BadgeCard key={badge.id} badge={badge} />
      ))}
    </div>
  );
}
