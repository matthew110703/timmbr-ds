import { transitions } from '../transitions';

export const scaleVariants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
    transition: transitions.fast,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: transitions.fast,
  },
};

export const popVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: transitions.bouncy,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: transitions.fast,
  },
};
