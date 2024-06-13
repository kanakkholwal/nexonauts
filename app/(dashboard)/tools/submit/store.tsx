import { rawPublicToolType } from 'src/models/tool';
import { create } from 'zustand';

type State = {
  tool: rawPublicToolType;
};

export const useFormStore = create<State>((set) => ({
  tool: {
    name: '',
    description: '',
    coverImage: '',
    categories: [],
    tags: [],
    link: '',
    slug: 'some-url',
    status: 'draft',
    pricing_type: 'other',
    verified: false,
  },
}));
