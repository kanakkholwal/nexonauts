<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import { Renderer } from "@docvia/renderer-svelte";
	import { guideRegistry } from "$lib/guides/registry";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { page as appPage } from "$app/state";

	let { data } = $props();

	const replyUrl = $derived(() => {
		const url = new URL("https://x.com/intent/tweet");
		const fullUrl = `${appPage.url.origin}${appPage.url.pathname}`;
		url.searchParams.set(
			"text",
			`Reading "${data.title}" — ${data.langName} by example on Nexonauts ${fullUrl}`
		);
		return url.toString();
	});
</script>

<svelte:head>
	<title>{data.title} — {data.langName} by example — Nexonauts</title>
	{#if data.description}
		<meta name="description" content={data.description} />
	{/if}
</svelte:head>

<header>
	<Navbar />
</header>

<main class="mx-auto min-h-screen max-w-5xl px-6 pt-24 pb-20">
	<a
		href={`/learn/${data.lang}`}
		class={cn(
			buttonVariants({ variant: "ghost", size: "sm" }),
			"text-muted-foreground hover:text-foreground -ml-3 mb-6 gap-2"
		)}
	>
		<ArrowLeft class="size-4" />
		{data.langName} by example
	</a>

	<article class="prose prose-zinc dark:prose-invert max-w-none">
		<header class="not-prose mb-10">
			<p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
				{data.langName} by example
			</p>
			<h1 class="text-foreground mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
				{data.title}
			</h1>
			{#if data.description}
				<p class="text-muted-foreground mt-3 text-base">{data.description}</p>
			{/if}
		</header>

		<Renderer nodes={data.content} registry={guideRegistry} />
	</article>

	<nav
		class="border-border mt-16 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
	>
		<div class="min-w-0 flex-1">
			{#if data.prev}
				<a
					href={`/learn/${data.lang}/${data.prev.topicSlug}`}
					class="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-sm transition-colors"
				>
					<ArrowLeft class="size-4" />
					<span class="truncate">{data.prev.title}</span>
				</a>
			{/if}
		</div>
		<div class="min-w-0 flex-1 sm:text-right">
			{#if data.next}
				<a
					href={`/learn/${data.lang}/${data.next.topicSlug}`}
					class="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-sm transition-colors"
				>
					<span class="truncate">{data.next.title}</span>
					<ArrowRight class="size-4" />
				</a>
			{/if}
		</div>
	</nav>

	<footer class="border-border mt-10 border-t pt-8">
		<a
			href={replyUrl()}
			target="_blank"
			rel="noopener noreferrer"
			class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
		>
			Reply on X →
		</a>
	</footer>
</main>

<Footer />
