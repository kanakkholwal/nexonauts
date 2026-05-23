<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Cloud from "@lucide/svelte/icons/cloud";
	import Cpu from "@lucide/svelte/icons/cpu";
	import Download from "@lucide/svelte/icons/download";
	import MonitorPlay from "@lucide/svelte/icons/monitor-play";
	import Scissors from "@lucide/svelte/icons/scissors";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Zap from "@lucide/svelte/icons/zap";

	// [[TODO: replace with real Recast feature copy]]
	const features = [
		{
			icon: MonitorPlay,
			title: "Record anything",
			description: "Capture your screen, webcam, or both at full resolution. No watermarks, no time limits."
		},
		{
			icon: Scissors,
			title: "Edit on the spot",
			description: "Trim, crop, and adjust without leaving the app. Designed for fast turnaround, not heavy post."
		},
		{
			icon: Cpu,
			title: "Runs locally",
			description: "Recording and rendering happen on your machine. Your footage doesn't leave your device unless you choose to share it."
		},
		{
			icon: Zap,
			title: "Built for speed",
			description: "Native desktop performance. Start recording in under a second."
		}
	];
</script>

<svelte:head>
	<title>Recast — Screen recording for developers</title>
	<meta
		name="description"
		content="Recast is a fast, local-first screen and webcam recorder for developers and creators. Windows desktop available now."
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
				<!-- [[TODO: confirm release badge — "Windows beta", "Now available", etc.]] -->
				Windows beta
			</Badge>

			<h1 class="text-foreground text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl">
				<!-- [[TODO: replace with final hero headline]] -->
				Screen recording,
				<br />
				<span class="text-muted-foreground">built for developers.</span>
			</h1>

			<p class="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
				<!-- [[TODO: replace with final hero subhead — current placeholder, ~30 words]] -->
				Recast is a fast, local-first screen and webcam recorder. Native performance, no watermarks,
				no uploads required. Windows desktop available now — Mac and Linux soon.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="#download"
					class={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full px-8 text-sm font-medium")}
				>
					<Download class="mr-2 size-4" />
					Download for Windows
				</a>
				<a
					href="#features"
					class={cn(
						buttonVariants({ variant: "ghost", size: "lg" }),
						"text-muted-foreground h-11 rounded-full px-8 text-sm font-medium"
					)}
				>
					See what it does
					<ArrowRight class="ml-2 size-4" />
				</a>
			</div>
		</div>
	</section>

	<!-- [[TODO: drop a demo GIF / video here. Suggested: ~30-second screen cast, autoplay-muted-loop]] -->
	<section class="bg-muted/30 border-t border-border py-16">
		<div class="mx-auto max-w-4xl px-6">
			<div
				class="bg-card flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border"
			>
				<p class="text-muted-foreground text-sm">[[TODO: demo GIF or screenshot goes here]]</p>
			</div>
		</div>
	</section>

	<section id="features" class="bg-background border-t border-border py-24">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-16">
				<p class="text-primary mb-2 text-sm font-medium tracking-wide uppercase">Features</p>
				<h2 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
					Less ceremony, more recording
				</h2>
				<p class="text-muted-foreground mt-3 max-w-lg text-base">
					<!-- [[TODO: tighten this — 1 sentence framing the feature set]] -->
					Everything you need to capture a demo, walkthrough, or bug repro. Nothing you don't.
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

	<section id="download" class="bg-muted/30 border-t border-border py-24">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<h2 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
				Available for Windows
			</h2>
			<p class="text-muted-foreground mx-auto mt-4 max-w-xl text-base">
				<!-- [[TODO: pin the version + size after you cut the first release]] -->
				Latest build. Free during beta. Mac and Linux are next.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<!-- [[TODO: swap this button for an <a href="…"> once the download URL exists (GitHub release / R2 / etc.)]] -->
				<button
					type="button"
					disabled
					class={cn(
						buttonVariants({ size: "lg" }),
						"h-11 cursor-not-allowed rounded-full px-8 text-sm font-medium opacity-60"
					)}
				>
					<Download class="mr-2 size-4" />
					Download Recast for Windows
				</button>
			</div>

			<p class="text-muted-foreground mt-12 inline-flex items-center gap-2 text-sm">
				<Cloud class="size-4" />
				Cloud sharing (Loom-style links) is coming later this year.
			</p>
		</div>
	</section>
</main>

<Footer />
