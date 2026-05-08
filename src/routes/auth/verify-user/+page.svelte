<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import XCircle from "@lucide/svelte/icons/x-circle";
	import { onMount } from "svelte";
	import { toast } from "svelte-sonner";

	let { data } = $props();

	const status = $derived<"loading" | "success" | "error">(
		data.result === null ? "loading" : data.result.success ? "success" : "error"
	);

	const message = $derived(data.result?.message ?? "Verifying your credentials...");

	onMount(() => {
		if (data.result === null && !data.loggedIn) {
			goto("/auth/signup");
			return;
		}
		if (data.result?.success) {
			toast.success("Verified!");
			const dest = data.loggedIn ? "/dashboard" : "/auth/sign-in";
			const t = setTimeout(() => goto(dest), 2000);
			return () => clearTimeout(t);
		}
		if (data.result && !data.result.success) {
			toast.error("Verification failed");
		}
	});
</script>

<div class="mx-auto w-full max-w-md space-y-8 text-center">
	<div class="flex justify-center">
		<div
			class={cn(
				"flex h-20 w-20 items-center justify-center rounded-full border-4 transition-all duration-500",
				status === "loading" && "border-muted text-muted-foreground",
				status === "success" && "border-emerald-100 bg-emerald-50 text-emerald-600",
				status === "error" && "border-red-100 bg-red-50 text-red-600"
			)}
		>
			{#if status === "loading"}
				<Loader2 class="h-8 w-8 animate-spin" />
			{:else if status === "success"}
				<CheckCircle2 class="h-10 w-10" />
			{:else}
				<XCircle class="h-10 w-10" />
			{/if}
		</div>
	</div>

	<div class="space-y-2">
		<h1 class="text-foreground text-2xl font-bold tracking-tight">
			{#if status === "loading"}
				Verifying Email
			{:else if status === "success"}
				You're all set!
			{:else}
				Verification Failed
			{/if}
		</h1>
		<p class="text-muted-foreground mx-auto max-w-xs text-sm">{message}</p>
	</div>

	<div class="pt-4">
		{#if status === "success"}
			<p class="text-muted-foreground text-xs">Redirecting you in a moment...</p>
		{:else if status === "error"}
			<div class="flex flex-col gap-3">
				<Button class="w-full" href="/auth/sign-in">Return to Login</Button>
				<Button variant="ghost" class="w-full text-xs" href="/contact">Contact Support</Button>
			</div>
		{/if}
	</div>
</div>
