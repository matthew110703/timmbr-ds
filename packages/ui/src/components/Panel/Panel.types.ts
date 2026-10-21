import type * as React from 'react';
import type { MotionProp } from '../../types/motion';
import type {
  PanelVariants,
  PanelBodyVariants,
  PanelFooterVariants,
} from './Panel.styles';

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<PanelVariants, 'sectioned'> {
  asChild?: boolean;
  /**
   * Distributes padding to PanelHeader / PanelBody / PanelFooter instead of
   * the root, so header and footer dividers run edge to edge.
   */
  sectioned?: boolean;

  // ── Resize ──────────────────────────────────────────────────────────────
  /** Enables a drag handle at the panel edge for continuous resize. */
  resizable?: false | 'horizontal' | 'vertical';
  /** Minimum size in px. Defaults: 120 (horizontal) / 80 (vertical). */
  minSize?: number;
  /** Maximum size in px. Defaults: 640 (horizontal) / 480 (vertical). */
  maxSize?: number;
  /** Initial size in px. Defaults: 320 (horizontal) / 240 (vertical). */
  defaultSize?: number;
  /** Called when a drag-resize interaction commits a new size. */
  onResize?: (size: number) => void;

  // ── Collapse ─────────────────────────────────────────────────────────────
  /** Shows a chevron toggle button in the header to collapse/expand the panel. */
  collapsible?: boolean;
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Uncontrolled initial collapsed state. */
  defaultCollapsed?: boolean;
  /** Size in px when collapsed. Defaults to 40 (narrow icon bar). */
  collapsedSize?: number;
  /** Called when the collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;

  // ── Collapse + Resize coordination ───────────────────────────────────────
  /**
   * When both `resizable` and `collapsible` are set:
   * - Dragging the handle while collapsed auto-expands to `minSize`.
   * - Dragging below `(collapsedSize + minSize) / 2` auto-collapses.
   * Default: `true`.
   */
  snapToCollapse?: boolean;

  // ── Motion ────────────────────────────────────────────────────────────────
  motion?: MotionProp;
}

export interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  /** Renders a divider line below the header (full width in sectioned panels). */
  divider?: boolean;
  /** Content rendered at the trailing end of the header row. */
  actions?: React.ReactNode;
}

export interface PanelTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

export interface PanelDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

export interface PanelBodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<PanelBodyVariants, 'sectioned'> {
  asChild?: boolean;
}

export interface PanelFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<PanelFooterVariants, 'sectioned'> {
  asChild?: boolean;
}
