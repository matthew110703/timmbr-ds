import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Enter username" />);
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('renders with label and helper text', () => {
    render(
      <Input
        label="Username"
        helperText="Enter your unique handle"
        placeholder="Handle"
      />
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Enter your unique handle')).toBeInTheDocument();
  });

  it('renders error state properly', () => {
    render(
      <Input
        label="Email"
        error="Invalid email address"
        placeholder="user@example.com"
      />
    );
    const input = screen.getByPlaceholderText('user@example.com');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type here');
    await userEvent.type(input, 'Hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles clear button click', async () => {
    const handleClear = vi.fn();
    render(
      <Input
        clearable
        defaultValue="Initial text"
        onClear={handleClear}
      />
    );
    const clearBtn = screen.getByRole('button', { name: /clear input/i });
    expect(clearBtn).toBeInTheDocument();
    await userEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('renders left and right adornments', () => {
    render(
      <Input
        leftAdornment={<span data-testid="left-adornment">L</span>}
        rightAdornment={<span data-testid="right-adornment">R</span>}
      />
    );
    expect(screen.getByTestId('left-adornment')).toBeInTheDocument();
    expect(screen.getByTestId('right-adornment')).toBeInTheDocument();
  });

  it('disables input when disabled prop is passed', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('renders with floating label correctly', () => {
    render(<Input label="Floating Label" floating placeholder="Input something" />);
    expect(screen.getByText('Floating Label')).toBeInTheDocument();
  });

  it('renders error icon and helper icon', () => {
    const { rerender } = render(<Input helperText="Help info" />);
    expect(screen.getByText('Help info')).toBeInTheDocument();

    rerender(<Input error="Critical alert" />);
    expect(screen.getByText('Critical alert')).toBeInTheDocument();
  });
});
