
import { Metadata } from "next";
import { createProduct } from "./actions";
import ProductForm from "./form";

export const metadata: Metadata = {
    title: "Create a new product",
    description: "Create a new product page"
}


export default async function CreateNewProduct() {


    return (<div className="space-y-6 p-10 pb-16 w-full mt-5">
        <ProductForm saveProduct={createProduct}/>
  </div>)
}