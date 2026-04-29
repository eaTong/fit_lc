import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { userApi } from '../api/user';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TabSwitcher from '../components/ui/TabSwitcher';
import AvatarUpload from '../components/AvatarUpload';

const tabs = [
  { id: 'security', label: '账号安全' },
  { id: 'coach', label: 'AI 私教' },
];

export default function Settings() {
  const { logout, coachConfig, fetchCoachConfig, updateCoachConfig } = useAuthStore();
  const [activeTab, setActiveTab] = useState('security');
  const [profile, setProfile] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState<number | ''>('');
  const [newWeight, setNewWeight] = useState<number | ''>('');
  const [newBodyFat, setNewBodyFat] = useState<number | ''>('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    loadProfile();
    if (activeTab === 'coach') loadCoachConfig();
  }, [activeTab]);

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

  const changePassword = async () => {
    await userApi.changePassword(oldPassword, newPassword);
    setOldPassword('');
    setNewPassword('');
  };

  const loadCoachConfig = async () => {
    await fetchCoachConfig();
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">设置</h1>

      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'security' && (
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

        {activeTab === 'coach' && (
          <div className="space-y-4 max-w-md">
            <Card variant="default">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-text-primary font-heading">AI 主动提醒</h3>
                  <p className="text-text-secondary text-sm">开启后，小Fit将在适当时候主动提醒你</p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                    coachConfig?.enabled ? 'bg-accent-orange' : 'bg-border'
                  }`}
                  onClick={async () => {
                    if (!coachConfig) return;
                    await updateCoachConfig({ enabled: !coachConfig.enabled });
                  }}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      coachConfig?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </div>
            </Card>

            {coachConfig?.enabled && (
              <Card variant="default">
                <div className="space-y-4">
                  <div>
                    <label className="text-text-primary text-sm block mb-1">每日提醒时间</label>
                    <input
                      type="time"
                      value={coachConfig?.reminderTime || '09:00'}
                      onChange={async (e) => {
                        await updateCoachConfig({ reminderTime: e.target.value });
                      }}
                      className="w-full px-4 py-2 bg-primary-secondary border-2 border-border rounded text-text-primary"
                    />
                  </div>
                  <p className="text-text-secondary text-xs">
                    每天最多 {coachConfig?.maxDailyMessages} 条主动消息
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
