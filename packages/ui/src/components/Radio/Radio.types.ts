import type * as React from 'react';
import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { RadioItemVariants } from './Radio.styles';
import type { MotionProp } from '../../types/motion';

export interface RadioItemOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<RadioGroupPrimitive.RadioGroupProps, 'children'>,
    RadioItemVariants {
  /**
   * Group label.
   */
  label?: string;
  /**
   * Supporting message below the radio group.
   */
  helperText?: string;
  /**
   * Error message or error state boolean.
   */
  error?: string | boolean;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
  /**
   * Convenience array of options to render.
   */
  options?: RadioItemOption[];
  /**
   * Custom children if building compound radio items.
   */
  children?: React.ReactNode;
}

export interface RadioItemProps
  extends RadioGroupPrimitive.RadioGroupItemProps,
    RadioItemVariants {
  /**
   * Label text for individual radio item.
   */
  label?: React.ReactNode;
  /**
   * Description text below the item label.
   */
  description?: React.ReactNode;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
