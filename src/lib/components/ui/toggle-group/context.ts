import { createContext } from "svelte";
import type { ToggleGroupSize } from "./variants";

export type { ToggleGroupSize };

export type ToggleGroupContext = {
	readonly size: ToggleGroupSize;
};

export const [getToggleGroup, setToggleGroup] = createContext<ToggleGroupContext>();
