<script lang="ts">
	import { appConfig } from "@root/project.config";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
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

<section class="relative isolate mx-auto max-w-4xl overflow-hidden">

	<!-- Header -->
	<div class="relative z-10 mb-12 space-y-5 pt-20 text-center sm:pt-24">
		<Badge variant="default" size="md">
			<Copyright class="size-3" />
			Intellectual property
		</Badge>
		<h1 class="display-xl text-ink">Copyright Disclaimer</h1>
		<p class="mx-auto max-w-2xl text-base leading-relaxed text-body sm:text-lg">
			Respecting rights, acknowledging sources, and maintaining compliance.
		</p>
	</div>

	<div class="relative z-10 space-y-5">
		<!-- Statement of intent -->
		<article class="rounded-2xl border border-hairline bg-card p-7">
			<div class="flex gap-4">
				<div class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-surface-strong text-ink">
					<Info class="size-5" />
				</div>
				<div class="space-y-2">
					<h3 class="font-display text-2xl font-light tracking-tight text-ink">
						Statement of intent
					</h3>
					<p class="text-base leading-relaxed text-body">
						At <span class="font-medium text-ink">{siteName}</span>, we value intellectual
						property rights and strive to uphold copyright laws. Content used on this platform —
						images, graphics, and text — is sourced from various free resources such as Freepik,
						Pexels, and other similar platforms, where rights belong to their respective owners.
					</p>
				</div>
			</div>
		</article>

		<!-- Two-up: fair use + acknowledgment -->
		<div class="grid gap-5 md:grid-cols-2">
			<article
				class="group relative isolate overflow-hidden rounded-2xl border border-hairline bg-card p-7 transition-all hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
			>
				<GradientOrb hue="mint" size="sm" opacity={0.22} class="-right-16 -top-12" />
				<div class="relative z-10">
					<div
						class="mb-4 flex size-11 items-center justify-center rounded-2xl bg-surface-strong text-ink"
					>
						<Scale class="size-5" />
					</div>
					<h4 class="font-display text-xl font-light tracking-tight text-ink">
						Fair use statement
					</h4>
					<p class="mt-3 text-sm leading-relaxed text-body">
						Our platform operates under the principles of fair use. We utilize copyrighted
						material for educational, informational, or illustrative purposes only, always
						attributing the content to its original creators or sources where applicable.
					</p>
				</div>
			</article>

			<article
				class="group relative isolate overflow-hidden rounded-2xl border border-hairline bg-card p-7 transition-all hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
			>
				<GradientOrb hue="lavender" size="sm" opacity={0.22} class="-right-16 -top-12" />
				<div class="relative z-10">
					<div
						class="mb-4 flex size-11 items-center justify-center rounded-2xl bg-surface-strong text-ink"
					>
						<FileText class="size-5" />
					</div>
					<h4 class="font-display text-xl font-light tracking-tight text-ink">
						Acknowledgment of ownership
					</h4>
					<p class="mt-3 text-sm leading-relaxed text-body">
						All copyrighted material used on {siteName} is acknowledged to its respective owners.
						We do not claim ownership or rights over any copyrighted material that isn't developed
						or created by our team.
					</p>
				</div>
			</article>
		</div>

		<!-- DMCA + CTA -->
		<article class="overflow-hidden rounded-2xl border border-hairline bg-card">
			<div class="border-b border-hairline-soft bg-canvas-soft p-7">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
					>
						<ShieldAlert class="size-5" />
					</div>
					<h4 class="font-display text-xl font-light tracking-tight text-ink">
						DMCA compliance
					</h4>
				</div>
				<p class="text-base leading-relaxed text-body">
					{siteName} complies with the Digital Millennium Copyright Act (DMCA). If you believe that
					your copyrighted work has been used on our platform in a manner that constitutes
					copyright infringement, please contact us immediately.
				</p>
			</div>
			<div
				class="flex flex-col items-start justify-between gap-3 px-7 py-5 sm:flex-row sm:items-center"
			>
				<p class="text-sm text-body">Have a copyright concern or takedown request?</p>
				<Button href="/contact" size="md">
					<Mail class="size-4" />
					Contact us
				</Button>
			</div>
		</article>
	</div>
</section>
