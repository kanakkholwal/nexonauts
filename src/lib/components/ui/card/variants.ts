import { tv, type VariantProps } from "tailwind-variants";

/** `framed` wraps the body in the same inset rim as Dialog; `default` is the flat shadcn card. */
export const cardFrame = tv({
	slots: {
		root: "rounded-2xl border border-border",
		body: "flex flex-col gap-6 py-6 text-card-foreground",
	},
	variants: {
		variant: {
			default: { root: "bg-card", body: "" },
			framed: { root: "bg-background p-1", body: "rounded-[11px] bg-card" },
		},
	},
	defaultVariants: { variant: "default" },
});

export type CardVariant = NonNullable<VariantProps<typeof cardFrame>["variant"]>;
