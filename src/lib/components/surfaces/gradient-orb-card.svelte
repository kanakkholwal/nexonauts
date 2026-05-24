<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils";
	import GradientOrb, { type OrbHue } from "./gradient-orb.svelte";

	/**
	 * GradientOrbCard — DESIGN.md `gradient-orb-card`.
	 *
	 * A canvas-soft surface with a 24px radius, holding an atmospheric pastel
	 * bloom behind centered display copy. Each card picks one of the five
	 * gradient tokens.
	 */
	let {
		hue = "lavender",
		as: Tag = "section",
		eyebrow,
		title,
		description,
		align = "center",
		class: className,
		padded = true,
		children,
	}: {
		hue?: OrbHue;
		as?: "section" | "div" | "article" | "aside";
		eyebrow?: string;
		title?: string;
		description?: string;
		align?: "center" | "left";
		class?: string;
		padded?: boolean;
		children?: Snippet;
	} = $props();
</script>

<svelte:element
	this={Tag}
	class={cn(
		"relative isolate overflow-hidden rounded-3xl border border-hairline-soft bg-canvas-soft",
		padded && "px-8 py-12 sm:px-12 sm:py-16",
		className
	)}
>
	<GradientOrb {hue} size="xl" opacity={0.55} class="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

	<div
		class={cn(
			"relative z-10 mx-auto flex max-w-2xl flex-col gap-4",
			align === "center" ? "items-center text-center" : "items-start text-left"
		)}
	>
		{#if eyebrow}
			<span class="eyebrow text-muted-ink">{eyebrow}</span>
		{/if}
		{#if title}
			<h2 class="display-lg text-ink">{title}</h2>
		{/if}
		{#if description}
			<p class="text-base leading-relaxed text-body">{description}</p>
		{/if}
		{@render children?.()}
	</div>
</svelte:element>
