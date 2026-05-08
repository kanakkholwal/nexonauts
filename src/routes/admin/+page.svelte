<script lang="ts">
	import StatsCard from "$lib/components/application/stats-card.svelte";
	import { cn } from "$lib/utils";
	import CircleDashed from "@lucide/svelte/icons/circle-dashed";
	import TrendingDown from "@lucide/svelte/icons/trending-down";
	import TrendingUp from "@lucide/svelte/icons/trending-up";
	import Users from "@lucide/svelte/icons/users";
	import Wrench from "@lucide/svelte/icons/wrench";

	let { data } = $props();

	function trendClass(trend: string) {
		return trend === "increase"
			? "text-green-500"
			: trend === "decrease"
				? "text-red-500"
				: "text-primary/80";
	}
</script>

<svelte:head>
	<title>Admin — Nexonauts</title>
</svelte:head>

<div class="my-5 space-y-6">
	<div>
		<h2 class="mb-2 text-3xl font-semibold">Hi, {data.session.user.name}</h2>
		<p class="text-muted-foreground">Let's check out your platform today!</p>
	</div>

	<div
		class="divide-border flex w-full flex-col justify-between gap-2 divide-y @4xl:flex-row @4xl:divide-x"
	>
		<div class="grid w-full grid-cols-1 gap-4 pr-1.5 @lg:grid-cols-2 @4xl:grid-cols-12 @4xl:pr-0">
			<StatsCard class="col-span-1 @4xl:col-span-4" title="Total Users">
				{#snippet icon()}
					<Users class="mr-2 inline-block size-4" />
				{/snippet}

				<div class={cn("text-3xl font-bold text-primary", trendClass(data.usersStats.trend))}>
					{data.usersStats.count.toLocaleString()}
					{#if data.usersStats.trend === "increase"}
						<span class="text-xs">↑{data.usersStats.growth.toFixed(2)}</span>
					{:else if data.usersStats.trend === "decrease"}
						<span class="text-xs">↓{Math.abs(data.usersStats.growth).toFixed(2)}</span>
					{/if}
				</div>

				<p class="text-muted-foreground text-xs">
					<span class={cn("text-base", trendClass(data.usersStats.trend))}>
						{#if data.usersStats.trend === "increase"}
							<TrendingUp class="mr-2 inline-block size-4" />
						{:else if data.usersStats.trend === "decrease"}
							<TrendingDown class="mr-2 inline-block size-4" />
						{:else}
							<CircleDashed class="mr-2 inline-block size-4" />
						{/if}
						{data.usersStats.growth.toFixed(2)}%
					</span>
					from this month
				</p>
			</StatsCard>

			<StatsCard class="col-span-1 @4xl:col-span-4" title="Total Tools">
				{#snippet icon()}
					<Wrench class="mr-2 inline-block size-4" />
				{/snippet}

				<div class={cn("text-3xl font-bold text-primary", trendClass(data.toolsStats.trend))}>
					{data.toolsStats.count.toLocaleString()}
					{#if data.toolsStats.trend === "increase"}
						<span class="text-xs">↑{data.toolsStats.growth.toFixed(2)}</span>
					{:else if data.toolsStats.trend === "decrease"}
						<span class="text-xs">↓{Math.abs(data.toolsStats.growth).toFixed(2)}</span>
					{/if}
				</div>

				<p class="text-muted-foreground text-xs">
					<span class={cn("text-base", trendClass(data.toolsStats.trend))}>
						{#if data.toolsStats.trend === "increase"}
							<TrendingUp class="mr-2 inline-block size-4" />
						{:else if data.toolsStats.trend === "decrease"}
							<TrendingDown class="mr-2 inline-block size-4" />
						{:else}
							<CircleDashed class="mr-2 inline-block size-4" />
						{/if}
						{data.toolsStats.growth.toFixed(2)}%
					</span>
					from this month
				</p>
			</StatsCard>
		</div>
	</div>
</div>
