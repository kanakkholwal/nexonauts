import { notFound } from "next/navigation";
import { getProductBySlug } from "./actions";

export default async function ProductPage({ params }: {
    params: {
        slug: string;
    }
}) {
    const product = await getProductBySlug(params.slug);
    if (!product) {
        return notFound();
    }




    return (
        <>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center">
                    <div className="ml-2 text-gray-500">{product.price}</div>
                </div>
            </div>
        </>
    )
}