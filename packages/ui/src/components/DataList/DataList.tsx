'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Text } from '../Text';
import {
  dataListVariants,
  dataListItemVariants,
  dataListLabelVariants,
  dataListValueVariants,
  dataListActionVariants,
  dataListInsetPadding,
} from './DataList.styles';
import type {
  DataListProps,
  DataListItemProps,
  DataListLabelProps,
  DataListValueProps,
  DataListActionProps,
} from './DataList.types';

interface DataListContextValue {
  orientation: 'horizontal' | 'vertical' | 'justified';
  size: 'sm' | 'default' | 'lg';
  inset: 'none' | 'sm' | 'default';
}

const DataListContext = React.createContext<DataListContextValue>({
  orientation: 'horizontal',
  size: 'default',
  inset: 'none',
});

export const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  (
    {
      className,
      orientation = 'horizontal',
      size = 'default',
      divided = false,
      inset = 'none',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <DataListContext.Provider value={{ orientation, size, inset }}>
        <dl
          ref={ref}
          data-slot="data-list"
          className={cn(dataListVariants({ orientation, size, divided }), inset !== 'none' && 'gap-0', className)}
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
  ({ className, orientation: itemOrientation, align = 'baseline', emphasis = 'none', children, ...props }, ref) => {
    const context = React.useContext(DataListContext);
    const orientation = itemOrientation ?? context.orientation;

    return (
      <div
        ref={ref}
        data-slot="data-list-item"
        className={cn(
          dataListItemVariants({ orientation, align, emphasis }),
          context.inset === 'none' && context.size === 'sm' && 'py-1',
          context.inset === 'none' && context.size === 'default' && 'py-1.5',
          context.inset === 'none' && context.size === 'lg' && 'py-2',
          dataListInsetPadding[context.inset],
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
  ({ className, minWidth, icon, description, tone, style, children, ...props }, ref) => {
    const { orientation } = React.useContext(DataListContext);
    const width = minWidth ? (typeof minWidth === 'number' ? `${minWidth}px` : minWidth) : undefined;
    // Horizontal rows stack on small screens, where a fixed label width would
    // push into the value / action: apply it from `sm` up only.
    const responsiveWidth = Boolean(width) && orientation === 'horizontal';
    const computedStyle = {
      ...style,
      ...(width && !responsiveWidth ? { minWidth: width } : {}),
      ...(responsiveWidth ? { '--data-list-label-min': width } : {}),
    } as React.CSSProperties;

    return (
      <dt
        ref={ref}
        data-slot="data-list-label"
        style={computedStyle}
        className={cn(
          dataListLabelVariants({ tone, withDescription: Boolean(description) }),
          responsiveWidth && 'sm:min-w-[var(--data-list-label-min)]',
          className
        )}
        {...props}
      >
        {icon && (
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex shrink-0 items-center justify-center text-muted-foreground',
              description && 'mt-0.5'
            )}
          >
            {icon}
          </span>
        )}
        {description ? (
          <span className="flex min-w-0 flex-col gap-0.5">
            <span>{children}</span>
            <Text as="span" variant="body-3" foreground="muted" weight="normal">
              {description}
            </Text>
          </span>
        ) : (
          children
        )}
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

/** Buttons or a status at the end of a row (under the value on small screens). */
export const DataListAction = React.forwardRef<HTMLElement, DataListActionProps>(
  ({ className, placement, children, ...props }, ref) => (
    <dd
      ref={ref}
      data-slot="data-list-action"
      className={cn(dataListActionVariants({ placement }), className)}
      {...props}
    >
      {children}
    </dd>
  )
);
DataListAction.displayName = 'DataListAction';
