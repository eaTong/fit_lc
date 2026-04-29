import { Link, useLocation } from 'react-router-dom';

const adminNavItems = [
  { path: '/admin/exercises', label: '动作库维护', icon: '🏋️' },
  { path: '/admin/muscles', label: '肌肉库维护', icon: '💪' },
];

export default function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-2">
      {adminNavItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded transition-colors
              ${isActive
                ? 'bg-tertiary text-accent-orange'
                : 'text-text-secondary hover:bg-tertiary hover:text-text-primary'
              }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}