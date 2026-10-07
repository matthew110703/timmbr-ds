/** All user-facing copy of the sign-in flow. Override any part via `messages`. */
export interface AuthMessages {
  success: {
    title: (firstName: string | null) => string;
    message: string;
  };
  oauthCallback: {
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    closeButton: string;
    popupError: string;
    popupBlocked: string;
  };
  profile: {
    /** Header label while signed out */
    login: string;
    loginAriaLabel: string;
    /** Header label when signed in but the user has no usable name */
    accountFallback: string;
    accountAriaLabel: (name: string) => string;
  };
  /** Messages keyed by timmbr-core error `code`. */
  errors: {
    INVALID_IDENTIFIER: string;
    INVALID_CREDENTIALS: string;
    EMAIL_NOT_VERIFIED: string;
    OTP_INVALID: (attemptsLeft?: number) => string;
    OTP_EXPIRED: string;
    OTP_LOCKED: string;
    OTP_COOLDOWN: (seconds?: number) => string;
    OTP_RATE_LIMITED: string;
    RATE_LIMITED: (seconds?: number) => string;
    PHONE_LOGIN_UNAVAILABLE: string;
    PASSWORD_SETUP_TOKEN_INVALID: string;
    ACCOUNT_DEACTIVATED: string;
    OTP_NOT_ALLOWED: string;
    VALIDATION_ERROR: string;
    NETWORK: string;
    GENERIC: string;
  };
}

/** Per-section partial overrides. */
export type AuthMessagesOverrides = {
  [K in keyof AuthMessages]?: Partial<AuthMessages[K]>;
};

export const DEFAULT_AUTH_MESSAGES: AuthMessages = {
  success: {
    title: (firstName) => (firstName ? `Welcome, ${firstName}` : "You're signed in"),
    message: 'Taking you back to the store…',
  },
  oauthCallback: {
    successTitle: "You're signed in",
    successMessage: 'This window will close automatically.',
    errorTitle: "Sign-in didn't complete",
    errorMessage: 'Please close this window and try again.',
    closeButton: 'Close window',
    popupError: 'Google sign-in was cancelled or failed. Please try again.',
    popupBlocked: 'Please allow pop-ups for this site to continue with Google.',
  },
  profile: {
    login: 'LOGIN',
    loginAriaLabel: 'Log in or create an account',
    accountFallback: 'ACCOUNT',
    accountAriaLabel: (name) => `My account – ${name}`,
  },
  errors: {
    INVALID_IDENTIFIER: 'Please enter a valid email address or 10-digit mobile number.',
    INVALID_CREDENTIALS: 'Incorrect email/phone or password.',
    EMAIL_NOT_VERIFIED: 'Please log in with a one-time code to verify your email first.',
    OTP_INVALID: (attemptsLeft) =>
      attemptsLeft
        ? `Incorrect code. ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`
        : 'Incorrect code.',
    OTP_EXPIRED: 'This code has expired. Please request a new one.',
    OTP_LOCKED: 'Too many incorrect attempts. Please request a new code.',
    OTP_COOLDOWN: (seconds) =>
      seconds ? `Please wait ${seconds}s before requesting another code.` : 'Please wait before requesting another code.',
    OTP_RATE_LIMITED: 'Too many codes requested. Please try again later.',
    RATE_LIMITED: (seconds) =>
      seconds
        ? `Too many attempts. Please try again in ${seconds}s.`
        : 'Too many attempts. Please wait a moment and try again.',
    PHONE_LOGIN_UNAVAILABLE: "Phone sign-in isn't available yet. Please use your email.",
    PASSWORD_SETUP_TOKEN_INVALID: 'This step has expired. Please sign in again to set a password.',
    ACCOUNT_DEACTIVATED: 'This account has been deactivated.',
    OTP_NOT_ALLOWED: 'This account must sign in with its password. Choose "Use password instead".',
    VALIDATION_ERROR: 'Please check what you entered and try again.',
    NETWORK: "Can't reach the server. Check your connection and try again.",
    GENERIC: 'Something went wrong. Please try again.',
  },
};

export function resolveAuthMessages(overrides?: AuthMessagesOverrides): AuthMessages {
  if (!overrides) return DEFAULT_AUTH_MESSAGES;
  return {
    success: { ...DEFAULT_AUTH_MESSAGES.success, ...overrides.success },
    oauthCallback: { ...DEFAULT_AUTH_MESSAGES.oauthCallback, ...overrides.oauthCallback },
    profile: { ...DEFAULT_AUTH_MESSAGES.profile, ...overrides.profile },
    errors: { ...DEFAULT_AUTH_MESSAGES.errors, ...overrides.errors },
  };
}
