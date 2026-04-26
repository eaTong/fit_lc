import { useState } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

interface SavedWorkoutData {
  type: 'workout';
  id: number;
  exercises: Exercise[];
  timestamp: string;
}

interface SaveSuccessCardProps {
  savedData: SavedWorkoutData;
  onEdit?: (id: number, exercises: Exercise[]) => void;
  onViewDetail?: (id: number) => void;
}

export default function SaveSuccessCard({ savedData, onEdit, onViewDetail }: SaveSuccessCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExercises, setEditedExercises] = useState(savedData.exercises);

  const handleSave = () => {
    onEdit?.(savedData.id, editedExercises);
    setIsEditing(false);
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden">
        {/* 头部 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎉</span>
            <span className="font-heading text-text-primary">训练记录已保存</span>
          </div>
          <span className="px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded">
            成功
          </span>
        </div>

        {/* 动作详情 */}
        <div className="px-4 py-4">
          <div className="space-y-3">
            {savedData.exercises.map((exercise, index) => (
              <div key={index} className="text-center">
                <p className="text-lg font-heading text-text-primary mb-2">{exercise.name}</p>
                <div className="flex justify-center gap-3">
                  {exercise.weight && (
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-text-muted">重量</p>
                      <p className="text-lg font-semibold text-accent-orange">{exercise.weight}kg</p>
                    </div>
                  )}
                  {exercise.sets && (
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-text-muted">组数</p>
                      <p className="text-lg font-semibold text-accent-orange">{exercise.sets}组</p>
                    </div>
                  )}
                  {exercise.reps && (
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-text-muted">次数</p>
                      <p className="text-lg font-semibold text-accent-orange">{exercise.reps}个</p>
                    </div>
                  )}
                  {exercise.duration && (
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-text-muted">时长</p>
                      <p className="text-lg font-semibold text-accent-orange">{exercise.duration}分钟</p>
                    </div>
                  )}
                  {exercise.distance && (
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-text-muted">距离</p>
                      <p className="text-lg font-semibold text-accent-orange">{exercise.distance}km</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3 px-4 py-3 border-t border-white/10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex-1"
          >
            修改
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewDetail?.(savedData.id)}
            className="flex-1"
          >
            查看详情
          </Button>
        </div>
      </div>

      {/* 编辑弹窗 */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="修改训练记录">
        <div className="space-y-4">
          {editedExercises.map((exercise, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => {
                  const updated = [...editedExercises];
                  updated[index].name = e.target.value;
                  setEditedExercises(updated);
                }}
                className="w-full bg-primary-secondary border-2 border-border rounded px-3 py-2 text-text-primary"
                placeholder="动作名称"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={exercise.weight || ''}
                  onChange={(e) => {
                    const updated = [...editedExercises];
                    updated[index].weight = e.target.value ? Number(e.target.value) : undefined;
                    setEditedExercises(updated);
                  }}
                  className="flex-1 bg-primary-secondary border-2 border-border rounded px-3 py-2 text-text-primary"
                  placeholder="重量(kg)"
                />
                <input
                  type="number"
                  value={exercise.sets || ''}
                  onChange={(e) => {
                    const updated = [...editedExercises];
                    updated[index].sets = e.target.value ? Number(e.target.value) : undefined;
                    setEditedExercises(updated);
                  }}
                  className="flex-1 bg-primary-secondary border-2 border-border rounded px-3 py-2 text-text-primary"
                  placeholder="组数"
                />
                <input
                  type="number"
                  value={exercise.reps || ''}
                  onChange={(e) => {
                    const updated = [...editedExercises];
                    updated[index].reps = e.target.value ? Number(e.target.value) : undefined;
                    setEditedExercises(updated);
                  }}
                  className="flex-1 bg-primary-secondary border-2 border-border rounded px-3 py-2 text-text-primary"
                  placeholder="次数"
                />
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setIsEditing(false)} className="flex-1">
              取消
            </Button>
            <Button variant="primary" onClick={handleSave} className="flex-1">
              保存
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
