// mini-program/src/pages/exercises/index.tsx
import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { getExercises } from '../../api/exercises';
import { getMuscles } from '../../api/muscles';
import type { Exercise } from '../../api/exercises';
import type { Muscle } from '../../api/muscles';
import ExerciseCard from '../../components/ExerciseCard';
import './index.scss';

type TabType = 'exercises' | 'muscles';

const CATEGORIES = ['全部', '胸', '背', '腿', '肩', '臂', '核心'];
const EQUIPMENTS = ['全部', '杠铃', '哑铃', '龙门架', '器械', '自重'];
const DIFFICULTIES = ['全部', '入门', '中级', '高级'];

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('exercises');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedEquipment, setSelectedEquipment] = useState('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState('全部');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'exercises') {
      loadExercises();
    } else {
      loadMuscles();
    }
  }, [activeTab, selectedCategory, selectedEquipment, selectedDifficulty]);

  const loadExercises = async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string> = {};
      if (selectedCategory !== '全部') params.category = selectedCategory;
      if (selectedEquipment !== '全部') params.equipment = selectedEquipment;
      if (selectedDifficulty !== '全部') params.difficulty = selectedDifficulty;

      const result = await getExercises(params);
      setExercises(result.list);
    } catch (err) {
      console.error('Failed to load exercises:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMuscles = async () => {
    setIsLoading(true);
    try {
      const data = await getMuscles();
      setMuscles(data);
    } catch (err) {
      console.error('Failed to load muscles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseClick = (exercise: Exercise) => {
    Taro.navigateTo({ url: `/subpkg/knowledge/exercises/detail?id=${exercise.id}` });
  };

  const handleMuscleClick = (muscle: Muscle) => {
    Taro.navigateTo({ url: `/subpkg/knowledge/muscles/detail?id=${muscle.id}` });
  };

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const renderExercisesTab = () => (
    <View className="exercises-tab">
      <ScrollView className="filters" scrollX>
        <View className="filter-row">
          <Text className="filter-label">肌肉群:</Text>
          {CATEGORIES.map((cat) => (
            <View
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <Text>{cat}</Text>
            </View>
          ))}
        </View>
        <View className="filter-row">
          <Text className="filter-label">器械:</Text>
          {EQUIPMENTS.map((eq) => (
            <View
              key={eq}
              className={`filter-chip ${selectedEquipment === eq ? 'active' : ''}`}
              onClick={() => setSelectedEquipment(eq)}
            >
              <Text>{eq}</Text>
            </View>
          ))}
        </View>
        <View className="filter-row">
          <Text className="filter-label">难度:</Text>
          {DIFFICULTIES.map((diff) => (
            <View
              key={diff}
              className={`filter-chip ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              <Text>{diff}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <ScrollView className="exercise-list" scrollY>
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onClick={() => handleExerciseClick(exercise)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderMusclesTab = () => {
    const rootMuscles = muscles.filter((m) => m.parentId === null);

    return (
      <ScrollView className="muscle-list" scrollY>
        {rootMuscles.map((muscleGroup) => (
          <View key={muscleGroup.id} className="muscle-group">
            <View
              className="group-header"
              onClick={() => toggleGroup(muscleGroup.name)}
            >
              <Text className="group-name">{muscleGroup.name}</Text>
              <Text className={`expand-icon ${expandedGroups.has(muscleGroup.name) ? 'expanded' : ''}`}>
                ▶
              </Text>
            </View>
            {expandedGroups.has(muscleGroup.name) && (
              <View className="muscle-children">
                {muscles
                  .filter((m) => m.parentId === muscleGroup.id)
                  .map((muscle) => (
                    <View
                      key={muscle.id}
                      className="muscle-item"
                      onClick={() => handleMuscleClick(muscle)}
                    >
                      <Text>{muscle.name}</Text>
                      <Text className="arrow">›</Text>
                    </View>
                  ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View className="exercises-page">
      <View className="tab-header">
        <View
          className={`tab ${activeTab === 'exercises' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
          <Text>动作库</Text>
        </View>
        <View
          className={`tab ${activeTab === 'muscles' ? 'active' : ''}`}
          onClick={() => setActiveTab('muscles')}
        >
          <Text>肌肉库</Text>
        </View>
      </View>

      {activeTab === 'exercises' ? renderExercisesTab() : renderMusclesTab()}
    </View>
  );
}