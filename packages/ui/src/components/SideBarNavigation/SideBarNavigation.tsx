'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { motion, sidebarContainerMotionVariants } from '@timmbr/motion';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import type { SideBarNavigationProps } from './SideBarNavigation.types';
import { DEFAULT_STORAGE_KEY, readStoredCollapsed, writeStoredCollapsed } from './SideBarNavigation.helpers';
import { sidebarContainerVariants } from './SideBarNavigation.styles';
import { SidebarContext } from './SideBarNavigation.context';
import { SidebarBranding } from './subcomponents/SidebarBranding';
import { SidebarToggle } from './subcomponents/SidebarToggle';
import { SidebarNavItem } from './subcomponents/SidebarNavItem';
import { SidebarFooter } from './subcomponents/SidebarFooter';
import { SidebarProfile } from './subcomponents/SidebarProfile';

export const SideBarNavigation: React.FC<SideBarNavigationProps> = ({
  items,
  activePath,
  branding,
  footer,
  profile,
  showProfile = true,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  storageKey = DEFAULT_STORAGE_KEY,
  linkComponent,
  motion: motionProp,
  className,
  style,
}) => {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass, dataAttributes } = resolveMotion(motionProp, globalMotion);

  const isControlled = controlledCollapsed !== undefined;
  const [internalCollapsed, setInternalCollapsed] = React.useState<boolean>(defaultCollapsed);

  // Synchronize with stored preference on mount (uncontrolled mode only)
  React.useEffect(() => {
    if (!isControlled && storageKey !== false) {
      const stored = readStoredCollapsed(storageKey, defaultCollapsed);
      if (stored !== internalCollapsed) {
        setInternalCollapsed(stored);
      }
    }
  }, [isControlled, storageKey, defaultCollapsed]);

  const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const handleToggle = React.useCallback(() => {
    const nextState = !isCollapsed;

    if (!isControlled) {
      setInternalCollapsed(nextState);
      if (storageKey !== false) {
        writeStoredCollapsed(storageKey, nextState);
      }
    }

    onCollapsedChange?.(nextState);
  }, [isCollapsed, isControlled, storageKey, onCollapsedChange]);

  return (
    <SidebarContext.Provider
      value={{
        collapsed: isCollapsed,
        shouldAnimate,
        motionClass,
        activePath,
        linkComponent,
      }}
    >
      <motion.aside
        data-slot="sidebar-navigation"
        data-collapsed={isCollapsed}
        {...dataAttributes}
        initial={false}
        animate={shouldAnimate ? (isCollapsed ? 'collapsed' : 'expanded') : undefined}
        variants={shouldAnimate ? sidebarContainerMotionVariants : undefined}
        className={cn(
          sidebarContainerVariants({
            collapsed: isCollapsed,
            shouldAnimate,
            cssFallback: !shouldAnimate,
            className,
          }),
          motionClass
        )}
        style={style}
      >
      {/* Floating Border Toggle */}
      <SidebarToggle collapsed={isCollapsed} onToggle={handleToggle} />

      {/* Header Branding */}
      <SidebarBranding
        branding={branding}
        collapsed={isCollapsed}
        linkComponent={linkComponent}
      />

      {/* Main Scrollable Navigation Item List */}
      <nav
        aria-label="Sidebar Navigation"
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden pt-1 pb-2 space-y-1',
          isCollapsed ? 'px-2' : 'px-3'
        )}
      >
        {items.map((item) => (
          <SidebarNavItem
            key={item.id || item.href || item.label}
            item={item}
            collapsed={isCollapsed}
            activePath={activePath}
            linkComponent={linkComponent}
          />
        ))}
      </nav>

      {/* Footer Items (Above Profile) */}
      <SidebarFooter footer={footer} collapsed={isCollapsed} />

      {/* Profile Button (Below Footer) */}
      {showProfile && profile && (
        <SidebarProfile
          profile={profile}
          collapsed={isCollapsed}
          linkComponent={linkComponent}
        />
      )}
      </motion.aside>
    </SidebarContext.Provider>
  );
};

SideBarNavigation.displayName = 'SideBarNavigation';
