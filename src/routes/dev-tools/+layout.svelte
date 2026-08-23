<script lang="ts">
import Footer from "$lib/components/common/footer.svelte";
import IslandNav from "$lib/components/common/island-nav.svelte";

let { children } = $props();
</script>

<IslandNav />

<main id="main" class="relative">
	{@render children()}
</main>

<Footer />
