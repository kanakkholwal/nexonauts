import { createContext } from "svelte";

export type DrawerDirection = "top" | "bottom" | "left" | "right";

export type DrawerContext = {
	readonly direction: DrawerDirection;
};

export const [getDrawer, setDrawer] = createContext<DrawerContext>();

/** vaul eases with cubic-bezier(0.32, 0.72, 0, 1), our `--ease-drawer`; only the surface is ours. */
export const DRAWER_CONTENT: Record<DrawerDirection, string> = {
	bottom:
		"inset-x-0 bottom-0 mx-auto max-h-[92dvh] w-full max-w-2xl rounded-t-3xl border-b-0",
	top: "inset-x-0 top-0 mx-auto max-h-[92dvh] w-full max-w-2xl rounded-b-3xl border-t-0",
	left: "inset-y-0 left-0 h-full w-80 max-w-[85vw] rounded-r-3xl border-l-0",
	right: "inset-y-0 right-0 h-full w-80 max-w-[85vw] rounded-l-3xl border-r-0",
};

/** vaul's own [data-vaul-handle] CSS is a fixed 5px x 32px horizontal bar, only meant for
 * bottom/top; rotated to a vertical bar and absolutely positioned on the free edge for left/right. */
export const HANDLE_SIDES: Record<DrawerDirection, string> = {
	bottom: "mx-auto! mt-2 mb-1 h-1.5! w-10!",
	top: "order-last mx-auto! mt-1 mb-2 h-1.5! w-10!",
	left: "absolute! top-1/2! right-2! -translate-y-1/2! h-10! w-1.5!",
	right: "absolute! top-1/2! left-2! -translate-y-1/2! h-10! w-1.5!",
};

/** Not a separate drag target (vaul drags the whole panel), but still shows the grab
 * affordance on every side, rotated to a vertical bar for left/right. */
export const HANDLE_BAR_SIDES: Record<DrawerDirection, string> = {
	bottom: "mx-auto mt-4 h-2 w-24",
	top: "order-last mx-auto mb-4 h-2 w-24",
	left: "absolute top-1/2 right-2 -translate-y-1/2 h-24 w-2",
	right: "absolute top-1/2 left-2 -translate-y-1/2 h-24 w-2",
};
