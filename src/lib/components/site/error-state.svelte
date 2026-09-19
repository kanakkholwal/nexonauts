<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import { appConfig } from "@/project.config";
import { Button } from "$lib/components/ui/button";
import { NotchedShelf } from "$lib/components/ui/notched-shelf";

type Destination = { label: string; href: string };

type Props = {
	status: number;
	title: string;
	accent?: string;
	lede: string;
	/** Shown collapsed on non-404s only, never on a 404. */
	detail?: string;
	destinations?: Destination[];
};

let { status, title, accent, lede, detail, destinations = [] }: Props = $props();

const showDestinations = $derived(status === 404 && destinations.length > 0);
const showDetail = $derived(status !== 404 && Boolean(detail));
</script>

<!-- The same tinted opening band every public page uses, so the nav shelf has a second
     surface to notch into. On --background the shelf is white on white and disappears. -->
<section class="relative isolate overflow-clip bg-muted" aria-labelledby="error-title">
	<div class="mx-auto w-full max-w-page px-5 pt-32 pb-20 sm:px-10 md:pt-40 md:pb-28 lg:px-14">
		<p class="enter font-mono text-caption tracking-wider text-muted-foreground uppercase">
			Error {status}
		</p>
		<h1
			id="error-title"
			class="enter mt-3 max-w-[16ch] text-heading-lg font-medium text-balance md:text-display"
		>
			{title}
			{#if accent}
				<span class="text-primary">{accent}</span>
			{/if}
		</h1>
		<p class="enter mt-5 max-w-[48ch] text-body-lg text-pretty text-muted-foreground">{lede}</p>
		<div class="enter mt-8 flex flex-wrap items-center gap-3">
			<Button href="/" size="lg" class="gap-2.5 rounded-md px-5 font-semibold">
				Back to the homepage
				<span
					class="grid size-6 place-items-center rounded-sm bg-action-foreground/15"
					aria-hidden="true"
				>
					<IconArrowRight class="size-3.5" />
				</span>
			</Button>
			<Button
				href={appConfig.githubRepo}
				variant="accent"
				size="lg"
				class="rounded-md"
				target="_blank"
				rel="noopener noreferrer"
			>
				Report it
				<IconArrowUpRight class="size-4" aria-hidden="true" />
			</Button>
		</div>
	</div>

	<span class="ghost" aria-hidden="true">{status}</span>
</section>

{#if showDestinations || showDetail}
	<section class="relative isolate bg-background pt-16 md:pt-24">
		<div class="pointer-events-none absolute inset-x-0 top-0 hidden md:block">
			<NotchedShelf fill="text-muted" align="start">
				<p
					class="px-5 font-mono text-caption tracking-wider whitespace-nowrap text-muted-foreground uppercase"
				>
					Still here
				</p>
			</NotchedShelf>
		</div>

		<div class="mx-auto w-full max-w-page px-5 pb-24 sm:px-10 md:pb-32 lg:px-14">
			{#if showDestinations}
				<nav aria-label="Popular destinations">
					<ul class="divide-y divide-border border-y border-border">
						{#each destinations as d (d.href)}
							<li>
								<a
									href={d.href}
									class="group flex min-h-16 items-center justify-between gap-4 px-2 text-body-lg text-muted-foreground transition-colors duration-(--duration-ui) ease-(--ease-out) hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
								>
									{d.label}
									<IconArrowRight
										class="size-4 shrink-0 transition-transform duration-(--duration-ui) ease-(--ease-out) group-hover:translate-x-0.5 motion-reduce:transition-none"
										aria-hidden="true"
									/>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			{/if}

			{#if showDetail}
				<details class="max-w-[68ch] border-b border-border">
					<summary
						class="min-h-14 cursor-pointer py-4 text-body-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
					>
						Technical detail
					</summary>
					<p class="pb-4 font-mono text-caption text-muted-foreground">{detail}</p>
				</details>
			{/if}
		</div>
	</section>
{/if}

<style>
	/* The chapter numeral from the homepage: a status code is the one number worth that size. */
	.ghost {
		position: absolute;
		right: 2vw;
		bottom: -0.22em;
		z-index: -1;
		font-family: var(--font-heading);
		font-size: clamp(9rem, 26vw, 22rem);
		font-weight: 500;
		line-height: 1;
		color: color-mix(in srgb, var(--foreground) 5%, transparent);
		user-select: none;
	}

	/* Entrance without a hidden resting state: with no JS the band simply sits. */
	@media (prefers-reduced-motion: no-preference) {
		.enter {
			transition:
				opacity var(--duration-enter) var(--ease-out),
				transform var(--duration-enter) var(--ease-out);
		}
		.enter:nth-child(2) {
			transition-delay: 70ms;
		}
		.enter:nth-child(3) {
			transition-delay: 140ms;
		}
		.enter:nth-child(4) {
			transition-delay: 210ms;
		}
		@starting-style {
			.enter {
				opacity: 0;
				transform: translateY(14px);
			}
		}
	}
</style>
