<script lang="ts">
import IconArrowDown from "@tabler/icons-svelte/icons/arrow-down";
import IconCheck from "@tabler/icons-svelte/icons/check";
import { Button } from "$lib/components/ui/button";
import HeroCanvas from "./hero-canvas.svelte";
</script>

<section class="relative isolate overflow-clip bg-muted" data-motion="hero">
	<div
		class="mx-auto grid w-full max-w-page items-center gap-12 px-5 pt-28 pb-16 sm:px-10 md:min-h-[88dvh] md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:pt-32 md:pb-20 lg:px-14"
	>
		<div data-motion="hero-copy">
			<span
				class="enter flex w-fit -rotate-2 items-center gap-2 rounded-md border border-border p-0.5 pl-2.5 text-caption font-semibold text-foreground"
			>
				<span><span class="text-primary">Includes</span> four products</span>
				<span class="rounded-sm border border-border bg-background p-1">
					<IconCheck class="size-3.75" aria-hidden="true" />
				</span>
			</span>
			<h1
				class="enter mt-5 max-w-[16ch] text-heading-lg font-medium text-balance md:text-display lg:text-display-xl"
			>
				Developer tools that do their work
				<span class="text-primary">on your machine</span>
			</h1>
			<p class="enter mt-5 max-w-[44ch] text-body-lg text-pretty text-muted-foreground">
				Merge a PDF, record a demo, compile LaTeX, build your docs. Each one runs where you
				already work.
			</p>
			<div class="enter mt-7">
				<Button
					href="#products"
					size="lg"
					class="group/cta gap-2.5 rounded-md px-5 font-semibold"
				>
					See the products
					<span
						class="grid size-6 place-items-center rounded-sm bg-action-foreground/15 transition-transform duration-(--duration-ui) ease-(--ease-out) group-hover/cta:translate-y-0.5 motion-reduce:transition-none"
						aria-hidden="true"
					>
						<IconArrowDown class="size-3.5" />
					</span>
				</Button>
			</div>
		</div>

		<div class="max-md:hidden">
			<HeroCanvas />
		</div>
	</div>
</section>

<style>
	/* Entrance without a hidden resting state: with no JS the hero simply sits. */
	@media (prefers-reduced-motion: no-preference) {
		.enter {
			transition:
				opacity var(--duration-enter) var(--ease-out),
				transform var(--duration-enter) var(--ease-out);
		}
		.enter:nth-child(2) {
			transition-delay: 80ms;
		}
		.enter:nth-child(3) {
			transition-delay: 160ms;
		}
		.enter:nth-child(4) {
			transition-delay: 240ms;
		}
		@starting-style {
			.enter {
				opacity: 0;
				transform: translateY(16px);
			}
		}
	}

</style>
