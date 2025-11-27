import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ConditionalRender from "@/components/utils/conditional-render";
import { ErrorBoundaryWithSuspense } from "@/components/utils/error-boundary";
import InfoArea from "@/components/utils/info-area";
import { ButtonLink } from "@/components/utils/link";
import { ArrowUpRight, Edit, Heart, LoaderCircle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownView from "src/components/markdown/view";
import { marketwiseLink } from "src/lib/scout";
import { getSession } from "~/auth/server";

import { decodeHTMLEntities } from "src/utils/string";
import { getProductBySlug, getSimilarProducts } from "./actions";
import MoreFromCreator from "./more-from-creator";
import { ProductCard } from "./product-card";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  return {
    title: `${product.name}`,
    description: product.description.substring(0, 160) + "...",
    openGraph: {
      type: "website",
      title: `${product.name}`,
      description: product.description.substring(0, 160) + "...",
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/marketplace/products/${product.slug}`,
      images: [{ url: product.preview_url, alt: product.name }],
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const session = (await getSession()) as Session | null;
  const isAuthenticated = !!session?.user;

  const product = await getProductBySlug(params.slug);
  if (!product) {
    return notFound();
  }
  console.log("Product:", product);
  const isCreator = isAuthenticated && session?.user.id.toString() === product.creator?._id?.toString();
  const similarProducts = await getSimilarProducts(params.slug);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Content */}
        <main className="lg:col-span-8">
          {/* Product Header */}
          <section className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {decodeHTMLEntities(product.name)}
            </h1>

            {/* Product Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50 shadow-sm">
              <Image
                src={product.preview_url}
                fill
                alt={decodeHTMLEntities(product.name)}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              <Badge
                variant="default"
                className="absolute top-4 right-4 py-1.5 px-3 text-sm"
              >
                {product.price === 0 ? "Free" : `$${product.price}`}
              </Badge>
            </div>

            {/* Creator Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col whitespace-nowrap">
                <div className="text-sm text-muted-foreground">
                  By{" "}
                  <span
                    // href={`/profile/${product.creator.username}`}
                    className="text-primary hover:underline font-semibold cursor-pointer"
                    aria-disabled={true}
                  >
                    {product.creator.name}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Published on {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 ">
                {product.tags
                  .filter((tag) => tag.trim() !== "")
                  .map((tag, index) => (
                    <Button
                      key={index}
                      size="xs"
                      variant="outline"
                      asChild>

                      <Link
                        key={index}
                        href={`/marketplace/explore?tags=${tag}`}
                      >
                        #{tag}
                      </Link>
                    </Button>
                  ))}
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="flex flex-wrap items-center gap-3 my-6">
            <Button
              variant="outline"
              size="lg"
              className="px-4 py-2 rounded-full"
            >
              <Heart className="w-5 h-5 mr-2" />
              Favorite
            </Button>

            <ButtonLink
              size="lg"
              className="flex-1 min-w-[200px] rounded-full"

              href={marketwiseLink(product.url,"/marketplace")}
              target="_blank"
              rel="noopener noreferrer"
              variant="gradient_purple"
              transition="damped"
            >
              Get it now
              <ArrowUpRight />
            </ButtonLink>

            {isAuthenticated && isCreator && (
              <Button
                variant="dark"
                size="lg"
                asChild
                className="ml-auto rounded-full"
              >
                <Link href={`/dashboard/products/${product.slug}/edit`} target="_blank">
                  <span className="sr-only">Edit Product</span>
                  <Edit className="w-5 h-5 mr-2" />
                  Edit
                </Link>
              </Button>
            )}
          </section>

          {/* Description */}
          <section className="bg-card rounded-xl p-4 sm:p-6 mb-8 border shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <MarkdownView
              className="prose dark:prose-invert max-w-full"
              // options={defaultOptions}
            >
              {product.description}
            </MarkdownView>
          </section>

          {/* More from Creator */}
          <section id="more-from-creator" className="mb-10">
            <h2 className="text-2xl font-bold mb-6">More from this creator</h2>
            <MoreFromCreator slug={product.slug} />
          </section>
        </main>

        {/* Similar Products Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>

            <ErrorBoundaryWithSuspense
              loadingFallback={
                <div className="flex justify-center py-8">
                  <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
                </div>
              }
              fallback={
                <InfoArea
                  title="Failed to load"
                  description="Couldn't load similar products"
                  className="my-0"
                />
              }
            >
              <ConditionalRender condition={similarProducts.length === 0}>
                <InfoArea
                  title="No similar products"
                  description="We couldn't find similar products for this item"
                  className="my-0"
                />
              </ConditionalRender>

              <ConditionalRender condition={similarProducts.length > 0}>
                <div className="grid grid-cols-1 gap-4">
                  {similarProducts.map((product) => (
                    <ProductCard
                      product={product}
                      key={product.slug}
                      className="border border-border/50 rounded-xl overflow-hidden shadow-sm"
                    />
                  ))}
                </div>
              </ConditionalRender>
            </ErrorBoundaryWithSuspense>
          </div>
        </aside>
      </div>
    </div>
  );
}