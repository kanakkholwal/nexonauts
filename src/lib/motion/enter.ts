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
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
