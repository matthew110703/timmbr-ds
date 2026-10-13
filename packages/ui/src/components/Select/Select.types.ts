import type * as React from 'react';
import type * as SelectPrimitive from '@radix-ui/react-select';
import type { SelectTriggerVariants } from './Select.styles';
import type { MotionProp } from '../../types/motion';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps
  extends Omit<SelectPrimitive.SelectProps, 'children'>,
    SelectTriggerVariants {
  /**
   * Field label displayed above the select trigger.
   */
  label?: string;
  /** Accessible name when there is no visible `label` (e.g. a compact "Sort by" control). */
  ariaLabel?: string;
  /** Id of the trigger (generated when omitted); the visible label points at it. */
  id?: string;
  /**
   * Placeholder text shown when no value is selected.
   */
  placeholder?: string;
  /**
   * Array of options to render in the dropdown.
   */
  options?: SelectOption[];
  /**
   * Supporting message displayed below the select trigger.
   */
  helperText?: string;
  /**
   * Error message or error state boolean.
   */
  error?: string | boolean;
  /**
   * Additional className for the trigger button.
   */
  className?: string;
  /**
   * Additional className for the outer container.
   */
  containerClassName?: string;
  /**
   * Inline style for the outer container.
   */
  style?: React.CSSProperties;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
  /**
   * Custom children if building compound select.
   */
  children?: React.ReactNode;
}
