import { ProfileTypeWithIdUser } from 'src/models/profile';
import { create } from 'zustand';

export interface profileType extends ProfileTypeWithIdUser {}
type State = {
  profile: profileType | null;
};

export const useProfileStore = create<State>((set) => ({
  profile: null,
}));
