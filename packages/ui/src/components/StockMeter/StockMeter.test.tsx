import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StockMeter } from './StockMeter';

describe('StockMeter', () => {
  it('shows the urgency line at or below the threshold', () => {
    render(<StockMeter available={3} />);
    expect(screen.getByText('Hurry! Only 3 left in stock')).toBeInTheDocument();
  });

  it('renders nothing when plentiful or sold out', () => {
    const { container, rerender } = render(<StockMeter available={6} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<StockMeter available={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('takes custom copy and threshold', () => {
    render(<StockMeter available={8} threshold={10} label={(n) => `${n} pieces left`} />);
    expect(screen.getByText('8 pieces left')).toBeInTheDocument();
  });
});
