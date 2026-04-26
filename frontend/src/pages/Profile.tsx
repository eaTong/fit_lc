import { useAuthStore } from '../stores/authStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Profile() {
  const { user, logout } = useAuthStore();

  return (
    <div className="px-6 py-4 flex flex-col items-center">
      <h1 className="font-heading text-3xl font-bold mb-8">个人中心</h1>

      <Card variant="accent" className="w-full max-w-md text-center">
        <div className="w-24 h-24 bg-primary-tertiary border-2 border-accent-orange mx-auto mb-6 flex items-center justify-center">
          <span className="font-heading text-4xl text-accent-orange">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </span>
        </div>

        <p className="text-text-primary text-lg mb-6">{user?.email}</p>

        <Button variant="outline" onClick={logout} className="w-full">
          退出登录
        </Button>
      </Card>
    </div>
  );
}