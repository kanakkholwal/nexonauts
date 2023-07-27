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
    content?: {
      time?: number | Date;
      blocks?: ContentBlock[];
      version?: string;
    } | null;
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
  }
  interface ContentBlock {
    id: string;
    type: string;
    data: {
      text: string;
      level?: number;
    };
  }