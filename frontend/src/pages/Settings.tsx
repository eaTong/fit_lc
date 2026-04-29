import { useState, useEffect } from 'react';
import { userApi } from '../api/user';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import AvatarUpload from '../components/AvatarUpload';

export default function Settings() {
  const [profile, setProfile] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState<number | ''>('');
  const [newWeight, setNewWeight] = useState<number | ''>('');
  const [newBodyFat, setNewBodyFat] = useState<number | ''>('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await userApi.getProfile();
    setProfile(data);
    setNickname(data?.nickname || '');
    setHeight(data?.height || '');
  };

  const saveProfile = async () => {
    await userApi.updateProfile({ nickname, height: height as number });
    if (newWeight) {
      await userApi.addMetric(new Date().toISOString().split('T')[0], newWeight as number, newBodyFat as number || undefined);
      setNewWeight('');
      setNewBodyFat('');
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">设置</h1>

      <div className="space-y-4 max-w-md">
        <Card variant="default">
          <AvatarUpload currentAvatar={profile?.avatar} onUpload={userApi.uploadAvatar} />
          <div className="mt-4 space-y-4">
            <Input label="昵称" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <Input label="身高 (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')} />
            <Input label="体重 (kg)" type="number" value={newWeight} onChange={(e) => setNewWeight(e.target.value ? Number(e.target.value) : '')} />
            <Input label="体脂率 (%)" type="number" value={newBodyFat} onChange={(e) => setNewBodyFat(e.target.value ? Number(e.target.value) : '')} />
            <Button variant="primary" onClick={saveProfile}>保存</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
