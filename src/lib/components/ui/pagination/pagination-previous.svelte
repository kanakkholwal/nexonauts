<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let { class: classProp, ...rest }: { class?: string } & HTMLButtonAttributes = $props();
</script>

<button
	{...rest}
	type="button"
	data-slot="pagination-previous"
	aria-label="Previous page"
	class={cn(
		"grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
		classProp,
	)}
>
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
		<path d="M10 4 6 8l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>
