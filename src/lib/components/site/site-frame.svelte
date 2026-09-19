<script lang="ts">
import type { Snippet } from "svelte";
import Footer from "$lib/components/common/footer.svelte";
import IslandNav from "$lib/components/common/island-nav.svelte";
import { cn } from "$lib/utils";

type Props = { class?: string; children: Snippet };
let { class: className, children }: Props = $props();
</script>

<!-- Owns the nav, main and footer, and id="main" so the skip link always has a target. -->
<div class={cn("relative flex min-h-screen w-full flex-col overflow-x-clip bg-background", className)}>
	<IslandNav />

	<main id="main" class="flex flex-1 flex-col">
		{@render children()}
	</main>

	<Footer />
</div>
