import { createContext, type Snippet } from "svelte";
import type { DialogVariant } from "$lib/components/ui/dialog/context";

export type AlertDialogContext = {
	readonly variant: DialogVariant;
	/** The footer hoists itself here so it can sit in the frame rim below the surface. */
	footer: { children?: Snippet; class?: string } | undefined;
};

export const [getAlertDialog, setAlertDialog] = createContext<AlertDialogContext>();
