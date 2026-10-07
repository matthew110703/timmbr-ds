import type { ComponentPropsWithoutRef } from 'react';

export type OtpInputVariant = 'default' | 'filled' | 'underline';
export type OtpInputSize = 'sm' | 'md' | 'lg';

export interface OtpInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'onChange' | 'value' | 'defaultValue' | 'children'> {
  /** Number of OTP character slots. Defaults to 6. */
  length?: number;
  /** Controlled value */
  value?: string;
  /** Default uncontrolled value */
  defaultValue?: string;
  /** Callback fired on character change */
  onChange?: (value: string) => void;
  /** Callback fired when all slots are filled */
  onComplete?: (value: string) => void;
  /** Visual variant. Defaults to 'default'. */
  variant?: OtpInputVariant;
  /** Size scale. Defaults to 'md'. */
  size?: OtpInputSize;
  /** Error state or error message */
  error?: boolean | string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to focus automatically on mount */
  autoFocus?: boolean;
  /** Custom wrapper class */
  containerClassName?: string;
  /** Explicitly disallow children as OtpInput uses internal slot rendering */
  children?: never;
}

export interface OtpSlotProps {
  char: string | null;
  isActive: boolean;
  hasFakeCaret: boolean;
  variant?: OtpInputVariant;
  size?: OtpInputSize;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}
