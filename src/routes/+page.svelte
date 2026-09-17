<script lang="ts">
import ArrowRight from "phosphor-svelte/lib/ArrowRight";
import ArrowUpRight from "phosphor-svelte/lib/ArrowUpRight";
import BookOpen from "phosphor-svelte/lib/BookOpen";
import Browsers from "phosphor-svelte/lib/Browsers";
import Cpu from "phosphor-svelte/lib/Cpu";
import CubeTransparent from "phosphor-svelte/lib/CubeTransparent";
import FilePdf from "phosphor-svelte/lib/FilePdf";
import FileText from "phosphor-svelte/lib/FileText";
import MathOperations from "phosphor-svelte/lib/MathOperations";
import Package from "phosphor-svelte/lib/Package";
import PencilSimpleLine from "phosphor-svelte/lib/PencilSimpleLine";
import Question from "phosphor-svelte/lib/Question";
import ShieldCheck from "phosphor-svelte/lib/ShieldCheck";
import Stack from "phosphor-svelte/lib/Stack";
import VideoCamera from "phosphor-svelte/lib/VideoCamera";
import Wrench from "phosphor-svelte/lib/Wrench";
import { appConfig } from "@/project.config";
import Footer from "$lib/components/common/footer.svelte";
import IslandNav from "$lib/components/common/island-nav.svelte";
import {
	Container,
	FaqList,
	HeroShowcase,
	Reveal,
	Section,
	SectionLabel,
	TaglineReveal
} from "$lib/components/surfaces";
import { Button } from "$lib/components/ui/button";
import { cn } from "$lib/utils";

const marqueeItems = [
	{ label: "Orbit", mono: false },
	{ label: "Recast", mono: false },
	{ label: "Glyphtex", mono: false },
	{ label: "Docvia", mono: false },
	{ label: "nexo-mdx", mono: true },
	{ label: "nexo-editor", mono: true },
	{ label: "pdf-tables-parser", mono: true },
	{ label: "custom-domain-sdk", mono: true }
];

// Every body string below is written to land in two lines at its own column
// width. See DESIGN.md §Voice.
const products = [
	{
		icon: FilePdf,
		name: "Orbit",
		kind: "PDF toolkit",
		body: "Merge, split, convert and compress. The whole PDF workflow, and it never uploads a file.",
		meta: "Runs in the browser",
		href: "https://orbit.nexonauts.com"
	},
	{
		icon: VideoCamera,
		name: "Recast",
		kind: "Screen recorder",
		body: "Record once, ship a demo. Cursor smoothing, zoom and silence trimming apply as you capture.",
		meta: "Windows stable · macOS and Linux in beta",
		href: "https://recast.li"
	},
	{
		icon: MathOperations,
		name: "Glyphtex",
		kind: "LaTeX engine",
		body: "A LaTeX engine compiled to WebAssembly. Typeset a document with no TeX distribution on disk.",
		meta: "Runs in the browser",
		href: "https://glyphtex.nexonauts.com"
	},
	{
		icon: FileText,
		name: "Docvia",
		kind: "Docs compiler",
		body: "Write Markdown once with directive based components. Render it through React or Svelte.",
		meta: "Build step, MIT licensed",
		href: "https://docvia.dev"
	}
];

const thread = [
	{
		icon: Browsers,
		title: "Your files stay put",
		body: "The work happens in your browser tab or a desktop app, never on a server."
	},
	{
		icon: Cpu,
		title: "Fast because it is close",
		body: "Nothing queues behind an upload, a worker or someone else's rate limit."
	},
	{
		icon: ShieldCheck,
		title: "Public repositories",
		body: "Every product has a repository you can read. Licences differ per project."
	}
];

const packages = [
	{ name: "nexo-mdx", body: "Markdown editor for React, built on Tailwind and shadcn." },
	{ name: "nexo-editor", body: "Lightweight rich text editor built on TipTap." },
	{ name: "pdf-tables-parser", body: "Pulls structured tables out of PDF files in JavaScript." },
	{ name: "custom-domain-sdk", body: "TypeScript SDK for Cloudflare custom hostnames." }
];

const writing = [
	{
		icon: BookOpen,
		title: "Learn by example",
		body: "Short programs that show one idea at a time, code beside the reason it works.",
		href: "/learn"
	},
	{
		icon: FileText,
		title: "Guides",
		body: "Longer walkthroughs for the topics that do not fit the by-example shape.",
		href: "/guides"
	},
	{
		icon: Wrench,
		title: "Dev tools",
		body: "Single purpose browser utilities for the jobs that interrupt real work.",
		href: "/dev-tools"
	}
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
		a: "Every repository is public, but licences differ. Recast is GPLv3 and Docvia is MIT, so check before building on one."
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

// Hairline grid, not a row of rounded cards. `gap-px` over a border-coloured
// background draws every separator however the cells wrap.
const grid = "grid grid-cols-1 gap-px border-y border-border-low bg-border-low";
// `cell` carries no transition: it is also passed to <Reveal>, whose own
// transition-[opacity,transform] would lose the merge to a transition-colors.
const cell = "flex h-full flex-col bg-background px-6 py-8";
const cellLink = cn(
	"group flex w-full flex-col px-6 py-8",
	"ease-fluid transition-colors duration-200 hover:bg-paper",
	"focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:-outline-offset-2"
);
const iconClass = "size-5 text-muted-foreground";
const arrowClass =
	"ease-fluid size-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground";
const inlineLink =
	"ease-fluid inline-flex items-center gap-1.5 text-body-sm font-medium text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

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

<IslandNav />

<main id="main">
	<!-- Hero shell. Full-bleed, hairline bottom edge, dotted grid.
	     Bookended by the closing CTA at the foot of the page. -->
	<Section spacing="none">
		<div class="relative overflow-hidden rounded-b-3xl border-b border-border-low bg-paper">
			<div class="bg-dots bg-dots-fade pointer-events-none absolute inset-0" aria-hidden="true"></div>

			<Container class="relative z-10 pt-28 pb-14 md:pt-32 md:pb-16">
				<div class="mx-auto flex max-w-3xl flex-col items-center text-center">
					<a
						href="https://glyphtex.nexonauts.com"
						target="_blank"
						rel="noopener noreferrer"
						class="animate-fade-up pill group inline-flex h-7 items-center overflow-hidden text-xs leading-none"
						style="animation-delay: 60ms"
					>
						<span class="py-3 pr-3 pl-4 font-medium whitespace-nowrap text-foreground">
							Glyphtex compiles LaTeX in the browser
						</span>
						<span
							class="ease-fluid inline-flex items-center gap-1 self-stretch border-l border-border-low py-2 pr-4 pl-3 whitespace-nowrap text-muted-foreground transition-colors group-hover:text-foreground"
						>
							Open
							<ArrowUpRight class="size-3.5" />
						</span>
					</a>

					<h1
						class="animate-fade-up mt-7 text-balance text-heading-lg leading-[1.05] text-ink-strong md:text-display"
						style="animation-delay: 140ms"
					>
						Tools that run on your machine,<br />not on someone else's server.
					</h1>

					<p
						class="animate-fade-up mt-6 max-w-xl text-pretty text-body text-muted-foreground sm:text-body-lg"
						style="animation-delay: 200ms"
					>
						A PDF toolkit, a screen recorder, a LaTeX engine and a docs compiler. Each does its
						work without your file ever leaving the machine.
					</p>

					<div class="animate-fade-up mt-9" style="animation-delay: 260ms">
						<Button href="#products" variant="dark" size="lg">
							Browse the products
							<ArrowRight class="size-4" weight="bold" />
						</Button>
					</div>

					<p
						class="animate-fade-up mt-7 flex flex-wrap items-center justify-center gap-2 text-caption text-muted-foreground"
						style="animation-delay: 320ms"
					>
						Four apps
						<span aria-hidden="true" class="text-border-strong">·</span>
						Four npm packages
						<span aria-hidden="true" class="text-border-strong">·</span>
						Every repository public
					</p>
				</div>

				<div class="animate-fade-up mt-14" style="animation-delay: 380ms">
					<HeroShowcase />
				</div>
			</Container>
		</div>

		<!-- Marquee. Real properties, never a fabricated customer strip. -->
		<Container class="flex flex-col items-center gap-5 py-14">
			<p class="text-caption text-muted-foreground">Everything under the Nexonauts umbrella</p>
			<div
				class="group relative w-full max-w-[760px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
			>
				<ul
					class="animate-marquee flex w-max items-center gap-2 will-change-transform group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
				>
					{#each [...marqueeItems, ...marqueeItems] as item, i (i)}
						<li
							aria-hidden={i >= marqueeItems.length ? "true" : undefined}
							class={cn(
								"pill h-7 shrink-0 px-3 leading-none whitespace-nowrap",
								"inline-flex items-center",
								item.mono
									? "font-mono text-xs text-muted-foreground"
									: "text-xs font-medium text-foreground"
							)}
						>
							{item.label}
						</li>
					{/each}
				</ul>
			</div>
		</Container>
	</Section>

	<!-- Products -->
	<Section id="products" class="mx-auto max-w-6xl scroll-mt-20 border-t border-border-low">
		<Container>
			<div class="mx-auto max-w-xl text-center">
				<Reveal>
					<SectionLabel icon={Stack} label="Four tools, four homes" />
				</Reveal>
				<Reveal delay={60} class="mt-5">
					<h2 class="text-balance text-heading md:text-heading-lg">
						Each one solves a single job
					</h2>
				</Reveal>
				<Reveal delay={120} class="mt-4">
					<p class="text-pretty text-body-lg text-muted-foreground">
						No shared account, no shared runtime, no shared release cycle.
					</p>
				</Reveal>
			</div>

			<div class={cn(grid, "mt-12 sm:grid-cols-2")}>
				{#each products as product, i (product.name)}
					{@const Icon = product.icon}
					<Reveal as="article" delay={i * 70} class="flex bg-background">
						<a href={product.href} target="_blank" rel="noopener noreferrer" class={cellLink}>
							<div class="flex items-center justify-between">
								<Icon class={iconClass} weight="duotone" />
								<ArrowUpRight class={arrowClass} />
							</div>

							<p class="mt-6 text-caption text-muted-foreground">{product.kind}</p>
							<h3 class="mt-1 font-display text-body font-medium text-foreground">
								{product.name}
							</h3>
							<p class="mt-2 text-body-sm text-muted-foreground">{product.body}</p>
							<p class="mt-auto pt-5 font-mono text-caption text-muted-foreground">
								{product.meta}
							</p>
						</a>
					</Reveal>
				{/each}
			</div>
		</Container>
	</Section>

	<!-- Tagline. Full-bleed tonal band. -->
	<div class="border-y border-border-low bg-paper">
		<Container class="py-16 md:py-20">
			<TaglineReveal lines={["The work happens on your device.", "That is the whole idea."]} />
		</Container>
	</div>

	<!-- The thread -->
	<Section id="thread" class="mx-auto max-w-6xl scroll-mt-20">
		<Container>
			<div class="mx-auto max-w-xl text-center">
				<Reveal>
					<SectionLabel icon={CubeTransparent} label="The through-line" />
				</Reveal>
				<Reveal delay={60} class="mt-5">
					<h2 class="text-balance text-heading md:text-heading-lg">
						Different jobs, same assumption
					</h2>
				</Reveal>
			</div>

			<div class={cn(grid, "mt-12 sm:grid-cols-3")}>
				{#each thread as item, i (item.title)}
					{@const Icon = item.icon}
					<Reveal as="article" delay={i * 70} class={cell}>
						<Icon class={iconClass} weight="duotone" />
						<h3 class="mt-4 font-display text-body font-medium text-foreground">{item.title}</h3>
						<p class="mt-2 text-body-sm text-muted-foreground">{item.body}</p>
					</Reveal>
				{/each}
			</div>
		</Container>
	</Section>

	<!-- Packages -->
	<Section id="packages" class="mx-auto max-w-6xl scroll-mt-20 border-t border-border-low">
		<Container>
			<div class="mx-auto max-w-xl text-center">
				<Reveal>
					<SectionLabel icon={Package} label="On npm" />
				</Reveal>
				<Reveal delay={60} class="mt-5">
					<h2 class="text-balance text-heading md:text-heading-lg">The pieces that got reused</h2>
				</Reveal>
				<Reveal delay={120} class="mt-4">
					<p class="text-pretty text-body-lg text-muted-foreground">
						Libraries that came out of the apps once they earned a second use.
					</p>
				</Reveal>
			</div>

			<!-- gap-px over the hairline colour: the grid's dividers are the same
			     1px rule as every other boundary on the page. -->
			<ul class={cn(grid, "mt-12 sm:grid-cols-2")}>
				{#each packages as pkg, i (pkg.name)}
					<Reveal as="li" delay={i * 70} class="flex items-start gap-4 bg-background px-6 py-8">
						<Package class="mt-0.5 size-5 shrink-0 text-muted-foreground" weight="duotone" />
						<div>
							<p class="font-mono text-body-sm text-foreground">{pkg.name}</p>
							<p class="mt-1.5 text-body-sm text-muted-foreground">{pkg.body}</p>
						</div>
					</Reveal>
				{/each}
			</ul>

			<Reveal delay={120} class="mt-8 text-center">
				<a
					href="https://docs.nexonauts.com"
					target="_blank"
					rel="noopener noreferrer"
					class={inlineLink}
				>
					Read the package docs
					<ArrowUpRight class="size-3.5" />
				</a>
			</Reveal>
		</Container>
	</Section>

	<!-- Writing -->
	<Section id="writing" class="mx-auto max-w-6xl scroll-mt-20 border-t border-border-low">
		<Container>
			<div class="mx-auto max-w-xl text-center">
				<Reveal>
					<SectionLabel icon={PencilSimpleLine} label="Writing" />
				</Reveal>
				<Reveal delay={60} class="mt-5">
					<h2 class="text-balance text-heading md:text-heading-lg">
						Notes from building the above
					</h2>
				</Reveal>
			</div>

			<div class={cn(grid, "mt-12 sm:grid-cols-3")}>
				{#each writing as item, i (item.href)}
					{@const Icon = item.icon}
					<Reveal as="article" delay={i * 70} class="flex bg-background">
						<a href={item.href} class={cellLink}>
							<div class="flex items-center justify-between">
								<Icon class={iconClass} weight="duotone" />
								<ArrowRight class={arrowClass} />
							</div>
							<h3 class="mt-6 font-display text-body font-medium text-foreground">
								{item.title}
							</h3>
							<p class="mt-2 text-body-sm text-muted-foreground">{item.body}</p>
						</a>
					</Reveal>
				{/each}
			</div>
		</Container>
	</Section>

	<!-- FAQ. Title rail left, list right: a 12-column spread reads editorial,
	     a centred stack reads like a slide. -->
	<Section id="faq" class="mx-auto max-w-6xl scroll-mt-20 border-t border-border-low">
		<Container>
			<div class="grid gap-10 md:grid-cols-12 md:gap-12">
				<div class="md:col-span-4">
					<Reveal>
						<SectionLabel icon={Question} label="Questions" />
					</Reveal>
					<Reveal delay={60} class="mt-5">
						<h2 class="text-balance text-heading md:text-heading-lg">
							Before you open one
						</h2>
					</Reveal>
					<Reveal delay={120} class="mt-4">
						<p class="text-pretty text-body-sm text-muted-foreground">
							Everything people ask first, answered without a sales detour.
						</p>
					</Reveal>
				</div>
				<Reveal delay={160} class="md:col-span-8">
					<FaqList items={faqs} />
				</Reveal>
			</div>
		</Container>
	</Section>

	<!-- Closing CTA. Bookends the hero: same shell, same dotted grid, inverted
	     corners, and the one action restated. -->
	<Section spacing="none" class="pb-16 md:pb-24">
		<Container>
			<div class="relative overflow-hidden rounded-3xl border border-border-low bg-paper">
				<div
					class="bg-dots bg-dots-fade pointer-events-none absolute inset-0"
					aria-hidden="true"
				></div>

				<Reveal
					class="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 py-20 text-center"
				>
					<h2 class="text-balance text-heading md:text-heading-lg">
						Pick the one that matches today's problem
					</h2>
					<p class="mt-4 text-pretty text-body text-muted-foreground sm:text-body-lg">
						Nothing here asks for a card or an account first. Close the tab and nothing of yours
						went anywhere.
					</p>

					<div class="mt-9">
						<Button href="#products" variant="dark" size="lg">
							Browse the products
							<ArrowRight class="size-4" weight="bold" />
						</Button>
					</div>

					<a
						href={appConfig.githubRepo}
						target="_blank"
						rel="noopener noreferrer"
						class={cn(inlineLink, "mt-7")}
					>
						Or read the source
						<ArrowUpRight class="size-3.5" />
					</a>
				</Reveal>
			</div>
		</Container>
	</Section>
</main>

<Footer />
