import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';
import { Muscle, SuggestedMuscle } from '../../types';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const CATEGORIES = [
  { value: 'chest', label: '胸部' },
  { value: 'back', label: '背部' },
  { value: 'legs', label: '腿部' },
  { value: 'shoulders', label: '肩部' },
  { value: 'arms', label: '手臂' },
  { value: 'core', label: '核心' },
];

const EQUIPMENTS = [
  { value: 'barbell', label: '杠铃' },
  { value: 'dumbbell', label: '哑铃' },
  { value: 'cable', label: '绳索' },
  { value: 'machine', label: '器械' },
  { value: 'bodyweight', label: '自重' },
  { value: 'kettlebell', label: '壶铃' },
  { value: 'bands', label: '弹力带' },
  { value: 'other', label: '其他' },
];

const DIFFICULTIES = [
  { value: 'beginner', label: '入门' },
  { value: 'intermediate', label: '进阶' },
  { value: 'advanced', label: '高级' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-600 text-white',
  intermediate: 'bg-yellow-600 text-white',
  advanced: 'bg-red-600 text-white',
};

interface MuscleInput {
  muscleId: number;
  role: string;
}

interface ExerciseFormData {
  id?: number;
  name: string;
  category: string;
  equipment: string;
  difficulty: string;
  description: string;
  steps: string;
  safetyNotes: string;
  commonMistakes: string;
  adjustmentNotes: string;
  exerciseType: string;
  variantType: string;
  status: string;
  muscles?: MuscleInput[];
}

const defaultFormData: ExerciseFormData = {
  name: '',
  category: 'chest',
  equipment: 'barbell',
  difficulty: 'beginner',
  description: '',
  steps: '',
  safetyNotes: '',
  commonMistakes: '',
  adjustmentNotes: '',
  exerciseType: '',
  variantType: '',
  status: 'draft',
};

export default function AdminExercises() {
  const [exercises, setExercises] = useState<ExerciseFormData[]>([]);
  const [allMuscles, setAllMuscles] = useState<Muscle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [expandedExerciseId, setExpandedExerciseId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ExerciseFormData>(defaultFormData);

  useEffect(() => {
    Promise.all([loadExercises(), loadMuscles()]);
  }, []);

  const loadMuscles = async () => {
    try {
      const data = await adminApi.getMuscles();
      setAllMuscles(data);
    } catch (err) {
      console.error('Failed to load muscles', err);
    }
  };

  const loadExercises = async () => {
    try {
      const data = await adminApi.getExercises();
      // 后端返回的是数组或 { exercises: [...] } 对象
      setExercises(Array.isArray(data) ? data : data.exercises || []);
    } catch (err) {
      console.error('Failed to load exercises', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setEditingId(null);
  };

  const openEditModal = (exercise: ExerciseFormData) => {
    setEditingId(exercise.id || null);
    setFormData({
      name: exercise.name || '',
      category: exercise.category || 'chest',
      equipment: exercise.equipment || 'barbell',
      difficulty: exercise.difficulty || 'beginner',
      description: exercise.description || '',
      steps: exercise.steps || '',
      safetyNotes: exercise.safetyNotes || '',
      commonMistakes: exercise.commonMistakes || '',
      adjustmentNotes: exercise.adjustmentNotes || '',
      exerciseType: exercise.exerciseType || '',
      variantType: exercise.variantType || '',
      status: exercise.status || 'draft',
    });
    setShowEditModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('请填写动作名称');
      return;
    }

    try {
      if (editingId) {
        await adminApi.updateExercise(editingId, formData);
      } else {
        await adminApi.createExercise(formData);
      }
      await loadExercises();
      setShowEditModal(false);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error('Failed to save exercise', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个动作吗？')) return;
    try {
      await adminApi.deleteExercise(id);
      await loadExercises();
    } catch (err) {
      console.error('Failed to delete exercise', err);
    }
  };

  const generateWithAI = async () => {
    if (!formData.name.trim() || !formData.category || !formData.equipment || !formData.difficulty) {
      alert('请先填写动作名称、选择分类、器材和难度');
      return;
    }

    // 构建肌肉摘要发送给 AI
    const muscleSummary = allMuscles.map(m => ({
      name: m.name,
      role: 'synergist' as const,
    }));

    setAiLoading(true);
    try {
      const details = await adminApi.generateExerciseDetails(
        formData.name,
        formData.category,
        formData.equipment,
        formData.difficulty,
        muscleSummary
      );

      // 将 AI 返回的肌肉名称转换为 ID
      let muscles: MuscleInput[] = [];
      if (details.suggestedMuscles && Array.isArray(details.suggestedMuscles)) {
        muscles = details.suggestedMuscles.map((sm: SuggestedMuscle) => {
          // 尝试通过名称匹配肌肉
          const matched = allMuscles.find(m =>
            m.name === sm.name || m.name.includes(sm.name) || sm.name.includes(m.name)
          );
          return {
            muscleId: matched?.id || 0,
            role: sm.role || 'synergist',
          };
        }).filter((m: MuscleInput) => m.muscleId > 0);
      }

      setFormData(prev => ({
        ...prev,
        steps: details.steps || prev.steps,
        safetyNotes: details.safetyNotes || prev.safetyNotes,
        commonMistakes: details.commonMistakes || prev.commonMistakes,
        adjustmentNotes: details.adjustmentNotes || prev.adjustmentNotes,
        exerciseType: details.exerciseType || prev.exerciseType,
        muscles: muscles.length > 0 ? muscles : prev.muscles,
      }));
    } catch (err: any) {
      alert(err.response?.data?.error || 'AI 生成失败');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-text-secondary p-8">加载中...</div>;
  }

  return (
    <div className="h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading text-lg font-bold">动作列表</h2>
          <Button size="sm" variant="primary" onClick={() => { resetForm(); setShowAddModal(true); }}>
            新增
          </Button>
        </div>

        <div className="space-y-2">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`bg-primary-tertiary rounded p-3 border-l-4 ${
                  expandedExerciseId === exercise.id ? 'border-accent-orange' : 'border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedExerciseId(expandedExerciseId === exercise.id ? null : (exercise.id ?? null))}
                        className="font-medium text-sm text-left truncate"
                      >
                        {exercise.name}
                      </button>
                      <span className={`px-1.5 py-0.5 text-xs rounded ${DIFFICULTY_COLORS[exercise.difficulty] || ''}`}>
                        {DIFFICULTIES.find(d => d.value === exercise.difficulty)?.label || exercise.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {CATEGORIES.find(c => c.value === exercise.category)?.label} · {EQUIPMENTS.find(e => e.value === exercise.equipment)?.label}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(exercise)}>
                      查看详情
                    </Button>
                    <Button size="sm" variant="primary" onClick={() => openEditModal(exercise)}>
                      编辑
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => exercise.id !== undefined && handleDelete(exercise.id)}>
                      删除
                    </Button>
                  </div>
                </div>

                {expandedExerciseId === exercise.id && (
                  <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5 text-xs">
                    {exercise.muscles && exercise.muscles.length > 0 && (
                      <div className="text-text-secondary">
                        <span className="text-text-muted">关联肌肉：</span>
                        {exercise.muscles.map(m => {
                          const name = 'muscle' in m ? (m.muscle as any).name : (m as any).name;
                          const role = m.role;
                          return `${name}(${role === 'agonist' ? '主' : role === 'synergist' ? '协同' : role === 'antagonist' ? '拮抗' : '稳定'})`;
                        }).join('、')}
                      </div>
                    )}
                    {exercise.description && (
                      <div className="text-text-secondary line-clamp-2">描述：{exercise.description}</div>
                    )}
                    {exercise.steps && (
                      <div className="text-text-secondary line-clamp-2">步骤：{exercise.steps}</div>
                    )}
                    {exercise.safetyNotes && (
                      <div className="text-text-secondary line-clamp-2">注意：{exercise.safetyNotes}</div>
                    )}
                    {exercise.exerciseType && (
                      <div className="text-text-muted">
                        类型：{exercise.exerciseType === 'compound' ? '复合动作' : '孤立动作'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* 新增/编辑弹窗 */}
      <Modal
        isOpen={showAddModal || showEditModal}
        onClose={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}
        title={editingId ? '编辑动作' : '新增动作'}
        size="xl"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-text-secondary text-sm">动作名称 *</label>
              <Button
                size="sm"
                variant="blue"
                onClick={generateWithAI}
                disabled={aiLoading || !formData.name.trim()}
              >
                {aiLoading ? '生成中...' : 'AI增强'}
              </Button>
            </div>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="如：杠铃卧推"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-1">分类</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-primary-tertiary border border-border px-3 py-2"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-1">器材</label>
              <select
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                className="w-full bg-primary-tertiary border border-border px-3 py-2"
              >
                {EQUIPMENTS.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-1">难度</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full bg-primary-tertiary border border-border px-3 py-2"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-1">状态</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-primary-tertiary border border-border px-3 py-2"
              >
                <option value="draft">草稿</option>
                <option value="published">已发布</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-1">描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="动作描述..."
              rows={2}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-1">动作步骤</label>
            <textarea
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              placeholder="详细动作步骤..."
              rows={3}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-1">安全注意事项</label>
            <textarea
              value={formData.safetyNotes}
              onChange={(e) => setFormData({ ...formData, safetyNotes: e.target.value })}
              placeholder="安全注意事项..."
              rows={2}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-1">常见错误</label>
            <textarea
              value={formData.commonMistakes}
              onChange={(e) => setFormData({ ...formData, commonMistakes: e.target.value })}
              placeholder="常见错误..."
              rows={2}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-1">调整说明</label>
            <textarea
              value={formData.adjustmentNotes}
              onChange={(e) => setFormData({ ...formData, adjustmentNotes: e.target.value })}
              placeholder="动作调整说明..."
              rows={2}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-1">动作类型</label>
              <select
                value={formData.exerciseType}
                onChange={(e) => setFormData({ ...formData, exerciseType: e.target.value })}
                className="w-full bg-primary-tertiary border border-border px-3 py-2"
              >
                <option value="">请选择</option>
                <option value="compound">复合动作</option>
                <option value="isolation">孤立动作</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-1">变体类型</label>
              <select
                value={formData.variantType}
                onChange={(e) => setFormData({ ...formData, variantType: e.target.value })}
                className="w-full bg-primary-tertiary border border-border px-3 py-2"
              >
                <option value="">请选择</option>
                <option value="equipment">器械变体</option>
                <option value="difficulty">难度变体</option>
                <option value="posture">姿势变体</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}>
              取消
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {editingId ? '保存' : '创建'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
