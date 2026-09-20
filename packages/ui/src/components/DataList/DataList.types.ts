import type * as React from 'react';
import type { DataListVariants } from './DataList.styles';

export interface DataListProps
  extends React.HTMLAttributes<HTMLDListElement>,
    DataListVariants {
  /**
   * Orientation layout of labels and values.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
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
  orientation?: 'horizontal' | 'vertical';
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
  /**
   * Content element.
   */
  children?: React.ReactNode;
}

export interface DataListValueProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Content element.
   */
  children?: React.ReactNode;
}
