'use client';

import * as React from 'react';
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
 * Dual-layer animation provider satisfying the requirement for global toggle + component-level overrides.
 */
export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
  disableAnimations = false,
}) => {
  return (
    <div data-animations-disabled={disableAnimations ? 'true' : 'false'}>
      <AnimationContext.Provider value={{ globalMotion: !disableAnimations }}>
        {children}
      </AnimationContext.Provider>
    </div>
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
