<script lang="ts">
import type { Snippet } from "svelte";

type Props = { title: string; body: string; actions: Snippet };
let { title, body, actions }: Props = $props();
</script>

<!-- One flat colour, cut hard against the page. No gradient, no grid overlay:
     the only thing carrying it is the edge. -->
<section class="bg-field text-field-foreground">
	<div class="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-28">
		<h2 class="text-poster text-field-foreground max-w-4xl font-medium tracking-tight text-balance">
			{title}
		</h2>
		<p class="text-body-lg text-field-muted mt-8 max-w-xl text-pretty">{body}</p>
		<div class="mt-10 flex flex-wrap items-center gap-3">
			{@render actions()}
		</div>
	</div>
</section>
