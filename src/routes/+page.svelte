<script lang="ts">
	import { appConfig } from "@root/project.config";
	import { FOOTER_LINKS } from "data/root";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import Check from "@lucide/svelte/icons/check";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import FileText from "@lucide/svelte/icons/file-text";
	import MonitorPlay from "@lucide/svelte/icons/monitor-play";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import Sparkles from "@lucide/svelte/icons/sparkles";

	const nav = [
		{ label: "Products", href: "#products" },
		{ label: "Guides", href: "#guides" },
		{ label: "Studio", href: "#studio" }
	];

	const products = [
		{
			eyebrow: "Desktop product",
			title: "Recast",
			description:
				"Fast, local-first screen and webcam recording for people who want clean output without cloud friction.",
			href: "/recast",
			external: false,
			icon: MonitorPlay,
			points: ["Windows desktop today", "Local-first workflow", "Built for short, repeatable capture loops"]
		},
		{
			eyebrow: "Open documentation tooling",
			title: "Docvia",
			description:
				"Compile markdown into richer docs with directive-based components while keeping the authoring model simple.",
			href: "https://docvia.dev",
			external: true,
			icon: FileText,
			points: ["Framework-flexible output", "Directive-based authoring", "Made for real documentation teams"]
		}
	];

	const proofs = [
		{ value: "2", label: "core products in active use" },
		{ value: "1", label: "shared studio for tools and technical writing" },
		{ value: "0", label: "interest in bloated feature surfaces" }
	];

	const trustItems = ["Recast", "Docvia", "Guides", "Local-first", "SvelteKit", "TypeScript"];

	const principles = [
		{
			title: "Built to ship",
			description: "Every surface is reduced to the steps needed to record, publish, or understand something faster."
		},
		{
			title: "Local-first where it matters",
			description: "The products favor workflows that keep speed, privacy, and reliability close to the machine."
		},
		{
			title: "Readable by default",
			description: "Guides and interfaces are structured to make the next decision obvious instead of decorative."
		},
		{
			title: "Small surface area",
			description: "The studio stays intentionally narrow so each tool can feel sharp instead of generic."
		}
	];

	const guideTopics = [
		"TypeScript patterns that survive real projects",
		"Svelte and SvelteKit architecture without tutorial fluff",
		"Documentation systems and content pipelines",
		"Developer workflows that trade complexity for speed"
	];
</script>

<svelte:head>
	<title>Nexonauts - Tools and writing for developers</title>
	<meta
		name="description"
		content="A small studio of developer tools and technical writing. Home of Recast and Docvia."
	/>
</svelte:head>

<main class="landing-shell bg-background text-foreground">
	<div class="landing-ambient"></div>

	<section class="px-5 pt-5 sm:px-7 lg:px-10">
		<header class="landing-header mx-auto max-w-6xl">
			<a href="/" class="flex items-center gap-3 text-sm font-semibold tracking-[0.02em]">
				<img src={appConfig.logoSquare} alt="" class="h-8 w-8 rounded-xl" />
				<span>{appConfig.name}</span>
			</a>

			<nav class="hidden items-center gap-7 text-sm text-[color:var(--landing-muted)] md:flex">
				{#each nav as item (item.label)}
					<a href={item.href} class="transition-colors hover:text-[color:var(--landing-ink)]">
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-3">
				<a href="/guides" class="hidden text-sm text-[color:var(--landing-muted)] sm:inline-flex">
					Read guides
				</a>
				<a href="/recast" class="landing-button landing-button-primary">
					Try Recast
					<ArrowRight class="h-4 w-4" />
				</a>
			</div>
		</header>
	</section>

	<section class="landing-hero-scene pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
		<div class="landing-hero-fade">
			<div class="mx-auto max-w-6xl px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
				<div class="mx-auto max-w-3xl text-center">
					<div class="landing-pill mx-auto mb-6">
						<Sparkles class="h-4 w-4 text-[color:var(--landing-accent)]" />
						<span>Small studio, focused product surface</span>
					</div>

					<h1 class="mx-auto max-w-3xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
						Tools and writing for the people who ship.
					</h1>

					<p class="mx-auto mt-6 max-w-2xl text-base leading-7 text-[color:var(--landing-muted)] sm:text-lg">
						Nexonauts builds a narrow set of developer tools and practical guides. The goal is not a broad platform. The goal is cleaner workflows for recording, documenting, and shipping.
					</p>

					<div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
						<a href="/recast" class="landing-button landing-button-primary">
							Open Recast
							<ArrowRight class="h-4 w-4" />
						</a>
						<a href="#products" class="landing-button landing-button-secondary">See the stack</a>
					</div>
				</div>

				<div class="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
					<div class="landing-panel landing-soft-panel p-5 sm:p-6">
						<div class="flex items-center justify-between gap-4">
							<div>
								<p class="text-xs font-semibold tracking-[0.18em] uppercase text-[color:var(--landing-muted)]">
									Studio focus
								</p>
								<h2 class="mt-2 text-2xl font-semibold tracking-[-0.03em]">Designed to stay sharp</h2>
							</div>
							<div class="landing-status">
								<ShieldCheck class="h-4 w-4" />
								<span>Live</span>
							</div>
						</div>

						<div class="mt-6 grid gap-3">
							<div class="landing-tile">
								<p class="text-sm font-medium">Recast</p>
								<p class="mt-1 text-sm text-[color:var(--landing-muted)]">Recording workflow with minimal setup and local-first behavior.</p>
							</div>
							<div class="landing-tile">
								<p class="text-sm font-medium">Docvia</p>
								<p class="mt-1 text-sm text-[color:var(--landing-muted)]">Documentation compiler for teams that want richer output from markdown.</p>
							</div>
							<div class="landing-tile">
								<p class="text-sm font-medium">Guides</p>
								<p class="mt-1 text-sm text-[color:var(--landing-muted)]">Working notes on TypeScript, Svelte, and shipping-oriented engineering patterns.</p>
							</div>
						</div>
					</div>

					<div class="landing-glass-quote p-6 sm:p-7">
						<p class="landing-card-eyebrow">Why this matters</p>
						<p class="mt-3 max-w-lg text-xl leading-8 font-medium tracking-[-0.03em] text-[color:var(--landing-ink)]">
							Complex workflows do not need a complex surface. The best tools disappear into the path between intent and output.
						</p>
						<p class="mt-6 text-sm leading-6 text-[color:var(--landing-muted)]">
							The page should feel structured, atmospheric, and slightly editorial instead of flat SaaS boilerplate.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="px-5 pb-14 sm:px-7 sm:pb-20 lg:px-10">
		<div class="mx-auto max-w-6xl">
			<div class="landing-band grid gap-px overflow-hidden rounded-[28px] border border-[color:var(--landing-border)] md:grid-cols-3">
				{#each proofs as proof (proof.label)}
					<div class="bg-white/70 px-6 py-7">
						<div class="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{proof.value}</div>
						<p class="mt-2 max-w-xs text-sm leading-6 text-[color:var(--landing-muted)]">
							{proof.label}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="px-5 pb-14 sm:px-7 sm:pb-20 lg:px-10">
		<div class="mx-auto max-w-6xl">
			<div class="landing-trust-row">
				{#each trustItems as item (item)}
					<div class="landing-trust-mark">{item}</div>
				{/each}
			</div>
		</div>
	</section>

	<section id="products" class="px-5 py-14 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
		<div class="mx-auto max-w-6xl">
			<div class="max-w-2xl">
				<p class="landing-eyebrow">Products</p>
				<h2 class="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Designed to convert effort into output.</h2>
				<p class="mt-4 text-base leading-7 text-[color:var(--landing-muted)] sm:text-lg">
					Each product has a clear job. One captures. One compiles. Both are built to remove avoidable friction from everyday developer work.
				</p>
			</div>

			<div class="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2">
				{#each products as product (product.title)}
					{@const Icon = product.icon}
					<article class="landing-panel flex h-full flex-col p-6 sm:p-7">
						<div class="flex items-start justify-between gap-4">
							<div>
								<p class="landing-card-eyebrow">{product.eyebrow}</p>
								<h3 class="mt-2 text-2xl font-semibold tracking-[-0.03em]">{product.title}</h3>
							</div>
							<div class="landing-icon-wrap">
								<Icon class="h-5 w-5" />
							</div>
						</div>

						<p class="mt-4 text-sm leading-7 text-[color:var(--landing-muted)] sm:text-base">
							{product.description}
						</p>

						<div class="mt-6 grid gap-3">
							{#each product.points as point (point)}
								<div class="landing-feature-line">
									<Check class="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--landing-accent)]" />
									<span>{point}</span>
								</div>
							{/each}
						</div>

						<div class="mt-7">
							<a
								href={product.href}
								target={product.external ? "_blank" : undefined}
								rel={product.external ? "noreferrer noopener" : undefined}
								class="landing-inline-link"
							>
								<span>{product.external ? "Visit site" : "Open product"}</span>
								{#if product.external}
									<ExternalLink class="h-4 w-4" />
								{:else}
									<ArrowRight class="h-4 w-4" />
								{/if}
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section id="studio" class="px-5 py-14 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
		<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
			<div class="max-w-xl">
				<p class="landing-eyebrow">Studio principles</p>
				<h2 class="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
					Built for people who prefer precision over platform sprawl.
				</h2>
				<p class="mt-4 text-base leading-7 text-[color:var(--landing-muted)] sm:text-lg">
					The landing page should feel like a product company homepage, not a creator portfolio. That means proof, clarity, controlled surfaces, and a narrow set of promises.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				{#each principles as principle (principle.title)}
					<div class="landing-panel p-6">
						<p class="text-lg font-semibold tracking-[-0.02em]">{principle.title}</p>
						<p class="mt-3 text-sm leading-7 text-[color:var(--landing-muted)]">
							{principle.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="landing-sky-scene py-14 sm:py-20 lg:py-24">
		<div class="mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
			<div class="px-2 py-16 text-center sm:px-6 sm:py-20">
				<div class="mx-auto max-w-2xl">
					<p class="landing-pill landing-pill-on-dark mx-auto">
						<Sparkles class="h-4 w-4 text-white" />
						<span>Operational notes, not filler</span>
					</p>
					<h2 class="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
						Atmosphere matters when the product asks for trust.
					</h2>
					<p class="mt-4 text-base leading-7 text-white/82 sm:text-lg">
						The reference site uses art-backed pauses between dense product sections. Nexonauts needs the same kind of reset so the page feels deliberate instead of uniformly card-driven.
					</p>
					<a href="/guides" class="landing-button landing-button-cloud mt-7">
						Read the guides
						<BookOpen class="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	</section>

	<section id="guides" class="px-5 py-14 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
		<div class="mx-auto max-w-6xl">
			<div class="landing-dark-panel overflow-hidden p-7 sm:p-9">
				<div class="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
					<div class="max-w-xl">
						<p class="text-sm font-semibold tracking-[0.18em] uppercase text-white/55">Guides</p>
						<h2 class="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
							Writing that stays close to working code.
						</h2>
						<p class="mt-4 text-base leading-7 text-white/72 sm:text-lg">
							The guides are meant to explain the patterns behind the tools, not just advertise them. They should feel like operational notes you would actually keep nearby.
						</p>
						<a href="/guides" class="landing-button landing-button-dark mt-7">
							Browse guides
							<BookOpen class="h-4 w-4" />
						</a>
					</div>

					<div class="grid gap-3">
						{#each guideTopics as topic (topic)}
							<div class="landing-dark-tile">
								<div class="flex items-start gap-3">
									<div class="mt-1 h-2.5 w-2.5 rounded-full bg-[color:var(--landing-accent)]"></div>
									<p class="text-sm leading-7 text-white/86 sm:text-base">{topic}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="px-5 pt-8 pb-16 sm:px-7 sm:pb-20 lg:px-10 lg:pb-24">
		<div class="mx-auto max-w-6xl">
			<div class="landing-cta rounded-[32px] px-7 py-9 sm:px-10 sm:py-12">
				<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
					<div class="max-w-2xl">
						<p class="landing-eyebrow">Start with one clean workflow</p>
						<h2 class="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
							Use Recast now, then explore the rest of the studio.
						</h2>
						<p class="mt-4 text-base leading-7 text-[color:var(--landing-muted)] sm:text-lg">
							If you only touch one thing on the site, it should be obvious where to begin.
						</p>
					</div>
					<div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
						<a href="/recast" class="landing-button landing-button-primary">
							Open Recast
							<ArrowRight class="h-4 w-4" />
						</a>
						<a href={appConfig.githubRepo} class="landing-button landing-button-secondary">
							GitHub
							<ExternalLink class="h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="landing-footer-scene mt-6"></section>

	<footer class="px-5 pb-10 sm:px-7 lg:px-10">

		<div class="mx-auto grid max-w-6xl gap-10 border-t border-[color:var(--landing-border)] pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
			<div class="max-w-md">
				<p class="text-lg font-semibold tracking-[-0.02em]">{appConfig.name}</p>
				<p class="mt-3 text-sm leading-7 text-[color:var(--landing-muted)]">
					Developer tools and technical writing with a narrow product surface and a shipping-first bias.
				</p>
			</div>

			<div class="grid gap-8 sm:grid-cols-3">
				{#each FOOTER_LINKS as group (group.title)}
					<div>
						<p class="text-xs font-semibold tracking-[0.18em] uppercase text-[color:var(--landing-muted)]">
							{group.title}
						</p>
						<div class="mt-4 flex flex-col gap-3 text-sm">
							{#each group.links as link (link.href)}
								<a href={link.href} class="transition-colors hover:text-[color:var(--landing-accent)]">
									{link.title}
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</footer>
</main>

<style>
	:global(:root) {
		--landing-bg: #f5f1ea;
		--landing-bg-strong: #efe7dd;
		--landing-ink: #171411;
		--landing-muted: #67615b;
		--landing-border: rgba(23, 20, 17, 0.1);
		--landing-panel: rgba(255, 255, 255, 0.72);
		--landing-accent: #4a9168;
		--landing-accent-soft: rgba(74, 145, 104, 0.12);
		--landing-shadow: 0 12px 40px rgba(23, 20, 17, 0.06);
		--landing-shadow-strong: 0 20px 70px rgba(23, 20, 17, 0.09);
	}

	.landing-shell {
		position: relative;
		min-height: 100vh;
		background:
			radial-gradient(circle at top left, rgba(96, 156, 120, 0.12), transparent 30%),
			radial-gradient(circle at 85% 8%, rgba(255, 255, 255, 0.82), transparent 24%),
			linear-gradient(180deg, var(--landing-bg) 0%, #f8f4ee 48%, #f6f2eb 100%);
		color: var(--landing-ink);
	}

	.landing-ambient {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			linear-gradient(rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 18%),
			repeating-linear-gradient(
				90deg,
				rgba(23, 20, 17, 0.02) 0,
				rgba(23, 20, 17, 0.02) 1px,
				transparent 1px,
				transparent 120px
			);
		mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
	}

	.landing-header,
	.landing-panel,
	.landing-band,
	.landing-dark-panel,
	.landing-cta,
	.landing-hero-scene,
	.landing-sky-scene,
	.landing-footer-scene {
		position: relative;
		z-index: 1;
	}

	.landing-hero-scene {
		background:
			radial-gradient(circle at 18% 20%, rgba(255, 244, 212, 0.9), transparent 17%),
			radial-gradient(circle at 82% 12%, rgba(255, 220, 177, 0.52), transparent 18%),
			linear-gradient(180deg, rgba(255, 213, 158, 0.82) 0%, rgba(248, 193, 131, 0.68) 18%, rgba(213, 202, 189, 0.24) 50%, rgba(245, 241, 234, 0.96) 72%),
			linear-gradient(135deg, rgba(145, 170, 113, 0.95) 0 18%, transparent 18% 82%, rgba(192, 170, 98, 0.52) 82% 100%);
	}

	.landing-hero-scene::before,
	.landing-hero-scene::after,
	.landing-sky-scene::before,
	.landing-footer-scene::before {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.landing-hero-scene::before {
		background:
			radial-gradient(100% 60% at 22% 45%, rgba(120, 124, 148, 0.55), transparent 36%),
			radial-gradient(100% 60% at 50% 44%, rgba(146, 116, 136, 0.56), transparent 30%),
			radial-gradient(100% 55% at 76% 46%, rgba(119, 141, 175, 0.5), transparent 26%),
			linear-gradient(180deg, transparent 0 48%, rgba(114, 168, 90, 0.85) 48% 57%, rgba(222, 195, 114, 0.65) 57% 62%, transparent 62% 100%);
		mix-blend-mode: multiply;
		opacity: 0.9;
	}

	.landing-hero-scene::after {
		background:
			radial-gradient(50% 28% at 50% 52%, rgba(243, 248, 251, 0.95), transparent 70%),
			linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(247, 243, 236, 0.92) 78%, rgba(247, 243, 236, 1) 100%);
	}

	.landing-hero-fade {
		position: relative;
		z-index: 1;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(247, 243, 236, 0.02) 48%, rgba(247, 243, 236, 0.18) 100%);
	}

	.landing-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		border: 1px solid var(--landing-border);
		background: rgba(255, 255, 255, 0.58);
		backdrop-filter: blur(18px);
		border-radius: 999px;
		padding: 0.9rem 1rem 0.9rem 1.25rem;
		box-shadow: 0 8px 30px rgba(23, 20, 17, 0.04);
	}

	.landing-pill,
	.landing-status {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		border: 1px solid var(--landing-border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.68);
		padding: 0.45rem 0.8rem;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	.landing-status {
		background: var(--landing-accent-soft);
		color: var(--landing-accent);
	}

	.landing-pill-on-dark {
		border-color: rgba(255, 255, 255, 0.16);
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.landing-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
		min-height: 2.9rem;
		border-radius: 999px;
		padding: 0.8rem 1.2rem;
		font-size: 0.95rem;
		font-weight: 600;
		transition:
			transform 160ms ease,
			background-color 160ms ease,
			border-color 160ms ease,
			color 160ms ease,
			box-shadow 160ms ease;
	}

	.landing-button:hover {
		transform: translateY(-1px);
	}

	.landing-button-primary {
		border: 1px solid rgba(40, 79, 58, 0.16);
		background: var(--landing-accent);
		color: white;
		box-shadow: 0 14px 28px rgba(74, 145, 104, 0.24);
	}

	.landing-button-primary:hover {
		background: #3f825c;
	}

	.landing-button-secondary {
		border: 1px solid var(--landing-border);
		background: rgba(255, 255, 255, 0.65);
		color: var(--landing-ink);
	}

	.landing-button-secondary:hover {
		background: rgba(255, 255, 255, 0.9);
	}

	.landing-button-dark {
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.08);
		color: white;
	}

	.landing-button-dark:hover {
		background: rgba(255, 255, 255, 0.14);
	}

	.landing-panel {
		border: 1px solid var(--landing-border);
		border-radius: 28px;
		background: var(--landing-panel);
		box-shadow: var(--landing-shadow);
		backdrop-filter: blur(10px);
	}

	.landing-soft-panel {
		background: rgba(255, 248, 241, 0.62);
	}

	.landing-glass-quote {
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 28px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 248, 241, 0.72) 100%);
		backdrop-filter: blur(8px);
		box-shadow: 0 18px 50px rgba(92, 67, 42, 0.07);
	}

	.landing-tile,
	.landing-dark-tile {
		border-radius: 20px;
		padding: 1rem 1rem 1.05rem;
	}

	.landing-tile {
		border: 1px solid var(--landing-border);
		background: rgba(255, 255, 255, 0.66);
	}

	.landing-band {
		background: rgba(255, 255, 255, 0.42);
		box-shadow: var(--landing-shadow);
	}

	.landing-trust-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
		align-items: center;
	}

	.landing-trust-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 3.75rem;
		border-top: 1px solid var(--landing-border);
		font-size: 0.92rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(23, 20, 17, 0.55);
	}

	.landing-eyebrow,
	.landing-card-eyebrow {
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--landing-muted);
	}

	.landing-card-eyebrow {
		letter-spacing: 0.14em;
	}

	.landing-icon-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.8rem;
		width: 2.8rem;
		border-radius: 999px;
		background: var(--landing-accent-soft);
		color: var(--landing-accent);
	}

	.landing-feature-line {
		display: flex;
		align-items: flex-start;
		gap: 0.7rem;
		border-top: 1px solid rgba(23, 20, 17, 0.08);
		padding-top: 0.85rem;
		font-size: 0.95rem;
		line-height: 1.7;
	}

	.landing-inline-link {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--landing-ink);
		transition: color 160ms ease;
	}

	.landing-inline-link:hover {
		color: var(--landing-accent);
	}

	.landing-dark-panel {
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 32px;
		background:
			radial-gradient(circle at top right, rgba(74, 145, 104, 0.16), transparent 24%),
			linear-gradient(180deg, #1c1814 0%, #14110f 100%);
		box-shadow: var(--landing-shadow-strong);
	}

	.landing-dark-tile {
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.05);
	}

	.landing-sky-scene {
		background:
			radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.9), transparent 14%),
			radial-gradient(circle at 84% 22%, rgba(255, 255, 255, 0.88), transparent 12%),
			linear-gradient(180deg, #7ab8de 0%, #8bc3e4 28%, #9fd0eb 55%, #cfe8f6 100%);
	}

	.landing-sky-scene::before {
		background:
			radial-gradient(22% 16% at 12% 20%, rgba(255, 255, 255, 0.95), transparent 65%),
			radial-gradient(18% 13% at 28% 32%, rgba(255, 255, 255, 0.88), transparent 66%),
			radial-gradient(24% 16% at 86% 24%, rgba(255, 255, 255, 0.96), transparent 66%),
			radial-gradient(19% 13% at 70% 34%, rgba(255, 255, 255, 0.82), transparent 68%),
			linear-gradient(180deg, rgba(255, 255, 255, 0) 48%, rgba(243, 248, 251, 0.18) 100%);
	}

	.landing-button-cloud {
		border: 1px solid rgba(255, 255, 255, 0.35);
		background: rgba(255, 255, 255, 0.92);
		color: #24516f;
		box-shadow: 0 14px 24px rgba(76, 124, 155, 0.15);
	}

	.landing-button-cloud:hover {
		background: white;
	}

	.landing-cta {
		border: 1px solid var(--landing-border);
		background:
			radial-gradient(circle at 100% 0%, rgba(74, 145, 104, 0.1), transparent 28%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.76) 100%);
		box-shadow: var(--landing-shadow);
	}

	.landing-footer-scene {
		min-height: 12rem;
		background:
			radial-gradient(circle at 50% 12%, rgba(255, 249, 228, 0.78), transparent 16%),
			linear-gradient(180deg, rgba(101, 156, 161, 0.88) 0%, rgba(110, 160, 156, 0.76) 28%, rgba(89, 131, 111, 0.92) 58%, rgba(63, 89, 67, 0.98) 100%);
		overflow: hidden;
	}

	.landing-footer-scene::before {
		background:
			radial-gradient(26% 26% at 20% 50%, rgba(73, 116, 63, 0.9), transparent 60%),
			radial-gradient(22% 24% at 82% 54%, rgba(82, 121, 72, 0.92), transparent 60%),
			radial-gradient(40% 28% at 50% 56%, rgba(181, 194, 147, 0.55), transparent 62%),
			linear-gradient(180deg, transparent 40%, rgba(236, 207, 132, 0.28) 60%, rgba(55, 82, 58, 0.12) 100%);
	}

	@media (max-width: 767px) {
		.landing-header {
			border-radius: 28px;
		}
	}

	@media (min-width: 768px) {
		.landing-trust-row {
			grid-template-columns: repeat(6, minmax(0, 1fr));
			gap: 1rem;
		}

		.landing-footer-scene {
			min-height: 15rem;
		}
	}
</style>
