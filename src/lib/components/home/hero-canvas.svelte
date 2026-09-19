<script lang="ts">
import { shippedProducts } from "$lib/data/products";
import ProductArt from "./product-art.svelte";

// Doubled so a -50% translate loops seamlessly, and the second column starts
// mid-set so the same product never sits beside itself.
const rotated = [...shippedProducts.slice(2), ...shippedProducts.slice(0, 2)];
const columns = [
	{ items: [...shippedProducts, ...shippedProducts], duration: "46s" },
	{ items: [...rotated, ...rotated], duration: "58s" }
];
</script>

<!-- What the lab makes, drifting. Real drawings, no invented screenshots, and decorative:
     the same products are named in text a screen below. -->
<div class="canvas" aria-hidden="true" data-motion="hero-canvas">
	{#each columns as column, i (i)}
		<div class="col" class:reverse={i === 1} style:--dur={column.duration}>
			{#each column.items as product, j (product.slug + j)}
				<figure class="card">
					<div class="well">
						<ProductArt slug={product.slug} />
					</div>
					<figcaption class="cap">
						<span class="name">{product.name}</span>
						<span class="kind">{product.kind}</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	{/each}
</div>

<style>
	.canvas {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		height: 72dvh;
		max-height: 44rem;
		overflow: hidden;
		/* Fades into the band instead of ending on a hard edge. */
		mask-image: linear-gradient(
			to bottom,
			transparent,
			black 14%,
			black 86%,
			transparent
		);
		will-change: transform;
	}
	@media (min-width: 1024px) {
		.canvas {
			grid-template-columns: 1fr 1fr;
			gap: 1.25rem;
		}
	}
	.col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	@media (min-width: 1024px) {
		.col {
			gap: 1.25rem;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.col {
			animation: drift var(--dur) linear infinite;
		}
		.reverse {
			animation-direction: reverse;
		}
	}
	@keyframes drift {
		to {
			transform: translateY(-50%);
		}
	}
	/* The second column only exists to fill the far half, so it goes first when there is one. */
	.reverse {
		display: none;
	}
	@media (min-width: 1024px) {
		.reverse {
			display: flex;
		}
	}
	.card {
		flex: none;
		overflow: clip;
		border: 1px solid var(--border);
		border-radius: var(--radius-card);
		background: var(--card);
	}
	.well {
		aspect-ratio: 16 / 10;
		padding: 6%;
	}
	.cap {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.625rem 0.875rem 0.75rem;
	}
	.name {
		font-family: var(--font-heading);
		font-size: var(--text-body-sm);
		font-weight: 500;
		color: var(--foreground);
	}
	.kind {
		font-size: var(--text-caption);
		color: var(--muted-foreground);
	}
</style>
