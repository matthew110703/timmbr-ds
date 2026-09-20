import type * as React from 'react';
import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { CheckboxVariants } from './Checkbox.styles';

export interface CheckboxProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
      'size'
    >,
    CheckboxVariants {
  /**
   * Primary label text displayed next to the checkbox.
   */
  label?: React.ReactNode;
  /**
   * Secondary supporting text displayed below the label.
   */
  description?: React.ReactNode;
  /**
   * Error state or error message.
   */
  error?: string | boolean;
  /**
   * Custom className for the outer container wrapper.
   */
  containerClassName?: string;
}
