<script lang="ts">
import { cn } from "$lib/utils";

// Fixed artboards scaled to the container, so every absolute position below
// stays in one coordinate space instead of being re-tuned per breakpoint.
const DESKTOP = { width: 1440, height: 420 };
const TABLET = { width: 900, height: 460 };
const DESKTOP_MIN_WIDTH = 1024;

const FRAME_STAGGER = 90;
const CARD_STAGGER = 70;
const CARD_DELAY_BASE = FRAME_STAGGER * 3 + 40;

const frames = [
	{ url: "orbit.nexonauts.com", label: "Orbit" },
	{ url: "glyphtex.nexonauts.com", label: "Glyphtex" },
	{ url: "docvia.dev", label: "Docvia" }
];

let wrap = $state<HTMLDivElement | null>(null);
let scale = $state(1);
let isDesktop = $state(false);

let artboard = $derived(isDesktop ? DESKTOP : TABLET);

$effect(() => {
	const el = wrap;
	if (!el) return;

	const mql = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
	const update = () => {
		isDesktop = mql.matches;
		scale = el.clientWidth / (mql.matches ? DESKTOP : TABLET).width;
	};

	update();
	const observer = new ResizeObserver(update);
	observer.observe(el);
	mql.addEventListener("change", update);

	return () => {
		observer.disconnect();
		mql.removeEventListener("change", update);
	};
});
</script>

{#snippet browserFrame(url: string, rows: number)}
	<div
		class="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-frame"
	>
		<div class="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
			<span class="size-2 rounded-full bg-border-strong"></span>
			<span class="size-2 rounded-full bg-border-strong"></span>
			<span class="size-2 rounded-full bg-border-strong"></span>
			<span class="ml-2 truncate rounded-sm bg-background px-2 py-1 font-mono text-caption text-muted-foreground">
				{url}
			</span>
		</div>
		<div class="flex flex-1 flex-col gap-2 p-4">
			{#each Array(rows) as _, r (r)}
				<span
					class="block h-2 rounded-full bg-border"
					style="width: {[92, 74, 58, 84, 46, 68][r % 6]}%"
				></span>
			{/each}
		</div>
	</div>
{/snippet}

<div bind:this={wrap} class="relative w-full overflow-x-clip overflow-y-hidden">
	<div style="height: {artboard.height * scale}px"></div>

	<div
		aria-hidden="true"
		class="absolute top-0 left-0 origin-top-left will-change-transform"
		style="width: {artboard.width}px; height: {artboard.height}px; transform: scale({scale})"
	>
		{#if isDesktop}
			<div
				class="animate-frame-in absolute top-[54px] left-0 w-[420px]"
				style="animation-delay: 0ms"
			>
				<div class="h-[280px] w-full rotate-[-14deg]">
					{@render browserFrame(frames[0].url, 5)}
				</div>
			</div>
		{/if}

		<div
			class={cn(
				"animate-frame-in absolute bottom-0 left-1/2 -translate-x-1/2",
				isDesktop ? "h-[340px] w-[620px]" : "h-[380px] w-[560px]"
			)}
			style="animation-delay: {FRAME_STAGGER}ms"
		>
			{@render browserFrame(frames[1].url, isDesktop ? 6 : 7)}
		</div>

		{#if isDesktop}
			<div
				class="animate-frame-in absolute top-[54px] right-0 w-[420px]"
				style="animation-delay: {FRAME_STAGGER * 2}ms"
			>
				<div class="h-[280px] w-full rotate-[14deg]">
					{@render browserFrame(frames[2].url, 5)}
				</div>
			</div>
		{/if}

		<!-- Floating cards. Same shapes as the source, real values instead of vanity metrics. -->
		<div
			class={cn(
				"animate-card-in absolute z-30",
				isDesktop ? "top-[76px] left-[352px]" : "top-[24px] left-[40px]"
			)}
			style="animation-delay: {CARD_DELAY_BASE}ms"
		>
			<div
				class="flex items-center gap-2 rounded-pill border border-border bg-card py-2 pr-3 pl-2 shadow-frame"
			>
				<span class="rounded-pill bg-background px-2 py-1 font-mono text-caption text-muted-foreground">
					localhost
				</span>
				<span class="text-body-sm font-medium whitespace-nowrap text-foreground">No upload step</span>
			</div>
		</div>

		<div
			class={cn(
				"animate-card-in absolute z-30",
				isDesktop ? "top-[76px] left-[858px]" : "top-[96px] right-[24px]"
			)}
			style="animation-delay: {CARD_DELAY_BASE + CARD_STAGGER}ms"
		>
			<div
				class="flex items-start gap-1 rounded-pill bg-card p-1 shadow-frame"
			>
				{#each [{ label: "Orbit", active: true }, { label: "Recast", active: false }, { label: "Glyphtex", active: false }] as chip (chip.label)}
					<span
						class={cn(
							"inline-flex items-center rounded-pill px-3 py-2 text-caption font-medium whitespace-nowrap",
							chip.active
								? "bg-primary text-primary-foreground"
								: "border border-border bg-card text-foreground"
						)}
					>
						{chip.label}
					</span>
				{/each}
			</div>
		</div>

		<div
			class={cn(
				"animate-card-in absolute z-30",
				isDesktop ? "top-[214px] left-[312px]" : "bottom-[24px] left-[32px]"
			)}
			style="animation-delay: {CARD_DELAY_BASE + CARD_STAGGER * 2}ms"
		>
			<div
				class="flex w-[216px] items-start justify-between rounded-xl border border-border bg-card p-3 shadow-frame"
			>
				{#each [{ value: "4", label: "Apps" }, { value: "4", label: "Packages" }, { value: "0", label: "Uploads" }] as stat (stat.label)}
					<div class="flex flex-col items-center gap-1">
						<span class="text-body-sm font-medium text-foreground">{stat.value}</span>
						<span class="text-caption text-muted-foreground">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
