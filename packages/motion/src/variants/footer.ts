import type { Variants } from 'motion/react';

/**
 * Variants for footer mobile accordion collapse & expand.
 */
export const footerAccordionVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 0.15, ease: 'easeOut' },
    },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 0.22, delay: 0.05, ease: 'easeOut' },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.22, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 0.12, ease: 'easeIn' },
    },
  },
};

/**
 * Variants for footer accordion chevron indicator rotation.
 */
export const footerChevronVariants: Variants = {
  collapsed: {
    rotate: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  expanded: {
    rotate: 180,
    transition: {
      duration: 0.25,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

/**
 * Variants for footer social icon hover interaction.
 */
export const footerSocialHoverVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.1,
    y: -2,
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 25,
    },
  },
  tap: {
    scale: 0.95,
  },
};
