"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "src/lib/auth";
import dbConnect from "src/lib/db";
import Product, { ProductType } from "src/models/product";
import { sessionType } from "src/types/session";

export async function getProductBySlug(slug: string): Promise<ProductType> {
  const session = (await getSession()) as sessionType;

  await dbConnect();
  const product = await Product.findOne({
    slug: slug,
    creator: session.user._id,
  }).exec();

  // revalidatePath(`/products/${slug}/edit`, "page");
  return Promise.resolve(JSON.parse(JSON.stringify(product)));
}
export async function updateProduct(
  productId: string,
  newData: Partial<ProductType>
): Promise<boolean> {
  const session = (await getSession()) as sessionType;

  await dbConnect();
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      creator: session.user._id,
    },
    {
      ...newData,
      ...((newData?.tags?.length ?? 0 > 0)
        ? {
            tags: newData!.tags!.filter(
              (tag) =>
                tag.trim() !== "" && tag !== null && tag.trim().length > 2
            ),
          }
        : {}),
    },
    { new: true }
  ).exec();

  revalidatePath(`/products/${product.slug}/edit`, "page");
  return Promise.resolve(true);
}
