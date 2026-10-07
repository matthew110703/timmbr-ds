import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { AuthModal } from './AuthModal';
import type { AuthModalProps, AuthOAuthProvider, AuthModalStep } from './AuthModal.types';
import { Button } from '../Button';

const defaultBanner = {
  data: {
    title: 'FRESH',
    subtitle: 'Arrivals August',
    promoBadge: 'UPTO 20% OFF',
    termsNotice: '*T&C Apply',
    imageUrl: 'https://pub-dc2a8fc90be54a65b2d2000bed9fc8d2.r2.dev/cms/auth-modal-banner.png',
    iconUrl: 'https://pub-dc2a8fc90be54a65b2d2000bed9fc8d2.r2.dev/cms/auth-modal-icon.svg',
  },
  termsUrl: '/terms',
};

const defaultOAuthProviders: AuthOAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    onClick: () => alert('Initiating Google OAuth flow...'),
  },
];

const multiOAuthProviders: AuthOAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    onClick: () => alert('Initiating Google OAuth flow...'),
  },
  {
    id: 'apple',
    name: 'Apple',
    onClick: () => alert('Initiating Apple OAuth flow...'),
  },
  {
    id: 'github',
    name: 'GitHub',
    onClick: () => alert('Initiating GitHub OAuth flow...'),
  },
];

/**
 * Story helper wrapper that keeps the modal closed by default so Storybook Docs
 * does not mount multiple simultaneous focus-traps and freeze the browser.
 */
interface StoryModalWrapperProps extends Omit<AuthModalProps, 'isOpen' | 'onClose'> {
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'outline' | 'secondary';
  hint?: string;
}

function StoryModalWrapper({
  buttonLabel = 'Open Modal',
  buttonVariant = 'outline',
  hint,
  ...modalProps
}: StoryModalWrapperProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-8 border border-dashed border-[#DDD2C0] rounded-xl bg-[#FAF7F2] min-w-[320px]">
      <Button variant={buttonVariant} size="md" onClick={() => setIsOpen(true)}>
        {buttonLabel}
      </Button>
      {hint && <p className="text-xs text-[#777] text-center mt-1">{hint}</p>}
      <AuthModal
        {...modalProps}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

const meta: Meta<typeof AuthModal> = {
  title: 'Overlays & Navigation/AuthModal',
  component: AuthModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'High-conversion dual-column Authentication Modal for Timmbr. Supports Phone/Email OTP authentication, extensible multi-provider OAuth, CMS-driven visual promo banners, and responsive mobile adaptation.\n\n*Note: Each story is closed by default to prevent multiple focus-traps fighting on the Docs page. Click any button below to preview the modal in that state.*',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthModal>;

/**
 * Fully interactive end-to-end simulation.
 * Click "Open Interactive Sign In Flow" to test identifier submission, OTP verification, resend countdown, and screen switching.
 */
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [step, setStep] = React.useState<AuthModalStep>('IDENTIFIER');
    const [identifier, setIdentifier] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [resendCountdown, setResendCountdown] = React.useState(0);

    // Countdown interval
    React.useEffect(() => {
      if (resendCountdown <= 0) return;
      const interval = setInterval(() => {
        setResendCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }, [resendCountdown]);

    const handleIdentifierSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!identifier.trim()) {
        setError('Please enter a valid mobile number or email');
        return;
      }
      setError(null);
      setIsLoading(true);

      // Simulate API OTP send
      setTimeout(() => {
        setIsLoading(false);
        const isEmail = identifier.includes('@');
        setDestination(
          isEmail
            ? identifier.replace(/^(.{2})(.*)(@.*)$/, '$1***$3')
            : identifier.replace(/^(.{2})(.*)(.{2})$/, '$1******$3')
        );
        setStep('OTP');
        setResendCountdown(30);
      }, 800);
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (otp.length !== 6) {
        setError('Please enter the 6-digit verification code');
        return;
      }
      setError(null);
      setIsLoading(true);

      // Simulate API OTP verify
      setTimeout(() => {
        setIsLoading(false);
        if (otp === '123456' || otp.length === 6) {
          alert('Authentication successful! Welcome to Timmbr.');
          setIsOpen(false);
          setStep('IDENTIFIER');
          setIdentifier('');
          setOtp('');
        } else {
          setError('Invalid verification code. Try again.');
        }
      }, 900);
    };

    const handleResendOtp = () => {
      if (resendCountdown > 0) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setResendCountdown(30);
        setError(null);
      }, 500);
    };

    const handleClose = () => {
      setIsOpen(false);
      setStep('IDENTIFIER');
      setError(null);
      setOtp('');
    };

    return (
      <div className="flex flex-col items-center justify-center gap-2 p-8 border border-dashed border-[#DDD2C0] rounded-xl bg-[#FAF7F2] min-w-[320px]">
        <Button variant="primary" size="md" onClick={() => setIsOpen(true)}>
          Open Interactive Sign In Flow
        </Button>
        <p className="text-xs text-[#777] text-center mt-1">
          Tip: Enter any email/number, then use OTP <code className="bg-[#EFE7D8] px-1 py-0.5 rounded text-[#171717]">123456</code>
        </p>

        <AuthModal
          isOpen={isOpen}
          onClose={handleClose}
          banner={defaultBanner}
          form={{
            step,
            identifier,
            otp,
            destination,
            resendCountdown,
            isLoading,
            error,
            onIdentifierChange: setIdentifier,
            onOtpChange: setOtp,
            onIdentifierSubmit: handleIdentifierSubmit,
            onOtpSubmit: handleOtpSubmit,
            onResendOtp: handleResendOtp,
            onEditIdentifier: () => {
              setStep('IDENTIFIER');
              setError(null);
            },
          }}
          oauth={{
            providers: defaultOAuthProviders,
          }}
          legal={{
            termsUrl: '/terms',
            privacyUrl: '/privacy',
          }}
        />
      </div>
    );
  },
};

/**
 * Step 1: Identifier entry state (Phone or Email).
 */
export const IdentifierStep: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Step 1 (Identifier Form)"
      hint="Phone number / Email input with promo banner & Google login"
      banner={defaultBanner}
      form={{
        step: 'IDENTIFIER',
        identifier: 'nexus@timmbr.com',
        isLoading: false,
        error: null,
        onIdentifierChange: () => {},
        onIdentifierSubmit: (e) => e.preventDefault(),
      }}
      oauth={{
        providers: defaultOAuthProviders,
      }}
      legal={{
        termsUrl: '/terms',
        privacyUrl: '/privacy',
      }}
    />
  ),
};

/**
 * Step 2: 6-Digit OTP verification state with masked destination and active timer.
 */
export const OtpStep: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Step 2 (OTP Verification)"
      hint="6-digit OTP slots, masked email, and resend countdown"
      banner={defaultBanner}
      form={{
        step: 'OTP',
        identifier: 'nexus@timmbr.com',
        destination: 'ne***@timmbr.com',
        otp: '123',
        resendCountdown: 24,
        isLoading: false,
        error: null,
        onOtpChange: () => {},
        onOtpSubmit: (e) => e.preventDefault(),
        onResendOtp: () => {},
        onEditIdentifier: () => {},
      }}
      oauth={{
        providers: defaultOAuthProviders,
      }}
      legal={{
        termsUrl: '/terms',
        privacyUrl: '/privacy',
      }}
    />
  ),
};

/**
 * Step 1 with validation error state.
 */
export const IdentifierWithError: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Identifier Error State"
      hint="Displays validation warning message"
      banner={defaultBanner}
      form={{
        step: 'IDENTIFIER',
        identifier: 'invalid-email',
        isLoading: false,
        error: 'Please enter a valid mobile number or email address.',
        onIdentifierChange: () => {},
        onIdentifierSubmit: (e) => e.preventDefault(),
      }}
      oauth={{
        providers: defaultOAuthProviders,
      }}
      legal={{
        termsUrl: '/terms',
        privacyUrl: '/privacy',
      }}
    />
  ),
};

/**
 * Step 2 with expired or invalid OTP error state.
 */
export const OtpWithError: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open OTP Error State"
      hint="Displays invalid OTP error message"
      banner={defaultBanner}
      form={{
        step: 'OTP',
        identifier: '+91 98765 43210',
        destination: '+91 98765 *****',
        otp: '999999',
        resendCountdown: 0,
        isLoading: false,
        error: 'Invalid verification code. Please check and try again.',
        onOtpChange: () => {},
        onOtpSubmit: (e) => e.preventDefault(),
        onResendOtp: () => {},
        onEditIdentifier: () => {},
      }}
      oauth={{
        providers: defaultOAuthProviders,
      }}
      legal={{
        termsUrl: '/terms',
        privacyUrl: '/privacy',
      }}
    />
  ),
};

/**
 * Active loading / submitting state.
 */
export const Submitting: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Submitting / Loading State"
      hint="Displays loading spinner in submit button"
      banner={defaultBanner}
      form={{
        step: 'IDENTIFIER',
        identifier: 'nexus@timmbr.com',
        isLoading: true,
        error: null,
        onIdentifierChange: () => {},
        onIdentifierSubmit: (e) => e.preventDefault(),
      }}
      oauth={{
        providers: defaultOAuthProviders,
      }}
      legal={{
        termsUrl: '/terms',
        privacyUrl: '/privacy',
      }}
    />
  ),
};

/**
 * Multi-Provider OAuth support (Google, Apple, GitHub).
 */
export const MultiProviderOAuth: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Multi-Provider OAuth Modal"
      hint="Displays Google, Apple, and GitHub social login buttons"
      banner={defaultBanner}
      form={{
        step: 'IDENTIFIER',
        identifier: '',
        isLoading: false,
        error: null,
        onIdentifierChange: () => {},
        onIdentifierSubmit: (e) => e.preventDefault(),
      }}
      oauth={{
        providers: multiOAuthProviders,
      }}
      labels={{
        oauthDivider: 'or continue with',
      }}
      legal={{
        termsUrl: '/terms',
        privacyUrl: '/privacy',
      }}
    />
  ),
};

/**
 * Custom CMS promotional banner configuration.
 */
export const CustomBanner: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Custom Promotional Banner"
      hint="Demonstrates custom CMS promotion copy and discount badges"
      banner={{
        data: {
          title: 'ARCHITECT',
          subtitle: 'Special Trade Pricing',
          promoBadge: 'FLAT 30% OFF',
          termsNotice: '*Valid for registered business accounts',
          imageUrl: 'https://pub-dc2a8fc90be54a65b2d2000bed9fc8d2.r2.dev/cms/auth-modal-banner.png',
          iconUrl: 'https://pub-dc2a8fc90be54a65b2d2000bed9fc8d2.r2.dev/cms/auth-modal-icon.svg',
        },
        promoTermsUrl: '/trade-terms',
      }}
      form={{
        step: 'IDENTIFIER',
        identifier: 'architect@studio.design',
        isLoading: false,
        error: null,
        onIdentifierChange: () => {},
        onIdentifierSubmit: (e) => e.preventDefault(),
      }}
      oauth={{
        providers: defaultOAuthProviders,
      }}
      legal={{
        termsUrl: '/terms',
        privacyUrl: '/privacy',
      }}
    />
  ),
};

/**
 * Password sign-in for existing accounts, with "Forgot password?" → OTP.
 */
export const PasswordStep: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Password Step"
      hint="Show/hide toggle, Edit identifier, Forgot password link"
      banner={defaultBanner}
      form={{
        step: 'PASSWORD',
        identifier: 'nexus@timmbr.com',
        password: '',
        onPasswordChange: () => {},
        onPasswordSubmit: () => {},
        onForgotPassword: () => {},
        onEditIdentifier: () => {},
      }}
    />
  ),
};

/**
 * Optional password creation right after a new account verifies its OTP.
 */
export const CreatePasswordStep: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Create Password Step"
      hint="New account: skippable password creation"
      banner={defaultBanner}
      form={{
        step: 'SET_PASSWORD',
        setPasswordMode: 'create',
        newPassword: 'Timmbr1!',
        confirmPassword: 'Timmbr1',
        onNewPasswordChange: () => {},
        onConfirmPasswordChange: () => {},
        onSetPasswordSubmit: () => {},
        onSkipSetPassword: () => {},
      }}
    />
  ),
};

/**
 * Forgot password: after OTP verification the user sets a new password (no skip).
 */
export const ResetPasswordStep: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Reset Password Step"
      hint="Forgot password flow: mandatory new password"
      banner={defaultBanner}
      form={{
        step: 'SET_PASSWORD',
        setPasswordMode: 'reset',
        onNewPasswordChange: () => {},
        onConfirmPasswordChange: () => {},
        onSetPasswordSubmit: () => {},
      }}
    />
  ),
};

/**
 * Confirmation shown briefly before the modal closes itself.
 */
export const SuccessStep: Story = {
  render: () => (
    <StoryModalWrapper
      buttonLabel="Open Success Step"
      banner={defaultBanner}
      form={{
        step: 'SUCCESS',
        successTitle: 'Welcome, Daenerys',
        successMessage: 'Taking you back to the store…',
      }}
    />
  ),
};
