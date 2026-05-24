<script lang="ts">
	import { appConfig } from "@root/project.config";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu";
	import * as Sheet from "$lib/components/ui/sheet";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { NAV_GROUPS } from "./nav-list";
	import { cn } from "$lib/utils";
	import Logo from "$lib/components/logo.svelte";

	let mobileOpen = $state(false);

	function isExternal(href: string): boolean {
		return /^https?:\/\//.test(href);
	}
</script>

<!--
  Top nav per DESIGN.md §6 `top-nav`.
  Canvas background, ink text, 64px tall. Pill primary CTA at the right.
  We keep a hairline floor instead of the round-pill nav of the previous design
  for the editorial top-bar feel.
-->
<header
	class={cn(
		"sticky top-0 z-40 w-full",
		"bg-canvas/85 border-b border-hairline-soft backdrop-blur-md supports-backdrop-filter:bg-canvas/70"
	)}
>
	<div class="mx-auto flex h-16 max-w-(--max-app-width) items-center justify-between gap-6 px-6 sm:px-8">
		<a href="/" class="flex items-center gap-2.5 text-ink">
			<Logo class="size-7" />
			<span class="font-display text-lg font-light tracking-tight">{appConfig.name}</span>
		</a>

		<NavigationMenu.Root class="hidden md:flex">
			<NavigationMenu.List class="gap-1">
				{#each NAV_GROUPS as group (group.title)}
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>{group.title}</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<ul class="grid w-[440px] gap-0.5 p-2">
								{#each group.items as item (item.href)}
									<li>
										<NavigationMenu.Link
											href={item.href}
											target={isExternal(item.href) ? "_blank" : undefined}
											rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
											class="block rounded-lg p-3 transition-colors hover:bg-surface-strong/70"
										>
											<div class="flex items-center gap-1.5 text-sm font-medium text-ink">
												{item.title}
												{#if isExternal(item.href)}
													<ArrowUpRight class="size-3 text-muted-ink" />
												{/if}
											</div>
											{#if item.description}
												<p class="mt-1 text-xs leading-snug text-body">
													{item.description}
												</p>
											{/if}
										</NavigationMenu.Link>
									</li>
								{/each}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
				{/each}
			</NavigationMenu.List>
		</NavigationMenu.Root>

		<div class="flex items-center gap-3">
			<a
				href="/learn"
				class="hidden text-sm font-medium tracking-[0.01em] text-body transition-colors hover:text-ink md:inline"
			>
				Learn
			</a>
			<a
				href="https://recast.nexonauts.com"
				target="_blank"
				rel="noopener noreferrer"
				class={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
			>
				Try Recast
				<ArrowUpRight class="size-3.5" />
			</a>

			<Sheet.Root bind:open={mobileOpen}>
				<Sheet.Trigger
					class={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "md:hidden")}
				>
					<MenuIcon class="size-4" />
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-80 p-0">
					<Sheet.Header>
						<Sheet.Title>
							<span class="inline-flex items-center gap-2">
								<Logo class="size-6" />
								{appConfig.name}
							</span>
						</Sheet.Title>
					</Sheet.Header>

					<nav class="flex flex-col gap-7 px-6 py-6">
						{#each NAV_GROUPS as group (group.title)}
							<div>
								<div class="eyebrow mb-3 text-muted-ink">{group.title}</div>
								<ul class="space-y-0.5">
									{#each group.items as item (item.href)}
										<li>
											<a
												href={item.href}
												target={isExternal(item.href) ? "_blank" : undefined}
												rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
												onclick={() => (mobileOpen = false)}
												class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-surface-strong"
											>
												<span>{item.title}</span>
												{#if isExternal(item.href)}
													<ArrowUpRight class="size-3 text-muted-ink" />
												{/if}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
						<div class="mt-2 flex flex-col gap-2 border-t border-hairline pt-6">
							<Button href="/learn" variant="outline" size="md">Read the guides</Button>
							<Button
								href="https://recast.nexonauts.com"
								target="_blank"
								rel="noopener noreferrer"
								size="md"
							>
								Try Recast
								<ArrowUpRight class="size-4" />
							</Button>
						</div>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
