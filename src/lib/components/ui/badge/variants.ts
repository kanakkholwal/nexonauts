import { tv, type VariantProps } from "tailwind-variants";

export const badge = tv({
	base: "inline-flex shrink-0 items-center gap-1.5 rounded-md border font-medium whitespace-nowrap transition-colors duration-150",
	variants: {
		variant: {
			default: "border-transparent bg-primary text-primary-foreground",
			secondary: "border-transparent bg-card text-foreground",
			outline: "border-border bg-transparent text-foreground",
			success:
				"border-transparent bg-[color-mix(in_oklch,var(--success)_15%,transparent)] text-[color-mix(in_oklch,var(--success)_75%,var(--foreground))]",
			warning:
				"border-transparent bg-[color-mix(in_oklch,var(--warning)_15%,transparent)] text-[color-mix(in_oklch,var(--warning)_75%,var(--foreground))]",
			destructive:
				"border-transparent bg-[color-mix(in_oklch,var(--destructive)_15%,transparent)] text-[color-mix(in_oklch,var(--destructive)_75%,var(--foreground))]",
			info: "border-transparent bg-[color-mix(in_oklch,var(--info)_15%,transparent)] text-[color-mix(in_oklch,var(--info)_75%,var(--foreground))]",
		},
		size: {
			sm: "h-5 px-1.5 text-[11px]",
			md: "h-6 px-2 text-xs",
			lg: "h-7 px-2.5 text-sm",
			xl: "h-8 px-3 text-sm",
		},
	},
	defaultVariants: { variant: "secondary", size: "md" },
});

export type BadgeVariant = NonNullable<VariantProps<typeof badge>["variant"]>;
export type BadgeSize = NonNullable<VariantProps<typeof badge>["size"]>;
