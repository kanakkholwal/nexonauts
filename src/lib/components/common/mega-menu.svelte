<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
import ProductArt from "$lib/components/home/product-art.svelte";
import { cn } from "$lib/utils";
import type { MenuGroup } from "./nav-data";

// One panel for every group, sliding and resizing between triggers, so the row reads as a
// single object rather than four popovers. A disclosure, not role="menu": these are links.
let { groups, pathname }: { groups: MenuGroup[]; pathname: string } = $props();

// The nav renders twice, shelf and phone bar, so a literal id would be duplicated.
const panelId = $props.id();

let active = $state(-1);
const open = $derived(active >= 0);

let panels = $state<(HTMLElement | null)[]>([]);
let triggers = $state<(HTMLElement | null)[]>([]);
let row: HTMLElement | undefined = $state();
let box = $state({ width: 0, height: 0, left: 0 });

function measure() {
	if (active < 0 || !row) return;
	const panel = panels[active];
	const trigger = triggers[active];
	if (!panel || !trigger) return;
	const rowRect = row.getBoundingClientRect();
	const triggerRect = trigger.getBoundingClientRect();
	const width = panel.scrollWidth;
	const ideal = triggerRect.left - rowRect.left + triggerRect.width / 2 - width / 2;
	box = { width, height: panel.scrollHeight, left: ideal };
}

$effect(() => {
	void active;
	measure();
});

// A diagonal path to the panel leaves the row for a frame; closing instantly makes it unusable.
let closeTimer: ReturnType<typeof setTimeout> | null = null;
const cancelClose = () => {
	if (closeTimer) clearTimeout(closeTimer);
	closeTimer = null;
};
function scheduleClose() {
	cancelClose();
	closeTimer = setTimeout(() => (active = -1), 140);
}
function openGroup(i: number) {
	cancelClose();
	active = i;
}
function closeNow() {
	cancelClose();
	active = -1;
}

function onTriggerKeydown(e: KeyboardEvent, i: number) {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		active = active === i ? -1 : i;
	} else if (e.key === "ArrowDown") {
		e.preventDefault();
		openGroup(i);
		queueMicrotask(() => panels[i]?.querySelector<HTMLElement>("a")?.focus());
	} else if (e.key === "Escape") {
		closeNow();
		triggers[i]?.focus();
	}
}

const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
const linkClass =
	"inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-full px-3 text-body-sm font-medium transition-colors duration-(--duration-ui) ease-(--ease-out) outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none";
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === "Escape") closeNow();
	}}
	onresize={measure}
/>

<div
	bind:this={row}
	class="relative hidden items-center gap-0.5 md:flex"
	onmouseleave={scheduleClose}
	onmouseenter={cancelClose}
	role="presentation"
>
	{#each groups as group, i (group.label)}
		{@const isOpen = active === i}
		<button
			bind:this={triggers[i]}
			type="button"
			aria-expanded={isOpen}
			aria-controls={panelId}
			onmouseenter={() => openGroup(i)}
			onfocus={() => openGroup(i)}
			onclick={() => (active = active === i ? -1 : i)}
			onkeydown={(e) => onTriggerKeydown(e, i)}
			class={cn(
				linkClass,
				"cursor-pointer bg-transparent",
				isOpen || isCurrent(group.href)
					? "text-foreground"
					: "text-muted-foreground hover:text-foreground"
			)}
		>
			{group.label}
			<IconChevronDown
				class={cn(
					"size-3.5 transition-transform duration-(--duration-ui) ease-(--ease-out) motion-reduce:transition-none",
					isOpen && "rotate-180"
				)}
				aria-hidden="true"
			/>
		</button>
	{/each}

	<div
		id={panelId}
		aria-hidden={!open}
		class={cn(
			"absolute top-full z-50 origin-top overflow-hidden rounded-card border border-border bg-popover",
			"transition-[width,height,transform,opacity] duration-(--duration-ui) ease-(--ease-out) motion-reduce:transition-none",
			open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
		)}
		style="width:{box.width}px;height:{box.height}px;transform:translate3d({box.left}px,{open
			? 10
			: 4}px,0) scale({open ? 1 : 0.98});"
		onmouseenter={cancelClose}
		onmouseleave={scheduleClose}
		role="presentation"
	>
		{#each groups as group, i (group.label)}
			{@const isOpen = active === i}
			<div
				bind:this={panels[i]}
				class={cn(
					"absolute inset-x-0 top-0 w-max transition-opacity duration-(--duration-ui) motion-reduce:transition-none",
					isOpen ? "opacity-100" : "pointer-events-none opacity-0"
				)}
				inert={!isOpen}
			>
				<ul class="grid w-[32rem] grid-cols-2 gap-1 p-2">
					{#each group.items as item (item.href)}
						{@const Icon = item.icon}
						<li>
							<a
								href={item.href}
								target={item.external ? "_blank" : undefined}
								rel={item.external ? "noopener noreferrer" : undefined}
								onclick={closeNow}
								aria-current={isCurrent(item.href) ? "page" : undefined}
								class="flex gap-3 rounded-md p-3 transition-colors duration-(--duration-ui) hover:bg-muted aria-[current=page]:bg-muted motion-reduce:transition-none"
							>
								{#if item.slug}
									<span
										class="grid h-9 w-12 shrink-0 place-items-center overflow-clip rounded-sm border border-border bg-muted p-1"
										style="--art-surface: var(--muted)"
										aria-hidden="true"
									>
										<ProductArt slug={item.slug} />
									</span>
								{:else if Icon}
									<Icon class="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
								{/if}
								<span class="min-w-0">
									<span class="flex items-center gap-1 text-body-sm font-medium text-foreground">
										{item.label}
										{#if item.external}
											<IconArrowUpRight class="size-3 text-muted-foreground" aria-hidden="true" />
										{/if}
									</span>
									<span class="mt-0.5 block text-caption text-muted-foreground">
										{item.description}
									</span>
								</span>
							</a>
						</li>
					{/each}
				</ul>

				{#if group.footer}
					<a
						href={group.footer.href}
						onclick={closeNow}
						class="group/cta flex items-center justify-between gap-4 border-t border-border bg-muted px-5 py-3 transition-colors duration-(--duration-ui) hover:bg-background motion-reduce:transition-none"
					>
						<span class="text-body-sm font-medium text-foreground">{group.footer.label}</span>
						<span class="flex items-center gap-1.5 text-caption text-muted-foreground">
							{group.footer.hint}
							<IconArrowRight
								class="size-3.5 transition-transform group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
								aria-hidden="true"
							/>
						</span>
					</a>
				{/if}
			</div>
		{/each}
	</div>
</div>
