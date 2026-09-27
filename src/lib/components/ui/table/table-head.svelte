<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLThAttributes } from "svelte/elements";
import { cn } from "$lib/cn";
import { getDensity } from "./context";
import { table } from "./variants";

let {
	children,
	class: className,
	...rest
}: { children?: Snippet } & HTMLThAttributes = $props();

const density = getDensity();
const classes = $derived(table({ density: density() }));
</script>

<th data-slot="table-head" class={cn(classes.head(), className)} {...rest}>
	{@render children?.()}
</th>
