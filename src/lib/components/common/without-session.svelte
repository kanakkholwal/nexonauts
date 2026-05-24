<script lang="ts">
	import { page } from "$app/state";
	import { env } from "$env/dynamic/public";
	import { Button } from "$lib/components/ui/button";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";

	const redirect = $derived(
		encodeURIComponent((env.PUBLIC_WEBSITE_URL ?? "") + page.url.pathname)
	);
</script>

<div
	class="bg-primary/10 relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4"
>
	<div class="m-auto">
		<div
			class="mt-10 flex aspect-square items-center justify-center rounded-xl bg-gray-100 p-2 drop-shadow-lg dark:bg-gray-800"
		>
			<img
				src="/logo-square.png"
				alt="Nexonauts"
				class="h-28 w-28 dark:invert"
				draggable="false"
			/>
		</div>
		<p class="mt-5 text-center text-lg text-gray-600 dark:text-gray-400">You are not logged in</p>

		<Button size="lg" class="mt-5 w-full" href={`/auth/sign-in?redirect=${redirect}`}>
			Login to continue
			<ArrowRight class="ml-2 h-4 w-4" />
		</Button>
	</div>
</div>
