<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";

	let { data } = $props();
</script>

<svelte:head>
	<title>Learn by example — Nexonauts</title>
	<meta
		name="description"
		content="Short, self-contained programs that show one idea at a time, with the explanation right next to the code."
	/>
</svelte:head>

<header>
	<Navbar />
</header>

<main class="mx-auto min-h-screen max-w-4xl px-6 pt-24 pb-20">
	<div class="mb-12">
		<h1 class="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">Learn by example</h1>
		<p class="text-muted-foreground mt-3 max-w-xl text-base">
			Short, self-contained programs. One idea per page. Explanation on the left, code on the right,
			output at the bottom.
		</p>
	</div>

	{#if data.languages.length === 0}
		<p class="text-muted-foreground text-sm">No languages yet.</p>
	{:else}
		<ul class="divide-border divide-y border-y border-border">
			{#each data.languages as lang (lang.code)}
				<li>
					<a
						href={`/learn/${lang.code}`}
						class="group flex items-center justify-between gap-4 py-6 transition-colors hover:bg-muted/40"
					>
						<div>
							<div class="flex items-baseline gap-3">
								<h2 class="text-foreground text-lg font-semibold">{lang.name}</h2>
								<span class="text-muted-foreground text-xs"
									>{lang.topicCount} {lang.topicCount === 1 ? "topic" : "topics"}</span
								>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">{lang.tagline}</p>
						</div>
						<ArrowRight
							class="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors"
						/>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<Footer />
