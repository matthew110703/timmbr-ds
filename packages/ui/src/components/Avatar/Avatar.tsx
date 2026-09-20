'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@timmbr/utils';
import { avatarRootVariants, avatarStatusVariants } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      style,
      src,
      alt = 'Avatar',
      initials,
      size = 'md',
      variant = 'primary',
      status,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative inline-block shrink-0" style={style}>
        <AvatarPrimitive.Root
          ref={ref as any}
          data-slot="avatar"
          data-testid="timmbr-avatar"
          className={cn(avatarRootVariants({ size, variant, className }))}
          {...props}
        >
          {src && (
            <AvatarPrimitive.Image
              src={src}
              alt={alt}
              className="aspect-square size-full object-cover"
              data-slot="avatar-image"
            />
          )}
          <AvatarPrimitive.Fallback
            delayMs={src ? 300 : undefined}
            className="flex size-full items-center justify-center font-bold uppercase select-none"
            data-slot="avatar-fallback"
          >
            {initials ? (
              <span>{initials}</span>
            ) : children ? (
              children
            ) : (
              <svg
                className="size-1/2 text-current opacity-70"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>

        {status && (
          <span
            className={cn(avatarStatusVariants({ status, size }))}
            data-slot="avatar-status"
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
