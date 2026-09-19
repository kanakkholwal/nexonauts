// Scroll and pointer choreography for the homepage. Loaded after first paint;
// the hero entrance is CSS, so nothing above the fold waits on this.

import { createProductLoop } from "./product-loops";

const EASE = "power3.out";
const ENTER_LINE = 0.82;
// Product panels are 90dvh with their content centred, so they arrive later.
const PANEL_LINE = 0.45;
const LOOP_LEAD = 1.2;

// One arrival per product. Four screens of the same move would read as a template.
const ROW_ENTRANCES: Array<{ stage: gsap.TweenVars; copy: gsap.TweenVars }> = [
	{
		stage: {
			rotationY: -18,
			x: 80,
			transformPerspective: 1100,
			transformOrigin: "left center",
			autoAlpha: 0,
			duration: 1
		},
		copy: { x: -40, autoAlpha: 0, stagger: 0.06 }
	},
	{
		stage: {
			clipPath: "inset(0% 100% 0% 0%)",
			clearProps: "opacity,visibility,transform,clipPath",
			duration: 1.1,
			ease: "power2.inOut"
		},
		copy: { y: 36, autoAlpha: 0, stagger: 0.06 }
	},
	{
		stage: { scale: 0.82, y: 80, autoAlpha: 0, duration: 0.95 },
		copy: { x: 36, autoAlpha: 0, stagger: 0.06 }
	},
	{
		stage: { y: 110, rotate: 4, transformOrigin: "50% 100%", autoAlpha: 0, duration: 0.95 },
		copy: { y: 44, autoAlpha: 0, stagger: 0.07 }
	}
];

export async function mountHomeMotion(root: HTMLElement): Promise<() => void> {
	const [{ gsap }, { ScrollTrigger }, { DrawSVGPlugin }] = await Promise.all([
		import("gsap"),
		import("gsap/ScrollTrigger"),
		import("gsap/DrawSVGPlugin")
	]);
	gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
	gsap.defaults({ ease: EASE, duration: 0.6 });

	const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
	const mm = gsap.matchMedia();

	mm.add("(prefers-reduced-motion: no-preference)", () => {
		const cleanups: Array<() => void> = [];

		// Built inside onEnter so the start state lands in the same frame it animates
		// out of. A from() created up front leaves content hidden if it never fires.
		const reveal = (
			targets: gsap.TweenTarget,
			vars: gsap.TweenVars,
			trigger: Element,
			line = ENTER_LINE
		) => {
			const st = ScrollTrigger.create({
				trigger,
				start: `top ${line * 100}%`,
				once: true,
				onEnter: () => {
					gsap.from(targets, { clearProps: "opacity,visibility,transform", ...vars });
				}
			});
			cleanups.push(() => st.kill());
		};

		// Nav: the hairline draws across as the page leaves the top. Invisible at
		// scroll 0 is its correct resting state, so a scrub is safe here.
		const rule = document.querySelector<HTMLElement>("[data-motion='nav-rule']");
		if (rule) {
			gsap.fromTo(
				rule,
				{ scaleX: 0, transformOrigin: "0 50%" },
				{ scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: 160, scrub: true } }
			);
		}

		// The shelf sits flush with the viewport edge and settles by scale alone. Any y here
		// opens a gap at the top, which is the thing the flush placement exists to avoid.
		const shelf = document.querySelector<HTMLElement>("[data-motion='nav-shelf']");
		if (shelf) {
			gsap.to(shelf, {
				scale: 0.972,
				transformOrigin: "50% 0%",
				ease: "none",
				scrollTrigger: { start: 0, end: 220, scrub: 0.4 }
			});
		}

		const hero = root.querySelector<HTMLElement>("[data-motion='hero']");
		const copy = root.querySelector<HTMLElement>("[data-motion='hero-copy']");
		if (hero && copy) {
			gsap.to(copy, {
				yPercent: -8,
				autoAlpha: 0.45,
				ease: "none",
				scrollTrigger: { trigger: hero, start: "bottom 60%", end: "bottom top", scrub: 0.4 }
			});
		}

		// Chapters: each one arrives its own way, then the drawing drifts on the way past.
		for (const row of q("[data-motion='row']")) {
			const move = ROW_ENTRANCES[Number(row.dataset.row) % ROW_ENTRANCES.length];
			const seam = row.querySelector("[data-motion='row-seam']");
			if (seam) reveal(seam, { y: -34, autoAlpha: 0, duration: 0.55 }, row, PANEL_LINE);

			reveal(row.querySelectorAll("[data-motion='row-copy'] > *"), move.copy, row, PANEL_LINE);

			const stage = row.querySelector("[data-motion='row-stage']");
			if (stage) reveal(stage, move.stage, row, PANEL_LINE);

			const strokes = row.querySelectorAll("[data-motion='row-art'] .draw");
			if (strokes.length) {
				reveal(
					strokes,
					{ drawSVG: "0%", duration: 0.9, stagger: 0.04, ease: "none" },
					row,
					PANEL_LINE
				);
			}

			// The band numeral rides past faster than the page, which is what makes a
			// full-height section read as one rather than as padding.
			const ghost = row.querySelector("[data-motion='row-ghost']");
			if (ghost) {
				gsap.fromTo(
					ghost,
					{ yPercent: 26 },
					{
						yPercent: -26,
						ease: "none",
						scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.6 }
					}
				);
			}

			// Position and size only: if this never runs, the drawing simply sits still.
			const art = row.querySelector("[data-motion='row-art']");
			if (art) {
				gsap.fromTo(
					art,
					{ yPercent: -6, scale: 1.05 },
					{
						yPercent: 6,
						scale: 0.97,
						ease: "none",
						scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.4 }
					}
				);
			}
		}

		// Chapter illustrations act their product out on a loop, but only while on screen.
		// The hero canvas is excluded on purpose: a drifting wall of running timelines is noise.
		for (const svg of q("[data-motion='row-art'] [data-art]")) {
			const tl = createProductLoop(gsap, svg);
			if (!tl) continue;
			let started = false;
			const st = ScrollTrigger.create({
				trigger: svg,
				start: "top 96%",
				end: "bottom 4%",
				onToggle: (self) => {
					if (!self.isActive) {
						tl.pause();
						return;
					}
					if (started) {
						tl.play();
						return;
					}
					started = true;
					// Lets the entrance draw finish before the loop takes the same strokes.
					gsap.delayedCall(LOOP_LEAD, () => {
						if (self.isActive) tl.play();
					});
				}
			});
			cleanups.push(() => {
				tl.kill();
				st.kill();
			});
		}

		// Section heads rise once as their section enters.
		for (const group of q("[data-motion='head']")) {
			reveal(group.children, { y: 12, autoAlpha: 0, stagger: 0.05 }, group);
		}

		// The three statements light from half ink to full as they are read past. It is the
		// only scrub left on the page, so it does not compete with the chapter entrances.
		const stands = q("[data-motion='stands']")[0];
		if (stands) {
			Array.from(stands.children).forEach((child, i) => {
				gsap.fromTo(
					child,
					{ y: 48 + i * 22, opacity: 0.45 },
					{
						y: 0,
						opacity: 1,
						ease: "none",
						scrollTrigger: { trigger: child, start: "top bottom", end: "top 55%", scrub: 0.5 }
					}
				);
			});
		}

		for (const line of q("[data-motion='rule']")) {
			gsap.fromTo(
				line,
				{ scaleX: 0, transformOrigin: "0 50%" },
				{
					scaleX: 1,
					ease: "none",
					scrollTrigger: { trigger: line, start: "top 94%", end: "top 66%", scrub: 0.4 }
				}
			);
		}

		// The canvas leans toward the pointer. Its columns carry a CSS marquee, so the lean
		// goes on the container: two transforms on one element and GSAP freezes the marquee.
		const canvas = root.querySelector<HTMLElement>("[data-motion='hero-canvas']");
		if (hero && canvas) {
			const cx = gsap.quickTo(canvas, "x", { duration: 1, ease: "power2.out" });
			const cy = gsap.quickTo(canvas, "y", { duration: 1, ease: "power2.out" });
			const onCanvasMove = (e: PointerEvent) => {
				const r = hero.getBoundingClientRect();
				cx(((e.clientX - r.left) / r.width - 0.5) * -26);
				cy(((e.clientY - r.top) / r.height - 0.5) * -18);
			};
			hero.addEventListener("pointermove", onCanvasMove, { passive: true });
			cleanups.push(() => hero.removeEventListener("pointermove", onCanvasMove));
		}

		const footer = document.querySelector<HTMLElement>("[data-motion='footer']");
		if (footer) {
			const notch = footer.querySelector("[data-motion='footer-notch']");
			if (notch) reveal(notch, { y: 26, autoAlpha: 0, duration: 0.5 }, footer);
			reveal(
				footer.querySelectorAll("[data-motion='footer-col']"),
				{ y: 16, autoAlpha: 0, stagger: 0.07 },
				footer
			);
			const mark = footer.querySelector("[data-motion='footer-mark'] .draw");
			if (mark) reveal(mark, { drawSVG: "0%", duration: 1, ease: "none" }, footer);
			gsap.fromTo(
				footer.querySelectorAll("[data-motion='footer-rule']"),
				{ scaleX: 0, transformOrigin: "0 50%" },
				{
					scaleX: 1,
					ease: "none",
					scrollTrigger: { trigger: footer, start: "top 95%", end: "top 55%", scrub: 0.4 }
				}
			);
		}

		return () => {
			for (const fn of cleanups) fn();
		};
	});

	return () => mm.revert();
}
