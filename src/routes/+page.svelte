<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import HeroGradient from "$lib/components/surfaces/hero-gradient.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import { enterOnView } from "$lib/motion/enter";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import FileText from "@lucide/svelte/icons/file-text";
	import MonitorPlay from "@lucide/svelte/icons/monitor-play";
	import Sparkles from "@lucide/svelte/icons/sparkles";

	const products = [
		{
			eyebrow: "Desktop product",
			title: "Recast",
			description:
				"Fast, local-first screen and webcam recorder. Native performance, no watermarks, no uploads required.",
			href: "https://recast.nexonauts.com",
			external: true,
			icon: MonitorPlay,
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
			topics: 6
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

<header>
	<Navbar />
</header>

<main>
	<!-- Hero: blue-gradient accent surface -->
	<HeroGradient as="section" intensity="strong" class="pt-20 sm:pt-24 lg:pt-28">
		<div class="mx-auto max-w-3xl text-center" use:enterOnView={{ y: 16, duration: 0.5 }}>
			<span
				class="border-white/15 bg-white/5 text-white/80 mb-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm"
			>
				<Sparkles class="size-3" />
				Studio, not platform
			</span>

			<h1 class="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
				Tools and writing
				<br />
				<span class="text-white/60">for the people who ship.</span>
			</h1>

			<p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
				A small studio of developer tools and technical writing. Home of Recast and Docvia, plus
				guides on the languages and patterns we actually use.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="https://recast.nexonauts.com"
					target="_blank"
					rel="noopener noreferrer"
					class={cn(
						buttonVariants({ size: "lg" }),
						"h-11 rounded-full bg-white px-7 text-sm font-semibold text-black shadow-[0_1px_2px_rgb(0_0_0/0.10)] hover:bg-white/95"
					)}
				>
					Try Recast
					<ArrowUpRight class="ml-1 size-4" />
				</a>
				<a
					href="/learn"
					class={cn(
						buttonVariants({ variant: "ghost", size: "lg" }),
						"h-11 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
					)}
				>
					Read the guides
					<ArrowRight class="ml-1 size-4" />
				</a>
			</div>
		</div>
	</HeroGradient>

	<!-- Products -->
	<section id="products" class="border-border bg-background border-t py-20 sm:py-24 lg:py-28">
		<div class="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
			<div class="mb-10 max-w-2xl" use:enterOnView>
				<p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Products</p>
				<h2 class="text-foreground mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
					What we ship
				</h2>
				<p class="text-muted-foreground mt-3 text-base">
					Tools we built for ourselves first, then opened up. Each one has a specific job and stops
					there.
				</p>
			</div>

			<div class="grid gap-4 lg:grid-cols-2 lg:gap-5">
				{#each products as product, i (product.title)}
					{@const Icon = product.icon}
					<a
						href={product.href}
						target={product.external ? "_blank" : undefined}
						rel={product.external ? "noopener noreferrer" : undefined}
						class={cn(
							"group bg-card hover:border-foreground/20 relative flex flex-col gap-5 rounded-2xl border border-border p-7 transition-all hover:shadow-[0_4px_16px_rgb(0_0_0/0.06)]"
						)}
						use:enterOnView={{ delay: 0.05 * i, y: 16 }}
					>
						<div class="flex items-center justify-between">
							<div
								class="bg-foreground/5 group-hover:bg-foreground/10 inline-flex size-11 items-center justify-center rounded-xl transition-colors"
							>
								<Icon class="text-foreground size-5" />
							</div>
							<ArrowUpRight
								class="text-muted-foreground group-hover:text-foreground size-4 transition-colors"
							/>
						</div>
						<div>
							<p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
								{product.eyebrow}
							</p>
							<h3 class="text-foreground mt-2 text-2xl font-semibold tracking-tight">
								{product.title}
							</h3>
							<p class="text-muted-foreground mt-3 text-sm leading-relaxed">
								{product.description}
							</p>
						</div>
						<ul class="border-border mt-auto space-y-1.5 border-t pt-4">
							{#each product.points as point (point)}
								<li class="text-muted-foreground text-sm">
									<span class="text-foreground mr-2">·</span>{point}
								</li>
							{/each}
						</ul>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Learn -->
	<section id="guides" class="border-border bg-muted/30 border-t py-20 sm:py-24 lg:py-28">
		<div class="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
			<div class="mb-10 max-w-2xl" use:enterOnView>
				<p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Learn</p>
				<h2 class="text-foreground mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
					Short programs, side-by-side explanations
				</h2>
				<p class="text-muted-foreground mt-3 text-base">
					Topic-by-topic walkthroughs of the languages we actually reach for. Code on one side,
					why-it-works on the other.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each guideHighlights as g (g.title)}
					<a
						href={g.href}
						class="group bg-card hover:border-foreground/20 flex flex-col gap-4 rounded-2xl border border-border p-6 transition-all hover:shadow-[0_4px_16px_rgb(0_0_0/0.06)]"
						use:enterOnView
					>
						<div class="flex items-center justify-between">
							<div
								class="bg-foreground/5 inline-flex size-9 items-center justify-center rounded-lg"
							>
								<BookOpen class="text-foreground size-4" />
							</div>
							<span class="text-muted-foreground text-xs">{g.topics} topics</span>
						</div>
						<div>
							<p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
								{g.eyebrow}
							</p>
							<h3 class="text-foreground mt-2 text-xl font-semibold">{g.title}</h3>
							<p class="text-muted-foreground mt-2 text-sm leading-relaxed">{g.description}</p>
						</div>
						<div
							class="text-muted-foreground group-hover:text-foreground mt-auto inline-flex items-center gap-1 text-sm transition-colors"
						>
							Open <ArrowRight class="size-3.5" />
						</div>
					</a>
				{/each}

				<a
					href="/guides"
					class="group bg-card hover:border-foreground/20 flex flex-col items-start justify-between rounded-2xl border border-border border-dashed p-6 transition-all hover:shadow-[0_4px_16px_rgb(0_0_0/0.06)]"
					use:enterOnView={{ delay: 0.05 }}
				>
					<div>
						<p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
							Standalone
						</p>
						<h3 class="text-foreground mt-2 text-xl font-semibold">Guides</h3>
						<p class="text-muted-foreground mt-2 text-sm leading-relaxed">
							Longer-form walkthroughs that don't fit the by-example shape.
						</p>
					</div>
					<div
						class="text-muted-foreground group-hover:text-foreground mt-4 inline-flex items-center gap-1 text-sm transition-colors"
					>
						Browse all <ArrowRight class="size-3.5" />
					</div>
				</a>
			</div>
		</div>
	</section>

	<!-- CTA: reuse HeroGradient as the closing accent -->
	<HeroGradient as="section" class="py-20 sm:py-24">
		<div class="mx-auto max-w-2xl text-center" use:enterOnView>
			<h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
				Built for the people who actually ship.
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70">
				Pick a tool, pick a guide, or read along on X.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="/learn"
					class={cn(
						buttonVariants({ size: "lg" }),
						"h-11 rounded-full bg-white px-7 text-sm font-semibold text-black shadow-[0_1px_2px_rgb(0_0_0/0.10)] hover:bg-white/95"
					)}
				>
					Read the guides
					<ArrowRight class="ml-1 size-4" />
				</a>
				<a
					href="https://x.com/KanakKholwal"
					target="_blank"
					rel="noopener noreferrer"
					class={cn(
						buttonVariants({ variant: "ghost", size: "lg" }),
						"h-11 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
					)}
				>
					Follow on X
					<ArrowUpRight class="ml-1 size-4" />
				</a>
			</div>
		</div>
	</HeroGradient>
</main>

<Footer />
