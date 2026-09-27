'use client';

import * as React from 'react';
import { ChevronDown } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { motion, AnimatePresence, sidebarAccordionVariants } from '@timmbr/motion';
import { Tooltip } from '../../Tooltip';
import type { NavItem } from '../SideBarNavigation.types';
import { isRouteActive, isNavItemActive } from '../SideBarNavigation.helpers';
import { navItemVariants, navBadgeVariants } from '../SideBarNavigation.styles';
import { useSidebarContext } from '../SideBarNavigation.context';
import { SidebarSubItem } from './SidebarSubItem';
import { SidebarPopoverMenu } from './SidebarPopoverMenu';

export interface SidebarNavItemProps {
  item: NavItem;
  collapsed: boolean;
  activePath?: string;
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  collapsed,
  activePath,
  linkComponent: LinkComponent,
}) => {
  const { shouldAnimate } = useSidebarContext();
  const hasSubItems = Boolean(item.items && item.items.length > 0);
  const isActive = isNavItemActive(item, activePath);
  const isDirectActive = isRouteActive(item.href, activePath);

  // User toggle override state; defaults to open if active or child is active
  const [userExpanded, setUserExpanded] = React.useState<boolean | null>(null);
  const isExpanded = userExpanded !== null ? userExpanded : isActive;

  // 1. Collapsed Mode
  if (collapsed) {
    if (hasSubItems) {
      return (
        <SidebarPopoverMenu
          item={item}
          activePath={activePath}
          linkComponent={LinkComponent}
        />
      );
    }

    const collapsedButton = (
      <button
        type="button"
        disabled={item.disabled}
        className={navItemVariants({ active: isDirectActive, collapsed: true })}
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
    );

    const buttonWithLink = item.href ? (
      LinkComponent ? (
        <LinkComponent href={item.href} className="block w-full">
          {collapsedButton}
        </LinkComponent>
      ) : (
        <a href={item.href} className="block w-full">
          {collapsedButton}
        </a>
      )
    ) : (
      collapsedButton
    );

    return (
      <Tooltip content={item.label} side="right">
        {buttonWithLink}
      </Tooltip>
    );
  }

  // 2. Expanded Mode - With Sub-Items (Accordion)
  if (hasSubItems) {
    return (
      <div className="flex flex-col space-y-1">
        <button
          type="button"
          onClick={() => setUserExpanded(!isExpanded)}
          disabled={item.disabled}
          className={navItemVariants({
            active: isActive && !isExpanded,
            collapsed: false,
          })}
          aria-expanded={isExpanded}
        >
          <span className="size-5 flex items-center justify-center shrink-0">
            {item.icon}
          </span>
          <span className="truncate flex-1 text-left">{item.label}</span>
          {item.badge !== undefined && (
            <span
              className={navBadgeVariants({
                variant: item.badgeVariant,
                collapsed: false,
              })}
            >
              {item.badge}
            </span>
          )}
          <ChevronDown
            className={cn(
              'size-4 shrink-0 text-current opacity-70',
              shouldAnimate ? 'transition-transform duration-200' : 'transition-none',
              isExpanded && 'rotate-180'
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="sidebar-sub-items"
              initial={shouldAnimate ? 'hidden' : false}
              animate={shouldAnimate ? 'visible' : undefined}
              exit={shouldAnimate ? 'exit' : undefined}
              variants={shouldAnimate ? sidebarAccordionVariants : undefined}
              className="pl-6 pr-1 py-1 space-y-0.5 border-l border-grey-200 ml-5 my-0.5 overflow-hidden"
            >
              {item.items?.map((sub) => (
                <SidebarSubItem
                  key={sub.id || sub.href}
                  item={sub}
                  activePath={activePath}
                  linkComponent={LinkComponent}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 3. Expanded Mode - Single Item
  const content = (
    <>
      <span className="size-5 flex items-center justify-center shrink-0">
        {item.icon}
      </span>
      <span className="truncate flex-1 text-left">{item.label}</span>
      {item.badge !== undefined && (
        <span
          className={navBadgeVariants({
            variant: item.badgeVariant,
            collapsed: false,
          })}
        >
          {item.badge}
        </span>
      )}
    </>
  );

  const className = navItemVariants({ active: isDirectActive, collapsed: false });

  if (item.href) {
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
  }

  return (
    <button type="button" disabled={item.disabled} className={className}>
      {content}
    </button>
  );
};
