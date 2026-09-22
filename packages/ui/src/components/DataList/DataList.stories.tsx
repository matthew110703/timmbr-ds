import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from './DataList';
import { Badge } from '../Badge';
import { Chip } from '../Chip';

const meta: Meta<typeof DataList> = {
  title: 'Data/DataList',
  component: DataList,
  subcomponents: {
    DataListItem: DataListItem as React.ComponentType<any>,
    DataListLabel: DataListLabel as React.ComponentType<any>,
    DataListValue: DataListValue as React.ComponentType<any>,
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A description list component inspired by Radix UI, designed to display pairs of labels and values cleanly.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of key-value pairs',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size density of text and spacing',
    },
    divided: {
      control: 'boolean',
      description: 'Whether to show subtle horizontal divider rules between items',
    },
  },
  args: {
    orientation: 'horizontal',
    size: 'default',
    divided: false,
  },
};

export default meta;
type Story = StoryObj<typeof DataList>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-md p-4 rounded-lg border border-grey-200 dark:border-grey-800">
      <DataList {...args}>
        <DataListItem>
          <DataListLabel minWidth={140}>Customer ID</DataListLabel>
          <DataListValue className="font-mono text-xs text-primary">CUST-8921-X</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel minWidth={140}>Full Name</DataListLabel>
          <DataListValue>Eleanor Vance</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel minWidth={140}>Email Address</DataListLabel>
          <DataListValue>eleanor.vance@hillhouse.org</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel minWidth={140}>Status</DataListLabel>
          <DataListValue>
            <Badge variant="success">Active Member</Badge>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel minWidth={140}>Subscription Tier</DataListLabel>
          <DataListValue>
            <Chip size="sm" variant="outlined">Enterprise Cloud</Chip>
          </DataListValue>
        </DataListItem>
      </DataList>
    </div>
  ),
};

export const Divided: Story = {
  render: () => (
    <div className="max-w-md p-4 rounded-lg border border-grey-200 dark:border-grey-800">
      <DataList divided>
        <DataListItem>
          <DataListLabel minWidth={130}>Cluster Name</DataListLabel>
          <DataListValue className="font-mono">us-central-k8s-prod</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel minWidth={130}>Nodes Healthy</DataListLabel>
          <DataListValue>18 / 18 nodes (100%)</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel minWidth={130}>Uptime</DataListLabel>
          <DataListValue>99.98% (94 days)</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel minWidth={130}>Deployment State</DataListLabel>
          <DataListValue>
            <Badge variant="subtle">Synced</Badge>
          </DataListValue>
        </DataListItem>
      </DataList>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="max-w-sm p-4 rounded-lg border border-grey-200 dark:border-grey-800">
      <DataList orientation="vertical" size="sm">
        <DataListItem>
          <DataListLabel>Project Title</DataListLabel>
          <DataListValue className="font-semibold text-base">Timmbr Design System v2</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Repository URL</DataListLabel>
          <DataListValue className="font-mono text-xs text-primary underline">
            https://github.com/timmbr/design-system
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Release Cycle</DataListLabel>
          <DataListValue>Bi-weekly canary releases</DataListValue>
        </DataListItem>
      </DataList>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="max-w-md p-4 rounded-lg border border-grey-200 dark:border-grey-800">
      <DataList divided>
        <DataListItem align="center">
          <DataListLabel
            minWidth={140}
            icon={
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          >
            Author
          </DataListLabel>
          <DataListValue>Timmbr Core Team</DataListValue>
        </DataListItem>
        <DataListItem align="center">
          <DataListLabel
            minWidth={140}
            icon={
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            Last Modified
          </DataListLabel>
          <DataListValue>20 minutes ago</DataListValue>
        </DataListItem>
        <DataListItem align="center">
          <DataListLabel
            minWidth={140}
            icon={
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          >
            Security Audit
          </DataListLabel>
          <DataListValue>
            <Badge variant="success">Passed (0 Vulnerabilities)</Badge>
          </DataListValue>
        </DataListItem>
      </DataList>
    </div>
  ),
};
