'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { alertVariants, alertIconVariants } from './Alert.styles';
import type { AlertProps, AlertTitleProps, AlertDescriptionProps } from './Alert.types';

const DEFAULT_ICONS = {
  default: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  destructive: AlertCircle,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      title,
      icon,
      dismissible = false,
      onClose,
      motion,
      children,
      ...props
    },
    ref
  ) => {
    const [closed, setClosed] = React.useState(false);
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    if (closed) return null;

    const IconComponent = DEFAULT_ICONS[variant ?? 'default'] || Info;

    const handleDismiss = () => {
      setClosed(true);
      onClose?.();
    };

    return (
      <div
        ref={ref}
        role="alert"
        data-slot="alert"
        className={cn(
          alertVariants({ variant, size }),
          !shouldAnimate && 'transition-none animate-none',
          motionClass,
          className
        )}
        {...props}
      >
        {icon !== null && (
          <div className={alertIconVariants({ variant, size })} data-slot="alert-icon">
            {icon ?? <IconComponent className="size-full" aria-hidden="true" />}
          </div>
        )}

        <div className="flex-1 min-w-0 space-y-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          {children && <AlertDescription>{children}</AlertDescription>}
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            className="shrink-0 p-1 -mr-1 -mt-1 text-muted-foreground hover:text-foreground rounded-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer active:scale-95"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      data-slot="alert-title"
      className={cn('font-semibold leading-tight tracking-tight text-foreground', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn('text-xs text-muted-foreground leading-relaxed', className)}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';
