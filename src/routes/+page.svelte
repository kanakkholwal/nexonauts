<script lang="ts">
	import Footer from "$lib/components/common/footer.svelte";
	import IslandNav from "$lib/components/common/island-nav.svelte";
	import TaglineReveal from "$lib/components/surfaces/tagline-reveal.svelte";
	import * as Accordion from "$lib/components/ui/accordion";
	import { Button } from "$lib/components/ui/button";
	import { revealOnView } from "$lib/motion/enter";
	import { cn } from "$lib/utils";
	import { appConfig } from "@/project.config";

	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import ArrowUpRight from "phosphor-svelte/lib/ArrowUpRight";
	import BookOpen from "phosphor-svelte/lib/BookOpen";
	import Browsers from "phosphor-svelte/lib/Browsers";
	import Cpu from "phosphor-svelte/lib/Cpu";
	import FilePdf from "phosphor-svelte/lib/FilePdf";
	import FileText from "phosphor-svelte/lib/FileText";
	import MathOperations from "phosphor-svelte/lib/MathOperations";
	import Package from "phosphor-svelte/lib/Package";
	import ShieldCheck from "phosphor-svelte/lib/ShieldCheck";
	import VideoCamera from "phosphor-svelte/lib/VideoCamera";
	import Wrench from "phosphor-svelte/lib/Wrench";

	const products = [
		{
			icon: FilePdf,
			name: "Orbit",
			kind: "PDF toolkit",
			body: "A full PDF workflow that never uploads a file. Merge, split, convert and compress, all inside the browser tab.",
			meta: "Runs in the browser",
			href: "https://orbit.nexonauts.com"
		},
		{
			icon: VideoCamera,
			name: "Recast",
			kind: "Screen recorder",
			body: "Record once, ship a demo. Cursor smoothing, zoom toward the click and silence trimming get applied while you capture.",
			meta: "Windows stable · macOS and Linux in beta",
			href: "https://recast.li"
		},
		{
			icon: MathOperations,
			name: "Glyphtex",
			kind: "LaTeX engine",
			body: "A LaTeX engine compiled to WebAssembly. Typeset a document in a browser tab without a TeX distribution on disk.",
			meta: "Runs in the browser",
			href: "https://glyphtex.nexonauts.com"
		},
		{
			icon: FileText,
			name: "Docvia",
			kind: "Docs compiler",
			body: "Framework agnostic documentation compiler. Write Markdown once with directive based components, render it through React or Svelte.",
			meta: "Build step, MIT licensed",
			href: "https://docvia.dev"
		}
	];

	const thread = [
		{
			icon: Browsers,
			title: "Your files stay put",
			body: "Orbit and Glyphtex do their work inside the browser tab. Recast works in a desktop app. None of them need your document to reach a server before it becomes useful."
		},
		{
			icon: Cpu,
			title: "Fast because it is close",
			body: "Nothing is queued behind an upload, a worker or someone else's rate limit. The slowest part of the job is your own machine."
		},
		{
			icon: ShieldCheck,
			title: "Public repositories",
			body: "Every product has a repository you can read. Licenses differ per project, so check the one you care about before shipping it into something commercial."
		}
	];

	const packages = [
		{
			name: "nexo-mdx",
			body: "Markdown editor for React, built on Tailwind and shadcn."
		},
		{
			name: "nexo-editor",
			body: "Lightweight, customizable rich text editor built on TipTap."
		},
		{
			name: "pdf-tables-parser",
			body: "Pulls structured tables out of PDF files in JavaScript and TypeScript."
		},
		{
			name: "custom-domain-sdk",
			body: "TypeScript SDK for managing custom domains through Cloudflare custom hostnames."
		}
	];

	const writing = [
		{
			icon: BookOpen,
			title: "Learn by example",
			body: "Short, self contained programs that show one idea at a time. Code on one side, why it works on the other.",
			href: "/learn"
		},
		{
			icon: FileText,
			title: "Guides",
			body: "Longer walkthroughs for the topics that do not fit the by example shape.",
			href: "/guides"
		},
		{
			icon: Wrench,
			title: "Dev tools",
			body: "Single purpose browser utilities for the small jobs that interrupt real work.",
			href: "/dev-tools"
		}
	];

	const faqs = [
		{
			q: "What is Nexonauts, exactly?",
			a: "An umbrella for a set of developer tools. Each product has its own home, its own repository and its own release cycle. This site is the index and the place the writing lives."
		},
		{
			q: "What does running locally actually mean here?",
			a: "For Orbit and Glyphtex the work happens inside your browser tab. For Recast it happens in a desktop app on your machine. In each case the file does not have to be uploaded for the tool to do its job."
		},
		{
			q: "Is everything open source?",
			a: "Every repository is public, but the licenses differ per project. Recast is GPLv3 and Docvia is MIT, so check the specific repository before building it into something commercial."
		},
		{
			q: "Do I need a Nexonauts account?",
			a: "No. There is no shared login across the products. Recast offers an optional cloud tier with its own signup, and that is the only place an account comes up at all."
		},
		{
			q: "What are the nexo packages?",
			a: "Small npm libraries that got pulled out of the apps once they proved useful more than once. Editors, a PDF table parser, and a custom domain SDK. They are documented at docs.nexonauts.com."
		},
		{
			q: "How finished are these?",
			a: "It varies by product. Orbit and Docvia are stable. Recast is stable on Windows with macOS and Linux in beta. Glyphtex is the newest and moves fastest."
		},
		{
			q: "How do I report a bug or ask for a feature?",
			a: "Open an issue on that product's own repository. Each one is linked from its site, and they are read by the person who wrote the code."
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

<IslandNav />

<main id="main" class="bg-canvas">
	<!-- Hero -->
	<section class="px-6 pt-24 pb-24">
		<div class="mx-auto flex max-w-(--max-app-width) flex-col items-center text-center">
			<h1
				class="heading-gradient max-w-[680px] text-4xl font-semibold tracking-[-0.02em] sm:text-5xl lg:text-6xl"
			>
				Tools that run on your machine,<br />not on someone else's server.
			</h1>

			<p class="mt-6 max-w-[680px] text-lg text-body">
				Nexonauts is a small set of developer tools that share one habit. A PDF toolkit, a screen
				recorder, a LaTeX engine and a docs compiler, each with its own home and its own
				repository.
			</p>

			<div class="mt-8">
				<Button href="#products" size="cta">
					Browse the products
					<ArrowRight class="size-4" weight="bold" />
				</Button>
			</div>

			<p
				class="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-ink"
			>
				<span>Four apps</span>
				<span aria-hidden="true">·</span>
				<span>Four npm packages</span>
				<span aria-hidden="true">·</span>
				<span>Every repository public</span>
			</p>
		</div>
	</section>

	<!-- Products: the conversion. Each card exits to its own domain. -->
	<section id="products" class="scroll-mt-24 bg-canvas-soft px-6 py-24">
		<div class="mx-auto max-w-(--max-app-width)">
			<div class="max-w-[680px]" use:revealOnView>
				<p class="eyebrow text-muted-ink">Products</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
					Four tools, four homes
				</h2>
				<p class="mt-6 text-base text-body">
					Each one solves a single job and stops there. They do not share an account, a runtime or
					a release cycle.
				</p>
			</div>

			<div class="mt-12 grid gap-4 sm:grid-cols-2">
				{#each products as product, i (product.name)}
					{@const Icon = product.icon}
					<a
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
						class={cn(
							"group flex flex-col rounded-2xl border border-hairline bg-canvas p-6",
							"transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
							"hover:border-hairline-strong hover:shadow-(--shadow-soft-drop) active:translate-y-px",
							"focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
						)}
						use:revealOnView={{ delay: 0.05 * i }}
					>
						<div class="flex items-center justify-between">
							<Icon class="size-6 text-ink" />
							<ArrowUpRight
								class="size-4 text-muted-ink transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-ink"
							/>
						</div>

						<p class="eyebrow mt-6 text-muted-ink">{product.kind}</p>
						<h3 class="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink">
							{product.name}
						</h3>
						<p class="mt-3 text-base text-body">{product.body}</p>
						<p class="mt-6 font-mono text-xs text-muted-ink">{product.meta}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Tagline reveal -->
	<section class="px-6 py-24">
		<TaglineReveal lines={["The work happens on your device.", "That is the whole idea."]} />
	</section>

	<!-- The thread -->
	<section id="thread" class="scroll-mt-24 bg-canvas-soft px-6 py-24">
		<div class="mx-auto max-w-(--max-app-width)">
			<div class="max-w-[680px]" use:revealOnView>
				<p class="eyebrow text-muted-ink">What connects them</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
					Different jobs, same assumption
				</h2>
			</div>

			<div class="mt-12 grid gap-4 sm:grid-cols-3">
				{#each thread as item, i (item.title)}
					{@const Icon = item.icon}
					<div
						class="rounded-2xl border border-hairline bg-canvas p-6"
						use:revealOnView={{ delay: 0.05 * i }}
					>
						<Icon class="size-6 text-ink" />
						<h3 class="mt-4 text-xl font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
						<p class="mt-3 text-base text-body">{item.body}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Packages -->
	<section id="packages" class="scroll-mt-24 px-6 py-24">
		<div class="mx-auto max-w-(--max-app-width)">
			<div class="max-w-[680px]" use:revealOnView>
				<p class="eyebrow text-muted-ink">Packages</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
					The pieces that got reused
				</h2>
				<p class="mt-6 text-base text-body">
					Small npm libraries that came out of the apps once they earned their second use.
				</p>
			</div>

			<ul class="mt-12 grid gap-4 sm:grid-cols-2" use:revealOnView>
				{#each packages as pkg (pkg.name)}
					<li class="flex items-start gap-4 rounded-2xl border border-hairline bg-canvas-soft p-6">
						<Package class="mt-0.5 size-4 shrink-0 text-muted-ink" />
						<div>
							<p class="font-mono text-sm text-ink">{pkg.name}</p>
							<p class="mt-2 text-sm text-body">{pkg.body}</p>
						</div>
					</li>
				{/each}
			</ul>

			<div class="mt-8" use:revealOnView>
				<a
					href="https://docs.nexonauts.com"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-muted-ink focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
				>
					Read the package docs
					<ArrowUpRight class="size-4" />
				</a>
			</div>
		</div>
	</section>

	<!-- Writing -->
	<section id="writing" class="scroll-mt-24 bg-canvas-soft px-6 py-24">
		<div class="mx-auto max-w-(--max-app-width)">
			<div class="max-w-[680px]" use:revealOnView>
				<p class="eyebrow text-muted-ink">Writing</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
					Notes from building the above
				</h2>
			</div>

			<div class="mt-12 grid gap-4 sm:grid-cols-3">
				{#each writing as item, i (item.href)}
					{@const Icon = item.icon}
					<a
						href={item.href}
						class={cn(
							"group flex flex-col rounded-2xl border border-hairline bg-canvas p-6",
							"transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
							"hover:border-hairline-strong hover:shadow-(--shadow-soft-drop) active:translate-y-px",
							"focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
						)}
						use:revealOnView={{ delay: 0.05 * i }}
					>
						<div class="flex items-center justify-between">
							<Icon class="size-6 text-ink" />
							<ArrowRight
								class="size-4 text-muted-ink transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-ink"
							/>
						</div>
						<h3 class="mt-6 text-xl font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
						<p class="mt-3 text-sm text-body">{item.body}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section id="faq" class="scroll-mt-24 px-6 py-24">
		<div class="mx-auto max-w-3xl">
			<div use:revealOnView>
				<p class="eyebrow text-muted-ink">Questions</p>
				<h2 class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
					What people ask about the umbrella
				</h2>
			</div>

			<Accordion.Root type="single" class="mt-12 w-full">
				{#each faqs as faq (faq.q)}
					<Accordion.Item value={faq.q} class="border-b border-hairline">
						<Accordion.Trigger class="py-6 text-base font-medium text-ink hover:no-underline">
							{faq.q}
						</Accordion.Trigger>
						<Accordion.Content class="pb-6 text-base text-body">
							{faq.a}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="bg-canvas-soft px-6 py-24">
		<div class="mx-auto flex max-w-[680px] flex-col items-center text-center" use:revealOnView>
			<h2 class="text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
				Pick the one that matches today's problem.
			</h2>
			<p class="mt-6 text-base text-body">
				Nothing here asks for a card or an account before it does something useful. Open the one
				you need, and if it does not help, close the tab and nothing of yours went anywhere.
			</p>

			<div class="mt-8">
				<Button href="#products" size="cta">
					Browse the products
					<ArrowRight class="size-4" weight="bold" />
				</Button>
			</div>

			<a
				href={appConfig.githubRepo}
				target="_blank"
				rel="noopener noreferrer"
				class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-ink transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-ink focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
			>
				Or read the source
				<ArrowUpRight class="size-4" />
			</a>
		</div>
	</section>
</main>

<Footer />
