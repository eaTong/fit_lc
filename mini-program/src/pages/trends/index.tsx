// mini-program/src/pages/trends/index.tsx
import { View, Text, ScrollView, Picker } from '@tarojs/components';
import { useState, useEffect, useCallback } from 'react';
import { getStats, getMuscleVolume, type Stats } from '../../api/achievements';
import { getMeasurements, type Measurement } from '../../api/records';
import TrendChart from '../../components/TrendChart';
import './index.scss';

type TrendTab = 'measurement' | 'workout';
type BodyPart = 'chest' | 'waist' | 'hips' | 'biceps' | 'thighs' | 'calves';
type TimeRange = '30' | '90' | '180' | '365' | 'all';

const BODY_PARTS: { label: string; value: BodyPart }[] = [
  { label: '胸围', value: 'chest' },
  { label: '腰围', value: 'waist' },
  { label: '臀围', value: 'hips' },
  { label: '臂围', value: 'biceps' },
  { label: '腿围', value: 'thighs' },
  { label: '小腿围', value: 'calves' }
];

const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: '30天', value: '30' },
  { label: '90天', value: '90' },
  { label: '6个月', value: '180' },
  { label: '1年', value: '365' },
  { label: '全部', value: 'all' }
];

interface TrendDataPoint {
  date: string;
  value: number;
}

interface MuscleVolumeData {
  name: string;
  value: number;
}

export default function TrendsPage() {
  const [activeTab, setActiveTab] = useState<TrendTab>('measurement');
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('chest');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('90');
  const [stats, setStats] = useState<Stats | null>(null);
  const [muscleVolume, setMuscleVolume] = useState<MuscleVolumeData[]>([]);
  const [measurementHistory, setMeasurementHistory] = useState<Measurement[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [statsData, volumeData, measurementsData] = await Promise.all([
        getStats(),
        getMuscleVolume(),
        getMeasurements()
      ]);
      setStats(statsData);
      setMuscleVolume(volumeData);
      setMeasurementHistory(measurementsData);
    } catch (err) {
      console.error('Failed to load trends data:', err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [activeTab, loadData]);

  const getMeasurementTrendData = (): TrendDataPoint[] => {
    const now = Date.now();
    const rangeDays = selectedTimeRange === 'all' ? 99999 : parseInt(selectedTimeRange);
    const cutoff = now - rangeDays * 24 * 60 * 60 * 1000;

    return measurementHistory
      .filter((m) => new Date(m.date).getTime() > cutoff)
      .map((m) => {
        const item = m.items.find((i) => i.bodyPart === selectedBodyPart);
        return {
          date: m.date,
          value: item?.value || 0
        };
      })
      .filter((d) => d.value > 0);
  };

  const getMuscleVolumeData = (): MuscleVolumeData[] => {
    return muscleVolume.map((mv) => ({
      name: mv.name,
      value: mv.volume
    }));
  };

  return (
    <View className="trends-page">
      <View className="tab-header">
        <View
          className={`tab ${activeTab === 'measurement' ? 'active' : ''}`}
          onClick={() => setActiveTab('measurement')}
        >
          <Text>围度趋势</Text>
        </View>
        <View
          className={`tab ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <Text>训练统计</Text>
        </View>
      </View>

      <ScrollView className="content" scrollY>
        {activeTab === 'measurement' && (
          <View className="trend-section">
            <View className="selectors">
              <Picker
                mode="selector"
                range={BODY_PARTS}
                rangeKey="label"
                onChange={(e) => setSelectedBodyPart(BODY_PARTS[e.detail.value].value)}
              >
                <View className="picker">
                  <Text>{BODY_PARTS.find((p) => p.value === selectedBodyPart)?.label}</Text>
                  <Text className="arrow">▼</Text>
                </View>
              </Picker>
              <Picker
                mode="selector"
                range={TIME_RANGES}
                rangeKey="label"
                onChange={(e) => setSelectedTimeRange(TIME_RANGES[e.detail.value].value)}
              >
                <View className="picker">
                  <Text>{TIME_RANGES.find((t) => t.value === selectedTimeRange)?.label}</Text>
                  <Text className="arrow">▼</Text>
                </View>
              </Picker>
            </View>
            <TrendChart type="line" data={getMeasurementTrendData()} dataKey="value" xAxisKey="date" />
          </View>
        )}

        {activeTab === 'workout' && (
          <View className="trend-section">
            <Text className="section-title">肌肉群训练量</Text>
            <TrendChart type="pie" data={getMuscleVolumeData()} dataKey="value" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}