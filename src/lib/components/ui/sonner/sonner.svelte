<script lang="ts">
import OctagonXIcon from "@tabler/icons-svelte/icons/alert-octagon";
import TriangleAlertIcon from "@tabler/icons-svelte/icons/alert-triangle";
import CircleCheckIcon from "@tabler/icons-svelte/icons/circle-check";
import InfoIcon from "@tabler/icons-svelte/icons/info-circle";
import Loader2Icon from "@tabler/icons-svelte/icons/loader-2";
import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";

let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme="light"
	class="toaster group"
	style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
	{...restProps}
>
	{#snippet loadingIcon()}
		<Loader2Icon class="size-4 animate-spin" />
	{/snippet}
	{#snippet successIcon()}
		<CircleCheckIcon class="size-4" />
	{/snippet}
	{#snippet errorIcon()}
		<OctagonXIcon class="size-4" />
	{/snippet}
	{#snippet infoIcon()}
		<InfoIcon class="size-4" />
	{/snippet}
	{#snippet warningIcon()}
		<TriangleAlertIcon class="size-4" />
	{/snippet}
</Sonner>
