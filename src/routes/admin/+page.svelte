<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Admin — Nexonauts</title>
</svelte:head>

<div class="my-5 space-y-2">
	<h2 class="text-3xl font-semibold">Hi, {data.session?.user.name ?? "there"}</h2>
	<p class="text-muted-foreground">Admin tooling will live here as features come online.</p>
</div>
