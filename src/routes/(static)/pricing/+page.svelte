<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { buttonVariants } from "$lib/components/ui/button";
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

<div class="bg-background relative min-h-screen overflow-hidden selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div
			class="absolute top-0 left-1/2 h-96 w-[90%] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-12 xl:px-6">
		<div class="mx-auto mb-20 max-w-3xl space-y-4 text-center">
			<h1 class="text-foreground text-4xl font-bold tracking-tight md:text-6xl">
				Simple pricing for <br />
				<span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
					serious developers.
				</span>
			</h1>
			<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
				Start for free, upgrade when you ship. No hidden fees, cancel anytime.
			</p>
		</div>

		<section class="w-full">
			<div class="mb-12 flex justify-center">
				<div class="bg-muted/50 relative inline-flex items-center rounded-full p-1">
					<button
						type="button"
						onclick={() => (billingCycle = "monthly")}
						class={cn(
							"rounded-full px-6 py-2 text-sm font-medium transition-all duration-300",
							billingCycle === "monthly"
								? "bg-background text-foreground shadow-sm"
								: "text-muted-foreground hover:text-foreground"
						)}
					>
						Monthly
					</button>
					<button
						type="button"
						onclick={() => (billingCycle = "yearly")}
						class={cn(
							"flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all duration-300",
							billingCycle === "yearly"
								? "bg-background text-foreground shadow-sm"
								: "text-muted-foreground hover:text-foreground"
						)}
					>
						Yearly
						<span
							class="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-600"
						>
							-20%
						</span>
					</button>
				</div>
			</div>

			<div class="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
				{#each pricing_plans as plan (plan.title)}
					{@const Icon = plan.icon}
					<div
						class={cn(
							"relative flex flex-col rounded-3xl p-8 transition-all duration-300",
							plan.is_popular
								? "bg-card border-primary/50 shadow-primary/10 z-10 scale-105 border-2 shadow-2xl"
								: "bg-card/40 border-border/50 hover:border-primary/30 hover:bg-card/60 border backdrop-blur-sm"
						)}
					>
						{#if plan.is_popular}
							<div class="absolute -top-4 left-0 right-0 flex justify-center">
								<Badge
									variant="default"
									class="bg-primary text-primary-foreground hover:bg-primary shadow-primary/20 rounded-full px-4 py-1 shadow-lg"
								>
									Most Popular
								</Badge>
							</div>
						{/if}

						<div class="mb-8">
							<div class="mb-4 flex items-center justify-between">
								<div
									class={cn(
										"flex h-10 w-10 items-center justify-center rounded-xl",
										plan.is_popular
											? "bg-primary/10 text-primary"
											: "bg-muted text-muted-foreground"
									)}
								>
									<Icon class="h-5 w-5" />
								</div>
							</div>
							<h3 class="text-foreground text-xl font-bold">{plan.title}</h3>
							<p class="text-muted-foreground mt-2 min-h-[40px] text-sm">{plan.description}</p>
						</div>

						<div class="mb-8 flex items-baseline gap-1">
							<span class="text-muted-foreground text-lg font-medium">$</span>
							<span class="text-foreground text-5xl font-bold tracking-tight">{plan.price}</span>
							<span class="text-muted-foreground">/mo</span>
						</div>

						<ul class="mb-8 flex-1 space-y-4">
							{#each plan.features as feature (feature)}
								<li class="flex items-start gap-3 text-sm">
									<div class="mt-1 shrink-0">
										<Check class="text-primary h-4 w-4" />
									</div>
									<span class="text-muted-foreground">{feature}</span>
								</li>
							{/each}
						</ul>

						<a
							href={`/signup?plan=${plan.title.toLowerCase()}`}
							class={cn(
								buttonVariants({ variant: plan.is_popular ? "default" : "outline" }),
								"h-12 w-full rounded-xl font-semibold",
								plan.is_popular
									? "bg-primary text-primary-foreground shadow-primary/25 hover:bg-primary/90 shadow-lg"
									: "border-border hover:bg-muted bg-transparent"
							)}
						>
							{plan.price === "0" ? "Start for free" : "Subscribe Now"}
						</a>

						{#if plan.price === "0"}
							<p class="text-muted-foreground mt-4 text-center text-xs">
								No credit card required
							</p>
						{/if}
					</div>
				{/each}
			</div>

			<div class="border-border/50 mt-20 border-t pt-10 text-center">
				<p class="text-muted-foreground">
					Building something bigger?
					<a href="/contact" class="text-primary font-medium hover:underline">
						Contact our Enterprise team
					</a>
					for custom limits and volume pricing.
				</p>
			</div>
		</section>
	</div>
</div>
