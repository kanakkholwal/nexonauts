import { PipelineStage } from "mongoose";
import dbConnect from "src/lib/dbConnect";
import Product, { ProductType } from "src/models/product";

export type searchParamsType = {
  query?: string;
  category?: string;
  tags?: string;
  price?: string;
};

export async function getProducts(searchParams: searchParamsType): Promise<{
  products: ProductType[];
}> {
  await dbConnect();
  const { query, category, tags, price } = searchParams;
  const queryObj = {} as Record<string, any>;

  if (query) {
    // queryObj.$text = { $search: query };
    queryObj.$or = [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }
  if (category) {
    // queryObj.category = category;
    //  use regex and case-insensitive search
    queryObj.category = { $regex: category, $options: "i" };
  }
  if (tags) {
    queryObj.tags = { $all: tags.split(",") };
  }
  if (price) {
    if (price === "free") {
      queryObj.price = 0;
    } else if (price === "paid") {
      queryObj.price = { $gt: 0 };
    } else if (price.includes("-")) {
      const [min, max] = price.split("-")?.map(Number) || [];
      queryObj.price = { $gte: min, $lte: max };
    }
  }

  queryObj.published = true;

  const products = await Product.find(queryObj)
    .sort({ createdAt: -1 })
    .limit(10)
    .exec();

  return Promise.resolve({
    products: JSON.parse(JSON.stringify(products)),
  });
}


interface PopularMetaReturnType {
  tags: { tag: string; count: number }[];
}

export async function getPopularMeta(): Promise<PopularMetaReturnType> {
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
    // {
    //   $limit: 10,
    // },
  ] as PipelineStage[];
  const result = await Product.aggregate(pipeline).exec();

  return Promise.resolve({
    tags: JSON.parse(JSON.stringify(result)).filter((tag:PopularMetaReturnType["tags"][number]) => tag.tag.trim() !== ""),
  });
}
