import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('renders standalone switch', () => {
    render(<Switch aria-label="Toggle setting" />);
    expect(screen.getByRole('switch', { name: /toggle setting/i })).toBeInTheDocument();
  });

  it('renders with label and description', () => {
    render(
      <Switch
        label="Power mode"
        description="Conserves system memory and rendering pipeline"
      />
    );
    expect(screen.getByText('Power mode')).toBeInTheDocument();
    expect(
      screen.getByText('Conserves system memory and rendering pipeline')
    ).toBeInTheDocument();
  });

  it('toggles switch state on click', async () => {
    const handleCheckedChange = vi.fn();
    render(
      <Switch
        label="Enable notifications"
        onCheckedChange={handleCheckedChange}
      />
    );
    const switchElement = screen.getByRole('switch', {
      name: /enable notifications/i,
    });
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    await userEvent.click(switchElement);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it('disables interaction when disabled is true', async () => {
    const handleCheckedChange = vi.fn();
    render(
      <Switch
        label="Disabled switch"
        disabled
        onCheckedChange={handleCheckedChange}
      />
    );
    const switchElement = screen.getByRole('switch', {
      name: /disabled switch/i,
    });
    expect(switchElement).toBeDisabled();
    await userEvent.click(switchElement);
    expect(handleCheckedChange).not.toHaveBeenCalled();
  });
});
