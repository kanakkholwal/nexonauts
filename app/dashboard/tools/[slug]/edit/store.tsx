import { PublicToolTypeWithId } from "src/models/tool";
import { create } from "zustand";

export interface toolType extends PublicToolTypeWithId {}
type State = {
  tool: PublicToolTypeWithId | null;
};

export const useFormStore = create<State>((set) => ({
  tool: null,
}));
