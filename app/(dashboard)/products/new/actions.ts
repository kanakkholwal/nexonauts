"use server";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { customAlphabet } from 'nanoid';
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/dbConnect";
import Product from "src/models/product";
import { sessionType } from "src/types/session";

const generateUrlSlug = (length = 16) => customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", length)();

export async function getCatgories() {
    const session = await getServerSession(authOptions) as sessionType;
    await dbConnect();
    const products = await Product.find({ creator: session.user._id }).exec();
    return Promise.resolve(JSON.parse(JSON.stringify(products)));
}

export async function createProduct(product) {
    const session = await getServerSession(authOptions) as sessionType;
    try{
        await dbConnect();

        const newProduct = new Product({
            name: product.name,
            description: product.description,
            price: product.formatted_price,
            slug: generateUrlSlug(),
            preview_url: product.preview_url,
            url: product.short_url,
            creator: session.user._id,
            tags: product.tags,
            categories: product?.categories || [],
            published: product.published,
            third_party: {
                provider: null,
                product_id: null
            }
        });
        await newProduct.save();
        revalidatePath("/products");
        return Promise.resolve(true);
    }
    catch(e){
        console.log(e);
        return Promise.reject(e);
    }


}