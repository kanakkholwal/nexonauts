<script lang="ts" module>
	export type OrbHue = "mint" | "peach" | "lavender" | "sky" | "rose";
	export type OrbSize = "sm" | "md" | "lg" | "xl";
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	/**
	 * GradientOrb — atmospheric pastel bloom.
	 *
	 * Pure decoration per DESIGN.md §3. Never carries content, never becomes a
	 * button fill or text color. Drop one or more inside a `relative` parent —
	 * use absolute positioning props to place.
	 *
	 * Defaults to a slow drift animation; pass `animated={false}` to hold still.
	 */
	let {
		hue = "lavender",
		size = "lg",
		opacity = 0.6,
		blur = 60,
		animated = true,
		class: className,
		style,
	}: {
		hue?: OrbHue;
		size?: OrbSize;
		opacity?: number;
		blur?: number;
		animated?: boolean;
		class?: string;
		style?: string;
	} = $props();

	const sizeMap = {
		sm: "h-40 w-40 sm:h-56 sm:w-56",
		md: "h-72 w-72 sm:h-80 sm:w-80",
		lg: "h-96 w-96 sm:h-[28rem] sm:w-[28rem]",
		xl: "h-[28rem] w-[28rem] sm:h-[36rem] sm:w-[36rem]",
	};

	const hueMap: Record<OrbHue, string> = {
		mint: "orb-mint",
		peach: "orb-peach",
		lavender: "orb-lavender",
		sky: "orb-sky",
		rose: "orb-rose",
	};
</script>

<div
	aria-hidden="true"
	class={cn(
		"orb pointer-events-none absolute",
		hueMap[hue],
		sizeMap[size],
		animated && "animate-[var(--animate-orb-drift)]",
		className
	)}
	style="opacity:{opacity};filter:blur({blur}px);{style ?? ''}"
></div>
