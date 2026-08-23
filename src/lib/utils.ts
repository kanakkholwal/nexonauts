import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { createTV } from "tailwind-variants";

/**
 * Every custom `--text-*` step has to be registered here. tailwind-merge only
 * knows Tailwind's built-in sizes, so an unregistered step is read as a text
 * COLOUR: `cn("text-background", "text-body")` then looks like two colours and
 * twMerge silently drops the first. That is how `variant="dark"` shipped with
 * no `text-background` at all, giving a near-white button an inherited grey
 * label. If a step is added to `@theme`, add it here in the same commit.
 */
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
						"subheading",
						"heading-sm",
						"heading",
						"heading-lg",
						"display",
						"display-lg",
						"13"
					]
				}
			],
			// Same reasoning: an unregistered name is not recognised as part of the
			// group, so it never wins or loses a merge predictably.
			rounded: [{ rounded: ["pill", "xxl"] }],
			shadow: [
				{ shadow: ["craft-sm", "craft-md", "craft-lg", "craft-xl", "craft-floating", "craft-inset"] }
			]
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
