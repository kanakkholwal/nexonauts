import { tv, type VariantProps } from "tailwind-variants";

/** Only the closed state translates, so the open state needs no competing utility. */
export const sheetPanel = tv({
	base: [
		"fixed z-50 flex flex-col gap-4 overflow-y-auto border-border bg-background p-6",
		"transition-transform duration-[var(--duration-drawer)] ease-[var(--ease-drawer)]",
		// Deliberately --duration-overlay, not the shorter --duration-exit: a full-width
		// panel travelling 100% needs more than 120ms to read as a retreat, not a cut.
		"data-[state=closed]:duration-[var(--duration-overlay)]",
		"data-[state=closed]:data-[side=left]:-translate-x-full",
		"data-[state=closed]:data-[side=right]:translate-x-full",
		"data-[state=closed]:data-[side=top]:-translate-y-full",
		"data-[state=closed]:data-[side=bottom]:translate-y-full",
		"starting:data-[state=open]:data-[side=left]:-translate-x-full",
		"starting:data-[state=open]:data-[side=right]:translate-x-full",
		"starting:data-[state=open]:data-[side=top]:-translate-y-full",
		"starting:data-[state=open]:data-[side=bottom]:translate-y-full",
		"motion-reduce:transition-none",
	],
	variants: {
		side: {
			left: "inset-y-0 left-0 h-full w-[min(22rem,100vw)] border-r",
			right: "inset-y-0 right-0 h-full w-[min(22rem,100vw)] border-l",
			top: "inset-x-0 top-0 w-full max-h-[80vh] border-b",
			bottom: "inset-x-0 bottom-0 w-full max-h-[80vh] rounded-t-2xl border-t",
		},
	},
	defaultVariants: { side: "right" },
});

export type SheetSide = NonNullable<VariantProps<typeof sheetPanel>["side"]>;
