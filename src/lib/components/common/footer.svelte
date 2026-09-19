<script lang="ts">
import ArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import { appConfig } from "@/project.config";
import Logo from "$lib/components/logo.svelte";
import { Button } from "$lib/components/ui/button";
import { shippedProducts } from "$lib/data/products";
import { theme } from "$lib/theme.svelte";

const year = new Date().getFullYear();

type Link = { title: string; href: string; external?: boolean };
type Group = { title: string; links: Link[] };

const groups: Group[] = [
	{
		title: "Products",
		links: shippedProducts.map((p) => ({ title: p.name, href: p.href, external: true }))
	},
	{
		title: "Learn",
		links: [
			{ title: "Lessons", href: "/learn" },
			{ title: "Guides", href: "/guides" },
			{ title: "Tools", href: "/dev-tools" },
			{ title: "Docs", href: "https://docs.nexonauts.com", external: true }
		]
	},
	{
		title: appConfig.name,
		links: [
			{ title: "About", href: "/about" },
			{ title: "Contact", href: "/contact" },
			{ title: "Packages", href: "https://docs.nexonauts.com", external: true },
			{ title: "GitHub", href: appConfig.socials.github, external: true }
		]
	}
];

const socials: Link[] = [
	{ title: "GitHub", href: appConfig.socials.github, external: true },
	{ title: "X", href: appConfig.socials.twitter, external: true },
	{ title: "LinkedIn", href: appConfig.socials.linkedin, external: true }
];

const legal: Link[] = [
	{ title: "Privacy", href: "/privacy" },
	{ title: "Terms", href: "/tos" },
	{ title: "Copyright", href: "/copyright" }
];

const linkClass =
	"inline-flex items-center gap-1 rounded-sm text-body-sm text-muted-foreground transition-colors duration-(--duration-ui) ease-(--ease-out) hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
</script>

<footer class="border-t border-border bg-background" data-motion="footer">
	<div class="mx-auto w-full max-w-page px-4 sm:px-8 lg:px-10">
		<div class="grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:py-14">
			<div class="sm:col-span-2 md:col-span-1" data-motion="footer-col">
				<a
					href="/"
					class="inline-flex items-center gap-2.5 rounded-lg text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					<Logo class="size-6" />
					<span class="font-heading text-body-lg font-semibold">{appConfig.name}</span>
				</a>
				<p class="mt-3 max-w-[30ch] text-body-sm text-muted-foreground">
					A small lab that makes developer tools.
				</p>
				<ul class="mt-4 flex gap-4">
					{#each socials as s (s.title)}
						<li>
							<a href={s.href} target="_blank" rel="noopener noreferrer" class={linkClass}>
								{s.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			{#each groups as group (group.title)}
				<div data-motion="footer-col">
					<p class="text-body-sm font-medium text-foreground">{group.title}</p>
					<ul class="mt-3 space-y-2">
						{#each group.links as link (link.href + link.title)}
							<li>
								<a
									href={link.href}
									target={link.external ? "_blank" : undefined}
									rel={link.external ? "noopener noreferrer" : undefined}
									class={linkClass}
								>
									{link.title}
									{#if link.external}
										<ArrowUpRight class="size-3.5" aria-hidden="true" />
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div
			class="flex flex-col items-start gap-4 border-t border-border py-5 text-caption text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
		>
			<p>&copy; {year} {appConfig.name}</p>
			<ul class="flex gap-4">
				{#each legal as link (link.href)}
					<li><a href={link.href} class={linkClass}>{link.title}</a></li>
				{/each}
			</ul>
			<Button variant="outline" size="sm" onclick={() => theme.toggle()}>
				{theme.current === "dark" ? "Switch to light theme" : "Switch to dark theme"}
			</Button>
		</div>
	</div>
</footer>
