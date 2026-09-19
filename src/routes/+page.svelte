<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import { appConfig } from "@/project.config";
import {
	ClosingField,
	FaqRegister,
	HeroStage,
	NameRun,
	SectionHead
} from "$lib/components/home";
import { SiteFrame } from "$lib/components/site";
import { Button } from "$lib/components/ui/button";
import { products } from "$lib/data/products";
import { revealOnView } from "$lib/motion/enter";

// Given away without being sold: they belong in a footnote, not a section.
const packages = [
	{ name: "nexo-mdx", href: "https://www.npmjs.com/package/nexo-mdx" },
	{ name: "nexo-editor", href: "https://www.npmjs.com/package/nexo-editor" },
	{ name: "pdf-tables-parser", href: "https://www.npmjs.com/package/pdf-tables-parser" },
	{ name: "custom-domain-sdk", href: "https://www.npmjs.com/package/custom-domain-sdk" }
];

const faqs = [
	{
		q: "What is Nexonauts, exactly?",
		a: "An umbrella for a set of developer tools. Each has its own home, repository and release cycle. This site is where they meet."
	},
	{
		q: "What does running locally actually mean here?",
		a: "Orbit and Glyphtex work inside your browser tab, Recast in a desktop app. Nothing has to be uploaded first."
	},
	{
		q: "Is everything open source?",
		a: "Every published repository is public, but licences differ. Recast is GPLv3 and Docvia is MIT, so check the one you want to build on."
	},
	{
		q: "Do I need a Nexonauts account?",
		a: "No. There is no shared login. Recast has an optional cloud tier with its own signup, and that is the only one."
	},
	{
		q: "How finished are these?",
		a: "Orbit and Docvia are stable. Recast is stable on Windows, beta elsewhere. Glyphtex is newest and moves fastest. Specimen is still in development and has nothing to open yet."
	},
	{
		q: "How do I report a bug or ask for a feature?",
		a: "Open an issue on that product's own repository. Each is linked from its site and read by the person who wrote it."
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

const title = "Nexonauts · Developer tools that run on your machine";
const description =
	"An umbrella for a small set of developer tools that do their work locally. Orbit for PDFs, Recast for screen recording, Glyphtex for LaTeX, Docvia for documentation.";
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

<SiteFrame rails={false} class="bg-background">
	<HeroStage />

	<section
		id="products"
		class="mx-auto w-full max-w-7xl scroll-mt-24 overflow-hidden px-6 py-20 sm:px-10 lg:py-28"
	>
		<div use:revealOnView>
			<SectionHead
				index="01"
				label="Products"
				title="Each one is its own thing."
				description="Separate homes, separate repositories, separate release cycles. Status and licence are stated per product, because they differ."
			/>
		</div>
		<div class="drift-x mt-14">
			<NameRun {products} />
		</div>
	</section>

	<section id="faq" class="mx-auto w-full max-w-7xl scroll-mt-24 px-6 pb-20 sm:px-10 lg:pb-28">
		<div use:revealOnView>
			<SectionHead index="02" label="Questions" title="Answered plainly." />
		</div>
		<div class="mt-10">
			<FaqRegister items={faqs} />
		</div>
	</section>

	<ClosingField
		title="Open something and start."
		body="No account, no upload, no trial. Everything here opens and runs straight away."
	>
		{#snippet actions()}
			<Button href="/dev-tools" variant="light" size="lg">Browse the tools</Button>
			<Button
				href={appConfig.githubRepo}
				variant="ink"
				size="lg"
				target="_blank"
				rel="noopener noreferrer"
			>
				<IconBrandGithub class="size-4" aria-hidden="true" />
				GitHub
			</Button>
		{/snippet}
	</ClosingField>

	<div class="border-border border-t">
		<p
			class="text-caption text-muted-foreground mx-auto max-w-7xl px-6 py-6 font-mono sm:px-10"
		>
			Also given away:
			{#each packages as pkg, i (pkg.name)}
				<a
					href={pkg.href}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-primary focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
				>
					{pkg.name}
				</a>{i === packages.length - 1 ? "." : ", "}
			{/each}
		</p>
	</div>
</SiteFrame>
