import Product from "src/models/product";
import { SessionUserType } from "src/types/user";

export async function getProducts() {
  return await Product.find();
}
export async function getProductbySlug(slug: string) {
  return await Product.findOne({ slug });
}
export async function getMyProducts(user: SessionUserType) {
  //
  return await Product.find({
    $and: [
      {
        "creator.username": user.username,
      },
      {
        "creator.username": user.username,
      },
    ],
  })
    .sort({ createdAt: -1 })
    .select(
      "title price product_type short_description coverImage categories likes views slug createdAt"
    )
    .limit(10);
}
