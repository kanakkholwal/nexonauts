<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		title,
		kind = "code",
		children
	}: {
		title?: string;
		kind?: "code" | "output";
		children?: Snippet;
	} = $props();
</script>

<section class="guide-step" class:guide-step--output={kind === "output"}>
	<div class="guide-step__text">
		{#if title}
			<h3 class="guide-step__title">{title}</h3>
		{/if}
		{@render children?.()}
	</div>
</section>

<style>
	.guide-step {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin: 3rem 0;
	}

	@media (min-width: 1024px) {
		.guide-step {
			grid-template-columns: 1fr 1fr;
			gap: 2.5rem;
		}
	}

	/* The wrapper itself participates in the parent grid via display:contents,
	 * so its children (h3, p, pre, etc.) become direct grid items of .guide-step. */
	.guide-step__text {
		display: contents;
	}

	.guide-step__title {
		color: var(--color-foreground, currentColor);
		font-size: 1.125rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		margin: 0 0 0.5rem 0;
	}

	/* Default: every direct child lands in column 1, code blocks jump to column 2. */
	.guide-step :global(> .guide-step__text > *) {
		grid-column: 1;
		align-self: start;
		min-width: 0;
	}

	.guide-step :global(> .guide-step__text > pre),
	.guide-step :global(> .guide-step__text > pre.shiki),
	.guide-step :global(> .guide-step__text > .shiki) {
		grid-column: 2;
		align-self: start;
		margin: 0;
		overflow-x: auto;
	}

	@media (max-width: 1023px) {
		.guide-step :global(> .guide-step__text > pre),
		.guide-step :global(> .guide-step__text > pre.shiki),
		.guide-step :global(> .guide-step__text > .shiki) {
			grid-column: 1;
		}
	}

	/* Output variant: the right-column code block reads as a terminal session. */
	.guide-step--output :global(> .guide-step__text > pre),
	.guide-step--output :global(> .guide-step__text > pre.shiki),
	.guide-step--output :global(> .guide-step__text > .shiki) {
		background: #0a0a0a !important;
		color: #d4d4d4;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 1rem 1.25rem;
		font-family:
			ui-monospace, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono",
			"Courier New", monospace;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.guide-step--output :global(> .guide-step__text > pre::before),
	.guide-step--output :global(> .guide-step__text > pre.shiki::before),
	.guide-step--output :global(> .guide-step__text > .shiki::before) {
		content: "terminal";
		display: block;
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(212, 212, 212, 0.45);
		margin-bottom: 0.5rem;
	}
</style>
