<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "$lib/cn";

let {
	children,
	value,
	keywords = "",
	class: classProp,
	onSelect,
	onclick,
	...rest
}: Omit<CommandPrimitive.ItemProps, "keywords" | "onSelect" | "value"> & {
	value: string;
	keywords?: string;
	/** Fires on click or Enter, like cmdk. `onclick` is an alias. */
	onSelect?: () => void;
	onclick?: () => void;
} = $props();
</script>

<CommandPrimitive.Item
	{value}
	keywords={keywords ? keywords.split(/\s+/) : undefined}
	onSelect={onSelect ?? onclick}
	data-slot="command-item"
	class={cn(
		"relative flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
		"text-muted-foreground data-[selected]:text-foreground",
		classProp,
	)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Item>
