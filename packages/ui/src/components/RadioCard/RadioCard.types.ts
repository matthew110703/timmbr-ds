import type * as React from 'react';
import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { RadioCardVariants } from './RadioCard.styles';
import type { MotionProp } from '../../types/motion';

export interface RadioCardProps
  extends Omit<RadioGroupPrimitive.RadioGroupItemProps, 'children'>,
    RadioCardVariants {
  /**
   * Main text of the option.
   */
  label: React.ReactNode;
  /**
   * Supporting text under the label.
   */
  description?: React.ReactNode;
  /**
   * Leading visual (an icon or logo), shown before the label.
   */
  icon?: React.ReactNode;
  /**
   * Replaces the round selection marker at the end (e.g. a chevron).
   * The card is still announced and navigated as a radio.
   */
  trailing?: React.ReactNode;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
