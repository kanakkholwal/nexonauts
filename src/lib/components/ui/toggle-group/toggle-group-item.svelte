<script lang="ts">
import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "$lib/cn";
import { getToggleGroup } from "./context";
import { toggleGroupItem } from "./variants";

let {
	children: childrenProp,
	value,
	class: classProp,
	...rest
}: Omit<ToggleGroupPrimitive.ItemProps, "children"> & { children?: Snippet } = $props();

const group = getToggleGroup();
</script>

<ToggleGroupPrimitive.Item
	{value}
	data-slot="toggle-group-item"
	class={cn(toggleGroupItem({ size: group.size }), classProp)}
	{...rest}
>
	{#snippet children()}
		{@render childrenProp?.()}
	{/snippet}
</ToggleGroupPrimitive.Item>
