"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUrlState } from "@/hooks/use-url-state";
import { cn } from "@/lib/utils";
import React from "react";

// TODO: Add support for multiple values and option types
interface FiltersProps {
  initialValue: string;
  keyName: string;
  options: readonly string[] | string[];
  allowMultiple?: boolean;
  title?: string;
  className?: string;
  optionsClassName?: string;
  optionClassName?: string;
  btnClassName?: string;
  renderLabel?: (option: string, index: number) => React.ReactNode;
}

export function ParamsFilter({
  initialValue,
  keyName,
  allowMultiple = false,
  options,
  ...props
}: FiltersProps) {
  const [value, setValue, isExist, clearUrlState] = useUrlState(
    keyName,
    initialValue
  );

  if (allowMultiple) {
    const arrayValues = value
      ?.split(",")
      .filter(Boolean)
      .filter((v) => v.trim() !== "");

    const addValue = (val: string) => {
      if (!arrayValues.includes(val)) {
        const newValues = [...arrayValues, val];
        setValue(newValues.join(","));
      }
    };

    const removeValue = (val: string) => {
      const newValues = arrayValues.filter((v) => v !== val);
      setValue(newValues.join(","));
    };

    return (
      <div
        className={cn(props?.className)}
        key={`params-filter-for-${keyName}-[multiple]`}
      >
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-semibold capitalize">
            {props?.title ? props.title : keyName}
          </h4>
          {isExist && (
            <Button
              size="sm"
              variant="link"
              onClick={() => setValue("")}
              className={cn("ml-auto", props?.btnClassName)}
            >
              Clear
            </Button>
          )}
        </div>
        <div
          className={cn(
            "flex flex-col gap-2 [&>div]:pl-4 mt-4",
            props?.optionsClassName
          )}
        >
          {options.map((option: string, index: number) => {
            return (
              <div
                key={`${keyName}-${option}`}
                className={cn(
                  "items-top flex space-x-2",
                  props?.optionClassName
                )}
              >
                <Checkbox
                  id={`${keyName}-${option}`}
                  value={option}
                  onCheckedChange={(checked) => {
                    checked ? addValue(option) : removeValue(option);
                  }}
                  checked={arrayValues.includes(option)}
                />
                <Label
                  htmlFor={`${keyName}-${option}`}
                  className="mb-0 capitalize"
                >
                  {props?.renderLabel
                    ? props.renderLabel(option, index)
                    : option}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(props?.className)}
      key={`params-filter-for-${keyName}-[single]`}
    >
      <div className="flex items-center gap-2">
        <h4 className="text-lg font-semibold capitalize">
          {props?.title ? props.title : keyName}
        </h4>
        {isExist && (
          <Button
            size="sm"
            variant="link"
            onClick={() => clearUrlState()}
            className={cn("ml-auto", props?.btnClassName)}
          >
            Clear
          </Button>
        )}
      </div>
      <RadioGroup
        defaultValue={value}
        className={cn(
          "flex flex-col gap-2 [&>div]:pl-4 mt-4",
          props?.optionsClassName
        )}
        onValueChange={(val) => setValue(val)}
      >
        {options.map((option: string) => {
          return (
            <div
              key={`${keyName}-${option}`}
              className={cn("items-top flex space-x-2", props?.optionClassName)}
            >
              <RadioGroupItem id={option} value={option} />
              <Label htmlFor={option} className="mb-0 capitalize">
                {props?.renderLabel ? props.renderLabel(option, 0) : option}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
