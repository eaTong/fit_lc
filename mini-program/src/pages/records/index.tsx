// mini-program/src/pages/records/index.tsx
import { View, Text, ScrollView, Button } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useRecordsStore } from '../../store/records';
import { getWorkouts, getMeasurements } from '../../api/records';
import RecordCard from '../../components/RecordCard';
import './index.scss';

type TabType = 'workout' | 'measurement';

export default function RecordsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('workout');
  const { workouts, measurements, setWorkouts, setMeasurements, setLoading, isLoading } = useRecordsStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [workoutData, measurementData] = await Promise.all([
        getWorkouts(),
        getMeasurements()
      ]);
      setWorkouts(workoutData);
      setMeasurements(measurementData);
    } catch (err) {
      console.error('Failed to load records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFabClick = () => {
    wx.switchTab({ url: '/pages/chat/index' });
  };

  const renderEmptyState = () => (
    <View className="empty-state">
      <Text className="empty-title">还没有记录</Text>
      <Text className="empty-desc">试试说："今天深蹲 80kg 做了 5 组"</Text>
      <Button className="start-btn" onClick={handleFabClick}>
        去记录
      </Button>
    </View>
  );

  const renderWorkoutList = () => {
    if (workouts.length === 0) return renderEmptyState();

    // Group by date
    const grouped = workouts.reduce((acc, workout) => {
      const date = workout.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(workout);
      return acc;
    }, {} as Record<string, typeof workouts>);

    return Object.entries(grouped).map(([date, records]) => (
      <View key={date} className="date-group">
        <Text className="date-label">{date}</Text>
        {records.map((workout) => (
          <RecordCard key={workout.id} type="workout" data={workout} />
        ))}
      </View>
    ));
  };

  const renderMeasurementList = () => {
    if (measurements.length === 0) return renderEmptyState();

    const grouped = measurements.reduce((acc, measurement) => {
      const date = measurement.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(measurement);
      return acc;
    }, {} as Record<string, typeof measurements>);

    return Object.entries(grouped).map(([date, records]) => (
      <View key={date} className="date-group">
        <Text className="date-label">{date}</Text>
        {records.map((measurement) => (
          <RecordCard key={measurement.id} type="measurement" data={measurement} />
        ))}
      </View>
    ));
  };

  return (
    <View className="records-page">
      <View className="tab-header">
        <View
          className={`tab ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <Text>训练</Text>
        </View>
        <View
          className={`tab ${activeTab === 'measurement' ? 'active' : ''}`}
          onClick={() => setActiveTab('measurement')}
        >
          <Text>围度</Text>
        </View>
      </View>

      <ScrollView className="records-list" scrollY>
        {activeTab === 'workout' ? renderWorkoutList() : renderMeasurementList()}
      </ScrollView>

      <Button className="fab" onClick={handleFabClick}>+</Button>
    </View>
  );
}