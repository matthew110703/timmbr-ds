import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FilterChips } from './FilterChips';

const chips = [
  { id: 'material:teak', label: 'Teak', extra: 1 },
  { id: 'price', label: '₹1,000 – ₹5,000', extra: 2 },
];

describe('FilterChips', () => {
  it('removes a chip and passes the full chip back', () => {
    const onRemove = vi.fn();
    render(<FilterChips chips={chips} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Teak' }));
    expect(onRemove).toHaveBeenCalledWith(chips[0]);
  });

  it('offers "Clear all" only for more than one chip', () => {
    const onClearAll = vi.fn();
    const { rerender } = render(<FilterChips chips={chips} onRemove={() => undefined} onClearAll={onClearAll} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onClearAll).toHaveBeenCalled();
    rerender(<FilterChips chips={[chips[0]]} onRemove={() => undefined} onClearAll={onClearAll} />);
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
  });

  it('renders nothing without chips', () => {
    const { container } = render(<FilterChips chips={[]} onRemove={() => undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
});
