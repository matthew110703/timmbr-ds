import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Chip } from './Chip';
import { Sparkles } from '@timmbr/icons';

const meta: Meta<typeof Chip> = {
  title: 'Data/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['subtle', 'filled', 'outlined'],
      description: 'Chip visual style',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'destructive'],
      description: 'Semantic color tint',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size scale',
    },
    selected: {
      control: 'boolean',
      description: 'Active selection highlight',
    },
    clickable: {
      control: 'boolean',
      description: 'Interactive button styling',
    },
  },
  args: {
    variant: 'subtle',
    color: 'default',
    size: 'default',
    children: 'Kiln Dried 8%',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Removable: Story = {
  render: () => {
    const [chips, setChips] = React.useState(['White Oak', 'American Walnut', 'Hard Maple']);

    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((wood) => (
          <Chip
            key={wood}
            variant="outlined"
            onRemove={() => setChips((prev) => prev.filter((c) => c !== wood))}
          >
            {wood}
          </Chip>
        ))}
      </div>
    );
  },
};

export const FilterGroup: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['Oak']);
    const options = ['Oak', 'Walnut', 'Maple', 'Ash', 'Cedar'];

    const toggle = (opt: string) => {
      setSelected((prev) =>
        prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
      );
    };

    return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Chip
            key={opt}
            clickable
            selected={selected.includes(opt)}
            onClick={() => toggle(opt)}
          >
            {opt}
          </Chip>
        ))}
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip color="primary" icon={<Sparkles className="size-3 text-primary" />}>
        AI Grade Recommended
      </Chip>
      <Chip color="success">Moisture Stable</Chip>
      <Chip color="warning">Kiln Re-heat</Chip>
      <Chip color="destructive">High Variance</Chip>
    </div>
  ),
};
