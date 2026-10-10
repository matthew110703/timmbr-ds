import type * as React from 'react';
import type { CardFooterVariants, CardVariants } from './Card.styles';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<CardVariants, 'selected' | 'sectioned'> {
  /**
   * If true, delegates rendering to the direct child element using Radix Slot.
   */
  asChild?: boolean;
  /** Highlights the card (e.g. the default or chosen item). */
  selected?: boolean;
  /**
   * The `padding` goes to CardHeader / CardContent / CardFooter instead of the
   * card, so header and footer dividers run edge to edge.
   */
  sectioned?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  /** Line under the header (full width in a `sectioned` card). */
  divider?: boolean;
  /** Content at the end of the header row (badges, buttons). */
  actions?: React.ReactNode;
}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<CardFooterVariants, 'sectioned'> {
  asChild?: boolean;
}
