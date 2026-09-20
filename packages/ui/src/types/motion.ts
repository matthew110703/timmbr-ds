export interface MotionSpring {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface MotionTransition {
  duration?: number;
  delay?: number;
  easing?: string;
  type?: 'tween' | 'spring' | 'keyframes' | 'inertia';
  spring?: MotionSpring;
}

export type MotionPreset =
  | 'fade'
  | 'fade-in'
  | 'scale'
  | 'scale-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'popover'
  | 'modal'
  | 'drawer'
  | 'bounce'
  | 'none';

export interface MotionConfig {
  /**
   * Whether animations are enabled.
   * If false, disables transitions and keyframe animations.
   */
  enabled?: boolean;
  /**
   * Entrance or presence animation preset.
   */
  preset?: MotionPreset;
  /**
   * Explicit initial animation state (used by motion primitives like Framer Motion or Motion One).
   */
  initial?: Record<string, any> | string | boolean;
  /**
   * Explicit target/animate state (used by motion primitives).
   */
  animate?: MotionPreset | Record<string, any> | string;
  /**
   * Exit animation state for unmounting presence transitions.
   */
  exit?: Record<string, any> | string;
  /**
   * Hover animation definition or toggle.
   */
  hover?:
    | boolean
    | { scale?: number; y?: number; x?: number; brightness?: number; className?: string }
    | Record<string, any>;
  /**
   * While hover target (alias for motion primitive whileHover).
   */
  whileHover?: Record<string, any> | string;
  /**
   * Tap / active click compression animation definition or toggle.
   */
  tap?:
    | boolean
    | { scale?: number; y?: number; x?: number; className?: string }
    | Record<string, any>;
  /**
   * While tap target (alias for motion primitive whileTap).
   */
  whileTap?: Record<string, any> | string;
  /**
   * Custom variants map for orchestrating complex multi-state animations.
   */
  variants?: Record<string, any>;
  /**
   * Transition timing, curves, and spring physics.
   */
  transition?: MotionTransition;
  /**
   * Additional custom animation utility classes.
   */
  className?: string;
}

export type MotionProp = boolean | MotionPreset | MotionConfig;

export interface MotionProps {
  /**
   * Component-level animation control.
   * Supports:
   * - boolean: `false` to disable all transitions and animations, `true` to enable.
   * - MotionPreset string: `'fade'`, `'scale'`, `'slide-up'`, `'slide-down'`, etc.
   * - MotionConfig object: complete animation specifications including hover, tap, presets,
   *   transitions, and motion primitive compatibility (Framer Motion / Motion One).
   * Defaults to global TimmbrConfigProvider / AnimationProvider setting (`true`).
   */
  motion?: MotionProp;
}

/**
 * Maps built-in motion presets to Tailwind CSS v4 animation utility classes.
 */
const PRESET_CLASSES: Record<MotionPreset, string> = {
  fade: 'transition-opacity duration-200 animate-in fade-in',
  'fade-in': 'transition-opacity duration-200 animate-in fade-in',
  scale: 'transition-all duration-200 animate-in zoom-in-95',
  'scale-in': 'transition-all duration-200 animate-in zoom-in-95',
  'slide-up': 'transition-all duration-200 animate-in slide-in-from-bottom-2 fade-in',
  'slide-down': 'transition-all duration-200 animate-in slide-in-from-top-2 fade-in',
  'slide-left': 'transition-all duration-200 animate-in slide-in-from-right-2 fade-in',
  'slide-right': 'transition-all duration-200 animate-in slide-in-from-left-2 fade-in',
  popover: 'transition-all duration-150 animate-in zoom-in-95 fade-in',
  modal: 'transition-all duration-200 animate-in zoom-in-95 fade-in',
  drawer: 'transition-transform duration-300 ease-in-out',
  bounce: 'transition-transform duration-300 animate-bounce',
  none: 'transition-none animate-none',
};

/**
 * Resolves whether a component should animate and computes relevant utility classes,
 * inline styles, and motion telemetry for direct rendering or motion primitive delegation.
 */
export function resolveMotion(
  motion?: MotionProp,
  globalMotion: boolean = true
): {
  shouldAnimate: boolean;
  motionClass?: string;
  config?: MotionConfig;
  dataAttributes?: Record<string, string>;
} {
  // 1. Explicitly disabled via boolean
  if (motion === false) {
    return {
      shouldAnimate: false,
      motionClass: 'transition-none animate-none active:scale-100',
    };
  }

  // 2. Preset string shortcut: e.g. motion="fade"
  if (typeof motion === 'string') {
    if (!globalMotion) {
      return {
        shouldAnimate: false,
        motionClass: 'transition-none animate-none active:scale-100',
      };
    }
    return {
      shouldAnimate: true,
      motionClass: PRESET_CLASSES[motion] || PRESET_CLASSES.fade,
      config: { preset: motion },
      dataAttributes: { 'data-motion-preset': motion },
    };
  }

  // 3. MotionConfig object
  if (typeof motion === 'object' && motion !== null) {
    if (motion.enabled === false || (!globalMotion && motion.enabled !== true)) {
      return {
        shouldAnimate: false,
        motionClass: 'transition-none animate-none active:scale-100',
        config: motion,
      };
    }

    const classes: string[] = [];
    if (motion.preset && PRESET_CLASSES[motion.preset]) {
      classes.push(PRESET_CLASSES[motion.preset]);
    }
    if (motion.className) {
      classes.push(motion.className);
    }

    return {
      shouldAnimate: true,
      motionClass: classes.length > 0 ? classes.join(' ') : undefined,
      config: motion,
      dataAttributes: {
        'data-motion-enabled': 'true',
        ...(motion.preset ? { 'data-motion-preset': motion.preset } : {}),
      },
    };
  }

  // 4. Default global animation check
  if (!globalMotion && motion !== true) {
    return {
      shouldAnimate: false,
      motionClass: 'transition-none animate-none active:scale-100',
    };
  }

  return {
    shouldAnimate: true,
  };
}
