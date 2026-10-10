import type * as React from 'react';
import type { DataListVariants } from './DataList.styles';

export interface DataListProps
  extends React.HTMLAttributes<HTMLDListElement>,
    DataListVariants {
  /**
   * Orientation layout of labels and values.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical' | 'justified';
  /**
   * Pads each item for edge-to-edge rows (e.g. directly inside a
   * `sectioned` Card, with `divided`).
   * @default 'none'
   */
  inset?: 'none' | 'sm' | 'default';
  /**
   * Scale size of fonts and spacing.
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Whether to add dividers between items.
   * @default false
   */
  divided?: boolean;
  /**
   * Content items.
   */
  children?: React.ReactNode;
}

export interface DataListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Item-level orientation override.
   */
  orientation?: 'horizontal' | 'vertical' | 'justified';
  /** `total`: a summary line (semibold label and value). */
  emphasis?: 'none' | 'total';
  /**
   * Vertical alignment of label and value in horizontal mode.
   * @default 'baseline'
   */
  align?: 'baseline' | 'center' | 'start';
  /**
   * Content elements.
   */
  children?: React.ReactNode;
}

export interface DataListLabelProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Minimum width for the label column in horizontal mode.
   */
  minWidth?: string | number;
  /**
   * Optional icon node beside the label.
   */
  icon?: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
  /** `strong`: foreground semibold, when the label is the main text of the row. */
  tone?: 'muted' | 'strong';
  /**
   * Content element.
   */
  children?: React.ReactNode;
}

export interface DataListActionProps extends React.HTMLAttributes<HTMLElement> {
  /** Small screens: on the right of the label (`end`) or under it (`below`). */
  placement?: 'end' | 'below';
  children?: React.ReactNode;
}

export interface DataListValueProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Content element.
   */
  children?: React.ReactNode;
}
