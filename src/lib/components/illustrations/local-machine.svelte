<script lang="ts">
import { cn } from "$lib/utils";
import { createScene } from "./iso";
import "./iso.css";
import Solid from "./solid.svelte";

type Props = { class?: string };
let { class: className }: Props = $props();

const s = createScene();

// The machine: one slab carrying a tile per product, the last in the accent.
const slab = s.box(0, 0, 0, 130, 130, 10);
const TILES = [
	{ x: 16, y: 16, h: 26, accent: false },
	{ x: 68, y: 16, h: 20, accent: false },
	{ x: 16, y: 68, h: 22, accent: false },
	{ x: 68, y: 68, h: 30, accent: true }
];
const tiles = TILES.map((t) => ({ ...t, faces: s.box(t.x, t.y, 10, 34, 34, t.h) }));

// One silhouette, not three stroked circles, or the overlaps read as a Venn diagram.
const CLOUD =
	"M-30 13C-43 13 -45 -4 -33 -9C-35 -25 -12 -32 -1 -19C7 -32 29 -27 27 -10C39 -7 37 13 25 13Z";

const [cx, cy] = s.project([65, 65, 150]);
const vb = s.viewBox(30);
</script>

<svg
	class={cn("iso h-auto w-full", className)}
	viewBox={vb}
	role="img"
	aria-label="Four tools running on one local machine, with the cloud crossed out"
>
	<Solid b={slab} />

	{#each tiles as t (t.x + "-" + t.y)}
		<g class="float" class:float-2={t.x === 68 && t.y === 16} class:float-3={t.accent}>
			<Solid b={t.faces} accent={t.accent} />
		</g>
	{/each}

	<g transform="translate({cx} {cy})">
		<path class="decal-cloud" d={CLOUD} />
		<path class="line" d="M-34 -22L31 17" />
	</g>
</svg>
