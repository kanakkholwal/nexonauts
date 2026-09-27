import { tv, type VariantProps } from "tailwind-variants";

export const table = tv({
	slots: {
		container: "relative w-full overflow-x-auto rounded-xl border border-border",
		root: "w-full caption-bottom border-collapse text-[13px]",
		header: "bg-card [&_tr]:border-border [&_tr]:border-b",
		body: "[&_tr:last-child]:border-0",
		footer:
			"border-border border-t bg-card font-medium text-muted-foreground [&>tr]:last:border-b-0",
		row: "border-border border-b transition-colors hover:bg-foreground/[0.06] data-[state=selected]:bg-primary/[0.04]",
		head: "text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
		cell: "align-middle text-foreground [&:has([role=checkbox])]:pr-0",
		caption: "mt-4 text-[13px] text-muted-foreground",
	},
	variants: {
		density: {
			comfortable: { head: "px-3 py-2", cell: "px-3 py-2" },
			compact: { head: "px-3 py-1.5", cell: "px-3 py-1" },
		},
	},
	defaultVariants: { density: "comfortable" },
});

export type TableDensity = NonNullable<VariantProps<typeof table>["density"]>;
