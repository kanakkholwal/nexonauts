<script lang="ts">
	import { appConfig } from "@root/project.config";
	import { FOOTER_LINKS } from "data/root";
	import ThemeSwitcher from "./theme-switcher.svelte";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";

	const year = new Date().getFullYear();

	function isExternal(href: string): boolean {
		return /^https?:\/\//.test(href);
	}
</script>

<footer class="border-border bg-background border-t">
	<div class="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
		<div class="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
			<div class="max-w-md">
				<a href="/" class="text-foreground inline-flex items-center gap-2 text-sm font-semibold">
					<img src={appConfig.logoSquare} alt="" class="size-6" />
					{appConfig.name}
				</a>
				<p class="text-muted-foreground mt-4 text-sm leading-relaxed">
					A small studio of developer tools and technical writing. Home of Recast and Docvia.
				</p>
				<div class="mt-5 flex items-center gap-3">
					<a
						href={appConfig.socials.twitter}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="X / Twitter"
						class="text-muted-foreground hover:text-foreground transition-colors"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" class="size-4">
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
					</a>
					<a
						href={appConfig.socials.github}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						class="text-muted-foreground hover:text-foreground transition-colors"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" class="size-4">
							<path
								d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
				{#each FOOTER_LINKS as group (group.title)}
					<div>
						<h5 class="text-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
							{group.title}
						</h5>
						<ul class="space-y-2">
							{#each group.links as link (link.href)}
								<li>
									<a
										href={link.href}
										target={isExternal(link.href) ? "_blank" : undefined}
										rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
										class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
									>
										{link.title}
										{#if isExternal(link.href)}
											<ArrowUpRight class="size-3" />
										{/if}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="border-border mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center"
		>
			<p class="text-muted-foreground text-xs">
				© {year}
				<a href="/" class="text-foreground hover:underline">{appConfig.name}</a>. All rights reserved.
			</p>
			<ThemeSwitcher />
		</div>
	</div>
</footer>
