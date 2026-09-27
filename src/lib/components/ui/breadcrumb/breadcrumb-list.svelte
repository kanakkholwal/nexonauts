<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLOlAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLOlAttributes = $props();
</script>

<ol {...rest} data-slot="breadcrumb-list" class={cn("flex flex-wrap items-center gap-1.5", classProp)}>
	{@render children?.()}
</ol>
