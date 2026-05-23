<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Bot from "@lucide/svelte/icons/bot";
	import Cpu from "@lucide/svelte/icons/cpu";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import FileText from "@lucide/svelte/icons/file-text";
	import Globe from "@lucide/svelte/icons/globe";
	import Layout from "@lucide/svelte/icons/layout";
	import Palette from "@lucide/svelte/icons/palette";
	import Search from "@lucide/svelte/icons/search";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Wand2 from "@lucide/svelte/icons/wand-2";

	const features = [
		{
			icon: Layout,
			title: "Developer Portfolio",
			description:
				"Auto-synced with GitHub. Showcase projects, contributions, and stats — zero manual upkeep."
		},
		{
			icon: Palette,
			title: "Creator Marketplace",
			description:
				"Buy and sell UI kits, themes, and templates. Built for designers and frontend developers."
		},
		{
			icon: Search,
			title: "Tools Directory",
			description:
				"Curated collection of AI and dev tools — from converters and minifiers to SEO generators."
		},
		{
			icon: Globe,
			title: "Seamless Integrations",
			description:
				"Import products from Gumroad and other platforms. Keep your workflow uninterrupted."
		}
	];

	const aiTools = [
		{
			icon: Wand2,
			title: "Fashion Assistant",
			description:
				"AI stylist powered by advanced vision models. Outfit recommendations, trend analysis, wardrobe management."
		},
		{
			icon: Bot,
			title: "Thumbnail Generator",
			description:
				"Generate high-CTR thumbnails for YouTube and social media instantly from your video context."
		},
		{
			icon: Cpu,
			title: "Workflow Automation",
			description:
				"Build complex automation pipelines. Execute tasks, publish content, manage data — all connected."
		}
	];

	const products = [
		{
			icon: FileText,
			title: "Orbit PDF",
			description:
				"High-performance PDF toolkit that runs entirely in your browser. Merge, split, compress — 100% private, zero server uploads.",
			href: "https://github.com/kanakkholwal/orbit",
			tags: ["Open Source", "WASM", "Privacy-first"]
		}
	];
</script>

<svelte:head>
	<title>Nexonauts | The Ultimate AI Ecosystem for Developers & Creators</title>
	<meta
		name="description"
		content="Nexonauts is the next-generation platform for developers and creators. Access specialized AI tools, manage your portfolio, and explore a vast marketplace of digital assets."
	/>
</svelte:head>

<header>
	<Navbar />
</header>

<main class="flex min-h-screen flex-col">
	<section
		id="hero"
		class="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-24 pb-20"
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
				Build, create, and grow
				<br />
				<span class="text-muted-foreground">with the right tools.</span>
			</h1>

			<p class="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
				A unified platform for developer portfolios, digital marketplaces, and AI-powered tools.
				Everything you need, nothing you don{`'`}t.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="/auth/sign-in"
					class={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full px-8 text-sm font-medium")}
				>
					Get Started
					<ArrowRight class="ml-2 size-4" />
				</a>
				<a
					href="#features"
					class={cn(
						buttonVariants({ variant: "ghost", size: "lg" }),
						"text-muted-foreground h-11 rounded-full px-8 text-sm font-medium"
					)}
				>
					Learn More
				</a>
			</div>
		</div>
	</section>

	<section id="features" class="bg-background border-t border-border py-24">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-16">
				<p class="text-primary mb-2 text-sm font-medium tracking-wide uppercase">Platform</p>
				<h2 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
					Everything you need
				</h2>
				<p class="text-muted-foreground mt-3 max-w-lg text-base">
					From showcasing your work to finding the perfect tools — the infrastructure for your
					success.
				</p>
			</div>

			<div
				class="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2"
			>
				{#each features as feature (feature.title)}
					{@const Icon = feature.icon}
					<div class="group bg-card hover:bg-muted/50 p-8 transition-colors">
						<Icon
							class="text-muted-foreground group-hover:text-foreground mb-4 size-5 transition-colors"
						/>
						<h3 class="text-foreground mb-2 text-base font-semibold">{feature.title}</h3>
						<p class="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="bg-muted/30 border-t border-border py-24">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-16 text-center">
				<Badge
					variant="secondary"
					class="mb-4 inline-flex items-center gap-1.5 rounded-full border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
				>
					<Sparkles class="size-3" />
					Coming Soon
				</Badge>
				<h2 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
					Specialized AI Assistants
				</h2>
				<p class="text-muted-foreground mx-auto mt-3 max-w-lg text-base">
					Task-specific AI tools built for precision — not generic chat wrappers.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-3">
				{#each aiTools as tool (tool.title)}
					{@const Icon = tool.icon}
					<div
						class="group bg-card hover:border-primary/30 rounded-xl border border-border p-6 transition-all hover:shadow-sm"
					>
						<div
							class="bg-muted group-hover:bg-primary/10 mb-4 flex size-10 items-center justify-center rounded-lg transition-colors"
						>
							<Icon
								class="text-muted-foreground group-hover:text-primary size-5 transition-colors"
							/>
						</div>
						<h3 class="text-foreground mb-2 text-sm font-semibold">{tool.title}</h3>
						<p class="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="bg-background border-t border-border py-24">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-12">
				<p class="text-primary mb-2 text-sm font-medium tracking-wide uppercase">Ecosystem</p>
				<h2 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
					From our ecosystem
				</h2>
				<p class="text-muted-foreground mt-3 max-w-lg text-base">
					Standalone products built with the same principles — performance, privacy, and great
					design.
				</p>
			</div>

			<div class="grid gap-6">
				{#each products as product (product.title)}
					{@const Icon = product.icon}
					<a
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
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
						<ExternalLink
							class="text-muted-foreground group-hover:text-foreground hidden size-4 shrink-0 transition-colors sm:block"
						/>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24">
		<div class="container mx-auto max-w-6xl px-4">
			<div
				class="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] px-6 py-24 text-center shadow-2xl"
			>
				<div
					class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
				></div>

				<div
					class="bg-primary/20 pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
				></div>

				<div class="relative z-10 mx-auto max-w-3xl space-y-8">
					<h2 class="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
						Ready to Build the
						<span
							class="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-cyan-400"
						>
							Future?
						</span>
					</h2>
					<p class="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
						Join the ecosystem where innovation meets execution. Start your journey with Nexonauts
						today.
					</p>
					<div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
						<a
							href="/auth/sign-in"
							class={cn(
								buttonVariants({ size: "lg" }),
								"h-12 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-zinc-200"
							)}
						>
							Get Started Now
						</a>
						<a
							href="/contact"
							class={cn(
								buttonVariants({ variant: "ghost", size: "lg" }),
								"h-12 rounded-full border border-zinc-800 px-8 text-base font-medium text-white transition-all hover:bg-zinc-900 hover:text-white"
							)}
						>
							Contact Sales
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />
