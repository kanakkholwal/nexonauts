"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVarinats = cva(
  "flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm font-medium  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:border-slate-100 invalid:ring-red-500"
  ,{
  variants: {
    variant: {
      default: "border-input",
      outline: "border-input",
      ghost: "border border-solid border-transparent bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 dark:border-slate-700  focus:border-primary/70 dark:focus:border-primary/70",
      fluid: "border border-solid border-transparent bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 dark:border-slate-700  focus:border-primary/70 dark:focus:border-primary/70",
      border:" border-2 focus:border-primary/70 border-solid"
    },
    rounded: {
      default: "rounded-md",
      sm: "rounded-sm",
      lg: "rounded-3xl",
      full: "rounded-full",
      none: "rounded-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVarinats>{}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className,variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVarinats({ variant, className }))}

        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input };

