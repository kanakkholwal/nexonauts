<script lang="ts">
import type { Product } from "$lib/data/products";
import ProductArt from "./product-art.svelte";

type Props = { products: Product[] };
let { products }: Props = $props();
</script>

<!-- Four tiles that act as anchors to their rows. The CSS draws each glyph on
     first paint; below the fold GSAP takes over. -->
<div class="mx-auto w-full max-w-page px-4 sm:px-8 lg:px-10" data-motion="strip">
	<ul class="grid grid-cols-2 gap-3 md:grid-cols-4">
		{#each products as product (product.slug)}
			<li class="tile">
				<a
					href="#row-{product.slug}"
					class="group block overflow-clip rounded-card border border-border bg-card transition-[transform,border-color] duration-(--duration-ui) ease-(--ease-out) hover:border-border-control focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-safe:hover:-translate-y-0.5"
				>
					<div class="art-well aspect-[16/10] bg-muted p-[9%]">
						<ProductArt slug={product.slug} />
					</div>
					<div class="flex items-baseline justify-between gap-3 px-4 py-3">
						<span class="font-heading text-body font-medium text-foreground">{product.name}</span>
						<span class="truncate text-caption text-muted-foreground">{product.kind}</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
	<hr class="mt-12 border-0 border-t border-border" />
</div>

<style>
	@media (prefers-reduced-motion: no-preference) {
		.tile {
			transition:
				opacity var(--duration-enter) var(--ease-out),
				transform var(--duration-enter) var(--ease-out);
			transition-delay: calc(300ms + 60ms * var(--i));
		}
		.tile:nth-child(1) {
			--i: 0;
		}
		.tile:nth-child(2) {
			--i: 1;
		}
		.tile:nth-child(3) {
			--i: 2;
		}
		.tile:nth-child(4) {
			--i: 3;
		}
		/* Strokes draw themselves over 900ms; pathLength="1" makes the offset unitless. */
		.art-well :global(.draw) {
			stroke-dasharray: 1;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 900ms var(--ease-out);
			transition-delay: calc(450ms + 60ms * var(--i));
		}
		@starting-style {
			.tile {
				opacity: 0;
				transform: translateY(24px) scale(0.985);
			}
			.art-well :global(.draw) {
				stroke-dashoffset: 1;
			}
		}
	}
</style>
