'use client';

import * as React from 'react';
import { motion, AnimatePresence } from '@timmbr/motion';
import { cn } from '@timmbr/utils';
import { mobileTabContentPanelVariants } from '../NavHeader.styles';
import type { NavHeaderItem } from '../NavHeader.types';

export interface NavMobileTabContentProps {
  activeItem: NavHeaderItem | null;
  onClose?: () => void;
  shouldAnimate?: boolean;
  motionClass?: string;
}

export const NavMobileTabContent: React.FC<NavMobileTabContentProps> = ({
  activeItem,
  onClose,
  shouldAnimate = true,
  motionClass,
}) => {
  // Listen for Escape key
  React.useEffect(() => {
    if (!activeItem || !onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, onClose]);

  const hasContent = Boolean(activeItem && activeItem.content);

  return (
    <AnimatePresence initial={false}>
      {hasContent && (
        <motion.div
          key={activeItem!.id}
          initial={shouldAnimate ? { height: 0, opacity: 0 } : false}
          animate={shouldAnimate ? { height: 'auto', opacity: 1 } : undefined}
          exit={shouldAnimate ? { height: 0, opacity: 0 } : undefined}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          className={cn(mobileTabContentPanelVariants(), motionClass)}
          data-slot="nav-mobile-tab-content-panel"
        >
          <div className="w-full">{activeItem!.content}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMobileTabContent;

