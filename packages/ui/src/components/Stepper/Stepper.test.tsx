import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stepper } from './Stepper';

const steps = [{ label: 'Placed' }, { label: 'Confirmed' }, { label: 'Shipped' }];

describe('Stepper', () => {
  it('marks steps before current complete, and current as the current step', () => {
    render(<Stepper steps={steps} current={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items.map((li) => li.getAttribute('data-state'))).toEqual([
      'complete',
      'current',
      'upcoming',
    ]);
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('(completed)', { exact: false })).toBeInTheDocument();
  });

  it('marks the current step as failed with status="error"', () => {
    render(<Stepper steps={[{ label: 'Placed' }, { label: 'Cancelled' }]} current={1} status="error" />);
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('data-state', 'error');
    expect(screen.getByText('(failed)', { exact: false })).toBeInTheDocument();
  });

  it('can show every step complete', () => {
    render(<Stepper steps={steps} current={steps.length} />);
    const states = screen.getAllByRole('listitem').map((li) => li.getAttribute('data-state'));
    expect(states.every((state) => state === 'complete')).toBe(true);
  });
});
