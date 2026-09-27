<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLElement> = $props();
</script>

<kbd
	{...rest}
	data-slot="command-shortcut"
	class={cn(
		"shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground",
		classProp,
	)}
>
	{@render children?.()}
</kbd>
