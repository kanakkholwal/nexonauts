<script lang="ts">
import Footer from "$lib/components/common/footer.svelte";
import IslandNav from "$lib/components/common/island-nav.svelte";

let { children } = $props();
</script>

<IslandNav />

<main id="main" class="mb-24 md:mb-32">
	{@render children()}
</main>
<Footer />
