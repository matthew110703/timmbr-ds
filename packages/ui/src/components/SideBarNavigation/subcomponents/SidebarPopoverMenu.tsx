'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@timmbr/utils';
import type { NavItem } from '../SideBarNavigation.types';
import { isNavItemActive } from '../SideBarNavigation.helpers';
import { navItemVariants, navBadgeVariants } from '../SideBarNavigation.styles';
import { useSidebarContext } from '../SideBarNavigation.context';
import { SidebarSubItem } from './SidebarSubItem';

export interface SidebarPopoverMenuProps {
  item: NavItem;
  activePath?: string;
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
}

export const SidebarPopoverMenu: React.FC<SidebarPopoverMenuProps> = ({
  item,
  activePath,
  linkComponent,
}) => {
  const { shouldAnimate } = useSidebarContext();
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isActive = isNavItemActive(item, activePath);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex justify-center"
      >
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            className={navItemVariants({ active: isActive, collapsed: true })}
            aria-expanded={open}
            aria-label={item.label}
          >
            <span className="size-5 flex items-center justify-center shrink-0">
              {item.icon}
            </span>
            {item.badge !== undefined && (
              <span
                className={navBadgeVariants({
                  variant: item.badgeVariant,
                  collapsed: true,
                })}
              >
                {item.badge}
              </span>
            )}
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="right"
            align="start"
            sideOffset={12}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
              'z-50 min-w-48 rounded-lg bg-white p-2 text-grey-900 shadow-md border border-grey-200 outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              !shouldAnimate && 'animate-none transition-none'
            )}
          >
            <div className="px-3 py-1.5 border-b border-grey-100 mb-1 flex items-center justify-between">
              <span className="font-semibold text-xs text-grey-900 tracking-tight">
                {item.label}
              </span>
              {item.badge !== undefined && (
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-1.5 py-0.2 text-[10px] font-semibold',
                    item.badgeVariant === 'destructive'
                      ? 'bg-red-500 text-white'
                      : 'bg-grey-100 text-grey-800'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-0.5">
              {item.items?.map((sub) => (
                <SidebarSubItem
                  key={sub.id || sub.href}
                  item={sub}
                  activePath={activePath}
                  linkComponent={linkComponent}
                />
              ))}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </div>
    </PopoverPrimitive.Root>
  );
};
