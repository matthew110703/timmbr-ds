import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListItemAction } from './List';
import { Sparkles, ChevronRight, Check } from '@timmbr/icons';
import { Badge } from '../Badge';

const meta: Meta<typeof List> = {
  title: 'Data/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'divided'],
      description: 'Outer border and separator styling',
    },
  },
  args: {
    variant: 'divided',
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-md">
      <List {...args}>
        <ListItem interactive>
          <ListItemIcon>
            <Sparkles className="size-4 text-primary" />
          </ListItemIcon>
          <ListItemText
            primary="Kiln Chamber #1"
            secondary="Equilibrium moisture: 7.9% (Optimal)"
          />
          <ListItemAction>
            <Badge variant="outline">Running</Badge>
            <ChevronRight className="size-4 text-muted-foreground" />
          </ListItemAction>
        </ListItem>

        <ListItem interactive>
          <ListItemIcon>
            <Check className="size-4 text-success" />
          </ListItemIcon>
          <ListItemText
            primary="Hardwood Grading Lot A"
            secondary="FAS Prime sorted by laser profiling"
          />
          <ListItemAction>
            <Badge variant="outline">Verified</Badge>
            <ChevronRight className="size-4 text-muted-foreground" />
          </ListItemAction>
        </ListItem>
      </List>
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <List variant="bordered">
        <ListItem>
          <ListItemText primary="Sugar Maple - 4/4 Thickness" secondary="Lot #8401" />
          <ListItemAction>
            <span className="font-mono text-xs">850 BF</span>
          </ListItemAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="Black Cherry - 8/4 Thickness" secondary="Lot #8402" />
          <ListItemAction>
            <span className="font-mono text-xs">1,200 BF</span>
          </ListItemAction>
        </ListItem>
      </List>
    </div>
  ),
};
