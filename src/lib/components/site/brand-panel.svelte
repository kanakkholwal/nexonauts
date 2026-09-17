<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "$lib/utils";

type Props = {
	title: string;
	body?: string;
	actions?: Snippet;
	class?: string;
};

let { title, body, actions, class: className }: Props = $props();
</script>

<!-- Body copy is full-strength white, not white/80: the panel's brightest stop
     is the accent itself, where white/80 measures 4.06:1 and fails the floor. -->
<section
	class={cn("panel-brand relative w-full overflow-hidden rounded-3xl px-6 py-16 sm:py-20", className)}
>
	<div class="relative mx-auto flex max-w-3xl flex-col items-center text-center">
		<h2 class="text-heading text-fixed-light sm:text-heading-lg md:text-display text-balance font-medium">
			{title}
		</h2>
		{#if body}
			<p class="text-body text-fixed-light mt-4 max-w-md text-pretty">{body}</p>
		{/if}
		{#if actions}
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				{@render actions()}
			</div>
		{/if}
	</div>
</section>
