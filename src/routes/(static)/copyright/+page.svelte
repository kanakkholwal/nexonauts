<script lang="ts">
import Copyright from "@tabler/icons-svelte/icons/copyright";
import FileText from "@tabler/icons-svelte/icons/file-text";
import Info from "@tabler/icons-svelte/icons/info-circle";
import Mail from "@tabler/icons-svelte/icons/mail";
import Scale from "@tabler/icons-svelte/icons/scale";
import ShieldAlert from "@tabler/icons-svelte/icons/shield-exclamation";
import { appConfig } from "@/project.config";
import { PageHero } from "$lib/components/site";
import { Badge } from "$lib/components/ui/badge";
import { Button } from "$lib/components/ui/button";

const siteName = appConfig.name;
</script>

<svelte:head>
	<title>Copyright Disclaimer | {siteName}</title>
	<meta
		name="description"
		content="Copyright disclaimer, fair use statement, and DMCA compliance for {siteName}."
	/>
</svelte:head>

<PageHero
	eyebrow="Legal"
	title="Copyright Disclaimer"
	lede="Whose work is whose, where it came from, and how to tell us we got it wrong."
/>

<section class="relative isolate mx-auto w-full max-w-page px-5 pt-16 sm:px-10 lg:px-14">

	<div class="relative z-10 space-y-5">
		<!-- Statement of intent -->
		<article class="rounded-card border border-border bg-card p-7">
			<div class="flex gap-4">
				<div class="flex size-11 shrink-0 items-center justify-center rounded-card bg-surface-strong text-foreground">
					<Info class="size-5" />
				</div>
				<div class="space-y-2">
					<h3 class="font-display text-subheading font-medium tracking-tight text-foreground">
						Statement of intent
					</h3>
					<p class="text-body-sm text-muted-foreground">
						At <span class="font-medium text-foreground">{siteName}</span>, we value intellectual
						property rights and strive to uphold copyright laws. Content used on this platform
						(images, graphics, and text) is sourced from various free resources such as Freepik,
						Pexels, and other similar platforms, where rights belong to their respective owners.
					</p>
				</div>
			</div>
		</article>

		<!-- Two-up: fair use + acknowledgment -->
		<div class="grid gap-5 md:grid-cols-2">
			<article
				class="group relative isolate overflow-hidden rounded-card border border-border bg-card p-7 transition-all hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
			>
				<div class="relative z-10">
					<div
						class="mb-4 flex size-11 items-center justify-center rounded-card bg-surface-strong text-foreground"
					>
						<Scale class="size-5" />
					</div>
					<h4 class="font-display text-subheading font-medium tracking-tight text-foreground">
						Fair use statement
					</h4>
					<p class="mt-3 text-body-sm text-muted-foreground">
						Our platform operates under the principles of fair use. We utilize copyrighted
						material for educational, informational, or illustrative purposes only, always
						attributing the content to its original creators or sources where applicable.
					</p>
				</div>
			</article>

			<article
				class="group relative isolate overflow-hidden rounded-card border border-border bg-card p-7 transition-all hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
			>
				<div class="relative z-10">
					<div
						class="mb-4 flex size-11 items-center justify-center rounded-card bg-surface-strong text-foreground"
					>
						<FileText class="size-5" />
					</div>
					<h4 class="font-display text-subheading font-medium tracking-tight text-foreground">
						Acknowledgment of ownership
					</h4>
					<p class="mt-3 text-body-sm text-muted-foreground">
						All copyrighted material used on {siteName} is acknowledged to its respective owners.
						We do not claim ownership or rights over any copyrighted material that isn't developed
						or created by our team.
					</p>
				</div>
			</article>
		</div>

		<!-- DMCA + CTA -->
		<article class="overflow-hidden rounded-card border border-border bg-card">
			<div class="border-b border-hairline-soft bg-muted p-7">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex size-10 items-center justify-center rounded-card bg-destructive/10 text-destructive"
					>
						<ShieldAlert class="size-5" />
					</div>
					<h4 class="font-display text-subheading font-medium tracking-tight text-foreground">
						DMCA compliance
					</h4>
				</div>
				<p class="text-body-sm text-muted-foreground">
					{siteName} complies with the Digital Millennium Copyright Act (DMCA). If you believe that
					your copyrighted work has been used on our platform in a manner that constitutes
					copyright infringement, please contact us immediately.
				</p>
			</div>
			<div
				class="flex flex-col items-start justify-between gap-3 px-7 py-5 sm:flex-row sm:items-center"
			>
				<p class="text-body-sm text-muted-foreground">Have a copyright concern or takedown request?</p>
				<Button href="/contact" size="md">
					<Mail class="size-4" />
					Contact us
				</Button>
			</div>
		</article>
	</div>
</section>
