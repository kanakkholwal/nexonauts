import { Metadata } from "next";
import { getProductBySlug, updateProduct } from "./actions";
import { notFound } from "next/navigation";
import EditProductForm from "./form";

export const metadata: Metadata = {
  title: "Edit product - NexoNauts",
  description: "Edit product for NexoNauts",
};

export default async function EditProductPage(props: {
  params: Promise<{
    slug: string;
  }>
}) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return notFound();
  }

  return (
    <div className="space-y-6 p-4 md:p-10 pb-16 w-full mt-5">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-bold">Edit product</h1>
      </div>

      <EditProductForm product={product} updateProduct={updateProduct} />
    </div>
  );
}
