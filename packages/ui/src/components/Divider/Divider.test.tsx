import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider Component', () => {
  it('renders horizontal separator by default', () => {
    render(<Divider decorative={false} />);
    const sep = screen.getByRole('separator');
    expect(sep).toHaveAttribute('data-slot', 'divider');
  });

  it('renders centered label when provided', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('accepts custom style and className', () => {
    render(<Divider className="custom-div-class" style={{ opacity: 0.5 }} decorative={false} />);
    const sep = screen.getByRole('separator');
    expect(sep).toHaveClass('custom-div-class');
    expect(sep).toHaveStyle({ opacity: '0.5' });
  });
});
