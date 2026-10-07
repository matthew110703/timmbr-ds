import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { OtpInput } from './OtpInput';

describe('OtpInput Component', () => {
  it('renders the default 6 slot boxes', () => {
    const { container } = render(<OtpInput length={6} />);
    const slots = container.querySelectorAll('[data-slot="otp-slot"]');
    expect(slots.length).toBe(6);
  });

  it('renders custom number of slots', () => {
    const { container } = render(<OtpInput length={4} />);
    const slots = container.querySelectorAll('[data-slot="otp-slot"]');
    expect(slots.length).toBe(4);
  });

  it('displays error message when provided', () => {
    render(<OtpInput error="Invalid verification code" />);
    expect(screen.getByText('Invalid verification code')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    const { container } = render(<OtpInput length={6} onChange={handleChange} />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();

    if (input) {
      await userEvent.type(input, '123');
      expect(handleChange).toHaveBeenCalled();
    }
  });
});
