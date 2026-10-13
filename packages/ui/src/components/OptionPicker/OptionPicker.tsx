'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Select } from '../Select';
import { Swatch } from '../Swatch';
import {
  optionPickerLegendVariants,
  optionImageVariants,
  optionPickerVariants,
  optionPillVariants,
  optionStrikeVariants,
  optionSwatchVariants,
} from './OptionPicker.styles';
import type { OptionPickerOption, OptionPickerProps } from './OptionPicker.types';

const stateOf = (option: OptionPickerOption) => option.state ?? 'available';

/**
 * One product option (finish, size…) as visible choices: colour swatches or pill buttons, in a
 * radio group (arrow keys move and select, Tab leaves the group). Sold-out options stay
 * selectable and are struck through; combinations that don't exist are disabled. Long lists
 * (more than `maxVisible`) become a dropdown.
 */
export const OptionPicker = React.forwardRef<HTMLDivElement, OptionPickerProps>(
  ({ label, options, value, onChange, display = 'pill', maxVisible = 8, labels, className, ...props }, ref) => {
    const legendId = React.useId();
    const buttons = React.useRef<(HTMLButtonElement | null)[]>([]);
    const selected = options.find((option) => option.value === value);
    const outOfStock = labels?.outOfStock ?? 'Out of stock';

    const legend = (
      <p id={legendId} className={optionPickerLegendVariants()} data-slot="option-picker-legend">
        {label}
        {selected && (
          <>
            {': '}
            <span className="font-normal text-grey-700">{selected.label}</span>
            {stateOf(selected) === 'out-of-stock' && (
              <span className="font-normal text-destructive">{` · ${outOfStock}`}</span>
            )}
          </>
        )}
      </p>
    );

    if (options.length > maxVisible) {
      const unavailable = labels?.unavailable ?? 'Unavailable';
      return (
        <div ref={ref} data-slot="option-picker" className={cn(optionPickerVariants(), className)} {...props}>
          {legend}
          <Select
            ariaLabel={label}
            value={value}
            onValueChange={onChange}
            options={options.map((option) => ({
              value: option.value,
              label:
                stateOf(option) === 'available'
                  ? option.label
                  : `${option.label} (${stateOf(option) === 'out-of-stock' ? outOfStock : unavailable})`,
              disabled: stateOf(option) === 'unavailable',
            }))}
          />
        </div>
      );
    }

    // Roving focus: only the selected (or first enabled) option is in the tab order.
    const enabled = options
      .map((option, index) => (stateOf(option) === 'unavailable' ? -1 : index))
      .filter((i) => i >= 0);
    const selectedIndex = options.findIndex((option) => option.value === value);
    const tabStop = selectedIndex >= 0 && enabled.includes(selectedIndex) ? selectedIndex : enabled[0];

    const move = (from: number, delta: number) => {
      if (enabled.length === 0) return;
      const position = enabled.indexOf(from);
      const next = enabled[(position + delta + enabled.length) % enabled.length];
      buttons.current[next]?.focus();
      onChange(options[next].value);
    };

    const onKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        move(index, 1);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        move(index, -1);
      }
    };

    return (
      <div ref={ref} data-slot="option-picker" className={cn(optionPickerVariants(), className)} {...props}>
        {legend}
        <div role="radiogroup" aria-labelledby={legendId} className="flex flex-wrap gap-2">
          {options.map((option, index) => {
            const state = stateOf(option);
            const isSelected = option.value === value;
            const asSwatch = display === 'swatch' && !!option.swatchHex;
            const asImage = display === 'image' && !!option.imageUrl;
            const name =
              state === 'available'
                ? option.label
                : `${option.label}, ${state === 'out-of-stock' ? outOfStock : (labels?.unavailable ?? 'Unavailable')}`;
            return (
              <button
                key={option.value}
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={name}
                title={option.label}
                disabled={state === 'unavailable'}
                tabIndex={index === tabStop ? 0 : -1}
                onClick={() => onChange(option.value)}
                onKeyDown={onKeyDown(index)}
                data-state={state}
                data-slot="option-picker-option"
                className={
                  asImage
                    ? optionImageVariants({ selected: isSelected, state })
                    : asSwatch
                      ? optionSwatchVariants({ selected: isSelected, state })
                      : optionPillVariants({ selected: isSelected, state })
                }
              >
                {asImage ? (
                  <>
                    <img
                      src={option.imageUrl!}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                    {state !== 'available' && (
                      <span aria-hidden="true" className={cn(optionStrikeVariants(), 'rounded-none')} />
                    )}
                  </>
                ) : asSwatch ? (
                  <>
                    <Swatch color={option.swatchHex!} size="lg" />
                    {state !== 'available' && <span aria-hidden="true" className={optionStrikeVariants()} />}
                  </>
                ) : (
                  <>
                    {option.swatchHex && <Swatch color={option.swatchHex} size="sm" />}
                    {option.label}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
OptionPicker.displayName = 'OptionPicker';
