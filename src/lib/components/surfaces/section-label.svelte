<script lang="ts">
import type { IconComponent } from "$lib/icon";
import { cn } from "$lib/utils";

/** The one section eyebrow. The glyph is neutral, because an icon that only
 *  labels a heading is not an accent. */
let {
	icon: Icon,
	label,
	class: className = ""
}: {
	icon?: IconComponent;
	label: string;
	class?: string;
} = $props();
</script>

<span class={cn("text-body-sm text-foreground inline-flex items-center gap-2 font-medium", className)}>
	{#if Icon}
		<Icon class="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
	{/if}
	{label}
</span>
