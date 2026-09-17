/** One virtual box for the whole scene, letterboxed into whatever the panel is,
 *  so the 2D linework and the shader clip are laid out from the same numbers. */
export const BOX_W = 1000;
export const BOX_H = 620;

/** Seconds per file. One file in, one line written, then again. */
export const CYCLE = 5.4;

export const SCENE = {
	body: { x: 140, y: 80, w: 720, h: 460, r: 30 },
	screen: { x: 170, y: 110, w: 660, h: 400, r: 16 },
	rows: [330, 420, 240, 380],
	stand: { neckW: 100, neckH: 46, baseW: 260 },
	tile: { w: 58, h: 74, from: 4, to: 196, y: 273 },
	block: { from: 866, to: 958, y: 310, r: 18 }
} as const;

export type Fit = { scale: number; dx: number; dy: number };

/** Contain, not cover: the machine is a diagram, so it may never be cropped. */
export function fitScene(width: number, height: number): Fit {
	const scale = Math.min(width / BOX_W, height / BOX_H);
	return { scale, dx: (width - BOX_W * scale) / 2, dy: (height - BOX_H * scale) / 2 };
}

/** Where the screen lands in CSS pixels, for the shader layer underneath. */
export function screenRect(f: Fit) {
	const s = SCENE.screen;
	return {
		left: f.dx + s.x * f.scale,
		top: f.dy + s.y * f.scale,
		width: s.w * f.scale,
		height: s.h * f.scale,
		radius: s.r * f.scale
	};
}

export type SceneOptions = {
	/** Linework colour. Comes from a token rather than being hardcoded white. */
	ink: string;
	/** Pointer offset in virtual units, already damped by the caller. */
	px?: number;
	py?: number;
};

const easeOut = (x: number) => 1 - (1 - x) ** 3;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

function roundRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number
) {
	ctx.beginPath();
	ctx.roundRect(x, y, w, h, r);
}

function fileTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
	const { w, h } = SCENE.tile;
	const fold = 16;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + w - fold, y);
	ctx.lineTo(x + w, y + fold);
	ctx.lineTo(x + w, y + h);
	ctx.lineTo(x, y + h);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x + w - fold, y);
	ctx.lineTo(x + w - fold, y + fold);
	ctx.lineTo(x + w, y + fold);
	ctx.stroke();
}

/**
 * One clock: a file travels in, then a line is written on the screen. The two
 * motions are the same event, so nothing in the scene moves on its own.
 */
export function drawScene(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	t: number,
	opts: SceneOptions
) {
	const f = fitScene(width, height);
	const p = (t % CYCLE) / CYCLE;

	ctx.clearRect(0, 0, width, height);
	ctx.save();
	ctx.translate(f.dx, f.dy);
	ctx.scale(f.scale, f.scale);
	ctx.translate(opts.px ?? 0, opts.py ?? 0);

	ctx.strokeStyle = opts.ink;
	ctx.fillStyle = opts.ink;
	ctx.lineWidth = 3.5;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";

	// --- The file on its way in, and the two waiting behind it ---
	const { tile } = SCENE;
	ctx.globalAlpha = p > 0.34 ? clamp01(1 - (p - 0.34) / 0.08) : 1;
	fileTile(ctx, tile.from + (tile.to - tile.from) * easeOut(clamp01(p / 0.42)), tile.y);
	ctx.globalAlpha = 1;
	fileTile(ctx, tile.from - 74, tile.y);
	fileTile(ctx, tile.from - 148, tile.y);

	// --- Stand, then body, so the body edge stays unbroken ---
	const { body, stand } = SCENE;
	const cx = body.x + body.w / 2;
	const foot = body.y + body.h + stand.neckH;
	ctx.beginPath();
	ctx.moveTo(cx - stand.neckW / 2, body.y + body.h);
	ctx.lineTo(cx - stand.neckW / 2, foot);
	ctx.moveTo(cx + stand.neckW / 2, body.y + body.h);
	ctx.lineTo(cx + stand.neckW / 2, foot);
	ctx.moveTo(cx - stand.baseW / 2, foot);
	ctx.lineTo(cx + stand.baseW / 2, foot);
	ctx.stroke();

	roundRect(ctx, body.x, body.y, body.w, body.h, body.r);
	ctx.stroke();

	// --- Lines on the screen, clipped to it ---
	const s = SCENE.screen;
	ctx.save();
	roundRect(ctx, s.x, s.y, s.w, s.h, s.r);
	ctx.clip();

	// White on the violet screen in both themes, so this one is not the ink token.
	ctx.fillStyle = "#ffffff";
	const rowX = s.x + 52;
	let rowY = s.y + 64;
	for (const w of SCENE.rows) {
		roundRect(ctx, rowX, rowY, w, 12, 6);
		ctx.fill();
		rowY += 56;
	}

	// The line the arriving file turned into, drawn only after it lands.
	const write = clamp01((p - 0.42) / 0.46);
	if (write > 0) {
		roundRect(ctx, rowX, rowY, 40 + 300 * easeOut(write), 12, 6);
		ctx.fill();
	}
	ctx.restore();

	// --- Output that goes nowhere: dashed stub, then a crossed circle ---
	const { block } = SCENE;
	ctx.strokeStyle = opts.ink;
	ctx.setLineDash([12, 12]);
	ctx.beginPath();
	ctx.moveTo(block.from, block.y);
	ctx.lineTo(block.to - block.r - 10, block.y);
	ctx.stroke();
	ctx.setLineDash([]);
	ctx.beginPath();
	ctx.arc(block.to, block.y, block.r, 0, Math.PI * 2);
	ctx.stroke();
	const d = block.r * 0.62;
	ctx.beginPath();
	ctx.moveTo(block.to - d, block.y - d);
	ctx.lineTo(block.to + d, block.y + d);
	ctx.stroke();

	ctx.restore();
}
