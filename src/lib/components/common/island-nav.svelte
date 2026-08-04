<script lang="ts">
	import { page } from "$app/state";
	import Logo from "$lib/components/logo.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import { appConfig } from "@/project.config";
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import ArrowUpRight from "phosphor-svelte/lib/ArrowUpRight";

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
	let activeSection = $state("");

	// Stagger caps at the 8th item so a long list never lags behind the overlay.
	const stagger = (i: number) => `${100 + Math.min(i, 7) * 50}ms`;

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

		sections.forEach((s) => observer.observe(s));
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
	onkeydown={(e) => {
		if (e.key === "Escape" && open) close();
	}}
/>

<header class="pointer-events-none fixed inset-x-0 top-0 z-50">
	<nav
		aria-label="Primary"
		class={cn(
			"pointer-events-auto mx-auto mt-6 flex w-max items-center gap-2 rounded-full",
			"border border-hairline bg-canvas/70 px-3 py-2 backdrop-blur-xl",
			"shadow-(--shadow-elevation-2) transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
			open && "border-transparent bg-transparent shadow-none backdrop-blur-none"
		)}
	>
		<a
			href="/"
			onclick={close}
			class="flex items-center gap-2 rounded-full px-3 py-2 text-ink transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface-strong focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
		>
			<Logo class="size-6" />
			<span class="text-sm font-semibold">{appConfig.name}</span>
		</a>

		<ul class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<li>
					<a
						href={link.href}
						aria-current={isCurrent(link.href) ? "page" : undefined}
						class={cn(
							"rounded-full px-3 py-2 text-sm font-medium text-body",
							"transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
							"hover:bg-surface-strong hover:text-ink active:translate-y-px",
							"focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
							"aria-[current=page]:bg-surface-strong aria-[current=page]:text-ink"
						)}
					>
						{link.title}
					</a>
				</li>
			{/each}
		</ul>

		<a href="#products" class={cn(buttonVariants({ size: "cta-sm" }), "hidden sm:inline-flex")}>
			Browse products
			<ArrowRight class="size-4" weight="bold" />
		</a>

		<button
			type="button"
			onclick={() => (open = !open)}
			aria-expanded={open}
			aria-label={open ? "Close menu" : "Open menu"}
			class="relative size-10 shrink-0 rounded-full text-ink transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface-strong active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none md:hidden"
		>
			<span
				class={cn(
					"absolute top-1/2 left-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current",
					"transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
					open ? "mt-0 rotate-45" : "-mt-1"
				)}
			></span>
			<span
				class={cn(
					"absolute top-1/2 left-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current",
					"transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
					open ? "mt-0 -rotate-45" : "mt-1"
				)}
			></span>
		</button>
	</nav>
</header>

<!-- Screen-filling overlay. Heavy glass, staggered mask reveal per item. -->
<div
	inert={!open}
	class={cn(
		"fixed inset-0 z-40 backdrop-blur-3xl",
		"bg-white/80 dark:bg-black/80",
		"transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden",
		open ? "visible opacity-100" : "invisible opacity-0"
	)}
>
	<div class="flex h-full flex-col justify-center px-8 pt-24 pb-16">
		<ul class="flex flex-col gap-2">
			{#each overlayLinks as link, i (link.href)}
				<li class="overflow-hidden">
					<a
						href={link.href}
						target={link.external ? "_blank" : undefined}
						rel={link.external ? "noopener noreferrer" : undefined}
						aria-current={isCurrent(link.href) ? "page" : undefined}
						onclick={close}
						style="transition-delay: {open ? stagger(i) : '0ms'}"
						class={cn(
							"flex items-center gap-2 py-2 text-3xl font-semibold text-ink",
							"transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
							"aria-[current=page]:text-muted-ink",
							open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
						)}
					>
						{link.title}
						{#if link.external}
							<ArrowUpRight class="size-6 text-muted-ink" />
						{/if}
					</a>
				</li>
			{/each}
		</ul>

		<a
			href="#products"
			onclick={close}
			style="transition-delay: {open ? stagger(overlayLinks.length) : '0ms'}"
			class={cn(
				buttonVariants({ size: "cta" }),
				"mt-12 w-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
				open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
			)}
		>
			Browse products
			<ArrowRight class="size-4" weight="bold" />
		</a>
	</div>
</div>
