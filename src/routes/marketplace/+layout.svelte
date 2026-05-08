<script lang="ts">
	import Navbar from "$lib/components/common/navbar.svelte";
	import Footer from "$lib/components/common/footer.svelte";

	let { children } = $props();
</script>

<div class="absolute top-0 left-0 z-0 min-h-80 w-full mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
	<div
		class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
	></div>
</div>

<div class="relative z-10">
	<Navbar />
	{@render children()}
	<Footer />
</div>
