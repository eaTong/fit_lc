import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/chat', label: '首页', icon: '🏠' },
  { path: '/history', label: '数据', icon: '📊' },
  { path: '/plans', label: '计划', icon: '📋' },
  { path: '/muscles', label: '知识', icon: '📚' },
  { path: '/profile', label: '我的', icon: '👤' },
];

export default function BottomTabBar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/chat') {
      return location.pathname === '/chat';
    }
    if (path === '/history') {
      return location.pathname.startsWith('/history') ||
             location.pathname.startsWith('/dashboard') ||
             location.pathname.startsWith('/trends') ||
             location.pathname.startsWith('/measurements');
    }
    if (path === '/muscles') {
      return location.pathname.startsWith('/muscles') ||
             location.pathname.startsWith('/exercises');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary-secondary border-t-2 border-border">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors
              ${isActive(tab.path) ? 'text-accent-orange' : 'text-text-secondary'}`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}