import type * as React from 'react';
import type { StatVariants } from './Stat.styles';
import type { MotionProp } from '../../types/motion';

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StatVariants {
  motion?: MotionProp;
}

export interface StatLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface StatValueProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface StatHelpTextProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface StatIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'increase' | 'decrease';
}
