"use server";
import { PipelineStage } from "mongoose";
import dbConnect from "src/lib/dbConnect";
import Product, { ProductType } from "src/models/product";

<<<<<<< HEAD
export async function getProductsByCategory(): Promise<
  {
    category: string;
    products: Partial<ProductType>[];
  }[]
> {
  await dbConnect();

  const pipeline = [
    {
      $unwind: { path: "$categories" },
    },
    {
      $group: {
        _id: "$categories",
        count: { $sum: 1 }, // Count the number of products in each category
        products: { $push: "$$ROOT" },
      },
    },
    {
      $sort: {
        count: -1, // Sort by the count of products descending
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        products: {
          $slice: ["$products", 0, 4], // Limit products to 4 per category
        },
      },
    },
    {
      $sort: {
        category: 1,
      },
    },
  ] as PipelineStage[];
  const result = await Product.aggregate(pipeline).exec();

  return Promise.resolve(JSON.parse(JSON.stringify(result)));
=======
export async function getProducts(): Promise<Partial<ProductType>[]> {
  await dbConnect();
  const products = await Product.find({
    published: true,
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .exec();
  return Promise.resolve(JSON.parse(JSON.stringify(products)));
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
}
