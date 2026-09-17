<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import { appConfig } from "@/project.config";
import TiltedChip from "$lib/components/site/tilted-chip.svelte";
import { Button } from "$lib/components/ui/button";
import { cn } from "$lib/utils";

type Destination = { label: string; href: string };

type Props = {
	status: number;
	title: string;
	accent?: string;
	lede: string;
	/** Shown collapsed on non-404s only, never on a 404. */
	detail?: string;
	destinations?: Destination[];
	class?: string;
};

let { status, title, accent, lede, detail, destinations = [], class: className }: Props = $props();

const showDestinations = $derived(status === 404 && destinations.length > 0);
const showDetail = $derived(status !== 404 && Boolean(detail));
</script>

<div class={cn("flex flex-col items-center px-6 py-24 text-center sm:py-32", className)}>
	<TiltedChip label={`Error ${status}`} glyph={false} />

	<h1 class="text-heading-lg text-foreground md:text-display mt-6 max-w-2xl text-balance font-medium">
		{title}
		{#if accent}
			<br />
			<span class="text-primary">{accent}</span>
		{/if}
	</h1>

	<p class="text-body text-muted-foreground mt-5 max-w-xl text-pretty">{lede}</p>

	<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
		<Button href="/" variant="primary">
			Back to the homepage
			<IconArrowRight class="size-4" aria-hidden="true" />
		</Button>
		<Button href={appConfig.githubRepo} variant="outline" target="_blank" rel="noopener noreferrer">
			Report it
			<IconArrowUpRight class="size-4" aria-hidden="true" />
		</Button>
	</div>

	{#if showDestinations}
		<nav aria-label="Popular destinations" class="mt-14 w-full max-w-md">
			<ul class="border-border divide-border divide-y border-y text-left">
				{#each destinations as d (d.href)}
					<li>
						<a
							href={d.href}
							class="ease-craft text-body-sm text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring flex min-h-11 items-center justify-between gap-3 px-4 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none"
						>
							{d.label}
							<IconArrowRight class="size-4 shrink-0" aria-hidden="true" />
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}

	{#if showDetail}
		<details class="border-border bg-card mt-12 w-full max-w-xl rounded-2xl border text-left">
			<summary
				class="text-body-sm text-foreground focus-visible:ring-ring min-h-11 cursor-pointer px-4 py-3 font-medium focus-visible:ring-2 focus-visible:outline-none"
			>
				Technical detail
			</summary>
			<p class="text-caption text-muted-foreground border-border border-t px-4 py-3 font-mono">
				{detail}
			</p>
		</details>
	{/if}
</div>
