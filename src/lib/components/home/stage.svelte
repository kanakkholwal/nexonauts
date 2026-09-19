<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "$lib/utils";

type Props = { class?: string; ratio?: "wide" | "tile"; children: Snippet };
let { class: className, ratio = "wide", children }: Props = $props();
</script>

<!-- A bordered frame for an illustration. Elevation is the hairline, never a shadow. -->
<div
	class={cn(
		"relative overflow-clip rounded-stage border border-border bg-card",
		ratio === "wide" ? "aspect-[16/10]" : "aspect-[16/10] rounded-card",
		className
	)}
>
	{@render children()}
</div>
