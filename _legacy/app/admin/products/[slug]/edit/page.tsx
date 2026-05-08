import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, updateProduct } from "./actions";
import EditProductForm from "./form";

export const metadata: Metadata = {
  title: "Edit Product - NexoNauts",
  description: "Manage and update your product details.",
};

export default async function EditProductPage(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen w-full">


      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 py-6">

        {/* --- Header --- */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full border border-border/50">
            <Link href="/dashboard/products">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
            <p className="text-sm text-muted-foreground">Update details for <span className="font-medium text-foreground">{product.name}</span></p>
          </div>
        </div>

        <EditProductForm product={product} updateProduct={updateProduct} />
      </div>
    </div>
  );
}