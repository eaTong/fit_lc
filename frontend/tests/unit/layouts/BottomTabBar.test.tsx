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

  it('renders all 5 tabs', () => {
    renderWithRouter('/dashboard');

    expect(screen.getByText('首页')).toBeTruthy();
    expect(screen.getByText('数据')).toBeTruthy();
    expect(screen.getByText('计划')).toBeTruthy();
    expect(screen.getByText('知识')).toBeTruthy();
    expect(screen.getByText('我的')).toBeTruthy();
  });

  it('renders all 5 icons', () => {
    renderWithRouter('/dashboard');

    expect(screen.getByText('🏠')).toBeTruthy();
    expect(screen.getByText('📊')).toBeTruthy();
    expect(screen.getByText('📋')).toBeTruthy();
    expect(screen.getByText('📚')).toBeTruthy();
    expect(screen.getByText('👤')).toBeTruthy();
  });

  it('has correct links for each tab', () => {
    renderWithRouter('/dashboard');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);

    const hrefs = links.map(link => link.getAttribute('href'));
    expect(hrefs).toContain('/dashboard');
    expect(hrefs).toContain('/history');
    expect(hrefs).toContain('/plans');
    expect(hrefs).toContain('/muscles');
    expect(hrefs).toContain('/profile');
  });

  it('highlights 首页 tab on /dashboard', () => {
    renderWithRouter('/dashboard');

    const homeTab = screen.getByText('首页').closest('a');
    expect(homeTab?.className).toContain('text-accent-orange');
  });

  it('highlights 首页 tab on /chat', () => {
    renderWithRouter('/chat');

    const homeTab = screen.getByText('首页').closest('a');
    expect(homeTab?.className).toContain('text-accent-orange');
  });

  it('highlights 数据 tab on /history', () => {
    renderWithRouter('/history');

    const dataTab = screen.getByText('数据').closest('a');
    expect(dataTab?.className).toContain('text-accent-orange');
  });

  it('highlights 数据 tab on /trends', () => {
    renderWithRouter('/trends');

    const dataTab = screen.getByText('数据').closest('a');
    expect(dataTab?.className).toContain('text-accent-orange');
  });

  it('highlights 数据 tab on /measurements', () => {
    renderWithRouter('/measurements');

    const dataTab = screen.getByText('数据').closest('a');
    expect(dataTab?.className).toContain('text-accent-orange');
  });

  it('highlights 知识 tab on /muscles', () => {
    renderWithRouter('/muscles');

    const knowledgeTab = screen.getByText('知识').closest('a');
    expect(knowledgeTab?.className).toContain('text-accent-orange');
  });

  it('highlights 知识 tab on /exercises', () => {
    renderWithRouter('/exercises');

    const knowledgeTab = screen.getByText('知识').closest('a');
    expect(knowledgeTab?.className).toContain('text-accent-orange');
  });

  it('highlights 计划 tab on /plans', () => {
    renderWithRouter('/plans');

    const plansTab = screen.getByText('计划').closest('a');
    expect(plansTab?.className).toContain('text-accent-orange');
  });

  it('highlights 我的 tab on /profile', () => {
    renderWithRouter('/profile');

    const profileTab = screen.getByText('我的').closest('a');
    expect(profileTab?.className).toContain('text-accent-orange');
  });

  it('inactive tabs have text-text-secondary class', () => {
    renderWithRouter('/dashboard');

    const dataTab = screen.getByText('数据').closest('a');
    expect(dataTab?.className).toContain('text-text-secondary');

    const plansTab = screen.getByText('计划').closest('a');
    expect(plansTab?.className).toContain('text-text-secondary');
  });

  it('is fixed at bottom', () => {
    renderWithRouter('/dashboard');

    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('fixed');
    expect(nav.className).toContain('bottom-0');
  });
});