import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Fieldset } from './Fieldset';
import { FormActions } from '../FormActions';
import { Grid } from '../Grid';
import { Input } from '../Input';
import { Button } from '../Button';
import { Stack } from '../Stack';

const meta: Meta<typeof Fieldset> = {
  title: 'Forms/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Groups related fields under an overline label. Pair with `FormActions` for the buttons at the end of a form (stacked on phones, a row from `sm`).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const AddressForm: Story = {
  render: () => (
    <form className="max-w-xl">
      <Stack gap={6}>
        <Fieldset legend="Contact">
          <Grid cols={{ sm: 2 }} gap={4}>
            <Input label="First name" />
            <Input label="Last name" />
          </Grid>
          <Input label="Mobile number" leftAdornment="+91" />
        </Fieldset>
        <Fieldset legend="Address">
          <Input label="Address line 1" />
          <Grid cols={{ sm: 2 }} gap={4}>
            <Input label="City" />
            <Input label="PIN code" />
          </Grid>
        </Fieldset>
        <FormActions divider>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Save address</Button>
        </FormActions>
      </Stack>
    </form>
  ),
};
