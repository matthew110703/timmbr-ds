import type * as React from 'react';
import type * as SwitchPrimitive from '@radix-ui/react-switch';
import type { SwitchVariants } from './Switch.styles';
import type { MotionProp } from '../../types/motion';

export interface SwitchProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
      'size'
    >,
    SwitchVariants {
  /**
   * Primary label text displayed next to the switch toggle.
   */
  label?: React.ReactNode;
  /**
   * Secondary supporting text displayed below the label.
   */
  description?: React.ReactNode;
  /**
   * Custom className for the outer container wrapper.
   */
  containerClassName?: string;
  /** Override animation behaviour. `false` disables transitions; omit to inherit global setting. */
  motion?: MotionProp;
}
