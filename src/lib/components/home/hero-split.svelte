<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import { appConfig } from "@/project.config";
import { Button } from "$lib/components/ui/button";
import { revealChildren } from "$lib/motion/enter";
import HeroMachine from "./hero-machine.svelte";

const facts = [
	["No account", "Nothing here asks you to sign in."],
	["Nothing uploaded", "Files are read where they already are."],
	["Public repositories", "Every product has source you can read."]
];
</script>

<!-- pt-24 keeps the panel clear of the floating nav: the nav is unchanged, so
     nothing of it is ever placed over the illustration. -->
<section
	class="border-border grid grid-cols-1 border-b pt-24 lg:grid-cols-12 lg:items-stretch lg:pt-28"
>
	<div class="split-pad-inline flex flex-col justify-center pt-4 pb-14 lg:col-span-7 lg:py-20">
		<h1 class="text-display lg:text-display-xl text-foreground font-medium tracking-tight">
			Everything we build, we give away.
		</h1>

		<p class="text-body-lg text-muted-foreground mt-6 max-w-xl text-pretty">
			Open a tab and the work starts. No sign-up, no upload, no waiting on a queue that is not
			yours. The software runs where you already are, and the files never go anywhere else.
		</p>

		<div class="mt-9 flex flex-wrap items-center gap-3">
			<Button href="/dev-tools" variant="primary" size="lg">
				Open a tool
				<IconArrowRight class="size-4" aria-hidden="true" />
			</Button>
			<Button
				href={appConfig.githubRepo}
				variant="outline"
				size="lg"
				target="_blank"
				rel="noopener noreferrer"
			>
				<IconBrandGithub class="size-4" aria-hidden="true" />
				Read the source
			</Button>
		</div>

		<dl class="border-border mt-12 grid grid-cols-1 gap-px border-t sm:grid-cols-3" use:revealChildren>
			{#each facts as [term, detail] (term)}
				<div class="border-border pt-4 sm:border-r sm:pr-4 sm:last:border-r-0">
					<dt class="text-body-sm text-foreground font-medium">{term}</dt>
					<dd class="text-caption text-muted-foreground mt-1 text-pretty">{detail}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<HeroMachine
		class="border-border h-72 border-t sm:h-96 lg:col-span-5 lg:h-auto lg:min-h-[34rem] lg:border-t-0 lg:border-l"
	/>
</section>
