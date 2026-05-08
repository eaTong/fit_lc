import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomTabBar from '../../../src/components/BottomTabBar';

describe('BottomTabBar', () => {
  const renderWithRouter = (initialPath: string) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <BottomTabBar />
      </MemoryRouter>
    );
  };

  it('renders all 3 tabs', () => {
    renderWithRouter('/chat');

    expect(screen.getByText('首页')).toBeTruthy();
    expect(screen.getByText('动作')).toBeTruthy();
    expect(screen.getByText('我的')).toBeTruthy();
  });

  it('renders all 3 icons', () => {
    renderWithRouter('/chat');

    expect(screen.getByText('🏠')).toBeTruthy();
    expect(screen.getByText('💪')).toBeTruthy();
    expect(screen.getByText('👤')).toBeTruthy();
  });

  it('has correct links for each tab', () => {
    renderWithRouter('/chat');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    const hrefs = links.map(link => link.getAttribute('href'));
    expect(hrefs).toContain('/chat');
    expect(hrefs).toContain('/exercises');
    expect(hrefs).toContain('/profile');
  });

  it('highlights 首页 tab on /chat', () => {
    renderWithRouter('/chat');

    const homeTab = screen.getByText('首页').closest('a');
    expect(homeTab?.className).toContain('text-accent-orange');
  });

  it('highlights 动作 tab on /exercises', () => {
    renderWithRouter('/exercises');

    const exercisesTab = screen.getByText('动作').closest('a');
    expect(exercisesTab?.className).toContain('text-accent-orange');
  });

  it('highlights 我的 tab on /profile', () => {
    renderWithRouter('/profile');

    const profileTab = screen.getByText('我的').closest('a');
    expect(profileTab?.className).toContain('text-accent-orange');
  });

  it('inactive tabs have text-text-secondary class', () => {
    renderWithRouter('/chat');

    const profileTab = screen.getByText('我的').closest('a');
    expect(profileTab?.className).toContain('text-text-secondary');
  });

  it('is fixed at bottom', () => {
    renderWithRouter('/chat');

    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('fixed');
    expect(nav.className).toContain('bottom-0');
  });
});
