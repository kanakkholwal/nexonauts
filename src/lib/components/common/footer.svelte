<script lang="ts">
	import { FOOTER_LINKS } from "data/root";
	import { env } from "$env/dynamic/public";
	import ThemeSwitcher from "./theme-switcher.svelte";

	const websiteName = env.PUBLIC_WEBSITE_NAME ?? "Nexonauts";
	const year = new Date().getFullYear();
</script>

<footer class="relative z-10 mt-10 pb-16">
	<div class="relative mx-auto max-w-[1170px] px-4 pt-17 sm:px-8 xl:px-0">
		<div class="footer-divider-gradient absolute top-0 left-0 h-px w-full"></div>

		<div class="flex flex-wrap justify-between">
			<div class="prose dark:prose-invert mb-10 w-full max-w-[520px]">
				<a
					href="/"
					class="not-prose mb-8 inline-block text-3xl font-extrabold sm:text-3xl xl:text-heading-3"
				>
					{websiteName}
				</a>
				<p class="mb-12 xl:w-4/5">
					{websiteName} is a developer-centric platform, which is designed to help you create
					amazing digital products and services.
				</p>
				<div class="flex items-center gap-5">
					<a
						href="https://x.com/KanakKholwal"
						title="Twitter / X"
						class="text-muted-foreground hover:text-primary icon flex h-8 items-center justify-center duration-300 ease-in hover:-translate-y-1"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="h-5 w-5"
						>
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
					</a>
					<a
						href="https://linkedin.com/NexoNauts"
						title="NexoNauts' LinkedIn"
						class="text-muted-foreground hover:text-primary icon flex h-8 items-center justify-center duration-300 ease-in hover:-translate-y-1"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
						>
							<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
							<rect width="4" height="12" x="2" y="9" />
							<circle cx="4" cy="4" r="2" />
						</svg>
					</a>
				</div>
			</div>

			<div class="w-full max-w-[571px]">
				<div class="flex flex-col gap-10 sm:flex-row sm:justify-between">
					{#each FOOTER_LINKS as group (group.title)}
						<div>
							<h5 class="mb-5 font-semibold">{group.title}</h5>
							<ul class="flex flex-col gap-2">
								{#each group.links as link (link.href)}
									<li class="relative">
										<a
											href={link.href}
											title={link.title}
											class="text-muted-foreground hover:text-primary inset-0 text-sm font-semibold duration-300 ease-in hover:left-2 dark:text-gray-400 dark:hover:text-primary"
										>
											{link.title}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="text-muted-foreground mt-4 mb-6 flex items-center justify-between gap-2 font-medium">
			<div class="text-sm">
				© {year}
				<a href="/" class="text-foreground font-semibold" title={websiteName}>{websiteName}</a>
				. All rights reserved.
			</div>
			<div>
				<ThemeSwitcher />
			</div>
		</div>
	</div>
</footer>
