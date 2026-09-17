<script lang="ts">
import { cn } from "$lib/utils";
import { drawScene, fitScene, screenRect } from "./machine-scene";

/** Virtual units the scene shifts across the full width of the panel. */
const PARALLAX = 26;
/** The frame reduced motion and resize settle on. */
const HELD = 6.2;

type Props = { class?: string };
let { class: className }: Props = $props();

let host: HTMLDivElement;
let screenEl: HTMLDivElement;
let glCanvas = $state<HTMLCanvasElement | null>(null);
let sceneCanvas = $state<HTMLCanvasElement | null>(null);
let inked = $state(false);

type Ink = {
	gl: WebGL2RenderingContext;
	prog: WebGLProgram;
	vs: WebGLShader;
	fs: WebGLShader;
	buf: WebGLBuffer;
	uRes: WebGLUniformLocation | null;
	uTime: WebGLUniformLocation | null;
	w: number;
	h: number;
};

/** "#rgb", "#rrggbb" or "rgb(r g b)" to 0..1, since a custom property reaches
 *  script as its authored text rather than a resolved colour. */
function toRgb(raw: string): [number, number, number] {
	const v = raw.trim();
	if (v.startsWith("#")) {
		let h = v.slice(1);
		if (h.length === 3)
			h = h
				.split("")
				.map((c) => c + c)
				.join("");
		const n = Number.parseInt(h.slice(0, 6), 16);
		return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
	}
	const nums = v.match(/[\d.]+/g);
	if (nums && nums.length >= 3) return [+nums[0] / 255, +nums[1] / 255, +nums[2] / 255];
	return [0.565, 0, 0.984];
}

function initInk(canvas: HTMLCanvasElement, base: string, VERT: string, FRAG: string): Ink | null {
	const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false });
	if (!gl) return null;

	const compile = (type: number, src: string) => {
		const sh = gl.createShader(type);
		if (!sh) return null;
		gl.shaderSource(sh, src);
		gl.compileShader(sh);
		if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
		gl.deleteShader(sh);
		return null;
	};

	const vs = compile(gl.VERTEX_SHADER, VERT);
	const fs = compile(gl.FRAGMENT_SHADER, FRAG);
	if (!vs || !fs) return null;

	const prog = gl.createProgram();
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		gl.deleteProgram(prog);
		return null;
	}
	gl.useProgram(prog);

	const buf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
	const loc = gl.getAttribLocation(prog, "aPos");
	gl.enableVertexAttribArray(loc);
	gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

	const rgb = toRgb(base);
	gl.uniform3f(gl.getUniformLocation(prog, "uBase"), rgb[0], rgb[1], rgb[2]);

	return {
		gl,
		prog,
		vs,
		fs,
		buf,
		uRes: gl.getUniformLocation(prog, "iResolution"),
		uTime: gl.getUniformLocation(prog, "iTime"),
		w: 0,
		h: 0
	};
}

$effect(() => {
	const scene = sceneCanvas;
	const inkCanvas = glCanvas;
	if (!scene || !inkCanvas) return;

	const ctx = scene.getContext("2d");
	if (!ctx) return;

	// The linework is the hero graphic, so it paints from the eager bundle. The
	// shader arrives after, per the one-shader rule in .notes/DESIGN.md.
	let ink: Ink | null = null;
	let disposed = false;

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
	let cw = 0;
	let ch = 0;

	// The panel is the same near-black in both themes, so the linework is fixed
	// rather than inverted with the theme.
	const lineInk = getComputedStyle(host).getPropertyValue("--fixed-light").trim() || "#ffffff";

	// Pointer parallax, spring damped: tying the scene straight to the cursor
	// reads as mechanical, so the target is chased instead of snapped to.
	let targetX = 0;
	let targetY = 0;
	let offX = 0;
	let offY = 0;

	const layout = () => {
		const dpr = window.devicePixelRatio || 1;
		const w = host.clientWidth;
		const h = host.clientHeight;
		if (!w || !h) return false;

		// The linework takes the real ratio so hairlines stay crisp.
		const sw = Math.round(w * dpr);
		const sh = Math.round(h * dpr);
		if (sw !== cw || sh !== ch) {
			cw = sw;
			ch = sh;
			scene.width = sw;
			scene.height = sh;
		}

		const r = screenRect(fitScene(w, h));
		screenEl.style.left = `${r.left}px`;
		screenEl.style.top = `${r.top}px`;
		screenEl.style.width = `${r.width}px`;
		screenEl.style.height = `${r.height}px`;
		screenEl.style.borderRadius = `${r.radius}px`;

		if (ink) {
			// 1.5 is the ceiling on the ink: it is a blurred field, so retina buys
			// nothing and fill rate is the whole cost.
			const idpr = Math.min(dpr, 1.5);
			const iw = Math.max(1, Math.round(r.width * idpr));
			const ih = Math.max(1, Math.round(r.height * idpr));
			if (iw !== ink.w || ih !== ink.h) {
				ink.w = iw;
				ink.h = ih;
				inkCanvas.width = iw;
				inkCanvas.height = ih;
				ink.gl.viewport(0, 0, iw, ih);
				ink.gl.uniform2f(ink.uRes, iw, ih);
			}
		}
		return true;
	};

	const paint = (t: number) => {
		if (!layout()) return;
		if (ink) {
			ink.gl.uniform1f(ink.uTime, t);
			ink.gl.drawArrays(ink.gl.TRIANGLES, 0, 3);
			inked = true;
		}
		const dpr = window.devicePixelRatio || 1;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		offX += (targetX - offX) * 0.08;
		offY += (targetY - offY) * 0.08;
		drawScene(ctx, host.clientWidth, host.clientHeight, t, { ink: lineInk, px: offX, py: offY });
	};

	let frame = 0;
	let visible = false;
	const loop = (now: number) => {
		frame = requestAnimationFrame(loop);
		paint(now / 1000);
	};

	function start() {
		if (frame || !visible) return;
		// Reduced motion still gets the whole scene, just held at one moment.
		if (reduced.matches) {
			paint(HELD);
			return;
		}
		frame = requestAnimationFrame(loop);
	}

	const stop = () => {
		if (!frame) return;
		cancelAnimationFrame(frame);
		frame = 0;
	};

	import("./ink-shader").then(({ FRAG, VERT }) => {
		if (disposed) return;
		ink = initInk(inkCanvas, getComputedStyle(host).getPropertyValue("--field"), VERT, FRAG);
		if (!ink) return;
		if (frame) return;
		start();
	});

	// A preset changes --field, and a shader cannot inherit a token, so the base
	// colour is pushed again on a data-brand change.
	const brandWatch = new MutationObserver(() => {
		if (!ink) return;
		const rgb = toRgb(getComputedStyle(host).getPropertyValue("--field"));
		ink.gl.useProgram(ink.prog);
		ink.gl.uniform3f(ink.gl.getUniformLocation(ink.prog, "uBase"), rgb[0], rgb[1], rgb[2]);
		if (!frame) paint(HELD);
	});
	brandWatch.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-brand"]
	});

	const onPointer = (e: PointerEvent) => {
		if (reduced.matches) return;
		const r = host.getBoundingClientRect();
		targetX = ((e.clientX - r.left) / r.width - 0.5) * PARALLAX;
		targetY = ((e.clientY - r.top) / r.height - 0.5) * PARALLAX;
	};
	const onLeave = () => {
		targetX = 0;
		targetY = 0;
	};
	host.addEventListener("pointermove", onPointer);
	host.addEventListener("pointerleave", onLeave);

	const io = new IntersectionObserver(
		([entry]) => {
			visible = entry.isIntersecting;
			if (visible) start();
			else stop();
		},
		{ rootMargin: "128px" }
	);
	io.observe(host);

	const onVisibility = () => {
		if (document.hidden) stop();
		else start();
	};
	const onReduced = () => {
		stop();
		start();
	};
	document.addEventListener("visibilitychange", onVisibility);
	reduced.addEventListener("change", onReduced);

	const ro = new ResizeObserver(() => {
		if (!frame) paint(HELD);
	});
	ro.observe(host);

	return () => {
		disposed = true;
		stop();
		io.disconnect();
		ro.disconnect();
		document.removeEventListener("visibilitychange", onVisibility);
		reduced.removeEventListener("change", onReduced);
		host.removeEventListener("pointermove", onPointer);
		host.removeEventListener("pointerleave", onLeave);
		brandWatch.disconnect();
		if (ink) {
			ink.gl.deleteProgram(ink.prog);
			ink.gl.deleteShader(ink.vs);
			ink.gl.deleteShader(ink.fs);
			ink.gl.deleteBuffer(ink.buf);
			ink.gl.getExtension("WEBGL_lose_context")?.loseContext();
		}
	};
});
</script>

<!-- A diagram, not an ornament: files queue in, the screen shows the work, and
     the output stub goes nowhere. Hidden from assistive tech because every claim
     it makes is written out in the fact row beside it. -->
<div
	bind:this={host}
	aria-hidden="true"
	class={cn("bg-fixed-dark relative isolate overflow-hidden", className)}
>
	<div bind:this={screenEl} class="absolute overflow-hidden">
		<div class="ink-still absolute inset-0" class:opacity-0={inked}></div>
		<canvas
			bind:this={glCanvas}
			class="absolute inset-0 size-full transition-opacity duration-500 motion-reduce:transition-none"
			class:opacity-0={!inked}
		></canvas>
	</div>

	<canvas bind:this={sceneCanvas} class="absolute inset-0 size-full"></canvas>
</div>

<style>
/* The finished first frame: shown until the shader lands, and kept for good when
   WebGL2 is missing or the context is refused. */
.ink-still {
	background:
		radial-gradient(
			120% 90% at 22% 18%,
			color-mix(in oklch, var(--field) 30%, black) 0%,
			transparent 60%
		),
		radial-gradient(
			90% 80% at 78% 88%,
			color-mix(in oklch, var(--field) 55%, white) 0%,
			transparent 62%
		);
	transition: opacity 500ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
	.ink-still {
		transition: none;
	}
}
</style>
