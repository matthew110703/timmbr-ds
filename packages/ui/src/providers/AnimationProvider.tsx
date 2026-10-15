'use client';

import * as React from 'react';
import { usePrefersReducedMotion } from '@timmbr/hooks';
import { useTimmbrConfig } from './TimmbrConfigProvider';

interface AnimationContextValue {
  globalMotion: boolean;
}

const AnimationContext = React.createContext<AnimationContextValue | null>(null);

export interface AnimationProviderProps {
  children: React.ReactNode;
  disableAnimations?: boolean;
}

/**
 * Dual-layer animation provider.
 * Animations are disabled when:
 *   - disableAnimations={true} is passed explicitly, OR
 *   - the OS/browser has prefers-reduced-motion: reduce set.
 * This is the single place that translates both signals into the DS motion system.
 */
export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
  disableAnimations = false,
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const animationsDisabled = disableAnimations || prefersReduced;

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute(
        'data-animations-disabled',
        animationsDisabled ? 'true' : 'false'
      );
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.removeAttribute('data-animations-disabled');
      }
    };
  }, [animationsDisabled]);

  return (
    <AnimationContext.Provider value={{ globalMotion: !animationsDisabled }}>
      {children}
    </AnimationContext.Provider>
  );
};

/**
 * Hook to retrieve whether global motion is enabled.
 * Checks AnimationProvider first, falls back to TimmbrConfigProvider.animations.enabled, then defaults to true.
 */
export const useGlobalAnimation = (): boolean => {
  const directContext = React.useContext(AnimationContext);
  const globalConfig = useTimmbrConfig();

  if (directContext !== null) {
    return directContext.globalMotion;
  }

  return globalConfig.animations?.enabled ?? true;
};
