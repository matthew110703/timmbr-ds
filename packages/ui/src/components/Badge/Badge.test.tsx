import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders badge with label', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByTestId('timmbr-badge')).toHaveAttribute('data-slot', 'badge');
  });

  it('renders with dot indicator', () => {
    render(<Badge dot>Live</Badge>);
    expect(screen.getByTestId('timmbr-badge').querySelector('[data-slot="badge-dot"]')).toBeInTheDocument();
  });

  it('renders with left and right adornment icons', () => {
    render(
      <Badge
        leftIcon={<span data-testid="b-left">★</span>}
        rightIcon={<span data-testid="b-right">✓</span>}
      >
        Adorned
      </Badge>
    );
    expect(screen.getByTestId('b-left')).toBeInTheDocument();
    expect(screen.getByTestId('b-right')).toBeInTheDocument();
  });

  it('accepts custom style and className', () => {
    render(
      <Badge className="custom-badge-cls" style={{ opacity: 0.9 }}>
        Styled
      </Badge>
    );
    const badge = screen.getByTestId('timmbr-badge');
    expect(badge).toHaveClass('custom-badge-cls');
    expect(badge).toHaveStyle({ opacity: '0.9' });
  });
});
