import Product from "src/models/Product";

export async function getProducts() {
    return await Product.find();
}
export async function getProductbySlug(slug:string) {
    return await Product.findOne({slug});
}