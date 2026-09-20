import type * as React from 'react';
import type { TextareaVariants } from './Textarea.styles';
import type { MotionProp } from '../../types/motion';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariants {
  /**
   * Field label displayed above the textarea or floating inside.
   */
  label?: string;
  /**
   * If true, enables animated floating label behavior.
   */
  floating?: boolean;
  /**
   * Supporting message displayed below the textarea.
   */
  helperText?: string;
  /**
   * Error message or error state boolean.
   */
  error?: string | boolean;
  /**
   * If true, shows character count when maxLength is provided.
   */
  showCount?: boolean;
  /**
   * If true, automatically adjusts height to fit content.
   */
  autoResize?: boolean;
  /**
   * Additional classes for outer container.
   */
  containerClassName?: string;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
