import { create } from "zustand";

export type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  type: string;
  subject: string;
  aditional_info: Record<string, string | null>;
  createdAt: string;
  updatedAt: string;
};

type State = {
  messages: Message[];
  selected: Message["_id"] | null;
  totalPages: number;
  currentPage: number;
  query: string;
  filter: {
    [key: string]: any;
  };
};

export const useMessagesStore = create<State>((set) => ({
  messages: [],
  selected: "all",
  totalPages: 0,
  currentPage: 1,
  query: "",
  filter: {},
}));
