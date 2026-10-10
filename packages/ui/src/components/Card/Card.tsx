'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import {
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardContentVariants,
  cardFooterVariants,
  cardSectionPadding,
  cardSectionFooterPadding,
} from './Card.styles';
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './Card.types';

type CardPadding = keyof typeof cardSectionPadding;

/** Lets the parts of a `sectioned` card pick up its padding. */
const CardContext = React.createContext<{ sectioned: boolean; padding: CardPadding }>({
  sectioned: false,
  padding: 'default',
});

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, selected = false, sectioned = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    const context = React.useMemo(
      () => ({ sectioned, padding: (padding ?? 'default') as CardPadding }),
      [sectioned, padding]
    );
    return (
      <CardContext.Provider value={context}>
        <Comp
          ref={ref}
          data-selected={selected || undefined}
          className={cn(cardVariants({ variant, padding, selected, sectioned }), className)}
          {...props}
        />
      </CardContext.Provider>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, asChild = false, divider = false, actions, children, ...props }, ref) => {
    const { sectioned, padding } = React.useContext(CardContext);
    const Comp = asChild ? Slot : 'div';
    const classes = cn(
      cardHeaderVariants({ sectioned, divider }),
      sectioned && cardSectionPadding[padding],
      // Without a divider the content's own top padding is the gap.
      sectioned && !divider && 'pb-0',
      className
    );

    if (actions === undefined || actions === null || actions === false) {
      return (
        <Comp ref={ref} className={classes} {...props}>
          {children}
        </Comp>
      );
    }
    // Title block at the start, actions at the end (wrapping on narrow cards).
    return (
      <Comp
        ref={ref}
        className={cn(classes, 'flex-row flex-wrap items-start justify-between gap-3')}
        {...props}
      >
        <div className="flex min-w-0 flex-col gap-1.5" data-slot="card-header-text">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-2" data-slot="card-header-actions">
          {actions}
        </div>
      </Comp>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h3';
    return <Comp ref={ref} className={cn(cardTitleVariants(), className)} {...props} />;
  }
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return <Comp ref={ref} className={cn(cardDescriptionVariants(), className)} {...props} />;
  }
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const { sectioned, padding } = React.useContext(CardContext);
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(cardContentVariants({ sectioned }), sectioned && cardSectionPadding[padding], className)}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, asChild = false, justify, ...props }, ref) => {
    const { sectioned, padding } = React.useContext(CardContext);
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          cardFooterVariants({ sectioned, justify }),
          sectioned && cardSectionFooterPadding[padding],
          className
        )}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';
