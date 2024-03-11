"use server";
import dbConnect from "src/lib/dbConnect";
import Product, { ProductType } from "src/models/product";


export async function getProductBySlug(slug:string) : Promise<ProductType> {
    await dbConnect();
    const product = await Product.findOne({
        published: true,
        slug
    })
        .exec();
    return Promise.resolve(JSON.parse(JSON.stringify(product)));
}
