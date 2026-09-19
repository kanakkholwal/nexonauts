<script lang="ts">
import Footer from "$lib/components/common/footer.svelte";
import IslandNav from "$lib/components/common/island-nav.svelte";

let { children } = $props();
</script>

<IslandNav />

<main
  id="main"
  class="mx-auto mb-32 max-w-(--max-app-width) space-y-16 px-6 sm:px-8 md:mb-40 md:space-y-24"
>
  {@render children()}
</main>
<Footer />
