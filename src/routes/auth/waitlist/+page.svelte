<script lang="ts">
	import { enhance } from "$app/forms";
	import { env } from "$env/dynamic/public";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { cn } from "$lib/utils";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Mail from "@lucide/svelte/icons/mail";
	import UserRound from "@lucide/svelte/icons/user-round";
	import { toast } from "svelte-sonner";

	type ActionResultData = {
		success?: boolean;
		errors?: Record<string, string>;
		values?: { name?: string; email?: string };
	};

	let { form } = $props<{ form?: ActionResultData | null }>();

	let isLoading = $state(false);

	const websiteName = env.PUBLIC_WEBSITE_NAME ?? "Nexonauts";
</script>

<a
	href="/auth/sign-in"
	class={cn(
		buttonVariants({ variant: "link" }),
		"absolute top-4 right-4 md:top-8 md:right-8"
	)}
>
	Login
</a>

<header class="flex flex-col space-y-2 text-center">
	<h1 class="text-2xl font-semibold tracking-tight">Join {websiteName}</h1>
	<p class="text-muted-foreground text-sm">It's quick and easy.</p>
</header>

<main class="flex w-full flex-col items-center justify-center p-4">
	{#if form?.success}
		<div class="text-center">
			<p class="text-sm">
				Thanks — you're on the waitlist. We'll be in touch.
			</p>
		</div>
	{:else}
		<form
			method="POST"
			class="grid w-full gap-2 text-left"
			use:enhance={() => {
				isLoading = true;
				return async ({ result, update }) => {
					if (result.type === "success" && result.data?.success) {
						toast.success("Added to waitlist successfully");
					} else if (result.type === "failure") {
						const errs = (result.data as ActionResultData)?.errors;
						toast.error(errs?._ ?? errs?.email ?? "Could not add to waitlist");
					}
					await update();
					isLoading = false;
				};
			}}
		>
			<div>
				<div class="relative">
					<label for="wl-name" class="absolute top-1/2 left-4 z-10 -translate-y-1/2">
						<UserRound class="h-4 w-4" />
					</label>
					<Input
						id="wl-name"
						name="name"
						placeholder="Your Name"
						type="text"
						autocapitalize="words"
						autocomplete="name"
						autocorrect="off"
						disabled={isLoading}
						class="pl-10"
						value={form?.values?.name ?? ""}
					/>
				</div>
				{#if form?.errors?.name}
					<p class="text-destructive mt-1 text-xs">{form.errors.name}</p>
				{/if}
			</div>

			<div>
				<div class="relative">
					<label for="wl-email" class="absolute top-1/2 left-4 z-10 -translate-y-1/2">
						<Mail class="h-4 w-4" />
					</label>
					<Input
						id="wl-email"
						name="email"
						placeholder="name@example.com"
						type="email"
						autocapitalize="none"
						autocomplete="email"
						autocorrect="off"
						disabled={isLoading}
						class="pl-10"
						value={form?.values?.email ?? ""}
					/>
				</div>
				{#if form?.errors?.email}
					<p class="text-destructive mt-1 text-xs">{form.errors.email}</p>
				{/if}
			</div>

			<Button type="submit" disabled={isLoading} class="mt-2">
				{#if isLoading}
					<Loader2 class="animate-spin" />
				{/if}
				Join Waitlist
			</Button>
		</form>
	{/if}
</main>
