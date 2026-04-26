import { useEffect, useState } from 'react';
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

export default function Muscles() {
  const { hierarchy, isLoading, fetchHierarchy } = useMuscleStore();
  const [selectedMuscleId, setSelectedMuscleId] = useState<number | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['chest', 'back', 'legs', 'shoulders', 'arms', 'core']));

  useEffect(() => {
    fetchHierarchy();
  }, [fetchHierarchy]);

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

  if (isLoading && hierarchy.length === 0) {
    return <div className="text-center text-text-secondary p-8">加载中...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* 左侧：肌肉列表 */}
      <div className="w-80 border-r border-border overflow-y-auto bg-primary-secondary">
        <div className="p-4">
          <h2 className="font-heading text-lg font-bold mb-4">肌肉列表</h2>
          <div className="space-y-2">
            {hierarchy.map((group) => (
              <div
                key={group.id}
                className={`border-l-4 ${GROUP_COLORS[group.group] || 'border-border'} pl-3`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer py-1"
                  onClick={() => toggleGroup(group.group)}
                >
                  <span className="font-medium text-sm">{group.name}</span>
                  <span className="text-text-muted text-xs">
                    {expandedGroups.has(group.group) ? '▼' : '▶'}
                  </span>
                </div>
                {expandedGroups.has(group.group) && (
                  <div className="pl-2 space-y-1">
                    {group.children.map((muscle) => (
                      <button
                        key={muscle.id}
                        onClick={() => setSelectedMuscleId(muscle.id)}
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

      {/* 右侧：肌肉详情 */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedMuscle ? (
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-2xl font-bold">{selectedMuscle.name}</h2>
                <span className="px-2 py-1 text-xs rounded bg-primary-tertiary text-text-secondary">
                  {GROUP_LABELS[selectedMuscle.group] || selectedMuscle.group}
                </span>
              </div>

              {selectedMuscle.origin && (
                <div className="space-y-1">
                  <h3 className="text-accent-orange font-semibold">起点</h3>
                  <p className="text-text-secondary whitespace-pre-line">{selectedMuscle.origin}</p>
                </div>
              )}

              {selectedMuscle.insertion && (
                <div className="space-y-1">
                  <h3 className="text-accent-orange font-semibold">止点</h3>
                  <p className="text-text-secondary whitespace-pre-line">{selectedMuscle.insertion}</p>
                </div>
              )}

              {selectedMuscle.function && (
                <div className="space-y-1">
                  <h3 className="text-accent-orange font-semibold">功能</h3>
                  <p className="text-text-secondary whitespace-pre-line">{selectedMuscle.function}</p>
                </div>
              )}

              {selectedMuscle.trainingTips && (
                <div className="space-y-1">
                  <h3 className="text-accent-orange font-semibold">训练技巧</h3>
                  <p className="text-text-secondary whitespace-pre-line">{selectedMuscle.trainingTips}</p>
                </div>
              )}

              {!selectedMuscle.origin && !selectedMuscle.insertion && !selectedMuscle.function && !selectedMuscle.trainingTips && (
                <div className="text-center text-text-muted py-8">暂无详情信息</div>
              )}
            </div>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-text-muted">
              <p className="text-lg mb-2">选择左侧肌肉查看详情</p>
              <p className="text-sm">点击肌肉名称查看起点、止点、功能和训练技巧</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
