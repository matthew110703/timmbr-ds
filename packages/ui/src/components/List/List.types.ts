import type * as React from 'react';
import type { ListVariants, ListItemVariants } from './List.styles';

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    ListVariants {
  /** Lines between items (works with every variant, e.g. bordered). */
  divided?: boolean;
}

export interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    ListItemVariants {
  clickable?: boolean;
  /**
   * Render the row as its child (e.g. a link) inside the `<li>`: the child
   * gets the row and interactive styles, with no button role.
   */
  asChild?: boolean;
}

export type ListItemIconProps = React.HTMLAttributes<HTMLDivElement>;

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export type ListItemActionProps = React.HTMLAttributes<HTMLDivElement>;
