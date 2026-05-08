<script lang="ts">
	import { appConfig } from "@root/project.config";
	import Copyright from "@lucide/svelte/icons/copyright";
	import FileText from "@lucide/svelte/icons/file-text";
	import Info from "@lucide/svelte/icons/info";
	import Mail from "@lucide/svelte/icons/mail";
	import Scale from "@lucide/svelte/icons/scale";
	import ShieldAlert from "@lucide/svelte/icons/shield-alert";

	const siteName = appConfig.name;
</script>

<svelte:head>
	<title>Copyright Disclaimer — {siteName}</title>
	<meta
		name="description"
		content="Copyright disclaimer, fair use statement, and DMCA compliance for {siteName}."
	/>
</svelte:head>

<div class="bg-background relative min-h-screen selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div
			class="absolute top-0 right-1/2 h-96 w-[90%] translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-4xl px-6 py-20 md:py-28">
		<div class="mb-16 space-y-4 text-center">
			<div
				class="border-primary/20 bg-primary/5 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-xl"
			>
				<Copyright class="h-3 w-3" />
				<span>Intellectual Property</span>
			</div>
			<h1 class="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
				Copyright Disclaimer
			</h1>
			<p class="text-muted-foreground mx-auto max-w-2xl text-lg">
				Respecting rights, acknowledging sources, and maintaining compliance.
			</p>
		</div>

		<div class="space-y-6">
			<div
				class="bg-card/50 border-border/50 rounded-2xl border p-8 shadow-sm backdrop-blur-xl"
			>
				<div class="flex gap-4">
					<div class="shrink-0">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400"
						>
							<Info class="h-5 w-5" />
						</div>
					</div>
					<div class="space-y-2">
						<h3 class="text-foreground text-xl font-semibold">Statement of Intent</h3>
						<p class="text-muted-foreground leading-relaxed">
							At <span class="text-foreground font-semibold">{siteName}</span>, we value
							intellectual property rights and strive to uphold copyright laws. The content,
							including images, graphics, and text, utilized on this platform, is sourced from
							various free resources such as Freepik, Pexels, and other similar platforms, where
							the rights belong to their respective owners.
						</p>
					</div>
				</div>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				<div
					class="bg-card/50 border-border/50 hover:border-primary/20 rounded-2xl border p-8 backdrop-blur-xl transition-colors"
				>
					<div
						class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400"
					>
						<Scale class="h-5 w-5" />
					</div>
					<h4 class="text-foreground mb-2 text-lg font-semibold">Fair Use Statement</h4>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Our platform operates under the principles of fair use. We utilize copyrighted material
						for educational, informational, or illustrative purposes only, always attributing the
						content to its original creators or sources where applicable.
					</p>
				</div>

				<div
					class="bg-card/50 border-border/50 hover:border-primary/20 rounded-2xl border p-8 backdrop-blur-xl transition-colors"
				>
					<div
						class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400"
					>
						<FileText class="h-5 w-5" />
					</div>
					<h4 class="text-foreground mb-2 text-lg font-semibold">Acknowledgment of Ownership</h4>
					<p class="text-muted-foreground text-sm leading-relaxed">
						All copyrighted material used on {siteName} is acknowledged to its respective owners. We
						do not claim ownership or rights over any copyrighted material that isn't developed or
						created by our team.
					</p>
				</div>
			</div>

			<div class="bg-card overflow-hidden rounded-2xl border border-border">
				<div class="bg-muted/30 border-border/50 border-b p-8">
					<div class="mb-4 flex items-center gap-3">
						<ShieldAlert class="h-5 w-5 text-red-500" />
						<h4 class="text-foreground text-lg font-semibold">DMCA Compliance</h4>
					</div>
					<p class="text-muted-foreground leading-relaxed">
						{siteName} complies with the Digital Millennium Copyright Act (DMCA). If you believe
						that your copyrighted work has been used on our platform in a manner that constitutes
						copyright infringement, please contact us immediately.
					</p>
				</div>
				<div class="bg-muted/50 flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
					<p class="text-muted-foreground text-sm">
						Have a copyright concern or takedown request?
					</p>
					<a
						href="/contact"
						class="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-lg transition-colors"
					>
						<Mail class="h-4 w-4" />
						Contact Legal Team
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
