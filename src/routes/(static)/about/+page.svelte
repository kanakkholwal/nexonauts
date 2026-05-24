<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
	import GradientOrbCard from "$lib/components/surfaces/gradient-orb-card.svelte";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import BarChart3 from "@lucide/svelte/icons/bar-chart-3";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import Quote from "@lucide/svelte/icons/quote";
	import Settings from "@lucide/svelte/icons/settings";
	import Terminal from "@lucide/svelte/icons/terminal";

	const values = [
		{
			icon: Settings,
			title: "Execution",
			body:
				"From ideation to ship, we're focused on the steps that actually move work forward. No theatre, no busywork — just the next concrete thing.",
			hue: "lavender" as const
		},
		{
			icon: CheckCircle2,
			title: "Accountability",
			body:
				"A studio of one means there's no committee to hide behind. The decisions are mine, the work is mine, the responsibility is mine.",
			hue: "mint" as const
		},
		{
			icon: BarChart3,
			title: "Result",
			body:
				"Tools are judged by what they help you finish, not by how clever they look. We optimize for the artifact, not the engagement metric.",
			hue: "peach" as const
		}
	];
</script>

<svelte:head>
	<title>About — Nexonauts</title>
	<meta
		name="description"
		content="Empowering developers, one innovation at a time. Built by a developer, for developers."
	/>
</svelte:head>

<!-- HERO -->
<section class="relative isolate overflow-hidden">
	<GradientOrb hue="lavender" size="xl" opacity={0.5} class="-left-1/4 -top-1/4" />
	<GradientOrb hue="peach" size="lg" opacity={0.4} class="-right-1/4 top-1/4" />
	<GradientOrb hue="mint" size="md" opacity={0.3} class="left-1/3 -bottom-12" />

	<div class="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-16 text-center sm:pt-32">
		<Badge variant="default" size="md" class="mb-6">Our philosophy</Badge>
		<h1 class="display-mega text-ink">
			Empowering developers,<br />
			<span class="text-muted-ink">one innovation at a time.</span>
		</h1>
		<p class="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-body">
			Building the ecosystem that fuels creativity, collaboration, and growth for the next
			generation of builders.
		</p>
	</div>
</section>

<!-- MISSION SPLIT -->
<section class="relative">
	<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="order-2 space-y-6 lg:order-1">
			<p class="eyebrow text-muted-ink">Our mission</p>
			<h2 class="display-lg text-ink">
				Built by a developer,<br />for developers.
			</h2>
			<div class="space-y-4 text-base leading-relaxed text-body">
				<p>
					Welcome to Nexonauts. This isn't a platform; it's a small studio run by one passionate
					developer with a singular mission: to simplify the development journey for fellow
					creators.
				</p>
				<p>
					There's no faceless corporation here. There's a toolset crafted with empathy for the
					coding process — and a body of writing to match.
				</p>
			</div>

			<aside
				class="relative isolate overflow-hidden rounded-2xl border border-hairline bg-canvas-soft p-6 pl-7"
			>
				<span aria-hidden="true" class="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-ink"></span>
				<Quote class="absolute right-4 top-4 size-7 text-hairline-strong" />
				<p class="font-display text-lg font-light leading-snug text-ink">
					"I keep you informed at every step — and hold myself accountable for the results."
				</p>
			</aside>
		</div>

		<div class="relative order-1 lg:order-2">
			<div
				class="relative overflow-hidden rounded-3xl border border-hairline bg-canvas-soft soft-drop"
			>
				<img
					src="/assets/images/about_1.png"
					alt="Developer working"
					width="800"
					height="600"
					class="h-auto w-full object-cover"
					loading="lazy"
				/>
			</div>
		</div>
	</div>
</section>

<!-- VALUES -->
<section class="relative">
	<div class="mb-12 max-w-2xl">
		<p class="eyebrow text-muted-ink">Our values</p>
		<h2 class="display-lg mt-3 text-ink">The principles guiding Nexonauts</h2>
		<p class="mt-4 text-base leading-relaxed text-body">
			Three things, repeated until they're a default. They show up in the products we ship and the
			writing we publish.
		</p>
	</div>

	<div class="grid gap-5 md:grid-cols-3">
		{#each values as v (v.title)}
			{@const Icon = v.icon}
			<article
				class="group relative isolate flex flex-col gap-5 overflow-hidden rounded-2xl border border-hairline bg-card p-7 transition-all hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
			>
				<GradientOrb hue={v.hue} size="sm" opacity={0.22} class="-right-16 -top-12" />
				<div
					class="relative z-10 flex size-12 items-center justify-center rounded-2xl bg-surface-strong"
				>
					<Icon class="size-5 text-ink" />
				</div>
				<div class="relative z-10">
					<h3 class="font-display text-2xl font-light tracking-tight text-ink">{v.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-body">{v.body}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<!-- CLOSING CTA -->
<section class="relative">
	<GradientOrbCard
		hue="rose"
		eyebrow="Open for builders"
		title="Ready to ship your dream?"
		description="Whether you're a seasoned engineer or just committed your first line of code, Nexonauts has the tools and writing to help you move."
	>
		<div class="mt-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Button href="/auth/sign-in" size="lg">
				Get started
				<ArrowRight class="size-4" />
			</Button>
			<Button href="/dev-tools" variant="outline" size="lg">
				<Terminal class="size-4" />
				Browse the tools
			</Button>
		</div>
	</GradientOrbCard>
</section>
