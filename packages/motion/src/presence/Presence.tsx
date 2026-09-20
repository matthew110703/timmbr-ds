'use client';

import * as React from 'react';
import { AnimatePresence } from 'motion/react';

export interface PresenceProps {
  children?: React.ReactNode;
  /**
   * By passing initial={false}, components will only animate when they are added or removed,
   * not when they initially mount.
   */
  initial?: boolean;
  /**
   * When set to "wait", only one component at a time will be animated.
   */
  mode?: 'sync' | 'popLayout' | 'wait';
  /**
   * Callback fired when all exiting children have finished animating out.
   */
  onExitComplete?: () => void;
}

export const Presence: React.FC<PresenceProps> = ({
  children,
  initial = true,
  mode = 'sync',
  onExitComplete,
}) => {
  return (
    <AnimatePresence initial={initial} mode={mode} onExitComplete={onExitComplete}>
      {children}
    </AnimatePresence>
  );
};

Presence.displayName = 'Presence';
