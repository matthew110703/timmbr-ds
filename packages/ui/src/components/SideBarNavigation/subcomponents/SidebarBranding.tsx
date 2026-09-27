'use client';

import * as React from 'react';
import { motion, AnimatePresence, sidebarContentFadeVariants } from '@timmbr/motion';
import { cn } from '@timmbr/utils';
import type { SidebarBrandingConfig } from '../SideBarNavigation.types';
import { useSidebarContext } from '../SideBarNavigation.context';

export interface SidebarBrandingProps {
  branding?: SidebarBrandingConfig;
  collapsed: boolean;
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
}

export const SidebarBranding: React.FC<SidebarBrandingProps> = ({
  branding,
  collapsed,
  linkComponent: LinkComponent,
}) => {
  const { shouldAnimate } = useSidebarContext();

  const defaultPlaceholder = (
    <div
      data-testid="sidebar-logo-placeholder"
      className="size-8 rounded-lg border border-grey-300 bg-grey-100 flex items-center justify-center shrink-0 text-grey-400 text-xs font-semibold"
    >
      <span className="sr-only">Logo</span>
    </div>
  );

  const activeLogo = collapsed
    ? branding?.collapsedLogo || branding?.logo || defaultPlaceholder
    : branding?.logo || defaultPlaceholder;

  const content = (
    <div
      className={cn(
        'flex items-center overflow-hidden transition-all duration-200',
        collapsed ? 'justify-center py-4 px-2' : 'gap-3 px-4 pt-4 pb-2.5'
      )}
    >
      <div className="shrink-0 flex items-center justify-center">
        {activeLogo}
      </div>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="sidebar-branding-text"
            initial={shouldAnimate ? 'hidden' : false}
            animate={shouldAnimate ? 'visible' : undefined}
            exit={shouldAnimate ? 'exit' : undefined}
            variants={shouldAnimate ? sidebarContentFadeVariants : undefined}
            className="flex flex-col min-w-0 overflow-hidden whitespace-nowrap"
          >
            <span className="font-sans font-bold text-base text-grey-900 truncate tracking-tight">
              {branding?.title || 'Timmbr Console'}
            </span>
            {branding?.subtitle && (
              <span className="font-sans text-xs text-grey-500 truncate">
                {branding.subtitle}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (branding?.href) {
    if (LinkComponent) {
      return (
        <LinkComponent href={branding.href} className="block focus-visible:outline-none">
          {content}
        </LinkComponent>
      );
    }
    return (
      <a href={branding.href} className="block focus-visible:outline-none">
        {content}
      </a>
    );
  }

  return content;
};
