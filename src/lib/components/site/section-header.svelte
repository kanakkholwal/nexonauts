<script lang="ts">
import type { Snippet } from "svelte";
import { enterOnView } from "$lib/motion/enter";
import { cn } from "$lib/utils";

type Props = {
	eyebrow?: string;
	title: string;
	/** Second line of the title, carried in the accent. */
	accent?: string;
	description?: string;
	class?: string;
	actions?: Snippet;
};

let { eyebrow, title, accent, description, class: className, actions }: Props = $props();
</script>

<header class={cn("flex flex-col", className)} use:enterOnView>
	{#if eyebrow}
		<p class="text-caption text-muted-foreground mb-3 font-medium">{eyebrow}</p>
	{/if}
	<h2 class="text-heading text-foreground md:text-heading-lg text-balance font-medium">
		{title}
		{#if accent}
			<br />
			<span class="text-primary">{accent}</span>
		{/if}
	</h2>
	{#if description}
		<p class="text-body text-muted-foreground mt-4 max-w-xl text-pretty">{description}</p>
	{/if}
	{#if actions}
		<div class="mt-6 flex flex-wrap items-center gap-3">{@render actions()}</div>
	{/if}
</header>
