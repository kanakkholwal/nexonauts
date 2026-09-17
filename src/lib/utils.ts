import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { createTV } from "tailwind-variants";

// An unregistered size step is read as a text COLOUR, so twMerge drops it when a
// real colour follows. Add every new @theme step here in the same commit.
const twMergeConfig = {
	extend: {
		classGroups: {
			"font-size": [
				{
					text: [
						"caption",
						"body-sm",
						"body",
						"body-lg",
						"body-xl",
						"subheading",
						"heading-sm",
						"heading",
						"heading-lg",
						"display",
						"display-lg",
						"display-xl",
						"poster",
						"poster-xl",
						"13"
					]
				}
			],
			rounded: [{ rounded: ["pill", "xxl"] }],
			shadow: [
				{
					shadow: [
						"craft-sm",
						"craft-md",
						"craft-lg",
						"craft-xl",
						"craft-floating",
						"craft-inset",
						"button",
						"subtle",
						"frame",
						"soft-drop",
						"elevation-1",
						"elevation-2",
						"elevation-3",
						"ring"
					]
				}
			]
		}
	}
} as const;

const twMerge = extendTailwindMerge(twMergeConfig);

/** Use instead of importing `tv` directly, so variants share this merge config. */
export const tv = createTV({ twMergeConfig });

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithoutChild<T> = T extends { child?: unknown } ? Omit<T, "child"> : T;
export type WithoutChildren<T> = T extends { children?: unknown } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
