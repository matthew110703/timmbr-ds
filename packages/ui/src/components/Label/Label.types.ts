import type * as React from 'react';
import type * as LabelPrimitive from '@radix-ui/react-label';
import type { LabelVariants } from './Label.styles';

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    LabelVariants {
  /**
   * If true, displays a red required asterisk next to the label text.
   */
  required?: boolean;
  /**
   * If true, applies disabled visual styles.
   */
  disabled?: boolean;
}
