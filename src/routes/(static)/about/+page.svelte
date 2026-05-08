<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import BarChart3 from "@lucide/svelte/icons/bar-chart-3";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import Quote from "@lucide/svelte/icons/quote";
	import Settings from "@lucide/svelte/icons/settings";
	import Terminal from "@lucide/svelte/icons/terminal";
</script>

<svelte:head>
	<title>About — Nexonauts</title>
	<meta
		name="description"
		content="Empowering developers, one innovation at a time. Built by a developer, for developers."
	/>
</svelte:head>

<div class="bg-background relative min-h-screen overflow-hidden selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div
			class="bg-primary/20 absolute right-0 left-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full opacity-20 blur-[100px]"
		></div>
	</div>

	<section class="relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-48 md:pb-32">
		<div class="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
			<div
				class="border-primary/20 bg-primary/5 text-primary inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-xl"
			>
				<span>Our Philosophy</span>
			</div>
			<h1
				class="text-foreground text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl"
			>
				Empowering Developers, <br class="hidden md:block" />
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
					One Innovation at a Time.
				</span>
			</h1>
			<p class="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
				Building the ecosystem that fuels creativity, collaboration, and growth for the next
				generation of builders.
			</p>
		</div>
	</section>

	<section class="mx-auto max-w-7xl px-6 py-20">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
			<div class="order-2 space-y-8 lg:order-1">
				<div class="space-y-4">
					<h2 class="text-primary text-sm font-semibold uppercase tracking-widest">Our Mission</h2>
					<h3 class="text-foreground text-3xl font-bold md:text-4xl">
						Built by a developer, <br />for developers.
					</h3>
					<div class="prose prose-lg text-muted-foreground">
						<p>
							Welcome to Nexonauts.com. This isn't just a platform; it's the brainchild of a
							passionate developer driven by a singular mission: to simplify the development
							journey for fellow creators.
						</p>
						<p>
							As the sole visionary behind this platform, I'm committed to building a vibrant
							ecosystem that fuels creativity. We aren't a faceless corporation; we are a toolset
							crafted with empathy for the coding process.
						</p>
					</div>
				</div>
				<div class="border-primary/30 bg-muted/20 relative rounded-r-xl border-l-4 p-6">
					<Quote class="text-primary/20 absolute top-4 right-4 h-8 w-8" />
					<p class="text-foreground font-medium italic">
						"I keep you informed at every step, holding myself accountable for the results
						delivered."
					</p>
				</div>
			</div>

			<div class="group relative order-1 lg:order-2">
				<div
					class="from-primary/20 absolute -inset-4 rounded-[2rem] bg-gradient-to-r to-purple-500/20 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"
				></div>
				<div
					class="border-border/50 relative overflow-hidden rounded-2xl border shadow-2xl rotate-2 transition duration-500 group-hover:rotate-0"
				>
					<img
						src="/assets/images/about_1.png"
						alt="Developer working"
						width="800"
						height="600"
						class="h-auto w-full object-cover"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	</section>

	<section class="relative py-20 md:py-32">
		<div class="mx-auto max-w-7xl px-6">
			<div class="mb-16 space-y-4 text-center">
				<h2 class="text-primary text-sm font-semibold uppercase tracking-widest">Our Values</h2>
				<h3 class="text-foreground text-3xl font-bold md:text-4xl">
					The principles guiding NexoNauts
				</h3>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<div
					class="bg-card/50 border-border/50 hover:border-primary/50 group rounded-3xl border p-8 backdrop-blur-sm transition-colors duration-300"
				>
					<div
						class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 transition-transform group-hover:scale-110"
					>
						<Settings class="h-7 w-7 text-indigo-500" />
					</div>
					<h4 class="mb-3 text-xl font-bold">Execution</h4>
					<p class="text-muted-foreground leading-relaxed">
						We're dedicated to making your development goals a reality. From ideation to
						implementation, we ensure effective execution that drives your online success.
					</p>
				</div>

				<div
					class="bg-card/50 border-border/50 group relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm transition-colors duration-300 hover:border-teal-500/50"
				>
					<div
						class="absolute top-0 right-0 -mt-10 -mr-10 h-24 w-24 rounded-full bg-teal-500/10 blur-2xl"
					></div>
					<div
						class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 transition-transform group-hover:scale-110"
					>
						<CheckCircle2 class="h-7 w-7 text-teal-500" />
					</div>
					<h4 class="mb-3 text-xl font-bold">Accountability</h4>
					<p class="text-muted-foreground leading-relaxed">
						As a solo founder, I take personal ownership of every aspect. I keep you informed at
						every step, holding myself accountable for every strategy implemented.
					</p>
				</div>

				<div
					class="bg-card/50 border-border/50 group rounded-3xl border p-8 backdrop-blur-sm transition-colors duration-300 hover:border-sky-500/50"
				>
					<div
						class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 transition-transform group-hover:scale-110"
					>
						<BarChart3 class="h-7 w-7 text-sky-500" />
					</div>
					<h4 class="mb-3 text-xl font-bold">Result</h4>
					<p class="text-muted-foreground leading-relaxed">
						Our ultimate goal isn't just rankings; it's about bolstering your online presence and
						driving tangible, measurable outcomes for your projects.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="px-4 py-20 sm:px-6">
		<div
			class="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0A0A0A] shadow-2xl"
		>
			<div
				class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
			></div>
			<div
				class="bg-primary/20 pointer-events-none absolute top-0 left-1/2 h-[400px] w-full max-w-3xl -translate-x-1/2 rounded-full blur-[120px]"
			></div>

			<div class="relative z-10 flex flex-col items-center px-6 py-24 text-center md:px-12">
				<div
					class="text-primary-foreground/80 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur-md"
				>
					<span class="relative flex h-2 w-2">
						<span class="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
						<span class="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
					</span>
					Open for Builders
				</div>

				<h2 class="mb-6 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
					Ready to
					<span class="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">
						ship your dream?
					</span>
				</h2>

				<p class="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
					Whether you're a seasoned engineer or just committed your first line of code, Nexonauts
					provides the ecosystem you need to accelerate your growth.
				</p>

				<div class="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
					<a
						href="/auth/signup"
						class={cn(
							buttonVariants({ size: "lg" }),
							"h-14 rounded-full bg-white px-8 text-base font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
						)}
					>
						Get Started Now
						<ArrowRight class="ml-2 h-4 w-4" />
					</a>
					<a
						href="/dev-tools"
						class={cn(
							buttonVariants({ variant: "ghost", size: "lg" }),
							"h-14 rounded-full px-8 text-base text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
						)}
					>
						<Terminal class="mr-2 h-4 w-4" />
						Read the Manifest
					</a>
				</div>
			</div>

			<div
				class="pointer-events-none absolute right-0 bottom-0 left-0 z-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent"
			></div>
		</div>
	</section>
</div>
