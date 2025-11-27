"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/db";
import Product, { rawProduct } from "src/models/product";
import { getSession } from "~/auth/server";

import { createSlug } from "src/utils/string";
import { Session } from "src/auth";

export async function getCategories() {
  const session = (await getSession()) as Session;
  await dbConnect();
  const products = await Product.find({ creator: session.user.id }).exec();
  return Promise.resolve(JSON.parse(JSON.stringify(products)));
}

export async function createProduct(
  product: Omit<rawProduct, "third_party" | "slug">
) {
  const session = (await getSession()) as Session;
  try {
    await dbConnect();

    const newProduct = new Product({
      name: product.name,
      description: product.description,
      price: product.price,
      slug: createSlug(product.name),
      preview_url: product.preview_url,
      url: product.url,
      creator: session.user.id!,
      tags: product.tags.filter(
        (tag) => tag.trim() !== "" && tag !== null && tag.trim().length > 2
      ),
      categories: product?.categories || [],
      published: product.published,
      third_party: {
        provider: null,
        product_id: null,
      },
    });
    await newProduct.save();
    revalidatePath("/products");
    return Promise.resolve(true);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}
