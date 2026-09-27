<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let {
	children,
	active = false,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	active?: boolean;
	class?: string;
} & HTMLButtonAttributes = $props();
</script>

<button
	{...rest}
	type="button"
	data-slot="pagination-link"
	aria-current={active ? "page" : undefined}
	class={cn(
		"grid size-8 place-items-center rounded-lg text-muted-foreground text-sm tabular-nums transition-colors hover:text-foreground",
		"aria-[current=page]:bg-foreground/[0.08] aria-[current=page]:font-medium aria-[current=page]:text-foreground",
		classProp,
	)}
>
	{@render children?.()}
</button>
