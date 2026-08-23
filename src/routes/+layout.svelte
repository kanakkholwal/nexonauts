<script lang="ts">
import "../app.css";
import "../codebox.css";
import nProgress from "nprogress";
import { afterNavigate, beforeNavigate } from "$app/navigation";
import { page } from "$app/state";
import { Toaster } from "$lib/components/ui/sonner";
import "nprogress/nprogress.css";

nProgress.configure({ showSpinner: false, minimum: 0.16 });

beforeNavigate(() => nProgress.start());
afterNavigate(() => nProgress.done());

let { children } = $props();
</script>

<svelte:head>
	{#if page.data.meta?.title}<title>{page.data.meta.title}</title>{/if}
	{#if page.data.meta?.description}
		<meta name="description" content={page.data.meta.description} />
	{/if}
</svelte:head>

<Toaster richColors closeButton position="top-right" />

<a
	href="#main"
	class="sr-only rounded-lg bg-foreground px-3 py-2 text-body-sm font-medium text-background focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-100"
>
	Skip to content
</a>

<!-- Column guides. Two hairlines at the content column's edges running the full
     viewport height, so every section reads as sitting on one ruled page rather
     than floating independently. -->
<div
	aria-hidden="true"
	class="pointer-events-none fixed inset-y-0 left-1/2 -z-10 w-full max-w-6xl -translate-x-1/2 border-x border-border-low"
></div>

{@render children()}
