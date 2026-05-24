<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	/**
	 * Card — Nexonauts editorial surface.
	 *
	 * Editorial cards float on the off-white canvas via a hairline border + a
	 * single soft drop tier. No multi-layer shadows. DESIGN.md §5/§7.
	 *
	 * Variants:
	 *  - default:   white surface card with hairline (16px radius)
	 *  - flat:      no shadow on hover, hairline only
	 *  - elevated:  visible soft drop at rest
	 *  - orb:       extra-soft 24px radius for gradient-orb cards
	 *  - feature:   2/3-up grid card with explicit hover affordance
	 *  - testimonial: 32px padding quote card
	 *  - dark:      surface-dark canvas for rare dark heroes
	 *  - glass:     translucent canvas for layering over orbs
	 *  - outline:   no fill, hairline only
	 */
	export const cardVariants = tv({
		base: [
			"group/card flex flex-col gap-4 overflow-hidden",
			"text-card-foreground",
			"transition-all duration-200 ease-out",
		].join(" "),
		variants: {
			variant: {
				default:
					"bg-card text-card-foreground rounded-xl border border-hairline",
				flat: "bg-card rounded-xl border border-hairline",
				elevated:
					"bg-card rounded-xl border border-hairline shadow-(--shadow-soft-drop)",
				orb: "bg-canvas-soft rounded-3xl border border-hairline-soft",
				feature:
					"bg-card rounded-xl border border-hairline hover:shadow-(--shadow-soft-drop) hover:border-hairline-strong",
				testimonial:
					"bg-card rounded-xl border border-hairline p-8 text-body",
				dark: "bg-surface-dark text-on-dark rounded-xl border border-white/8",
				"dark-elevated":
					"bg-surface-dark-elevated text-on-dark rounded-xl border border-white/8",
				glass:
					"bg-card/70 backdrop-blur-md rounded-xl border border-hairline",
				outline:
					"bg-transparent rounded-xl border border-hairline-strong text-foreground",
			},
			size: {
				default: "py-4 px-0 gap-4 data-[has-content]:px-6",
				sm: "py-3 gap-3",
				md: "py-5 gap-4",
				lg: "py-6 gap-5",
				none: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
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
		"*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
