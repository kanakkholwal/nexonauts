"use server";
import dbConnect from "src/lib/dbConnect";
import Product, { ProductType } from "src/models/product";


export async function getProducts() : Promise<Partial<ProductType>[]> {
    await dbConnect();
    const products = await Product.find({
        published: true,
    })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
    return Promise.resolve(JSON.parse(JSON.stringify(products)));
}
