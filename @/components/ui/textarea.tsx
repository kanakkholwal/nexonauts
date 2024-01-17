"use client";
import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const textareaVarinats = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background placeholder:text-muted-foreground  focus-visible:outline-none focus-visible:border-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
  ,{
  variants: {
    variant: {
      default: "border-input",
      outline: "border-input",
      ghost: "border border-solid border-transparent bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 dark:border-slate-700 focus:border-primary/70",
      fluid: "border border-solid border-transparent bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 dark:border-slate-700 focus:border-primary/70",
      border:" border-2 focus:border-primary/70 border-solid"
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textareaVarinats>{}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className,variant, ...props }, ref) => {
    return (
      <textarea
      className={cn(textareaVarinats({ variant, className }))}
      ref={ref}

        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

