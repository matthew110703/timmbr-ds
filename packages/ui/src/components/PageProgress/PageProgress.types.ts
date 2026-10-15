import type { MotionProp } from '../../types/motion';

export interface PageProgressProps {
  /** When false, the bar is hidden; when true (or omitted while mounted), it shows. */
  loading?: boolean;
  /**
   * Determinate value 0–100. Omit for indeterminate mode (the bar crawls to ~80% and stalls
   * until `loading` becomes false, at which point it completes and fades out).
   */
  progress?: number;
  /** Bar height in px. Default: 3. */
  height?: number;
  /** CSS stack order. Default: 9999. */
  zIndex?: number;
  /** Tailwind color class for the bar. Default: bg-primary. */
  color?: string;
  motion?: MotionProp;
}
