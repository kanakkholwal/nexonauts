<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Alert: editorial inset notice.
 * Hairline border, soft tinted background, ink text.
 */
export const alertVariants = tv({
	base: [
		"group/alert relative grid w-full gap-1 rounded-xl border px-4 py-3 text-left text-sm",
		"has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-20",
		"has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3",
		"*:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
		"*:[svg:not([class*='size-'])]:size-4"
	].join(" "),
	variants: {
		variant: {
			default: "bg-paper text-foreground border-border-low",
			info: "bg-info/8 text-info border-info/25",
			success: "bg-success/10 text-success border-success/25",
			warning: "bg-warning/10 text-warning border-warning/25",
			destructive:
				"bg-destructive/8 text-destructive border-destructive/25 *:data-[slot=alert-description]:text-destructive/85"
		}
	},
	defaultVariants: {
		variant: "default"
	}
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
