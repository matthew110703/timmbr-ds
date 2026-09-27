'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { motion, AnimatePresence, sidebarContentFadeVariants } from '@timmbr/motion';
import { Tooltip } from '../../Tooltip';
import type { SidebarProfileConfig } from '../SideBarNavigation.types';
import { useSidebarContext } from '../SideBarNavigation.context';


export interface SidebarProfileProps {
  profile?: SidebarProfileConfig;
  collapsed: boolean;
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
}

export const SidebarProfile: React.FC<SidebarProfileProps> = ({
  profile,
  collapsed,
  linkComponent: LinkComponent,
}) => {
  const { shouldAnimate } = useSidebarContext();
  if (!profile) return null;

  const fallbackInitials =
    profile.fallback ||
    profile.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const avatarElement = profile.avatar ? (
    <div className="size-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
      {profile.avatar}
    </div>
  ) : (
    <div className="size-8 rounded-full bg-grey-200 border border-grey-300 flex items-center justify-center shrink-0 font-medium text-xs text-grey-700">
      {fallbackInitials}
    </div>
  );

  const hasItems = Boolean(profile.items && profile.items.length > 0);

  const menuContent = hasItems && (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        side={collapsed ? 'right' : 'top'}
        align={collapsed ? 'end' : 'center'}
        sideOffset={collapsed ? 12 : 8}
        className={cn(
          'z-50 min-w-56 rounded-lg bg-white p-1.5 text-grey-900 shadow-md border border-grey-200 outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          !shouldAnimate && 'animate-none transition-none'
        )}
      >
        {/* User Info Header */}
        <div className="px-2.5 py-2 border-b border-grey-100 mb-1">
          <p className="font-semibold text-xs text-grey-900 truncate">
            {profile.name}
          </p>
          {profile.email && (
            <p className="text-[11px] text-grey-500 truncate mt-0.5">
              {profile.email}
            </p>
          )}
        </div>

        {/* Action Items */}
        <div className="space-y-0.5">
          {profile.items?.map((item) => {
            const itemContent = (
              <>
                {item.icon && (
                  <span className="shrink-0 size-4 flex items-center justify-center">
                    {item.icon}
                  </span>
                )}
                <span className="truncate">{item.label}</span>
              </>
            );

            const itemClass = cn(
              'flex items-center gap-2.5 w-full rounded-md px-2.5 py-1.5 text-xs transition-colors duration-150 select-none cursor-pointer outline-none focus-visible:bg-grey-100',
              item.destructive
                ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                : 'text-grey-700 hover:bg-grey-100 hover:text-grey-900',
              item.disabled && 'opacity-50 pointer-events-none'
            );

            if (item.href) {
              return (
                <DropdownMenuPrimitive.Item asChild key={item.id || item.href}>
                  {LinkComponent ? (
                    <LinkComponent href={item.href} className={itemClass}>
                      {itemContent}
                    </LinkComponent>
                  ) : (
                    <a href={item.href} className={itemClass}>
                      {itemContent}
                    </a>
                  )}
                </DropdownMenuPrimitive.Item>
              );
            }

            return (
              <DropdownMenuPrimitive.Item
                key={item.id || item.label}
                onSelect={item.onClick}
                disabled={item.disabled}
                className={itemClass}
              >
                {itemContent}
              </DropdownMenuPrimitive.Item>
            );
          })}
        </div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );

  // 1. Collapsed Mode
  if (collapsed) {
    const collapsedTrigger = (
      <button
        type="button"
        data-testid="sidebar-profile-btn"
        onClick={!hasItems ? profile.onClick : undefined}
        className="size-9 rounded-full flex items-center justify-center hover:ring-2 hover:ring-primary/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={profile.name}
      >
        {avatarElement}
      </button>
    );

    if (hasItems) {
      return (
        <div className="py-2 flex justify-center border-t border-grey-200">
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              {collapsedTrigger}
            </DropdownMenuPrimitive.Trigger>
            {menuContent}
          </DropdownMenuPrimitive.Root>
        </div>
      );
    }

    return (
      <div className="py-2 flex justify-center border-t border-grey-200">
        <Tooltip content={profile.name} side="right">
          {collapsedTrigger}
        </Tooltip>
      </div>
    );
  }

  // 2. Expanded Mode
  const expandedTrigger = (
    <button
      type="button"
      data-testid="sidebar-profile-btn"
      onClick={!hasItems ? profile.onClick : undefined}
      className="flex items-center gap-3 w-full p-2 rounded-lg text-left hover:bg-grey-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden"
    >
      {avatarElement}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="profile-text-details"
            initial={shouldAnimate ? 'hidden' : false}
            animate={shouldAnimate ? 'visible' : undefined}
            exit={shouldAnimate ? 'exit' : undefined}
            variants={shouldAnimate ? sidebarContentFadeVariants : undefined}
            className="flex items-center min-w-0 flex-1 overflow-hidden"
          >
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
              <span className="font-semibold text-xs text-grey-900 truncate">
                {profile.name}
              </span>
              {profile.email && (
                <span className="text-[11px] text-grey-500 truncate block">
                  {profile.email}
                </span>
              )}
            </div>
            {hasItems && (
              <ChevronsUpDown className="size-4 text-grey-400 shrink-0 ml-auto" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );

  return (
    <div className="p-3 border-t border-grey-200 bg-white shrink-0 overflow-hidden">
      {hasItems ? (
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            {expandedTrigger}
          </DropdownMenuPrimitive.Trigger>
          {menuContent}
        </DropdownMenuPrimitive.Root>
      ) : (
        expandedTrigger
      )}
    </div>
  );
};
