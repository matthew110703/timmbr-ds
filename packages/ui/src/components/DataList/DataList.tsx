'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import {
  dataListVariants,
  dataListItemVariants,
  dataListLabelVariants,
  dataListValueVariants,
} from './DataList.styles';
import type {
  DataListProps,
  DataListItemProps,
  DataListLabelProps,
  DataListValueProps,
} from './DataList.types';

interface DataListContextValue {
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'default' | 'lg';
}

const DataListContext = React.createContext<DataListContextValue>({
  orientation: 'horizontal',
  size: 'default',
});

export const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  (
    {
      className,
      orientation = 'horizontal',
      size = 'default',
      divided = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <DataListContext.Provider value={{ orientation, size }}>
        <dl
          ref={ref}
          data-slot="data-list"
          className={cn(dataListVariants({ orientation, size, divided }), className)}
          {...props}
        >
          {children}
        </dl>
      </DataListContext.Provider>
    );
  }
);
DataList.displayName = 'DataList';

export const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  ({ className, orientation: itemOrientation, align = 'baseline', children, ...props }, ref) => {
    const context = React.useContext(DataListContext);
    const orientation = itemOrientation ?? context.orientation;

    return (
      <div
        ref={ref}
        data-slot="data-list-item"
        className={cn(
          dataListItemVariants({ orientation, align }),
          context.size === 'sm' && 'py-1',
          context.size === 'default' && 'py-1.5',
          context.size === 'lg' && 'py-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DataListItem.displayName = 'DataListItem';

export const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(
  ({ className, minWidth, icon, style, children, ...props }, ref) => {
    const computedStyle: React.CSSProperties = {
      ...style,
      ...(minWidth ? { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : {}),
    };

    return (
      <dt
        ref={ref}
        data-slot="data-list-label"
        style={computedStyle}
        className={cn(dataListLabelVariants(), className)}
        {...props}
      >
        {icon && <span className="inline-flex shrink-0 items-center justify-center text-grey-400 dark:text-grey-500">{icon}</span>}
        {children}
      </dt>
    );
  }
);
DataListLabel.displayName = 'DataListLabel';

export const DataListValue = React.forwardRef<HTMLElement, DataListValueProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        data-slot="data-list-value"
        className={cn(dataListValueVariants(), className)}
        {...props}
      >
        {children}
      </dd>
    );
  }
);
DataListValue.displayName = 'DataListValue';
