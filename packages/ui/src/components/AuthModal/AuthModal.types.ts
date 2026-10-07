import type { ReactNode, FormEvent } from 'react';

export interface AuthModalBannerData {
  title?: string;
  subtitle?: string;
  promoBadge?: string;
  termsNotice?: string;
  imageUrl?: string;
  iconUrl?: string;
  logoUrl?: string;
}

/**
 * IDENTIFIER → OTP | PASSWORD → [SET_PASSWORD] → SUCCESS
 * - IDENTIFIER: email or phone, "Continue" (OTP) or "Use password instead"
 * - OTP: one-time code
 * - PASSWORD: password sign-in, with "Forgot password?"
 * - SET_PASSWORD: create (new account, skippable) or reset (forgot password)
 * - SUCCESS: signed-in confirmation
 */
export type AuthModalStep = 'IDENTIFIER' | 'OTP' | 'PASSWORD' | 'SET_PASSWORD' | 'SUCCESS';

export type AuthModalSetPasswordMode = 'create' | 'reset';

export interface AuthOAuthProvider {
  /** Provider identifier, e.g. 'google', 'apple', 'github', or custom */
  id: 'google' | 'apple' | 'github' | string;
  /** Display label for the provider, e.g. 'Google', 'Apple', 'GitHub' */
  name: string;
  /** Custom icon ReactNode. If omitted, built-in icon is used for google, apple, github */
  icon?: ReactNode;
  /** Click handler for initiating OAuth flow */
  onClick: () => void;
  /** Whether this provider is currently in a loading state */
  isLoading?: boolean;
  /** Whether this provider is disabled */
  disabled?: boolean;
}

export interface AuthModalBannerProps {
  /** Promotional banner content. The banner is hidden when no image is provided. */
  data?: AuthModalBannerData;
  /** Link for the promo's terms notice (e.g. "*T&C Apply"); not the site's Terms of Use */
  promoTermsUrl?: string;
  /** Custom banner wrapper class */
  className?: string;
}

export interface AuthModalFormProps {
  /** Current step (see AuthModalStep) */
  step?: AuthModalStep;
  /** Whether an async request is currently loading */
  isLoading?: boolean;
  /** Error message for the current step */
  error?: string | null;

  // IDENTIFIER
  /** Identifier input value (phone number or email) */
  identifier?: string;
  onIdentifierChange?: (value: string) => void;
  /** Primary action: send a one-time code */
  onIdentifierSubmit?: (e: FormEvent) => void;
  /** Secondary action: switch to the PASSWORD step. Hidden when omitted. */
  onUsePassword?: () => void;

  // OTP
  /** One-time code value */
  otp?: string;
  onOtpChange?: (value: string) => void;
  onOtpSubmit?: (e: FormEvent) => void;
  /** Number of digits in the code. Defaults to 6 */
  otpLength?: number;
  onResendOtp?: () => void;
  /** Resend countdown in seconds (0 = enabled) */
  resendCountdown?: number;
  /** Masked destination where the code was sent (e.g. a***x@gmail.com) */
  destination?: string;
  /** "Edit" link on OTP/PASSWORD steps: go back to IDENTIFIER */
  onEditIdentifier?: () => void;

  // PASSWORD
  password?: string;
  onPasswordChange?: (value: string) => void;
  onPasswordSubmit?: (e: FormEvent) => void;
  /** "Forgot password?" — typically sends a one-time code instead */
  onForgotPassword?: () => void;

  // SET_PASSWORD
  setPasswordMode?: AuthModalSetPasswordMode;
  newPassword?: string;
  onNewPasswordChange?: (value: string) => void;
  confirmPassword?: string;
  onConfirmPasswordChange?: (value: string) => void;
  onSetPasswordSubmit?: (e: FormEvent) => void;
  /** "Skip for now" (create mode only). Hidden when omitted. */
  onSkipSetPassword?: () => void;

  // SUCCESS
  /** Heading shown on the SUCCESS step */
  successTitle?: string;
  /** Supporting text shown on the SUCCESS step */
  successMessage?: string;
}

export interface AuthModalOAuthProps {
  /** List of OAuth providers to display */
  providers?: AuthOAuthProvider[];
}

export interface AuthModalLegalProps {
  /** Terms of Service URL. Defaults to '/terms' */
  termsUrl?: string;
  /** Privacy Policy URL. Defaults to '/privacy' */
  privacyUrl?: string;
}

/** All user-facing copy. Every key has an English default. */
export interface AuthModalLabels {
  dialogTitle: string;
  dialogDescription: string;
  close: string;

  identifierTitle: string;
  identifierSubtitle: string;
  identifierLabel: string;
  identifierPlaceholder: string;
  continue: string;
  usePassword: string;
  legalPrefix: string;
  termsOfUse: string;
  privacyPolicy: string;
  oauthDivider: string;
  oauthContinueWith: (providerName: string) => string;

  otpTitle: string;
  otpSentTo: string;
  otpLabel: string;
  otpSubmit: string;
  otpResend: string;
  otpResendIn: (seconds: number) => string;
  edit: string;

  passwordTitle: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  passwordSubmit: string;
  forgotPassword: string;
  showPassword: string;
  hidePassword: string;

  setPasswordCreateTitle: string;
  setPasswordCreateSubtitle: string;
  setPasswordResetTitle: string;
  setPasswordResetSubtitle: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  passwordHint: string;
  passwordMismatch: string;
  setPasswordSubmit: string;
  skipForNow: string;

  successTitle: string;
}

export interface AuthModalProps {
  /** Controlled open state */
  isOpen: boolean;
  /** Callback fired when modal is closed */
  onClose: () => void;
  /** Promotional banner section configuration */
  banner?: AuthModalBannerProps;
  /** Form state, inputs, and submission callbacks */
  form: AuthModalFormProps;
  /** OAuth social login configuration (shown on the IDENTIFIER step) */
  oauth?: AuthModalOAuthProps;
  /** Legal links configuration */
  legal?: AuthModalLegalProps;
  /** Override any user-facing copy */
  labels?: Partial<AuthModalLabels>;
  /** Optional custom class name for dialog container */
  className?: string;
}
