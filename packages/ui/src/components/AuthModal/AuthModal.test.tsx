import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { AuthModal } from './AuthModal';
import type { AuthModalProps } from './AuthModal.types';

beforeAll(() => {
  if (typeof document !== 'undefined' && !document.elementFromPoint) {
    document.elementFromPoint = () => null;
  }
});

const renderModal = (props: Partial<AuthModalProps> & Pick<AuthModalProps, 'form'>) =>
  render(<AuthModal isOpen onClose={vi.fn()} {...props} />);

describe('AuthModal', () => {
  it('does not render when isOpen is false', () => {
    render(<AuthModal isOpen={false} onClose={vi.fn()} form={{}} />);
    expect(screen.queryByText('Log in or Sign up')).not.toBeInTheDocument();
  });

  it('closes via the close button', async () => {
    const onClose = vi.fn();
    render(<AuthModal isOpen onClose={onClose} form={{}} />);

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  // ─── IDENTIFIER ──────────────────────────────────────────────────────────────

  describe('IDENTIFIER step', () => {
    it('renders the form with banner content from data', () => {
      renderModal({
        banner: {
          data: { title: 'FRESH', promoBadge: 'UPTO 20% OFF', imageUrl: 'https://img/banner.png' },
        },
        form: { step: 'IDENTIFIER', identifier: 'test@example.com' },
      });

      expect(screen.getByText('Log in or Sign up')).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Email or mobile number' })).toHaveAttribute(
        'autocomplete',
        'username'
      );
      expect(screen.getByText('FRESH')).toBeInTheDocument();
      expect(screen.getByText('UPTO 20% OFF')).toBeInTheDocument();
    });

    it('hides the banner when no image is provided (no hardcoded promo)', () => {
      renderModal({ banner: { data: { title: 'FRESH' } }, form: {} });
      expect(screen.queryByText('FRESH')).not.toBeInTheDocument();
    });

    it('submits without a native page reload', async () => {
      const onIdentifierSubmit = vi.fn((e: React.FormEvent) => e.defaultPrevented);
      renderModal({ form: { identifier: 'a@b.co', onIdentifierSubmit } });

      await userEvent.click(screen.getByRole('button', { name: 'Continue' }));
      expect(onIdentifierSubmit).toHaveReturnedWith(true);
    });

    it('shows "Use password instead" only when handled, disabled for an empty identifier', async () => {
      const onUsePassword = vi.fn();
      const { rerender } = renderModal({ form: { identifier: '', onUsePassword } });

      const link = screen.getByRole('button', { name: 'Use password instead' });
      expect(link).toBeDisabled();

      rerender(<AuthModal isOpen onClose={vi.fn()} form={{ identifier: 'a@b.co', onUsePassword }} />);
      await userEvent.click(screen.getByRole('button', { name: 'Use password instead' }));
      expect(onUsePassword).toHaveBeenCalled();
    });

    it('announces errors and links them to the input', () => {
      renderModal({ form: { identifier: 'nope', error: 'Invalid email or phone' } });

      const input = screen.getByRole('textbox', { name: 'Email or mobile number' });
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Invalid email or phone');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', alert.id);
    });

    it('keeps the submit button named while loading', () => {
      renderModal({ form: { identifier: 'a@b.co', isLoading: true } });

      const button = screen.getByRole('button', { name: 'Continue' });
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button.querySelector('[data-slot="spinner-container"]')).toHaveClass('text-grey-50');
    });

    it('renders OAuth providers and disables them while a request is in flight', async () => {
      const onGoogle = vi.fn();
      const { rerender } = renderModal({
        form: {},
        oauth: { providers: [{ id: 'google', name: 'Google', onClick: onGoogle }] },
      });

      await userEvent.click(screen.getByRole('button', { name: 'Continue with Google' }));
      expect(onGoogle).toHaveBeenCalled();

      rerender(
        <AuthModal
          isOpen
          onClose={vi.fn()}
          form={{ isLoading: true }}
          oauth={{ providers: [{ id: 'google', name: 'Google', onClick: onGoogle }] }}
        />
      );
      expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeDisabled();
    });

    it('shows a primary spinner on a provider that is loading', () => {
      renderModal({
        form: {},
        oauth: { providers: [{ id: 'google', name: 'Google', onClick: vi.fn(), isLoading: true }] },
      });

      const button = screen.getByRole('button', { name: 'Continue with Google' });
      expect(button.querySelector('[data-slot="spinner-container"]')).toHaveClass('text-primary');
    });

    it('accepts label overrides', () => {
      renderModal({ form: {}, labels: { identifierTitle: 'Welcome back' } });
      expect(screen.getByText('Welcome back')).toBeInTheDocument();
    });
  });

  // ─── OTP ─────────────────────────────────────────────────────────────────────

  describe('OTP step', () => {
    it('renders destination, an accessible code input and resend countdown', () => {
      renderModal({
        form: { step: 'OTP', destination: 't**t@example.com', otp: '123', resendCountdown: 24 },
      });

      expect(screen.getByText('Verify with OTP')).toBeInTheDocument();
      expect(screen.getByText('t**t@example.com')).toBeInTheDocument();
      expect(screen.getByLabelText('Verification code')).toHaveAttribute(
        'autocomplete',
        'one-time-code'
      );
      expect(screen.getByText('Resend OTP in 24s')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Verify & Proceed' })).toBeDisabled();
    });

    it('fires resend and edit callbacks', async () => {
      const onResendOtp = vi.fn();
      const onEditIdentifier = vi.fn();
      renderModal({ form: { step: 'OTP', onResendOtp, onEditIdentifier } });

      await userEvent.click(screen.getByRole('button', { name: 'Resend OTP' }));
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
      expect(onResendOtp).toHaveBeenCalled();
      expect(onEditIdentifier).toHaveBeenCalled();
    });

    it('respects a custom code length', () => {
      renderModal({ form: { step: 'OTP', otp: '1234', otpLength: 4 } });
      expect(screen.getByRole('button', { name: 'Verify & Proceed' })).toBeEnabled();
    });
  });

  // ─── PASSWORD ────────────────────────────────────────────────────────────────

  describe('PASSWORD step', () => {
    it('signs in with a password and offers OTP as the forgot-password path', async () => {
      const onPasswordSubmit = vi.fn();
      const onForgotPassword = vi.fn();
      renderModal({
        form: {
          step: 'PASSWORD',
          identifier: 'a@b.co',
          password: 'secret',
          onPasswordSubmit,
          onForgotPassword,
        },
      });

      const field = screen.getByLabelText('Password');
      expect(field).toHaveAttribute('type', 'password');
      expect(field).toHaveAttribute('autocomplete', 'current-password');

      await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
      expect(field).toHaveAttribute('type', 'text');

      await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
      await userEvent.click(screen.getByRole('button', { name: 'Forgot password? Log in with OTP' }));
      expect(onPasswordSubmit).toHaveBeenCalled();
      expect(onForgotPassword).toHaveBeenCalled();
    });
  });

  // ─── SET_PASSWORD ────────────────────────────────────────────────────────────

  describe('SET_PASSWORD step', () => {
    it('create mode is skippable', async () => {
      const onSkipSetPassword = vi.fn();
      renderModal({ form: { step: 'SET_PASSWORD', setPasswordMode: 'create', onSkipSetPassword } });

      expect(screen.getByText('Create a password')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Skip for now' }));
      expect(onSkipSetPassword).toHaveBeenCalled();
    });

    it('reset mode cannot be skipped', () => {
      renderModal({
        form: { step: 'SET_PASSWORD', setPasswordMode: 'reset', onSkipSetPassword: vi.fn() },
      });

      expect(screen.getByText('Set a new password')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Skip for now' })).not.toBeInTheDocument();
    });

    it('flags mismatched confirmation and blocks submit', () => {
      renderModal({
        form: { step: 'SET_PASSWORD', newPassword: 'Timmbr1!', confirmPassword: 'Timmbr1' },
      });

      expect(screen.getByRole('alert')).toHaveTextContent("Passwords don't match.");
      expect(screen.getByRole('button', { name: 'Save password' })).toBeDisabled();
    });
  });

  // ─── SUCCESS ─────────────────────────────────────────────────────────────────

  describe('SUCCESS step', () => {
    it('renders the confirmation without forms or OAuth, and focuses the heading', () => {
      renderModal({
        form: { step: 'SUCCESS', successTitle: 'Welcome, Dany', successMessage: 'Signed in.' },
        oauth: { providers: [{ id: 'google', name: 'Google', onClick: vi.fn() }] },
      });

      const heading = screen.getByRole('heading', { name: 'Welcome, Dany' });
      expect(heading).toHaveFocus();
      expect(screen.getByText('Signed in.')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /continue with google/i })).not.toBeInTheDocument();
    });
  });
});
