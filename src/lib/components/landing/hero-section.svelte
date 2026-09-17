<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconBook2 from "@tabler/icons-svelte/icons/book-2";
import { LocalMachine } from "$lib/components/illustrations";
import { TiltedChip } from "$lib/components/site";
import { Button } from "$lib/components/ui/button";
import { enterOnView } from "$lib/motion/enter";

type Props = { toolCount: number };
let { toolCount }: Props = $props();

const facts = ["No account", "Nothing uploaded", "Public repositories"];
</script>

<div
	class="grid grid-cols-1 items-center gap-12 pt-28 pb-10 sm:pt-32 lg:min-h-svh lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-36 lg:pb-16"
>
	<div class="flex flex-col" use:enterOnView>
		<TiltedChip label="Open source, runs locally" />

		<h1
			class="text-heading-lg sm:text-display lg:text-display-xl text-foreground mt-6 text-balance font-medium"
		>
			Tools that run on your machine,
			<span class="text-primary">not on someone else's server.</span>
		</h1>

		<p class="text-body md:text-body-lg text-muted-foreground mt-6 max-w-xl text-pretty">
			A PDF toolkit, a screen recorder, a LaTeX engine and a docs compiler. Each does its work
			without your file ever leaving the machine.
		</p>

		<div class="mt-9 flex flex-wrap items-center gap-3">
			<Button href="#tools" variant="primary" size="lg">
				Find a tool
				<IconArrowRight class="size-4" aria-hidden="true" />
			</Button>
			<Button href="/learn" variant="outline" size="lg">
				<IconBook2 class="size-4" aria-hidden="true" />
				Learn by example
			</Button>
		</div>

		<ul class="text-caption text-muted-foreground mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
			<li class="text-foreground font-medium">{toolCount} browser tools</li>
			{#each facts as fact (fact)}
				<li class="flex items-center gap-3">
					<span aria-hidden="true" class="bg-border-strong size-1 rounded-full"></span>
					{fact}
				</li>
			{/each}
		</ul>
	</div>

	<div class="min-w-0 lg:pl-6">
		<LocalMachine class="mx-auto max-h-[min(30rem,60svh)] w-full max-w-lg" />
	</div>
</div>
