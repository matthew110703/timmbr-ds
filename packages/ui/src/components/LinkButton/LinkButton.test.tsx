import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TimmbrConfigProvider } from '../../providers';
import { LinkButton } from './LinkButton';

describe('LinkButton Component', () => {
  it('renders anchor element with href and children using link styling by default', () => {
    render(<LinkButton href="/dashboard">Go to Dashboard</LinkButton>);
    const link = screen.getByRole('link', { name: /go to dashboard/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/dashboard');
    expect(link).toHaveAttribute('data-slot', 'link-button');
    // Default variant is styled like a link
    expect(link).toHaveClass('text-primary');
    expect(link).toHaveClass('hover:underline');
    expect(link).toHaveClass('p-0');
  });

  it('renders with button appearance when a button variant is specified', () => {
    render(
      <LinkButton href="/signup" variant="primary" size="lg">
        Sign Up
      </LinkButton>
    );
    const link = screen.getByRole('link', { name: /sign up/i });
    expect(link).toHaveClass('bg-primary');
    expect(link).toHaveClass('h-[52px]');
    expect(link).toHaveClass('px-6');
  });

  it('renders with adornment icons', () => {
    render(
      <LinkButton
        href="/explore"
        leftIcon={<span data-testid="left-icon">★</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Explore
      </LinkButton>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('uses native <a> and marks cross-zone when crossZone={true}', () => {
    render(
      <LinkButton href="/external-portal" crossZone>
        Cross-Zone Portal
      </LinkButton>
    );
    const link = screen.getByRole('link', { name: /cross-zone portal/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/external-portal');
    expect(link).toHaveAttribute('data-cross-zone', 'true');
  });

  it('resolves zone URL and marks cross-zone when zone differs from currentZone', () => {
    render(
      <TimmbrConfigProvider
        config={{
          zones: {
            currentZone: 'main',
            zones: {
              docs: 'https://docs.timmbr.com',
            },
          },
        }}
      >
        <LinkButton zone="docs" href="/setup">
          Documentation
        </LinkButton>
      </TimmbrConfigProvider>
    );

    const link = screen.getByRole('link', { name: /documentation/i });
    expect(link).toHaveAttribute('href', 'https://docs.timmbr.com/setup');
    expect(link).toHaveAttribute('data-cross-zone', 'true');
  });

  it('sets rel="noopener noreferrer" automatically for external URLs', () => {
    render(<LinkButton href="https://github.com">GitHub</LinkButton>);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles click events when enabled', async () => {
    const handleClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    render(
      <LinkButton href="#action" onClick={handleClick}>
        Action Link
      </LinkButton>
    );
    await userEvent.click(screen.getByRole('link', { name: /action link/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click navigation and applies disabled styles when disabled', async () => {
    const handleClick = vi.fn();
    render(
      <LinkButton href="/forbidden" disabled onClick={handleClick}>
        Disabled Link
      </LinkButton>
    );
    const link = screen.getByText('Disabled Link').closest('a');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');

    if (link) {
      await userEvent.click(link);
    }
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders loading state and disables interactions', async () => {
    const handleClick = vi.fn();
    render(
      <LinkButton href="/loading" loading loadingText="Navigating..." onClick={handleClick}>
        Submit
      </LinkButton>
    );
    const link = screen.getByText('Navigating...').closest('a');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Navigating...')).toBeInTheDocument();

    if (link) {
      await userEvent.click(link);
    }
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('supports asChild composition', () => {
    render(
      <LinkButton asChild href="/nested">
        <a href="/custom-url" data-testid="custom-link">
          Custom Child Link
        </a>
      </LinkButton>
    );
    const link = screen.getByTestId('custom-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/custom-url');
    expect(link).toHaveAttribute('data-slot', 'link-button');
  });

  it('accepts custom style and className', () => {
    render(
      <LinkButton href="/styled" className="custom-link-class" style={{ marginTop: '12px' }}>
        Styled Link
      </LinkButton>
    );
    const link = screen.getByRole('link', { name: /styled link/i });
    expect(link).toHaveClass('custom-link-class');
    expect(link).toHaveStyle({ marginTop: '12px' });
  });
});
