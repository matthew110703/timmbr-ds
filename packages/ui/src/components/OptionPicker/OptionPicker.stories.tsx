import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OptionPicker } from './OptionPicker';
import type { OptionPickerOption } from './OptionPicker.types';

const finishes: OptionPickerOption[] = [
  { value: 'walnut', label: 'Walnut', swatchHex: '#5C3A21' },
  { value: 'honey', label: 'Honey', swatchHex: '#B5753A', state: 'out-of-stock' },
  { value: 'natural', label: 'Natural', swatchHex: '#D9B98B' },
  { value: 'white', label: 'Frosty White', swatchHex: '#F7F6F2', state: 'unavailable' },
];
const sizes: OptionPickerOption[] = [
  { value: 'single', label: 'Single', state: 'out-of-stock' },
  { value: 'queen', label: 'Queen' },
  { value: 'king', label: 'King' },
];

const meta: Meta<typeof OptionPicker> = {
  title: 'Forms/OptionPicker',
  component: OptionPicker,
};
export default meta;

export const Swatches: StoryObj<typeof OptionPicker> = {
  render: function Story() {
    const [value, setValue] = React.useState('walnut');
    return <OptionPicker label="Finish" display="swatch" options={finishes} value={value} onChange={setValue} />;
  },
};

export const Pills: StoryObj<typeof OptionPicker> = {
  render: function Story() {
    const [value, setValue] = React.useState('queen');
    return <OptionPicker label="Size" options={sizes} value={value} onChange={setValue} />;
  },
};
