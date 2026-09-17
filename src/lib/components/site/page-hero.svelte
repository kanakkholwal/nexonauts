<script lang="ts">
import type { Snippet } from "svelte";
import TiltedChip from "$lib/components/site/tilted-chip.svelte";
import { enterOnView } from "$lib/motion/enter";
import { cn } from "$lib/utils";

type Props = {
	badge?: string;
	title: string;
	/** Second line of the title, carried in the accent. */
	accent?: string;
	lede?: string;
	actions?: Snippet;
	aside?: Snippet;
	class?: string;
};

let { badge, title, accent, lede, actions, aside, class: className }: Props = $props();
</script>

<div
	class={cn(
		"grid grid-cols-1 gap-10 px-1 pt-28 pb-6 sm:px-4 sm:pt-32 sm:pb-10 lg:px-16",
		aside && "lg:grid-cols-2 lg:items-center",
		className
	)}
>
	<div class="flex flex-col" use:enterOnView>
		{#if badge}
			<TiltedChip label={badge} class="mb-4" />
		{/if}

		<h1 class="text-heading-lg text-foreground md:text-display text-balance font-medium">
			{title}
			{#if accent}
				<br />
				<span class="text-primary">{accent}</span>
			{/if}
		</h1>

		{#if lede}
			<p class="text-body text-muted-foreground md:text-body-lg mt-4 max-w-xl text-pretty">
				{lede}
			</p>
		{/if}

		{#if actions}
			<div class="mt-8 flex flex-wrap items-center gap-2 sm:gap-4">
				{@render actions()}
			</div>
		{/if}
	</div>

	{#if aside}
		<div class="min-w-0">
			{@render aside()}
		</div>
	{/if}
</div>
