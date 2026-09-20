import { transitions } from '../transitions';

export const fadeSlideUpVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    transition: transitions.fast,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: transitions.fast,
  },
};

export const fadeSlideDownVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    transition: transitions.fast,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: transitions.fast,
  },
};

export const fadeSlideVariants = {
  up: fadeSlideUpVariants,
  down: fadeSlideDownVariants,
};
