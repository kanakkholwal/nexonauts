<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";
	import { Renderer } from "@docvia/renderer-svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import { page as appPage } from "$app/state";

	let { data } = $props();

	const replyUrl = $derived(() => {
		const url = new URL("https://x.com/intent/tweet");
		const fullUrl = `${appPage.url.origin}${appPage.url.pathname}`;
		url.searchParams.set("text", `Reading "${data.title}" on Nexonauts ${fullUrl}`);
		return url.toString();
	});
</script>

<svelte:head>
	<title>{data.title} — Guides — Nexonauts</title>
	{#if data.description}
		<meta name="description" content={data.description} />
	{/if}
</svelte:head>

<header>
	<Navbar />
</header>

<main class="mx-auto min-h-screen max-w-3xl px-6 pt-24 pb-20">
	<a
		href="/guides"
		class={cn(
			buttonVariants({ variant: "ghost", size: "sm" }),
			"text-muted-foreground hover:text-foreground -ml-3 mb-6 gap-2"
		)}
	>
		<ArrowLeft class="size-4" />
		All guides
	</a>

	<article class="prose prose-zinc dark:prose-invert max-w-none">
		<header class="mb-8 not-prose">
			<h1 class="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">{data.title}</h1>
			{#if data.description}
				<p class="text-muted-foreground mt-3 text-base">{data.description}</p>
			{/if}
		</header>

		<Renderer nodes={data.content} />
	</article>

	<footer class="border-border mt-16 border-t pt-8">
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
