<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLLiAttributes = $props();
</script>

<li {...rest} data-slot="breadcrumb-item" class={cn("flex items-center gap-1.5", classProp)}>
	{@render children?.()}
</li>
