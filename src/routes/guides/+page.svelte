<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";

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
	<GradientOrb hue="lavender" size="lg" opacity={0.32} class="-left-32 -top-12" />
	<GradientOrb hue="peach" size="md" opacity={0.25} class="-right-24 top-32" />

	<div class="relative z-10 mb-16">
		<p class="eyebrow text-muted-ink">Guides</p>
		<h1 class="display-xl mt-3 text-ink">Longer-form walkthroughs</h1>
		<p class="mt-5 max-w-xl text-base leading-relaxed text-body">
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
							<h2 class="font-display text-2xl font-light tracking-tight text-ink transition-colors group-hover:text-body-strong">{page.title}</h2>
							{#if page.description}
								<p class="mt-2 text-sm leading-relaxed text-body">{page.description}</p>
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
