import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setLocalError('请填写所有字段');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('两次密码不一致');
      return;
    }
    if (password.length < 6) {
      setLocalError('密码至少6位');
      return;
    }
    try {
      await register(email, password);
      navigate('/chat');
    } catch {
      // error handled by store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <Card variant="accent" className="w-full max-w-md">
        <h1 className="font-heading text-4xl font-bold text-accent-orange text-center mb-8">
          FITLC
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />

          <Input
            type="password"
            label="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="至少6位"
          />

          <Input
            type="password"
            label="确认密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="再次输入密码"
          />

          {(error || localError) && (
            <p className="text-accent-red text-sm">{error || localError}</p>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? '注册中...' : '注册'}
          </Button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          已有账户？{' '}
          <Link to="/login" className="text-accent-orange hover:text-accent-red">
            登录
          </Link>
        </p>
      </Card>
    </div>
  );
}