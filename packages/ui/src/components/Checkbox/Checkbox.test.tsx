import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders standalone checkbox', () => {
    render(<Checkbox aria-label="Standalone checkbox" />);
    expect(
      screen.getByRole('checkbox', { name: /standalone checkbox/i })
    ).toBeInTheDocument();
  });

  it('renders with label and description', () => {
    render(
      <Checkbox
        label="Accept newsletter"
        description="Receive weekly wood inspiration"
      />
    );
    expect(screen.getByText('Accept newsletter')).toBeInTheDocument();
    expect(screen.getByText('Receive weekly wood inspiration')).toBeInTheDocument();
  });

  it('toggles checked state when clicked', async () => {
    const handleCheckedChange = vi.fn();
    render(
      <Checkbox
        label="Enable notifications"
        onCheckedChange={handleCheckedChange}
      />
    );
    const checkbox = screen.getByRole('checkbox', {
      name: /enable notifications/i,
    });
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it('renders error message properly', () => {
    render(
      <Checkbox
        label="Accept privacy policy"
        error="You must agree to continue"
      />
    );
    expect(screen.getByText('You must agree to continue')).toBeInTheDocument();
  });

  it('disables interactions when disabled is true', async () => {
    const handleCheckedChange = vi.fn();
    render(
      <Checkbox
        label="Disabled option"
        disabled
        onCheckedChange={handleCheckedChange}
      />
    );
    const checkbox = screen.getByRole('checkbox', {
      name: /disabled option/i,
    });
    expect(checkbox).toBeDisabled();
    await userEvent.click(checkbox);
    expect(handleCheckedChange).not.toHaveBeenCalled();
  });
});
