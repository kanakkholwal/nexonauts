import { getContext, setContext } from "svelte";
import type { TableDensity } from "./variants";

const KEY = Symbol("table-density");

export function setDensity(density: () => TableDensity) {
	setContext(KEY, density);
}

export function getDensity(): () => TableDensity {
	const density = getContext<(() => TableDensity) | undefined>(KEY);
	return density ?? (() => "comfortable");
}
