"use server";
import dbConnect from "src/lib/dbConnect";
import Post, { Author, PostWithId } from "src/models/post";

const PUBLIC_VIEW_KEYS =
  "title description slug image labels claps author createdAt";
const PUBLIC_POST_VIEW_KEYS =
  "title description slug image labels claps content comments author createdAt";

type getHomePagePostsReturnType = {
  success: boolean;
  message: string;
  posts: PostWithId[];
  totalPages?: number;
  currentPage?: number;
  total?: number;
};
export async function getHomePagePosts(): Promise<getHomePagePostsReturnType> {
  await dbConnect();
  const page = 1; // Default to page 1 if not provided
  const limit = 10; // Default to 10 posts per page
  const skip = (page - 1) * limit;
  const posts = await Post.find({
    state: "published",
  })
    .populate("author", "name username profilePicture")
    .select(PUBLIC_VIEW_KEYS)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();
  const total = await Post.countDocuments({ state: "published" });
  const totalPages = Math.ceil(total / limit);

  if (!posts) {
    return {
      success: false,
      message: "No posts found!",
      posts: [],
      totalPages,
      currentPage: page,
      total,
    };
  }

  return {
    success: true,
    message: "Posts found!",
    posts: JSON.parse(JSON.stringify(posts)),
    totalPages,
    currentPage: page,
    total,
  };
}

type getPostBySlugReturnType = {
  success: boolean;
  message: string;
  post:
    | (Omit<PostWithId, "author"> & {
        author: Pick<
          Author,
          "name" | "username" | "profilePicture" | "profile"
        >;
      })
    | null;
};

export async function getPostBySlug(
  slug: string
): Promise<getPostBySlugReturnType> {
  await dbConnect();
  const post = await Post.findOne(
    {
      slug,
      state: "published",
    },
    { lean: true }
  )
    .populate("author", "name username profilePicture profile")
    .select(PUBLIC_POST_VIEW_KEYS)
    .exec();
  if (!post) {
    return {
      success: false,
      message: "Post not found!",
      post: null,
    };
  }
  return {
    success: true,
    message: "Post found!",
    post: JSON.parse(JSON.stringify(post)),
  };
}

export async function getRecentPosts(
  noOfPost: number = 5
): Promise<PostWithId[]> {
  await dbConnect();
  const posts = await Post.find({ state: "published" })
    .sort({ createdAt: -1 })
    .populate("author", "name username profilePicture profile")
    .limit(noOfPost)
    .select("title description slug labels image author createdAt comments")
    .exec();

  return JSON.parse(JSON.stringify(posts));
}
