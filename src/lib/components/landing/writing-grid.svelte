<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import { enterOnView } from "$lib/motion/enter";

type Entry = { title: string; href: string };

type Props = {
	guides: Entry[];
	topics: Entry[];
	counts: { tools: number; guides: number; topics: number; languages: number };
};

let { guides, topics, counts }: Props = $props();

// Real titles, not a count with nothing behind it. Counts come from the repo.
const columns = $derived([
	{
		label: "Learn by example",
		href: "/learn",
		meta: `${counts.topics} topics`,
		blurb: "Short programs that show one idea at a time, code beside the reason it works.",
		entries: topics.slice(0, 4)
	},
	{
		label: "Guides",
		href: "/guides",
		meta: counts.guides === 1 ? "1 guide" : `${counts.guides} guides`,
		blurb: "Longer walkthroughs for the topics that do not fit the by-example shape.",
		entries: guides.slice(0, 4)
	},
	{
		label: "Dev tools",
		href: "/dev-tools",
		meta: `${counts.tools} tools`,
		blurb: "Single purpose browser utilities for the jobs that interrupt real work.",
		entries: []
	}
]);
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
	{#each columns as col, i (col.href)}
		<section
			use:enterOnView={{ delay: i * 0.06 }}
			class="border-border bg-card flex flex-col rounded-2xl border p-6"
		>
			<div class="flex items-baseline justify-between gap-3">
				<h3 class="text-subheading text-foreground font-medium">{col.label}</h3>
				<span class="text-caption text-muted-foreground tabular-nums">{col.meta}</span>
			</div>
			<p class="text-body-sm text-muted-foreground mt-2 text-pretty">{col.blurb}</p>

			{#if col.entries.length > 0}
				<ul class="divide-border mt-4 divide-y">
					{#each col.entries as entry (entry.href)}
						<li>
							<a
								href={entry.href}
								class="ease-craft text-body-sm text-muted-foreground hover:text-foreground focus-visible:ring-ring flex min-h-11 items-center justify-between gap-2 transition-colors duration-200 first-letter:uppercase focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none"
							>
								{entry.title}
								<IconArrowRight class="size-3.5 shrink-0" aria-hidden="true" />
							</a>
						</li>
					{/each}
				</ul>
			{/if}

			<a
				href={col.href}
				class="ease-craft text-body-sm text-primary focus-visible:ring-ring mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 font-medium underline-offset-4 transition-colors duration-200 hover:underline focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none"
			>
				All {col.label.toLowerCase()}
				<IconArrowRight class="size-3.5" aria-hidden="true" />
			</a>
		</section>
	{/each}
</div>
