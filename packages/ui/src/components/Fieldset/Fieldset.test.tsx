import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Fieldset } from './Fieldset';
import { FormActions } from '../FormActions';
import { VisuallyHidden } from '../VisuallyHidden';

describe('Fieldset', () => {
  it('labels a group of fields', () => {
    render(
      <Fieldset legend="Contact" gap={6}>
        <input aria-label="First name" />
      </Fieldset>
    );
    const group = screen.getByRole('group', { name: 'Contact' });
    expect(group.className).toContain('gap-6');
    expect(group.className).toContain('min-w-0');
  });
});

describe('FormActions', () => {
  it('stacks on small screens and aligns from sm up, with an optional divider', () => {
    const { container } = render(
      <FormActions divider align="between">
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </FormActions>
    );
    const actions = container.firstElementChild as HTMLElement;
    expect(actions.className).toContain('flex-col-reverse');
    expect(actions.className).toContain('sm:justify-between');
    expect(actions.className).toContain('border-t');
  });
});

describe('VisuallyHidden', () => {
  it('keeps content for screen readers only, also on a child element', () => {
    render(
      <VisuallyHidden asChild>
        <h2>Overview</h2>
      </VisuallyHidden>
    );
    expect(screen.getByRole('heading', { name: 'Overview' })).toHaveClass('sr-only');
  });
});
