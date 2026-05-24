<script lang="ts" module>
	export type HeroVariant = "editorial" | "dark";
	export type HeroIntensity = "soft" | "strong";
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils";
	import GradientOrb from "./gradient-orb.svelte";

	/**
	 * HeroGradient — atmospheric hero band.
	 *
	 * DESIGN.md §3 `hero-band`. Two flavours:
	 *
	 *   - editorial (default): off-white canvas with multiple pastel orbs
	 *     drifting behind the centered display headline. The signature
	 *     ElevenLabs hero.
	 *   - dark: the rare Agents/CTA-band hero with surface-dark canvas and a
	 *     single muted orb. Used for closing CTA bands.
	 */
	let {
		as: Tag = "section",
		variant = "editorial",
		intensity = "soft",
		padded = true,
		class: className,
		children,
	}: {
		as?: "section" | "div" | "header" | "aside";
		variant?: HeroVariant;
		intensity?: HeroIntensity;
		padded?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();

	const isDark = $derived(variant === "dark");
</script>

<svelte:element
	this={Tag}
	data-variant={variant}
	data-intensity={intensity}
	class={cn(
		"relative isolate overflow-hidden",
		isDark ? "bg-surface-dark text-on-dark" : "bg-canvas text-ink",
		padded && "px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32",
		className
	)}
>
	{#if isDark}
		<!-- Dark hero: faint grid + a single sky orb at top -->
		<div
			aria-hidden="true"
			class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
		></div>
		<GradientOrb
			hue="sky"
			size={intensity === "strong" ? "xl" : "lg"}
			opacity={intensity === "strong" ? 0.32 : 0.22}
			blur={140}
			class="left-1/2 -top-1/4 -translate-x-1/2"
		/>
	{:else}
		<!-- Editorial hero: pastel orbs drifting through the off-white canvas. -->
		<GradientOrb hue="lavender" size="xl" opacity={intensity === "strong" ? 0.55 : 0.4}
			class="-left-1/4 -top-1/4" blur={90} />
		<GradientOrb hue="peach" size="lg" opacity={intensity === "strong" ? 0.55 : 0.4}
			class="-right-1/4 top-1/3" blur={90} />
		<GradientOrb hue="mint" size="md" opacity={intensity === "strong" ? 0.45 : 0.3}
			class="left-1/3 bottom-0" blur={80} />
	{/if}

	<div class="relative z-10 mx-auto w-full max-w-(--max-app-width)">
		{@render children?.()}
	</div>
</svelte:element>
