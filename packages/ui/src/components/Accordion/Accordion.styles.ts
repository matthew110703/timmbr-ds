import { cva } from 'class-variance-authority';

export const accordionItemVariants = cva('border-b border-grey-100 dark:border-grey-800');

export const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 text-body-2 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 cursor-pointer'
);

export const accordionContentVariants = cva(
  'overflow-hidden text-body-2 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
);
