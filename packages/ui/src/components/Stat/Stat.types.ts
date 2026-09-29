import type * as React from 'react';
import type { StatVariants } from './Stat.styles';
import type { MotionProp } from '../../types/motion';

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StatVariants {
  motion?: MotionProp;
}

export type StatLabelProps = React.HTMLAttributes<HTMLDivElement>;

export type StatValueProps = React.HTMLAttributes<HTMLDivElement>;

export type StatHelpTextProps = React.HTMLAttributes<HTMLDivElement>;


export interface StatIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'increase' | 'decrease';
}
