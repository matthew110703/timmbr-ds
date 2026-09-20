import { transitions } from '../transitions';

export const slideUpVariants = {
  hidden: {
    y: 16,
    opacity: 0,
    transition: transitions.fast,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    y: 16,
    opacity: 0,
    transition: transitions.fast,
  },
};

export const slideDownVariants = {
  hidden: {
    y: -16,
    opacity: 0,
    transition: transitions.fast,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    y: -16,
    opacity: 0,
    transition: transitions.fast,
  },
};

export const slideLeftVariants = {
  hidden: {
    x: 16,
    opacity: 0,
    transition: transitions.fast,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    x: 16,
    opacity: 0,
    transition: transitions.fast,
  },
};

export const slideRightVariants = {
  hidden: {
    x: -16,
    opacity: 0,
    transition: transitions.fast,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    x: -16,
    opacity: 0,
    transition: transitions.fast,
  },
};

export const slideVariants = {
  up: slideUpVariants,
  down: slideDownVariants,
  left: slideLeftVariants,
  right: slideRightVariants,
};
