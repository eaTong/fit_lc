import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SidebarNav from '../../../src/components/SidebarNav';

describe('SidebarNav', () => {
  const renderWithRouter = (initialPath: string) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <SidebarNav />
      </MemoryRouter>
    );
  };

  it('renders both admin nav items', () => {
    renderWithRouter('/admin/exercises');

    expect(screen.getByText('动作库维护')).toBeTruthy();
    expect(screen.getByText('肌肉库维护')).toBeTruthy();
  });

  it('renders both icons', () => {
    renderWithRouter('/admin/exercises');

    expect(screen.getByText('🏋️')).toBeTruthy();
    expect(screen.getByText('💪')).toBeTruthy();
  });

  it('has correct links for each nav item', () => {
    renderWithRouter('/admin/exercises');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    const hrefs = links.map(link => link.getAttribute('href'));
    expect(hrefs).toContain('/admin/exercises');
    expect(hrefs).toContain('/admin/muscles');
  });

  it('highlights 动作库维护 on /admin/exercises', () => {
    renderWithRouter('/admin/exercises');

    const exercisesLink = screen.getByText('动作库维护').closest('a');
    expect(exercisesLink?.className).toContain('text-accent-orange');
  });

  it('highlights 肌肉库维护 on /admin/muscles', () => {
    renderWithRouter('/admin/muscles');

    const musclesLink = screen.getByText('肌肉库维护').closest('a');
    expect(musclesLink?.className).toContain('text-accent-orange');
  });

  it('inactive item has text-text-secondary class', () => {
    renderWithRouter('/admin/exercises');

    const musclesLink = screen.getByText('肌肉库维护').closest('a');
    expect(musclesLink?.className).toContain('text-text-secondary');
  });

  it('inactive item does not have text-accent-orange', () => {
    renderWithRouter('/admin/exercises');

    const musclesLink = screen.getByText('肌肉库维护').closest('a');
    expect(musclesLink?.className).not.toContain('text-accent-orange');
  });

  it('is a nav element', () => {
    renderWithRouter('/admin/exercises');

    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();
  });
});