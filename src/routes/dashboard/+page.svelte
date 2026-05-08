<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import RouterCard from "$lib/components/extended/router-card.svelte";
	import Boxes from "@lucide/svelte/icons/boxes";
	import Settings2 from "@lucide/svelte/icons/settings-2";
	import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
	import UserRound from "@lucide/svelte/icons/user-round";

	let { data } = $props();

	const ROUTES = [
		{
			href: "/dashboard/products",
			title: "Products",
			description: "Manage your products",
			Icon: ShoppingCart
		},
		{
			href: "/dashboard/tools",
			title: "Tools",
			description: "Manage your tools",
			Icon: Boxes
		},
		{
			href: "/dashboard/settings/profile",
			title: "Profile",
			description: "Manage your profile",
			Icon: UserRound
		},
		{
			href: "/dashboard/settings",
			title: "Settings",
			description: "Manage your settings",
			Icon: Settings2
		}
	];
</script>

<svelte:head>
	<title>Dashboard — Nexonauts</title>
</svelte:head>

<div class="@container w-full space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Dashboard</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Welcome back, {data.session?.user?.name ?? "friend"}
		</p>
	</div>
	<Separator />
	<div class="grid grid-cols-1 gap-4 @sm:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4">
		{#each ROUTES as route (route.href)}
			<RouterCard {...route} />
		{/each}
	</div>
</div>
