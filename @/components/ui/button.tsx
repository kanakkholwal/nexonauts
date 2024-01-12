import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-white  hover:bg-primary/90",
        default_light: "bg-primary/10 text-primary hover:bg-primary/20",
        success_light: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        warning_light: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        destructive_light: "bg-red-500/10 text-red-500 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-500 hover:dark:bg-red-500/10 hover:dark:text-red-500",
        destructive:
          "bg-red-100 hover:bg-red-200 text-red-600	dark:bg-red-700 dark:text-red-200 dark:hover:bg-red-800 dark:hover:text-red-200",
        outline:
          "border border-input bg-accent hover:bg-accent/80 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-white hover:bg-white hover:text-accent-foreground",
        slate: "bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-950 dark:hover:text-slate-100",
        dark: "bg-slate-900 text-white hover:bg-slate-800 transition-duration-500",
        link: "text-primary underline-offset-4 hover:underline",
        success:"bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700",
        gradient: "hero-button-gradient",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "rounded-md py-3 px-7",
        icon: "h-10 w-10 p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

