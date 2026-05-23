<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils";

	let {
		as: Tag = "section",
		intensity = "soft",
		padded = true,
		class: className,
		children
	}: {
		as?: "section" | "div" | "header" | "aside";
		intensity?: "soft" | "strong";
		padded?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<!--
	Reusable accent surface — dark background with a single blue radial glow
	and a faint grid overlay. Always renders dark, independent of site theme.
	See DESIGN.md §5.
-->
<svelte:element
	this={Tag}
	class={cn(
		"hero-gradient relative overflow-hidden text-white",
		intensity === "strong" && "hero-gradient--strong",
		padded && "px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28",
		className
	)}
>
	<div class="hero-gradient__grid" aria-hidden="true"></div>
	<div class="hero-gradient__glow" aria-hidden="true"></div>
	<div class="relative z-10 mx-auto w-full max-w-6xl">
		{@render children?.()}
	</div>
</svelte:element>

<style>
	.hero-gradient {
		background: #0a0a0a;
		isolation: isolate;
	}

	.hero-gradient__grid {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image:
			linear-gradient(to right, #ffffff0a 1px, transparent 1px),
			linear-gradient(to bottom, #ffffff0a 1px, transparent 1px);
		background-size: 24px 24px;
		mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%);
	}

	.hero-gradient__glow {
		position: absolute;
		top: 0;
		left: 50%;
		height: 320px;
		width: 700px;
		max-width: 90%;
		transform: translateX(-50%);
		pointer-events: none;
		border-radius: 9999px;
		background: rgba(70, 130, 240, 0.22);
		filter: blur(120px);
	}

	.hero-gradient--strong .hero-gradient__glow {
		height: 500px;
		width: 900px;
		background: rgba(70, 130, 240, 0.32);
		filter: blur(140px);
	}
</style>
