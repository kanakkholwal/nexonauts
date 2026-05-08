"use server";
import { PipelineStage } from "mongoose";
import dbConnect from "src/lib/db";
import Product, { ProductType } from "src/models/product";

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
}
