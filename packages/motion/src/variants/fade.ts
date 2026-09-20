import { transitions } from '../transitions';

export const fadeVariants = {
  hidden: {
    opacity: 0,
    transition: transitions.fast,
  },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.normal },
  exit: { opacity: 0, transition: transitions.fast },
};

export const fadeOut = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: transitions.fast },
};
