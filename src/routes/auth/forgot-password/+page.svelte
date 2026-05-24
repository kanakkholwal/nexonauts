<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { authClient } from "$lib/auth-client";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Mail from "@lucide/svelte/icons/mail";
	import { toast } from "svelte-sonner";
	import { z } from "zod";

	const schema = z.object({
		email: z.string().email({ message: "Please enter a valid email address." })
	});

	let email = $state("");
	let isLoading = $state(false);
	let isSuccess = $state(false);
	let submittedEmail = $state("");
	let error = $state<string | null>(null);

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = null;

		const parsed = schema.safeParse({ email });
		if (!parsed.success) {
			error = parsed.error.issues[0]?.message ?? "Invalid email";
			return;
		}

		isLoading = true;
		try {
			await authClient.requestPasswordReset({
				email: parsed.data.email,
				redirectTo: "/auth/reset-password"
			});
			submittedEmail = parsed.data.email;
			isSuccess = true;
			toast.success("Reset link sent!");
		} catch (err) {
			toast.error((err as Error)?.message ?? "Something went wrong.");
		} finally {
			isLoading = false;
		}
	}

	function reset() {
		isSuccess = false;
		email = "";
		submittedEmail = "";
	}
</script>

<div class="flex w-full flex-col gap-6">
	<div class="absolute top-4 right-4 md:top-8 md:right-8">
		<a
			href="/auth/sign-in"
			class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
		>
			Remember your password?
			<span class="text-foreground font-semibold hover:underline">Log in</span>
		</a>
	</div>

	{#if isSuccess}
		<div class="flex flex-col items-center justify-center space-y-4 text-center">
			<div
				class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"
			>
				<Mail class="h-6 w-6" />
			</div>
			<div class="space-y-2">
				<h3 class="text-lg font-semibold">Check your email</h3>
				<p class="text-muted-foreground mx-auto max-w-xs text-sm">
					We've sent a password reset link to
					<span class="text-foreground font-medium">{submittedEmail}</span>.
				</p>
			</div>
			<Button variant="outline" class="mt-4 w-full" onclick={reset}>Try another email</Button>
		</div>
	{:else}
		<div class="mb-4 flex flex-col space-y-2 text-center">
			<h1 class="text-foreground text-3xl font-bold tracking-tight">Reset Password</h1>
			<p class="text-muted-foreground text-sm">
				Enter your email address and we'll send you a link to reset your password.
			</p>
		</div>

		<form class="space-y-4" onsubmit={onSubmit} novalidate>
			<div class="space-y-1">
				<label for="email" class="sr-only">Email</label>
				<div class="relative">
					<div
						class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
					>
						<Mail class="h-4 w-4" />
					</div>
					<Input
						id="email"
						type="email"
						placeholder="name@example.com"
						disabled={isLoading}
						class="h-10 pl-9"
						bind:value={email}
					/>
				</div>
				{#if error}
					<p class="text-destructive text-xs">{error}</p>
				{/if}
			</div>

			<Button type="submit" disabled={isLoading} class="h-10 w-full font-semibold shadow-sm">
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					Send Reset Link
				{/if}
			</Button>

			<a
				href="/auth/sign-in"
				class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs"
			>
				<ArrowLeft class="h-3 w-3" />
				Back to sign in
			</a>
		</form>
	{/if}
</div>
