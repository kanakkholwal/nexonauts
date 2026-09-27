<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "$lib/cn";
import { setDensity } from "./context";
import { type TableDensity, table } from "./variants";

let {
	children,
	class: className,
	containerClass,
	density = "comfortable",
	...rest
}: {
	children?: Snippet;
	class?: string;
	containerClass?: string;
	density?: TableDensity;
} & HTMLAttributes<HTMLTableElement> = $props();

setDensity(() => density);

const classes = $derived(table({ density }));
</script>

<div data-slot="table-container" class={cn(classes.container(), containerClass)}>
	<table data-slot="table" class={cn(classes.root(), className)} {...rest}>
		{@render children?.()}
	</table>
</div>
