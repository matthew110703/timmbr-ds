import { transitions } from '../transitions';

export const collapseVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: transitions.fast,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    overflow: 'visible',
    transition: transitions.normal,
  },
  exit: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: transitions.fast,
  },
};
