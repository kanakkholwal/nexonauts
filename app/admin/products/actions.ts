"use server";
import axios from "axios";
import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/db";
import Product, { ProductType, rawProductThirdParty } from "src/models/product";
import User from "src/models/user";
import { Session } from "~/auth";
import { getSession } from "~/auth/server";


const generateUrlSlug = (length = 16) =>
  customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();

const availableIntegrations = ["gumroad"];

export async function getProducts(
  filter: string,
  sort: string
): Promise<{
  products: ProductType[];
  integrated: boolean;
}> {
  const session = (await getSession()) as Session;
  const searchQuery = {
    creator: session.user.id,
  } as Record<string, any>;
  if (availableIntegrations.includes(filter)) {
    searchQuery["third_party.provider"] = filter;
  }

  await dbConnect();
  const products = await Product.find(searchQuery)
    .sort({ createdAt: sort === "latest" ? -1 : 1 })
    .exec();

  const user = await User.findById(session.user.id)
    .select("integrations.gumroad")
    .exec();
  const { gumroad } = user.integrations;

  return Promise.resolve({
    products: JSON.parse(JSON.stringify(products)),
    integrated: gumroad.access_token ? true : false,
  });
}
export async function fetchFromIntegration(integration: string) {
  if (integration === "gumroad") {
    return importFromGumroad();
  } else {
    return Promise.reject("Integration not found");
  }
}
export async function importFromGumroad(): Promise<rawProductThirdParty[]> {
  const session = (await getSession()) as Session;
  await dbConnect();
  const user = await User.findById(session.user.id)
    .select("integrations")
    .exec();
  if (!user) {
    return Promise.reject("User not found");
  }
  const { gumroad } = user.integrations;
  const url = new URL("https://api.gumroad.com/v2/products");
  url.searchParams.append("access_token", gumroad.access_token);
  const response = await axios.get(url.toString());
  const data = await response.data;
  // console.log("Data", data);
  if (data.success) {
    const products = data.products.filter(
      (product: any) =>
        product.deleted === false && product.is_tiered_membership === false
    );
    const sanitizedProducts = products.map((product: any) => {
      return {
        name: product.name,
        description: product.description,
        price: (product.price / 100).toFixed(2),
        url: product.short_url,
        preview_url: product.preview_url || null,
        tags: product.tags,
        categories: product.categories || [],
        published: product.published,
        third_party: {
          provider: "gumroad",
          product_id: product.id,
        },
      };
    }) as rawProductThirdParty[];
    return Promise.resolve(JSON.parse(JSON.stringify(sanitizedProducts)));
  } else {
    return Promise.reject("Error importing from Gumroad");
  }
}
export async function importProduct(product: rawProductThirdParty) {
  try {
    const session = (await getSession()) as Session;
    await dbConnect();
    const user = await User.findById(session.user.id).select("_id").exec();
    if (!user) {
      return Promise.reject("User not found");
    }
    const newProduct = new Product({
      ...product,
      creator: session.user.id,
    });
    await newProduct.save();
    return Promise.resolve(JSON.parse(JSON.stringify(newProduct)));
  } catch (e) {
    console.error(e);
    return Promise.reject("Error importing product");
  } finally {
    revalidatePath("/products");
  }
}

export async function syncWithGumroad() {
  const session = (await getSession()) as Session;
  await dbConnect();
  const user = await User.findById(session.user.id)
    .select("integrations")
    .exec();
  if (!user) {
    return Promise.reject("User not found");
  }
  const { gumroad } = user.integrations;
  const url = new URL("https://api.gumroad.com/v2/products");
  url.searchParams.append("access_token", gumroad.access_token);
  const response = await axios.get(url.toString());
  const data = await response.data;
  // console.log("Data", data);
  if (data.success) {
    const products = data.products.filter(
      (product: any) => product.published && product.deleted === false
    );
    for (const product of products) {
      const existingProduct = await Product.findOne({
        "third_party.provider": "gumroad",
        "third_party.product_id": product.id,
      }).exec();
      if (existingProduct) {
        existingProduct.name = product.name;
        existingProduct.description = product.description;
        existingProduct.price = (product.price / 100).toFixed(2);
        existingProduct.url = product.short_url;
        existingProduct.preview_url = product.preview_url || null;
        existingProduct.published = product.published;
        // TODO - Add tags and categories (unique to the array)
        existingProduct.tags = product.tags;
        existingProduct.categories = product.categories || [];
        await existingProduct.save();
      } else {
        console.log("Creating new product", product);
        const newProduct = new Product({
          name: product.name,
          description: product.description,
          price: (product.price / 100).toFixed(2),
          slug: generateUrlSlug(),
          preview_url: product.preview_url,
          url: product.short_url,
          creator: session.user.id,
          tags: product.tags,
          categories: product?.categories || [],
          published: product.published,
          third_party: {
            provider: "gumroad",
            product_id: product.id,
          },
        });
        await newProduct.save();
      }
    }
    gumroad.lastAsync = new Date();
    await user.save();
    console.log("Synced with Gumroad");
    revalidatePath("/products");
    return Promise.resolve(JSON.parse(JSON.stringify(products)));
  } else {
    return Promise.reject("Error syncing with Gumroad");
  }
}
export async function deleteProduct(productId: string) {
  const session = (await getSession()) as Session;
  await dbConnect();
  const product = await Product.findOneAndDelete({
    _id: productId,
    creator: session.user.id,
  }).exec();
  if (product) {
    revalidatePath("/products");
    return Promise.resolve(JSON.parse(JSON.stringify(product)));
  } else {
    return Promise.reject("Product not found");
  }
}
