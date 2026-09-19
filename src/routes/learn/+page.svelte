<script lang="ts">
import ArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import Footer from "$lib/components/common/footer.svelte";
import IslandNav from "$lib/components/common/island-nav.svelte";
import { PageHero } from "$lib/components/site";

let { data } = $props();
</script>

<svelte:head>
	<title>Learn by example | Nexonauts</title>
	<meta
		name="description"
		content="Short, self-contained programs that show one idea at a time, with the explanation right next to the code."
	/>
</svelte:head>

<IslandNav />

<PageHero
	eyebrow="Learn"
	title="Learn by example"
	lede="Short, self-contained programs. One idea per page, with the explanation beside the code and the output underneath."
/>

<main id="main" class="relative isolate mx-auto min-h-screen max-w-4xl px-6 pt-16 pb-24">

	{#if data.languages.length === 0}
		<p class="text-body-sm text-muted-foreground">No languages yet.</p>
	{:else}
		<ul class="relative z-10 divide-y divide-border border-y border-border">
			{#each data.languages as lang (lang.code)}
				<li>
					<a
						href={`/learn/${lang.code}`}
						class="group flex items-center justify-between gap-6 py-7 transition-colors"
					>
						<div>
							<div class="flex items-baseline gap-3">
								<h2 class="font-display text-subheading font-medium tracking-tight text-foreground group-hover:text-foreground">{lang.name}</h2>
								<span class="text-caption text-muted-foreground"
									>{lang.topicCount} {lang.topicCount === 1 ? "topic" : "topics"}</span
								>
							</div>
							<p class="mt-2 text-body-sm text-muted-foreground">{lang.tagline}</p>
						</div>
						<ArrowRight
							class="size-4 shrink-0 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-1"
						/>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<Footer />
