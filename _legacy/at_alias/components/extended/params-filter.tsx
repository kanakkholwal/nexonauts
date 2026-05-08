"use client";

import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have shadcn checkbox
import { useUrlState } from "@/hooks/use-url-state";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useCallback } from "react";

export interface ParamsFilterProps {
  keyName: string;
  initialValue: string;
  options: string[];
  title?: string;
  allowMultiple?: boolean;
  variant?: "default" | "minimal" | "tags" | "pills";
}

export function ParamsFilter({
  keyName,
  initialValue,
  options,
  title,
  allowMultiple = false,
  variant = "default",
}: ParamsFilterProps) {
  // Parsing initial CSV values
  const [_, setUrlValue] = useUrlState(keyName, initialValue);
  const selectedValues = initialValue ? initialValue.split(",") : [];

  const handleToggle = useCallback(
    (option: string) => {
      let newValues: string[];

      if (allowMultiple) {
        if (selectedValues.includes(option)) {
          newValues = selectedValues.filter((v) => v !== option);
        } else {
          newValues = [...selectedValues, option];
        }
      } else {
        // If clicking the same option in single-select, clear it, otherwise set it
        newValues = selectedValues.includes(option) ? [] : [option];
      }

      // Update URL
      setUrlValue(newValues.join(","));
    },
    [allowMultiple, selectedValues, setUrlValue]
  );

  const isSelected = (option: string) => selectedValues.includes(option);

  // --- RENDER VARIANTS ---

  // 1. Variant: Pills (Used for Tags - e.g. "React", "Next.js")
  if (variant === "pills") {
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = isSelected(option);
          return (
            <button
              key={option}
              onClick={() => handleToggle(option)}
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all duration-200",
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Variant: Tags (Used for Price - e.g. "Free", "Paid")
  // Looks like a segmented list or distinct selectable buttons
  if (variant === "tags") {
    return (
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const active = isSelected(option);
          return (
            <button
              key={option}
              onClick={() => handleToggle(option)}
              className={cn(
                "relative flex items-center justify-between w-full px-3 py-2 text-sm rounded-md border transition-all duration-200 group",
                active
                  ? "bg-primary/5 border-primary/20 text-primary"
                  : "bg-transparent border-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="capitalize">{option.replace("-", " ")}</span>
              {active && <Check className="w-3.5 h-3.5 text-primary" />}
            </button>
          );
        })}
      </div>
    );
  }

  // 3. Variant: Minimal (Used for Categories - Clean text links)
  if (variant === "minimal") {
    return (
      <ul className="space-y-1">
        {options.map((option) => {
          const active = isSelected(option);
          return (
            <li key={option}>
              <button
                onClick={() => handleToggle(option)}
                className={cn(
                  "text-sm w-full text-left transition-colors duration-200 py-1 px-2 -ml-2 rounded-md",
                  active
                    ? "font-medium text-foreground bg-muted/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  // 4. Variant: Default (Standard Checkbox list)
  return (
    <div className="space-y-3">
      {title && <h4 className="font-medium text-sm mb-3">{title}</h4>}
      {options.map((option) => {
        const active = isSelected(option);
        return (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${keyName}-${option}`}
              checked={active}
              onCheckedChange={() => handleToggle(option)}
            />
            <label
              htmlFor={`${keyName}-${option}`}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
}