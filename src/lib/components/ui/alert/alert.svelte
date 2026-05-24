<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	/**
	 * Alert — editorial inset notice.
	 * Hairline border, soft tinted background, ink text.
	 */
	export const alertVariants = tv({
		base: [
			"group/alert relative grid w-full gap-1 rounded-xl border px-4 py-3 text-left text-sm",
			"has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-20",
			"has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3",
			"*:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
			"*:[svg:not([class*='size-'])]:size-4",
		].join(" "),
		variants: {
			variant: {
				default: "bg-canvas-soft text-ink border-hairline",
				info: "bg-info/8 text-info border-info/25",
				success: "bg-success/10 text-success border-success/25",
				warning: "bg-warning/10 text-warning border-warning/25",
				destructive:
					"bg-destructive/8 text-destructive border-destructive/25 *:data-[slot=alert-description]:text-destructive/85",
				// Atmospheric soft tints for editorial inline notes.
				"soft-mint": "bg-gradient-mint/20 text-ink border-gradient-mint/35",
				"soft-peach": "bg-gradient-peach/22 text-ink border-gradient-peach/35",
				"soft-lavender": "bg-gradient-lavender/22 text-ink border-gradient-lavender/35",
				"soft-sky": "bg-gradient-sky/20 text-ink border-gradient-sky/35",
				"soft-rose": "bg-gradient-rose/22 text-ink border-gradient-rose/35",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type AlertVariant = VariantProps<typeof alertVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert"
	role="alert"
	class={cn(alertVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
