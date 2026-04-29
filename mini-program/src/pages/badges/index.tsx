import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { getBadges } from '../../api/achievements';
import type { Badge } from '../../api/achievements';
import './index.scss';

const TIER_COLORS: Record<string, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2'
};

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      const data = await getBadges();
      setBadges(data);
    } catch (err) {
      console.error('Failed to load badges:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const achieved = badges.filter((b) => b.achievedAt);
  const locked = badges.filter((b) => !b.achievedAt);

  if (isLoading) {
    return (
      <View className="badges-page loading">
        <Text className="loading-text">加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="badges-page" scrollY>
      <View className="section">
        <Text className="section-title">已获得 ({achieved.length})</Text>
        <View className="badge-grid">
          {achieved.map((badge) => (
            <View key={badge.id} className="badge-card earned">
              <View
                className="badge-icon"
                style={{ backgroundColor: TIER_COLORS[badge.tier] || '#888' }}
              >
                <Text className="icon">🏆</Text>
              </View>
              <Text className="badge-name">{badge.name}</Text>
              <Text className="badge-desc">{badge.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="section">
        <Text className="section-title">未解锁 ({locked.length})</Text>
        <View className="badge-grid">
          {locked.map((badge) => (
            <View key={badge.id} className="badge-card locked">
              <View className="badge-icon grayscale">
                <Text className="icon">🔒</Text>
              </View>
              <Text className="badge-name">{badge.name}</Text>
              <Text className="badge-desc">{badge.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}