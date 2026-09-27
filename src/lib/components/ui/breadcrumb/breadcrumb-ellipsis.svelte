<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "$lib/cn";

let { class: classProp, ...rest }: { class?: string } & HTMLAttributes<HTMLSpanElement> =
	$props();
</script>

<span
	{...rest}
	role="presentation"
	aria-hidden="true"
	data-slot="breadcrumb-ellipsis"
	class={cn("px-0.5 text-muted-foreground", classProp)}
>
	&hellip;
	<span class="sr-only">More</span>
</span>
