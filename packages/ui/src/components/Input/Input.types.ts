import type * as React from 'react';
import type { InputVariants } from './Input.styles';
import type { MotionProp } from '../../types/motion';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariants {
  /**
   * Field label displayed above the input or floating inside.
   */
  label?: string;
  /**
   * If true, enables animated floating label behavior.
   */
  floating?: boolean;
  /**
   * Additional classes applied to the outer wrapper container.
   */
  containerClassName?: string;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
  /**
   * Supporting message displayed below the input.
   */
  helperText?: string;
  /**
   * Error message or error state boolean.
   */
  error?: string | boolean;
  /**
   * Leading icon or content inside the input field.
   */
  leftAdornment?: React.ReactNode;
  /**
   * Trailing icon or content inside the input field.
   */
  rightAdornment?: React.ReactNode;
  /**
   * If true, shows a clear button when the input has content.
   */
  clearable?: boolean;
  /**
   * HTML input type (text, password, email, number, search, tel, url, date, etc.).
   */
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'search'
    | 'tel'
    | 'url'
    | 'date'
    | 'time'
    | (string & {});
  /**
   * Whether to display an interactive show/hide password toggle button when type="password".
   * Defaults to true.
   */
  showPasswordToggle?: boolean;
  /**
   * Callback fired when the clear button is clicked.
   */
  onClear?: () => void;
}
