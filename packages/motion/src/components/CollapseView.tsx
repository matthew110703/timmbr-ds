'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';

export interface CollapseViewProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  children?: React.ReactNode;
}

export const CollapseView = React.forwardRef<HTMLDivElement, CollapseViewProps>(
  ({ className, open, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden={!open}
        className={cn(
          'transition-[max-height,opacity] duration-200 overflow-hidden ease-in-out',
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CollapseView.displayName = 'CollapseView';
