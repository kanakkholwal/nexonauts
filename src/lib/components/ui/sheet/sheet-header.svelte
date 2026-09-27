<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...rest} data-slot="sheet-header" class={cn("flex items-center justify-between gap-4", classProp)}>
	{@render children?.()}
</div>
