import { tv, type VariantProps } from "tailwind-variants";

export const checkbox = tv({
	slots: {
		box: [
			"grid place-items-center border-2 border-muted-foreground/50 bg-background transition-[background-color,border-color,transform,scale,translate] duration-150 ease-[var(--ease-out)]",
			"hover:border-muted-foreground active:scale-[0.92]",
			"data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"motion-reduce:transition-none",
		],
		mark: "",
		text: "block text-foreground",
	},
	variants: {
		size: {
			sm: { box: "size-3.5 rounded-[4px]", mark: "size-2.5", text: "text-xs" },
			md: { box: "size-4 rounded-[5px]", mark: "size-3", text: "text-sm" },
			lg: { box: "size-5 rounded-md", mark: "size-3.5", text: "text-sm" },
			xl: { box: "size-6 rounded-lg", mark: "size-4", text: "text-base" },
		},
	},
	defaultVariants: { size: "md" },
});

export type CheckboxSize = NonNullable<VariantProps<typeof checkbox>["size"]>;
