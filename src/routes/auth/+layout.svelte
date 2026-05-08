<script lang="ts">
	import { env } from "$env/dynamic/public";
	import { buttonVariants } from "$lib/components/ui/button";
	import Logo from "$lib/components/logo.svelte";
	import { cn } from "$lib/utils";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import Quote from "@lucide/svelte/icons/quote";
	import Sparkles from "@lucide/svelte/icons/sparkles";

	const SITE_NAME = env.PUBLIC_WEBSITE_NAME ?? "Nexonauts";

	let { children } = $props();
</script>

<div class="bg-background min-h-screen w-full lg:grid lg:grid-cols-2">
	<div
		class="relative hidden h-full flex-col overflow-hidden border-r border-white/10 bg-zinc-950 p-10 text-white lg:flex"
	>
		<div
			class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
		></div>
		<div
			class="bg-primary/20 pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
		></div>

		<a
			href="/"
			class="relative z-20 flex w-fit items-center gap-2 text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
		>
			<Logo class="size-8" />
			{SITE_NAME}
		</a>

		<div class="relative z-10 flex flex-1 items-center justify-center p-8">
			<div
				class="relative aspect-square w-full max-w-md rounded-3xl border border-white/10 bg-linear-to-tr from-white/5 to-white/0 p-2 shadow-2xl backdrop-blur-sm"
			>
				<div class="relative h-full w-full overflow-hidden rounded-2xl bg-black/20">
					<div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
					<div class="absolute right-6 bottom-6 left-6">
						<div
							class="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur-md"
						>
							<Sparkles class="h-3 w-3 text-yellow-300" />
							<span>Join 10,000+ Developers</span>
						</div>
						<h2 class="text-xl leading-tight font-bold">Build your portfolio faster.</h2>
					</div>
				</div>
			</div>
		</div>

		<div class="relative z-20 mt-auto">
			<div
				class="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
			>
				<Quote class="absolute top-4 left-4 h-6 w-6 rotate-180 text-white/20" />
				<blockquote class="space-y-4 pt-2 pl-2">
					<p class="text-lg leading-relaxed font-medium text-white/90">
						&ldquo;The only way to do great work is to love what you do. This platform helps me focus
						on exactly that.&rdquo;
					</p>
					<footer class="flex items-center gap-3">
						<div
							class="h-8 w-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-500"
						></div>
						<div class="text-sm">
							<div class="font-semibold text-white">Kanak</div>
							<div class="text-white/60">Founder of {SITE_NAME}</div>
						</div>
					</footer>
				</blockquote>
			</div>
		</div>
	</div>

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

		<div class="mx-auto w-full max-w-[400px] space-y-6">
			{@render children()}
		</div>

		<div class="text-muted-foreground absolute bottom-6 w-full text-center text-xs">
			<a href="/tos" class="underline-offset-4 hover:underline">Terms</a>
			<span class="mx-2">•</span>
			<a href="/privacy" class="underline-offset-4 hover:underline">Privacy</a>
		</div>
	</div>
</div>
