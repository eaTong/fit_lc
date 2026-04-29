// mini-program/src/pages/calendar/index.tsx
import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { getWorkouts, getMeasurements } from '../../api/records';
import type { Workout, Measurement } from '../../api/records';
import './index.scss';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [dayRecords, setDayRecords] = useState<{ workouts: Workout[]; measurements: Measurement[] }>({
    workouts: [],
    measurements: []
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dayWorkouts = workouts.filter((w) => w.date === selectedDate);
      const dayMeasurements = measurements.filter((m) => m.date === selectedDate);
      setDayRecords({ workouts: dayWorkouts, measurements: dayMeasurements });
    }
  }, [selectedDate, workouts, measurements]);

  const loadData = async () => {
    try {
      const [workoutData, measurementData] = await Promise.all([
        getWorkouts(),
        getMeasurements()
      ]);
      setWorkouts(workoutData);
      setMeasurements(measurementData);
    } catch (err) {
      console.error('Failed to load calendar data:', err);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatDateStr = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const hasRecord = (day: number) => {
    const dateStr = formatDateStr(day);
    return (
      workouts.some((w) => w.date === dateStr) ||
      measurements.some((m) => m.date === dateStr)
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <View className="calendar-page">
      <View className="calendar-header">
        <Text className="arrow" onClick={prevMonth}>‹</Text>
        <Text className="month-label">
          {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
        </Text>
        <Text className="arrow" onClick={nextMonth}>›</Text>
      </View>

      <View className="weekday-row">
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <Text key={day} className="weekday">{day}</Text>
        ))}
      </View>

      <View className="days-grid">
        {days.map((day, index) => (
          <View
            key={index}
            className={`day-cell ${day === null ? 'empty' : ''} ${isToday(day!) ? 'today' : ''} ${selectedDate === formatDateStr(day!) ? 'selected' : ''}`}
            onClick={() => day && setSelectedDate(formatDateStr(day))}
          >
            {day && (
              <>
                <Text className="day-number">{day}</Text>
                {hasRecord(day) && <View className="record-dot" />}
              </>
            )}
          </View>
        ))}
      </View>

      {selectedDate && (
        <View className="day-detail">
          <Text className="detail-title">{selectedDate} 记录</Text>
          {dayRecords.workouts.length > 0 && (
            <View className="record-section">
              <Text className="record-type">训练</Text>
              {dayRecords.workouts.map((w) => (
                <View key={w.id} className="record-item">
                  <Text>{w.exercises.map((e) => e.exerciseName).join(', ')}</Text>
                </View>
              ))}
            </View>
          )}
          {dayRecords.measurements.length > 0 && (
            <View className="record-section">
              <Text className="record-type">围度</Text>
              {dayRecords.measurements.map((m) => (
                <View key={m.id} className="record-item">
                  <Text>{m.items.map((i) => `${i.bodyPart} ${i.value}cm`).join(', ')}</Text>
                </View>
              ))}
            </View>
          )}
          {dayRecords.workouts.length === 0 && dayRecords.measurements.length === 0 && (
            <Text className="no-record">暂无记录</Text>
          )}
        </View>
      )}
    </View>
  );
}