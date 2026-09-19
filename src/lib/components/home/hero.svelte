<script lang="ts">
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import { appConfig } from "@/project.config";
import { Button } from "$lib/components/ui/button";
import { cn } from "$lib/utils";

// With the notched nav the hero becomes a framed panel the bar is cut into.
const framed = appConfig.flags.notchedNav;
</script>

<section
	class={cn(
		"relative isolate overflow-clip",
		framed && "md:mx-2 md:mt-2 md:rounded-stage md:border md:border-border md:bg-card"
	)}
	data-motion="hero"
>
	<!-- Dark mode only: a soft beam and a glow, so true black reads as lit rather than empty. -->
	<div class="light pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
		<div class="beam" data-motion="light-beam"></div>
		<div class="glow" data-motion="light-glow"></div>
	</div>

	<div class="mx-auto w-full max-w-page px-4 pt-24 pb-8 sm:px-8 sm:pt-38 sm:pb-14 lg:px-10">
		<div data-motion="hero-copy">
			<h1
				class="enter max-w-[14ch] text-heading-lg font-medium text-balance md:text-display lg:text-display-xl"
			>
				Nexonauts makes developer tools.
			</h1>
			<p class="enter mt-5 max-w-[52ch] text-body-lg text-pretty text-muted-foreground">
				A small lab behind Orbit, Recast, Glyphtex and Docvia. It also publishes guides on
				what it learns while building them. Source on GitHub.
			</p>
			<div class="enter mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
				<Button href="#products" size="lg">See the products</Button>
				<a
					href={appConfig.githubRepo}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-11 items-center justify-center gap-1 rounded-md text-body-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					GitHub
					<IconChevronRight class="size-4" aria-hidden="true" />
				</a>
			</div>
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
		@starting-style {
			.enter {
				opacity: 0;
				transform: translateY(16px);
			}
		}
	}

	.light {
		display: none;
	}
	:global([data-theme="dark"]) .light {
		display: block;
	}
	.beam {
		position: absolute;
		inset: -20% -10%;
		background: linear-gradient(
			112deg,
			transparent 34%,
			color-mix(in srgb, white 5%, transparent) 50%,
			transparent 66%
		);
		will-change: transform;
	}
	.glow {
		position: absolute;
		top: -30%;
		left: -10%;
		width: 60%;
		height: 90%;
		background: radial-gradient(
			ellipse at center,
			color-mix(in srgb, white 7%, transparent) 0%,
			transparent 62%
		);
		will-change: transform;
	}
</style>
