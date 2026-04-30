import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useAchievementStore } from '../stores/achievementStore';
import { userApi } from '../api/user';
import { achievementApi } from '../api/achievement';

interface UserProfile {
  nickname?: string;
  avatar?: string;
  height?: number;
}

interface BodyMetric {
  weight: number;
  bodyFat?: number;
}

interface AchievementStats {
  total_workouts?: { value: number };
  total_volume?: { value: number };
  streak_days?: { value: number };
}

export default function Profile() {
  const { user } = useAuthStore();
  const { badges, fetchBadges } = useAchievementStore();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [latestMetric, setLatestMetric] = useState<BodyMetric | null>(null);
  const [stats, setStats] = useState<AchievementStats>({});

  useEffect(() => {
    loadProfile();
    loadStats();
    fetchBadges();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await userApi.getProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to load profile:', err);
    }

    try {
      const metrics = await userApi.getMetrics(1, 1);
      if (metrics.records.length > 0) {
        setLatestMetric(metrics.records[0]);
      }
    } catch (err) {
      console.error('Failed to load metrics:', err);
    }
  };

  const loadStats = async () => {
    try {
      const { stats: achievementStats } = await achievementApi.getStats();
      setStats(achievementStats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const totalWorkouts = stats.total_workouts?.value || 0;
  const totalVolume = stats.total_volume?.value || 0;
  const streakDays = stats.streak_days?.value || 0;
  const badgeCount = badges.length;

  const bmi = profile?.height && latestMetric?.weight
    ? (latestMetric.weight / Math.pow(profile.height / 100, 2)).toFixed(1)
    : null;

  return (
    <div className="px-6 py-4">
      {/* 头像 + 昵称行 */}
      <Link
        to="/settings/profile"
        className="flex items-center justify-between p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-tertiary border-2 border-border flex items-center justify-center">
            {profile?.avatar ? (
              <img src={profile.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-2xl">👤</span>
            )}
          </div>
          <span className="text-text-primary font-heading text-lg">
            {profile?.nickname || user?.email || '未设置昵称'}
          </span>
        </div>
        <span className="text-text-secondary">→</span>
      </Link>

      {/* 统计行 */}
      <div
        className="flex items-center gap-2 p-4 bg-tertiary rounded border border-border mb-4 overflow-x-auto"
        onClick={() => navigate('/calendar')}
        style={{ cursor: 'pointer' }}
      >
        <span className="text-text-secondary text-sm whitespace-nowrap">
          训练天数 <span className="text-text-primary font-medium">{totalWorkouts}</span>
        </span>
        <span className="text-border">·</span>
        <span className="text-text-secondary text-sm whitespace-nowrap">
          连续天数 <span className="text-text-primary font-medium">{streakDays}</span>
        </span>
        <span className="text-border">·</span>
        <span className="text-text-secondary text-sm whitespace-nowrap">
          总训练量 <span className="text-text-primary font-medium">{(totalVolume / 1000).toFixed(0)}</span>吨
        </span>
        <span className="text-border">·</span>
        <span
          className="text-accent-orange text-sm whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/badges');
          }}
        >
          徽章 <span className="font-medium">{badgeCount}</span>
        </span>
      </div>

      {/* 身体数据行 */}
      <Link
        to="/settings/body"
        className="flex items-center justify-between p-4 bg-tertiary rounded border border-border mb-4"
      >
        <div className="flex items-center gap-4 text-sm">
          <span className="text-text-secondary">
            身高 <span className="text-text-primary font-medium">{profile?.height || '--'}</span>cm
          </span>
          <span className="text-border">·</span>
          <span className="text-text-secondary">
            体重 <span className="text-text-primary font-medium">{latestMetric?.weight || '--'}</span>kg
          </span>
          <span className="text-border">·</span>
          <span className="text-text-secondary">
            体脂 <span className="text-text-primary font-medium">{latestMetric?.bodyFat || '--'}</span>%
          </span>
          <span className="text-border">·</span>
          <span className="text-accent-orange">
            BMI <span className="font-medium">{bmi || '--'}</span>
          </span>
        </div>
        <span className="text-text-secondary">→</span>
      </Link>

      {/* 开始训练 */}
      <Link
        to="/chat"
        className="flex items-center justify-center gap-2 w-full p-4 bg-accent-orange text-white font-heading font-medium rounded border-2 border-accent-orange hover:bg-accent-red hover:border-accent-red transition-all duration-150 mb-6"
      >
        开始训练
      </Link>

      {/* 快速入口 */}
      <div className="grid grid-cols-3 gap-3">
        <Link
          to="/measurements"
          className="flex flex-col items-center gap-2 p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-2xl">📏</span>
          <div className="text-center">
            <div className="text-text-primary text-sm">围度</div>
          </div>
        </Link>

        <Link
          to="/plans"
          className="flex flex-col items-center gap-2 p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-2xl">🏋️</span>
          <div className="text-center">
            <div className="text-text-primary text-sm">计划</div>
          </div>
        </Link>

        <Link
          to="/gallery"
          className="flex flex-col items-center gap-2 p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-2xl">🖼️</span>
          <div className="text-center">
            <div className="text-text-primary text-sm">相册</div>
          </div>
        </Link>
      </div>
    </div>
  );
}