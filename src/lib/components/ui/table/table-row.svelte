<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "$lib/cn";
import { getDensity } from "./context";
import { table } from "./variants";

let {
	children,
	class: className,
	...rest
}: { children?: Snippet } & HTMLAttributes<HTMLTableRowElement> = $props();

const density = getDensity();
const classes = $derived(table({ density: density() }));
</script>

<tr data-slot="table-row" class={cn(classes.row(), className)} {...rest}>
	{@render children?.()}
</tr>
