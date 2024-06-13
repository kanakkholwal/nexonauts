export type Post = {
  metadata?: {
    keywords?: string[];
    image?: string;
  };
  author: {
    name: string;
    profileURL: string;
    user?: {
      _id?: string;
      name?: string;
      profileURL?: string;
    };
  };
  comments: {
    enabled: boolean;
  };
  _id: string;
  title: string;
  content?:
    | {
        time?: number | Date;
        blocks?: ContentBlock[];
        version?: string;
      }
    | string
    | null;
  slug: string;
  labels: string[];
  image: string;
  state: string;
  claps?: Number;
  analytics: {
    _id: string;
    title: string;
    slug: string;
    type: string;
    analytics: any[]; // You can replace `any` with a more specific type if known
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  __v: number;
  description: string;
};

//  title description slug coverImage labels claps createdAt author image
export type PubliewViewPostType = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  labels: string[];
  claps: number;
  publishedAt: string;
  author: {
    name: string;
    username: string;
    profileURL: string;
  };
};
// export const PUBLIC_POST_VIEW_KEYS = "title description slug coverImage labels claps publishedAt content publishedAt comments author image";

export type PUBLICPostViewType = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  labels: string[];
  claps: number;
  publishedAt: string;
  content: string;
  author: {
    name: string;
    username: string;
    profileURL: string;
  };
  comments: string[];
};
type rawPost = {
  _id: string;
  title: string;
  content: string;
  slug: string;
  labels: string[];
  image: string;
  state: string;
  claps?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  __v?: number;
};
interface ContentBlock {
  id: string;
  type: string;
  data: {
    text: string;
    level?: number;
  };
}
