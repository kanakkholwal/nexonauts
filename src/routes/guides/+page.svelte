<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
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

<header>
	<Navbar />
</header>

<main class="mx-auto min-h-screen max-w-4xl px-6 pt-24 pb-20">
	<div class="mb-12">
		<h1 class="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">Guides</h1>
		<p class="text-muted-foreground mt-3 max-w-xl text-base">
			Code on one side, why-it-works on the other.
		</p>
	</div>

	{#if data.pages.length === 0}
		<p class="text-muted-foreground text-sm">No guides yet. Check back soon.</p>
	{:else}
		<ul class="divide-border divide-y border-y border-border">
			{#each data.pages as page (page.slugs.join("/"))}
				<li>
					<a
						href={guideHref(page.slugs)}
						class="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-muted/40"
					>
						<div>
							<h2 class="text-foreground text-base font-semibold">{page.title}</h2>
							{#if page.description}
								<p class="text-muted-foreground mt-1 text-sm">{page.description}</p>
							{/if}
							{#if page.tags.length > 0}
								<div class="mt-2 flex flex-wrap gap-1.5">
									{#each page.tags as tag (tag)}
										<span
											class="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px] font-medium"
										>
											{tag}
										</span>
									{/each}
								</div>
							{/if}
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
