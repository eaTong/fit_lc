import { useEffect } from 'react';
import { useAchievementStore } from '../stores/achievementStore';
import BadgeGrid from '../components/badge/BadgeGrid';
import Card from '../components/ui/Card';

export default function Badges() {
  const { badges, fetchBadges, isLoading } = useAchievementStore();

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold">我的徽章</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">加载中...</p>
        </div>
      ) : (
        <Card>
          <BadgeGrid badges={badges} />
        </Card>
      )}
    </div>
  );
}
