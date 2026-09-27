<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import { UNFOLD_ITEM } from "$lib/anchor";
import { cn } from "$lib/cn";

let {
	class: classProp,
	value,
	label,
	children: childrenProp,
	...rest
}: SelectPrimitive.ItemProps = $props();
</script>

<SelectPrimitive.Item
	{value}
	{label}
	{...rest}
	data-slot="select-item"
	class={cn(
		UNFOLD_ITEM,
		"flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-foreground text-sm outline-none transition-colors",
		"data-highlighted:bg-foreground/[0.06]",
		"data-disabled:pointer-events-none data-disabled:opacity-50",
		classProp,
	)}
>
	{#snippet children({ selected, highlighted })}
		{#if childrenProp}
			{@render childrenProp({ selected, highlighted })}
		{:else}
			{label || value}
		{/if}
		{#if selected}
			<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3.5 shrink-0">
				<path
					d="M3 7.4 5.6 10 11 4.2"
					stroke="currentColor"
					stroke-width="1.6"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		{/if}
	{/snippet}
</SelectPrimitive.Item>
