'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { panelResizeHandleVariants } from '../Panel.styles';

interface PanelResizeHandleProps {
  direction: 'left' | 'right' | 'bottom';
  isResizing: boolean;
  handleProps: React.HTMLAttributes<HTMLDivElement> & { 'data-resizing'?: string };
}

export function PanelResizeHandle({ direction, isResizing, handleProps }: PanelResizeHandleProps) {
  const isVertical = direction === 'bottom';
  return (
    <div
      data-slot="panel-resize-handle"
      className={cn(panelResizeHandleVariants({ direction, resizing: isResizing }))}
      {...handleProps}
    >
      <div
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center gap-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150',
          isVertical ? 'h-1.5 w-10 flex-row' : 'h-10 w-1.5 flex-col'
        )}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
        ))}
      </div>
    </div>
  );
}
