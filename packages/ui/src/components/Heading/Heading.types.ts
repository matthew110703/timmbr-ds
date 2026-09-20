import type * as React from 'react';
import type { HeadingVariants } from './Heading.styles';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    HeadingVariants {
  /**
   * The heading level (1-6), determining the font scale and default HTML heading tag.
   * @default 1
   */
  level?: HeadingLevel;
  /**
   * Overrides the HTML heading tag while keeping the level typography.
   */
  as?: HeadingTag;
  /**
   * Typographic font family ('display' uses DM Serif Display; 'title' uses Outfit).
   * @default 'display'
   */
  font?: 'display' | 'title';
  /**
   * Font weight override.
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
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
  /**
   * If true, renders child element via Radix Slot while applying heading styles.
   */
  asChild?: boolean;
}
