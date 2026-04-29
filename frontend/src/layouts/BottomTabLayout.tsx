import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';

export default function BottomTabLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}