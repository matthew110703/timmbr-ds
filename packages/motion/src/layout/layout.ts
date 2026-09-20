import { transitions } from '../transitions';

export const layoutTransitions = {
  default: {
    layout: true,
    transition: transitions.spring,
  },
  smooth: {
    layout: true,
    transition: transitions.normal,
  },
  bouncy: {
    layout: true,
    transition: transitions.bouncy,
  },
  positionOnly: {
    layout: 'position' as const,
    transition: transitions.spring,
  },
  sizeOnly: {
    layout: 'size' as const,
    transition: transitions.spring,
  },
} as const;

export interface SharedTransitionConfig {
  layoutId: string;
  transition?: any;
}

export function createSharedTransition(id: string, transition = transitions.spring): SharedTransitionConfig {
  return {
    layoutId: id,
    transition,
  };
}
