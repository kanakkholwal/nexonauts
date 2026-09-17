<script lang="ts">
type Product = {
	name: string;
	kind: string;
	where: string;
	status: string;
	licence: string;
	href?: string;
};

type Props = { products: Product[] };
let { products }: Props = $props();

let active = $state(0);
const current = $derived(products[active] ?? products[0]);
const detail = (p: Product) => `${p.kind} · ${p.where} · ${p.status} · ${p.licence}`;
</script>

<div>
	<!-- Poster scale, and the run is one sentence: a comma between names and a
	     full stop at the end, so it reads rather than scans as a list. -->
	<p class="text-poster text-foreground font-medium tracking-tight">
		{#each products as product, i (product.name)}
			{#if product.href}
				<a
					href={product.href}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-primary focus-visible:ring-ring focus-visible:text-primary rounded-sm underline-offset-[0.12em] hover:underline focus-visible:ring-2 focus-visible:outline-none"
					onmouseenter={() => {
						active = i;
					}}
					onfocus={() => {
						active = i;
					}}
				>
					{product.name}<span class="sr-only">, {detail(product)}</span>
				</a>
			{:else}
				<!-- No link and no hover: there is nothing to open yet, so the name
				     states itself and the detail rides along for screen readers. -->
				<span class="text-muted-foreground">
					{product.name}<span class="sr-only">, {detail(product)}</span>
				</span>
			{/if}{i === products.length - 1 ? "." : ", "}
		{/each}
	</p>

	<!-- The visual echo of what the links already say, so it is hidden from
	     assistive tech instead of read twice. -->
	<p
		aria-hidden="true"
		class="text-body-sm text-muted-foreground border-border mt-10 border-t pt-4 font-mono"
	>
		<span class="text-foreground font-medium">{current.name}</span>
		<span class="text-border-strong mx-2">/</span>{detail(current)}
	</p>
</div>
