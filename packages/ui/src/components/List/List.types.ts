import type * as React from 'react';
import type { ListVariants, ListItemVariants } from './List.styles';

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    ListVariants {}

export interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    ListItemVariants {
  clickable?: boolean;
}

export type ListItemIconProps = React.HTMLAttributes<HTMLDivElement>;

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export type ListItemActionProps = React.HTMLAttributes<HTMLDivElement>;
