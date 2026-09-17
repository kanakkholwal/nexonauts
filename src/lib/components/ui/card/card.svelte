<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

/** Card. See .notes/DESIGN.md. A container is a hairline and a radius, with no
 *  shadow at rest. Retired variant names resolve here rather than break. */
export const cardVariants = tv({
	base: ["group/card flex flex-col gap-4 overflow-hidden", "text-card-foreground"].join(" "),
	variants: {
		variant: {
			default: "rounded-2xl border border-border bg-card",
			outline: "rounded-2xl border border-border bg-transparent text-foreground",
			// Nested tonal panel. The tone change is the separation, so no border.
			muted: "rounded-2xl bg-muted",
			// A card that is also a link changes its fill, never its elevation.
			interactive:
				"ease-craft rounded-2xl border border-border bg-card transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
			// --- Retired names, kept so a stray call site degrades. ---
			flat: "rounded-2xl border border-border bg-card",
			elevated: "rounded-2xl border border-border bg-card",
			feature:
				"ease-craft rounded-2xl border border-border bg-card transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
			orb: "rounded-3xl bg-muted",
			glass: "rounded-2xl border border-border bg-card",
			testimonial: "rounded-2xl border border-border bg-card p-8 text-muted-foreground",
			dark: "rounded-2xl border border-border bg-card",
			"dark-elevated": "rounded-2xl border border-border bg-card"
		},
		size: {
			default: "p-6",
			sm: "gap-3 p-4",
			md: "gap-4 p-5",
			lg: "gap-5 p-8",
			none: ""
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});

export type CardVariant = VariantProps<typeof cardVariants>["variant"];
export type CardSize = VariantProps<typeof cardVariants>["size"];
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn, type WithElementRef } from "$lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	variant = "default",
	size = "default",
	...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	variant?: CardVariant;
	size?: CardSize;
} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	data-variant={variant}
	class={cn(
		cardVariants({ variant, size }),
		"has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0",
		"*:[img:first-child]:rounded-t-2xl *:[img:last-child]:rounded-b-2xl",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
