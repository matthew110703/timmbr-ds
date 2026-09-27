'use client';

import * as React from 'react';
import { motion, sidebarToggleIconVariants } from '@timmbr/motion';
import { ChevronLeft } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { sidebarToggleVariants } from '../SideBarNavigation.styles';
import { useSidebarContext } from '../SideBarNavigation.context';

export interface SidebarToggleProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({
  collapsed,
  onToggle,
  className,
}) => {
  const { shouldAnimate } = useSidebarContext();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className={sidebarToggleVariants({ className })}
      data-testid="sidebar-toggle-btn"
    >
      <motion.span
        initial={false}
        animate={shouldAnimate ? (collapsed ? 'collapsed' : 'expanded') : undefined}
        variants={shouldAnimate ? sidebarToggleIconVariants : undefined}
        className={cn(
          'inline-flex items-center justify-center',
          !shouldAnimate && (collapsed ? 'rotate-180' : '')
        )}
      >
        <ChevronLeft className="size-3.5 stroke-[2.5]" />
      </motion.span>
    </button>
  );
};
