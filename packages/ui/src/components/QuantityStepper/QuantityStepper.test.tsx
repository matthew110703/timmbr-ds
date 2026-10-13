import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QuantityStepper } from './QuantityStepper';

function Controlled(props: { max?: number; onChange?: (n: number) => void }) {
  const [value, setValue] = React.useState(1);
  return (
    <QuantityStepper
      value={value}
      max={props.max}
      onChange={(n) => {
        setValue(n);
        props.onChange?.(n);
      }}
    />
  );
}

describe('QuantityStepper', () => {
  it('steps between min and max, disabling the buttons at the limits', () => {
    render(<Controlled max={2} />);
    const minus = screen.getByRole('button', { name: 'Decrease quantity' });
    const plus = screen.getByRole('button', { name: 'Increase quantity' });

    expect(minus).toBeDisabled();
    fireEvent.click(plus);
    expect(screen.getByRole('status')).toHaveTextContent('2');
    expect(plus).toBeDisabled();
    expect(minus).toBeEnabled();
  });

  it('steps with the arrow keys and never past max', () => {
    const onChange = vi.fn();
    render(<Controlled max={3} onChange={onChange} />);
    const group = screen.getByRole('group', { name: 'Quantity' });

    fireEvent.keyDown(group, { key: 'ArrowUp' });
    fireEvent.keyDown(group, { key: 'ArrowUp' });
    fireEvent.keyDown(group, { key: 'ArrowUp' });
    fireEvent.keyDown(group, { key: 'ArrowDown' });

    expect(onChange.mock.calls.map(([n]) => n)).toEqual([2, 3, 2]);
  });

  it('can be disabled and relabelled', () => {
    render(<QuantityStepper value={1} onChange={() => {}} disabled labels={{ group: 'Qty', increase: 'More' }} />);
    expect(screen.getByRole('group', { name: 'Qty' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More' })).toBeDisabled();
  });
});
