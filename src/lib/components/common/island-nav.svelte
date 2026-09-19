<script lang="ts">
import ArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import GithubLogo from "@tabler/icons-svelte/icons/brand-github";
import { appConfig } from "@/project.config";
import { page } from "$app/state";
import ThemeToggle from "$lib/components/common/theme-toggle.svelte";
import Logo from "$lib/components/logo.svelte";
import { Button } from "$lib/components/ui/button";
import { NotchedShelf } from "$lib/components/ui/notched-shelf";
import { shippedProducts } from "$lib/data/products";
import { theme } from "$lib/theme.svelte";
import { cn } from "$lib/utils";

type Link = { title: string; href: string; external?: boolean; kind?: string };

// Anchors only where the homepage still renders the id. Edit both together.
const links: Link[] = [
	{ title: "Products", href: "#products" },
	{ title: "Learn", href: "/learn" },
	{ title: "Tools", href: "/dev-tools" },
	{ title: "Docs", href: "https://docs.nexonauts.com", external: true }
];

const more: Link[] = [
	{ title: "Learn", href: "/learn", kind: "Lessons and guides" },
	{ title: "Tools", href: "/dev-tools", kind: "Small browser utilities" },
	{ title: "Docs", href: "https://docs.nexonauts.com", external: true, kind: "Packages and notes" }
];

// The notched shelf is a homepage-only variant behind a flag; other routes keep the bar.
const notched = $derived(appConfig.flags.notchedNav && page.url.pathname === "/");

let open = $state(false);
let scrolled = $state(false);
let activeSection = $state("");

const linkClass =
	"inline-flex h-9 items-center whitespace-nowrap rounded-full px-3 text-body-sm font-medium transition-colors duration-(--duration-ui) ease-(--ease-out) hover:bg-muted hover:text-foreground motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

// In-page anchors only exist on the homepage; elsewhere they resolve to `/#anchor`.
const onHome = $derived(page.url.pathname === "/");
const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);

function isCurrent(href: string) {
	if (href.startsWith("#")) return onHome && activeSection === href.slice(1);
	if (href.startsWith("http")) return false;
	return page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
}

// Scroll-spy for the in-page anchors. IntersectionObserver, never a scroll listener.
$effect(() => {
	const ids = links.filter((l) => l.href.startsWith("#")).map((l) => l.href.slice(1));
	const sections = ids
		.map((id) => document.getElementById(id))
		.filter((el): el is HTMLElement => el !== null);
	if (!sections.length) return;

	const visible = new Set<string>();
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) visible.add(entry.target.id);
				else visible.delete(entry.target.id);
			}
			activeSection = ids.find((id) => visible.has(id)) ?? "";
		},
		{ rootMargin: "-20% 0px -60% 0px", threshold: 0 }
	);

	for (const s of sections) observer.observe(s);
	return () => observer.disconnect();
});

function close() {
	open = false;
}

$effect(() => {
	document.body.style.overflow = open ? "hidden" : "";
	return () => {
		document.body.style.overflow = "";
	};
});
</script>

<svelte:window
	onscroll={() => (scrolled = window.scrollY > 8)}
	onkeydown={(e) => {
		if (e.key === "Escape" && open) close();
	}}
/>

{#snippet brand()}
	<a
		href="/"
		onclick={close}
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
	<ul class="hidden items-center gap-0.5 md:flex">
		{#each links as link (link.href)}
			<li>
				<a
					href={resolve(link.href)}
					target={link.external ? "_blank" : undefined}
					rel={link.external ? "noopener noreferrer" : undefined}
					aria-current={isCurrent(link.href) ? "page" : undefined}
					class={cn(linkClass, isCurrent(link.href) ? "text-foreground" : "text-muted-foreground")}
				>
					{link.title}
					{#if link.external}
						<ArrowUpRight class="ml-0.5 size-3.5" aria-hidden="true" />
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet actions()}
	<div class="flex items-center justify-end gap-1.5">
		<ThemeToggle />
		<Button
			href={appConfig.socials.github}
			target="_blank"
			rel="noopener noreferrer"
			variant="outline"
			size="sm"
			class="hidden md:inline-flex"
		>
			<GithubLogo class="size-4" aria-hidden="true" />
			GitHub
		</Button>
		<Button
			variant="secondary"
			size="sm"
			class="md:hidden"
			onclick={() => (open = !open)}
			aria-expanded={open}
			aria-controls="nav-sheet"
		>
			{open ? "Close" : "Menu"}
		</Button>
	</div>
{/snippet}

{#if notched}
	<!-- Notched variant: the bar sits in a notch cut into the hero frame and slides down on load.
	     Below md the wings do not fit, so the flat bar renders instead. -->
	<div class="slide fixed inset-x-0 top-2 z-50 hidden md:block" data-motion="nav">
		<NotchedShelf fill="text-background" class="h-16">
			<nav aria-label="Primary" class="flex h-16 items-center gap-6 px-6">
				{@render brand()}
				{@render linkList()}
				{@render actions()}
			</nav>
		</NotchedShelf>
	</div>
{/if}

<!-- Transparent over the hero, an edge once the page has moved. The rule is a
     separate element so scroll can draw it; the class keeps it without JS. -->
<div
	class={cn(
		"fixed inset-x-0 top-0 z-50 transition-colors duration-(--duration-ui) ease-(--ease-out) motion-reduce:transition-none",
		scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent",
		notched && "md:hidden"
	)}
	data-motion={notched ? undefined : "nav"}
>
	<nav
		aria-label={notched ? "Primary, compact" : "Primary"}
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

<!-- Mobile sheet. Hairline rows, products first, then the rest of the site. -->
<div
	id="nav-sheet"
	inert={!open}
	class={cn(
		"fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-background transition-opacity duration-(--duration-ui) ease-(--ease-out) md:hidden",
		"motion-reduce:transition-none",
		open ? "visible opacity-100" : "invisible opacity-0"
	)}
>
	<div class="flex min-h-full flex-col px-4 pt-5 pb-8 sm:px-8">
		<p class="font-mono text-caption tracking-wider text-muted-foreground uppercase">Products</p>
		<ul class="mt-2 border-t border-border">
			{#each shippedProducts as product (product.slug)}
				<li>
					<a
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
						onclick={close}
						class="flex min-h-14 items-center justify-between gap-4 border-b border-border py-3 text-body-lg font-medium text-foreground"
					>
						{product.name}
						<span class="text-right text-body-sm text-muted-foreground">{product.kind}</span>
					</a>
				</li>
			{/each}
		</ul>

		<p class="mt-6 font-mono text-caption tracking-wider text-muted-foreground uppercase">More</p>
		<ul class="mt-2 border-t border-border">
			{#each more as link (link.href)}
				<li>
					<a
						href={link.href}
						target={link.external ? "_blank" : undefined}
						rel={link.external ? "noopener noreferrer" : undefined}
						aria-current={isCurrent(link.href) ? "page" : undefined}
						onclick={close}
						class="flex min-h-14 items-center justify-between gap-4 border-b border-border py-3 text-body-lg font-medium text-foreground"
					>
						{link.title}
						<span class="text-right text-body-sm text-muted-foreground">{link.kind}</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="mt-auto flex flex-col gap-3 pt-8">
			<Button
				href={appConfig.socials.github}
				target="_blank"
				rel="noopener noreferrer"
				size="lg"
				onclick={close}
			>
				<GithubLogo class="size-4" aria-hidden="true" />
				GitHub
			</Button>
			<Button variant="outline" size="lg" onclick={() => theme.toggle()}>
				{theme.current === "dark" ? "Switch to light theme" : "Switch to dark theme"}
			</Button>
		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: no-preference) {
		.slide {
			transition: transform var(--duration-enter) var(--ease-out) 120ms;
		}
		@starting-style {
			.slide {
				transform: translateY(-120%);
			}
		}
	}
</style>
