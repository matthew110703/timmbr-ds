'use client';

import * as React from 'react';
import type { ToastGlobalConfig } from '../components/Toast/Toast.types';
import { ToastProvider } from '../components/Toast/Toast';
import { ToastContainer } from '../components/Toast/ToastContainer';

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

export interface ZoneConfig {
  /**
   * Current active Next.js zone identifier (e.g. 'main', 'app', 'docs', 'store').
   */
  currentZone?: string;
  /**
   * Map of zone identifiers to base URLs or path prefixes.
   * Example: { docs: 'https://docs.timmbr.com', app: '/app', store: 'https://store.timmbr.com' }
   */
  zones?: Record<string, string>;
}

export interface TimmbrConfig {
  animations?: {
    enabled?: boolean;
  };
  theme?: {
    mode?: 'light' | 'dark' | 'system';
  };
  zones?: ZoneConfig;
  components?: ComponentConfig;
  toast?: ToastGlobalConfig;
}

/**
 * Resolves target href with optional zone key and zone dictionary.
 */
export function resolveZoneHref(
  href: string,
  zone?: string,
  zones?: Record<string, string>
): string {
  if (!zone || !zones || !zones[zone]) {
    return href;
  }
  const base = zones[zone].replace(/\/+$/, '');
  const path = href.startsWith('/') ? href : `/${href}`;
  return `${base}${path}`;
}

export const defaultTimmbrConfig: Required<TimmbrConfig> = {
  animations: {
    enabled: true,
  },
  theme: {
    mode: 'light',
  },
  zones: {
    currentZone: undefined as unknown as string,
    zones: {},
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
  toast: {
    position: 'bottom-right',
    duration: 4000,
    maxVisible: 5,
    swipeDirection: 'right',
    stacked: false,
  },
};

const TimmbrConfigContext = React.createContext<TimmbrConfig>(defaultTimmbrConfig);

export interface TimmbrConfigProviderProps {
  children: React.ReactNode;
  config?: Partial<TimmbrConfig>;
}

/**
 * Global configuration provider for the Timmbr Design System.
 * Supports customizing animation behavior, default component variants/sizes, themes, and global toast defaults.
 * Automatically initializes and renders the centralized Toast system.
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
      zones: {
        currentZone: config?.zones?.currentZone ?? defaultTimmbrConfig.zones?.currentZone,
        zones: {
          ...defaultTimmbrConfig.zones?.zones,
          ...config?.zones?.zones,
        },
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
      toast: {
        ...defaultTimmbrConfig.toast,
        ...config?.toast,
      },
    };
  }, [config]);

  const animationsDisabled = mergedConfig.animations?.enabled === false;

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
    <TimmbrConfigContext.Provider value={mergedConfig}>
      <ToastProvider swipeDirection={mergedConfig.toast?.swipeDirection ?? 'right'}>
        {children}
        <ToastContainer config={mergedConfig.toast} />
      </ToastProvider>
    </TimmbrConfigContext.Provider>
  );
};

/**
 * Hook to access Timmbr design system configuration.
 */
export const useTimmbrConfig = (): TimmbrConfig => {
  return React.useContext(TimmbrConfigContext);
};
