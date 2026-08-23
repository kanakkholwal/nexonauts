<script lang="ts">
import ArrowRight from "@lucide/svelte/icons/arrow-right";
import Footer from "$lib/components/common/footer.svelte";
import Navbar from "$lib/components/common/navbar.svelte";
import { Badge } from "$lib/components/ui/badge";

let { data } = $props();

function guideHref(slugs: string[]): string {
	const path = slugs.length > 0 ? slugs.join("/") : "";
	return path ? `/guides/${path}` : "/guides";
}
</script>

<svelte:head>
	<title>Guides — Nexonauts</title>
	<meta
		name="description"
		content="Topic-by-topic walkthroughs of the languages, patterns, and tools we actually reach for."
	/>
</svelte:head>

<Navbar />

<main class="relative isolate mx-auto min-h-screen max-w-4xl px-6 pt-24 pb-24">

	<div class="relative z-10 mb-16">
		<p class="eyebrow text-muted-ink">Guides</p>
		<h1 class="display-xl mt-3 text-ink">Longer-form walkthroughs</h1>
		<p class="mt-4 max-w-xl text-sm text-muted-foreground">
			Code on one side, why-it-works on the other.
		</p>
	</div>

	{#if data.pages.length === 0}
		<p class="text-sm text-muted-ink">No guides yet. Check back soon.</p>
	{:else}
		<ul class="relative z-10 divide-y divide-hairline border-y border-hairline">
			{#each data.pages as page (page.slugs.join("/"))}
				<li>
					<a
						href={guideHref(page.slugs)}
						class="group flex items-center justify-between gap-6 py-6 transition-colors"
					>
						<div>
							<h2 class="font-display text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-foreground">{page.title}</h2>
							{#if page.description}
								<p class="mt-2 text-sm text-muted-foreground">{page.description}</p>
							{/if}
							{#if page.tags.length > 0}
								<div class="mt-3 flex flex-wrap gap-1.5">
									{#each page.tags as tag (tag)}
										<Badge variant="default" size="sm">{tag}</Badge>
									{/each}
								</div>
							{/if}
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
