'use client';

import * as React from 'react';
import { Info, CheckCircle, AlertTriangle, AlertCircle } from '@timmbr/icons';
import { Inline } from '../Inline';
import { Stack } from '../Stack';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastViewport,
} from './Toast';
import { toastStore } from './toastStore';
import type {
  ToastGlobalConfig,
  ToastPosition,
  ToastItem,
  ToastActionConfig,
} from './Toast.types';

const VARIANT_ICONS = {
  default: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  destructive: AlertCircle,
};

export interface ToastContainerProps {
  config?: ToastGlobalConfig;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ config }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>(() => toastStore.getToasts());

  React.useEffect(() => {
    if (config?.maxVisible) {
      toastStore.setMaxVisible(config.maxVisible);
    }
    return toastStore.subscribe(() => {
      setToasts([...toastStore.getToasts()]);
    });
  }, [config?.maxVisible]);

  const defaultPosition = config?.position || 'bottom-right';
  const defaultDuration = config?.duration ?? 4000;

  // Group active toasts by position
  const toastsByPosition = React.useMemo(() => {
    const map = new Map<ToastPosition, ToastItem[]>();
    for (const item of toasts) {
      const pos = item.position || defaultPosition;
      const list = map.get(pos) || [];
      list.push(item);
      map.set(pos, list);
    }
    return map;
  }, [toasts, defaultPosition]);

  if (toasts.length === 0) {
    return null;
  }

  const renderAction = (action?: ToastActionConfig | React.ReactNode) => {
    if (!action) return null;

    if (React.isValidElement(action)) {
      return action;
    }

    const actionObj = action as ToastActionConfig;
    if (actionObj && actionObj.label && actionObj.onClick) {
      return (
        <ToastAction
          altText={actionObj.altText || (typeof actionObj.label === 'string' ? actionObj.label : 'Action')}
          onClick={actionObj.onClick}
        >
          {actionObj.label}
        </ToastAction>
      );
    }

    return null;
  };

  return (
    <>
      {Array.from(toastsByPosition.entries()).map(([pos, items]) => (
        <React.Fragment key={pos}>
          {items.map((item, index) => {
            const Icon = VARIANT_ICONS[item.variant || 'default'] || Info;
            const isDestructive = item.variant === 'destructive';

            return (
              <Toast
                key={item.id}
                open={item.open}
                variant={item.variant}
                duration={item.duration ?? defaultDuration}
                motion={item.motion}
                index={config?.stacked ? index : undefined}
                total={config?.stacked ? items.length : undefined}
                onOpenChange={(open) => {
                  if (!open) {
                    toastStore.dismiss(item.id);
                    item.onDismiss?.();
                  }
                  item.onOpenChange?.(open);
                }}
              >
                <Inline gap={3} align="start" className="flex-1 min-w-0 pr-2">
                  <Icon
                    className={`size-4.5 shrink-0 mt-0.5 ${
                      isDestructive ? 'text-white' : 'text-current opacity-90'
                    }`}
                  />
                  <Stack gap="2xs" className="flex-1 min-w-0">
                    {item.title && <ToastTitle>{item.title}</ToastTitle>}
                    {item.description && (
                      <ToastDescription>{item.description}</ToastDescription>
                    )}
                  </Stack>
                </Inline>

                {renderAction(item.action)}

                {item.dismissible !== false && <ToastClose />}
              </Toast>
            );
          })}
          <ToastViewport position={pos} stacked={config?.stacked} />
        </React.Fragment>
      ))}
    </>
  );
};
