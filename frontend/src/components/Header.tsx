import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Header() {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.roles?.includes('admin');

  const navItems = [
    { path: '/dashboard', label: '看板' },
    { path: '/chat', label: '对话' },
    { path: '/history', label: '历史' },
    { path: '/trends', label: '趋势' },
    { path: '/profile', label: '个人' },
    { path: '/plans', label: '计划' },
    { path: '/muscles', label: '肌肉' },
    { path: '/exercises', label: '动作' },
  ];

  const adminItems = [
    { path: '/admin/exercises', label: '动作库维护' },
    { path: '/admin/muscles', label: '肌肉库维护' },
  ];

  return (
    <header className="bg-primary-secondary border-b-2 border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/chat" className="font-heading text-2xl font-bold text-accent-orange">
          FITLC
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 font-heading font-medium uppercase tracking-wide
                transition-all duration-150
                ${
                  location.pathname === item.path
                    ? 'text-accent-orange'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && adminItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 font-heading font-medium uppercase tracking-wide
                transition-all duration-150
                ${
                  location.pathname === item.path
                    ? 'text-accent-orange'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="text-text-secondary hover:text-accent-red transition-colors duration-150"
        >
          退出
        </button>
      </div>
    </header>
  );
}