import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import SidebarNav from '../components/SidebarNav';

export default function SidebarLayout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex bg-primary">
      {/* Sidebar */}
      <aside className="w-48 bg-primary-secondary border-r-2 border-border flex flex-col">
        <div className="p-4 border-b-2 border-border">
          <span className="font-heading text-xl font-bold text-accent-orange">
            FITLC
          </span>
          <span className="text-text-secondary text-sm ml-2">管理端</span>
        </div>
        <nav className="flex-1 py-4">
          <SidebarNav />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-primary-secondary border-b-2 border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>←</span>
            <span>返回主应用</span>
          </button>
          <button
            onClick={logout}
            className="text-text-secondary hover:text-accent-red transition-colors"
          >
            退出
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}