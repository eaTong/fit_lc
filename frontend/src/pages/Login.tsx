import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('请填写所有字段');
      return;
    }
    try {
      await login(email, password);
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
            placeholder="••••••••"
          />

          {(error || localError) && (
            <p className="text-accent-red text-sm">{error || localError}</p>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? '登录中...' : '登录'}
          </Button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          还没有账户？{' '}
          <Link to="/register" className="text-accent-orange hover:text-accent-red">
            注册
          </Link>
        </p>
      </Card>
    </div>
  );
}