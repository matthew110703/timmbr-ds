import { cva } from 'class-variance-authority';

export const sidebarContainerVariants = cva(
  'relative flex flex-col h-screen max-h-screen bg-white border-r border-grey-200 select-none',
  {
    variants: {
      collapsed: {
        true: 'w-[72px]',
        false: 'w-64',
      },
      shouldAnimate: {
        true: '',
        false: 'transition-none',
      },
      cssFallback: {
        true: 'transition-all duration-300 ease-in-out',
        false: '',
      },
    },
    defaultVariants: {
      collapsed: false,
      shouldAnimate: true,
      cssFallback: false,
    },
  }
);

export const sidebarToggleVariants = cva(
  'absolute -right-3.5 top-6 z-30 flex size-7 items-center justify-center rounded-full bg-white border border-grey-200 text-grey-600 shadow-xs hover:bg-grey-50 hover:text-grey-900 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer transition-all duration-150'
);

export const navItemVariants = cva(
  'group relative flex items-center gap-3 rounded-lg text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none',
  {
    variants: {
      active: {
        true: 'bg-primary text-white shadow-xs font-medium',
        false: 'text-grey-700 hover:bg-grey-100 hover:text-grey-900',
      },
      collapsed: {
        true: 'justify-center size-10 mx-auto p-0',
        false: 'w-full px-3.5 py-2.5',
      },
    },
    defaultVariants: {
      active: false,
      collapsed: false,
    },
  }
);

export const navBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-full text-xs font-semibold shrink-0 transition-colors',
  {
    variants: {
      variant: {
        destructive: 'bg-red-500 text-white px-2 py-0.5',
        primary: 'bg-primary-100 text-primary-800 px-2 py-0.5',
        secondary: 'bg-grey-100 text-grey-700 px-2 py-0.5',
        outline: 'border border-grey-200 text-grey-700 px-1.5 py-0.5',
      },
      collapsed: {
        true: 'absolute -top-1 -right-1 size-4 p-0 text-[10px] leading-none',
        false: 'ml-auto',
      },
    },
    defaultVariants: {
      variant: 'destructive',
      collapsed: false,
    },
  }
);

export const subItemVariants = cva(
  'flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer',
  {
    variants: {
      active: {
        true: 'bg-primary/10 text-primary-700 font-semibold',
        false: 'text-grey-600 hover:bg-grey-100 hover:text-grey-900',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
