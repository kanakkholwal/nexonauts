import Post from 'src/models/post';
import User from 'src/models/user';

export const PUBLIC_VIEW_KEYS =
  'title description slug coverImage labels claps publishedAt author image';
export const PUBLIC_POST_VIEW_KEYS =
  'title description slug coverImage labels claps publishedAt content publishedAt comments author image';
export async function getHomePagePosts() {
  const page = 1; // Default to page 1 if not provided
  const limit = 10; // Default to 10 posts per page
  const skip = (page - 1) * limit;
  const posts = await Post.find({
    state: 'published',
  })
    .populate('author', 'name username profileURL')
    .select(PUBLIC_VIEW_KEYS)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();
  const total = await Post.countDocuments({ state: 'published' });
  const totalPages = Math.ceil(total / limit);

  if (!posts) {
    return {
      success: false,
      message: 'No posts found!',
      posts: [],
      totalPages,
      currentPage: page,
      total,
    };
  }

  return {
    success: true,
    message: 'Posts found!',
    posts: posts,
    totalPages,
    currentPage: page,
    total,
  };
}
export async function getPostBySlug(slug: string) {
  const post = await Post.findOne(
    {
      slug,
      state: 'published',
    },
    { lean: true }
  )
    .populate('author', 'name username profilePicture')
    .select(PUBLIC_POST_VIEW_KEYS)
    .exec();
  if (!post) {
    return {
      success: false,
      message: 'Post not found!',
      post: null,
    };
  }
  return {
    success: true,
    message: 'Post found!',
    post: JSON.parse(JSON.stringify(post)),
  };
}
export async function getRecentPosts(noOfPost: number) {
  const posts = await Post.find({ state: 'published' })
    .sort({ createdAt: -1 })
    .populate('author')
    .limit(noOfPost ?? 5)
    .select(
      'title description slug labels image author createdAt publishedAt comments'
    )
    .exec();

  return JSON.parse(JSON.stringify(posts));
}

export async function getAllPublishedPostsForMapping() {
  const posts = await Post.find({
    state: 'published',
  })
    .select('slug')
    .exec();
  if (!posts) {
    return {
      success: false,
      message: 'No posts found!',
      posts: [],
    };
  }
  return {
    success: true,
    message: 'Posts found!',
    posts,
  };
}
