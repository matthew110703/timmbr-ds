import * as React from 'react';
import { cn } from '@timmbr/utils';

export interface SpinnerIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const SpinnerIcon: React.FC<SpinnerIconProps> = ({
  size,
  width,
  height,
  className,
  ...props
}) => {
  const finalWidth = width ?? size ?? 24;
  const finalHeight = height ?? size ?? 24;

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin', className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="31.415, 31.415"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M12 2A10 10 0 0 1 22 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
SpinnerIcon.displayName = 'SpinnerIcon';
