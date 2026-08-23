import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { createTV } from "tailwind-variants";

/** `text-13` is a custom step. Without registering it, twMerge reads it as a
 *  colour and silently drops whichever text colour it is combined with. */
const twMergeConfig = {
	extend: {
		classGroups: {
			"font-size": [{ text: ["13"] }]
		}
	}
} as const;

const twMerge = extendTailwindMerge(twMergeConfig);

/** Use instead of importing `tv` directly — tailwind-variants runs its own
 *  twMerge internally and needs the same config. */
export const tv = createTV({ twMergeConfig });

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
