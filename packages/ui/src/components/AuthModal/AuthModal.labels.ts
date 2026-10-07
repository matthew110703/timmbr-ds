'use client';

import * as React from 'react';
import type { AuthModalLabels } from './AuthModal.types';

export const DEFAULT_AUTH_MODAL_LABELS: AuthModalLabels = {
  dialogTitle: 'Sign in',
  dialogDescription: 'Sign in or create an account with your email or mobile number.',
  close: 'Close',

  identifierTitle: 'Log in or Sign up',
  identifierSubtitle: 'Enter your email or mobile number to continue',
  identifierLabel: 'Email or mobile number',
  identifierPlaceholder: 'Email or Mobile number',
  continue: 'Continue',
  usePassword: 'Use password instead',
  legalPrefix: 'By continuing, you agree to our',
  termsOfUse: 'Terms of Use',
  privacyPolicy: 'Privacy Policy',
  oauthDivider: 'or',
  oauthContinueWith: (name) => `Continue with ${name}`,

  otpTitle: 'Verify with OTP',
  otpSentTo: 'Sent to',
  otpLabel: 'Verification code',
  otpSubmit: 'Verify & Proceed',
  otpResend: 'Resend OTP',
  otpResendIn: (s) => `Resend OTP in ${s}s`,
  edit: 'Edit',

  passwordTitle: 'Enter your password',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Password',
  passwordSubmit: 'Log in',
  forgotPassword: 'Forgot password? Log in with OTP',
  showPassword: 'Show password',
  hidePassword: 'Hide password',

  setPasswordCreateTitle: 'Create a password',
  setPasswordCreateSubtitle: 'Sign in faster next time with your password.',
  setPasswordResetTitle: 'Set a new password',
  setPasswordResetSubtitle: "You're verified. Choose a new password for your account.",
  newPasswordLabel: 'New password',
  confirmPasswordLabel: 'Confirm password',
  passwordHint: 'At least 8 characters, with an uppercase letter, a number and a symbol.',
  passwordMismatch: "Passwords don't match.",
  setPasswordSubmit: 'Save password',
  skipForNow: 'Skip for now',

  successTitle: "You're signed in",
};

export const AuthModalLabelsContext = React.createContext<AuthModalLabels>(
  DEFAULT_AUTH_MODAL_LABELS
);

export function useAuthModalLabels() {
  return React.useContext(AuthModalLabelsContext);
}
