<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";

	let { children } = $props();
</script>

<header>
	<Navbar />
</header>
<main class="mx-auto mb-40 max-w-7xl space-y-10 px-6 md:px-12 xl:px-6">
	{@render children()}
</main>
<Footer />
