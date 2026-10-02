'use client';

import * as React from 'react';
import { motion, AnimatePresence, headerMegaMenuVariants, getTransition } from '@timmbr/motion';
import { cn } from '@timmbr/utils';
import { megaMenuCardVariants } from '../NavHeader.styles';
import type { NavHeaderItem } from '../NavHeader.types';

export interface NavMegaMenuProps {
  activeItem: NavHeaderItem | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClose?: () => void;
  shouldAnimate?: boolean;
  motionClass?: string;
}

export const NavMegaMenu: React.FC<NavMegaMenuProps> = ({
  activeItem,
  onMouseEnter,
  onMouseLeave,
  onClose,
  shouldAnimate = true,
  motionClass,
}) => {
  const hasContent = Boolean(activeItem?.content);

  React.useEffect(() => {
    if (!hasContent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasContent, onClose]);

  const widthStyle: React.CSSProperties = React.useMemo(() => {
    if (typeof activeItem?.popoverWidth === 'number') {
      return { maxWidth: `${activeItem.popoverWidth}px` };
    }
    return {};
  }, [activeItem?.popoverWidth]);

  const isFullBleed = activeItem?.popoverWidth === 'full';

  return (
    <AnimatePresence initial={false}>
      {hasContent && activeItem && (
        <div
          data-slot="nav-megamenu-wrapper"
          className="absolute top-full left-0 right-0 z-50 pt-1 pointer-events-none"
        >
          <div
            className="w-full flex justify-center pointer-events-auto"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <motion.div
              key={activeItem.id}
              role="region"
              aria-label={`${typeof activeItem.label === 'string' ? activeItem.label : 'Navigation'} Submenu`}
              initial={shouldAnimate ? 'hidden' : false}
              animate={shouldAnimate ? 'visible' : undefined}
              exit={shouldAnimate ? 'exit' : undefined}
              variants={shouldAnimate ? headerMegaMenuVariants : undefined}
              transition={getTransition('fast')}
              style={widthStyle}
              data-slot="nav-megamenu-card"
              className={cn(
                megaMenuCardVariants(),
                isFullBleed && 'max-w-none rounded-none border-x-0',
                !shouldAnimate && 'transition-none',
                motionClass
              )}
            >
              {activeItem.content}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
