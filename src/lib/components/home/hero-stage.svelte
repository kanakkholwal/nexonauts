<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import { appConfig } from "@/project.config";
import { Button } from "$lib/components/ui/button";
import HeroObject from "./hero-object.svelte";

const facts = ["Free", "No account", "Nothing uploaded", "Public repositories"];
</script>

<!-- The stage starts below the navbar rather than under it. The nav is exempt
     from changes and its links are --muted-foreground, which measures 2.5:1 on
     this surface, so the surface gets out of its way instead. -->
<div class="bg-background pt-16">
	<!-- One stage, not two columns: the form crops into the upper right, the copy
	     anchors to the lower left, and the facts close the stage as a hairline
	     band. The form has its own grid row, so nothing is laid over it. -->
	<section
		class="bg-stage text-stage-foreground border-border relative isolate grid min-h-[calc(90svh-4rem)] grid-rows-[1fr_auto_auto] overflow-hidden border-y"
	>
		<div class="relative min-h-52 sm:min-h-64">
			<HeroObject class="absolute inset-0" shiftX={-0.6} shiftY={-0.5} zoom={3.1} />
		</div>

		<div class="split-pad-inline relative z-10 pt-6 pb-12 lg:pb-16">
			<h1
				class="text-display lg:text-display-xl text-stage-foreground max-w-3xl font-medium tracking-tight text-balance"
			>
				Everything we build, we give away.
			</h1>

			<div class="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
				<p class="text-body-lg text-stage-muted max-w-xl text-pretty">
					Open a tab and the work starts. No sign-up, no upload, no waiting on a queue that is not
					yours. The software runs where you already are, and the files never go anywhere else.
				</p>

				<div class="flex shrink-0 flex-wrap items-center gap-6">
					<Button href="/dev-tools" variant="primary" size="lg">
						Open a tool
						<IconArrowRight class="size-4" aria-hidden="true" />
					</Button>
					<!-- Hand styled rather than a Button variant: every variant resolves
					     its ink from the theme, and this surface does not change with it. -->
					<a
						href={appConfig.githubRepo}
						target="_blank"
						rel="noopener noreferrer"
						class="text-body-sm text-stage-foreground focus-visible:ring-stage-foreground rounded-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
					>
						Read the source
					</a>
				</div>
			</div>
		</div>

		<ul
			class="border-stage-rule text-caption text-stage-muted split-pad-inline relative z-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t py-4 font-mono tracking-wide uppercase"
		>
			{#each facts as fact, i (fact)}
				<li class="flex items-center gap-6">
					{#if i > 0}
						<span aria-hidden="true" class="bg-stage-rule size-1 rounded-full"></span>
					{/if}
					{fact}
				</li>
			{/each}
		</ul>
	</section>
</div>
