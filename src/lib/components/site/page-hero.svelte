<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "$lib/utils";

type Props = {
	/** Mono caption above the title. Name the section, not the page. */
	eyebrow?: string;
	title: string;
	lede?: string;
	/** Actions, chips, anything that belongs under the lede. */
	children?: Snippet;
	class?: string;
};

let { eyebrow, title, lede, children, class: className }: Props = $props();
</script>

<!-- Every public page opens on the same tinted band, so the nav shelf always has a second
     surface to notch into. The page's own content resumes on --background below it. -->
<section
	class={cn("relative isolate overflow-clip bg-muted", className)}
	data-motion="page-hero"
	aria-labelledby="page-hero-title"
>
	<div class="mx-auto w-full max-w-page px-5 pt-32 pb-16 sm:px-10 md:pt-40 md:pb-24 lg:px-14">
		{#if eyebrow}
			<p class="enter font-mono text-caption tracking-wider text-muted-foreground uppercase">
				{eyebrow}
			</p>
		{/if}
		<h1
			id="page-hero-title"
			class="enter mt-3 max-w-[18ch] text-heading-lg font-medium text-balance md:text-display"
		>
			{title}
		</h1>
		{#if lede}
			<p class="enter mt-5 max-w-[56ch] text-body-lg text-pretty text-muted-foreground">{lede}</p>
		{/if}
		{#if children}
			<div class="enter mt-8">{@render children()}</div>
		{/if}
	</div>
</section>

<style>
	/* Entrance without a hidden resting state: with no JS the band simply sits. */
	@media (prefers-reduced-motion: no-preference) {
		.enter {
			transition:
				opacity var(--duration-enter) var(--ease-out),
				transform var(--duration-enter) var(--ease-out);
		}
		.enter:nth-child(2) {
			transition-delay: 70ms;
		}
		.enter:nth-child(3) {
			transition-delay: 140ms;
		}
		.enter:nth-child(4) {
			transition-delay: 210ms;
		}
		@starting-style {
			.enter {
				opacity: 0;
				transform: translateY(14px);
			}
		}
	}
</style>
