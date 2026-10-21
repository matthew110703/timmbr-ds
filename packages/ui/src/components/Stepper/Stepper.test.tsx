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

describe('Stepper — progress variant', () => {
  const progressSteps = [
    { label: 'Card Details', icon: <span data-testid="icon-card" /> },
    { label: 'Form Review', icon: <span data-testid="icon-form" /> },
    { label: 'Authenticate OTP', icon: <span data-testid="icon-otp" /> },
  ];

  it('renders STEP labels for each step', () => {
    render(<Stepper steps={progressSteps} current={1} variant="progress" />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders correct default badge text per state', () => {
    render(<Stepper steps={progressSteps} current={1} variant="progress" />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders correct badge text for error state', () => {
    render(<Stepper steps={progressSteps} current={1} status="error" variant="progress" />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('respects statusLabel override on individual steps', () => {
    const stepsWithLabel = [
      { label: 'Card Details', statusLabel: 'Done' },
      { label: 'Form Review', statusLabel: 'Active' },
    ];
    render(<Stepper steps={stepsWithLabel} current={1} variant="progress" />);
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('sets correct data-state attributes', () => {
    render(<Stepper steps={progressSteps} current={1} variant="progress" />);
    const items = screen.getAllByRole('listitem');
    expect(items.map((li) => li.getAttribute('data-state'))).toEqual([
      'complete',
      'current',
      'upcoming',
    ]);
    expect(items[1]).toHaveAttribute('aria-current', 'step');
  });

  it('shows icon for non-complete steps and overrides it with Check for complete', () => {
    render(<Stepper steps={progressSteps} current={1} variant="progress" />);
    expect(screen.queryByTestId('icon-card')).not.toBeInTheDocument();
    expect(screen.getByTestId('icon-form')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const stepsWithDesc = [{ label: 'Step A', description: 'Hint text' }];
    render(<Stepper steps={stepsWithDesc} current={0} variant="progress" />);
    expect(screen.getByText('Hint text')).toBeInTheDocument();
  });
});
