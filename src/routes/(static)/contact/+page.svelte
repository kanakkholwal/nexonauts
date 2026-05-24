<script lang="ts">
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Badge } from "$lib/components/ui/badge";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
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

	const contactBlocks = [
		{ icon: Mail, label: "Email us", value: "support@nexonauts.com" },
		{ icon: MessageCircle, label: "Live support", value: "Mon–Fri, 9am–5pm" },
		{ icon: MapPin, label: "Headquarters", value: "Worldwide" }
	];
</script>

<svelte:head>
	<title>Contact — Nexonauts</title>
	<meta
		name="description"
		content="Whether you have a question about features, pricing, or just want to say hello, our team is ready to answer."
	/>
</svelte:head>

<section class="relative isolate overflow-hidden pt-20 pb-16 sm:pt-24">
	<GradientOrb hue="peach" size="lg" opacity={0.35} class="-left-32 -top-20" />
	<GradientOrb hue="lavender" size="lg" opacity={0.32} class="-right-32 top-1/3" />

	<div class="relative z-10 grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
		<!-- Left: invitation + contact rows -->
		<div class="flex flex-col gap-10">
			<div class="space-y-5">
				<Badge variant="default" size="md">Get in touch</Badge>
				<h1 class="display-xl text-ink">
					Let's start a<br />
					<span class="text-muted-ink">conversation.</span>
				</h1>
				<p class="max-w-md text-base leading-relaxed text-body">
					Whether you have a question about features, pricing, or just want to say hello, our team
					is ready to answer.
				</p>
			</div>

			<div class="space-y-4">
				{#each contactBlocks as block (block.label)}
					{@const Icon = block.icon}
					<div class="flex items-center gap-4">
						<div
							class="flex size-11 items-center justify-center rounded-2xl border border-hairline bg-canvas-soft text-ink"
						>
							<Icon class="size-5" />
						</div>
						<div>
							<p class="text-sm font-medium text-ink">{block.label}</p>
							<p class="text-sm text-body">{block.value}</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="h-px w-full bg-hairline"></div>

			<div class="space-y-3">
				<p class="eyebrow text-muted-ink">Follow us</p>
				<div class="flex gap-2.5">
					{#each socials as social (social.href)}
						<a
							href={social.href}
							aria-label={social.label}
							target="_blank"
							rel="noopener noreferrer"
							class="flex size-10 items-center justify-center rounded-full border border-hairline-strong bg-canvas text-muted-ink transition-colors hover:bg-surface-strong hover:text-ink"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-4"
							>
								<path d={social.path} />
							</svg>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right: form card -->
		<div
			class="relative rounded-3xl border border-hairline bg-canvas-soft p-6 sm:p-8 soft-drop"
		>
			{#if form?.success}
				<div class="flex flex-col items-center gap-4 py-12 text-center">
					<div
						class="flex size-12 items-center justify-center rounded-full bg-success/12 text-success"
					>
						<Send class="size-6" />
					</div>
					<div class="space-y-1">
						<h3 class="font-display text-2xl font-light text-ink">Message sent</h3>
						<p class="text-sm text-body">We'll get back to you as soon as possible.</p>
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
						<div class="space-y-1.5">
							<label
								for="contact-name"
								class="eyebrow ml-1 text-muted-ink"
							>
								Name
							</label>
							<div class="relative">
								<User class="absolute left-3.5 top-3 size-5 text-muted-soft" />
								<Input
									id="contact-name"
									name="name"
									placeholder="John Doe"
									class="pl-11"
									disabled={isLoading}
									value={form?.values?.name ?? data.defaults.name}
								/>
							</div>
							{#if form?.errors?.name}
								<p class="text-xs text-destructive">{form.errors.name}</p>
							{/if}
						</div>

						<div class="space-y-1.5">
							<label for="contact-email" class="eyebrow ml-1 text-muted-ink">Email</label>
							<div class="relative">
								<Mail class="absolute left-3.5 top-3 size-5 text-muted-soft" />
								<Input
									id="contact-email"
									name="email"
									type="email"
									placeholder="john@example.com"
									class="pl-11"
									disabled={isLoading}
									value={form?.values?.email ?? data.defaults.email}
								/>
							</div>
							{#if form?.errors?.email}
								<p class="text-xs text-destructive">{form.errors.email}</p>
							{/if}
						</div>
					</div>

					<div class="grid gap-4 md:grid-cols-2">
						<div class="space-y-1.5">
							<label for="contact-company" class="eyebrow ml-1 text-muted-ink">Company</label>
							<div class="relative">
								<Building2 class="absolute left-3.5 top-3 size-5 text-muted-soft" />
								<Input
									id="contact-company"
									name="companyName"
									placeholder="Acme Inc."
									class="pl-11"
									disabled={isLoading}
									value={form?.values?.companyName ?? ""}
								/>
							</div>
						</div>

						<div class="space-y-1.5">
							<label for="contact-website" class="eyebrow ml-1 text-muted-ink">Website</label>
							<div class="relative">
								<Globe class="absolute left-3.5 top-3 size-5 text-muted-soft" />
								<Input
									id="contact-website"
									name="website"
									placeholder="https://…"
									class="pl-11"
									disabled={isLoading}
									value={form?.values?.website ?? ""}
								/>
							</div>
						</div>
					</div>

					<div class="space-y-1.5">
						<p class="eyebrow ml-1 text-muted-ink">Topic</p>
						<input type="hidden" name="category" value={category} />
						<div class="grid grid-cols-2 gap-2.5 md:grid-cols-3">
							{#each CATEGORIES as item (item)}
								<button
									type="button"
									onclick={() => (category = item)}
									disabled={isLoading}
									class={cn(
										"cursor-pointer rounded-pill border px-3.5 py-2 text-center text-xs font-medium uppercase tracking-[0.06em] transition-all",
										category === item
											? "border-transparent bg-primary text-primary-foreground"
											: "border-hairline-strong bg-canvas text-body hover:bg-surface-strong hover:text-ink"
									)}
								>
									{item}
								</button>
							{/each}
						</div>
						{#if form?.errors?.category}
							<p class="text-xs text-destructive">{form.errors.category}</p>
						{/if}
					</div>

					<div class="space-y-1.5">
						<label for="contact-message" class="eyebrow ml-1 text-muted-ink">Message</label>
						<Textarea
							id="contact-message"
							name="message"
							placeholder="Tell us about your project..."
							class="min-h-[160px] resize-none"
							disabled={isLoading}
							value={form?.values?.message ?? ""}
						/>
						{#if form?.errors?.message}
							<p class="text-xs text-destructive">{form.errors.message}</p>
						{/if}
					</div>

					<Button type="submit" size="lg" class="w-full" disabled={isLoading}>
						{#if isLoading}
							<Loader2 class="size-4 animate-spin" />
							Sending…
						{:else}
							Send message
							<Send class="size-4" />
						{/if}
					</Button>
				</form>
			{/if}
		</div>
	</div>
</section>
