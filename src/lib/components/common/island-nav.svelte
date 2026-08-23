<script lang="ts">
import ArrowUpRight from "phosphor-svelte/lib/ArrowUpRight";
import GithubLogo from "phosphor-svelte/lib/GithubLogo";
import List from "phosphor-svelte/lib/List";
import X from "phosphor-svelte/lib/X";
import { appConfig } from "@/project.config";
import { page } from "$app/state";
import ThemeToggle from "$lib/components/common/theme-toggle.svelte";
import Logo from "$lib/components/logo.svelte";
import { Button } from "$lib/components/ui/button";
import { cn } from "$lib/utils";

type Link = { title: string; href: string; external?: boolean };

const links: Link[] = [
	{ title: "Products", href: "#products" },
	{ title: "Packages", href: "#packages" },
	{ title: "Writing", href: "#writing" },
	{ title: "Questions", href: "#faq" }
];

const overlayLinks: Link[] = [
	...links,
	{ title: "Learn", href: "/learn" },
	{ title: "Guides", href: "/guides" },
	{ title: "Dev tools", href: "/dev-tools" },
	{ title: "Docs", href: "https://docs.nexonauts.com", external: true }
];

let open = $state(false);
let scrolled = $state(false);
let activeSection = $state("");

// The bar is transparent over the hero and only grows an edge once the page has
// moved, so it reads as part of the hero rather than a lid sitting on top of it.
const linkClass =
	"inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2 text-body-sm font-medium transition-colors ease-fluid hover:text-foreground motion-reduce:transition-none";

// The in-page anchors only exist on the homepage. Everywhere else they have to
// resolve to `/#anchor` or they scroll to nothing.
const onHome = $derived(page.url.pathname === "/");
const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);

function isCurrent(href: string) {
	if (href.startsWith("#")) return activeSection === href.slice(1);
	if (href.startsWith("http")) return false;
	return page.url.pathname === href;
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
		{ rootMargin: "-20% 0px -70% 0px", threshold: 0 }
	);

	for (const s of sections) observer.observe(s);
	return () => observer.disconnect();
});

function close() {
	open = false;
}

$effect(() => {
	if (typeof document === "undefined") return;
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

<div
	class={cn(
		"ease-fluid fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 motion-reduce:transition-none",
		scrolled ? "border-border-low bg-background/85 backdrop-blur" : "border-transparent"
	)}
>
	<nav
		aria-label="Primary"
		class="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-6 sm:px-8 lg:px-10"
	>
		<a
			href="/"
			onclick={close}
			class="flex shrink-0 items-center gap-2.5 rounded-lg py-1 pr-2"
			aria-label="{appConfig.name} home"
		>
			<span class="grid size-7 place-items-center rounded-lg bg-foreground p-1 text-background">
				<Logo class="size-full" />
			</span>
			<span class="font-display text-lg font-semibold whitespace-nowrap text-foreground">
				{appConfig.name}
			</span>
		</a>

		<ul class="hidden flex-1 items-center justify-center gap-1 md:flex">
			{#each links as link (link.href)}
				<li>
					<a
						href={resolve(link.href)}
						aria-current={isCurrent(link.href) ? "page" : undefined}
						class={cn(
							linkClass,
							isCurrent(link.href) ? "text-foreground" : "text-muted-foreground"
						)}
					>
						{link.title}
					</a>
				</li>
			{/each}
		</ul>

		<div class="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
			<a
				href={appConfig.socials.github}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="{appConfig.name} on GitHub"
				class="ease-fluid hidden size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none md:grid"
			>
				<GithubLogo class="size-4" />
			</a>

			<ThemeToggle />

			<Button href={resolve("#products")} variant="dark" size="sm" class="hidden sm:inline-flex">
				Browse products
			</Button>

			<button
				type="button"
				onclick={() => (open = !open)}
				aria-expanded={open}
				aria-label={open ? "Close menu" : "Open menu"}
				class="ease-fluid grid size-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-paper motion-reduce:transition-none md:hidden"
			>
				{#if open}
					<X class="size-5" />
				{:else}
					<List class="size-5" />
				{/if}
			</button>
		</div>
	</nav>
</div>

<!-- Mobile sheet. Hairline-divided rows, the same vocabulary as the FAQ list. -->
<div
	inert={!open}
	class={cn(
		"ease-fluid fixed inset-0 z-40 bg-background transition-opacity duration-200 md:hidden",
		"motion-reduce:transition-none",
		open ? "visible opacity-100" : "invisible opacity-0"
	)}
>
	<div class="flex h-full flex-col px-6 pt-24 pb-10">
		<ul class="divide-y divide-border-low border-y border-border-low">
			{#each overlayLinks as link (link.href)}
				<li>
					<a
						href={resolve(link.href)}
						target={link.external ? "_blank" : undefined}
						rel={link.external ? "noopener noreferrer" : undefined}
						aria-current={isCurrent(link.href) ? "page" : undefined}
						onclick={close}
						class="ease-fluid flex items-center justify-between gap-4 py-4 text-body font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground motion-reduce:transition-none"
					>
						{link.title}
						{#if link.external}
							<ArrowUpRight class="size-4 shrink-0" />
						{/if}
					</a>
				</li>
			{/each}
		</ul>

		<Button href={resolve("#products")} onclick={close} variant="dark" size="lg" class="mt-8 w-full">
			Browse products
		</Button>
	</div>
</div>
