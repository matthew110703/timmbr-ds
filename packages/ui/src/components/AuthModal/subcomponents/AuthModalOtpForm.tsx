'use client';

import * as React from 'react';
import { OtpInput } from '../../OtpInput';
import { useAuthModalLabels } from '../AuthModal.labels';
import type { AuthModalFormProps } from '../AuthModal.types';
import {
  AuthDestination,
  AuthForm,
  AuthStepHeader,
  AuthSubmitButton,
  AuthTextLink,
} from './AuthModalParts';

export interface AuthModalOtpFormProps {
  form: AuthModalFormProps;
}

export function AuthModalOtpForm({ form }: AuthModalOtpFormProps) {
  const labels = useAuthModalLabels();
  const {
    identifier = '',
    otp = '',
    otpLength = 6,
    onOtpChange,
    onOtpSubmit,
    onResendOtp,
    onEditIdentifier,
    isLoading = false,
    error,
    destination,
    resendCountdown = 0,
  } = form;

  return (
    <div data-slot="auth-modal-otp-step" className="flex flex-col">
      <AuthStepHeader
        title={labels.otpTitle}
        subtitle={
          <span className="inline-flex flex-wrap items-center gap-1">
            {labels.otpSentTo}{' '}
            <AuthDestination
              value={destination || identifier}
              onEdit={onEditIdentifier}
              disabled={isLoading}
            />
          </span>
        }
      />

      <AuthForm onSubmit={onOtpSubmit} className="space-y-6">
        <OtpInput
          length={otpLength}
          value={otp}
          onChange={onOtpChange}
          disabled={isLoading}
          autoFocus
          autoComplete="one-time-code"
          aria-label={labels.otpLabel}
          error={error ?? undefined}
        />

        <AuthSubmitButton isLoading={isLoading} disabled={otp.length !== otpLength}>
          {labels.otpSubmit}
        </AuthSubmitButton>

        <div className="text-center pt-1 text-body-3">
          {resendCountdown > 0 ? (
            <p className="text-grey-600" aria-live="polite">
              {labels.otpResendIn(resendCountdown)}
            </p>
          ) : (
            onResendOtp && (
              <AuthTextLink onClick={onResendOtp} disabled={isLoading}>
                {labels.otpResend}
              </AuthTextLink>
            )
          )}
        </div>
      </AuthForm>
    </div>
  );
}

AuthModalOtpForm.displayName = 'AuthModalOtpForm';
