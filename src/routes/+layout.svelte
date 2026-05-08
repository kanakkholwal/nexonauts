<script lang="ts">
	import "../app.css";
	import "../codebox.css";
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "svelte-sonner";
	import { page } from "$app/state";
	import { beforeNavigate, afterNavigate } from "$app/navigation";
	import nProgress from "nprogress";
	import "nprogress/nprogress.css";

	nProgress.configure({ showSpinner: false, minimum: 0.16 });

	beforeNavigate(() => nProgress.start());
	afterNavigate(() => nProgress.done());

	let { children, data } = $props();
</script>

<svelte:head>
	{#if page.data.meta?.title}<title>{page.data.meta.title}</title>{/if}
	{#if page.data.meta?.description}
		<meta name="description" content={page.data.meta.description} />
	{/if}
</svelte:head>

<ModeWatcher defaultMode="system" />
<Toaster richColors closeButton position="top-right" />

{@render children()}
