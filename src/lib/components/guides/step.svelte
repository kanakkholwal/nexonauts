<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		title,
		kind = "code",
		children
	}: {
		title?: string;
		kind?: "code" | "output";
		children?: Snippet;
	} = $props();
</script>

<section class="guide-step" class:guide-step--output={kind === "output"}>
	<div class="guide-step__text">
		{#if title}
			<h3 class="guide-step__title">{title}</h3>
		{/if}
		{@render children?.()}
	</div>
</section>
