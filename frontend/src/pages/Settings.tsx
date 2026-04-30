import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Settings() {
  const location = useLocation();
  const isSubPage = location.pathname !== '/settings';

  if (isSubPage) {
    return <Outlet />;
  }

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">设置</h1>

      <div className="space-y-4 max-w-md">
        <Link
          to="/settings/profile"
          className="flex items-center justify-between p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <span className="text-text-primary">基础信息</span>
          </div>
          <span className="text-text-secondary">→</span>
        </Link>

        <Link
          to="/settings/body"
          className="flex items-center justify-between p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <span className="text-text-primary">身体数据</span>
          </div>
          <span className="text-text-secondary">→</span>
        </Link>
      </div>
    </div>
  );
}