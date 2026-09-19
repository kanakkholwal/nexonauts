<script lang="ts">
import ChevronDownIcon from "@tabler/icons-svelte/icons/chevron-down";
import { Select as SelectPrimitive } from "bits-ui";
import { cn, type WithoutChild } from "$lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	size = "default",
	...restProps
}: WithoutChild<SelectPrimitive.TriggerProps> & {
	size?: "sm" | "default";
} = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	data-size={size}
	class={cn(
		"flex w-fit items-center justify-between whitespace-nowrap gap-2 rounded-xl border border-border-control bg-card py-2 pr-2 pl-3.5 text-sm",
		"font-sans tracking-[0.01em] text-foreground data-placeholder:text-muted-foreground",
		"transition-[border-color,box-shadow] duration-150 outline-none select-none",
		"focus-visible:border-primary focus-visible:shadow-[inset_0_0_0_1px_var(--primary)]",
		"aria-invalid:border-destructive aria-invalid:focus-visible:shadow-[inset_0_0_0_1px_var(--destructive)]",
		"disabled:cursor-not-allowed disabled:opacity-60",
		"data-[size=default]:h-10 data-[size=sm]:h-9 data-[size=sm]:rounded-xl",
		"*:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:line-clamp-1",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronDownIcon class="text-muted-foreground size-4 pointer-events-none" />
</SelectPrimitive.Trigger>
