<script lang="ts">
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconCpu from "@tabler/icons-svelte/icons/cpu";
import IconFolderOpen from "@tabler/icons-svelte/icons/folder-open";
import IconShieldCheck from "@tabler/icons-svelte/icons/shield-check";
import { appConfig } from "@/project.config";
import { HeroSection, ProductGrid, ToolFinder, WritingGrid } from "$lib/components/landing";
import {
	BrandPanel,
	FaqList,
	RailFrame,
	RailRow,
	SectionHeader,
	SplitSection
} from "$lib/components/site";
import { Button } from "$lib/components/ui/button";
import { enterOnView } from "$lib/motion/enter";

let { data } = $props();

const local = [
	{
		icon: IconFolderOpen,
		title: "Your files stay put",
		body: "The work happens in your browser tab or a desktop app, never on a server you do not control."
	},
	{
		icon: IconCpu,
		title: "Fast because it is close",
		body: "Nothing queues behind an upload, a worker or someone else's rate limit."
	},
	{
		icon: IconShieldCheck,
		title: "Public repositories",
		body: "Every product has a repository you can read. Licences differ per project, so each one states its own."
	}
];

const packages = [
	{ name: "nexo-mdx", body: "Markdown editor for React, built on Tailwind and shadcn." },
	{ name: "nexo-editor", body: "Lightweight rich text editor built on TipTap." },
	{ name: "pdf-tables-parser", body: "Pulls structured tables out of PDF files in JavaScript." },
	{ name: "custom-domain-sdk", body: "TypeScript SDK for Cloudflare custom hostnames." }
];

const faqs = [
	{
		q: "What is Nexonauts, exactly?",
		a: "An umbrella for a set of developer tools. Each has its own home, repository and release cycle. This site is the index."
	},
	{
		q: "What does running locally actually mean here?",
		a: "Orbit and Glyphtex work inside your browser tab, Recast in a desktop app. Nothing has to be uploaded first."
	},
	{
		q: "Is everything open source?",
		a: "Every repository is public, but licences differ. Recast is GPLv3 and Docvia is MIT, so check the one you want to build on."
	},
	{
		q: "Do I need a Nexonauts account?",
		a: "No. There is no shared login. Recast has an optional cloud tier with its own signup, and that is the only one."
	},
	{
		q: "What are the nexo packages?",
		a: "Small npm libraries pulled out of the apps once they earned a second use. Documented at docs.nexonauts.com."
	},
	{
		q: "How finished are these?",
		a: "Orbit and Docvia are stable. Recast is stable on Windows, beta elsewhere. Glyphtex is newest and moves fastest."
	},
	{
		q: "How do I report a bug or ask for a feature?",
		a: "Open an issue on that product's own repository. Each is linked from its site and read by the person who wrote it."
	},
	{
		q: "What else is coming?",
		a: "Specimen, a reader for extracted design systems, and a component registry. Both are in development and neither is listed above yet."
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

<RailFrame>
	<RailRow divider={false} label="Introduction">
		<HeroSection toolCount={data.counts.tools} />
	</RailRow>

	<RailRow id="tools" label="Find a tool" class="gap-8 py-10 sm:py-14">
		<SectionHeader
			title="Nine tools that never"
			accent="see your file."
			description="Every one runs in the browser tab. Search by name or by the job you are doing, and press Enter for the closest match."
		/>
		<ToolFinder />
	</RailRow>

	<RailRow id="products" label="Products">
		<SplitSection
			title="Four products,"
			accent="four separate homes."
			description="Each one solves a single job and ships on its own cycle. Status and licence are stated per product, because they differ."
			sticky
		>
			<ProductGrid />
		</SplitSection>
	</RailRow>

	<RailRow id="local" label="Why it runs locally">
		<SplitSection
			title="The work happens"
			accent="on your device."
			description="That is the whole idea, and it is the one thing every product here has in common."
		>
			<ul class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{#each local as point, i (point.title)}
					{@const Glyph = point.icon}
					<li
						use:enterOnView={{ delay: i * 0.06 }}
						class="border-border bg-card flex flex-col rounded-2xl border p-6"
					>
						<Glyph class="text-muted-foreground size-5" aria-hidden="true" />
						<h3 class="text-body text-foreground mt-4 font-medium">{point.title}</h3>
						<p class="text-body-sm text-muted-foreground mt-2 text-pretty">{point.body}</p>
					</li>
				{/each}
			</ul>
		</SplitSection>
	</RailRow>

	<RailRow id="writing" label="Writing" class="gap-8">
		<SectionHeader
			title="Notes from"
			accent="building them."
			description="What came out of the work: short worked examples, longer walkthroughs, and the utilities that got extracted along the way."
		/>
		<WritingGrid guides={data.guides} topics={data.topics} counts={data.counts} />
	</RailRow>

	<RailRow id="packages" label="Packages on npm" class="gap-8">
		<SectionHeader
			eyebrow="On npm"
			title="Libraries pulled out"
			accent="once they earned it."
			description="Each of these started inside one of the apps and moved out when a second project needed it."
		/>
		<!-- gap-px over the hairline colour draws every separator however the cells wrap. -->
		<ul class="bg-border border-border grid grid-cols-1 gap-px border-y sm:grid-cols-2 lg:grid-cols-4">
			{#each packages as pkg, i (pkg.name)}
				<li use:enterOnView={{ delay: i * 0.05 }} class="bg-card flex flex-col p-5">
					<code class="text-body-sm text-foreground font-mono font-medium">{pkg.name}</code>
					<p class="text-body-sm text-muted-foreground mt-2 text-pretty">{pkg.body}</p>
				</li>
			{/each}
		</ul>
		<div>
			<Button href={appConfig.githubRepo} variant="outline" target="_blank" rel="noopener noreferrer">
				<IconBrandGithub class="size-4" aria-hidden="true" />
				Read the source
			</Button>
		</div>
	</RailRow>

	<RailRow id="faq" label="Questions">
		<SplitSection title="Questions," accent="answered plainly." sticky>
			<FaqList items={faqs} />
		</SplitSection>
	</RailRow>

	<RailRow label="Get started">
		<BrandPanel
			title="Pick a tool and start."
			body="No account, no upload, no trial. Every tool on this site opens and runs straight away."
		>
			{#snippet actions()}
				<Button href="/dev-tools" variant="light" size="lg">Browse all tools</Button>
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
		</BrandPanel>
	</RailRow>
</RailFrame>
