<script lang="ts">
import { appConfig } from "@/project.config";
import { Hero, ProductRow } from "$lib/components/home";
import { SiteFrame } from "$lib/components/site";
import { shippedProducts } from "$lib/data/products";

// The three things a first visit has to be told, and the only place the page says them.
const stands = [
	{
		lead: "Free to use today.",
		line: "Some may add a paid tier later. That will be said on the product itself, in plain words, before anything changes."
	},
	{
		lead: "No account to start.",
		line: "The products open and work without a sign-up. Recast has an optional cloud tier with its own account."
	},
	{
		lead: "The source is public.",
		line: "Every product is built in the open. The repositories are on GitHub and the issues are too."
	}
];

const title = "Developer tools that do their work on your machine";
const description =
	"Merge a PDF, record a demo, compile LaTeX, build your docs. Orbit, Recast, Glyphtex and Docvia each run in your browser tab, on your desktop or inside your build. From a small lab called Nexonauts.";

let root: HTMLElement | null = $state(null);

// Motion arrives on idle, after hydration, so the first paint never waits on it.
$effect(() => {
	const el = root;
	if (!el) return;
	let cleanup: (() => void) | undefined;
	let cancelled = false;
	const start = () => {
		import("$lib/motion/home").then(({ mountHomeMotion }) => {
			if (cancelled) return;
			mountHomeMotion(el).then((fn) => {
				if (cancelled) fn();
				else cleanup = fn;
			});
		});
	};
	// A timeout is required: an idle callback with none can be starved for as long
	// as the page stays busy, and the motion would never load at all.
	const idle =
		window.requestIdleCallback?.(start, { timeout: 1500 }) ?? window.setTimeout(start, 200);
	return () => {
		cancelled = true;
		cleanup?.();
		if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
		else window.clearTimeout(idle as number);
	};
});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={appConfig.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={appConfig.url} />
	<meta property="og:image" content="{appConfig.url}/logo-square-with-bg.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{appConfig.url}/logo-square-with-bg.png" />
</svelte:head>

<SiteFrame>
	<div bind:this={root}>
		<Hero />



		<div id="products" aria-labelledby="products-list">
			{#each shippedProducts as product, i (product.slug)}
				<ProductRow {product} index={i} flip={i % 2 === 1} />
			{/each}
		</div>

		<section
			id="stands"
			class="mx-auto flex min-h-[90dvh] w-full max-w-page scroll-mt-20 flex-col justify-center px-4 py-20 sm:px-8 md:py-28 lg:px-10"
			aria-labelledby="stands-title"
		>
			<div class="mb-12 md:mb-16" data-motion="head">
				<h2 id="stands-title" class="text-heading-lg font-medium lg:text-display">
					Where this stands.
				</h2>
			</div>
			<dl class="flex flex-col gap-12 md:gap-16" data-motion="stands">
				{#each stands as item (item.lead)}
					<div class="grid gap-3 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12">
						<dt class="text-subheading font-medium text-balance text-foreground lg:text-heading">
							{item.lead}
						</dt>
						<dd class="max-w-[52ch] text-body-lg text-pretty text-muted-foreground">{item.line}</dd>
					</div>
				{/each}
			</dl>
		</section>

	</div>
</SiteFrame>
