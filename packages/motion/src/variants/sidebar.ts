import type { Variants } from 'motion/react';
import { transitions } from '../transitions';

/**
 * Variants for the primary sidebar container width expansion and collapse.
 */
export const sidebarContainerMotionVariants: Variants = {
  expanded: {
    width: 256,
    transition: transitions.sidebar,
  },
  collapsed: {
    width: 72,
    transition: transitions.sidebar,
  },
};

/**
 * Variants for text elements, branding titles, and badges that fade and horizontally collapse
 * when the sidebar collapses to icon-only mode.
 */
export const sidebarContentFadeVariants: Variants = {
  visible: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hidden: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
};

/**
 * Variants for nested sub-item accordion panels inside the sidebar.
 */
export const sidebarAccordionVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.15, ease: 'easeOut' },
    },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2, ease: 'easeIn', delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.12, ease: 'easeOut' },
    },
  },
};

/**
 * Variants for the sidebar toggle icon rotation.
 */
export const sidebarToggleIconVariants: Variants = {
  expanded: {
    rotate: 0,
    transition: transitions.fast,
  },
  collapsed: {
    rotate: 180,
    transition: transitions.fast,
  },
};
