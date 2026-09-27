<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span {...rest} data-slot="breadcrumb-page" aria-current="page" class={cn("font-medium text-foreground", classProp)}>
	{@render children?.()}
</span>
