<script lang="ts">
import ArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import { appConfig } from "@/project.config";
import Logo from "$lib/components/logo.svelte";
import { Button } from "$lib/components/ui/button";
import { NotchedShelf } from "$lib/components/ui/notched-shelf";
import { shippedProducts } from "$lib/data/products";
import { theme } from "$lib/theme.svelte";

const year = new Date().getFullYear();

type Link = { title: string; href: string; external?: boolean };
type Group = { title: string; links: Link[] };

const groups: Group[] = [
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
	"inline-flex items-center gap-1 rounded-sm text-body-sm text-muted-foreground transition-colors duration-(--duration-ui) ease-(--ease-out) hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none";
const topClass =
	"inline-flex h-11 items-center gap-2 rounded-full px-5 text-body-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
const headClass = "font-mono text-caption tracking-wider text-muted-foreground uppercase";
</script>

{#snippet arrowUp()}
	<svg viewBox="0 0 16 16" class="size-4" aria-hidden="true" data-motion="footer-mark">
		<path
			d="M8 13.5V3M3.5 7.5L8 3l4.5 4.5"
			fill="none"
			stroke="currentColor"
			stroke-width="1.6"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="draw"
			pathLength="1"
		/>
	</svg>
{/snippet}

<!-- A separate surface from the page, so the shelf motif can be cut back out of it.
     No top border: the notch silhouette is the edge, and a rule would break across it. -->
<footer class="relative mt-auto bg-muted" data-motion="footer">
	<div class="pointer-events-none absolute inset-x-0 -top-11 z-10 hidden md:block">
		<div data-motion="footer-notch">
			<NotchedShelf inverted fill="text-muted" class="h-11">
				<a href="#main" class="{topClass} pointer-events-auto">
					{@render arrowUp()}
					Back to top
				</a>
			</NotchedShelf>
		</div>
	</div>

	<div class="mx-auto w-full max-w-page px-4 sm:px-8 lg:px-10">
		<div class="grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-[1.4fr_1.1fr_1fr_1fr] md:py-16">
			<div class="sm:col-span-2 md:col-span-1" data-motion="footer-col">
				<a
					href="/"
					class="inline-flex items-center gap-2.5 rounded-lg text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					<Logo class="size-6" />
					<span class="font-heading text-body-lg font-semibold">{appConfig.name}</span>
				</a>
				<p class="mt-3 max-w-[32ch] text-body-sm text-pretty text-muted-foreground">
					A small lab that makes developer tools, and writes about what it learns building them.
				</p>
				<ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2">
					{#each socials as s (s.title)}
						<li>
							<a href={s.href} target="_blank" rel="noopener noreferrer" class={linkClass}>
								{s.title}
								<ArrowUpRight class="size-3.5" aria-hidden="true" />
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div data-motion="footer-col">
				<p class={headClass}>Products</p>
				<ul class="mt-3 space-y-3">
					{#each shippedProducts as product (product.slug)}
						<li>
							<a
								href={product.href}
								target="_blank"
								rel="noopener noreferrer"
								class="group block rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
							>
								<span
									class="inline-flex items-center gap-1 text-body-sm font-medium text-foreground"
								>
									{product.name}
									<ArrowUpRight class="size-3.5" aria-hidden="true" />
								</span>
								<span class="block text-caption text-muted-foreground">{product.kind}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			{#each groups as group (group.title)}
				<div data-motion="footer-col">
					<p class={headClass}>{group.title}</p>
					<ul class="mt-3 space-y-2.5">
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

		<span class="block h-px w-full origin-left bg-border" data-motion="footer-rule" aria-hidden="true"
		></span>

		<div
			class="flex flex-col items-start gap-4 py-5 text-caption text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
		>
			<p>&copy; {year} {appConfig.name}</p>
			<ul class="flex flex-wrap gap-x-5 gap-y-1">
				{#each legal as link (link.href)}
					<li><a href={link.href} class={linkClass}>{link.title}</a></li>
				{/each}
			</ul>
			<div class="flex items-center gap-2">
				<a href="#main" class="{linkClass} md:hidden">Back to top</a>
				<Button variant="outline" size="sm" onclick={() => theme.toggle()}>
					{theme.current === "dark" ? "Switch to light theme" : "Switch to dark theme"}
				</Button>
			</div>
		</div>
	</div>
</footer>
