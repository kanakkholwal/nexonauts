<script lang="ts">
  import Footer from "$lib/components/common/footer.svelte";
  import Navbar from "$lib/components/common/navbar.svelte";
  import { GradientOrb } from "@/lib/components/surfaces";

  let { children } = $props();
</script>

<Navbar />

<main
  class="mx-auto mb-32 max-w-(--max-app-width) space-y-16 px-6 sm:px-8 md:mb-40 md:space-y-24"
>
<GradientOrb
  hue="lavender"
  size="xl"
  opacity={0.5}
  class="-left-1/4 -top-1/4"
/>
<GradientOrb hue="peach" size="lg" opacity={0.4} class="-right-1/4 top-1/4" />
<GradientOrb hue="mint" size="md" opacity={0.3} class="left-1/3 -bottom-12" />
  {@render children()}
</main>
<Footer />
