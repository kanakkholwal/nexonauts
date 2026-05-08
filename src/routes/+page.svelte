<script lang="ts">
	import { appConfig } from "@root/project.config";
</script>

<svelte:head>
	<title>{appConfig.name} — SvelteKit migration in progress</title>
</svelte:head>

<main class="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-16 text-center">
	<h1 class="text-4xl font-bold tracking-tight md:text-6xl">
		{appConfig.name}
	</h1>
	<p class="text-muted-foreground max-w-prose">
		The Next.js application is being migrated to SvelteKit on the
		<code class="rounded bg-muted px-1.5 py-0.5 text-sm">feat/sveltekit-migration</code>
		branch. Routes, components, and integrations are being ported phase by phase.
		Original Next.js sources are preserved under
		<code class="rounded bg-muted px-1.5 py-0.5 text-sm">_legacy/</code>
		until each route is rebuilt.
	</p>
	<p class="text-muted-foreground/70 text-sm">
		See <code>MIGRATION.md</code> for the deviation log.
	</p>
</main>
