import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Sparkles } from '@timmbr/icons';
import { Icon } from './Icon';

describe('Icon Component', () => {
  it('renders icon with Lucide component', () => {
    render(<Icon icon={Sparkles} aria-label="sparkles-icon" />);
    expect(screen.getByLabelText('sparkles-icon')).toBeInTheDocument();
    expect(screen.getByTestId('timmbr-icon')).toHaveAttribute('data-slot', 'icon');
  });

  it('renders clickable button icon and handles click', async () => {
    const handleClick = vi.fn();
    render(<Icon icon={Sparkles} clickable aria-label="Action" onClick={handleClick} />);
    const btn = screen.getByRole('button', { name: /action/i });
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders raw SVG content', () => {
    render(
      <Icon
        svg={<svg data-testid="raw-svg"><circle cx="5" cy="5" r="5" /></svg>}
      />
    );
    expect(screen.getByTestId('raw-svg')).toBeInTheDocument();
  });

  it('accepts custom style and className', () => {
    render(
      <Icon
        icon={Sparkles}
        className="custom-icon"
        style={{ color: 'rgb(255, 0, 0)' }}
      />
    );
    const el = screen.getByTestId('timmbr-icon');
    expect(el).toHaveClass('custom-icon');
    expect(el).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });
});
