import type { IconComponentProps } from "phosphor-svelte";
import Code from "phosphor-svelte/lib/Code";
import FileText from "phosphor-svelte/lib/FileText";
import ImageSquare from "phosphor-svelte/lib/ImageSquare";
import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
import Wrench from "phosphor-svelte/lib/Wrench";
import type { Component } from "svelte";

type Icon = Component<IconComponentProps>;

/** One glyph per category, so a grid of nine tools is not nine identical marks. */
const byCategory: Record<string, Icon> = {
	"Document Tools": FileText,
	"Image Tools": ImageSquare,
	SEO: MagnifyingGlass,
	"Web Tools": Code
};

export const categoryIcon = (category: string): Icon => byCategory[category] ?? Wrench;
