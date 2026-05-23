<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.langName} by example — Nexonauts</title>
	<meta
		name="description"
		content={`Short, focused ${data.langName} programs. One idea per page.`}
	/>
</svelte:head>

<header>
	<Navbar />
</header>

<main class="mx-auto min-h-screen max-w-4xl px-6 pt-24 pb-20">
	<a
		href="/learn"
		class={cn(
			buttonVariants({ variant: "ghost", size: "sm" }),
			"text-muted-foreground hover:text-foreground -ml-3 mb-6 gap-2"
		)}
	>
		<ArrowLeft class="size-4" />
		All languages
	</a>

	<div class="mb-12">
		<h1 class="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
			{data.langName} by example
		</h1>
		<p class="text-muted-foreground mt-3 max-w-xl text-base">
			Each topic is one program, broken into steps. Explanation on the left, code on the right.
		</p>
	</div>

	{#if data.topics.length === 0}
		<p class="text-muted-foreground text-sm">No topics yet.</p>
	{:else}
		<ol class="divide-border divide-y border-y border-border">
			{#each data.topics as topic, i (topic.topicSlug)}
				<li>
					<a
						href={`/learn/${data.lang}/${topic.topicSlug}`}
						class="group flex items-start justify-between gap-4 py-5 transition-colors hover:bg-muted/40"
					>
						<div class="flex items-start gap-4">
							<span
								class="text-muted-foreground inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border text-xs font-medium tabular-nums"
							>
								{i + 1}
							</span>
							<div>
								<h2 class="text-foreground text-base font-semibold">{topic.title}</h2>
								{#if topic.description}
									<p class="text-muted-foreground mt-1 text-sm">{topic.description}</p>
								{/if}
							</div>
						</div>
						<ArrowRight
							class="text-muted-foreground group-hover:text-foreground mt-1 size-4 shrink-0 transition-colors"
						/>
					</a>
				</li>
			{/each}
		</ol>
	{/if}
</main>

<Footer />
