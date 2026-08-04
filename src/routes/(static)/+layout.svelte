<script lang="ts">
  import Footer from "$lib/components/common/footer.svelte";
  import Navbar from "$lib/components/common/navbar.svelte";

  let { children } = $props();
</script>

<Navbar />

<main
  class="mx-auto mb-32 max-w-(--max-app-width) space-y-16 px-6 sm:px-8 md:mb-40 md:space-y-24"
>
  {@render children()}
</main>
<Footer />
