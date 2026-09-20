import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';

const meta: Meta<typeof Tabs> = {
  title: 'Overlays & Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pills', 'underline', 'outline'],
      description: 'Visual tab bar presentation style',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg'],
      description: 'Size of tab buttons',
    },
    motion: {
      control: 'boolean',
      description: 'Enable or disable transition animations',
    },
  },
  args: {
    variant: 'pills',
    size: 'default',
    motion: true,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="spec" {...args}>
      <TabsList>
        <TabsTrigger value="spec">Specifications</TabsTrigger>
        <TabsTrigger value="grain">Grain Profile</TabsTrigger>
        <TabsTrigger value="finishes">Finishes</TabsTrigger>
      </TabsList>
      <TabsContent value="spec">
        <Card>
          <CardHeader>
            <CardTitle>Physical Specifications</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Density: 660 kg/m³, Janka Hardness: 1,010 lbf, Radial shrinkage: 5.5%.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="grain">
        <Card>
          <CardHeader>
            <CardTitle>Grain & Figure</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Straight to interlocked grain with subtle chatoyance and medium coarse texture.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="finishes">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Finishes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Tung oil, natural hardwax oils, and polyurethane topcoats preserve organic luster.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  args: {
    variant: 'underline',
  },
  render: (args) => (
    <Tabs defaultValue="overview" {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
        <TabsTrigger value="billing">Invoices</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground pt-2">
          Timber procurement and kiln tracking dashboard.
        </p>
      </TabsContent>
      <TabsContent value="orders">
        <p className="text-sm text-muted-foreground pt-2">
          No pending hardwood orders currently in fabrication.
        </p>
      </TabsContent>
      <TabsContent value="billing">
        <p className="text-sm text-muted-foreground pt-2">
          All supplier ledger invoices are settled up to current period.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => (
    <Tabs defaultValue="daily" {...args}>
      <TabsList>
        <TabsTrigger value="daily">Daily Output</TabsTrigger>
        <TabsTrigger value="weekly">Weekly Output</TabsTrigger>
        <TabsTrigger value="monthly">Monthly Output</TabsTrigger>
      </TabsList>
      <TabsContent value="daily">
        <p className="text-sm text-muted-foreground pt-2">Board feet milled today: 2,450 BF</p>
      </TabsContent>
      <TabsContent value="weekly">
        <p className="text-sm text-muted-foreground pt-2">Board feet milled this week: 16,800 BF</p>
      </TabsContent>
      <TabsContent value="monthly">
        <p className="text-sm text-muted-foreground pt-2">Board feet milled this month: 68,400 BF</p>
      </TabsContent>
    </Tabs>
  ),
};
