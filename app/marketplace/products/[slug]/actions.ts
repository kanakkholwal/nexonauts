"use server";
import { PipelineStage } from "mongoose";
import dbConnect from "src/lib/dbConnect";
import Product, {
  ProductType,
  ProductTypeWithCreator,
} from "src/models/product";

<<<<<<< HEAD
export async function getProductBySlug(
  slug: string
): Promise<ProductTypeWithCreator> {
=======
<<<<<<< HEAD
export async function getProductBySlug(
  slug: string
): Promise<ProductTypeWithCreator> {
=======
export async function getProductBySlug(slug: string): Promise<ProductType> {
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
  await dbConnect();
  const product = await Product.findOne({
    published: true,
    slug,
<<<<<<< HEAD
  })
    .populate("creator", "name username profilePicture")
    .exec();
  return Promise.resolve(JSON.parse(JSON.stringify(product)));
}
export async function getSimilarProducts(slug: string): Promise<ProductType[]> {
=======
<<<<<<< HEAD
  })
    .populate("creator", "name username profilePicture")
    .exec();
  return Promise.resolve(JSON.parse(JSON.stringify(product)));
}
export async function getSimilarProducts(slug: string): Promise<ProductType[]> {
=======
  }).exec();
  return Promise.resolve(JSON.parse(JSON.stringify(product)));
}
export async function getSimilarProducts(slug: string) {
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
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
<<<<<<< HEAD
  ] as PipelineStage[];
=======
<<<<<<< HEAD
  ] as PipelineStage[];
=======
  ] as unknown as any;
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0

  const similarProducts = await Product.aggregate(pipeline);

  return Promise.resolve(JSON.parse(JSON.stringify(similarProducts)));
}
