import { cva } from 'class-variance-authority';

export const accordionItemVariants = cva('border-b border-slate-200 dark:border-slate-800');

export const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 cursor-pointer'
);

export const accordionContentVariants = cva(
  'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
);
