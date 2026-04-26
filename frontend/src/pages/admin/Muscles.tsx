import { useEffect, useState } from 'react';
import { useMuscleStore } from '../../stores/muscleStore';
import { adminApi } from '../../api/admin';
import type { Muscle } from '../../api/muscles';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

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

export default function AdminMuscles() {
  const { hierarchy, isLoading, fetchHierarchy, createMuscle, updateMuscle, deleteMuscle } = useMuscleStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['chest', 'back', 'legs', 'shoulders', 'arms', 'core']));
  const [expandedMuscleId] = useState<number | null>(null);

  const [newMuscle, setNewMuscle] = useState({
    name: '',
    group: 'chest',
    origin: '',
    insertion: '',
    function: '',
    trainingTips: '',
    parentId: undefined as number | undefined,
  });

  const [editMuscle, setEditMuscle] = useState<Muscle | null>(null);
  const [editDetails, setEditDetails] = useState({
    name: '',
    origin: '',
    insertion: '',
    function: '',
    trainingTips: '',
  });

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

  const resetNewMuscle = () => {
    setNewMuscle({
      name: '',
      group: 'chest',
      origin: '',
      insertion: '',
      function: '',
      trainingTips: '',
      parentId: undefined,
    });
  };

  const handleAddMuscle = async () => {
    if (!newMuscle.name.trim()) return;
    await createMuscle({
      name: newMuscle.name.trim(),
      group: newMuscle.group,
      parentId: newMuscle.parentId,
      origin: newMuscle.origin || undefined,
      insertion: newMuscle.insertion || undefined,
      function: newMuscle.function || undefined,
      trainingTips: newMuscle.trainingTips || undefined,
    });
    resetNewMuscle();
    setShowAddModal(false);
  };

  const handleDeleteMuscle = async (id: number) => {
    if (confirm('确定要删除这个肌肉吗？')) {
      await deleteMuscle(id);
    }
  };

  const openEditModal = (muscle: Muscle) => {
    setEditMuscle(muscle);
    setEditDetails({
      name: muscle.name,
      origin: muscle.origin || '',
      insertion: muscle.insertion || '',
      function: muscle.function || '',
      trainingTips: muscle.trainingTips || '',
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (editMuscle && editDetails.name.trim()) {
      await updateMuscle(editMuscle.id, {
        name: editDetails.name.trim(),
        origin: editDetails.origin || undefined,
        insertion: editDetails.insertion || undefined,
        function: editDetails.function || undefined,
        trainingTips: editDetails.trainingTips || undefined,
      });
      setShowEditModal(false);
      setEditMuscle(null);
    }
  };

  const generateWithAI = async (source: 'add' | 'edit') => {
    const name = source === 'add' ? newMuscle.name : editDetails.name;
    const group = source === 'add' ? newMuscle.group : editMuscle?.group || '';

    if (!name.trim() || !group) {
      alert('请先填写肌肉名称和选择肌肉群');
      return;
    }

    setAiLoading(true);
    try {
      const parentMuscle = hierarchy.find(g => g.group === group)?.children.find(c => c.name === name);
      const parentName = parentMuscle ? hierarchy.find(g => g.children.some(c => c.id === parentMuscle.id))?.name : undefined;

      const details = await adminApi.generateMuscleDetails(name, group, parentName);

      if (source === 'add') {
        setNewMuscle(prev => ({
          ...prev,
          origin: details.origin || prev.origin,
          insertion: details.insertion || prev.insertion,
          function: details.function || prev.function,
          trainingTips: details.trainingTips || prev.trainingTips,
        }));
      } else {
        setEditDetails(prev => ({
          ...prev,
          origin: details.origin || prev.origin,
          insertion: details.insertion || prev.insertion,
          function: details.function || prev.function,
          trainingTips: details.trainingTips || prev.trainingTips,
        }));
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'AI 生成失败');
    } finally {
      setAiLoading(false);
    }
  };

  if (isLoading && hierarchy.length === 0) {
    return <div className="text-center text-text-secondary p-8">加载中...</div>;
  }

  return (
    <div className="h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading text-lg font-bold">肌肉列表</h2>
          <Button size="sm" variant="primary" onClick={() => setShowAddModal(true)}>
            新增
          </Button>
        </div>

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
                    <div
                      key={muscle.id}
                      className={`rounded p-2 transition-colors ${
                        expandedMuscleId === muscle.id
                          ? 'bg-accent-orange/20'
                          : 'hover:bg-primary-tertiary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{muscle.name}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => openEditModal(muscle)}>
                            查看详情
                          </Button>
                          <Button size="sm" variant="primary" onClick={() => openEditModal(muscle)}>
                            编辑
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => muscle.id && handleDeleteMuscle(muscle.id)}>
                            删除
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {expandedMuscleId === muscle.id && (
                          <div className="mt-2 pt-2 border-t border-border/50 space-y-1 text-xs w-full">
                            {muscle.origin && (
                              <div><span className="text-text-muted">起点：</span>{muscle.origin.substring(0, 50)}...</div>
                            )}
                            {muscle.function && (
                              <div><span className="text-text-muted">功能：</span>{muscle.function.substring(0, 50)}...</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 新增弹窗 */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); resetNewMuscle(); }} title="添加肌肉" size="xl">
        <div className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm mb-2">所属肌肉群</label>
            <select
              value={newMuscle.group}
              onChange={(e) => setNewMuscle({ ...newMuscle, group: e.target.value })}
              className="w-full bg-primary-tertiary border border-border px-3 py-2"
            >
              {Object.entries(GROUP_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-text-secondary text-sm mb-2">肌肉名称</label>
              <Button
                size="sm"
                variant="blue"
                onClick={() => generateWithAI('add')}
                disabled={aiLoading || !newMuscle.name.trim()}
              >
                {aiLoading ? '生成中...' : 'AI增强'}
              </Button>
            </div>
            <Input
              value={newMuscle.name}
              onChange={(e) => setNewMuscle({ ...newMuscle, name: e.target.value })}
              placeholder="如：胸大肌"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-2">起点</label>
            <textarea
              value={newMuscle.origin}
              onChange={(e) => setNewMuscle({ ...newMuscle, origin: e.target.value })}
              placeholder="起点位置描述"
              rows={2}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-2">止点</label>
            <textarea
              value={newMuscle.insertion}
              onChange={(e) => setNewMuscle({ ...newMuscle, insertion: e.target.value })}
              placeholder="止点位置描述"
              rows={2}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-2">功能</label>
            <textarea
              value={newMuscle.function}
              onChange={(e) => setNewMuscle({ ...newMuscle, function: e.target.value })}
              placeholder="主要功能描述"
              rows={2}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-2">训练技巧</label>
            <textarea
              value={newMuscle.trainingTips}
              onChange={(e) => setNewMuscle({ ...newMuscle, trainingTips: e.target.value })}
              placeholder="训练技巧和建议"
              rows={3}
              className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => { setShowAddModal(false); resetNewMuscle(); }}>取消</Button>
            <Button variant="primary" onClick={handleAddMuscle}>添加</Button>
          </div>
        </div>
      </Modal>

      {/* 编辑弹窗 */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="编辑肌肉" size="xl">
        {editMuscle && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-text-secondary text-sm mb-2">肌肉名称</label>
                <Button
                  size="sm"
                  variant="blue"
                  onClick={() => generateWithAI('edit')}
                  disabled={aiLoading || !editDetails.name.trim()}
                >
                  {aiLoading ? '生成中...' : 'AI增强'}
                </Button>
              </div>
              <Input
                value={editDetails.name}
                onChange={(e) => setEditDetails({ ...editDetails, name: e.target.value })}
                placeholder="肌肉名称"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-2">起点</label>
              <textarea
                value={editDetails.origin}
                onChange={(e) => setEditDetails({ ...editDetails, origin: e.target.value })}
                placeholder="起点位置描述"
                rows={2}
                className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-2">止点</label>
              <textarea
                value={editDetails.insertion}
                onChange={(e) => setEditDetails({ ...editDetails, insertion: e.target.value })}
                placeholder="止点位置描述"
                rows={2}
                className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-2">功能</label>
              <textarea
                value={editDetails.function}
                onChange={(e) => setEditDetails({ ...editDetails, function: e.target.value })}
                placeholder="主要功能描述"
                rows={2}
                className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-2">训练技巧</label>
              <textarea
                value={editDetails.trainingTips}
                onChange={(e) => setEditDetails({ ...editDetails, trainingTips: e.target.value })}
                placeholder="训练技巧和建议"
                rows={3}
                className="w-full bg-primary-tertiary border border-border px-3 py-2 text-text-primary"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>取消</Button>
              <Button variant="primary" onClick={handleSaveEdit}>保存</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
