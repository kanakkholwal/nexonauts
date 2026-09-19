// Scroll and pointer choreography for the homepage. Loaded after first paint;
// the hero and strip entrances are CSS, so nothing above the fold waits on this.

const EASE = "power3.out";
const ENTER_LINE = 0.82;

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
		const reveal = (targets: gsap.TweenTarget, vars: gsap.TweenVars, trigger: Element) => {
			const st = ScrollTrigger.create({
				trigger,
				start: `top ${ENTER_LINE * 100}%`,
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

		// Rows: copy rises, the frame settles, the drawing draws itself on arrival,
		// and it drifts against its frame on the way past.
		for (const row of q("[data-motion='row']")) {
			reveal(
				row.querySelectorAll("[data-motion='row-copy'] > *"),
				{
					y: 14,
					autoAlpha: 0,
					stagger: 0.05
				},
				row
			);

			const stage = row.querySelector("[data-motion='row-stage']");
			if (stage) reveal(stage, { y: 32, scale: 0.985, autoAlpha: 0, duration: 0.7 }, row);

			const strokes = row.querySelectorAll("[data-motion='row-art'] .draw");
			if (strokes.length) {
				reveal(strokes, { drawSVG: "0%", duration: 0.9, stagger: 0.04, ease: "none" }, row);
			}

			const accents = row.querySelectorAll("[data-motion='row-art'] .acc");
			if (accents.length) {
				reveal(
					accents,
					{
						autoAlpha: 0,
						scale: 0.6,
						transformOrigin: "50% 50%",
						duration: 0.4,
						stagger: 0.08
					},
					row
				);
			}

			// Position only: if this never runs, the drawing simply sits still.
			const art = row.querySelector("[data-motion='row-art']");
			if (art) {
				gsap.fromTo(
					art,
					{ yPercent: -5 },
					{
						yPercent: 5,
						ease: "none",
						scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.4 }
					}
				);
			}
		}

		// Section heads, link cards, facts and FAQ items rise as their section enters.
		for (const group of q(
			"[data-motion='head'], [data-motion='cards'], [data-motion='facts'], [data-motion='faq']"
		)) {
			reveal(group.children, { y: 12, autoAlpha: 0, stagger: 0.05 }, group);
		}

		for (const line of q("[data-motion='rule']")) {
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

		const closing = root.querySelector("[data-motion='closing']");
		if (closing) reveal(closing, { y: 24, scale: 0.985, autoAlpha: 0, duration: 0.7 }, closing);

		const footer = document.querySelector<HTMLElement>("[data-motion='footer']");
		if (footer) {
			reveal(
				footer.querySelectorAll("[data-motion='footer-col']"),
				{ y: 16, autoAlpha: 0, stagger: 0.07 },
				footer
			);
		}

		return () => {
			for (const fn of cleanups) fn();
		};
	});

	return () => mm.revert();
}
