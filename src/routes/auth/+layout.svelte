<script lang="ts">
import ArrowLeft from "@lucide/svelte/icons/arrow-left";
import { appConfig } from "@/project.config";
import Logo from "$lib/components/logo.svelte";
import { buttonVariants } from "$lib/components/ui/button";
import { cn } from "$lib/utils";

let { children } = $props();
</script>

<div class="min-h-screen w-full bg-canvas lg:grid lg:grid-cols-[1.05fr_1fr]">
	<!-- Editorial brand panel: pastel orbs drifting on canvas-soft. -->
	<aside
		class="relative hidden h-full overflow-hidden bg-canvas-soft border-r border-hairline-soft lg:flex lg:flex-col lg:justify-between lg:p-12"
	>

		<div class="relative z-10 inline-flex items-center gap-2.5 text-ink">
			<Logo class="size-8" />
			<span class="font-sans text-xl font-light tracking-wide">{appConfig.name}</span>
		</div>

		<div class="relative z-10 max-w-md">
			<p class="display-md text-ink">
				Tools and writing<br />for the people who ship.
			</p>
			<p class="mt-4 text-base leading-relaxed text-muted-foreground">
				A small studio of developer tools and technical writing. Pick a tool, pick a guide, or
				keep up on the work.
			</p>
		</div>
	</aside>

	<!-- Right: centered form card on plain canvas. -->
	<section class="relative flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:p-12">
		<div class="absolute top-6 left-6 lg:top-8 lg:left-8">
			<a
				href="/"
				class={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 pl-2")}
			>
				<ArrowLeft class="size-4" />
				Back
			</a>
		</div>

		<!-- Mobile-only brand row -->
		<div class="mb-10 inline-flex items-center gap-2 text-ink lg:hidden">
			<Logo class="size-7" />
			<span class="font-sans text-lg font-medium tracking-wide">{appConfig.name}</span>
		</div>

		<div class="mx-auto w-full max-w-[400px]">
			{@render children()}
		</div>

		<div class="absolute bottom-6 w-full text-center text-xs text-muted-ink">
			<a href="/tos" class="underline-offset-4 hover:underline">Terms</a>
			<span class="mx-2">·</span>
			<a href="/privacy" class="underline-offset-4 hover:underline">Privacy</a>
		</div>
	</section>
</div>
