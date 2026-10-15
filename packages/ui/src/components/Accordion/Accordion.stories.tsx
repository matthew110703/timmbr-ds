import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  decorators: [
    (Story: any) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[360px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern and is built on Radix UI primitives.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses CSS keyframe animations that seamlessly integrate with our dual-layer animation system.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can motion be overridden locally?</AccordionTrigger>
          <AccordionContent motion={false}>
            Yes! This item has `motion={false}`, disabling animation strictly for this panel.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/** Multiple items can be open at the same time. */
export const MultipleOpen: Story = {
  render: () => (
    <div className="w-[360px]">
      <Accordion type="multiple" defaultValue={['item-1', 'item-3']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Wood species available</AccordionTrigger>
          <AccordionContent>
            Oak, walnut, maple, cherry, and ash. Each species is kiln-dried to 6–8% moisture content before machining.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Lead times</AccordionTrigger>
          <AccordionContent>
            Custom pieces ship in 8–12 weeks. In-stock items ship within 3 business days.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Finish options</AccordionTrigger>
          <AccordionContent>
            Natural oil, hard-wax oil, and matte lacquer. All finishes are low-VOC and GREENGUARD certified.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/** Disabled items remain in the DOM but cannot be opened. */
export const WithDisabledItem: Story = {
  render: () => (
    <div className="w-[360px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Available now</AccordionTrigger>
          <AccordionContent>This item is in stock and ready to ship.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Coming soon (disabled)</AccordionTrigger>
          <AccordionContent>This content is not yet available.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Contact us</AccordionTrigger>
          <AccordionContent>Reach out at hello@timmbr.com for custom enquiries.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/** Fully controlled open state via `value` + `onValueChange`. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div className="w-[360px] space-y-3">
        <div className="flex gap-2 flex-wrap text-body-3">
          {['item-1', 'item-2', 'item-3'].map((id) => (
            <button
              key={id}
              onClick={() => setValue((v) => (v === id ? '' : id))}
              className="px-3 py-1 rounded-full border border-border text-foreground hover:bg-muted transition-colors"
            >
              {id === value ? `Close ${id}` : `Open ${id}`}
            </button>
          ))}
        </div>
        <Accordion type="single" collapsible value={value} onValueChange={setValue}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section one</AccordionTrigger>
            <AccordionContent>Controlled by external state.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section two</AccordionTrigger>
            <AccordionContent>Toggled from the buttons above.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Section three</AccordionTrigger>
            <AccordionContent>Only one section open at a time.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};
