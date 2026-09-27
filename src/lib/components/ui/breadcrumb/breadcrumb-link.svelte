<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAnchorAttributes = $props();
</script>

<a
	{...rest}
	data-slot="breadcrumb-link"
	class={cn("text-muted-foreground transition-colors hover:text-foreground", classProp)}
>
	{@render children?.()}
</a>
