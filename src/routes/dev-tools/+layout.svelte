<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";

	let { children } = $props();
</script>

<Navbar />
<main
	class="@container relative mx-auto w-full max-w-(--max-app-width) grow px-4 pt-[70px] sm:px-12 xl:px-0"
>
	{@render children()}
</main>
<Footer />
