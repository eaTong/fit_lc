import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../api/user';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function BodySettings() {
  const navigate = useNavigate();
  const [height, setHeight] = useState<number | ''>('');
  const [newWeight, setNewWeight] = useState<number | ''>('');
  const [newBodyFat, setNewBodyFat] = useState<number | ''>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await userApi.getProfile();
    setHeight(data?.height || '');
  };

  const saveBodyData = async () => {
    setSaving(true);
    try {
      if (height) {
        await userApi.updateProfile({ height: height as number });
      }
      if (newWeight) {
        await userApi.addMetric(
          new Date().toISOString().split('T')[0],
          newWeight as number,
          newBodyFat as number || undefined
        );
      }
      navigate('/profile');
    } catch (err) {
      console.error('Failed to save body data:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-2xl font-bold mb-6">身体数据</h1>

      <div className="space-y-4 max-w-md">
        <Card variant="default">
          <div className="space-y-4">
            <Input
              label="身高 (cm)"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
              placeholder="请输入身高"
            />
            <Input
              label="今日体重 (kg)"
              type="number"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value ? Number(e.target.value) : '')}
              placeholder="请输入体重"
            />
            <Input
              label="今日体脂率 (%)"
              type="number"
              value={newBodyFat}
              onChange={(e) => setNewBodyFat(e.target.value ? Number(e.target.value) : '')}
              placeholder="请输入体脂率（可选）"
            />
            <Button variant="primary" onClick={saveBodyData} disabled={saving}>
              {saving ? '保存中...' : '保存'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}