<script lang="ts">
import { cn } from "$lib/utils";

/** Object-space units the pointer can swing the form through. */
const SWING = 0.5;
/** The frame reduced motion, resize and first paint settle on. */
const HELD = 8.4;

type Props = {
	/** Pushes the form off centre so it crops into the corner of its box. */
	shiftX?: number;
	shiftY?: number;
	zoom?: number;
	class?: string;
};
let { shiftX = 0, shiftY = 0, zoom = 2, class: className }: Props = $props();

let host: HTMLDivElement;
let canvas = $state<HTMLCanvasElement | null>(null);
let lit = $state(false);

/** "#rgb", "#rrggbb" or "rgb(r g b)" to 0..1, since a custom property reaches
 *  script as its authored text rather than a resolved colour. */
function toRgb(raw: string, fallback: [number, number, number]): [number, number, number] {
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
	return fallback;
}

$effect(() => {
	const el = canvas;
	if (!el) return;

	const gl = el.getContext("webgl2", { antialias: false, alpha: false, depth: false });
	if (!gl) return;

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

	let prog: WebGLProgram | null = null;
	let vs: WebGLShader | null = null;
	let fs: WebGLShader | null = null;
	let buf: WebGLBuffer | null = null;
	let uRes: WebGLUniformLocation | null = null;
	let uTime: WebGLUniformLocation | null = null;
	let uPointer: WebGLUniformLocation | null = null;
	let uAccent: WebGLUniformLocation | null = null;
	let w = 0;
	let h = 0;

	let targetX = 0;
	let targetY = 0;
	let offX = 0;
	let offY = 0;
	let frame = 0;
	let visible = false;
	let disposed = false;

	const readAccent = () => {
		if (!prog || !uAccent) return;
		const rgb = toRgb(getComputedStyle(host).getPropertyValue("--field"), [0.565, 0, 0.984]);
		gl.useProgram(prog);
		gl.uniform3f(uAccent, rgb[0], rgb[1], rgb[2]);
	};

	const layout = () => {
		// 1.5 is the ceiling: every extra pixel is another march, and the form is
		// smooth enough that retina buys nothing.
		const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
		const nw = Math.max(1, Math.round(host.clientWidth * dpr));
		const nh = Math.max(1, Math.round(host.clientHeight * dpr));
		if (!host.clientWidth || !host.clientHeight) return false;
		if (nw !== w || nh !== h) {
			w = nw;
			h = nh;
			el.width = w;
			el.height = h;
			gl.viewport(0, 0, w, h);
			if (uRes) gl.uniform2f(uRes, w, h);
		}
		return true;
	};

	const paint = (t: number) => {
		if (!prog || !layout()) return;
		offX += (targetX - offX) * 0.07;
		offY += (targetY - offY) * 0.07;
		if (uTime) gl.uniform1f(uTime, t);
		if (uPointer) gl.uniform2f(uPointer, offX, offY);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
		lit = true;
	};

	const loop = (now: number) => {
		frame = requestAnimationFrame(loop);
		paint(now / 1000);
	};

	const start = () => {
		if (frame || !visible || !prog) return;
		if (reduced.matches) {
			paint(HELD);
			return;
		}
		frame = requestAnimationFrame(loop);
	};
	const stop = () => {
		if (!frame) return;
		cancelAnimationFrame(frame);
		frame = 0;
	};

	// The GLSL is not in the eager bundle: the hero has to render without it.
	import("./object-shader").then(({ FRAG, VERT }) => {
		if (disposed) return;

		const compile = (type: number, src: string) => {
			const sh = gl.createShader(type);
			if (!sh) return null;
			gl.shaderSource(sh, src);
			gl.compileShader(sh);
			if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
			gl.deleteShader(sh);
			return null;
		};

		vs = compile(gl.VERTEX_SHADER, VERT);
		fs = compile(gl.FRAGMENT_SHADER, FRAG);
		if (!vs || !fs) return;

		const p = gl.createProgram();
		gl.attachShader(p, vs);
		gl.attachShader(p, fs);
		gl.linkProgram(p);
		if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
			gl.deleteProgram(p);
			return;
		}
		prog = p;
		gl.useProgram(prog);

		buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const loc = gl.getAttribLocation(prog, "aPos");
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

		uRes = gl.getUniformLocation(prog, "iResolution");
		uTime = gl.getUniformLocation(prog, "iTime");
		uPointer = gl.getUniformLocation(prog, "uPointer");
		uAccent = gl.getUniformLocation(prog, "uAccent");

		const panel = toRgb(getComputedStyle(host).getPropertyValue("--stage"), [0.04, 0.04, 0.04]);
		gl.uniform3f(gl.getUniformLocation(prog, "uPanel"), panel[0], panel[1], panel[2]);
		gl.uniform2f(gl.getUniformLocation(prog, "uShift"), shiftX, shiftY);
		gl.uniform1f(gl.getUniformLocation(prog, "uZoom"), zoom);
		readAccent();

		// One frame immediately, so the form is there before the loop is allowed.
		layout();
		paint(HELD);
		start();
	});

	// A preset changes --field, and a shader cannot inherit a token.
	const brandWatch = new MutationObserver(() => {
		readAccent();
		if (!frame) paint(HELD);
	});
	brandWatch.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-brand"]
	});

	// Damped, not snapped: tying the form straight to the cursor reads mechanical.
	const onPointer = (e: PointerEvent) => {
		if (reduced.matches) return;
		const r = host.getBoundingClientRect();
		targetX = ((e.clientX - r.left) / r.width - 0.5) * SWING;
		targetY = ((e.clientY - r.top) / r.height - 0.5) * SWING;
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
		brandWatch.disconnect();
		document.removeEventListener("visibilitychange", onVisibility);
		reduced.removeEventListener("change", onReduced);
		host.removeEventListener("pointermove", onPointer);
		host.removeEventListener("pointerleave", onLeave);
		if (prog) gl.deleteProgram(prog);
		if (vs) gl.deleteShader(vs);
		if (fs) gl.deleteShader(fs);
		if (buf) gl.deleteBuffer(buf);
		gl.getExtension("WEBGL_lose_context")?.loseContext();
	};
});
</script>

<!-- Decoration: a sculptural form, not a diagram, so it states nothing that the
     copy beside it does not already say. -->
<div bind:this={host} aria-hidden="true" class={cn("bg-stage relative isolate", className)}>
	<div class="object-still absolute inset-0" class:opacity-0={lit}></div>
	<canvas
		bind:this={canvas}
		class="absolute inset-0 size-full transition-opacity duration-700 motion-reduce:transition-none"
		class:opacity-0={!lit}
	></canvas>
</div>

<style>
/* The finished first frame: held until the form is on screen, and kept for good
   when WebGL2 is missing or the context is refused. */
.object-still {
	background: radial-gradient(
		80% 70% at 68% 26%,
		color-mix(in oklch, var(--field) 22%, var(--stage)) 0%,
		var(--stage) 62%
	);
	transition: opacity 700ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
	.object-still {
		transition: none;
	}
}
</style>
