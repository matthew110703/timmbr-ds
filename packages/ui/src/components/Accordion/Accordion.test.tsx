import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';
import { AnimationProvider } from '../../providers';

describe('Accordion component', () => {
  it('renders accordion items and toggles content on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole('button', { name: /section 1/i });
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText(/content 1/i)).toBeInTheDocument();

    // Click to collapse
    await user.click(trigger);
    expect(trigger).toHaveAttribute('data-state', 'closed');
  });

  it('respects global animation disablement', () => {
    const { container } = render(
      <AnimationProvider disableAnimations={true}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section Animated</AccordionTrigger>
            <AccordionContent>Animated Panel</AccordionContent>
          </AccordionItem>
        </Accordion>
      </AnimationProvider>
    );

    expect(document.documentElement).toHaveAttribute('data-animations-disabled', 'true');
  });
});
