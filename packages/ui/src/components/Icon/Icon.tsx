'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { iconVariants } from './Icon.styles';
import type { IconProps } from './Icon.types';

export const Icon = React.forwardRef<HTMLElement, IconProps>(
  (
    {
      className,
      style,
      icon: Component,
      src,
      svg,
      size = 'md',
      foreground = 'inherit',
      clickable = false,
      motion,
      onClick,
      'aria-label': ariaLabel,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = clickable || !!onClick;
    const isCustomSize = typeof size === 'number';
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    const customDimensionStyle = isCustomSize
      ? { width: `${size}px`, height: `${size}px`, ...style }
      : style;

    const Tag = asChild ? Slot : isInteractive ? 'button' : 'span';

    const content = (
      <>
        {Component ? (
          <Component
            className="size-full"
            aria-hidden={!ariaLabel}
          />
        ) : src ? (
          <img
            src={src}
            alt={ariaLabel ?? ''}
            className="size-full object-contain"
            aria-hidden={!ariaLabel}
          />
        ) : svg ? (
          svg
        ) : (
          children
        )}
      </>
    );

    return (
      <Tag
        ref={ref as any}
        type={Tag === 'button' ? 'button' : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-label={ariaLabel}
        data-slot="icon"
        data-testid="timmbr-icon"
        onClick={onClick as any}
        style={customDimensionStyle}
        className={cn(
          iconVariants({
            size: isCustomSize ? undefined : size,
            foreground,
            clickable: isInteractive,
            className,
          }),
          !shouldAnimate && 'transition-none active:scale-100',
          motionClass
        )}
        {...props}
      >
        {content}
      </Tag>
    );
  }
);

Icon.displayName = 'Icon';
