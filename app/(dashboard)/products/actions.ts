"use server";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import axios from "axios";
import { customAlphabet } from 'nanoid';
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/dbConnect";
import Product from "src/models/product";
import User from "src/models/user";
import { sessionType } from "src/types/session";
const generateUrlSlug = (length = 16) => customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", length)();

export async function getProducts() {
    const session = await getServerSession(authOptions) as sessionType;
    await dbConnect();
    const products = await Product.find({ creator: session.user._id }).exec();
    return Promise.resolve(JSON.parse(JSON.stringify(products)));
}

export async function syncWithGumroad() {
    const session = await getServerSession(authOptions) as sessionType;
    await dbConnect();
    const user = await User.findById(session.user._id).select("integrations").exec();
    if (!user) {
        return Promise.reject("User not found");
    }
    const { gumroad } = user.integrations;
    const url = new URL("https://api.gumroad.com/v2/products");
    url.searchParams.append("access_token", gumroad.access_token);
    const response = await axios.get(url.toString());
    const data = await response.data;
    console.log("Data", data);
    if (data.success) {
        const products = data.products.filter((product: any) => product.published && product.deleted === false);
        for (const product of products) {
            const existingProduct = await Product.findOne({
                "third_party.provider": "gumroad",
                "third_party.product_id": product.id
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
                    creator: session.user._id,
                    tags: product.tags,
                    categories: product?.categories || [],
                    published: product.published,
                    third_party: {
                        provider: "gumroad",
                        product_id: product.id
                    }
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