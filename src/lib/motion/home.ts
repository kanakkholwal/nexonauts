// Scroll choreography for the homepage. Loaded after first paint; the hero entrance is
// CSS, so nothing above the fold waits on this.

import { createProductLoop } from "./product-loops";

const EASE_ENTER = "power3.out";
// app.css sets the standard: enter from below, exit faster than enter, never ease-in.
const EASE_EXIT = "power2.inOut";
const ENTER = 0.72;
const EXIT = 0.32;
const LOOP_LEAD = 1.2;

// +1 when the page is travelling down. Every offset is multiplied by it, so a section
// entered from the top arrives downward and one entered from the bottom arrives upward.
type Dir = 1 | -1;
type Vars = gsap.TweenVars;

type Scene = {
	targets: gsap.TweenTarget;
	from: (dir: Dir) => Vars;
	to?: (dir: Dir) => Vars;
	out?: (dir: Dir) => Vars;
};

// The resting value of every key a scene may start from. A scene declares only its start
// state and the settled state is derived, so the two can never drift apart.
const NEUTRAL: Record<string, number | string> = {
	autoAlpha: 1,
	opacity: 1,
	x: 0,
	y: 0,
	xPercent: 0,
	yPercent: 0,
	scale: 1,
	rotate: 0,
	rotation: 0,
	rotationX: 0,
	rotationY: 0,
	clipPath: "inset(0% 0% 0% 0%)",
	drawSVG: "100%"
};

const settle = (from: Vars): Vars => {
	const to: Vars = {};
	for (const key of Object.keys(from)) {
		if (key in NEUTRAL) to[key] = NEUTRAL[key];
	}
	return to;
};

const LEAVE = (dir: Dir): Vars => ({ autoAlpha: 0, y: -26 * dir });

// One arrival per product. Four screens of the same move would read as a template.
type Move = { stage: Scene["from"]; stageOut: Scene["out"]; stageTo?: Vars; copy: Scene["from"] };

const ROW_MOVES: Move[] = [
	{
		// Hinge: the frame swings open on its inner edge.
		stage: (d) => ({
			rotationY: -16,
			y: 64 * d,
			autoAlpha: 0,
			transformPerspective: 1100,
			transformOrigin: "left center"
		}),
		stageOut: (d) => ({ rotationY: -10, y: -40 * d, autoAlpha: 0 }),
		stageTo: { duration: 0.9 },
		copy: (d) => ({ x: -36, y: 18 * d, autoAlpha: 0 })
	},
	{
		// Wipe: uncovered from the edge the page is travelling toward, covered from the other.
		stage: (d) => ({ clipPath: d > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)" }),
		stageOut: (d) => ({ clipPath: d > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }),
		stageTo: { duration: 0.95, ease: "power2.inOut" },
		copy: (d) => ({ y: 34 * d, autoAlpha: 0 })
	},
	{
		// Lift: it comes up under its own weight.
		stage: (d) => ({ scale: 0.86, y: 70 * d, autoAlpha: 0 }),
		stageOut: (d) => ({ scale: 0.94, y: -40 * d, autoAlpha: 0 }),
		stageTo: { duration: 0.85 },
		copy: (d) => ({ x: 32, y: 16 * d, autoAlpha: 0 })
	},
	{
		// Deal: dropped onto the page off-square, then squared up.
		stage: (d) => ({ y: 96 * d, rotate: 4 * d, transformOrigin: "50% 100%", autoAlpha: 0 }),
		stageOut: (d) => ({ y: -50 * d, rotate: -3 * d, autoAlpha: 0 }),
		stageTo: { duration: 0.85 },
		copy: (d) => ({ y: 40 * d, autoAlpha: 0 })
	}
];

export async function mountHomeMotion(root: HTMLElement): Promise<() => void> {
	const [{ gsap }, { ScrollTrigger }, { DrawSVGPlugin }] = await Promise.all([
		import("gsap"),
		import("gsap/ScrollTrigger"),
		import("gsap/DrawSVGPlugin")
	]);
	gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
	gsap.defaults({ ease: EASE_ENTER, duration: 0.6 });
	// A phone hiding its URL bar mid-scroll would otherwise refresh every trigger.
	ScrollTrigger.config({ ignoreMobileResize: true });

	const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
	const mm = gsap.matchMedia();

	mm.add("(prefers-reduced-motion: no-preference)", () => {
		const cleanups: Array<() => void> = [];
		const managed: gsap.TweenTarget[] = [];

		// Nothing plays until the reader has actually scrolled once. Without this, a section
		// already on screen when motion mounts would animate over content that is already read.
		let armed = false;
		const arm = () => {
			armed = true;
		};
		window.addEventListener("scroll", arm, { once: true, passive: true });
		cleanups.push(() => window.removeEventListener("scroll", arm));

		// A refresh re-measures every trigger, so anything parked in its exit state would
		// stay invisible. Hand everything back to CSS and let the next crossing re-run it.
		const release = () => {
			for (const t of managed) gsap.set(t, { clearProps: "opacity,visibility,transform,clipPath" });
		};
		ScrollTrigger.addEventListener("refreshInit", release);
		cleanups.push(() => ScrollTrigger.removeEventListener("refreshInit", release));

		const enter = (scene: Scene, dir: Dir) => {
			const from = scene.from(dir);
			gsap.fromTo(scene.targets, from, {
				...settle(from),
				duration: ENTER,
				ease: EASE_ENTER,
				overwrite: true,
				...scene.to?.(dir)
			});
		};

		// An exit may only touch properties the entrance resets, or the next arrival leaves
		// the element parked at an exit value. Filtering here makes that structural.
		const leave = (scene: Scene, dir: Dir) => {
			const restorable = new Set(Object.keys(scene.from(dir)));
			const out: Vars = { duration: EXIT, ease: EASE_EXIT, overwrite: true };
			for (const [key, value] of Object.entries((scene.out ?? LEAVE)(dir))) {
				if (!(key in NEUTRAL) || restorable.has(key)) out[key] = value;
			}
			gsap.to(scene.targets, out);
		};

		// One trigger per section drives every element in it, so a chapter arrives and
		// leaves as a single move rather than as a handful of independent ones.
		const conduct = (trigger: Element, scenes: Scene[], start = "top 78%") => {
			if (!scenes.length) return;
			const run = (dir: Dir, mode: "in" | "out") => {
				if (!armed) return;
				for (const scene of scenes) (mode === "in" ? enter : leave)(scene, dir);
			};
			const st = ScrollTrigger.create({
				trigger,
				start,
				end: "bottom 22%",
				onEnter: () => run(1, "in"),
				onEnterBack: () => run(-1, "in"),
				onLeave: () => run(1, "out"),
				onLeaveBack: () => run(-1, "out")
			});
			for (const scene of scenes) managed.push(scene.targets);
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
			const move = ROW_MOVES[Number(row.dataset.row) % ROW_MOVES.length];
			const scenes: Scene[] = [];

			const seam = row.querySelector("[data-motion='row-seam']");
			if (seam) {
				scenes.push({
					targets: seam,
					from: (d) => ({ y: 24 * d, autoAlpha: 0 }),
					to: () => ({ duration: 0.5 })
				});
			}

			const lines = row.querySelectorAll("[data-motion='row-copy'] > *");
			if (lines.length) {
				scenes.push({
					targets: lines,
					from: move.copy,
					// Reading order runs with the page: top down going down, bottom up coming back.
					to: (d) => ({ stagger: { each: 0.06, from: d > 0 ? "start" : "end" } }),
					out: (d) => ({
						autoAlpha: 0,
						y: -22 * d,
						stagger: { each: 0.03, from: d > 0 ? "start" : "end" }
					})
				});
			}

			const stage = row.querySelector("[data-motion='row-stage']");
			if (stage) {
				scenes.push({
					targets: stage,
					from: move.stage,
					to: () => move.stageTo ?? {},
					out: move.stageOut
				});
			}

			// The plates and rules draw themselves in. They carry no data-loop hook, so the
			// looping timeline below never touches the same elements.
			const strokes = row.querySelectorAll("[data-motion='row-art'] .draw");
			if (strokes.length) {
				scenes.push({
					targets: strokes,
					from: () => ({ drawSVG: "0%" }),
					to: () => ({ duration: 0.9, stagger: 0.04, ease: "none" }),
					out: () => ({ drawSVG: "0%" })
				});
			}

			conduct(row, scenes, "top 72%");

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
			const st = ScrollTrigger.create({
				trigger: svg,
				start: "top 96%",
				end: "bottom 4%",
				onToggle: (self) => {
					if (!self.isActive) {
						tl.pause();
						return;
					}
					// Rewound rather than resumed: every visit gets the whole story from its
					// start, and the timeline's own time 0 is the only state it is sure of.
					tl.pause(0);
					gsap.delayedCall(LOOP_LEAD, () => {
						if (self.isActive) tl.restart();
					});
				}
			});
			cleanups.push(() => {
				tl.kill();
				st.kill();
			});
		}

		// Section heads rise as their section enters, and drop back out behind the reader.
		for (const group of q("[data-motion='head']")) {
			conduct(group, [
				{
					targets: group.children,
					from: (d) => ({ y: 16 * d, autoAlpha: 0 }),
					to: (d) => ({ stagger: { each: 0.05, from: d > 0 ? "start" : "end" } })
				}
			]);
		}

		// The three statements light from half ink to full as they are read past. A scrub is
		// already symmetric, so it answers going up without a second definition.
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
			const scenes: Scene[] = [];
			const notch = footer.querySelector("[data-motion='footer-notch']");
			if (notch) {
				scenes.push({
					targets: notch,
					from: (d) => ({ y: 26 * d, autoAlpha: 0 }),
					to: () => ({ duration: 0.5 })
				});
			}
			const cols = footer.querySelectorAll("[data-motion='footer-col']");
			if (cols.length) {
				scenes.push({
					targets: cols,
					from: (d) => ({ y: 18 * d, autoAlpha: 0 }),
					to: (d) => ({ stagger: { each: 0.07, from: d > 0 ? "start" : "end" } })
				});
			}
			const mark = footer.querySelector("[data-motion='footer-mark'] .draw");
			if (mark) {
				scenes.push({
					targets: mark,
					from: () => ({ drawSVG: "0%" }),
					to: () => ({ duration: 1, ease: "none" }),
					out: () => ({ drawSVG: "0%" })
				});
			}
			conduct(footer, scenes, "top 88%");

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
