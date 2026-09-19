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

		// The shelf stays for the whole page and settles a little once it stops being
		// a notch in the hero and becomes a thing floating over the content.
		const shelf = document.querySelector<HTMLElement>("[data-motion='nav-shelf']");
		if (shelf) {
			gsap.to(shelf, {
				y: -5,
				scale: 0.978,
				transformOrigin: "50% 0%",
				ease: "none",
				scrollTrigger: { start: 0, end: 220, scrub: 0.4 }
			});
		}

		// Hero: the light drifts with scroll and leans toward the pointer, so true
		// black reads as a lit room rather than an empty one.
		const hero = root.querySelector<HTMLElement>("[data-motion='hero']");
		const beam = root.querySelector<HTMLElement>("[data-motion='light-beam']");
		const glow = root.querySelector<HTMLElement>("[data-motion='light-glow']");
		const copy = root.querySelector<HTMLElement>("[data-motion='hero-copy']");
		if (hero && beam && glow) {
			gsap.to(beam, {
				xPercent: 14,
				rotate: -3,
				ease: "none",
				scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 }
			});
			gsap.to(glow, {
				yPercent: 30,
				ease: "none",
				scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 }
			});
			// quickTo keeps one tween alive per axis, so the pointer retargets it
			// instead of stacking a new tween on every move.
			const bx = gsap.quickTo(beam, "x", { duration: 0.8, ease: "power2.out" });
			const gy = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power2.out" });
			const onMove = (e: PointerEvent) => {
				const r = hero.getBoundingClientRect();
				bx(((e.clientX - r.left) / r.width - 0.5) * 32);
				gy(((e.clientY - r.top) / r.height - 0.5) * 24);
			};
			hero.addEventListener("pointermove", onMove, { passive: true });
			cleanups.push(() => hero.removeEventListener("pointermove", onMove));
		}
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

		// Each illustration acts out its product on a loop, but only while on screen.
		for (const svg of q("[data-art]")) {
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

		// Beyond: the three cards are dealt out of a stack, which no other section does.
		const cards = q("[data-motion='cards']")[0];
		if (cards) {
			reveal(
				cards.children,
				{
					x: (i: number) => (1 - i) * 130,
					rotate: (i: number) => (i - 1) * -5,
					y: 50,
					scale: 0.93,
					autoAlpha: 0,
					duration: 0.8,
					stagger: 0.09
				},
				cards,
				0.72
			);
		}

		// FAQ items come in from alternating sides, so the list reads as a zip.
		const faq = q("[data-motion='faq']")[0];
		if (faq) {
			reveal(
				faq.children,
				{ x: (i: number) => (i % 2 ? 44 : -44), autoAlpha: 0, stagger: 0.07 },
				faq,
				0.74
			);
		}

		// Facts stay tied to the scrollbar, so the section keeps moving while it is read.
		// The opacity floor keeps every line legible even if the scrub never completes.
		const facts = q("[data-motion='facts']")[0];
		if (facts) {
			Array.from(facts.children).forEach((child, i) => {
				gsap.fromTo(
					child,
					{ y: 60 + i * 26, opacity: 0.5 },
					{
						y: 0,
						opacity: 1,
						ease: "none",
						scrollTrigger: { trigger: facts, start: "top bottom", end: "top 45%", scrub: 0.5 }
					}
				);
			});
		}

		for (const line of q("[data-motion='fact-rule'], [data-motion='rule']")) {
			gsap.fromTo(
				line,
				{ scaleX: 0, transformOrigin: "0 50%" },
				{
					scaleX: 1,
					ease: "none",
					scrollTrigger: { trigger: line, start: "top 92%", end: "top 62%", scrub: 0.4 }
				}
			);
		}

		// The closing line rises out of its own baseline, the only masked reveal on the page.
		const closing = root.querySelector("[data-motion='closing']");
		const closingLine = root.querySelector("[data-motion='closing-line']");
		if (closing && closingLine) {
			reveal(
				closingLine,
				{
					clipPath: "inset(100% 0% 0% 0%)",
					y: 40,
					clearProps: "transform,clipPath",
					duration: 0.9
				},
				closing,
				0.7
			);
			reveal(
				closing.querySelectorAll("[data-motion='closing-line'] ~ *"),
				{ y: 24, autoAlpha: 0, stagger: 0.08 },
				closing,
				0.7
			);
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
