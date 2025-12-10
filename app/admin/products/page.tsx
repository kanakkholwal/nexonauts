import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ButtonLink } from "@/components/utils/link";
import {
  ArrowRight,
  Box,
  Import,
  Loader2,
  MoreVertical,
  Plus,
  Search
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "src/lib/integrations/index";
import {
  deleteProduct,
  fetchFromIntegration,
  getProducts,
  importProduct,
} from "./actions";
import DeleteProductButton from "./components/delete-btn";
import { FilterAndSort, ImportedProductCard } from "./components/products";

export const metadata: Metadata = {
  title: "My Products - Dashboard",
  description: "Manage your digital assets.",
};

type PageProps = {
  searchParams: Promise<{
    importFrom?: string;
    filter?: string;
    sort?: string;
  }>;
};

const availableIntegrations = ["gumroad"];

export default async function MyProducts(props: PageProps) {
  const searchParams = await props.searchParams;

  const { products, integrated } = await getProducts(
    searchParams.filter ?? "all",
    searchParams.sort ?? "latest"
  );

  const importFrom = availableIntegrations.includes(
    searchParams?.importFrom ?? "none"
  )
    ? searchParams.importFrom
    : null;

  const getFromIntegrations = async () => {
    "use server";
    if (importFrom === null) return Promise.resolve([]);
    if (!availableIntegrations.includes(importFrom as string)) {
      return Promise.resolve([]);
    }
    const data = await fetchFromIntegration(importFrom as string);
    return data;
  };

  const productsFromIntegrations = await getFromIntegrations();
  const productsIds = products
    .filter((product) => product?.third_party !== null)
    .map((product) => product?.third_party?.product_id);

  return (
    <div className="min-h-screen w-full">


      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              Products
              <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {products.length}
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">Manage and track your digital assets.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Import className="w-4 h-4" />
                  Import
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader className="mb-6">
                  <SheetTitle>Import Products</SheetTitle>
                  <SheetDescription>
                    Sync products from your connected platforms.
                  </SheetDescription>
                </SheetHeader>

                {importFrom ? (
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {importFrom} Library
                      </h3>
                      <Link href="?" className="text-xs text-primary hover:underline">
                        Change Source
                      </Link>
                    </div>

                    <Suspense fallback={
                      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Fetching library...</p>
                      </div>
                    }>
                      <ScrollArea className="flex-1 -mx-6 px-6">
                        <div className="space-y-4 pb-10">
                          {productsFromIntegrations
                            .filter(p => !productsIds.includes(p.third_party.product_id))
                            .map((product) => (
                              <ImportedProductCard
                                key={product.third_party.product_id}
                                product={product}
                                importProduct={importProduct.bind(null, product)}
                              />
                            ))
                          }
                          {productsFromIntegrations.length === 0 && (
                            <p className="text-center text-muted-foreground py-10">No new products found.</p>
                          )}
                        </div>
                      </ScrollArea>
                    </Suspense>
                  </div>
                ) : (
                  <div className="grid gap-4 py-4">
                    {availableIntegrations.map((integration) => (
                      <ButtonLink
                        key={integration}
                        href={integrated ? `?importFrom=${integration}` : `/settings/integrations/${integration}`}
                        variant="outline"
                        className="h-16 justify-start px-4"
                      >
                        <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center mr-4">
                          <Icon icon={integration} className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <span className="block font-semibold capitalize">{integration}</span>
                          <span className="block text-xs text-muted-foreground">
                            {integrated ? "Browse library" : "Connect account"}
                          </span>
                        </div>
                        <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground" />
                      </ButtonLink>
                    ))}
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <ButtonLink href="/dashboard/products/new" className="gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" />
              Create New
            </ButtonLink>
          </div>
        </div>

        {/* --- Toolbar --- */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 p-1">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 bg-background/50 border-border/50"
            />
          </div>
          <FilterAndSort />
        </div>

        {/* --- Content Grid --- */}
        <Suspense fallback={<ProductGridSkeleton />}>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Header */}
                  <div className="relative h-48 w-full bg-muted border-b border-border/50 overflow-hidden">
                    <Image
                      src={product.preview_url || "/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur" asChild>
                        <Link href={`/dashboard/products/${product.slug}/edit`}>
                          <span className="sr-only">Edit</span>
                          <MoreVertical className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                      <div className="flex gap-2">
                        <ButtonLink variant="light" size="sm" href={`/marketplace/products/${product.slug}`} target="_blank">
                          View Live
                        </ButtonLink>
                        <ButtonLink variant="ghost" size="sm" href={`/dashboard/products/${product.slug}/edit`}>
                          Edit
                        </ButtonLink>
                      </div>
                      <DeleteProductButton deleteProduct={deleteProduct.bind(null, product._id)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </Suspense>

      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-[300px] rounded-2xl bg-muted/20 animate-pulse border border-border/50" />
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/5">
      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
        <Box className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">No products yet</h3>
      <p className="text-muted-foreground max-w-sm mx-auto mb-8">
        Start building your library by creating a new product or importing from Gumroad.
      </p>
      <ButtonLink href="/dashboard/products/new">
        Create First Product
      </ButtonLink>
    </div>
  )
}