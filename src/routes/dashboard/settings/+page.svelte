<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import RouterCard from "$lib/components/extended/router-card.svelte";
	import KeyRound from "@lucide/svelte/icons/key-round";
	import Plug from "@lucide/svelte/icons/plug";
	import UserRound from "@lucide/svelte/icons/user-round";

	const items = [
		{
			href: "/dashboard/settings/profile",
			title: "Profile",
			description: "Update your bio, socials, and public profile.",
			Icon: UserRound
		},
		{
			href: "/dashboard/settings/account",
			title: "Account",
			description: "Email, password, and security.",
			Icon: KeyRound
		},
		{
			href: "/dashboard/settings/integrations",
			title: "Integrations",
			description: "Connect GitHub, Gumroad, and other services.",
			Icon: Plug
		}
	];
</script>

<svelte:head>
	<title>Settings — Dashboard</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Settings</h1>
		<p class="text-muted-foreground text-sm font-medium">Manage your account preferences.</p>
	</div>
	<Separator />
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each items as item (item.href)}
			<RouterCard {...item} />
		{/each}
	</div>
</div>
