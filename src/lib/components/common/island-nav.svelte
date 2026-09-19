<script lang="ts">
import GithubLogo from "@tabler/icons-svelte/icons/brand-github";
import IconMenu from "@tabler/icons-svelte/icons/menu-2";
import IconX from "@tabler/icons-svelte/icons/x";
import { appConfig } from "@/project.config";
import { page } from "$app/state";
import Logo from "$lib/components/logo.svelte";
import { Button } from "$lib/components/ui/button";
import { NotchedShelf } from "$lib/components/ui/notched-shelf";
import { cn } from "$lib/utils";
import MegaMenu from "./mega-menu.svelte";
import { menuGroups, navLinks, sheetExtras } from "./nav-data";
import NavSheet from "./nav-sheet.svelte";

let open = $state(false);
let scrolled = $state(false);

const pathname = $derived(page.url.pathname);

// Navigating from inside the sheet should leave it closed.
$effect(() => {
	void pathname;
	open = false;
});

$effect(() => {
	document.body.style.overflow = open ? "hidden" : "";
	return () => {
		document.body.style.overflow = "";
	};
});

const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
const linkClass =
	"inline-flex h-9 items-center whitespace-nowrap rounded-full px-3 text-body-sm font-medium transition-colors duration-(--duration-ui) ease-(--ease-out) hover:text-foreground motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
</script>

<svelte:window
	onscroll={() => (scrolled = window.scrollY > 8)}
	onkeydown={(e) => {
		if (e.key === "Escape") open = false;
	}}
/>

{#snippet brand()}
	<a
		href="/"
		onclick={() => (open = false)}
		class="flex w-fit shrink-0 items-center gap-2.5 rounded-lg py-1 pr-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
		aria-label="{appConfig.name} home"
	>
		<Logo class="size-6.5 text-foreground" />
		<span class="font-heading text-body-lg font-semibold whitespace-nowrap text-foreground">
			{appConfig.name}
		</span>
	</a>
{/snippet}

{#snippet linkList()}
	<div class="hidden items-center gap-0.5 md:flex">
		<MegaMenu groups={menuGroups} {pathname} />
		{#each navLinks as link (link.href)}
			<a
				href={link.href}
				aria-current={isCurrent(link.href) ? "page" : undefined}
				class={cn(linkClass, isCurrent(link.href) ? "text-foreground" : "text-muted-foreground")}
			>
				{link.label}
			</a>
		{/each}
	</div>
{/snippet}

{#snippet actions()}
	<div class="flex items-center justify-end gap-1.5">
		<Button
			href={appConfig.socials.github}
			target="_blank"
			rel="noopener noreferrer"
			variant="accent"
			size="sm"
			class="hidden rounded-full md:inline-flex"
		>
			<GithubLogo class="size-4" aria-hidden="true" />
			<span class="sr-only lg:not-sr-only">GitHub</span>
		</Button>
		<button
			type="button"
			onclick={() => (open = !open)}
			aria-expanded={open}
			aria-controls="nav-sheet"
			aria-label={open ? "Close menu" : "Open menu"}
			class="grid size-9 cursor-pointer place-items-center rounded-md bg-transparent text-foreground transition-colors duration-(--duration-ui) hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden motion-reduce:transition-none"
		>
			{#if open}
				<IconX class="size-5" aria-hidden="true" />
			{:else}
				<IconMenu class="size-5" aria-hidden="true" />
			{/if}
		</button>
	</div>
{/snippet}

<!-- The nav on every public route. Below md the wings do not fit, so the bar renders there.
     Two elements: GSAP owns the outer transform, the CSS entrance the inner one. -->
<div class="fixed inset-x-0 top-0 z-50 hidden md:block" data-motion="nav-shelf">
	<div class="slide">
		<NotchedShelf fill="text-card" class="h-16">
			<nav aria-label="Primary" class={("flex h-16 items-center gap-4 px-5 lg:gap-6 lg:px-6")}>
				{@render brand()}
				{@render linkList()}
				{@render actions()}
			</nav>
		</NotchedShelf>
	</div>
</div>

<!-- Transparent over the hero, an edge once the page has moved. The rule is a
     separate element so scroll can draw it; the class keeps it without JS.
     With the shelf on, this is the phone bar only: the shelf never gives way to it. -->
<div
	class={cn(
		"bg-card fixed inset-x-0 top-0 z-50 transition-colors duration-(--duration-ui) ease-(--ease-out) motion-reduce:transition-none",
		scrolled ? " backdrop-blur-md" : "",
		"md:hidden"
	)}
	data-motion="nav"
>
	<nav
		aria-label="Primary, compact"
		class="mx-auto grid h-16 w-full max-w-page grid-cols-[1fr_auto] items-center px-4 sm:px-8 md:grid-cols-[1fr_auto_1fr] lg:px-10"
	>
		{@render brand()}
		{@render linkList()}
		{@render actions()}
	</nav>
	<span
		class={cn("block h-px w-full origin-left bg-border", scrolled ? "opacity-100" : "opacity-0")}
		data-motion="nav-rule"
		aria-hidden="true"
	></span>
</div>

<NavSheet bind:open groups={menuGroups} links={navLinks} extras={sheetExtras} {pathname} />
