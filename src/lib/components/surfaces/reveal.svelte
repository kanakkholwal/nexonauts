<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "$lib/utils";

/**
 * Scroll-triggered reveal. Svelte's `transition:` directives only fire on
 * mount and destroy, so scroll-in motion is an IntersectionObserver toggling
 * utility classes through the one shared ease.
 *
 * Falls back to visible when the observer is missing, so a section is never
 * stuck at `opacity-0` where JS does not run. Never hand-roll a local copy at
 * a call site for that reason.
 */
type Variant = "up" | "down" | "left" | "right" | "scale";
type Tag = "div" | "section" | "article" | "li" | "ul" | "ol" | "header";

let {
	children,
	class: className,
	delay = 0,
	threshold = 0.15,
	rootMargin = "0px 0px -8% 0px",
	once = true,
	as: Tag = "div",
	variant = "up",
	duration = 500,
	id
}: {
	children: Snippet;
	class?: string;
	delay?: number;
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
	as?: Tag;
	variant?: Variant;
	duration?: number;
	id?: string;
} = $props();

let visible = $state(false);

const hidden: Record<Variant, string> = {
	up: "opacity-0 translate-y-3",
	down: "opacity-0 -translate-y-3",
	left: "opacity-0 translate-x-5",
	right: "opacity-0 -translate-x-5",
	scale: "opacity-0 scale-[0.98]"
};

function reveal(node: HTMLElement) {
	if (typeof IntersectionObserver === "undefined") {
		visible = true;
		return {};
	}

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				visible = true;
				if (once) observer.disconnect();
			} else if (!once) {
				visible = false;
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}
</script>

<svelte:element
	this={Tag}
	use:reveal
	{id}
	style={`transition-delay: ${delay}ms; transition-duration: ${duration}ms;`}
	class={cn(
		"ease-fluid transition-[opacity,transform] will-change-[opacity,transform]",
		"motion-reduce:transition-none motion-reduce:will-change-auto",
		visible
			? "translate-x-0 translate-y-0 scale-100 opacity-100"
			: cn(
					hidden[variant],
					"motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100"
				),
		className
	)}
>
	{@render children()}
</svelte:element>
