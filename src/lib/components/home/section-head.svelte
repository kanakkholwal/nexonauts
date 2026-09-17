<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "$lib/utils";

type Props = {
	/** Two digits, so the page reads as a numbered register rather than a deck. */
	index: string;
	label: string;
	title: string;
	description?: string;
	class?: string;
	action?: Snippet;
};

let { index, label, title, description, class: className, action }: Props = $props();
</script>

<div class={cn("border-border border-t pt-5", className)}>
	<div class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
		<p class="text-caption text-muted-foreground font-mono tracking-wide uppercase">
			<span class="text-foreground tabular-nums">{index}</span>
			<span class="text-border-strong mx-2">/</span>{label}
		</p>
		{#if action}
			{@render action()}
		{/if}
	</div>

	<h2 class="text-heading-lg lg:text-display text-foreground mt-6 max-w-3xl font-medium tracking-tight text-balance">
		{title}
	</h2>

	{#if description}
		<p class="text-body text-muted-foreground mt-4 max-w-2xl text-pretty">{description}</p>
	{/if}
</div>
