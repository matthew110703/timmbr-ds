'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';

export interface SidebarFooterProps {
  footer?: React.ReactNode | ((props: { collapsed: boolean }) => React.ReactNode);
  collapsed: boolean;
  className?: string;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  footer,
  collapsed,
  className,
}) => {
  if (!footer) return null;

  const content = typeof footer === 'function' ? footer({ collapsed }) : footer;
  if (!content) return null;

  return (
    <div
      data-testid="sidebar-footer"
      className={cn(
        'mt-auto border-t border-grey-100 bg-white shrink-0 overflow-hidden',
        collapsed ? 'p-2 flex flex-col items-center gap-1' : 'p-3',
        className
      )}
    >
      {content}
    </div>
  );
};

