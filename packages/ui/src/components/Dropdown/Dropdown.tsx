'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@timmbr/utils';
import { Check, ChevronRight } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { dropdownContentVariants, dropdownItemIconVariants, dropdownItemVariants } from './Dropdown.styles';
import type {
  DropdownMenuProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
} from './Dropdown.types';

export const DropdownMenu: React.FC<DropdownMenuProps> = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="dropdown-sub-trigger"
    className={cn(
      dropdownItemVariants(),
      inset && 'pl-8',
      'flex justify-between items-center',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    data-slot="dropdown-sub-content"
    className={cn(dropdownContentVariants(), className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, motion, ...props }, ref) => {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        data-slot="dropdown-content"
        className={cn(
          dropdownContentVariants(),
          !shouldAnimate && 'transition-none animate-none',
          motionClass,
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, icon, destructive, asChild, children, ...props }, ref) => {
  const iconNode = icon ? (
    <span data-slot="dropdown-item-icon" aria-hidden="true" className={dropdownItemIconVariants()}>
      {icon}
    </span>
  ) : null;

  // With asChild the child (e.g. a link) is the item, so the icon goes inside it.
  let content: React.ReactNode = children;
  if (iconNode) {
    content =
      asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
        ? React.cloneElement(children, undefined, iconNode, children.props.children)
        : (
          <>
            {iconNode}
            {children}
          </>
        );
  }

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      asChild={asChild}
      data-slot="dropdown-item"
      data-destructive={destructive ? '' : undefined}
      className={cn(dropdownItemVariants({ destructive }), icon && 'gap-2', inset && 'pl-8', className)}
      {...props}
    >
      {content}
    </DropdownMenuPrimitive.Item>
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="dropdown-checkbox-item"
    className={cn(
      dropdownItemVariants(),
      'relative pl-8 pr-2',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

export const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    data-slot="dropdown-label"
    className={cn(
      'px-2 py-1.5 text-body-3 font-semibold text-muted-foreground uppercase tracking-wider',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    data-slot="dropdown-separator"
    className={cn('-mx-1 my-1 h-px bg-grey-200 dark:bg-grey-700', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn('ml-auto text-body-3 tracking-widest text-muted-foreground tabular-nums', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
