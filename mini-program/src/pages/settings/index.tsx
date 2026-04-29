// mini-program/src/pages/settings/index.tsx
import { View, Text, Switch, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import Taro from '@tarojs/taro';
import './index.scss';

export default function SettingsPage() {
  const { user, clearAuth } = useAuthStore();
  const [trainingReminder, setTrainingReminder] = useState(true);
  const [measurementReminder, setMeasurementReminder] = useState(true);

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          clearAuth();
          Taro.reLaunch({ url: '/pages/chat/index' });
        }
      }
    });
  };

  return (
    <ScrollView className="settings-page" scrollY>
      <View className="section">
        <Text className="section-title">个人信息</Text>
        <View className="setting-item">
          <Text className="label">昵称</Text>
          <Text className="value">{user?.nickname || '-'}</Text>
        </View>
        <View className="setting-item">
          <Text className="label">邮箱</Text>
          <Text className="value">{user?.email || '-'}</Text>
        </View>
      </View>

      <View className="section">
        <Text className="section-title">通知设置</Text>
        <View className="setting-item">
          <Text className="label">训练提醒</Text>
          <Switch color="#FF4500" checked={trainingReminder} onChange={() => setTrainingReminder(!trainingReminder)} />
        </View>
        <View className="setting-item">
          <Text className="label">围度更新提醒</Text>
          <Switch color="#FF4500" checked={measurementReminder} onChange={() => setMeasurementReminder(!measurementReminder)} />
        </View>
      </View>

      <View className="section">
        <Text className="section-title">关于</Text>
        <View className="setting-item">
          <Text className="label">版本</Text>
          <Text className="value">1.0.0</Text>
        </View>
      </View>

      <View className="logout-btn" onClick={handleLogout}>
        <Text className="logout-text">退出登录</Text>
      </View>
    </ScrollView>
  );
}