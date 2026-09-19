<script lang="ts">
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import { appConfig } from "@/project.config";
import { Faq, Hero, LinkCards, ProductRow } from "$lib/components/home";
import { SiteFrame } from "$lib/components/site";
import { Button } from "$lib/components/ui/button";
import { products, shippedProducts } from "$lib/data/products";

const specimen = products.find((p) => p.slug === "specimen");

const beyond = [
	{ title: "Learn", line: "Lessons by example, currently Go and TypeScript.", href: "/learn" },
	{ title: "Tools", line: "Small utilities that run in the tab.", href: "/dev-tools" },
	{
		title: "Docs",
		line: "Package references and architecture notes.",
		href: "https://docs.nexonauts.com",
		external: true
	}
];

const facts = [
	{
		title: "Runs where you work.",
		text: "The browser tools do their work inside the tab and Recast runs on your desktop. Files stay where you opened them."
	},
	{
		title: "No account to start.",
		text: "The products open without a sign-up. Recast has an optional cloud tier with its own account."
	},
	{
		title: "Source you can read.",
		text: "Each product has a public repository on GitHub, linked from its row."
	}
];

const faqs = [
	{
		q: "Is it free?",
		a: "The products are free to use today. Some may add paid versions or tiers later; that will be stated on the product, not hidden here."
	},
	{
		q: "Do I need an account?",
		a: "Not to use the products. Recast has an optional cloud tier with its own sign-up."
	},
	{
		q: "Can I read the source?",
		a: "Yes. Each product has a public repository on GitHub, linked from its row above."
	},
	{
		q: "How finished are these?",
		a: "Orbit and Docvia are stable. Recast is stable on Windows and beta elsewhere. Glyphtex is the newest and changes most. Specimen is in development."
	},
	{
		q: "What is Nexonauts?",
		a: "A small lab that makes developer tools. Orbit, Recast, Glyphtex and Docvia each have their own site and repository. This site is where they meet, along with the guides."
	}
];

const faqSchema = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: { "@type": "Answer", text: f.a }
	}))
});

const title = "Nexonauts makes developer tools";
const description =
	"Nexonauts is a small lab that makes developer tools: Orbit, Recast, Glyphtex and Docvia. It also publishes guides on what it learns while building them.";

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
	{@html `<script type="application/ld+json">${faqSchema}<\/script>`}
</svelte:head>

<SiteFrame>
	<div bind:this={root}>
		<Hero />

		<!-- Signpost. Tinted so the hero and this read as the opening, and so chapter one has
		     a surface to notch out of. -->
		<section
			id="products"
			class="scroll-mt-20 bg-muted"
			aria-labelledby="products-title"
			data-motion="signpost"
		>
			<div class="mx-auto w-full max-w-page px-5 py-16 sm:px-10 md:py-20 lg:px-14">
				<span
					class="block h-px w-full origin-left bg-border"
					data-motion="rule"
					aria-hidden="true"
				></span>
				<div
					class="mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
					data-motion="head"
				>
					<h2 id="products-title" class="text-heading-lg font-medium lg:text-display">
						The products.
					</h2>
					<p class="max-w-[42ch] text-body-lg text-pretty text-muted-foreground">
						One screen each, in the order they get used. Every one has its own site and repository.
					</p>
				</div>
			</div>
		</section>

		<div>
			{#each shippedProducts as product, i (product.slug)}
				<ProductRow {product} index={i} flip={i % 2 === 1} />
			{/each}
		</div>

		{#if specimen}
			<p
				class="mx-auto w-full max-w-page px-4 py-8 font-mono text-caption tracking-wider text-muted-foreground uppercase sm:px-8 lg:px-10"
			>
				{specimen.name}, a {specimen.category.toLowerCase()}, is {specimen.status.toLowerCase()}.
			</p>
		{/if}

		<!-- No seam and no frame past here: the notch belongs to the product chapters. -->
		<section
			class="mx-auto flex min-h-[90dvh] w-full max-w-page flex-col justify-center px-4 py-24 sm:px-8 md:py-28 lg:px-10"
			aria-labelledby="beyond-title"
			data-motion="beyond"
		>
			<div class="max-w-[62ch]" data-motion="head">
				<h2 id="beyond-title" class="text-heading-lg font-medium lg:text-display">
					Beyond the products.
				</h2>
				<p class="mt-4 text-body-lg text-pretty text-muted-foreground">
					Nexonauts also publishes short lessons and guides written while building these, keeps a set
					of small browser utilities, and documents its packages. Longer term it is exploring AI
					tooling for developers and learning that goes beyond code.
				</p>
			</div>
			<div class="mt-14 md:mt-20">
				<LinkCards cards={beyond} />
			</div>
		</section>

		<section
			class="mx-auto flex min-h-[80dvh] w-full max-w-page flex-col justify-center px-4 py-20 sm:px-8 md:py-28 lg:px-10"
			aria-labelledby="how-title"
		>
			<h2 id="how-title" class="sr-only">How it works</h2>
			<dl class="grid gap-12 md:grid-cols-3 md:gap-10" data-motion="facts">
				{#each facts as fact (fact.title)}
					<div>
						<span
							class="block h-px w-full origin-left bg-border"
							data-motion="fact-rule"
							aria-hidden="true"
						></span>
						<dt class="mt-6 text-subheading font-medium text-foreground lg:text-heading">
							{fact.title}
						</dt>
						<dd class="mt-3 max-w-[38ch] text-body text-pretty text-muted-foreground">{fact.text}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<section
			id="faq"
			class="mx-auto flex min-h-[90dvh] w-full max-w-page scroll-mt-20 flex-col justify-center px-4 py-20 sm:px-8 md:py-28 lg:px-10"
			aria-labelledby="faq-title"
		>
			<div class="mb-10" data-motion="head">
				<h2 id="faq-title" class="text-heading-lg font-medium lg:text-display">Questions.</h2>
			</div>
			<Faq items={faqs} />
		</section>

		<!-- Stays on the page surface: the footer notch has to rise into something it is not. -->
		<section
			class="mx-auto flex min-h-[60dvh] w-full max-w-page flex-col items-center justify-center px-4 py-24 text-center sm:px-8 md:py-32 lg:px-10"
			aria-labelledby="closing-title"
			data-motion="closing"
		>
			<h2
				id="closing-title"
				class="max-w-[16ch] text-display font-medium text-balance lg:text-display-xl"
				data-motion="closing-line"
			>
				Start with a product.
			</h2>
			<p class="mt-5 max-w-[44ch] text-body-lg text-pretty text-muted-foreground">
				Orbit opens in the browser and needs no install.
			</p>
			<div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
				<Button href="https://orbit.nexonauts.com" target="_blank" rel="noopener noreferrer" size="lg">
					Open Orbit
				</Button>
				<a
					href={appConfig.githubRepo}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-11 items-center justify-center gap-1 rounded-md text-body-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					GitHub
					<IconChevronRight class="size-4" aria-hidden="true" />
				</a>
			</div>
		</section>
	</div>
</SiteFrame>
