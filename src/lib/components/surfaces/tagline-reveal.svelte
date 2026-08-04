<script lang="ts">
	import { wordReveal } from "$lib/motion/enter";
	import { cn } from "$lib/utils";

	/** One entry per rendered line. Break where the thought breaks, not where the box ends. */
	let { lines, class: className }: { lines: string[]; class?: string } = $props();

	// Continuous index across lines keeps the stagger in reading order.
	let offsets = $derived(
		lines.reduce<number[]>((acc, line, i) => {
			acc.push(i === 0 ? 0 : acc[i - 1] + lines[i - 1].split(" ").length);
			return acc;
		}, [])
	);
</script>

<p
	use:wordReveal
	class={cn(
		"mx-auto max-w-[680px] text-center text-4xl font-semibold tracking-[-0.02em] sm:text-5xl",
		className
	)}
>
	{#each lines as line, li (line)}
		<span class="block">
			{#each line.split(" ") as word, wi (`${li}-${wi}-${word}`)}<span
					class="reveal-word"
					data-word
					data-index={offsets[li] + wi}>{word}</span
				>{" "}{/each}
		</span>
	{/each}
</p>
