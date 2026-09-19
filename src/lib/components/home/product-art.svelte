<script lang="ts">
import type { ProductSlug } from "$lib/data/products";
import { cn } from "$lib/utils";

type Props = { slug: ProductSlug; class?: string; title?: string };
let { slug, class: className, title }: Props = $props();

// Gradient ids must be unique: the same drawing renders in the strip and the row.
const uid = $props.id();

const pages = [2, 1, 0];
const codeLines = [64, 80, 52, 72, 40, 60];
const codeTops = [62, 76, 90, 104, 118, 132];
const mdLines = [58, 44, 58, 34, 50];
const mdTops = [62, 76, 90, 104, 118];
const moduleTops = [34, 74, 114];
const moduleMarks = [34, 48, 26];
const navRows = [44, 62, 80, 98];
const swatches = [0, 1, 2, 3, 4, 5];
const tokens = [0, 1, 2];
</script>

<!-- Duotone drawings of what each product does: a quiet neutral frame, violet on the
     thing the product acts on. data-loop marks what src/lib/motion/product-loops.ts drives. -->
<svg
	viewBox="0 0 320 180"
	class={cn("art", className)}
	role={title ? "img" : undefined}
	aria-hidden={title ? undefined : "true"}
	data-art={slug}
	style:--grad-plate="url(#plate-{uid})"
	style:--grad-acc="url(#acc-{uid})"
	style:--grad-acc-soft="url(#accsoft-{uid})"
>
	{#if title}<title>{title}</title>{/if}
	<defs>
		<linearGradient id="plate-{uid}" x1="0" y1="0" x2="0.35" y2="1">
			<stop offset="0" stop-color="var(--plate-a)" />
			<stop offset="1" stop-color="var(--plate-b)" />
		</linearGradient>
		<linearGradient id="acc-{uid}" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="var(--acc-a)" />
			<stop offset="1" stop-color="var(--acc-b)" />
		</linearGradient>
		<linearGradient id="accsoft-{uid}" x1="0" y1="0" x2="0.4" y2="1">
			<stop offset="0" stop-color="var(--acc-soft-a)" />
			<stop offset="1" stop-color="var(--acc-soft-b)" />
		</linearGradient>
	</defs>

	{#if slug === "orbit"}
		<!-- Three pages merge into one signed document. -->
		{#each pages as i (i)}
			<g
				class="pg"
				data-loop="page"
				data-i={i}
				transform="translate({22 + (2 - i) * 12},{50 - (2 - i) * 8})"
			>
				<rect x="4" y="4" width="60" height="82" rx="7" class="lift" />
				<!-- Opaque under-layer: without it the three translucent plates compound to mud. -->
				<rect width="60" height="82" rx="7" class="surface" />
				<rect width="60" height="82" rx="7" class="plate e draw" pathLength="1" />
				<rect x="11" y="12" width="24" height="6" rx="3" class={i === 0 ? "acc" : "bar"} />
				<rect x="11" y="26" width="38" height="3.5" rx="1.75" class="bar" />
				<rect x="11" y="35" width="38" height="3.5" rx="1.75" class="bar" />
				<rect x="11" y="44" width="26" height="3.5" rx="1.75" class="bar" />
			</g>
		{/each}

		<path d="M124 84h30" class="la dash" data-loop="flow" />
		<path d="M152 78l7 6-7 6" class="la" />

		<rect x="186" y="32" width="104" height="122" rx="9" class="lift" />
		<rect x="182" y="28" width="104" height="122" rx="9" class="plate e draw" pathLength="1" />
		<rect x="196" y="44" width="46" height="7" rx="3.5" class="acc" />
		<rect x="196" y="61" width="76" height="4" rx="2" class="bar" />
		<rect x="196" y="73" width="76" height="4" rx="2" class="bar" />
		<rect x="196" y="85" width="56" height="4" rx="2" class="bar" />
		<rect x="196" y="100" width="76" height="30" rx="6" class="acc-soft" />
		<path
			d="M202 122c6-11 9 5 15-5s9 7 15-3 8 5 13 1"
			class="la draw"
			pathLength="1"
			data-loop="sign"
		/>
		<g data-loop="seal">
			<circle cx="276" cy="138" r="9" class="acc" />
			<path d="M272.2 138l2.8 3 5-5.8" class="on-acc" />
		</g>
	{:else if slug === "recast"}
		<!-- A window being recorded: the zoom frame chases the cursor, the timeline cuts silence. -->
		<rect x="28" y="26" width="268" height="108" rx="10" class="lift" />
		<rect x="24" y="22" width="268" height="108" rx="10" class="plate e draw" pathLength="1" />
		<path d="M24 46h268" class="e draw" pathLength="1" />
		<circle cx="40" cy="34" r="3" class="bar" />
		<circle cx="50" cy="34" r="3" class="bar" />
		<circle cx="60" cy="34" r="3" class="bar" />
		<circle cx="276" cy="34" r="4.5" class="acc" data-loop="rec" />

		<rect x="44" y="62" width="84" height="6" rx="3" class="acc-mid" />
		<rect x="44" y="78" width="158" height="6" rx="3" class="bar" />
		<rect x="44" y="94" width="96" height="6" rx="3" class="bar" />
		<rect x="44" y="110" width="136" height="6" rx="3" class="bar" />

		<g data-loop="zoom">
			<rect x="66" y="58" width="88" height="56" rx="7" class="acc-soft" />
			<rect x="66" y="58" width="88" height="56" rx="7" class="la" />
			<path d="M66 70v-6a6 6 0 016-6h6M154 102v6a6 6 0 01-6 6h-6" class="la thick" />
		</g>
		<path
			d="M150 80v17l4.4-4.4 3.2 7.4 3.4-1.6-3.4-7.2 6.4-0.6z"
			class="fk"
			data-loop="cursor"
		/>

		<rect x="24" y="146" width="268" height="20" rx="7" class="plate e draw" pathLength="1" />
		<rect x="30" y="151" width="102" height="10" rx="4" class="acc" data-loop="clip-a" />
		<rect x="138" y="151" width="26" height="10" rx="4" class="bar" data-loop="silence" />
		<rect x="170" y="151" width="116" height="10" rx="4" class="acc" data-loop="clip-b" />
		<rect x="40" y="141" width="2.5" height="30" rx="1.25" class="fk" data-loop="playhead" />
	{:else if slug === "glyphtex"}
		<!-- One tab: source on the left, and what it compiles to on the right. -->
		<rect x="16" y="24" width="288" height="134" rx="10" class="lift" />
		<rect x="12" y="20" width="288" height="134" rx="10" class="plate e draw" pathLength="1" />
		<path d="M12 44h288" class="e draw" pathLength="1" />
		<rect x="26" y="28" width="58" height="8" rx="4" class="acc" />
		<rect x="92" y="28" width="44" height="8" rx="4" class="bar" />
		<path d="M164 44v110" class="e draw" pathLength="1" />

		{#each codeTops as y, i (y)}
			<rect x="26" y={y + 1} width="6" height="3" rx="1.5" class="bar" />
			<rect
				x="42"
				y={y}
				width={codeLines[i]}
				height="5"
				rx="2.5"
				class={i % 3 === 0 ? "acc-mid" : "bar"}
				data-loop="code"
			/>
		{/each}
		<rect x="110" y="130" width="2.5" height="9" rx="1" class="acc" data-loop="caret" />

		<g data-loop="typeset">
			<text x="180" y="122" class="big">&#8747;</text>
			<text x="204" y="80" class="sup">1</text>
			<text x="204" y="142" class="sup">0</text>
			<rect x="222" y="98" width="38" height="2.5" rx="1.25" class="fk" />
			<text x="228" y="92" class="sup">x&#178;</text>
			<text x="224" y="118" class="sup">1+x</text>
			<rect x="268" y="96" width="18" height="5" rx="2.5" class="acc" />
		</g>
	{:else if slug === "docvia"}
		<!-- Markdown goes through the build step and comes out as modules per framework. -->
		<rect x="22" y="36" width="90" height="112" rx="9" class="lift" />
		<rect x="18" y="32" width="90" height="112" rx="9" class="plate e draw" pathLength="1" />
		<rect x="26" y="59" width="74" height="12" rx="4" class="acc-soft" data-loop="scan" />
		<rect x="30" y="44" width="32" height="8" rx="4" class="acc" />
		{#each mdTops as y, i (y)}
			<rect x="30" y={y} width={mdLines[i]} height="4" rx="2" class="bar" />
		{/each}

		<path d="M116 90h20" class="la dash" data-loop="flow" />
		<rect x="142" y="72" width="38" height="36" rx="12" class="acc-soft" />
		<rect x="142" y="72" width="38" height="36" rx="12" class="la draw" pathLength="1" />
		<g data-loop="build">
			<circle cx="153" cy="90" r="2.8" class="acc" />
			<circle cx="161" cy="90" r="2.8" class="acc" />
			<circle cx="169" cy="90" r="2.8" class="acc" />
		</g>
		<path d="M186 90h18" class="la dash" data-loop="flow" />

		{#each moduleTops as y, i (y)}
			<rect x="214" y={y + 3} width="90" height="32" rx="7" class="lift" />
			<rect x="210" y={y} width="90" height="32" rx="7" class="plate e draw" pathLength="1" />
			<rect x="210" y={y} width="5" height="32" rx="2.5" class="acc" data-loop="module" data-i={i} />
			<rect x="226" y={y + 9} width={moduleMarks[i]} height="5" rx="2.5" class="acc-mid" />
			<rect x="226" y={y + 19} width="54" height="4" rx="2" class="bar" />
		{/each}
		{#each tokens as i (i)}
			<rect x="106" y="86" width="9" height="9" rx="2.5" class="acc" data-loop="token" data-i={i} />
		{/each}
	{:else}
		<!-- A design system read back: pick a section, the tokens and the spec fill in. -->
		<rect x="30" y="28" width="264" height="128" rx="10" class="lift" />
		<rect x="26" y="24" width="264" height="128" rx="10" class="plate e draw" pathLength="1" />
		<path d="M98 24v128" class="e draw" pathLength="1" />
		<rect x="32" y="38" width="60" height="16" rx="6" class="acc-soft" data-loop="nav" />
		{#each navRows as y, i (y)}
			<rect x="40" y={y} width="44" height="5" rx="2.5" class={i === 0 ? "acc-mid" : "bar"} />
		{/each}
		{#each swatches as i (i)}
			<rect
				x={112 + (i % 3) * 58}
				y={40 + Math.floor(i / 3) * 44}
				width="46"
				height="34"
				rx="7"
				class={i % 2 === 0 ? "acc" : "plate e"}
				data-loop="swatch"
				data-i={i}
			/>
		{/each}
		<rect x="112" y="132" width="118" height="5" rx="2.5" class="bar" />
	{/if}
</svg>

<style>
	.art {
		display: block;
		width: 100%;
		height: 100%;
		fill: none;
		stroke: none;
		stroke-width: 1.25;
		stroke-linecap: round;
		stroke-linejoin: round;
		overflow: visible;

		/* Narrow neutral range so the greys read as one material, not as steps. */
		--plate-a: color-mix(in srgb, var(--foreground) 11%, transparent);
		--plate-b: color-mix(in srgb, var(--foreground) 4%, transparent);
		--acc-a: var(--primary);
		--acc-b: color-mix(in srgb, var(--primary) 58%, transparent);
		--acc-soft-a: color-mix(in srgb, var(--primary) 28%, transparent);
		--acc-soft-b: color-mix(in srgb, var(--primary) 9%, transparent);
		--ink-soft: color-mix(in srgb, var(--foreground) 15%, transparent);
		--lift: color-mix(in srgb, var(--foreground) 5%, transparent);
	}
	.plate {
		fill: var(--grad-plate);
	}
	/* The surface the drawing sits on. A call site on a different surface overrides it. */
	.surface {
		fill: var(--art-surface, var(--card));
	}
	/* The offset copy behind a plate: depth without a shadow. */
	.lift {
		fill: var(--lift);
	}
	.bar {
		fill: var(--ink-soft);
	}
	.fk {
		fill: var(--foreground);
	}
	.acc {
		fill: var(--grad-acc);
	}
	.acc-mid {
		fill: color-mix(in srgb, var(--primary) 46%, transparent);
	}
	.acc-soft {
		fill: var(--grad-acc-soft);
	}
	.e {
		stroke: var(--border-strong);
	}
	.la {
		stroke: var(--primary);
	}
	.thick {
		stroke-width: 2;
	}
	.on-acc {
		stroke: var(--primary-foreground);
		stroke-width: 1.8;
	}
	.dash {
		stroke-dasharray: 6 5;
	}
	text {
		fill: var(--foreground);
		font-family: var(--font-heading);
	}
	.big {
		font-size: 66px;
	}
	.sup {
		font-size: 15px;
	}
</style>
