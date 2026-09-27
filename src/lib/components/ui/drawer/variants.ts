import { tv, type VariantProps } from "tailwind-variants";

/** `framed` is this repo's original rim + inset-surface treatment (default); `default` is
 * shadcn/ui's own flat vaul baseline (a single bg-background surface, no rim split). */
export const drawerFrame = tv({
	slots: {
		panel: "border border-border shadow-2xl outline-none",
		surface: "relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain",
	},
	variants: {
		variant: {
			framed: {
				panel: "bg-background p-1",
				surface: [
					"rounded-[20px] bg-card p-5",
					"group-data-[vaul-drawer-direction=bottom]/drawer:rounded-b-none group-data-[vaul-drawer-direction=top]/drawer:rounded-t-none",
					"group-data-[vaul-drawer-direction=left]/drawer:rounded-l-none group-data-[vaul-drawer-direction=right]/drawer:rounded-r-none",
				].join(" "),
			},
			default: {
				panel: "bg-background",
				surface: "p-5",
			},
		},
	},
	defaultVariants: { variant: "default" },
});

export type DrawerVariant = NonNullable<VariantProps<typeof drawerFrame>["variant"]>;
