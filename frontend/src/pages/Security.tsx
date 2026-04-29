import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { userApi } from '../api/user';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Security() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    setError('');
    if (newPassword !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    if (newPassword.length < 6) {
      setError('密码长度至少6位');
      return;
    }
    try {
      await userApi.changePassword(oldPassword, newPassword);
      alert('密码修改成功');
      navigate('/settings');
    } catch (err: any) {
      setError(err.message || '修改失败');
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">账号安全</h1>

      <div className="space-y-4 max-w-md">
        <Card variant="default">
          <p className="text-text-secondary text-sm mb-4">修改密码</p>
          <div className="space-y-3">
            <Input
              label="当前密码"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              label="新密码"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="确认新密码"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-accent-red text-sm">{error}</p>}
            <Button variant="primary" onClick={handleChangePassword}>修改密码</Button>
          </div>
        </Card>

        <Card variant="default">
          <Button variant="danger" onClick={logout}>退出登录</Button>
        </Card>
      </div>
    </div>
  );
}
