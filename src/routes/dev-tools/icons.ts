import IconCode from "@tabler/icons-svelte/icons/code";
import IconFileText from "@tabler/icons-svelte/icons/file-text";
import IconPhoto from "@tabler/icons-svelte/icons/photo";
import IconSearch from "@tabler/icons-svelte/icons/search";
import IconTool from "@tabler/icons-svelte/icons/tool";
import type { IconComponent } from "$lib/icon";

type Icon = IconComponent;

/** One glyph per category, so a grid of nine tools is not nine identical marks. */
const byCategory: Record<string, Icon> = {
	"Document Tools": IconFileText,
	"Image Tools": IconPhoto,
	SEO: IconSearch,
	"Web Tools": IconCode
};

export const categoryIcon = (category: string): Icon => byCategory[category] ?? IconTool;
