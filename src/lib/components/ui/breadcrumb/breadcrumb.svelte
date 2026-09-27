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

<nav {...rest} data-slot="breadcrumb" aria-label="Breadcrumb" class={cn("text-sm", classProp)}>
	{@render children?.()}
</nav>
