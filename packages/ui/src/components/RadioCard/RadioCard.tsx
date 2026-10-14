'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { radioCardDotClass, radioCardMarkerClass, radioCardVariants } from './RadioCard.styles';
import type { RadioCardProps } from './RadioCard.types';

/**
 * A selectable row or tile for choices that need more than a label (a payment method, a delivery
 * speed). Place inside a `RadioGroup`: the whole card is the radio, so the group's `value`,
 * `onValueChange`, arrow-key navigation and `name` work as usual.
 */
export const RadioCard = React.forwardRef<HTMLButtonElement, RadioCardProps>(
  ({ className, variant, label, description, icon, trailing, motion, ...props }, ref) => {
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        data-slot="radio-card"
        className={cn(
          radioCardVariants({ variant }),
          !shouldAnimate && 'transition-none',
          motionClass,
          className
        )}
        {...props}
      >
        {icon && (
          <span className="flex shrink-0 items-center justify-center" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-body-2 font-medium leading-tight">{label}</span>
          {description && (
            <span className="text-body-3 leading-normal text-muted-foreground">{description}</span>
          )}
        </span>
        {trailing ? (
          <span className="flex shrink-0 items-center" aria-hidden="true">
            {trailing}
          </span>
        ) : (
          <span className={radioCardMarkerClass} aria-hidden="true">
            <RadioGroupPrimitive.Indicator className={radioCardDotClass} />
          </span>
        )}
      </RadioGroupPrimitive.Item>
    );
  }
);

RadioCard.displayName = 'RadioCard';
