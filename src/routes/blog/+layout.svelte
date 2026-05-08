<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";

	let { children } = $props();
</script>

<div
	aria-hidden="true"
	class="pattern-square_grid invert dark:invert-0 absolute inset-0 top-0 -z-1 grid grid-cols-2 -space-x-52"
></div>
<div class="@container mx-auto w-full max-w-[1440px]">
	<Navbar />
	{@render children()}
	<Footer />
</div>
