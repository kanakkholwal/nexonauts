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
}: { children?: Snippet } & HTMLAttributes<HTMLTableSectionElement> = $props();

const density = getDensity();
const classes = $derived(table({ density: density() }));
</script>

<thead data-slot="table-header" class={cn(classes.header(), className)} {...rest}>
	{@render children?.()}
</thead>
