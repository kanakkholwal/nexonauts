import { create } from "zustand";

type State = {
  name: string;
  email: string;
  website: string;
  github_username: string;
  github_repo: string;
};

export const useFormStore = create<State>((set) => ({
  name: "",
  email: "",
  website: "",
  github_username: "",
  github_repo: "",
}));
