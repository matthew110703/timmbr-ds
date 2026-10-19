"use client";

import * as React from "react";
import { Input } from "../Input";
import { Switch } from "../Switch";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { Stack } from "../Stack";
import { Inline } from "../Inline";
import { Text } from "../Text";
import { cn } from "@timmbr/utils";

export type AttributeValueFieldType =
  | "STRING"
  | "INTEGER"
  | "DECIMAL"
  | "LIST"
  | "BOOLEAN";

export interface AttributeValueFieldOption {
  label: string;
  slug: string;
  swatchHex?: string | null;
}

export interface AttributeValueFieldProps {
  type: AttributeValueFieldType;
  value: unknown;
  onChange: (value: unknown) => void;
  options?: AttributeValueFieldOption[];
  unit?: string | null;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
  id?: string;
}

export const AttributeValueField: React.FC<AttributeValueFieldProps> = ({
  type,
  value,
  onChange,
  options = [],
  unit,
  disabled,
  size = "sm",
  className,
  id,
}) => {
  const inputSize = size === "sm" ? "sm" : "md";

  if (type === "BOOLEAN") {
    const checked = value === true || value === "true";
    return (
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={(next) => onChange(next)}
        disabled={disabled}
        className={className}
      />
    );
  }

  if (type === "INTEGER" || type === "DECIMAL") {
    return (
      <Inline gap={2} align="center" className={cn("w-full", className)}>
        <Input
          id={id}
          type="number"
          size={inputSize}
          step={type === "INTEGER" ? 1 : "any"}
          value={value === undefined || value === null ? "" : String(value)}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange("");
              return;
            }
            onChange(type === "INTEGER" ? parseInt(raw, 10) : parseFloat(raw));
          }}
          disabled={disabled}
          className="flex-1"
        />
        {unit ? (
          <Text variant="caption" foreground="muted" className="shrink-0">
            {unit}
          </Text>
        ) : null}
      </Inline>
    );
  }

  if (type === "LIST" && options.length > 0) {
    const selected = Array.isArray(value)
      ? (value as string[])
      : value
        ? [String(value)]
        : [];

    return (
      <Stack gap={2} className={className}>
        {options.map((opt) => {
          const optValue = opt.slug || opt.label;
          const isChecked = selected.includes(optValue);
          return (
            <Inline key={opt.slug} gap={2} align="center">
              <Checkbox
                id={id ? `${id}-${opt.slug}` : undefined}
                checked={isChecked}
                disabled={disabled}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...selected, optValue]);
                  } else {
                    onChange(selected.filter((v) => v !== optValue));
                  }
                }}
              />
              {opt.swatchHex ? (
                <span
                  className="size-4 rounded-sm border border-border shrink-0"
                  style={{ backgroundColor: opt.swatchHex }}
                />
              ) : null}
              <Text variant="body-2">{opt.label}</Text>
            </Inline>
          );
        })}
      </Stack>
    );
  }

  if (type === "LIST" || type === "STRING") {
    if (options.length > 0) {
      const selectValue =
        value === undefined || value === null ? "" : String(value);
      return (
        <Select
          id={id}
          size={inputSize}
          value={selectValue}
          onValueChange={(v) => onChange(v)}
          disabled={disabled}
          className={className}
          options={[
            { value: "", label: "Select…" },
            ...options.map((o) => ({
              value: o.slug || o.label,
              label: o.label,
            })),
          ]}
        />
      );
    }
  }

  return (
    <Input
      id={id}
      size={inputSize}
      value={value === undefined || value === null ? "" : String(value)}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={className}
    />
  );
};
