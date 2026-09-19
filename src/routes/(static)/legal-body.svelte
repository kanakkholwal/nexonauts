<script lang="ts">
import type { Snippet } from "svelte";

type Section = { id: string; title: string };
type Props = { sections: Section[]; children: Snippet };
let { sections, children }: Props = $props();
</script>

<!-- Shared shell for the legal pages: a sticky index and one prose column, so all three
     read the same way and none of them invents its own layout. -->
<section class="mx-auto w-full max-w-page px-5 pt-16 pb-24 sm:px-10 md:pb-32 lg:px-14">
	<div class="grid gap-12 lg:grid-cols-12">
		<aside class="hidden lg:col-span-3 lg:block">
			<div class="sticky top-24">
				<p class="mb-4 pl-4 font-mono text-caption tracking-wider text-muted-foreground uppercase">
					On this page
				</p>
				<nav aria-label="On this page" class="border-l border-border">
					{#each sections as section (section.id)}
						<a
							href="#{section.id}"
							class="-ml-px block border-l-2 border-transparent py-2 pl-4 text-body-sm text-muted-foreground transition-colors duration-(--duration-ui) hover:border-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
						>
							{section.title}
						</a>
					{/each}
				</nav>
			</div>
		</aside>

		<!-- No base col-span: with no grid-cols below lg it spans 12 implicit tracks and overflows. -->
		<div class="lg:col-span-9">
			<div class="legal max-w-[68ch]">
				{@render children()}
			</div>
		</div>
	</div>
</section>

<style>
	.legal :global(.lead) {
		font-size: var(--text-body-lg);
		line-height: var(--text-body-lg--line-height);
		color: var(--muted-foreground);
		text-wrap: pretty;
	}
	.legal :global(section) {
		margin-top: 3rem;
		scroll-margin-top: 7rem;
	}
	.legal :global(h2) {
		font-family: var(--font-heading);
		font-size: var(--text-subheading);
		line-height: var(--text-subheading--line-height);
		font-weight: 500;
		color: var(--foreground);
	}
	.legal :global(p) {
		margin-top: 1rem;
		font-size: var(--text-body);
		line-height: var(--text-body--line-height);
		color: var(--muted-foreground);
		text-wrap: pretty;
	}
	.legal :global(ul) {
		margin-top: 1rem;
		padding-left: 1.125rem;
		list-style: disc;
	}
	.legal :global(li) {
		margin-top: 0.5rem;
		font-size: var(--text-body);
		line-height: var(--text-body--line-height);
		color: var(--muted-foreground);
	}
	.legal :global(strong) {
		font-weight: 500;
		color: var(--foreground);
	}
	.legal :global(code) {
		border-radius: var(--radius-xs);
		background: var(--muted);
		padding: 0.1em 0.35em;
		font-family: var(--font-mono);
		font-size: 0.9em;
		color: var(--foreground);
	}
	.legal :global(a) {
		font-weight: 500;
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
