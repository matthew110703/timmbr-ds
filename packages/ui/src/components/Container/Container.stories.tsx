import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width breakpoint boundary',
    },
    padded: {
      control: 'boolean',
      description: 'Applies responsive horizontal padding',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="p-8 bg-secondary rounded-[2px] text-center border border-grey-200">
        <h3 className="text-xl font-bold font-sans text-secondary-foreground">Responsive Container Content</h3>
        <p className="text-sm text-grey-600 mt-2">Centered layout container with responsive padding.</p>
      </div>
    </Container>
  ),
  args: {
    maxWidth: 'lg',
    padded: true,
  },
};

export const Breakpoints: Story = {
  render: () => (
    <div className="space-y-4">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Container key={size} maxWidth={size}>
          <div className="p-4 bg-bg-1 border border-primary/20 rounded-[2px] text-center text-sm font-semibold">
            Container maxWidth="{size}"
          </div>
        </Container>
      ))}
    </div>
  ),
};
