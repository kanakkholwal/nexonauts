<script lang="ts">
import type { ProductSlug } from "$lib/data/products";
import { cn } from "$lib/utils";

type Props = { slug: ProductSlug; class?: string; title?: string };
let { slug, class: className, title }: Props = $props();
</script>

<!-- Line drawings of what each product does. Every stroke carries pathLength="1"
     so CSS can draw it with a dashoffset and GSAP can scrub it with DrawSVG. -->
<svg
	viewBox="0 0 320 180"
	class={cn("art", className)}
	role={title ? "img" : undefined}
	aria-hidden={title ? undefined : "true"}
	data-art={slug}
>
	{#if title}<title>{title}</title>{/if}
	{#if slug === "orbit"}
		<rect x="34" y="58" width="64" height="86" rx="6" class="soft draw" pathLength="1" />
		<rect x="52" y="46" width="64" height="86" rx="6" class="soft draw" pathLength="1" />
		<rect x="70" y="34" width="64" height="86" rx="6" class="draw" pathLength="1" />
		<path d="M84 56h36M84 70h36M84 84h22" class="draw" pathLength="1" />
		<path d="M154 88h40" class="acc-stroke draw" pathLength="1" />
		<path d="M188 80l8 8-8 8" class="acc-stroke draw" pathLength="1" />
		<rect x="216" y="34" width="70" height="112" rx="6" class="draw" pathLength="1" />
		<path d="M232 58h38M232 72h38M232 86h38M232 100h38M232 114h22" class="draw" pathLength="1" />
		<circle cx="272" cy="126" r="4" class="acc-fill acc" />
	{:else if slug === "recast"}
		<rect x="40" y="24" width="240" height="104" rx="8" class="draw" pathLength="1" />
		<path d="M40 46h240" class="draw" pathLength="1" />
		<circle cx="54" cy="35" r="3" class="soft draw" pathLength="1" />
		<circle cx="64" cy="35" r="3" class="soft draw" pathLength="1" />
		<circle cx="74" cy="35" r="3" class="soft draw" pathLength="1" />
		<circle cx="262" cy="35" r="4" class="acc-fill acc" />
		<path d="M60 70h90M60 86h120M60 102h70" class="soft draw" pathLength="1" />
		<path d="M196 84l16 34 6-12 12-6z" class="draw" pathLength="1" />
		<rect x="40" y="144" width="240" height="14" rx="4" class="draw" pathLength="1" />
		<rect x="40" y="144" width="96" height="14" rx="4" class="acc-fill acc" />
		<path d="M136 138v26" class="acc-stroke acc" />
	{:else if slug === "glyphtex"}
		<rect x="24" y="30" width="128" height="120" rx="8" class="draw" pathLength="1" />
		<text x="40" y="66" class="mono">\int_0^1</text>
		<text x="40" y="90" class="mono">\frac&#123;x^2&#125;</text>
		<text x="40" y="114" class="mono">&#123;1+x&#125;dx</text>
		<path d="M164 90h24" class="acc-stroke draw" pathLength="1" />
		<path d="M182 82l8 8-8 8" class="acc-stroke draw" pathLength="1" />
		<text x="206" y="112" class="big">&#8747;</text>
		<text x="240" y="74" class="head">1</text>
		<text x="240" y="132" class="head">0</text>
		<path d="M262 92h30" class="draw" pathLength="1" />
		<text x="266" y="86" class="head-sm">x&#178;</text>
		<text x="264" y="110" class="head-sm">1+x</text>
	{:else if slug === "docvia"}
		<rect x="30" y="34" width="100" height="112" rx="8" class="draw" pathLength="1" />
		<text x="46" y="62" class="mono"># Guide</text>
		<path d="M46 78h60M46 92h48M46 106h60M46 120h36" class="soft draw" pathLength="1" />
		<path d="M146 90h28" class="acc-stroke draw" pathLength="1" />
		<path d="M168 82l8 8-8 8" class="acc-stroke draw" pathLength="1" />
		<rect x="190" y="34" width="100" height="112" rx="8" class="draw" pathLength="1" />
		<path d="M190 58h100" class="draw" pathLength="1" />
		<path d="M204 76h30M204 90h30M204 104h30" class="soft draw" pathLength="1" />
		<path d="M244 62v84" class="soft draw" pathLength="1" />
		<path d="M256 78h24M256 92h24M256 106h16" class="draw" pathLength="1" />
		<rect x="204" y="72" width="30" height="8" rx="2" class="acc-fill acc" />
	{:else}
		<rect x="44" y="28" width="232" height="124" rx="8" class="draw" pathLength="1" />
		<path d="M44 56h232" class="draw" pathLength="1" />
		<rect x="60" y="70" width="40" height="28" rx="4" class="acc-fill acc" />
		<rect x="108" y="70" width="40" height="28" rx="4" class="soft draw" pathLength="1" />
		<rect x="156" y="70" width="40" height="28" rx="4" class="soft draw" pathLength="1" />
		<path d="M60 136h120" class="soft draw" pathLength="1" />
	{/if}
</svg>

<style>
	.art {
		display: block;
		width: 100%;
		height: 100%;
		fill: none;
		stroke: var(--foreground);
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		overflow: visible;
	}
	.soft {
		stroke: var(--border-strong);
	}
	.acc-stroke {
		stroke: var(--primary);
	}
	.acc-fill {
		fill: var(--primary);
		stroke: none;
	}
	text {
		fill: var(--foreground);
		stroke: none;
		font-family: var(--font-mono);
		font-size: 13px;
	}
	.big {
		font-family: var(--font-heading);
		font-size: 64px;
	}
	.head {
		font-family: var(--font-heading);
		font-size: 15px;
	}
	.head-sm {
		font-family: var(--font-heading);
		font-size: 16px;
	}
</style>
