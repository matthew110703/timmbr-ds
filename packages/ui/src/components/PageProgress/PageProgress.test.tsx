import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { PageProgress } from './PageProgress';

describe('PageProgress', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a progressbar when loading', () => {
    render(<PageProgress loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('does not render when loading is false initially', () => {
    render(<PageProgress loading={false} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('sets aria-valuenow for determinate progress', () => {
    render(<PageProgress loading progress={42} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
  });

  it('has no aria-valuenow in indeterminate mode', () => {
    render(<PageProgress loading />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });

  it('hides after loading becomes false (instant when animations off)', () => {
    vi.useFakeTimers();
    const { rerender } = render(<PageProgress loading motion={false} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    rerender(<PageProgress loading={false} motion={false} />);
    act(() => { vi.runAllTimers(); });
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
