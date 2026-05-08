<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { authClient } from "$lib/auth-client";
	import { cn } from "$lib/utils";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Lock from "@lucide/svelte/icons/lock";
	import Mail from "@lucide/svelte/icons/mail";
	import { toast } from "svelte-sonner";
	import { z } from "zod";

	const schema = z.object({
		email: z
			.string()
			.email({ message: "Please enter a valid email address." })
			.min(5)
			.max(100),
		password: z.string().min(1, { message: "Password is required." })
	});

	let email = $state("");
	let password = $state("");
	let errors = $state<{ email?: string; password?: string }>({});
	let isLoading = $state(false);

	const callbackUrl = $derived(
		page.url.searchParams.get("callbackUrl") ??
			page.url.searchParams.get("redirect") ??
			"/dashboard"
	);

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errors = {};
		const parsed = schema.safeParse({ email, password });
		if (!parsed.success) {
			const fieldErrors: typeof errors = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path[0] as "email" | "password";
				fieldErrors[key] = issue.message;
			}
			errors = fieldErrors;
			return;
		}

		isLoading = true;
		await authClient.signIn.email(
			{
				email: parsed.data.email,
				password: parsed.data.password,
				callbackURL: callbackUrl
			},
			{
				onSuccess: () => {
					toast.success("Welcome back!");
					goto(callbackUrl);
				},
				onError: (ctx) => {
					if (ctx.error.status === 403) {
						toast.error("Please verify your email address first.");
					} else {
						toast.error(ctx.error.message ?? "Invalid credentials.");
					}
				},
				onResponse: () => {
					isLoading = false;
				}
			}
		);
	}

	async function onGoogle() {
		isLoading = true;
		await authClient.signIn.social({
			provider: "google",
			callbackURL: callbackUrl,
			errorCallbackURL: "/auth/sign-in?error=social"
		});
	}
</script>

<div class="flex w-full flex-col gap-6">
	<div class="absolute top-4 right-4 md:top-8 md:right-8">
		<a
			href={`/auth/signup${page.url.searchParams.get("redirect") ? `?redirect=${page.url.searchParams.get("redirect")}` : ""}`}
			class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
		>
			Don't have an account?
			<span class="text-foreground font-semibold hover:underline">Sign Up</span>
		</a>
	</div>

	<div class="mb-4 flex flex-col space-y-2 text-center">
		<h1 class="text-foreground text-3xl font-bold tracking-tight">Welcome back</h1>
		<p class="text-muted-foreground text-sm">Enter your credentials to access your workspace.</p>
	</div>

	<form class="grid gap-4" onsubmit={onSubmit} novalidate>
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
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
					class="h-10 pl-9"
					bind:value={email}
				/>
			</div>
			{#if errors.email}
				<p class="text-destructive text-xs">{errors.email}</p>
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
					type="password"
					placeholder="Password"
					autocapitalize="none"
					autocomplete="current-password"
					disabled={isLoading}
					class="h-10 pl-9"
					bind:value={password}
				/>
			</div>
			{#if errors.password}
				<p class="text-destructive text-xs">{errors.password}</p>
			{/if}
			<div class="flex justify-end">
				<a
					href="/auth/forgot-password"
					class="text-muted-foreground hover:text-primary text-xs transition-colors"
				>
					Forgot password?
				</a>
			</div>
		</div>

		<Button type="submit" disabled={isLoading} class="h-10 w-full font-semibold shadow-sm">
			{#if isLoading}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				Sign In with Email
			{/if}
		</Button>
	</form>

	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="border-border/50 w-full border-t"></span>
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background text-muted-foreground px-2">Or continue with</span>
		</div>
	</div>

	<Button variant="outline" size="lg" type="button" disabled={isLoading} onclick={onGoogle}>
		{#if isLoading}
			<Loader2 class="animate-spin" />
		{:else}
			<svg viewBox="0 0 24 24" class="h-4 w-4">
				<path
					fill="#4285F4"
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				/>
				<path
					fill="#34A853"
					d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				/>
				<path
					fill="#FBBC05"
					d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
				/>
				<path
					fill="#EA4335"
					d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
				/>
			</svg>
		{/if}
		Google
	</Button>

	<p class="text-muted-foreground px-8 text-center text-xs">
		By clicking continue, you agree to our
		<a href="/tos" class="hover:text-primary underline underline-offset-4">Terms of Service</a>
		and
		<a href="/privacy" class="hover:text-primary underline underline-offset-4">Privacy Policy</a>.
	</p>
</div>
