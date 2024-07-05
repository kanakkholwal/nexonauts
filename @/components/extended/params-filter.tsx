"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUrlState } from "@/hooks/use-url-state";
import { cn } from "@/lib/utils";
import React from "react";

// TODO : Improve the type of options
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
      .split(",")
      .filter(Boolean)
      .filter((v) => v.trim() !== "");

    const addValue = (value: string) => {
      if (!arrayValues.includes(value)) {
        const newValues = [...arrayValues, value];
        setValue(newValues.join(","));
      }
    };

    const removeValue = (value: string) => {
      console.log("removeValue", value);
      const newValues = arrayValues.filter((v) => v !== value);
      setValue(newValues.join(","));
    };

    return (
      <div className={cn(props?.className)}>
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
                  onCheckedChange={(value) => {
                    value ? addValue(option) : removeValue(option);
                  }}
                  checked={arrayValues.includes(option)}
                />
                <Label htmlFor={`${keyName}-${option}`} className="mb-0">
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
    <div className={cn(props?.className)}>
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
        onValueChange={(value) => setValue(value)}
      >
        {options.map((option: string) => {
          return (
            <div
              key={`${keyName}-${option}`}
              className={cn("items-top flex space-x-2", props?.optionClassName)}
            >
              <RadioGroupItem id={option} value={option} />
              <Label htmlFor={option} className="mb-0">
                {option}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
