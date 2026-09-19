// One looping timeline per product illustration: each cycle acts out what the
// product does. Paused by default; home.ts plays it only while the art is on screen.

type Gsap = typeof import("gsap").gsap;
type Timeline = ReturnType<Gsap["timeline"]>;

const DASH_PERIOD = 11;

/** Reads the elements the drawing tagged for this step. */
const part = (root: Element, name: string) =>
	Array.from(root.querySelectorAll<SVGElement>(`[data-loop="${name}"]`));

const one = (root: Element, name: string) => part(root, name)[0] ?? null;

function dashes(tl: Timeline, root: Element, seconds: number) {
	const flow = part(root, "flow");
	if (!flow.length) return;
	tl.set(flow, { strokeDashoffset: 0 }, 0);
	tl.to(
		flow,
		{
			strokeDashoffset: -DASH_PERIOD * Math.round(seconds * 2),
			duration: seconds,
			ease: "none"
		},
		0
	);
}

function orbit(tl: Timeline, root: Element) {
	const pages = part(root, "page");
	const sign = one(root, "sign");
	const seal = one(root, "seal");
	const dx = [24, 12, 0];
	const dy = [-16, -8, 0];

	dashes(tl, root, 5.6);
	if (sign) tl.to(sign, { drawSVG: "0%", duration: 0.01 }, 0);
	if (seal) tl.to(seal, { autoAlpha: 0, scale: 0.3, svgOrigin: "276 138", duration: 0.01 }, 0);

	tl.to(
		pages,
		{ x: (i) => dx[i], y: (i) => dy[i], duration: 0.9, ease: "power2.inOut", stagger: 0.07 },
		0.3
	);
	if (sign) tl.to(sign, { drawSVG: "100%", duration: 1.1, ease: "none" }, 1.4);
	if (seal) tl.to(seal, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, 2.6);

	tl.to(pages, { x: 0, y: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.05 }, 4.4);
	if (sign) tl.to(sign, { drawSVG: "0%", duration: 0.4, ease: "none" }, 4.4);
	if (seal) tl.to(seal, { autoAlpha: 0, scale: 0.3, svgOrigin: "276 138", duration: 0.3 }, 4.4);
}

function recast(tl: Timeline, root: Element) {
	const rec = one(root, "rec");
	const cursor = one(root, "cursor");
	const zoom = one(root, "zoom");
	const head = one(root, "playhead");
	const silence = one(root, "silence");
	const clipB = one(root, "clip-b");

	if (rec)
		tl.to(rec, { opacity: 0.25, duration: 0.5, repeat: 11, yoyo: true, ease: "sine.inOut" }, 0);
	if (head) tl.to(head, { x: 236, duration: 5.6, ease: "none" }, 0.2);

	// The zoom frame trails the pointer instead of snapping to it.
	const legs = [
		{ x: -74, y: 4 },
		{ x: 28, y: 30 },
		{ x: 0, y: 0 }
	];
	legs.forEach((leg, i) => {
		const at = 0.4 + i * 1.7;
		if (cursor) tl.to(cursor, { ...leg, duration: 1.1, ease: "power2.inOut" }, at);
		if (zoom)
			tl.to(
				zoom,
				{
					x: leg.x * 0.72,
					y: leg.y * 0.6,
					scale: i === 1 ? 0.88 : 1,
					svgOrigin: "110 86",
					duration: 1.2,
					ease: "power2.inOut"
				},
				at + 0.16
			);
	});

	if (silence && clipB) {
		tl.to(silence, { scaleX: 0, opacity: 0, transformOrigin: "left center", duration: 0.4 }, 3.1);
		tl.to(clipB, { x: -30, duration: 0.4, ease: "power2.inOut" }, 3.1);
		tl.to(silence, { scaleX: 1, opacity: 1, duration: 0.4 }, 5.0);
		tl.to(clipB, { x: 0, duration: 0.4, ease: "power2.inOut" }, 5.0);
	}
}

function glyphtex(tl: Timeline, root: Element) {
	const code = part(root, "code");
	const caret = one(root, "caret");
	const typeset = one(root, "typeset");

	dashes(tl, root, 5.8);
	tl.to(code, { scaleX: 0, transformOrigin: "left center", duration: 0.01 }, 0);
	if (typeset) tl.to(typeset, { autoAlpha: 0, y: 10, duration: 0.01 }, 0);
	if (caret)
		tl.to(caret, { opacity: 0, duration: 0.42, repeat: 12, yoyo: true, ease: "steps(1)" }, 0);

	tl.to(code, { scaleX: 1, duration: 0.3, stagger: 0.17, ease: "power2.out" }, 0.3);
	if (typeset) tl.to(typeset, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 2.6);

	tl.to(code, { scaleX: 0, duration: 0.25, stagger: 0.04, ease: "power2.in" }, 5.0);
	if (typeset) tl.to(typeset, { autoAlpha: 0, y: -8, duration: 0.4 }, 5.0);
}

function docvia(tl: Timeline, root: Element) {
	const scan = one(root, "scan");
	const tokens = part(root, "token");
	const build = part(root, "build")[0]?.children;
	const modules = part(root, "module");
	const drops = [-36, 4, 44];

	dashes(tl, root, 5.6);
	tl.to(tokens, { autoAlpha: 0, duration: 0.01 }, 0);
	tl.to(modules, { scaleY: 0, transformOrigin: "top center", duration: 0.01 }, 0);
	if (scan) tl.to(scan, { y: 56, duration: 2, ease: "steps(4)" }, 0.2);
	if (build)
		tl.to(
			Array.from(build),
			{
				scale: 1.6,
				transformOrigin: "center",
				duration: 0.22,
				stagger: 0.11,
				repeat: 9,
				yoyo: true,
				ease: "sine.inOut"
			},
			0.6
		);

	tokens.forEach((token, i) => {
		const at = 0.7 + i * 0.6;
		tl.to(token, { autoAlpha: 1, duration: 0.15 }, at);
		tl.to(token, { x: 40, duration: 0.6, ease: "power1.in" }, at);
		tl.to(token, { x: 100, y: drops[i], duration: 0.7, ease: "power1.out" }, at + 0.7);
		tl.to(token, { autoAlpha: 0, duration: 0.2 }, at + 1.3);
		tl.to(modules[i] ?? [], { scaleY: 1, duration: 0.4, ease: "power2.out" }, at + 1.35);
	});

	if (scan) tl.to(scan, { autoAlpha: 0, duration: 0.3 }, 4.6);
	tl.to(modules, { scaleY: 0, duration: 0.3, stagger: 0.06, ease: "power2.in" }, 5.0);
}

function specimen(tl: Timeline, root: Element) {
	const nav = one(root, "nav");
	const swatches = part(root, "swatch");

	if (nav) {
		tl.to(nav, { y: 54, duration: 2.4, ease: "steps(3)" }, 0.3);
		tl.to(nav, { y: 0, duration: 0.5, ease: "power2.inOut" }, 4.4);
	}
	tl.to(
		swatches,
		{
			scale: 0.9,
			opacity: 0.45,
			transformOrigin: "center",
			duration: 0.35,
			stagger: 0.12,
			repeat: 1,
			yoyo: true,
			ease: "sine.inOut"
		},
		0.5
	);
	tl.to(
		swatches,
		{
			scale: 0.9,
			opacity: 0.45,
			transformOrigin: "center",
			duration: 0.35,
			stagger: { each: 0.12, from: "end" },
			repeat: 1,
			yoyo: true,
			ease: "sine.inOut"
		},
		2.9
	);
}

const builders: Record<string, (tl: Timeline, root: Element) => void> = {
	orbit,
	recast,
	glyphtex,
	docvia,
	specimen
};

/** A paused, endlessly repeating timeline for one illustration, or null if the slug has none. */
export function createProductLoop(gsap: Gsap, svg: Element): Timeline | null {
	const slug = svg.getAttribute("data-art");
	const build = slug ? builders[slug] : undefined;
	if (!build) return null;
	const tl = gsap.timeline({
		paused: true,
		repeat: -1,
		repeatDelay: 0.5,
		defaults: { ease: "power2.out" }
	});
	build(tl, svg);
	return tl;
}
