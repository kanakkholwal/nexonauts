<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
</script>

<svelte:head>
	<title>Messages — Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Messages</h1>
		<p class="text-muted-foreground text-sm font-medium">Inbox of contact-form submissions.</p>
	</div>
	<Separator />
	<p class="text-muted-foreground text-sm">
		Message inbox is being migrated. Reads from the Message mongoose model.
	</p>
</div>
