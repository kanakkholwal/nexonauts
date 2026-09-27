import { createContext, type Snippet } from "svelte";
import type { DialogSize, DialogVariant } from "./variants";

export type { DialogSize, DialogVariant };

export type DialogContext = {
	readonly size: DialogSize;
	readonly variant: DialogVariant;
	readonly dismissOnBackdrop: boolean;
	/** The footer hoists itself here so it can sit in the frame rim below the surface. */
	footer: { children?: Snippet; class?: string } | undefined;
};

export const [getDialog, setDialog] = createContext<DialogContext>();

/** The backdrop fades in step with the panel; bits-ui owns the top layer and inertness. */
export const DIALOG_BACKDROP = [
	"fixed inset-0 z-50 bg-black/50 opacity-0 backdrop-blur-[2px]",
	"transition-opacity duration-[var(--duration-exit)] ease-[var(--ease-out)]",
	"data-[state=open]:opacity-100 data-[state=open]:duration-[var(--duration-overlay)]",
	"starting:data-[state=open]:opacity-0",
	"motion-reduce:transition-none",
].join(" ");

/** The panel scales and lifts. Only the closed state carries a transform, so nothing collides. */
export const DIALOG_PANEL = [
	"fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-visible outline-none",
	"transition-[opacity,scale,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"data-[state=closed]:opacity-0 data-[state=closed]:scale-[var(--enter-scale)]",
	"data-[state=closed]:translate-y-[calc(var(--enter-lift)-50%)] data-[state=closed]:duration-[var(--duration-exit)]",
	"starting:data-[state=open]:opacity-0 starting:data-[state=open]:scale-[var(--enter-scale)]",
	"starting:data-[state=open]:translate-y-[calc(var(--enter-lift)-50%)]",
	"motion-reduce:transition-none",
].join(" ");
