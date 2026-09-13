import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { Button } from './Button';
import { TimmbrConfigProvider } from '../../providers';

describe('Button component', () => {
  it('renders default button text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-brand-500');
  });

  it('renders with custom variant and size classes', () => {
    render(
      <Button variant="outline" size="sm">
        Small Outline
      </Button>
    );
    const button = screen.getByRole('button', { name: /small outline/i });
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('h-9');
  });

  it('triggers click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Trigger</Button>);

    const button = screen.getByRole('button', { name: /trigger/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports asChild composition with Slot', () => {
    render(
      <Button asChild>
        <a href="#test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#test');
    expect(link).toHaveClass('bg-brand-500');
  });

  it('honors global config defaults when not overridden', () => {
    render(
      <TimmbrConfigProvider
        config={{
          components: {
            button: {
              defaultVariant: 'outline',
            },
          },
        }}
      >
        <Button>Configured</Button>
      </TimmbrConfigProvider>
    );
    const button = screen.getByRole('button', { name: /configured/i });
    expect(button).toHaveClass('border');
  });

  it('allows component props to override global config defaults', () => {
    render(
      <TimmbrConfigProvider
        config={{
          components: {
            button: {
              defaultVariant: 'outline',
            },
          },
        }}
      >
        <Button variant="ghost">Overridden</Button>
      </TimmbrConfigProvider>
    );
    const button = screen.getByRole('button', { name: /overridden/i });
    expect(button).toHaveClass('hover:bg-slate-100');
  });
});
