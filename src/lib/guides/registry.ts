import type { ComponentRegistry } from "@docvia/renderer-core";
import Step from "$lib/components/guides/step.svelte";

const components: Record<string, { component: unknown; hydrate?: boolean }> = {
	step: { component: Step }
};

export const guideRegistry: ComponentRegistry = {
	resolve(name) {
		return components[name] ?? null;
	}
};
