import type * as React from 'react';
import type { IconTileVariants } from './IconTile.styles';

export interface IconTileProps extends React.HTMLAttributes<HTMLSpanElement>, IconTileVariants {
  /** The icon (an SVG element, e.g. `<Package />`); sized by `size`. */
  children: React.ReactNode;
  /**
   * Accessible name. Leave out for decorative tiles (hidden from screen
   * readers), e.g. next to a text label.
   */
  label?: string;
}
