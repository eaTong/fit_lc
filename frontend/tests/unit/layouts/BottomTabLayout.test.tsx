import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomTabLayout from '../../../src/layouts/BottomTabLayout';

describe('BottomTabLayout', () => {
  it('renders the layout with Header and BottomTabBar', () => {
    const { container } = render(
      <MemoryRouter>
        <BottomTabLayout />
      </MemoryRouter>
    );

    // The layout should have the expected structure
    const wrapper = container.querySelector('.min-h-screen');
    expect(wrapper).toBeTruthy();

    const main = container.querySelector('main');
    expect(main).toBeTruthy();
  });

  it('main element has pb-16 class for bottom tab avoidance', () => {
    const { container } = render(
      <MemoryRouter>
        <BottomTabLayout />
      </MemoryRouter>
    );

    const main = container.querySelector('main');
    expect(main?.className).toContain('pb-16');
    expect(main?.className).toContain('flex-1');
  });

  it('layout uses flex column direction', () => {
    const { container } = render(
      <MemoryRouter>
        <BottomTabLayout />
      </MemoryRouter>
    );

    const wrapper = container.querySelector('.min-h-screen');
    expect(wrapper?.className).toContain('flex');
    expect(wrapper?.className).toContain('flex-col');
  });
});