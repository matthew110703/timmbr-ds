'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Eye, EyeOff } from '@timmbr/icons';
import { Spinner } from '../../Spinner';
import { useAuthModalLabels } from '../AuthModal.labels';
import {
  authModalHeadingVariants,
  authModalInputVariants,
  authModalLinkVariants,
  authModalSubmitButtonVariants,
  authModalSubtitleVariants,
} from '../AuthModal.styles';

// Internal building blocks shared by the AuthModal steps (not exported).

/** A <form> that never falls back to a native, page-reloading submit. */
export function AuthForm({
  onSubmit,
  className,
  children,
}: {
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form
      noValidate
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
    >
      {children}
    </form>
  );
}

/** Step heading. `focusOnMount` moves focus here for steps without an input to focus. */
export function AuthStepHeader({
  title,
  subtitle,
  focusOnMount = false,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  focusOnMount?: boolean;
}) {
  const ref = React.useRef<HTMLHeadingElement>(null);
  React.useEffect(() => {
    if (focusOnMount) ref.current?.focus();
  }, [focusOnMount]);

  return (
    <div className="mb-6">
      <h2 ref={ref} tabIndex={-1} className={authModalHeadingVariants()}>
        {title}
      </h2>
      {subtitle && <div className={authModalSubtitleVariants()}>{subtitle}</div>}
    </div>
  );
}

export function AuthFieldError({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" data-slot="auth-modal-error" className="mt-2 text-body-3 text-destructive font-medium">
      {children}
    </p>
  );
}

export function AuthSubmitButton({
  isLoading,
  disabled,
  children,
}: {
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={authModalSubmitButtonVariants()}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" variant="white" decorative />
          {/* Keeps the button's accessible name while the label is hidden */}
          <span className="sr-only">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function AuthTextLink({
  onClick,
  disabled,
  className,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(authModalLinkVariants(), className)}
    >
      {children}
    </button>
  );
}

/** Masked destination with an optional "Edit" link back to the identifier step. */
export function AuthDestination({
  value,
  onEdit,
  disabled,
}: {
  value: string;
  onEdit?: () => void;
  disabled?: boolean;
}) {
  const labels = useAuthModalLabels();
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="font-medium text-grey-950 break-all">{value}</span>
      {onEdit && (
        <AuthTextLink onClick={onEdit} disabled={disabled} className="text-body-3">
          {labels.edit}
        </AuthTextLink>
      )}
    </span>
  );
}

type PasswordFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> & {
  id: string;
  label: string;
  onValueChange?: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

export function AuthPasswordField({
  id,
  label,
  onValueChange,
  invalid,
  describedBy,
  className,
  ...inputProps
}: PasswordFieldProps) {
  const labels = useAuthModalLabels();
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          onChange={(e) => onValueChange?.(e.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(authModalInputVariants({ invalid: !!invalid }), 'pr-12')}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? labels.hidePassword : labels.showPassword}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-grey-600 hover:text-grey-950 focus:outline-none focus-visible:text-primary cursor-pointer"
        >
          {visible ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
