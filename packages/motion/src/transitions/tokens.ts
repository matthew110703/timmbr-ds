export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
  velocity?: number;
  restDelta?: number;
  restSpeed?: number;
}

export interface TransitionConfig {
  duration?: number;
  ease?: string | number[] | readonly number[];
  delay?: number;
  type?: 'tween' | 'spring' | 'inertia' | 'keyframes';
  spring?: SpringConfig;
}

export const springPresets = {
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 15,
    mass: 1,
  },
  snappy: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
    mass: 0.8,
  },
  gentle: {
    type: 'spring',
    stiffness: 180,
    damping: 24,
    mass: 1,
  },
  firm: {
    type: 'spring',
    stiffness: 300,
    damping: 35,
    mass: 1.2,
  },
} as const;

export const transitions = {
  /**
   * Instant transition (0ms). Disables animated transitions.
   */
  instant: {
    duration: 0,
    ease: 'linear',
  },
  /**
   * Fast transition (150ms). Ideal for micro-interactions, tooltips, and button clicks.
   */
  fast: {
    duration: 0.15,
    ease: [0.16, 1, 0.3, 1], // easeOutExpo
  },
  /**
   * Normal transition (250ms). Standard design system timing for dialogs, cards, and tabs.
   */
  normal: {
    duration: 0.25,
    ease: [0.25, 1, 0.5, 1],
  },
  /**
   * Slow transition (400ms). Perfect for large layout reveals, drawers, and full-page transitions.
   */
  slow: {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1],
  },
  /**
   * Natural spring transition with responsive damping.
   */
  spring: springPresets.snappy,
  /**
   * Playful bouncy spring transition.
   */
  bouncy: springPresets.bouncy,
  /**
   * Soft, gentle spring transition.
   */
  gentle: springPresets.gentle,
  /**
   * Firm, weighted spring transition.
   */
  firm: springPresets.firm,
} as const;

export type TransitionName = keyof typeof transitions;

export function getTransition(name: TransitionName = 'normal'): TransitionConfig {
  return transitions[name] ?? transitions.normal;
}
