<script lang="ts">
import type { Snippet } from "svelte";
import Footer from "$lib/components/common/footer.svelte";
import IslandNav from "$lib/components/common/island-nav.svelte";
import { cn } from "$lib/utils";

type Props = { class?: string; children: Snippet };

let { class: className, children }: Props = $props();
</script>

<!-- Owns the nav, main, footer and rails. Pages never import Navbar or Footer
     directly, and id="main" lives here so the skip link always has a target. -->
<div class={cn("bg-canvas relative flex min-h-screen w-full flex-col overflow-x-clip", className)}>
	<IslandNav />

	<main id="main" class="flex flex-1 flex-col">
		{@render children()}
	</main>

	<Footer />

	<div
		aria-hidden="true"
		class="rail-column rail-dash pointer-events-none fixed inset-y-0 left-1/2 z-30 -translate-x-1/2 border-x-2"
	></div>
</div>
