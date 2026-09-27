import { tv, type VariantProps } from "tailwind-variants";

export const toggleGroupItem = tv({
	// Single-select items are role=radio/aria-checked, not aria-pressed; data-state
	// is the one attribute bits-ui sets unconditionally ("on"/"off") in both modes.
	base: "inline-flex items-center rounded-lg font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:bg-foreground/[0.08] data-[state=on]:text-foreground disabled:pointer-events-none disabled:opacity-50",
	variants: {
		size: {
			sm: "h-6 px-2 text-[11px]",
			md: "h-7 px-2.5 text-xs",
			lg: "h-9 px-3 text-sm",
			xl: "h-11 px-4 text-base",
		},
	},
	defaultVariants: { size: "md" },
});

export type ToggleGroupSize = NonNullable<VariantProps<typeof toggleGroupItem>["size"]>;
