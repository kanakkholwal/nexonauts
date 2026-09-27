import { tv, type VariantProps } from "tailwind-variants";

/** Shared inset-rim treatment: Dialog, AlertDialog and Command all frame the same way. */
export const dialogFrame = tv({
	slots: {
		panel: "rounded-2xl border border-border bg-background shadow-2xl",
		footer: "flex items-center justify-end gap-2",
		body: "relative overflow-hidden",
	},
	variants: {
		variant: {
			framed: { panel: "p-1", footer: "px-2 pt-2 pb-1", body: "rounded-[11px] bg-card" },
			default: { panel: "p-6", footer: "pt-6", body: "" },
		},
	},
	defaultVariants: { variant: "default" },
});

export type DialogVariant = NonNullable<VariantProps<typeof dialogFrame>["variant"]>;

/** Dialog-only: AlertDialog and Command set their own fixed panel width. */
export const dialogWidth = tv({
	variants: {
		size: {
			sm: "max-w-sm",
			md: "max-w-lg",
			lg: "max-w-2xl",
			xl: "max-w-4xl",
		},
	},
	defaultVariants: { size: "md" },
});

export type DialogSize = NonNullable<VariantProps<typeof dialogWidth>["size"]>;
