<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { page } from "$app/state";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { authClient } from "$lib/auth-client";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Lock from "@lucide/svelte/icons/lock";
	import Mail from "@lucide/svelte/icons/mail";
	import User from "@lucide/svelte/icons/user";
	import { toast } from "svelte-sonner";

	type ActionResultData = {
		success?: boolean;
		email?: string;
		name?: string;
		errors?: Record<string, string>;
		values?: { name?: string; email?: string };
	};

	let { form } = $props<{ form?: ActionResultData | null }>();

	let loading = $state(false);
	let success = $state(false);
	let successEmail = $state("");

	const redirectPath = $derived(page.url.searchParams.get("redirect") ?? "/dashboard");
</script>

<div class="flex w-full flex-col gap-6">
	<div class="absolute top-4 right-4 md:top-8 md:right-8">
		<a
			href={`/auth/sign-in${page.url.searchParams.get("redirect") ? `?redirect=${page.url.searchParams.get("redirect")}` : ""}`}
			class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
		>
			Already have an account?
			<span class="text-foreground font-semibold hover:underline">Log in</span>
		</a>
	</div>

	{#if success}
		<div class="flex flex-col items-center space-y-6 py-8 text-center">
			<div
				class="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
			>
				<CheckCircle2 class="h-8 w-8" />
			</div>
			<div class="space-y-2">
				<h2 class="text-foreground text-xl font-semibold">Verify your email</h2>
				<p class="text-muted-foreground mx-auto max-w-xs text-sm">
					We've sent a verification link to
					<span class="text-foreground font-medium">{successEmail}</span>. Please check your inbox.
				</p>
			</div>
			<Button class="w-full" href={`/auth/sign-in?redirect=${redirectPath}`}>
				Proceed to Login
				<ArrowRight class="ml-2 h-4 w-4" />
			</Button>
		</div>
	{:else}
		<div class="mb-4 flex flex-col space-y-2 text-center">
			<h1 class="text-foreground text-3xl font-bold tracking-tight">Create an account</h1>
			<p class="text-muted-foreground text-sm">
				Start building your developer identity today.
			</p>
		</div>

		<form
			method="POST"
			class="space-y-4"
			use:enhance={() => {
				loading = true;
				return async ({ result, update }) => {
					if (result.type === "success" && result.data?.success) {
						const data = result.data as ActionResultData;
						successEmail = data.email ?? "";
						const name = data.name ?? "";

						const password =
							(document.getElementById("password") as HTMLInputElement)?.value ?? "";

						await authClient.signUp.email(
							{
								email: successEmail,
								password,
								name,
								username: successEmail.split("@")[0],
								callbackURL: redirectPath
							},
							{
								onSuccess: () => {
									success = true;
									toast.success("Account created!");
								},
								onError: (ctx) => {
									toast.error(ctx.error.message);
								}
							}
						);
					} else if (result.type === "failure") {
						const errs = (result.data as ActionResultData)?.errors;
						if (errs?._) toast.error(errs._);
					} else {
						await applyAction(result);
					}
					await update();
					loading = false;
				};
			}}
		>
			<div class="space-y-1">
				<label for="name" class="sr-only">Full Name</label>
				<div class="relative">
					<div
						class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
					>
						<User class="h-4 w-4" />
					</div>
					<Input
						id="name"
						name="name"
						placeholder="John Doe"
						disabled={loading}
						class="h-10 pl-9"
						value={form?.values?.name ?? ""}
					/>
				</div>
				{#if form?.errors?.name}
					<p class="text-destructive text-xs">{form.errors.name}</p>
				{/if}
			</div>

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
						name="email"
						type="email"
						placeholder="name@example.com"
						disabled={loading}
						class="h-10 pl-9"
						value={form?.values?.email ?? ""}
					/>
				</div>
				{#if form?.errors?.email}
					<p class="text-destructive text-xs">{form.errors.email}</p>
				{/if}
			</div>

			<div class="space-y-1">
				<label for="password" class="sr-only">Password</label>
				<div class="relative">
					<div
						class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
					>
						<Lock class="h-4 w-4" />
					</div>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Create a password"
						disabled={loading}
						class="h-10 pl-9"
					/>
				</div>
				{#if form?.errors?.password}
					<p class="text-destructive text-xs">{form.errors.password}</p>
				{/if}
			</div>

			<Button type="submit" disabled={loading} class="h-10 w-full font-semibold shadow-sm">
				{#if loading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					Create Account
				{/if}
			</Button>
		</form>

		<p class="text-muted-foreground px-8 text-center text-xs">
			By creating an account, you agree to our
			<a href="/tos" class="hover:text-primary underline underline-offset-4">Terms of Service</a>
			and
			<a href="/privacy" class="hover:text-primary underline underline-offset-4">Privacy Policy</a>
			.
		</p>
	{/if}
</div>
