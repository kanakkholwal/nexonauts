<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import { Separator } from "$lib/components/ui/separator";
	import ThemeSwitcher from "$lib/components/common/theme-switcher.svelte";

	type SessionUser = { name?: string | null; email?: string | null };

	let {
		user,
		impersonatedBy
	}: {
		user: SessionUser;
		impersonatedBy?: string | null;
	} = $props();
</script>

<header
	class="bg-background/80 sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur"
>
	<Sidebar.Trigger class="-ml-1" />
	<Separator orientation="vertical" class="mx-2 h-4" />
	<div class="flex-1 text-sm font-medium">
		{user.name ?? "Welcome back"}
		{#if impersonatedBy}
			<span class="text-muted-foreground ml-2 text-xs">(impersonated by {impersonatedBy})</span>
		{/if}
	</div>
	<ThemeSwitcher />
</header>
