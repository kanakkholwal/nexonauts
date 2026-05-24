<script lang="ts">
	import { page } from "$app/state";
</script>

<main class="container mx-auto flex min-h-screen flex-col items-center justify-center gap-3 px-4 py-16 text-center">
	<h1 class="text-6xl font-bold">{page.status}</h1>
	<p class="text-muted-foreground">{page.error?.message ?? "Something went wrong."}</p>
	<a href="/" class="text-primary hover:underline">Go home</a>
</main>
