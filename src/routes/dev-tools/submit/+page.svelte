<script lang="ts">
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { cn } from "$lib/utils";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import LinkIcon from "@lucide/svelte/icons/link";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Mail from "@lucide/svelte/icons/mail";
	import Rocket from "@lucide/svelte/icons/rocket";
	import Send from "@lucide/svelte/icons/send";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import Terminal from "@lucide/svelte/icons/terminal";
	import User from "@lucide/svelte/icons/user";
	import { toast } from "svelte-sonner";

	type FormState = {
		success?: boolean;
		errors?: Record<string, string>;
		values?: {
			name?: string;
			email?: string;
			website?: string;
			github_username?: string;
			github_repo?: string;
		};
	};

	let { data, form } = $props<{ data: { defaults: FormState["values"] }; form?: FormState | null }>();

	let isLoading = $state(false);

	const benefits = [
		{
			icon: Rocket,
			title: "Instant Visibility",
			description:
				"Get your tool in front of developers, designers, and creators already browsing the ecosystem."
		},
		{
			icon: ShieldCheck,
			title: "Vetted & Trusted",
			description:
				"Every submission is manually reviewed before it is surfaced in the directory."
		},
		{
			icon: CheckCircle2,
			title: "Community Feedback",
			description:
				"Open a path for usage feedback, bug reports, and improvement requests from real builders."
		}
	];
</script>

<svelte:head>
	<title>Submit Your Tool to the Nexonauts Ecosystem</title>
	<meta
		name="description"
		content="Submit your open-source tool, utility, or UI workflow to the Nexonauts developer ecosystem."
	/>
</svelte:head>

<main class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
		<section class="space-y-10">
			<div class="space-y-4">
				<div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
					<Rocket class="h-3 w-3" />
					Join the Ecosystem
				</div>
				<h1 class="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
					Showcase your tool
					<br />
					to the world.
				</h1>
				<p class="max-w-xl text-lg leading-relaxed text-muted-foreground">
					Whether you built a browser utility, a workflow helper, or a polished UI resource, this is the intake path for the SvelteKit directory.
				</p>
			</div>

			<ul class="space-y-6">
				{#each benefits as benefit (benefit.title)}
					{@const Icon = benefit.icon}
					<li class="flex items-start gap-4">
						<div class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Icon class="h-5 w-5" />
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-foreground">{benefit.title}</h3>
							<p class="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
						</div>
					</li>
				{/each}
			</ul>

			<div class="flex max-w-md items-center gap-3 rounded-lg border border-border/50 bg-muted/50 p-4 text-sm text-muted-foreground">
				<ShieldCheck class="h-5 w-5 shrink-0" />
				<p>All submissions are reviewed before going live. Typical review time is 24-48 hours.</p>
			</div>
		</section>

		<div class="relative rounded-3xl border border-border/60 bg-background/60 p-8 shadow-2xl backdrop-blur-xl md:p-10">
			<div class="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-violet-500/20 opacity-70 blur-xl"></div>
			<h2 class="mb-6 text-2xl font-bold">Submission Details</h2>

			{#if form?.success}
				<div class="flex flex-col items-center gap-4 py-12 text-center">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
						<Send class="h-6 w-6" />
					</div>
					<div class="space-y-1">
						<h3 class="text-lg font-semibold">Submission received</h3>
						<p class="text-sm text-muted-foreground">We’ll review it and reach out if we need more detail.</p>
					</div>
				</div>
			{:else}
				<form
					method="POST"
					class="space-y-8"
					use:enhance={() => {
						isLoading = true;
						return async ({ result, update }) => {
							if (result.type === "success" && result.data?.success) {
								toast.success("Submission received");
							} else if (result.type === "failure") {
								toast.error((result.data as FormState)?.errors?._ ?? "Could not submit the tool");
							}
							await update();
							isLoading = false;
						};
					}}
				>
					<div class="space-y-4">
						<h3 class="border-b border-border/50 pb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
							About You
						</h3>
						<div class="grid gap-5">
							<div class="grid gap-2">
								<label for="submit-name" class="text-sm font-medium">Your Name</label>
								<div class="relative">
									<User class="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
									<Input id="submit-name" name="name" class="bg-background/50 pl-10" value={form?.values?.name ?? data.defaults.name ?? ""} disabled={isLoading} />
								</div>
								{#if form?.errors?.name}<p class="text-destructive text-xs">{form.errors.name}</p>{/if}
							</div>

							<div class="grid gap-2">
								<label for="submit-email" class="text-sm font-medium">Email Address</label>
								<div class="relative">
									<Mail class="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
									<Input id="submit-email" name="email" type="email" class="bg-background/50 pl-10" value={form?.values?.email ?? data.defaults.email ?? ""} disabled={isLoading} />
								</div>
								<p class="text-xs text-muted-foreground">We only use this to follow up on the submission.</p>
								{#if form?.errors?.email}<p class="text-destructive text-xs">{form.errors.email}</p>{/if}
							</div>
						</div>
					</div>

					<div class="space-y-4">
						<h3 class="border-b border-border/50 pb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
							Project Links
						</h3>
						<div class="grid gap-5">
							<div class="grid gap-2">
								<label for="submit-website" class="text-sm font-medium">Portfolio / Social URL</label>
								<div class="relative">
									<LinkIcon class="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
									<Input id="submit-website" name="website" type="url" class="bg-background/50 pl-10" value={form?.values?.website ?? ""} disabled={isLoading} placeholder="https://your-site.com" />
								</div>
								{#if form?.errors?.website}<p class="text-destructive text-xs">{form.errors.website}</p>{/if}
							</div>

							<div class="grid gap-5 md:grid-cols-2">
								<div class="grid gap-2">
									<label for="submit-gh-user" class="text-sm font-medium">GitHub Username</label>
									<div class="relative">
										<Terminal class="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
										<Input id="submit-gh-user" name="github_username" class="bg-background/50 pl-10" value={form?.values?.github_username ?? ""} disabled={isLoading} placeholder="janedoe" />
									</div>
								</div>
								<div class="grid gap-2">
									<label for="submit-gh-repo" class="text-sm font-medium">Repository URL</label>
									<div class="relative">
										<LinkIcon class="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
										<Input id="submit-gh-repo" name="github_repo" type="url" class="bg-background/50 pl-10" value={form?.values?.github_repo ?? ""} disabled={isLoading} placeholder="https://github.com/owner/repo" />
									</div>
									{#if form?.errors?.github_repo}<p class="text-destructive text-xs">{form.errors.github_repo}</p>{/if}
								</div>
							</div>

							<p class="text-xs text-muted-foreground">Provide at least one public URL so the submission can be reviewed.</p>
							{#if form?.errors?._}
								<p class={cn("text-xs", form.errors._ ? "text-destructive" : "text-muted-foreground")}>{form.errors._}</p>
							{/if}
						</div>
					</div>

					<Button type="submit" size="lg" class="w-full text-base font-semibold" disabled={isLoading}>
						{#if isLoading}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Submitting…
						{:else}
							Submit for Review
							<Send class="ml-2 h-4 w-4" />
						{/if}
					</Button>
				</form>
			{/if}
		</div>
	</div>
</main>
