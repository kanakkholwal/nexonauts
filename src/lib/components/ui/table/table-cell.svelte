<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLTdAttributes } from "svelte/elements";
import { cn } from "$lib/cn";
import { getDensity } from "./context";
import { table } from "./variants";

let {
	children,
	class: className,
	...rest
}: { children?: Snippet } & HTMLTdAttributes = $props();

const density = getDensity();
const classes = $derived(table({ density: density() }));
</script>

<td data-slot="table-cell" class={cn(classes.cell(), className)} {...rest}>
	{@render children?.()}
</td>
