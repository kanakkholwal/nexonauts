<script lang="ts">
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
import { appConfig } from "@/project.config";
import ThemeToggle from "$lib/components/common/theme-toggle.svelte";
import ProductArt from "$lib/components/home/product-art.svelte";
import Logo from "$lib/components/logo.svelte";
import { Button } from "$lib/components/ui/button";
import { cn } from "$lib/utils";
import type { MenuGroup, MenuItem, NavLink } from "./nav-data";

// A full-height sheet, not a popover: three groups and a dozen destinations do not fit in one,
// and a sheet gives a real close affordance and somewhere for the theme control to live.
let {
	open = $bindable(false),
	groups,
	links,
	extras,
	pathname
}: {
	open?: boolean;
	groups: MenuGroup[];
	links: NavLink[];
	extras: MenuItem[];
	pathname: string;
} = $props();

// One section open at a time keeps the list within a thumb's reach.
let openGroup = $state(0);

const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
const close = () => {
	open = false;
};
</script>

{#snippet row(item: MenuItem)}
	{@const Icon = item.icon}
	<li>
		<a
			href={item.href}
			target={item.external ? "_blank" : undefined}
			rel={item.external ? "noopener noreferrer" : undefined}
			onclick={close}
			aria-current={isCurrent(item.href) ? "page" : undefined}
			class={cn(
				"flex min-h-14 items-center gap-3 rounded-md px-2 py-2 transition-colors duration-(--duration-ui) motion-reduce:transition-none",
				isCurrent(item.href) ? "bg-muted" : "hover:bg-muted"
			)}
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
				<Icon class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
			{/if}
			<span class="min-w-0 flex-1">
				<span class="flex items-center gap-1 text-body-sm font-medium text-foreground">
					{item.label}
					{#if item.external}
						<IconArrowUpRight class="size-3 text-muted-foreground" aria-hidden="true" />
					{/if}
				</span>
				<span class="mt-0.5 block text-caption text-muted-foreground">{item.description}</span>
			</span>
		</a>
	</li>
{/snippet}

<div
	id="nav-sheet"
	inert={!open}
	class={cn(
		"fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-background transition-opacity duration-(--duration-ui) ease-(--ease-out) md:hidden",
		"motion-reduce:transition-none",
		open ? "visible opacity-100" : "invisible opacity-0"
	)}
>
	<nav aria-label="Mobile" class="flex-1 px-4 py-3 sm:px-8">
		{#each groups as group, i (group.label)}
			{@const isOpen = openGroup === i}
			<div class="border-b border-border">
				<button
					type="button"
					aria-expanded={isOpen}
					onclick={() => (openGroup = isOpen ? -1 : i)}
					class="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-2 text-left text-body font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					{group.label}
					<IconChevronDown
						class={cn(
							"size-4 shrink-0 text-muted-foreground transition-transform duration-(--duration-ui) ease-(--ease-out) motion-reduce:transition-none",
							isOpen && "rotate-180"
						)}
						aria-hidden="true"
					/>
				</button>
				{#if isOpen}
					<ul class="pb-2">
						{#each group.items as item (item.href)}
							{@render row(item)}
						{/each}
					</ul>
				{/if}
			</div>
		{/each}

		<ul class="mt-2">
			{#each links as link (link.href)}
				<li>
					<a
						href={link.href}
						onclick={close}
						aria-current={isCurrent(link.href) ? "page" : undefined}
						class="flex min-h-14 items-center border-b border-border px-2 text-body font-medium text-foreground"
					>
						{link.label}
					</a>
				</li>
			{/each}
			{#each extras as item (item.href)}
				{@render row(item)}
			{/each}
		</ul>
	</nav>

	<div class="flex items-center justify-between gap-3 border-t border-border px-4 py-4 sm:px-8">
		<a href="/" onclick={close} class="flex items-center gap-2.5 text-foreground">
			<Logo class="size-6" />
			<span class="font-heading text-body font-semibold">{appConfig.name}</span>
		</a>
		<div class="flex items-center gap-2">
			<ThemeToggle />
			<Button href="/contact" size="sm" onclick={close}>Book a call</Button>
		</div>
	</div>
</div>
