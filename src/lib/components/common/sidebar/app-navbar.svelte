<script lang="ts">
import { Separator } from "$lib/components/ui/separator";
import * as Sidebar from "$lib/components/ui/sidebar";

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
	class="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-canvas/85 px-4 backdrop-blur"
>
	<Sidebar.Trigger class="-ml-1" />
	<Separator orientation="vertical" class="mx-2 h-4" />
	<div class="flex-1 text-sm font-medium text-foreground">
		{user.name ?? "Welcome back"}
		{#if impersonatedBy}
			<span class="ml-2 text-xs text-muted-foreground">(impersonated by {impersonatedBy})</span>
		{/if}
	</div>
</header>
