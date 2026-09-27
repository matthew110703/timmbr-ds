'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import type { NavSubItem } from '../SideBarNavigation.types';
import { isRouteActive } from '../SideBarNavigation.helpers';
import { subItemVariants } from '../SideBarNavigation.styles';

export interface SidebarSubItemProps {
  item: NavSubItem;
  activePath?: string;
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
}

export const SidebarSubItem: React.FC<SidebarSubItemProps> = ({
  item,
  activePath,
  linkComponent: LinkComponent,
}) => {
  const isActive = isRouteActive(item.href, activePath);

  const content = (
    <>
      {item.icon && (
        <span className="shrink-0 size-4 flex items-center justify-center">
          {item.icon}
        </span>
      )}
      <span className="truncate">{item.label}</span>
      {item.badge !== undefined && (
        <span
          className={cn(
            'ml-auto inline-flex items-center justify-center rounded-full px-1.5 py-0.2 text-[10px] font-semibold',
            item.badgeVariant === 'destructive'
              ? 'bg-red-500 text-white'
              : 'bg-grey-200 text-grey-800'
          )}
        >
          {item.badge}
        </span>
      )}
    </>
  );

  const className = subItemVariants({ active: isActive });

  if (LinkComponent) {
    return (
      <LinkComponent href={item.href} className={className}>
        {content}
      </LinkComponent>
    );
  }

  return (
    <a href={item.href} className={className}>
      {content}
    </a>
  );
};
