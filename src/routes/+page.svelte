<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import HeroGradient from "$lib/components/surfaces/hero-gradient.svelte";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
	import GradientOrbCard from "$lib/components/surfaces/gradient-orb-card.svelte";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { cn } from "$lib/utils";
	import { enterOnView } from "$lib/motion/enter";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import FileText from "@lucide/svelte/icons/file-text";
	import MonitorPlay from "@lucide/svelte/icons/monitor-play";

	const products = [
		{
			eyebrow: "Desktop product",
			title: "Recast",
			description:
				"Fast, local-first screen and webcam recorder. Native performance, no watermarks, no uploads required.",
			href: "https://recast.nexonauts.com",
			external: true,
			icon: MonitorPlay,
			hue: "peach" as const,
			points: ["Windows desktop today", "Mac and Linux coming", "Cloud sharing in beta"]
		},
		{
			eyebrow: "Open documentation tooling",
			title: "Docvia",
			description:
				"Markdown documentation compiler. Directive-based custom components, framework-portable output.",
			href: "https://docvia.dev",
			external: true,
			icon: FileText,
			hue: "mint" as const,
			points: ["MIT licensed", "React + Svelte renderers", "Build, dev, and SSR modes"]
		}
	];

	const guideHighlights = [
		{
			eyebrow: "Concurrency, by example",
			title: "Go",
			description:
				"Goroutines, channels, select, waitgroups, mutex, context. Short programs, side-by-side explanations.",
			href: "/learn/go",
			topics: 6,
			hue: "sky" as const
		}
	];
</script>

<svelte:head>
	<title>Nexonauts — Tools and writing for developers</title>
	<meta
		name="description"
		content="A small studio of developer tools and technical writing. Home of Recast and Docvia."
	/>
</svelte:head>

<Navbar />

<main class="bg-canvas">
	<!-- Editorial hero: pastel orbs drifting through off-white. -->
	<HeroGradient as="section" variant="editorial" intensity="strong">
		<div class="mx-auto max-w-3xl text-center" use:enterOnView={{ y: 16, duration: 0.5 }}>
			<Badge variant="default" size="md" class="mb-6">Studio, not platform</Badge>

			<h1 class="display-mega text-ink">
				Tools and writing<br />
				<span class="text-muted-ink">for the people who ship.</span>
			</h1>

			<p class="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-body">
				A small studio of developer tools and technical writing. Home of Recast and Docvia, plus
				guides on the languages and patterns we actually use.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<Button
					href="https://recast.nexonauts.com"
					target="_blank"
					rel="noopener noreferrer"
					size="lg"
				>
					Try Recast
					<ArrowUpRight class="size-4" />
				</Button>
				<Button href="/learn" variant="outline" size="lg">
					Read the guides
					<ArrowRight class="size-4" />
				</Button>
			</div>
		</div>
	</HeroGradient>

	<!-- Products: editorial 2-up split with gradient orbs in each card. -->
	<section id="products" class="border-t border-hairline-soft bg-canvas-soft">
		<div class="mx-auto max-w-(--max-app-width) px-6 py-24 sm:px-8 sm:py-28">
			<div class="mb-12 max-w-2xl" use:enterOnView>
				<p class="eyebrow text-muted-ink">Products</p>
				<h2 class="display-lg mt-3 text-ink">What we ship</h2>
				<p class="mt-4 text-base leading-relaxed text-body">
					Tools we built for ourselves first, then opened up. Each one has a specific job and
					stops there.
				</p>
			</div>

			<div class="grid gap-5 lg:grid-cols-2">
				{#each products as product, i (product.title)}
					{@const Icon = product.icon}
					<a
						href={product.href}
						target={product.external ? "_blank" : undefined}
						rel={product.external ? "noopener noreferrer" : undefined}
						class={cn(
							"group relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl border border-hairline-soft bg-canvas p-8 transition-all duration-200",
							"hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
						)}
						use:enterOnView={{ delay: 0.05 * i, y: 16 }}
					>
						<GradientOrb
							hue={product.hue}
							size="lg"
							opacity={0.35}
							class="-right-32 -top-24"
						/>

						<div class="relative z-10 flex items-center justify-between">
							<div
								class="inline-flex size-12 items-center justify-center rounded-2xl bg-surface-strong"
							>
								<Icon class="size-5 text-ink" />
							</div>
							<ArrowUpRight
								class="size-4 text-muted-ink transition-colors group-hover:text-ink"
							/>
						</div>
						<div class="relative z-10">
							<p class="eyebrow text-muted-ink">{product.eyebrow}</p>
							<h3 class="display-md mt-3 text-ink">{product.title}</h3>
							<p class="mt-4 text-base leading-relaxed text-body">{product.description}</p>
						</div>
						<ul class="relative z-10 mt-auto space-y-2 border-t border-hairline-soft pt-5">
							{#each product.points as point (point)}
								<li class="flex items-start gap-2 text-sm text-body">
									<span class="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-ink"></span>
									{point}
								</li>
							{/each}
						</ul>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Learn: smaller cards under a feature eyebrow. -->
	<section id="guides" class="border-t border-hairline-soft bg-canvas">
		<div class="mx-auto max-w-(--max-app-width) px-6 py-24 sm:px-8 sm:py-28">
			<div class="mb-12 max-w-2xl" use:enterOnView>
				<p class="eyebrow text-muted-ink">Learn</p>
				<h2 class="display-lg mt-3 text-ink">
					Short programs, side-by-side explanations
				</h2>
				<p class="mt-4 text-base leading-relaxed text-body">
					Topic-by-topic walkthroughs of the languages we actually reach for. Code on one side,
					why-it-works on the other.
				</p>
			</div>

			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each guideHighlights as g (g.title)}
					<a
						href={g.href}
						class="group relative isolate flex flex-col gap-5 overflow-hidden rounded-2xl border border-hairline bg-card p-6 transition-all hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
						use:enterOnView
					>
						<GradientOrb hue={g.hue} size="md" opacity={0.25} class="-right-24 -top-16" />
						<div class="relative z-10 flex items-center justify-between">
							<div class="inline-flex size-10 items-center justify-center rounded-xl bg-surface-strong">
								<BookOpen class="size-4 text-ink" />
							</div>
							<Badge variant="soft-sky" size="sm">{g.topics} topics</Badge>
						</div>
						<div class="relative z-10">
							<p class="eyebrow text-muted-ink">{g.eyebrow}</p>
							<h3 class="display-sm mt-2 text-ink">{g.title}</h3>
							<p class="mt-3 text-sm leading-relaxed text-body">{g.description}</p>
						</div>
						<div
							class="relative z-10 mt-auto inline-flex items-center gap-1 text-sm text-muted-ink transition-colors group-hover:text-ink"
						>
							Open <ArrowRight class="size-3.5" />
						</div>
					</a>
				{/each}

				<a
					href="/guides"
					class="group flex flex-col items-start justify-between rounded-2xl border border-dashed border-hairline-strong bg-canvas-soft p-6 transition-colors hover:bg-surface-strong/60"
					use:enterOnView={{ delay: 0.05 }}
				>
					<div>
						<p class="eyebrow text-muted-ink">Standalone</p>
						<h3 class="display-sm mt-2 text-ink">Guides</h3>
						<p class="mt-3 text-sm leading-relaxed text-body">
							Longer-form walkthroughs that don't fit the by-example shape.
						</p>
					</div>
					<div
						class="mt-5 inline-flex items-center gap-1 text-sm text-muted-ink transition-colors group-hover:text-ink"
					>
						Browse all <ArrowRight class="size-3.5" />
					</div>
				</a>
			</div>
		</div>
	</section>

	<!-- Closing CTA: editorial gradient-orb card per DESIGN.md. -->
	<section class="border-t border-hairline-soft bg-canvas">
		<div class="mx-auto max-w-(--max-app-width) px-6 py-24 sm:px-8 sm:py-28">
			<GradientOrbCard
				hue="rose"
				eyebrow="Get started"
				title="Built for the people who actually ship."
				description="Pick a tool, pick a guide, or read along on X."
			>
				<div class="mt-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Button href="/learn" size="lg">
						Read the guides
						<ArrowRight class="size-4" />
					</Button>
					<Button
						href="https://x.com/KanakKholwal"
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						size="lg"
					>
						Follow on X
						<ArrowUpRight class="size-4" />
					</Button>
				</div>
			</GradientOrbCard>
		</div>
	</section>
</main>

<Footer />
