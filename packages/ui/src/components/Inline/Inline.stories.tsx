import type { Meta, StoryObj } from '@storybook/react';
import { Inline } from './Inline';
import { Badge } from '../Badge';
import { Button } from '../Button';

const meta: Meta<typeof Inline> = {
  title: 'Layout/Inline',
  component: Inline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Spacing between children',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline'],
      description: 'Cross-axis alignment',
    },
    wrap: {
      control: 'boolean',
      description: 'Allows flex wrapping to new lines',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Inline>;

export const Default: Story = {
  render: (args) => (
    <Inline {...args}>
      <Badge variant="primary">Badge 1</Badge>
      <Badge variant="secondary">Badge 2</Badge>
      <Badge variant="outline">Badge 3</Badge>
      <Badge variant="brand">Badge 4</Badge>
    </Inline>
  ),
  args: {
    gap: 3,
    align: 'center',
    wrap: true,
  },
};

export const ButtonBar: Story = {
  render: () => (
    <Inline justify="between" className="p-4 bg-secondary border border-grey-200 rounded-[2px]">
      <Button variant="ghost" size="sm">Back</Button>
      <Inline gap={2}>
        <Button variant="outline" size="sm">Save Draft</Button>
        <Button variant="primary" size="sm">Publish</Button>
      </Inline>
    </Inline>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <Inline
      divider={<span className="text-grey-400 select-none">•</span>}
      className="text-sm text-grey-600"
    >
      <a href="#about" className="hover:text-primary">About</a>
      <a href="#careers" className="hover:text-primary">Careers</a>
      <a href="#privacy" className="hover:text-primary">Privacy Policy</a>
      <a href="#terms" className="hover:text-primary">Terms of Service</a>
    </Inline>
  ),
};
