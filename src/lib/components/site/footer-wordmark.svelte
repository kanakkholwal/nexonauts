<script lang="ts">
// SVG text scales with the viewBox, so the wordmark sits off the type scale
// entirely. Letterforms keep natural width; stretching a short word distorts it.
let { text }: { text: string } = $props();

let x = $state(50);
let y = $state(50);
let on = $state(false);

// A cursor-tracked highlight is motion, so it stays off entirely when reduced.
const reduced =
	typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function track(event: PointerEvent) {
	if (reduced || event.pointerType !== "mouse") return;
	const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
	x = ((event.clientX - rect.left) / rect.width) * 100;
	y = ((event.clientY - rect.top) / rect.height) * 100;
	on = true;
}

const mask = $derived(`radial-gradient(circle 8rem at ${x}% ${y}%, black, transparent)`);
const spotlight = $derived(`opacity:${on ? 1 : 0};mask-image:${mask};-webkit-mask-image:${mask}`);
</script>

<div
	aria-hidden="true"
	class="relative select-none"
	onpointermove={track}
	onpointerleave={() => (on = false)}
>
	<svg viewBox="0 0 1000 190" class="fill-muted block h-auto w-full">
		<text
			x="500"
			y="150"
			text-anchor="middle"
			font-size="200"
			font-weight="500"
			letter-spacing="-8"
			style="font-family: var(--font-heading)">{text}</text
		>
	</svg>

	<div class="absolute inset-0 transition-opacity duration-300" style={spotlight}>
		<svg viewBox="0 0 1000 190" class="fill-primary block h-auto w-full">
			<text
				x="500"
				y="150"
				text-anchor="middle"
				font-size="200"
				font-weight="500"
				letter-spacing="-8"
				style="font-family: var(--font-heading)">{text}</text
			>
		</svg>
	</div>
</div>
