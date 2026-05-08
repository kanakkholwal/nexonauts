<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import RouterCard from "$lib/components/extended/router-card.svelte";
	import Boxes from "@lucide/svelte/icons/boxes";
	import MessageSquareText from "@lucide/svelte/icons/message-square-text";
	import Users from "@lucide/svelte/icons/users";
	import Wrench from "@lucide/svelte/icons/wrench";

	const items = [
		{
			href: "/admin/users",
			title: "Users",
			description: "Browse, ban, impersonate.",
			Icon: Users
		},
		{
			href: "/admin/products",
			title: "Products",
			description: "Moderate marketplace listings.",
			Icon: Boxes
		},
		{
			href: "/admin/tools",
			title: "Tools",
			description: "Moderate the tools directory.",
			Icon: Wrench
		},
		{
			href: "/admin/messages",
			title: "Messages",
			description: "Inbox of contact-form submissions.",
			Icon: MessageSquareText
		}
	];
</script>

<svelte:head>
	<title>Navigate — Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Navigate</h1>
		<p class="text-muted-foreground text-sm font-medium">Quick links into admin tools.</p>
	</div>
	<Separator />
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each items as item (item.href)}
			<RouterCard {...item} />
		{/each}
	</div>
</div>
