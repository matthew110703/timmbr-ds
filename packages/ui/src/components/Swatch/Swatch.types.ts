import type * as React from 'react';

export interface SwatchProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Any CSS colour; hex (#RRGGBB) also gets a border when very light. */
  color: string;
  size?: 'sm' | 'md' | 'lg';
  /** Ring around the dot. */
  selected?: boolean;
  /** Accessible name; omit when a visible label sits next to the swatch. */
  label?: string;
}
