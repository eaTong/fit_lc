import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { userApi } from '../api/user';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TabSwitcher from '../components/ui/TabSwitcher';
import AvatarUpload from '../components/AvatarUpload';
import MetricsHistory from '../components/MetricsHistory';

const tabs = [
  { id: 'profile', label: '个人信息' },
  { id: 'body', label: '身体数据' },
  { id: 'security', label: '账号安全' },
];

export default function Profile() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState<number | ''>('');
  const [metrics, setMetrics] = useState<any>({ records: [], total: 0, page: 1 });
  const [newWeight, setNewWeight] = useState<number | ''>('');
  const [newBodyFat, setNewBodyFat] = useState<number | ''>('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    loadProfile();
    if (activeTab === 'body') loadMetrics();
  }, [activeTab]);

  const loadProfile = async () => {
    const data = await userApi.getProfile();
    setProfile(data);
    setNickname(data?.nickname || '');
    setHeight(data?.height || '');
  };

  const loadMetrics = async (page = 1) => {
    const data = await userApi.getMetrics(page);
    setMetrics(data);
  };

  const saveProfile = async () => {
    await userApi.updateProfile({ nickname, height: height as number });
  };

  const addMetric = async () => {
    if (!newWeight) return;
    await userApi.addMetric(new Date().toISOString().split('T')[0], newWeight as number, newBodyFat as number || undefined);
    setNewWeight('');
    setNewBodyFat('');
    loadMetrics();
  };

  const changePassword = async () => {
    await userApi.changePassword(oldPassword, newPassword);
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">个人设置</h1>

      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'profile' && (
          <Card variant="default" className="max-w-md">
            <AvatarUpload currentAvatar={profile?.avatar} onUpload={userApi.uploadAvatar} />
            <div className="mt-4 space-y-4">
              <Input label="昵称" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              <Input label="身高 (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')} />
              <Button variant="primary" onClick={saveProfile}>保存</Button>
            </div>
          </Card>
        )}

        {activeTab === 'body' && (
          <div className="space-y-4 max-w-md">
            <Card variant="default">
              <p className="text-text-secondary text-sm mb-2">当前身高</p>
              <p className="text-text-primary text-lg">{profile?.height || '—'} cm</p>
            </Card>
            <Card variant="default">
              <p className="text-text-secondary text-sm mb-2">记录新数据</p>
              <div className="space-y-2">
                <Input label="体重 (kg)" type="number" value={newWeight} onChange={(e) => setNewWeight(e.target.value ? Number(e.target.value) : '')} />
                <Input label="体脂率 (%)" type="number" value={newBodyFat} onChange={(e) => setNewBodyFat(e.target.value ? Number(e.target.value) : '')} />
                <Button variant="primary" onClick={addMetric}>记录</Button>
              </div>
            </Card>
            <Card variant="default">
              <p className="text-text-secondary text-sm mb-2">历史记录</p>
              <MetricsHistory records={metrics.records} total={metrics.total} page={metrics.page} onPageChange={loadMetrics} />
            </Card>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4 max-w-md">
            <Card variant="default">
              <p className="text-text-secondary text-sm mb-4">修改密码</p>
              <div className="space-y-3">
                <Input label="当前密码" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <Input label="新密码" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <Button variant="primary" onClick={changePassword}>修改密码</Button>
              </div>
            </Card>
            <Card variant="default">
              <Button variant="danger" onClick={logout}>退出登录</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}