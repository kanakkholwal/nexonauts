import { tv, type VariantProps } from "tailwind-variants";

/** Shared surface for ContextMenu, DropdownMenu and their submenus. */
export const MENU_SURFACE =
	"min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl";

export const menuItem = tv({
	base: [
		"relative flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5",
		"text-left text-sm outline-none transition-colors",
		"data-[highlighted]:bg-foreground/[0.06]",
		"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		"data-[inset]:pl-8",
	],
	variants: {
		variant: {
			default: "text-foreground",
			destructive: "text-[var(--destructive)]",
		},
	},
	defaultVariants: { variant: "default" },
});

export type MenuItemVariant = NonNullable<VariantProps<typeof menuItem>["variant"]>;

/** Right-aligned key cap, e.g. inside a menu item next to its label. */
export const MENU_SHORTCUT =
	"ml-auto shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground";
