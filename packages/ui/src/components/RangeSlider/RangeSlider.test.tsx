import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { RangeSlider } from './RangeSlider';

describe('RangeSlider Component', () => {
  it('renders slider with readouts', () => {
    render(
      <RangeSlider
        label="Price Range"
        defaultValue={[100, 500]}
        formatValue={(v) => `$${v}`}
      />
    );
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  it('renders actions when showActions is true', async () => {
    const handleApply = vi.fn();
    const handleReset = vi.fn();
    render(
      <RangeSlider
        defaultValue={[20, 80]}
        showActions
        applyLabel="Apply Filter"
        resetLabel="Clear"
        onApply={handleApply}
        onReset={handleReset}
      />
    );

    const applyBtn = screen.getByRole('button', { name: /apply filter/i });
    const resetBtn = screen.getByRole('button', { name: /clear/i });

    expect(applyBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();

    await userEvent.click(applyBtn);
    expect(handleApply).toHaveBeenCalledWith([20, 80]);

    await userEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('disables slider thumbs and actions when disabled', () => {
    render(
      <RangeSlider
        disabled
        defaultValue={[10, 90]}
        showActions
      />
    );
    const applyBtn = screen.getByRole('button', { name: /apply/i });
    expect(applyBtn).toBeDisabled();
  });
});
