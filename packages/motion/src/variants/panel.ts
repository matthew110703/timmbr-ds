import type { Variants } from 'motion/react';
import { springPresets } from '../transitions';

/**
 * Animates the panel container width between expanded and collapsed states.
 * Reads --panel-expanded-size / --panel-collapsed-size CSS variables set inline.
 */
export const panelCollapseHorizontalVariants: Variants = {
  expanded: {
    width: 'var(--panel-expanded-size)',
    transition: springPresets.sidebar,
  },
  collapsed: {
    width: 'var(--panel-collapsed-size)',
    transition: springPresets.sidebar,
  },
};

/**
 * Animates the panel container height between expanded and collapsed states.
 */
export const panelCollapseVerticalVariants: Variants = {
  expanded: {
    height: 'var(--panel-expanded-size)',
    transition: springPresets.sidebar,
  },
  collapsed: {
    height: 'var(--panel-collapsed-size)',
    transition: springPresets.sidebar,
  },
};

/**
 * Fades panel body/footer content in and out during collapse/expand transitions.
 * Used inside AnimatePresence so the content gracefully exits before the container shrinks.
 */
export const panelContentFadeVariants: Variants = {
  visible: { opacity: 1, transition: { duration: 0.12, ease: 'easeOut' } },
  hidden:  { opacity: 0, transition: { duration: 0.08, ease: 'easeIn' } },
  exit:    { opacity: 0, transition: { duration: 0.08, ease: 'easeIn' } },
};
