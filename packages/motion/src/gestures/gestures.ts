import { transitions } from '../transitions';

export const hoverGestures = {
  lift: {
    y: -3,
    transition: transitions.fast,
  },
  scale: {
    scale: 1.03,
    transition: transitions.fast,
  },
  glow: {
    filter: 'brightness(1.08)',
    transition: transitions.fast,
  },
  subtle: {
    scale: 1.01,
    transition: transitions.fast,
  },
} as const;

export const tapGestures = {
  compress: {
    scale: 0.97,
    transition: transitions.instant,
  },
  deep: {
    scale: 0.94,
    transition: transitions.instant,
  },
  press: {
    y: 1,
    scale: 0.98,
    transition: transitions.instant,
  },
} as const;

export const focusGestures = {
  ring: {
    scale: 1.01,
    transition: transitions.fast,
  },
  lift: {
    y: -2,
    transition: transitions.fast,
  },
} as const;

export const dragGestures = {
  free: {
    drag: true,
    dragElastic: 0.2,
  },
  x: {
    drag: 'x' as const,
    dragElastic: 0.2,
  },
  y: {
    drag: 'y' as const,
    dragElastic: 0.2,
  },
} as const;
