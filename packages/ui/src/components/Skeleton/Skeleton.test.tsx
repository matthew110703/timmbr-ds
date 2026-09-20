import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('renders single skeleton element', () => {
    const { container } = render(<Skeleton variant="rectangular" height={100} />);
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ height: '100px' });
  });

  it('renders multiline text skeleton group', () => {
    const { container } = render(<Skeleton variant="text" lines={4} />);
    const group = container.querySelector('[data-slot="skeleton-group"]');
    expect(group).toBeInTheDocument();
    expect(group?.children.length).toBe(4);
  });
});
