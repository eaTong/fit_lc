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

  it('renders all 6 tabs', () => {
    renderWithRouter('/chat');

    expect(screen.getByText('首页')).toBeTruthy();
    expect(screen.getByText('历史')).toBeTruthy();
    expect(screen.getByText('相册')).toBeTruthy();
    expect(screen.getByText('计划')).toBeTruthy();
    expect(screen.getByText('知识')).toBeTruthy();
    expect(screen.getByText('我的')).toBeTruthy();
  });

  it('renders all 6 icons', () => {
    renderWithRouter('/chat');

    expect(screen.getByText('🏠')).toBeTruthy();
    expect(screen.getByText('📊')).toBeTruthy();
    expect(screen.getByText('🖼️')).toBeTruthy();
    expect(screen.getByText('📋')).toBeTruthy();
    expect(screen.getByText('📚')).toBeTruthy();
    expect(screen.getByText('👤')).toBeTruthy();
  });

  it('has correct links for each tab', () => {
    renderWithRouter('/chat');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(6);

    const hrefs = links.map(link => link.getAttribute('href'));
    expect(hrefs).toContain('/chat');
    expect(hrefs).toContain('/history');
    expect(hrefs).toContain('/gallery');
    expect(hrefs).toContain('/plans');
    expect(hrefs).toContain('/muscles');
    expect(hrefs).toContain('/profile');
  });

  it('highlights 首页 tab on /chat', () => {
    renderWithRouter('/chat');

    const homeTab = screen.getByText('首页').closest('a');
    expect(homeTab?.className).toContain('text-accent-orange');
  });

  it('highlights 历史 tab on /history', () => {
    renderWithRouter('/history');

    const historyTab = screen.getByText('历史').closest('a');
    expect(historyTab?.className).toContain('text-accent-orange');
  });

  it('highlights 相册 tab on /gallery', () => {
    renderWithRouter('/gallery');

    const galleryTab = screen.getByText('相册').closest('a');
    expect(galleryTab?.className).toContain('text-accent-orange');
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
    renderWithRouter('/chat');

    const plansTab = screen.getByText('计划').closest('a');
    expect(plansTab?.className).toContain('text-text-secondary');

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
