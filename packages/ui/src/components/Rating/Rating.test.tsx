import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Rating } from './Rating';

describe('Rating', () => {
  it('shows the value and count with an accessible description', () => {
    render(<Rating value={4.5} count={1817} />);
    const rating = screen.getByRole('img', { name: 'Rated 4.5 out of 5 from 1,817 ratings' });
    expect(rating).toHaveTextContent('4.5');
    expect(rating).toHaveTextContent('(1,817)');
  });

  it('works without a count and accepts a custom label', () => {
    const { rerender } = render(<Rating value={4} />);
    expect(screen.getByRole('img', { name: 'Rated 4 out of 5' })).not.toHaveTextContent('(');
    rerender(<Rating value={4} label="4 stars" />);
    expect(screen.getByRole('img', { name: '4 stars' })).toBeInTheDocument();
  });
});
