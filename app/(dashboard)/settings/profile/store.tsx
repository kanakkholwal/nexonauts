import { ProfileTypeWithId } from "src/models/profile";
import { create } from "zustand";

export interface profileType extends ProfileTypeWithId {}
type State = {
    profile:  ProfileTypeWithId | null
}

export const useProfileStore = create<State>((set) => ({
    profile: null
}))