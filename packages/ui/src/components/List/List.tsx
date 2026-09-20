'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import {
  listVariants,
  listItemVariants,
  listItemIconVariants,
  listItemTextVariants,
  listItemActionVariants,
} from './List.styles';
import type {
  ListProps,
  ListItemProps,
  ListItemIconProps,
  ListItemTextProps,
  ListItemActionProps,
} from './List.types';

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="list"
      className={cn(listVariants({ variant }), className)}
      {...props}
    />
  )
);
List.displayName = 'List';

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, density, interactive, clickable, onClick, ...props }, ref) => {
    const isInteractive = interactive || clickable || !!onClick;

    return (
      <li
        ref={ref}
        data-slot="list-item"
        onClick={onClick}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        className={cn(
          listItemVariants({ density, interactive: isInteractive }),
          className
        )}
        {...props}
      />
    );
  }
);
ListItem.displayName = 'ListItem';

export const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="list-item-icon"
      className={cn(listItemIconVariants(), className)}
      {...props}
    />
  )
);
ListItemIcon.displayName = 'ListItemIcon';

export const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ className, primary, secondary, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="list-item-text"
      className={cn(listItemTextVariants(), className)}
      {...props}
    >
      {primary && (
        <div className="font-medium text-foreground truncate">{primary}</div>
      )}
      {secondary && (
        <div className="text-xs text-muted-foreground truncate mt-0.5">{secondary}</div>
      )}
      {children}
    </div>
  )
);
ListItemText.displayName = 'ListItemText';

export const ListItemAction = React.forwardRef<HTMLDivElement, ListItemActionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="list-item-action"
      className={cn(listItemActionVariants(), className)}
      {...props}
    />
  )
);
ListItemAction.displayName = 'ListItemAction';
