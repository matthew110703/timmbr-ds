import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { discountPercent, Price } from './Price';

describe('discountPercent', () => {
  it.each([
    [32999, 66999, 51],
    [100, 100, null],
    [120, 100, null],
    [100, null, null],
    [100, 0, null],
    [999, 1000, null], // rounds to 0%
  ])('%s against %s → %s', (amount, compareAt, expected) => {
    expect(discountPercent(amount, compareAt)).toBe(expected);
  });
});

describe('Price', () => {
  it('shows the price, the struck-through original and the saving', () => {
    render(<Price amount={32999} compareAt={66999} />);
    expect(screen.getByText('₹32,999')).toBeInTheDocument();
    expect(screen.getByText('₹66,999').tagName).toBe('S');
    expect(screen.getByText('51% Off')).toBeInTheDocument();
  });

  it('shows only the price when there is no saving', () => {
    const { container } = render(<Price amount={500} compareAt={400} />);
    expect(container.querySelector('[data-slot=price-compare]')).toBeNull();
    expect(container.querySelector('[data-slot=price-discount]')).toBeNull();
  });

  it('can hide or reword the saving and label prices for screen readers', () => {
    const { container, rerender } = render(<Price amount={50} compareAt={100} showDiscount={false} />);
    expect(container.querySelector('[data-slot=price-discount]')).toBeNull();

    rerender(
      <Price
        amount={50}
        compareAt={100}
        formatDiscount={(p) => `Save ${p}%`}
        srLabels={{ price: 'Price', compareAt: 'Original price' }}
      />
    );
    expect(screen.getByText('Save 50%')).toBeInTheDocument();
    expect(screen.getByText('Original price')).toHaveClass('sr-only');
  });
});
