<script lang="ts">
import nProgress from "nprogress";
import { afterNavigate, beforeNavigate } from "$app/navigation";
import { page } from "$app/state";
import { Toaster } from "$lib/components/ui/sonner";
import "nprogress/nprogress.css";
import "../app.css";
import "../codebox.css";

nProgress.configure({ showSpinner: false, minimum: 0.16 });

beforeNavigate(() => nProgress.start());
afterNavigate(() => nProgress.done());

let { children } = $props();

// Fades the pre-paint splash out, then takes it out of the DOM so the attribute
// cannot make it reappear on a later render.
$effect(() => {
	const root = document.documentElement;
	root.setAttribute("data-done", "");
	const timer = setTimeout(() => {
		document.getElementById("boot")?.remove();
		root.removeAttribute("data-done");
	}, 220);
	return () => clearTimeout(timer);
});
</script>

<svelte:head>
	{#if page.data.meta?.title}<title>{page.data.meta.title}</title>{/if}
	{#if page.data.meta?.description}
		<meta name="description" content={page.data.meta.description} />
	{/if}
</svelte:head>

<Toaster richColors closeButton position="top-right" />

{@render children()}
