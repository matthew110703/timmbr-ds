import { cva } from 'class-variance-authority';

export const stockMeterVariants = cva('flex flex-col gap-2 font-sans');

export const stockMeterTrackVariants = cva('h-1 w-full overflow-hidden rounded-full bg-grey-200');

export const stockMeterFillVariants = cva('h-full rounded-full bg-primary transition-[width] duration-300');
