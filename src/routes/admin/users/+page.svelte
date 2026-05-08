<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
</script>

<svelte:head>
	<title>Users — Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Users</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Browse, ban, and impersonate users.
		</p>
	</div>
	<Separator />
	<p class="text-muted-foreground text-sm">
		Users table is being migrated. The legacy implementation lives at
		<code class="rounded bg-muted px-1 py-0.5 text-xs">_legacy/app/admin/users/</code>; the
		@tanstack/react-table data table will be rebuilt against @tanstack/table-core.
	</p>
</div>
