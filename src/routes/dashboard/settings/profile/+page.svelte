<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
</script>

<svelte:head>
	<title>Profile — Settings</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Profile</h1>
		<p class="text-muted-foreground text-sm font-medium">Edit your public profile.</p>
	</div>
	<Separator />
	<p class="text-muted-foreground text-sm">
		Profile editor is being migrated. The legacy form lives at
		<code class="rounded bg-muted px-1 py-0.5 text-xs">_legacy/app/dashboard/settings/profile/</code>
		and will be ported in a follow-up commit.
	</p>
</div>
