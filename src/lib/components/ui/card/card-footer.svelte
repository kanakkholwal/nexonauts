<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn, type WithElementRef } from "$lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-footer"
	class={cn(
		"flex items-center gap-3 px-6 pt-4 pb-5",
		"group-data-[size=sm]/card:px-5 group-data-[size=sm]/card:pb-4",
		"border-t border-border rounded-b-xl",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
