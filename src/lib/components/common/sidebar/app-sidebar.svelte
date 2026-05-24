<script lang="ts">
	import { appConfig } from "@root/project.config";
	import { page } from "$app/state";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import Logo from "$lib/components/logo.svelte";
	import { getSideNavLinks } from "./sidebar-links";

	type SessionUser = {
		name?: string | null;
		email?: string | null;
		image?: string | null;
		role?: string;
	};

	let {
		user,
		moderator = "user",
		prefixPath = "dashboard"
	}: {
		user: SessionUser;
		moderator?: string;
		prefixPath?: string;
	} = $props();

	const links = $derived(getSideNavLinks(moderator, prefixPath));

	function isActive(href: string) {
		if (href === `/${prefixPath}`) return page.url.pathname === href;
		return page.url.pathname === href || page.url.pathname.startsWith(href + "/");
	}
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-xl bg-surface-strong"
							>
								<Logo class="size-5" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="font-display text-base font-light tracking-tight truncate text-ink">{appConfig.name}</span>
								<span class="truncate text-xs text-muted-ink">
									{appConfig.appDomain}
								</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{#each links as link (link.path + link.title)}
					{@const Icon = link.icon}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={isActive(link.path)} tooltipContent={link.title}>
							{#snippet child({ props })}
								<a href={link.path} {...props}>
									<Icon class="size-4" />
									<span>{link.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if link.items?.length}
							<Sidebar.MenuSub>
								{#each link.items as sub (sub.path)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton>
											{#snippet child({ props })}
												<a href={sub.path} {...props}>{sub.title}</a>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/admin" {...props}>
							{#if user.image}
								<img
									src={user.image}
									alt={user.name ?? "Profile"}
									class="size-8 rounded-full object-cover"
								/>
							{:else}
								<div
									class="flex size-8 items-center justify-center rounded-full bg-surface-strong text-sm font-medium text-ink"
								>
									{user.name?.charAt(0).toUpperCase() ?? "?"}
								</div>
							{/if}
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">{user.name ?? "Profile"}</span>
								<span class="text-muted-foreground truncate text-xs">
									{user.email ?? ""}
								</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>

	<Sidebar.Rail />
</Sidebar.Root>
