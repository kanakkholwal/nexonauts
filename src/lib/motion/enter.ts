import { animate, inView } from "motion";

type EnterOptions = {
	/** Vertical offset in px applied at rest (translated to 0 on enter). Default 12. */
	y?: number;
	/** Animation duration in seconds. Default 0.4. */
	duration?: number;
	/** Delay before animation starts (seconds). Default 0. */
	delay?: number;
	/** Once-only (default) or re-trigger every time the element re-enters view. */
	once?: boolean;
};

/**
 * Subtle "enter on scroll into view" action.
 *
 * Usage:
 *   <section use:enterOnView>...</section>
 *   <section use:enterOnView={{ delay: 0.1, y: 16 }}>...</section>
 *
 * Respects `prefers-reduced-motion`: falls back to opacity-only with no translate.
 */
export function enterOnView(node: HTMLElement, options: EnterOptions = {}) {
	const { y = 12, duration = 0.4, delay = 0, once = true } = options;

	const prefersReducedMotion =
		typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Set initial state immediately so the element doesn't flash visible.
	node.style.opacity = "0";
	if (!prefersReducedMotion) {
		node.style.transform = `translateY(${y}px)`;
	}
	node.style.willChange = "opacity, transform";

	const stop = inView(
		node,
		() => {
			animate(
				node,
				{
					opacity: 1,
					transform: prefersReducedMotion ? "none" : "translateY(0px)"
				},
				{ duration, delay, ease: [0.22, 1, 0.36, 1] }
			);
			// Reset will-change after the animation lands.
			setTimeout(
				() => {
					node.style.willChange = "auto";
				},
				(duration + delay) * 1000 + 50
			);
			if (once) return;
		},
		{ amount: 0.15 }
	);

	return {
		destroy() {
			stop();
		}
	};
}

/** Fluid-dynamics easing. Mass and spring, never a linear or default curve. */
export const EASE_FLUID = [0.32, 0.72, 0, 1] as const;

type RevealOptions = {
	/** Vertical offset in px at rest. Default 16. */
	y?: number;
	/** Duration in seconds. Default 0.4. */
	duration?: number;
	/** Delay in seconds. Default 0. */
	delay?: number;
};

/**
 * Fade-up used for every landing-page section reveal. Translate and opacity
 * only, driven off IntersectionObserver — never a scroll listener, never blur.
 */
export function revealOnView(node: HTMLElement, options: RevealOptions = {}) {
	const { y = 16, duration = 0.4, delay = 0 } = options;

	const reduced =
		typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	node.style.opacity = "0";
	if (!reduced) {
		node.style.transform = `translateY(${y}px)`;
		node.style.willChange = "opacity, transform";
	}

	const stop = inView(
		node,
		() => {
			animate(node, reduced ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }, {
				duration: reduced ? 0.2 : duration,
				delay,
				ease: [...EASE_FLUID]
			});
			setTimeout(
				() => {
					node.style.willChange = "auto";
				},
				(duration + delay) * 1000 + 50
			);
		},
		{ amount: 0.15 }
	);

	return {
		destroy() {
			stop();
		}
	};
}

/**
 * Lights each child `[data-word]` from muted to full ink in reading order,
 * one word at a time as it crosses the viewport trigger line.
 */
export function wordReveal(node: HTMLElement) {
	const words = Array.from(node.querySelectorAll<HTMLElement>("[data-word]"));

	if (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		for (const w of words) w.dataset.lit = "true";
		return {};
	}

	// Trigger line sits at 70% viewport height so words light as they rise past it.
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				const index = words.indexOf(el);
				el.style.transitionDelay = `${Math.max(0, index % 8) * 40}ms`;
				el.dataset.lit = "true";
				observer.unobserve(el);
			}
		},
		{ rootMargin: "0px 0px -30% 0px", threshold: 0 }
	);

	for (const w of words) observer.observe(w);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
