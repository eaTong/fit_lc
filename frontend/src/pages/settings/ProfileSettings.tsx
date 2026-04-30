import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../api/user';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AvatarUpload from '../../components/AvatarUpload';

interface UserProfile {
  nickname?: string;
  avatar?: string;
  height?: number;
}

export default function ProfileSettings() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [nickname, setNickname] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await userApi.getProfile();
    setProfile(data);
    setNickname(data?.nickname || '');
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await userApi.updateProfile({ nickname });
      navigate('/profile');
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-2xl font-bold mb-6">基础信息</h1>

      <div className="space-y-4 max-w-md">
        <Card variant="default">
          <AvatarUpload currentAvatar={profile?.avatar} onUpload={userApi.uploadAvatar} />
          <div className="mt-4 space-y-4">
            <Input
              label="昵称"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入昵称"
            />
            <Button variant="primary" onClick={saveProfile} disabled={saving}>
              {saving ? '保存中...' : '保存'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}