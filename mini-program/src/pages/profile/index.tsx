// mini-program/src/pages/profile/index.tsx
import { View, Text, Image, Button, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { useAuthStore } from '../../store/auth';
import { getStats } from '../../api/achievements';
import { getPlans } from '../../api/plans';
import type { Stats } from '../../api/achievements';
import type { Plan } from '../../api/plans';
import './index.scss';

export default function ProfilePage() {
  const { user, clearAuth } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, plansData] = await Promise.all([
        getStats(),
        getPlans()
      ]);
      setStats(statsData);
      setPlans(plansData);

      const activePlan = plansData.find((p: Plan) => p.status === 'active');
      if (activePlan) setCurrentPlan(activePlan);
    } catch (err) {
      console.error('Failed to load profile data:', err);
    }
  };

  const handleLogout = () => {
    Taro.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          clearAuth();
          Taro.reLaunch({ url: '/pages/chat/index' });
        }
      }
    });
  };

  const handlePlanClick = (plan: Plan) => {
    setCurrentPlan(plan);
    Taro.navigateTo({ url: `/subpkg/knowledge/plans/execute?id=${plan.id}` });
  };

  const activePlan = plans.find((p) => p.status === 'active');

  return (
    <ScrollView className="profile-page" scrollY>
      <View className="user-card">
        <Image
          className="avatar"
          src={user?.avatar || 'https://via.placeholder.com/120'}
          mode="aspectFill"
        />
        <View className="user-info">
          <Text className="nickname">{user?.nickname || '用户'}</Text>
          <Text className="stats">累计训练 {stats?.totalWorkouts || 0} 次</Text>
        </View>
      </View>

      <View className="streak-card" onClick={() => Taro.navigateTo({ url: '/pages/calendar/index' })}>
        <View className="streak-info">
          <Text className="streak-number">{stats?.streakDays || 0}</Text>
          <Text className="streak-label">连续打卡天数</Text>
        </View>
        <Text className="arrow">›</Text>
      </View>

      <View className="section">
        <Text className="section-title">健身计划</Text>
        {activePlan ? (
          <View className="current-plan" onClick={() => handlePlanClick(activePlan)}>
            <View className="plan-info">
              <Text className="plan-name">{activePlan.name}</Text>
              <View className="progress-bar">
                <View className="progress-fill" style={{ width: '30%' }} />
              </View>
            </View>
            <Button className="start-btn">开始执行</Button>
          </View>
        ) : (
          <View className="empty-plan">
            <Text className="empty-text">还没有计划</Text>
            <Button className="create-btn" onClick={() => Taro.switchTab({ url: '/pages/chat/index' })}>
              AI 生成计划
            </Button>
          </View>
        )}

        {plans.filter((p) => p.status !== 'active').length > 0 && (
          <View className="plan-list">
            {plans
              .filter((p) => p.status !== 'active')
              .map((plan) => (
                <View
                  key={plan.id}
                  className="plan-item"
                  onClick={() => handlePlanClick(plan)}
                >
                  <Text className="plan-name">{plan.name}</Text>
                  <Text className="arrow">›</Text>
                </View>
              ))}
          </View>
        )}
      </View>

      <View className="section">
        <Text className="section-title">快捷入口</Text>
        <View className="quick-links">
          <View className="link-item" onClick={() => Taro.navigateTo({ url: '/pages/calendar/index' })}>
            <Text>日历</Text>
            <Text className="arrow">›</Text>
          </View>
          <View className="link-item" onClick={() => Taro.navigateTo({ url: '/pages/badges/index' })}>
            <Text>徽章</Text>
            <Text className="arrow">›</Text>
          </View>
          <View className="link-item" onClick={() => Taro.navigateTo({ url: '/pages/settings/index' })}>
            <Text>设置</Text>
            <Text className="arrow">›</Text>
          </View>
        </View>
      </View>

      <Button className="logout-btn" onClick={handleLogout}>
        退出登录
      </Button>
    </ScrollView>
  );
}