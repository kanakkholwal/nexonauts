<script lang="ts">
	import { marked } from "marked";

	let { content }: { content: string } = $props();

	marked.setOptions({ gfm: true, breaks: false });

	const html = $derived(typeof content === "string" ? (marked.parse(content) as string) : "");
</script>

<article class="prose prose-zinc dark:prose-invert prose-pre:overflow-x-auto max-w-none">
	{@html html}
</article>
