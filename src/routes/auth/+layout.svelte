<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";

	let { children } = $props();
</script>

<div class="bg-background min-h-screen w-full lg:grid lg:grid-cols-2">
	<!-- Left: brand surface, intentionally minimal for now -->
	<div
		class="relative hidden h-full overflow-hidden border-r border-white/10 bg-zinc-950 lg:block"
	>
		<div
			class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
		></div>
		<div
			class="bg-primary/20 pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
		></div>
	</div>

	<!-- Right: center card with logo above -->
	<div
		class="relative flex h-full min-h-screen flex-col items-center justify-center p-6 lg:p-8"
	>
		<div class="absolute top-6 left-6 lg:top-8 lg:left-8">
			<a
				href="/"
				class={cn(
					buttonVariants({ variant: "ghost" }),
					"text-muted-foreground hover:text-foreground gap-2 pl-0"
				)}
			>
				<ArrowLeft class="h-4 w-4" />
				Back
			</a>
		</div>

		<div class="mx-auto w-full max-w-[400px]">
			{@render children()}
		</div>

		<div class="text-muted-foreground absolute bottom-6 w-full text-center text-xs">
			<a href="/tos" class="underline-offset-4 hover:underline">Terms</a>
			<span class="mx-2">•</span>
			<a href="/privacy" class="underline-offset-4 hover:underline">Privacy</a>
		</div>
	</div>
</div>
