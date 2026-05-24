<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
	import { cn } from "$lib/utils";
	import Check from "@lucide/svelte/icons/check";
	import Shield from "@lucide/svelte/icons/shield";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Zap from "@lucide/svelte/icons/zap";

	const pricing_plans = [
		{
			title: "Hobby",
			price: "0",
			description: "For individuals just getting started.",
			is_popular: false,
			icon: Sparkles,
			hue: "mint" as const,
			features: [
				"Basic search engine access",
				"Browse marketplace",
				"Submit 1 tool to platform",
				"Community support"
			]
		},
		{
			title: "Pro",
			price: "4.99",
			description: "For creators shipping daily.",
			is_popular: true,
			icon: Zap,
			hue: "lavender" as const,
			features: [
				"Advanced search filters",
				"Sell on marketplace",
				"Submit up to 5 tools",
				"Analytics dashboard",
				"Priority support"
			]
		},
		{
			title: "Premium",
			price: "9.99",
			description: "For power users and teams.",
			is_popular: false,
			icon: Shield,
			hue: "peach" as const,
			features: [
				"Everything in Pro",
				"Featured marketplace spots",
				"Submit up to 15 tools",
				"API access (Beta)",
				"Dedicated account manager"
			]
		}
	];

	let billingCycle = $state<"monthly" | "yearly">("monthly");
</script>

<svelte:head>
	<title>Pricing — Nexonauts</title>
	<meta
		name="description"
		content="Simple pricing for serious developers. Start for free, upgrade when you ship."
	/>
</svelte:head>

<section class="relative isolate overflow-hidden">
	<GradientOrb hue="lavender" size="xl" opacity={0.42} class="-left-1/4 -top-1/4" />
	<GradientOrb hue="mint" size="lg" opacity={0.3} class="-right-1/4 top-1/3" />

	<div class="relative z-10 mx-auto max-w-3xl space-y-5 px-0 pt-24 pb-12 text-center sm:pt-28">
		<Badge variant="default" size="md">Pricing</Badge>
		<h1 class="display-mega text-ink">
			Simple pricing for<br />
			<span class="text-muted-ink">serious developers.</span>
		</h1>
		<p class="mx-auto max-w-xl text-lg leading-relaxed text-body">
			Start for free, upgrade when you ship. No hidden fees, cancel anytime.
		</p>
	</div>

	<!-- Billing toggle -->
	<div class="relative z-10 mb-14 flex justify-center">
		<div class="inline-flex items-center rounded-pill border border-hairline bg-canvas-soft p-1">
			<button
				type="button"
				onclick={() => (billingCycle = "monthly")}
				class={cn(
					"rounded-pill px-5 py-1.5 text-sm font-medium transition-all duration-200",
					billingCycle === "monthly"
						? "bg-card text-ink shadow-(--shadow-elevation-1)"
						: "text-muted-ink hover:text-ink"
				)}
			>
				Monthly
			</button>
			<button
				type="button"
				onclick={() => (billingCycle = "yearly")}
				class={cn(
					"flex items-center gap-2 rounded-pill px-5 py-1.5 text-sm font-medium transition-all duration-200",
					billingCycle === "yearly"
						? "bg-card text-ink shadow-(--shadow-elevation-1)"
						: "text-muted-ink hover:text-ink"
				)}
			>
				Yearly
				<Badge variant="soft-mint" size="xs">−20%</Badge>
			</button>
		</div>
	</div>

	<!-- Plan cards -->
	<div class="relative z-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
		{#each pricing_plans as plan (plan.title)}
			{@const Icon = plan.icon}
			<article
				class={cn(
					"group relative isolate flex flex-col overflow-hidden rounded-3xl p-8 transition-all duration-200",
					plan.is_popular
						? "bg-surface-dark text-on-dark border border-white/8"
						: "border border-hairline bg-card hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
				)}
			>
				{#if !plan.is_popular}
					<GradientOrb hue={plan.hue} size="md" opacity={0.22} class="-right-24 -top-16" />
				{/if}

				{#if plan.is_popular}
					<div class="absolute -top-3 left-1/2 -translate-x-1/2">
						<Badge variant="on-dark" size="sm">Most popular</Badge>
					</div>
				{/if}

				<div class="relative z-10 mb-7 flex items-center justify-between">
					<div
						class={cn(
							"flex size-11 items-center justify-center rounded-2xl",
							plan.is_popular ? "bg-white/10 text-on-dark" : "bg-surface-strong text-ink"
						)}
					>
						<Icon class="size-5" />
					</div>
				</div>

				<div class="relative z-10 mb-2">
					<h3 class={cn("font-display text-2xl font-light tracking-tight", plan.is_popular ? "text-on-dark" : "text-ink")}>
						{plan.title}
					</h3>
					<p class={cn("mt-2 min-h-[44px] text-sm leading-relaxed", plan.is_popular ? "text-on-dark-soft" : "text-body")}>
						{plan.description}
					</p>
				</div>

				<div class="relative z-10 mb-8 flex items-baseline gap-1">
					<span class={cn("text-base", plan.is_popular ? "text-on-dark-soft" : "text-muted-ink")}>$</span>
					<span class={cn("font-display text-5xl font-light tracking-tight", plan.is_popular ? "text-on-dark" : "text-ink")}>
						{plan.price}
					</span>
					<span class={cn("text-sm", plan.is_popular ? "text-on-dark-soft" : "text-muted-ink")}>/mo</span>
				</div>

				<ul class="relative z-10 mb-8 flex-1 space-y-3">
					{#each plan.features as feature (feature)}
						<li class="flex items-start gap-3 text-sm">
							<Check
								class={cn(
									"mt-0.5 size-4 shrink-0",
									plan.is_popular ? "text-on-dark" : "text-ink"
								)}
							/>
							<span class={plan.is_popular ? "text-on-dark-soft" : "text-body"}>{feature}</span>
						</li>
					{/each}
				</ul>

				<a
					href={`/auth/sign-in?plan=${plan.title.toLowerCase()}`}
					class={cn(
						buttonVariants({
							variant: plan.is_popular ? "on-dark" : "outline",
							size: "lg"
						}),
						"relative z-10 w-full"
					)}
				>
					{plan.price === "0" ? "Start for free" : "Subscribe now"}
				</a>

				{#if plan.price === "0"}
					<p class="relative z-10 mt-4 text-center text-xs text-muted-ink">
						No credit card required
					</p>
				{/if}
			</article>
		{/each}
	</div>

	<!-- Enterprise note -->
	<div class="relative z-10 mt-20 border-t border-hairline pt-10 text-center">
		<p class="text-body">
			Building something bigger?
			<a href="/contact" class="font-medium text-ink underline-offset-4 hover:underline">
				Contact our team
			</a>
			for custom limits and volume pricing.
		</p>
	</div>
</section>
