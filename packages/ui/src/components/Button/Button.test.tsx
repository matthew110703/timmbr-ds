import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders with adornment icons', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">★</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        With Icons
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Action</Button>);
    await userEvent.click(screen.getByRole('button', { name: /action/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders loading state and disables interactions', () => {
    render(<Button loading loadingText="Loading...">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('supports asChild composition', () => {
    render(
      <Button asChild>
        <a href="/test">Custom Link</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /custom link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('accepts custom style and className', () => {
    render(
      <Button className="custom-test-class" style={{ marginTop: '10px' }}>
        Styled
      </Button>
    );
    const btn = screen.getByRole('button', { name: /styled/i });
    expect(btn).toHaveClass('custom-test-class');
    expect(btn).toHaveStyle({ marginTop: '10px' });
  });
});
