import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { ArrowUpRight, Edit, Heart, LoaderCircle } from "lucide-react";
=======
<<<<<<< HEAD
import { ArrowUpRight, Edit, Heart, LoaderCircle } from "lucide-react";
=======
import { ArrowUpRight, Heart, MoveLeft } from "lucide-react";
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownView, { defaultOptions } from "src/components/markdown/view";
import { getProductBySlug, getSimilarProducts } from "./actions";

<<<<<<< HEAD
import { SuspenseWithErrorBoundary } from "@/components/utils/error-boundary";
import { Metadata } from "next";
import { Fragment } from "react";
import { getSession } from "src/lib/auth";
import { sessionType } from "src/types/session";
=======
<<<<<<< HEAD
import { SuspenseWithErrorBoundary } from "@/components/utils/error-boundary";
import { Metadata } from "next";
import { Fragment } from "react";
import { getSession } from "src/lib/auth";
import { sessionType } from "src/types/session";
=======
import { Metadata } from "next";
import { Suspense } from "react";
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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

<<<<<<< HEAD
// TODO: Add a section for comments or More products by the creator

=======
<<<<<<< HEAD
// TODO: Add a section for comments or More products by the creator

=======
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
export default async function ProductPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
<<<<<<< HEAD
  const session = (await getSession()) as sessionType | null;
  const isAuthenticated = !!session?.user;

=======
<<<<<<< HEAD
  const session = (await getSession()) as sessionType | null;
  const isAuthenticated = !!session?.user;

  const product = await getProductBySlug(params.slug);
  if (!product) {
    return notFound();
  }
  const similarProducts = await getSimilarProducts(params.slug);

  return (
    <>
      <div className="w-full my-10 mx-auto flex items-start justify-center gap-6 flex-wrap px-3">
        <main className="grow-0">
          <section className="space-y-5">
            <h1 className="text-3xl 3xl:text-5xl font-bold text-left">
              {product.name}
            </h1>
            <figure className="w-full h-auto relative">
              <Image
                src={product.preview_url}
                width={1024}
                height={720}
                alt={product.name}
                className="w-full h-auto aspect-video object-cover rounded-lg border border-border shadow-sm max-w-6xl"
              />
              <Badge variant="info" className="gap-1 absolute top-4 right-4">
                {product.price === 0 ? "Free" : `$ ${product.price}`}
              </Badge>
              <figcaption className="text-sm font-semibold text-slate-500 dark:text-slate-300 p-3 bg-white dark:bg-black rounded-xl mt-2">
                By{" "}
                <span className="text-primary/70 hover:text-primary underline cursor-pointer">
                  {product.creator.name}
                </span>{" "}
                {" • "} Published on{" "}
                {new Date(product.createdAt).toLocaleDateString()}
                <p className="text-slate-500 dark:text-slate-300">
                  {product.tags.map((tag, index) => (
                    <Fragment key={index}>
                      <Link
                        key={tag}
                        href={`/marketplace?tag=${tag}`}
                        className="text-primary hover:underline mr-1"
                      >
                        #{tag}
                      </Link>
                      {/* {index < product.tags.length - 1 && " • "} */}
                    </Fragment>
                  ))}
                </p>
              </figcaption>
            </figure>
          </section>

          <section className="p-3 w-full flex justify-center items-center gap-2">
            <Button size="icon_lg" variant="destructive_light">
              <Heart className="w-6 h-6" />
            </Button>
            <Button size="lg" svgTransition="up" asChild>
=======
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return notFound();
  }
  const similarProducts = await getSimilarProducts(params.slug);

  return (
    <>
      <div className="w-full my-10 mx-auto flex items-start justify-center gap-6 flex-wrap px-3">
        <main className="grow-0">
          <section className="space-y-5">
            <h1 className="text-3xl 3xl:text-5xl font-bold text-left">
              {product.name}
            </h1>
            <figure className="w-full h-auto relative">
              <Image
                src={product.preview_url}
                width={1024}
                height={720}
                alt={product.name}
                className="w-full h-auto aspect-video object-cover rounded-lg border border-border shadow-sm max-w-6xl"
              />
              <Badge variant="info" className="gap-1 absolute top-4 right-4">
                {product.price === 0 ? "Free" : `$ ${product.price}`}
              </Badge>
<<<<<<< HEAD
              <figcaption className="text-sm font-semibold text-slate-500 dark:text-slate-300 p-3 bg-white dark:bg-black rounded-xl mt-2">
                By{" "}
                <span className="text-primary/70 hover:text-primary underline cursor-pointer">
                  {product.creator.name}
                </span>{" "}
                {" • "} Published on{" "}
                {new Date(product.createdAt).toLocaleDateString()}
                <p className="text-slate-500 dark:text-slate-300">
                  {product.tags.map((tag, index) => (
                    <Fragment key={index}>
                      <Link
                        key={tag}
                        href={`/marketplace?tag=${tag}`}
                        className="text-primary hover:underline mr-1"
                      >
                        #{tag}
                      </Link>
                      {/* {index < product.tags.length - 1 && " • "} */}
                    </Fragment>
                  ))}
                </p>
              </figcaption>
            </figure>
          </section>

          <section className="p-3 w-full flex justify-center items-center gap-2">
            <Button size="icon_lg" variant="destructive_light">
              <Heart className="w-6 h-6" />
            </Button>
            <Button size="lg" svgTransition="up" asChild>
=======
            );
          })}
        </div>
        <div className="relative w-full gap-4 flex justify-around items-start flex-col lg:flex-row max-w-7xl mx-auto p-3">
          <div className="w-full lg:w-2/3 rounded-lg border text-card-foreground shadow-sm backdrop-blur-sm bg-card dark:bg-[#30353c] dark:border-slate-700 p-6">
            <MarkdownView
              className="mt-4 prose dark:prose-invert"
              options={defaultOptions}
            >
              {product.description}
            </MarkdownView>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/3 lg:sticky lg:top-0">
            <Button
              size="lg"
              className="rounded-full uppercase tracking-wider"
              asChild
            >
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
              <Link
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
              >
<<<<<<< HEAD
                Get it now
                <ArrowUpRight />
=======
<<<<<<< HEAD
                Get it now
                <ArrowUpRight />
              </Link>
            </Button>
            {isAuthenticated &&
              session?.user._id.toString() ===
                product.creator?._id?.toString() && (
                <Button
                  size="lg"
                  variant="default_light"
                  className="ml-auto"
                  asChild
                >
                  <Link href={`/products/${product.slug}/edit`} target="_blank">
                    <Edit /> Edit Product
                  </Link>
                </Button>
              )}
          </section>
          <section className="relative w-full p-3 bg-card rounded-xl">
            <MarkdownView
              className="prose dark:prose-invert max-w-inherit"
              options={defaultOptions}
            >
              {product.description}
            </MarkdownView>
          </section>
        </main>
        <aside className="lg:max-w-sm w-full flex-1">
          <h3 className="text-2xl 3xl:text-4xl font-bold mb-4 text-left ml-4">
            Similar Products
          </h3>
          <div className="grid gap-4 grid-cols-1">
            <SuspenseWithErrorBoundary
              fallback={
                <div className="flex justify-center py-5 px-3">
                  <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
                </div>
              }
              errorFallback={<p>Failed to load similar products</p>}
            >
              {similarProducts.map((product) => {
                return (
                  <div key={product.slug} className="rounded-lg bg-card p-4">
                    <Link href={`/marketplace/products/${product.slug}`}>
                      <figure className="w-full h-auto relative">
                        <Image
                          src={product.preview_url}
                          width={968}
                          height={580}
                          alt={product.name}
                          className="w-full h-auto aspect-video object-cover rounded-lg"
                        />
                        <Badge
                          variant="info"
                          className="gap-1 absolute top-4 right-4"
                        >
                          {product.price === 0 ? "Free" : `$ ${product.price}`}
                        </Badge>
                        <figcaption className="text-lg text-center mt-2 font-semibold">
                          {product.name}
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                );
              })}
            </SuspenseWithErrorBoundary>
          </div>
        </aside>
=======
                Get it Now
                <ArrowUpRight className="w-6 h-6 ml-2" />
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
              </Link>
            </Button>
            {isAuthenticated &&
              session?.user._id.toString() ===
                product.creator?._id?.toString() && (
                <Button
                  size="lg"
                  variant="default_light"
                  className="ml-auto"
                  asChild
                >
                  <Link href={`/products/${product.slug}/edit`} target="_blank">
                    <Edit /> Edit Product
                  </Link>
                </Button>
              )}
          </section>
          <section className="relative w-full p-3 bg-card rounded-xl">
            <MarkdownView
              className="prose dark:prose-invert max-w-inherit"
              options={defaultOptions}
            >
              {product.description}
            </MarkdownView>
          </section>
        </main>
        <aside className="lg:max-w-sm w-full flex-1">
          <h3 className="text-2xl 3xl:text-4xl font-bold mb-4 text-left ml-4">
            Similar Products
          </h3>
          <div className="grid gap-4 grid-cols-1">
            <SuspenseWithErrorBoundary
              fallback={
                <div className="flex justify-center py-5 px-3">
                  <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
                </div>
              }
              errorFallback={<p>Failed to load similar products</p>}
            >
              {similarProducts.map((product) => {
                return (
                  <div key={product.slug} className="rounded-lg bg-card p-4">
                    <Link href={`/marketplace/products/${product.slug}`}>
                      <figure className="w-full h-auto relative">
                        <Image
                          src={product.preview_url}
                          width={968}
                          height={580}
                          alt={product.name}
                          className="w-full h-auto aspect-video object-cover rounded-lg"
                        />
                        <Badge
                          variant="info"
                          className="gap-1 absolute top-4 right-4"
                        >
                          {product.price === 0 ? "Free" : `$ ${product.price}`}
                        </Badge>
                        <figcaption className="text-lg text-center mt-2 font-semibold">
                          {product.name}
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                );
              })}
<<<<<<< HEAD
            </SuspenseWithErrorBoundary>
          </div>
        </aside>
=======
            </div>
          </Suspense>
        </div>
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
      </div>
    </>
  );
}
