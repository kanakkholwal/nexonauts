<script lang="ts">
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import { cn } from "$lib/utils";
	import Building2 from "@lucide/svelte/icons/building-2";
	import Globe from "@lucide/svelte/icons/globe";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Mail from "@lucide/svelte/icons/mail";
	import MapPin from "@lucide/svelte/icons/map-pin";
	import MessageCircle from "@lucide/svelte/icons/message-circle";
	import Send from "@lucide/svelte/icons/send";
	import User from "@lucide/svelte/icons/user";
	import { toast } from "svelte-sonner";

	type FormState = {
		errors?: Record<string, string>;
		values?: {
			name?: string;
			email?: string;
			message?: string;
			category?: string;
			companyName?: string;
			website?: string;
		};
		success?: boolean;
	};

	let { data, form } = $props<{
		data: { defaults: { name: string; email: string } };
		form?: FormState | null;
	}>();

	let isLoading = $state(false);
	let category = $state("");

	$effect(() => {
		if (form?.values?.category) category = form.values.category;
	});

	const CATEGORIES = [
		"Brand Strategy",
		"Marketing / Ads",
		"Development",
		"Design / UI & UX",
		"Partnerships",
		"Other"
	];

	type SocialLink = { href: string; label: string; path: string };

	const socials: SocialLink[] = [
		{
			href: "https://x.com/KanakKholwal",
			label: "X (Twitter)",
			path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
		},
		{
			href: "https://github.com/kanakkholwal/nexonauts",
			label: "GitHub",
			path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-.99-.02-1.95-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
		},
		{
			href: "https://linkedin.com/in/kanak-kholwal",
			label: "LinkedIn",
			path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"
		}
	];
</script>

<svelte:head>
	<title>Contact — Nexonauts</title>
	<meta
		name="description"
		content="Whether you have a question about features, pricing, or just want to say hello, our team is ready to answer."
	/>
</svelte:head>

<div class="bg-background relative min-h-screen overflow-hidden selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="bg-primary/20 absolute top-0 left-1/4 h-96 w-96 rounded-full opacity-20 blur-[128px]"
		></div>
		<div
			class="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 opacity-20 blur-[128px]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-32 lg:px-8">
		<div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-24">
			<div class="flex flex-col gap-10">
				<div class="space-y-4">
					<h1 class="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
						Let's start a <br />
						<span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-500">
							conversation.
						</span>
					</h1>
					<p class="text-muted-foreground max-w-md text-lg leading-relaxed">
						Whether you have a question about features, pricing, or just want to say hello, our
						team is ready to answer all your questions.
					</p>
				</div>

				<div class="space-y-6">
					<div
						class="text-muted-foreground hover:text-foreground flex items-center gap-4 transition-colors"
					>
						<div
							class="bg-muted/50 border-border/50 flex h-10 w-10 items-center justify-center rounded-lg border"
						>
							<Mail class="h-5 w-5" />
						</div>
						<div>
							<p class="text-foreground font-medium">Email us</p>
							<p class="text-sm">support@nexonauts.com</p>
						</div>
					</div>

					<div
						class="text-muted-foreground hover:text-foreground flex items-center gap-4 transition-colors"
					>
						<div
							class="bg-muted/50 border-border/50 flex h-10 w-10 items-center justify-center rounded-lg border"
						>
							<MessageCircle class="h-5 w-5" />
						</div>
						<div>
							<p class="text-foreground font-medium">Live Support</p>
							<p class="text-sm">Available Mon-Fri, 9am-5pm</p>
						</div>
					</div>

					<div
						class="text-muted-foreground hover:text-foreground flex items-center gap-4 transition-colors"
					>
						<div
							class="bg-muted/50 border-border/50 flex h-10 w-10 items-center justify-center rounded-lg border"
						>
							<MapPin class="h-5 w-5" />
						</div>
						<div>
							<p class="text-foreground font-medium">Headquarters</p>
							<p class="text-sm">Worldwide</p>
						</div>
					</div>
				</div>

				<div class="bg-border/50 h-px w-full"></div>

				<div class="space-y-3">
					<p class="text-muted-foreground text-sm font-medium uppercase tracking-wider">
						Follow us
					</p>
					<div class="flex gap-4">
						{#each socials as social (social.href)}
							<a
								href={social.href}
								aria-label={social.label}
								target="_blank"
								rel="noopener noreferrer"
								class="bg-muted/30 hover:bg-primary/10 hover:text-primary hover:border-primary/20 rounded-full border border-transparent p-2 transition-all"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="h-5 w-5"
								>
									<path d={social.path} />
								</svg>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<div
				class="bg-card/30 rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-8 dark:border-white/5"
			>
				{#if form?.success}
					<div class="flex flex-col items-center gap-4 py-8 text-center">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"
						>
							<Send class="h-6 w-6" />
						</div>
						<div class="space-y-1">
							<h3 class="text-lg font-semibold">Message sent</h3>
							<p class="text-muted-foreground text-sm">
								We'll get back to you as soon as possible.
							</p>
						</div>
					</div>
				{:else}
					<form
						method="POST"
						class="space-y-6"
						use:enhance={() => {
							isLoading = true;
							return async ({ result, update }) => {
								if (result.type === "success" && result.data?.success) {
									toast.success("Message sent successfully!");
								} else if (result.type === "failure") {
									const errs = (result.data as FormState)?.errors;
									toast.error(errs?._ ?? "Could not send your message");
								}
								await update();
								isLoading = false;
							};
						}}
					>
						<div class="grid gap-4 md:grid-cols-2">
							<div class="space-y-1">
								<label
									for="contact-name"
									class="text-muted-foreground ml-1 text-xs font-semibold uppercase tracking-wider"
								>
									Name
								</label>
								<div class="relative">
									<User class="text-muted-foreground/50 absolute top-2.5 left-3 h-5 w-5" />
									<Input
										id="contact-name"
										name="name"
										placeholder="John Doe"
										class="bg-background/50 border-border/50 focus:bg-background pl-10 transition-all"
										disabled={isLoading}
										value={form?.values?.name ?? data.defaults.name}
									/>
								</div>
								{#if form?.errors?.name}
									<p class="text-destructive text-xs">{form.errors.name}</p>
								{/if}
							</div>

							<div class="space-y-1">
								<label
									for="contact-email"
									class="text-muted-foreground ml-1 text-xs font-semibold uppercase tracking-wider"
								>
									Email
								</label>
								<div class="relative">
									<Mail class="text-muted-foreground/50 absolute top-2.5 left-3 h-5 w-5" />
									<Input
										id="contact-email"
										name="email"
										type="email"
										placeholder="john@example.com"
										class="bg-background/50 border-border/50 focus:bg-background pl-10 transition-all"
										disabled={isLoading}
										value={form?.values?.email ?? data.defaults.email}
									/>
								</div>
								{#if form?.errors?.email}
									<p class="text-destructive text-xs">{form.errors.email}</p>
								{/if}
							</div>
						</div>

						<div class="grid gap-4 md:grid-cols-2">
							<div class="space-y-1">
								<label
									for="contact-company"
									class="text-muted-foreground ml-1 text-xs font-semibold uppercase tracking-wider"
								>
									Company
								</label>
								<div class="relative">
									<Building2 class="text-muted-foreground/50 absolute top-2.5 left-3 h-5 w-5" />
									<Input
										id="contact-company"
										name="companyName"
										placeholder="Acme Inc."
										class="bg-background/50 border-border/50 focus:bg-background pl-10 transition-all"
										disabled={isLoading}
										value={form?.values?.companyName ?? ""}
									/>
								</div>
							</div>

							<div class="space-y-1">
								<label
									for="contact-website"
									class="text-muted-foreground ml-1 text-xs font-semibold uppercase tracking-wider"
								>
									Website
								</label>
								<div class="relative">
									<Globe class="text-muted-foreground/50 absolute top-2.5 left-3 h-5 w-5" />
									<Input
										id="contact-website"
										name="website"
										placeholder="https://…"
										class="bg-background/50 border-border/50 focus:bg-background pl-10 transition-all"
										disabled={isLoading}
										value={form?.values?.website ?? ""}
									/>
								</div>
							</div>
						</div>

						<div class="space-y-1">
							<p
								class="text-muted-foreground ml-1 text-xs font-semibold uppercase tracking-wider"
							>
								Topic
							</p>
							<input type="hidden" name="category" value={category} />
							<div class="grid grid-cols-2 gap-3 md:grid-cols-3">
								{#each CATEGORIES as item (item)}
									<button
										type="button"
										onclick={() => (category = item)}
										disabled={isLoading}
										class={cn(
											"hover:bg-muted/50 cursor-pointer rounded-xl border px-4 py-3 text-center text-sm transition-all duration-200",
											category === item
												? "bg-primary/10 border-primary/50 text-primary ring-primary/20 font-medium ring-1"
												: "bg-background/50 border-border/50 text-muted-foreground"
										)}
									>
										{item}
									</button>
								{/each}
							</div>
							{#if form?.errors?.category}
								<p class="text-destructive text-xs">{form.errors.category}</p>
							{/if}
						</div>

						<div class="space-y-1">
							<label
								for="contact-message"
								class="text-muted-foreground ml-1 text-xs font-semibold uppercase tracking-wider"
							>
								Message
							</label>
							<Textarea
								id="contact-message"
								name="message"
								placeholder="Tell us about your project..."
								class="bg-background/50 border-border/50 focus:bg-background min-h-[150px] resize-none transition-all"
								disabled={isLoading}
								value={form?.values?.message ?? ""}
							/>
							{#if form?.errors?.message}
								<p class="text-destructive text-xs">{form.errors.message}</p>
							{/if}
						</div>

						<Button
							type="submit"
							size="lg"
							class="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 h-12 w-full rounded-xl text-base font-semibold shadow-lg"
							disabled={isLoading}
						>
							{#if isLoading}
								<Loader2 class="mr-2 h-4 w-4 animate-spin" />
								Sending…
							{:else}
								Send Message
								<Send class="ml-2 h-4 w-4" />
							{/if}
						</Button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>
