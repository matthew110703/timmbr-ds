import type * as React from 'react';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional field label rendered using the Label primitive.
   */
  label?: React.ReactNode;
  /**
   * If true, displays required indicator.
   */
  required?: boolean;
  /**
   * Optional supporting message below the input.
   */
  helperText?: React.ReactNode;
  /**
   * Error message or boolean flag.
   */
  error?: React.ReactNode;
  /**
   * ID connecting the label and description to the input element.
   */
  id?: string;
  /**
   * Disables child controls and dims label.
   */
  disabled?: boolean;
}
