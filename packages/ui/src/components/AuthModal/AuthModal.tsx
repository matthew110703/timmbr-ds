'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { AuthModalLabelsContext, DEFAULT_AUTH_MODAL_LABELS } from './AuthModal.labels';
import { authModalCardVariants, authModalContainerVariants } from './AuthModal.styles';
import type { AuthModalProps } from './AuthModal.types';
import {
  AuthModalBanner,
  AuthModalIdentifierForm,
  AuthModalOAuth,
  AuthModalOtpForm,
  AuthModalPasswordForm,
  AuthModalSetPasswordForm,
  AuthModalSuccess,
} from './subcomponents';

export const AuthModal = React.forwardRef<HTMLDivElement, AuthModalProps>(
  ({ isOpen, onClose, banner, form, oauth, legal, labels: labelOverrides, className }, ref) => {
    const step = form.step ?? 'IDENTIFIER';
    const labels = React.useMemo(
      () => ({ ...DEFAULT_AUTH_MODAL_LABELS, ...labelOverrides }),
      [labelOverrides]
    );

    const renderStep = () => {
      switch (step) {
        case 'OTP':
          return <AuthModalOtpForm form={form} />;
        case 'PASSWORD':
          return <AuthModalPasswordForm form={form} />;
        case 'SET_PASSWORD':
          return <AuthModalSetPasswordForm form={form} />;
        case 'SUCCESS':
          return <AuthModalSuccess form={form} />;
        case 'IDENTIFIER':
        default:
          return (
            <>
              <AuthModalIdentifierForm form={form} legal={legal} />
              <AuthModalOAuth providers={oauth?.providers} disabled={form.isLoading} />
            </>
          );
      }
    };

    return (
      <AuthModalLabelsContext.Provider value={labels}>
        <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay
              data-slot="auth-modal-overlay"
              className="fixed inset-0 z-50 bg-grey-1000/50 backdrop-blur-[2px] transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
              <DialogPrimitive.Content
                ref={ref}
                data-slot="auth-modal-content"
                className={cn(
                  authModalContainerVariants(),
                  'pointer-events-auto transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                  className
                )}
              >
                {/* Constant dialog name; each step's visible heading describes the current step */}
                <DialogPrimitive.Title className="sr-only">{labels.dialogTitle}</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  {labels.dialogDescription}
                </DialogPrimitive.Description>

                <DialogPrimitive.Close
                  data-slot="auth-modal-close"
                  aria-label={labels.close}
                  className="absolute right-3 top-3 z-30 rounded-sm p-1.5 text-grey-700 hover:text-grey-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </DialogPrimitive.Close>

                <AuthModalBanner
                  data={banner?.data}
                  promoTermsUrl={banner?.promoTermsUrl}
                  className={banner?.className}
                />

                <div data-slot="auth-modal-card" className={authModalCardVariants()}>
                  <div>{renderStep()}</div>
                </div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </AuthModalLabelsContext.Provider>
    );
  }
);

AuthModal.displayName = 'AuthModal';
