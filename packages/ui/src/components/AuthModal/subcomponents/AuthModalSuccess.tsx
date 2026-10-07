'use client';

import * as React from 'react';
import { CheckCircle } from '@timmbr/icons';
import { useAuthModalLabels } from '../AuthModal.labels';
import type { AuthModalFormProps } from '../AuthModal.types';
import { AuthStepHeader } from './AuthModalParts';

export interface AuthModalSuccessProps {
  form: AuthModalFormProps;
}

export function AuthModalSuccess({ form }: AuthModalSuccessProps) {
  const labels = useAuthModalLabels();
  const { successTitle = labels.successTitle, successMessage } = form;

  return (
    <div
      data-slot="auth-modal-success-step"
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center text-center gap-4 py-10 min-h-[320px]"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle className="size-9" aria-hidden="true" />
      </div>
      {/* No input on this step, so focus the heading for keyboard/screen-reader users */}
      <AuthStepHeader title={successTitle} subtitle={successMessage} focusOnMount />
    </div>
  );
}

AuthModalSuccess.displayName = 'AuthModalSuccess';
