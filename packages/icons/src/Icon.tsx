import * as React from 'react';
import { cn } from '@timmbr/utils';
import type { IconProps } from './Icon.types';

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: Component, className, size = 24, customSize = false, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        width={customSize ? undefined : size}
        height={customSize ? undefined : size}
        className={cn('shrink-0 text-current transition-transform', className)}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
