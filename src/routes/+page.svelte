<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import FileText from "@lucide/svelte/icons/file-text";
	import MonitorPlay from "@lucide/svelte/icons/monitor-play";
	import Sparkles from "@lucide/svelte/icons/sparkles";

	// [[TODO: replace product copy with final positioning when ready]]
	const products = [
		{
			icon: MonitorPlay,
			title: "Recast",
			description:
				"Fast, local-first screen and webcam recorder. Windows desktop available now — Mac and Linux next.",
			href: "/recast",
			external: false,
			tags: ["Desktop", "Windows", "Local-first"]
		},
		{
			icon: FileText,
			title: "Docvia",
			description:
				"Markdown documentation compiler with directive-based custom components. Same docs, any framework.",
			href: "https://docvia.dev",
			external: true,
			tags: ["Open Source", "Markdown", "MIT"]
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

<main class="flex min-h-screen flex-col">
	<section
		id="hero"
		class="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-24 pb-20"
	>
		<div class="bg-background absolute inset-0 -z-10">
			<div
				class="bg-primary/5 absolute top-1/2 left-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
			></div>
		</div>

		<div class="mx-auto w-full max-w-3xl px-6 text-center">
			<Badge
				variant="secondary"
				class="mb-8 inline-flex items-center gap-1.5 rounded-full border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
			>
				<Sparkles class="size-3" />
				Now in Beta
			</Badge>

			<h1
				class="text-foreground text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl"
			>
				<!-- [[TODO: lock the final brand line — current placeholder]] -->
				Tools and writing
				<br />
				<span class="text-muted-foreground">for the people who ship.</span>
			</h1>

			<p class="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
				<!-- [[TODO: lock final tagline; should communicate "small studio of dev tools + guides"]] -->
				A small studio of developer tools and technical writing. Home of Recast and Docvia, plus
				guides on the languages and patterns we actually use.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="/recast"
					class={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full px-8 text-sm font-medium")}
				>
					Try Recast
					<ArrowRight class="ml-2 size-4" />
				</a>
				<a
					href="#products"
					class={cn(
						buttonVariants({ variant: "ghost", size: "lg" }),
						"text-muted-foreground h-11 rounded-full px-8 text-sm font-medium"
					)}
				>
					What's here
				</a>
			</div>
		</div>
	</section>

	<section id="products" class="bg-background border-t border-border py-24">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-12">
				<p class="text-primary mb-2 text-sm font-medium tracking-wide uppercase">Products</p>
				<h2 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
					What we ship
				</h2>
				<p class="text-muted-foreground mt-3 max-w-lg text-base">
					Tools we built for ourselves first, then opened up.
				</p>
			</div>

			<div class="grid gap-4">
				{#each products as product (product.title)}
					{@const Icon = product.icon}
					<a
						href={product.href}
						target={product.external ? "_blank" : undefined}
						rel={product.external ? "noopener noreferrer" : undefined}
						class="group bg-card hover:border-primary/30 flex flex-col gap-4 rounded-xl border border-border p-6 transition-all hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
					>
						<div class="flex items-start gap-4 sm:items-center">
							<div
								class="bg-muted group-hover:bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors"
							>
								<Icon
									class="text-muted-foreground group-hover:text-primary size-5 transition-colors"
								/>
							</div>
							<div>
								<h3 class="text-foreground text-sm font-semibold">{product.title}</h3>
								<p class="text-muted-foreground mt-1 text-sm leading-relaxed">
									{product.description}
								</p>
								<div class="mt-3 flex flex-wrap gap-1.5">
									{#each product.tags as tag (tag)}
										<span
											class="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px] font-medium"
										>
											{tag}
										</span>
									{/each}
								</div>
							</div>
						</div>
						{#if product.external}
							<ExternalLink
								class="text-muted-foreground group-hover:text-foreground hidden size-4 shrink-0 transition-colors sm:block"
							/>
						{:else}
							<ArrowRight
								class="text-muted-foreground group-hover:text-foreground hidden size-4 shrink-0 transition-colors sm:block"
							/>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section class="bg-muted/30 border-t border-border py-24">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-12 text-center">
				<Badge
					variant="secondary"
					class="mb-4 inline-flex items-center gap-1.5 rounded-full border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
				>
					<BookOpen class="size-3" />
					Coming soon
				</Badge>
				<h2 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
					Guides, by example
				</h2>
				<p class="text-muted-foreground mx-auto mt-3 max-w-xl text-base">
					Topic-by-topic walkthroughs of the languages, patterns, and tools we actually reach for.
					Code on one side, why-it-works on the other.
				</p>
			</div>
		</div>
	</section>
</main>

<Footer />
