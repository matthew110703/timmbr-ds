import type { Variants } from 'motion/react';

/**
 * Variants for the header search bar inline expansion and collapse.
 * Uses a smooth, non-oscillating deceleration curve for fluid width expansion.
 */
export const headerSearchExpandVariants: Variants = {
  collapsed: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  expanded: {
    width: 360,
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

/**
 * Variants for brand logo smooth cross-fade transition.
 */
export const headerLogoMorphVariants: Variants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
};

/**
 * Variants for mega-menu dropdown popover entrance and exit.
 */
export const headerMegaMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
};

/**
 * Variants for search suggestions popover entrance and exit.
 */
export const headerSearchPopoverVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 4,
    transition: {
      duration: 0.18,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 4,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
};
