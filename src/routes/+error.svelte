<script lang="ts">
	import { page } from "$app/state";
	import Logo from "$lib/components/logo.svelte";
	import { Button } from "$lib/components/ui/button";
	import { appConfig } from "@/project.config";
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import ArrowUpRight from "phosphor-svelte/lib/ArrowUpRight";

	const copy: Record<number, { title: string; body: string }> = {
		404: {
			title: "That page is not here",
			body: "The link may be out of date, or the page moved when the site was rebuilt. The routes below all still work."
		},
		500: {
			title: "Something broke on our side",
			body: "This one is ours, not yours. Try again in a moment, and if it keeps happening the GitHub repository is the fastest way to tell us."
		}
	};

	let { title, body } = $derived(
		copy[page.status] ?? {
			title: "Something went wrong",
			body: page.error?.message ?? "The request could not be completed. Try again from the homepage."
		}
	);

	const routes = [
		{ label: "Homepage", href: "/" },
		{ label: "Learn by example", href: "/learn" },
		{ label: "Guides", href: "/guides" },
		{ label: "Dev tools", href: "/dev-tools" }
	];
</script>

<svelte:head>
	<title>{page.status} · {appConfig.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main id="main" class="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-24">
	<a href="/" class="flex items-center gap-2 text-ink">
		<Logo class="size-6" />
		<span class="text-sm font-semibold">{appConfig.name}</span>
	</a>

	<p class="mt-16 font-mono text-sm text-muted-ink">{page.status}</p>

	<h1
		class="heading-gradient mt-3 max-w-[680px] text-center text-4xl font-semibold tracking-[-0.02em] sm:text-5xl"
	>
		{title}
	</h1>

	<p class="mt-6 max-w-[680px] text-center text-base text-body">{body}</p>

	<div class="mt-8">
		<Button href="/" size="cta">
			Back to the homepage
			<ArrowRight class="size-4" weight="bold" />
		</Button>
	</div>

	<ul class="mt-12 flex flex-wrap items-center justify-center gap-2">
		{#each routes as route (route.href)}
			<li>
				<a
					href={route.href}
					class="inline-flex rounded-full border border-hairline px-3 py-2 text-sm text-body transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong hover:text-ink active:translate-y-px focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
				>
					{route.label}
				</a>
			</li>
		{/each}
		<li>
			<a
				href={appConfig.githubRepo}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-2 text-sm text-body transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong hover:text-ink active:translate-y-px focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
			>
				Report it
				<ArrowUpRight class="size-4" />
			</a>
		</li>
	</ul>
</main>
