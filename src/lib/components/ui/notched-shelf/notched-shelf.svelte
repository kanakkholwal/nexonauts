<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "$lib/utils";

type Props = {
	children?: Snippet;
	/** A text colour class. The bar and wings paint in currentColor, so it must match the surface they bridge into. */
	fill?: string;
	/** A border colour class. The hairline along the wing silhouette paints in currentColor, so it must match the surface it sits on. */
	stroke?: string;
	/** Flip the wings upward so the shelf rises from a bottom edge instead of hanging. */
	inverted?: boolean;
	/** Where along the edge the shelf sits. Insets keep a wing off a rounded corner. */
	align?: "start" | "center" | "end";
	/** Continue the hairline along the rest of the edge, so the silhouette does not stop mid-air. */
	edge?: boolean;
	class?: string;
};

let {
	children,
	fill = "text-background",
	stroke = "border-border",
	inverted = false,
	align = "center",
	edge = false,
	class: className
}: Props = $props();

const PLACE = {
	start: "mr-auto ml-6",
	center: "mx-auto",
	end: "ml-auto mr-6"
} as const;

// Ported from Recast's NotchedShelf. The wing is one bezier from the bar into the surface.
const WING =
	"M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z";
// The same curve left open, so a hairline traces the silhouette. Without it the shape
// disappears wherever the fill matches the surface behind it.
const EDGE = "M0 0C13.7915 0 26.6905 7.30481 34 19L50 45C57.3095 56.6952 71.2084 63.9997 85 64";
</script>

{#snippet wing(mirrored: boolean)}
	<svg
		viewBox="0 0 85 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		class={cn(
			"h-full w-auto shrink-0 translate-y-px overflow-visible",
			mirrored ? "-translate-x-px -scale-x-100" : "translate-x-px"
		)}
	>
		<rect x="0" y="0" width="85" height="1" fill="currentColor" transform="translate(0, -1)" />
		<path d={WING} fill="currentColor" />
		<path
			d={EDGE}
			fill="none"
			class={cn(stroke, "stroke-current")}
			stroke-width="1"
			vector-effect="non-scaling-stroke"
		/>
	</svg>
{/snippet}

<div
	class={cn(
		"relative z-10 flex h-11 -translate-y-px items-start justify-center",
		edge ? "w-full" : "w-fit",
		edge ? "" : PLACE[align],
		inverted && "-scale-y-100",
		fill,
		className
	)}
>
	{#if edge}
		<span class="mt-px min-w-0 grow border-t border-border" aria-hidden="true"></span>
	{/if}
	{@render wing(false)}

	<!-- bg-current inherits the shelf fill; the colour reset sits one level in so it cannot repaint the bar. -->
	<div
		class="relative z-10 flex h-[calc(100%+1px)] min-w-0 shrink-0 items-center justify-center bg-current"
	>
		<div class={cn("flex items-center justify-center text-foreground", inverted && "-scale-y-100")}>
			{@render children?.()}
		</div>
	</div>

	{@render wing(true)}
	{#if edge}
		<span class="mt-px min-w-0 grow border-t border-border" aria-hidden="true"></span>
	{/if}
</div>
