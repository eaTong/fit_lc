import { useEffect, useState } from 'react';
import { useExerciseStore } from '../stores/exerciseStore';
import { useMuscleStore } from '../stores/muscleStore';
import Card from '../components/ui/Card';

const EQUIPMENTS: Record<string, string> = {
  barbell: '杠铃',
  dumbbell: '哑铃',
  cable: '绳索',
  machine: '器械',
  bodyweight: '自重',
  kettlebell: '壶铃',
  bands: '弹力带',
  other: '其他',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-600 text-white',
  intermediate: 'bg-yellow-600 text-white',
  advanced: 'bg-red-600 text-white',
};

const GROUP_COLORS: Record<string, string> = {
  chest: 'border-red-500/50',
  back: 'border-blue-500/50',
  legs: 'border-green-500/50',
  shoulders: 'border-yellow-500/50',
  arms: 'border-purple-500/50',
  core: 'border-orange-500/50',
};

export default function Exercises() {
  const { exercises, isLoading, fetchExercises } = useExerciseStore();
  const { hierarchy, fetchHierarchy } = useMuscleStore();
  const [selectedMuscleId, setSelectedMuscleId] = useState<number | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['chest', 'back', 'legs', 'shoulders', 'arms', 'core']));

  useEffect(() => {
    fetchExercises();
    fetchHierarchy();
  }, [fetchExercises, fetchHierarchy]);

  const toggleGroup = (group: string) => {
    const next = new Set(expandedGroups);
    if (next.has(group)) {
      next.delete(group);
    } else {
      next.add(group);
    }
    setExpandedGroups(next);
  };

  const filteredExercises = selectedMuscleId
    ? exercises.filter((ex) => ex.muscles?.some((m) => m.muscleId === selectedMuscleId))
    : exercises;

  const getMuscleNames = (exercise: typeof exercises[0]) => {
    const primary = exercise.muscles?.filter((m) => m.role === 'primary').map((m) => m.muscle.name) || [];
    const secondary = exercise.muscles?.filter((m) => m.role === 'secondary').map((m) => m.muscle.name) || [];
    return { primary, secondary };
  };

  if (isLoading && exercises.length === 0) {
    return <div className="text-center text-text-secondary p-8">加载中...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* 左侧：肌肉列表 */}
      <div className="w-80 border-r border-border overflow-y-auto bg-primary-secondary">
        <div className="p-4">
          <h2 className="font-heading text-lg font-bold mb-4">肌肉列表</h2>
          <button
            onClick={() => setSelectedMuscleId(null)}
            className={`w-full text-left px-3 py-2 rounded mb-2 transition-colors ${
              selectedMuscleId === null
                ? 'bg-accent-orange text-white'
                : 'bg-primary-tertiary hover:bg-border text-text-primary'
            }`}
          >
            全部动作
          </button>
          <div className="space-y-2">
            {hierarchy.map((group) => (
              <div key={group.id} className={`border-l-4 ${GROUP_COLORS[group.group] || 'border-border'} pl-3`}>
                <div
                  className="flex items-center justify-between cursor-pointer py-1"
                  onClick={() => toggleGroup(group.group)}
                >
                  <span className="font-medium text-sm">{group.name}</span>
                  <span className="text-text-muted text-xs">{isExpanded(group) ? '▼' : '▶'}</span>
                </div>
                {isExpanded(group) && (
                  <div className="pl-2 space-y-1">
                    {group.children.map((muscle) => (
                      <button
                        key={muscle.id}
                        onClick={() => setSelectedMuscleId(selectedMuscleId === muscle.id ? null : muscle.id)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                          selectedMuscleId === muscle.id
                            ? 'bg-accent-orange text-white'
                            : 'hover:bg-primary-tertiary text-text-secondary'
                        }`}
                      >
                        {muscle.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧：动作库 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-4">
          <h1 className="font-heading text-2xl font-bold">
            动作库
            {selectedMuscleId && (
              <span className="text-text-secondary text-lg ml-2">
                - {hierarchy.flatMap((g) => g.children).find((m) => m.id === selectedMuscleId)?.name}
              </span>
            )}
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            共 {filteredExercises.length} 个动作
          </p>
        </div>

        {filteredExercises.length === 0 ? (
          <div className="text-center text-text-secondary py-12">
            暂无动作
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => {
              const { primary, secondary } = getMuscleNames(exercise);
              return (
                <Card key={exercise.id}>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading font-semibold text-lg">{exercise.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${DIFFICULTY_COLORS[exercise.difficulty] || ''}`}>
                        {DIFFICULTY_LABELS[exercise.difficulty] || exercise.difficulty}
                      </span>
                    </div>
                    <div className="text-sm text-text-secondary">
                      <div>{EQUIPMENTS[exercise.equipment] || exercise.equipment}</div>
                    </div>
                    {primary.length > 0 && (
                      <div className="text-sm">
                        <span className="text-text-muted">主肌肉：</span>
                        <span className="text-accent-orange">{primary.join(', ')}</span>
                      </div>
                    )}
                    {secondary.length > 0 && (
                      <div className="text-sm">
                        <span className="text-text-muted">辅助：</span>
                        <span className="text-text-secondary">{secondary.join(', ')}</span>
                      </div>
                    )}
                    {exercise.description && (
                      <p className="text-sm text-text-secondary line-clamp-2">{exercise.description}</p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  function isExpanded(group: { group: string }) {
    return expandedGroups.has(group.group);
  }
}
