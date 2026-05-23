<script lang="ts">
	import { appConfig } from "@root/project.config";
	import { buttonVariants } from "$lib/components/ui/button";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu";
	import * as Sheet from "$lib/components/ui/sheet";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { NAV_GROUPS } from "./nav-list";
	import { cn } from "$lib/utils";

	let mobileOpen = $state(false);

	function isExternal(href: string): boolean {
		return /^https?:\/\//.test(href);
	}
</script>

<div class="w-full pt-5">
	<header
		class={cn(
			"sticky top-4 z-40 mx-auto flex max-w-5xl items-center justify-between gap-4",
			"rounded-full border border-border bg-background/75 px-4 py-2 backdrop-blur-md",
			"shadow-[0_1px_2px_rgb(0_0_0_/_0.04)]"
		)}
	>
		<a
			href="/"
			class="flex items-center gap-2 px-1 text-sm font-semibold tracking-tight text-foreground"
		>
			<img src={appConfig.logoSquare} alt="" class="size-6" />
			<span class="hidden sm:inline">{appConfig.name}</span>
		</a>

		<NavigationMenu.Root class="hidden md:flex">
			<NavigationMenu.List>
				{#each NAV_GROUPS as group (group.title)}
					<NavigationMenu.Item>
						<NavigationMenu.Trigger class="bg-transparent text-sm font-medium">
							{group.title}
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<ul class="grid w-[420px] gap-1 p-2">
								{#each group.items as item (item.href)}
									<li>
										<NavigationMenu.Link
											href={item.href}
											target={isExternal(item.href) ? "_blank" : undefined}
											rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
											class="hover:bg-muted block rounded-md p-3 transition-colors"
										>
											<div class="flex items-center gap-2 text-sm font-semibold text-foreground">
												{item.title}
												{#if isExternal(item.href)}
													<ArrowUpRight class="size-3 text-muted-foreground" />
												{/if}
											</div>
											{#if item.description}
												<p class="text-muted-foreground mt-1 text-xs leading-snug">
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

		<div class="flex items-center gap-2">
			<a
				href="/learn"
				class="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline"
			>
				Learn
			</a>

			<Sheet.Root bind:open={mobileOpen}>
				<Sheet.Trigger
					class={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "md:hidden")}
					><MenuIcon class="size-4" /></Sheet.Trigger
				>
				<Sheet.Content side="right" class="w-72 p-6">
					<Sheet.Header class="px-0">
						<Sheet.Title>{appConfig.name}</Sheet.Title>
					</Sheet.Header>

					<nav class="mt-6 flex flex-col gap-6">
						{#each NAV_GROUPS as group (group.title)}
							<div>
								<div
									class="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase"
								>
									{group.title}
								</div>
								<ul class="space-y-1">
									{#each group.items as item (item.href)}
										<li>
											<a
												href={item.href}
												target={isExternal(item.href) ? "_blank" : undefined}
												rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
												onclick={() => (mobileOpen = false)}
												class="hover:bg-muted flex items-center justify-between rounded-md px-3 py-2 text-sm"
											>
												<span>{item.title}</span>
												{#if isExternal(item.href)}
													<ArrowUpRight class="size-3 text-muted-foreground" />
												{/if}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</header>
</div>
