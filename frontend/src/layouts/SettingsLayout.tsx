import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SettingsLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <header className="bg-primary-secondary border-b-2 border-border px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>←</span>
            <span>返回</span>
          </button>
          <Link to="/profile" className="font-heading text-xl font-bold text-accent-orange">
            FITLC
          </Link>
          <div className="w-16" />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
