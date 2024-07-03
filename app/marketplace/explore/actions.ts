"use server";
import { PipelineStage } from "mongoose";
import dbConnect from "src/lib/dbConnect";
import Product, { ProductType } from "src/models/product";

export async function getProducts(): Promise<Partial<ProductType>[]> {
  await dbConnect();
  const products = await Product.find({
    published: true,
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .exec();
  return Promise.resolve(JSON.parse(JSON.stringify(products)));
}

export async function getPopularMeta(): Promise<{
  tags: { tag: string; count: number }[];
}> {
  await dbConnect();
  const pipeline = [
    {
      $unwind: { path: "$tags" },
    },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
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
        tag: "$_id",
        count: "$count",
      },
    },
    {
      $sort: {
        count: -1,
        tag: 1,
      },
    },
    {
      $limit: 10,
    },
  ] as PipelineStage[];
  const result = await Product.aggregate(pipeline).exec();

  return Promise.resolve({
    tags: JSON.parse(JSON.stringify(result)),
  });
}
