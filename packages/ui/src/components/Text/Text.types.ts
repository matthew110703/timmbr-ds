import type * as React from 'react';
import type { TextVariants } from './Text.styles';

export type TextTag = 'p' | 'span';

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    TextVariants {
  /**
   * Allowed HTML tags for Text elements (strictly 'p' or 'span').
   * @default 'p'
   */
  as?: TextTag;
  /**
   * If true, renders child element via Radix Slot while applying text styles.
   */
  asChild?: boolean;
  /**
   * Font weight override.
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * Toggles italic styling.
   */
  italic?: boolean;
  /**
   * Foreground color token.
   * @default 'default'
   */
  foreground?:
    | 'default'
    | 'muted'
    | 'subtle'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'white'
    | 'inherit';
}
