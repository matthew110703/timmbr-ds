import type * as React from 'react';
import type { LinkButtonVariants } from './LinkButton.styles';
import type { MotionProp } from '../../types/motion';

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<LinkButtonVariants, 'disabled'> {
  /**
   * Destination URL or path.
   */
  href?: string;
  /**
   * Target zone key corresponding to TimmbrConfigProvider zones (e.g. 'docs', 'app').
   * If provided and resolves to a different zone from config.currentZone, automatically treats navigation as cross-zone.
   */
  zone?: string;
  /**
   * If true, forces hard navigation across zone boundaries using CrossZoneLink, bypassing next/link.
   * ARCHITECTURAL RULE: NEVER use `next/link` for navigation across zone boundaries. Always use `CrossZoneLink` from `@timmbr/ui`.
   */
  crossZone?: boolean;
  /**
   * Next.js prefetching toggle. Defaults to true when using next/link.
   */
  prefetch?: boolean;
  /**
   * Next.js route replacement toggle.
   */
  replace?: boolean;
  /**
   * Scroll to the top of the page after navigation. Defaults to true in Next.js.
   */
  scroll?: boolean;
  /**
   * If true, LinkButton renders as Radix UI Slot to merge props onto a custom element.
   */
  asChild?: boolean;
  /**
   * Local toggle to enable/disable button motion transitions, or configure motion primitives.
   */
  motion?: MotionProp;
  /**
   * Leading icon element rendered before button children.
   */
  leftIcon?: React.ReactNode;
  /**
   * Trailing icon element rendered after button children.
   */
  rightIcon?: React.ReactNode;
  /**
   * Displays an animated loading spinner and disables interactive states.
   */
  loading?: boolean;
  /**
   * Optional loading text displayed alongside spinner.
   */
  loadingText?: string;
  /**
   * Disables the anchor element visually and functionally (aria-disabled, tabIndex=-1, pointer-events-none).
   */
  disabled?: boolean;
}
