"use server";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/dbConnect";
import Product, { ProductType } from "src/models/product";
import { sessionType } from "src/types/session";

export async function getProductBySlug(slug:string) : Promise<ProductType> {
    const session = await getServerSession(authOptions) as sessionType;
    

    await dbConnect();
    const product = await Product.findOne({
        slug: slug,
        creator:session.user._id
    }).exec();

    revalidatePath(`/products/${slug}/edit`,'page')
    return Promise.resolve(JSON.parse(JSON.stringify(product)));
}
export async function updateProduct(productId:string,newData:Partial<ProductType>) : Promise<boolean> {
    const session = await getServerSession(authOptions) as sessionType;
    

    await dbConnect();
    const product = await Product.findOneAndUpdate({
        _id: productId,
        creator:session.user._id
    },{
        ...newData
    },{new:true}).exec()


    revalidatePath(`/products/${product.slug}/edit`,'page')
    return Promise.resolve(true);
}
