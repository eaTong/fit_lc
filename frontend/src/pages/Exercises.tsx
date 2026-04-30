import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExerciseStore } from '../stores/exerciseStore';
import { useMuscleStore } from '../stores/muscleStore';
import Card from '../components/ui/Card';

const GROUP_LABELS: Record<string, string> = {
  chest: '胸部',
  back: '背部',
  legs: '腿部',
  shoulders: '肩部',
  arms: '手臂',
  core: '核心',
};

const GROUP_COLORS: Record<string, string> = {
  chest: 'border-red-500/50',
  back: 'border-blue-500/50',
  legs: 'border-green-500/50',
  shoulders: 'border-yellow-500/50',
  arms: 'border-purple-500/50',
  core: 'border-orange-500/50',
};

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

const DIFFICULTY_OPTIONS = [
  { value: '', label: '全部难度' },
  { value: 'beginner', label: '入门' },
  { value: 'intermediate', label: '进阶' },
  { value: 'advanced', label: '高级' },
];

const EQUIPMENT_TYPE_OPTIONS = [
  { value: '', label: '全部类型' },
  { value: 'barbell', label: '杠铃' },
  { value: 'dumbbell', label: '哑铃' },
  { value: 'cable', label: '绳索' },
  { value: 'machine', label: '器械' },
  { value: 'bodyweight', label: '自重' },
  { value: 'kettlebell', label: '壶铃' },
  { value: 'bands', label: '弹力带' },
];

const EQUIPMENT_CATEGORY_OPTIONS = [
  { value: '', label: '全部类别' },
  { value: 'free_weight', label: '自由重量' },
  { value: 'machine', label: '器械' },
  { value: 'bodyweight', label: '自重' },
];

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

export default function Exercises() {
  const navigate = useNavigate();
  const { exercises, isLoading, fetchExercises } = useExerciseStore();
  const { hierarchy, fetchHierarchy } = useMuscleStore();
  const [selectedMuscleId, setSelectedMuscleId] = useState<number | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['chest', 'back', 'legs', 'shoulders', 'arms', 'core']));
  const [expandedMuscle, setExpandedMuscle] = useState<boolean>(false);

  // Filters
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

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

  const selectedMuscle = selectedMuscleId
    ? hierarchy.flatMap((g) => g.children).find((m) => m.id === selectedMuscleId)
    : null;

  // Filter exercises
  const filteredExercises = exercises.filter((ex) => {
    // Muscle filter
    if (selectedMuscleId && !ex.muscles?.some((m) => m.muscleId === selectedMuscleId)) {
      return false;
    }
    // Difficulty filter
    if (difficultyFilter && ex.difficulty !== difficultyFilter) {
      return false;
    }
    // Equipment filter
    if (equipmentFilter && ex.equipment !== equipmentFilter) {
      return false;
    }
    // Category filter (free_weight includes barbell, dumbbell, kettlebell)
    if (categoryFilter) {
      if (categoryFilter === 'free_weight') {
        if (!['barbell', 'dumbbell', 'kettlebell'].includes(ex.equipment)) {
          return false;
        }
      } else if (categoryFilter === 'machine') {
        if (ex.equipment !== 'machine' && ex.equipment !== 'cable') {
          return false;
        }
      } else if (categoryFilter === 'bodyweight') {
        if (ex.equipment !== 'bodyweight') {
          return false;
        }
      } else if (categoryFilter !== ex.equipment) {
        return false;
      }
    }
    return true;
  });

  const getMuscleNames = (exercise: typeof exercises[0]) => {
    const primary = exercise.muscles?.filter((m) => m.role === 'primary').map((m) => m.muscle.name) || [];
    const secondary = exercise.muscles?.filter((m) => m.role === 'secondary').map((m) => m.muscle.name) || [];
    return { primary, secondary };
  };

  const isLoadingOverall = isLoading && exercises.length === 0;

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* 左侧：紧凑肌肉列表 */}
      <div className="w-48 border-r border-border overflow-y-auto bg-primary-secondary flex-shrink-0">
        <div className="p-3">
          <h2 className="font-heading text-sm font-bold mb-3 text-text-secondary">肌肉</h2>
          <button
            onClick={() => {
              setSelectedMuscleId(null);
              setExpandedMuscle(false);
            }}
            className={`w-full text-left px-2 py-1.5 text-xs rounded mb-2 transition-colors ${
              selectedMuscleId === null
                ? 'bg-accent-orange text-white'
                : 'bg-primary-tertiary hover:bg-border text-text-primary'
            }`}
          >
            全部
          </button>
          <div className="space-y-1">
            {hierarchy.map((group) => (
              <div key={group.id} className={`border-l-2 ${GROUP_COLORS[group.group] || 'border-border'} pl-2`}>
                <div
                  className="flex items-center justify-between cursor-pointer py-1"
                  onClick={() => toggleGroup(group.group)}
                >
                  <span className="font-medium text-xs text-text-secondary">{group.name}</span>
                  <span className="text-text-muted text-xs">{expandedGroups.has(group.group) ? '▼' : '▶'}</span>
                </div>
                {expandedGroups.has(group.group) && (
                  <div className="pl-1 space-y-0.5 mb-1">
                    {group.children.map((muscle) => (
                      <button
                        key={muscle.id}
                        onClick={() => {
                          setSelectedMuscleId(muscle.id);
                          setExpandedMuscle(false);
                        }}
                        className={`w-full text-left px-1.5 py-1 text-xs rounded transition-colors ${
                          selectedMuscleId === muscle.id
                            ? 'bg-accent-orange text-white'
                            : 'hover:bg-primary-tertiary text-text-muted'
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

      {/* 右侧：肌肉详情+动作列表 */}
      <div className="flex-1 overflow-y-auto">
        {/* 肌肉详情区域（可展开/收起） */}
        {selectedMuscle && (
          <div className="border-b border-border">
            <button
              onClick={() => setExpandedMuscle(!expandedMuscle)}
              className="w-full px-4 py-2 flex items-center justify-between bg-primary-tertiary hover:bg-border transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-bold">{selectedMuscle.name}</span>
                <span className="text-xs text-text-muted">{GROUP_LABELS[selectedMuscle.group]}</span>
              </div>
              <span className="text-text-muted text-xs">{expandedMuscle ? '收起 ▲' : '展开 ▼'}</span>
            </button>
            {expandedMuscle && (
              <div className="p-4 bg-primary-secondary space-y-3">
                {selectedMuscle.origin && (
                  <div className="text-xs">
                    <span className="text-accent-orange font-semibold">起点</span>
                    <p className="text-text-muted mt-0.5">{selectedMuscle.origin}</p>
                  </div>
                )}
                {selectedMuscle.insertion && (
                  <div className="text-xs">
                    <span className="text-accent-orange font-semibold">止点</span>
                    <p className="text-text-muted mt-0.5">{selectedMuscle.insertion}</p>
                  </div>
                )}
                {selectedMuscle.function && (
                  <div className="text-xs">
                    <span className="text-accent-orange font-semibold">功能</span>
                    <p className="text-text-muted mt-0.5">{selectedMuscle.function}</p>
                  </div>
                )}
                {selectedMuscle.trainingTips && (
                  <div className="text-xs">
                    <span className="text-accent-orange font-semibold">训练技巧</span>
                    <p className="text-text-muted mt-0.5">{selectedMuscle.trainingTips}</p>
                  </div>
                )}
                {!selectedMuscle.origin && !selectedMuscle.insertion && !selectedMuscle.function && !selectedMuscle.trainingTips && (
                  <div className="text-xs text-text-muted text-center py-2">暂无详情信息</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 筛选栏 */}
        <div className="p-3 border-b border-border bg-primary-secondary flex flex-wrap gap-2">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-2 py-1.5 text-xs bg-primary-tertiary border border-border text-text-primary rounded focus:border-accent-orange outline-none"
          >
            {DIFFICULTY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={equipmentFilter}
            onChange={(e) => {
              setEquipmentFilter(e.target.value);
              setCategoryFilter('');
            }}
            className="px-2 py-1.5 text-xs bg-primary-tertiary border border-border text-text-primary rounded focus:border-accent-orange outline-none"
          >
            {EQUIPMENT_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setEquipmentFilter('');
            }}
            className="px-2 py-1.5 text-xs bg-primary-tertiary border border-border text-text-primary rounded focus:border-accent-orange outline-none"
          >
            {EQUIPMENT_CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* 动作列表 */}
        <div className="p-4">
          <div className="mb-3">
            <h1 className="font-heading text-lg font-bold">
              动作库
              {selectedMuscle && (
                <span className="text-text-secondary text-sm ml-2">
                  - {selectedMuscle.name}
                </span>
              )}
            </h1>
            <p className="text-text-muted text-xs mt-0.5">
              共 {filteredExercises.length} 个动作
            </p>
          </div>

          {isLoadingOverall ? (
            <div className="text-center text-text-secondary py-8">加载中...</div>
          ) : filteredExercises.length === 0 ? (
            <div className="text-center text-text-muted py-8 text-sm">暂无匹配的动作</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredExercises.map((exercise) => {
                const { primary, secondary } = getMuscleNames(exercise);
                return (
                  <Card
                    key={exercise.id}
                    className="cursor-pointer hover:border-accent-orange transition-colors"
                    onClick={() => navigate(`/exercises/${exercise.id}`)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-heading font-semibold text-sm">{exercise.name}</h3>
                        <span className={`px-1.5 py-0.5 text-xs font-semibold rounded flex-shrink-0 ${DIFFICULTY_COLORS[exercise.difficulty] || ''}`}>
                          {DIFFICULTY_LABELS[exercise.difficulty] || exercise.difficulty}
                        </span>
                      </div>
                      <div className="text-xs text-text-secondary">
                        {EQUIPMENTS[exercise.equipment] || exercise.equipment}
                      </div>
                      {primary.length > 0 && (
                        <div className="text-xs">
                          <span className="text-text-muted">主：</span>
                          <span className="text-accent-orange">{primary.join(', ')}</span>
                        </div>
                      )}
                      {secondary.length > 0 && (
                        <div className="text-xs">
                          <span className="text-text-muted">辅：</span>
                          <span className="text-text-muted">{secondary.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}