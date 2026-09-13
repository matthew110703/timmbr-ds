import type React from 'react';
import type { LucideProps } from 'lucide-react';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: React.ElementType;
  customSize?: boolean;
}
