<script lang="ts">
import ArrowRight from "@lucide/svelte/icons/arrow-right";
import Footer from "$lib/components/common/footer.svelte";
import Navbar from "$lib/components/common/navbar.svelte";

let { data } = $props();
</script>

<svelte:head>
	<title>Learn by example | Nexonauts</title>
	<meta
		name="description"
		content="Short, self-contained programs that show one idea at a time, with the explanation right next to the code."
	/>
</svelte:head>

<Navbar />

<main class="relative isolate mx-auto min-h-screen max-w-4xl px-6 pt-24 pb-24">

	<div class="relative z-10 mb-16">
		<p class="eyebrow text-muted-ink">Learn</p>
		<h1 class="display-xl mt-3 text-ink">Learn by example</h1>
		<p class="mt-4 max-w-xl text-sm text-muted-foreground">
			Short, self-contained programs. One idea per page. Explanation on the left, code on the right,
			output at the bottom.
		</p>
	</div>

	{#if data.languages.length === 0}
		<p class="text-sm text-muted-ink">No languages yet.</p>
	{:else}
		<ul class="relative z-10 divide-y divide-hairline border-y border-hairline">
			{#each data.languages as lang (lang.code)}
				<li>
					<a
						href={`/learn/${lang.code}`}
						class="group flex items-center justify-between gap-6 py-7 transition-colors"
					>
						<div>
							<div class="flex items-baseline gap-3">
								<h2 class="font-display text-2xl font-medium tracking-tight text-ink group-hover:text-foreground">{lang.name}</h2>
								<span class="text-xs text-muted-ink"
									>{lang.topicCount} {lang.topicCount === 1 ? "topic" : "topics"}</span
								>
							</div>
							<p class="mt-2 text-sm text-muted-foreground">{lang.tagline}</p>
						</div>
						<ArrowRight
							class="size-4 shrink-0 text-muted-ink transition-all group-hover:text-ink group-hover:translate-x-1"
						/>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<Footer />
