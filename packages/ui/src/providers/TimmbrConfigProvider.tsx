'use client';

import * as React from 'react';

export interface ComponentConfig {
  button?: {
    defaultVariant?: 'default' | 'outline' | 'ghost';
    defaultSize?: 'default' | 'sm' | 'lg' | 'icon';
  };
  accordion?: {
    defaultMotion?: boolean;
  };
  icon?: {
    defaultSize?: number;
  };
}

export interface TimmbrConfig {
  animations?: {
    enabled?: boolean;
  };
  theme?: {
    mode?: 'light' | 'dark' | 'system';
  };
  components?: ComponentConfig;
}

export const defaultTimmbrConfig: Required<TimmbrConfig> = {
  animations: {
    enabled: true,
  },
  theme: {
    mode: 'light',
  },
  components: {
    button: {
      defaultVariant: 'default',
      defaultSize: 'default',
    },
    accordion: {
      defaultMotion: true,
    },
    icon: {
      defaultSize: 24,
    },
  },
};

const TimmbrConfigContext = React.createContext<TimmbrConfig>(defaultTimmbrConfig);

export interface TimmbrConfigProviderProps {
  children: React.ReactNode;
  config?: Partial<TimmbrConfig>;
}

/**
 * Global configuration provider for the Timmbr Design System.
 * Supports customizing animation behavior, default component variants/sizes, and themes.
 * Wrapping the app with this provider is optional; components fall back to default values automatically.
 */
export const TimmbrConfigProvider: React.FC<TimmbrConfigProviderProps> = ({
  children,
  config,
}) => {
  const mergedConfig = React.useMemo<TimmbrConfig>(() => {
    return {
      animations: {
        ...defaultTimmbrConfig.animations,
        ...config?.animations,
      },
      theme: {
        ...defaultTimmbrConfig.theme,
        ...config?.theme,
      },
      components: {
        button: {
          ...defaultTimmbrConfig.components.button,
          ...config?.components?.button,
        },
        accordion: {
          ...defaultTimmbrConfig.components.accordion,
          ...config?.components?.accordion,
        },
        icon: {
          ...defaultTimmbrConfig.components.icon,
          ...config?.components?.icon,
        },
      },
    };
  }, [config]);

  const animationsDisabled = mergedConfig.animations?.enabled === false;

  return (
    <div data-animations-disabled={animationsDisabled ? 'true' : 'false'}>
      <TimmbrConfigContext.Provider value={mergedConfig}>
        {children}
      </TimmbrConfigContext.Provider>
    </div>
  );
};

/**
 * Hook to access Timmbr design system configuration.
 */
export const useTimmbrConfig = (): TimmbrConfig => {
  return React.useContext(TimmbrConfigContext);
};
