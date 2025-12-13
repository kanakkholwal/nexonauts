import { PipelineStage } from "mongoose";
import dbConnect from "src/lib/db";
import Product, {
  ProductType,
  ProductTypeWithCreator,
} from "src/models/product";

export async function getProductBySlug(
  slug: string
): Promise<ProductTypeWithCreator> {
  await dbConnect();
  const product = await Product.findOne({
    published: true,
    slug,
  })
  .populate("creator", "username")
  //   .populate({
  //   path: "creator",
  //     // model: "Profile",
  //   populate: {
  //     path: "user",
  //     // model: "User",
  //     select: "name username profilePicture"
  //   }
  // })
  .lean();
  console.log("PRODUCT", product);


  return Promise.resolve(JSON.parse(JSON.stringify(product)));
}
export async function getMoreProductsByCreator(
  slug: string
): Promise<ProductType[]> {
  await dbConnect();
  const product = await Product.findOne({
    published: true,
    slug,
  }).exec();

  if (!product) {
    return Promise.resolve([]);
  }

  const moreFromCreator = await Product.find({
    published: true,
    creator: product.creator,
    _id: { $ne: product._id },
  })
    .sort({ createdAt: -1 })
    .limit(6)
    .exec();

  return Promise.resolve(JSON.parse(JSON.stringify(moreFromCreator)));
}
export async function getSimilarProducts(slug: string): Promise<ProductType[]> {
  await dbConnect();
  const product = await Product.findOne({ slug, published: true });

  if (!product) {
    return Promise.reject(`Product with slug ${slug} not found`);
  }

  const pipeline = [
    {
      $match: {
        _id: { $ne: product._id },
        published: true,
        categories: { $in: product.categories },
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        url: 1,
        slug: 1,
        preview_url: 1,
        tags: 1,
        categories: 1,
        price: 1,
        similarity: { $setIntersection: ["$tags", product.tags] },
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        url: 1,
        slug: 1,
        preview_url: 1,
        tags: 1,
        categories: 1,
        price: 1,
        similarityScore: { $size: "$similarity" },
      },
    },
    {
      $sort: { similarityScore: -1 },
    },
    {
      $limit: 6,
    },
  ] as PipelineStage[];

  const similarProducts = await Product.aggregate(pipeline);

  return Promise.resolve(JSON.parse(JSON.stringify(similarProducts)));
}
