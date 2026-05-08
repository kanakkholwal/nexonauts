import { GoBackButton } from "@/components/extended/go-back";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import notFound from "./not-found.png";

export const metadata: Metadata = {
  title: "No Product Found | Marketplace | Nexonauts",
  description: "The product you are looking for does not exist.",
};

export default async function NotFound() {
  return (
    <div className="w-full my-10 mx-auto flex items-start justify-center gap-6 px-3 flex-col lg:flex-row max-w-[1440px]">
      <main className="w-full">
        <section className="flex items-center justify-center w-full gap-20">
          <div className="space-y-5">
            <h1 className="text-4xl font-bold">Sorry, No Product Found!</h1>
            <p className="text-lg text-center font-medium text-muted-foreground">
              The product you are looking for does not exist.
            </p>
            <div className="flex gap-3 justify-start pt-8">
              <GoBackButton />
              <Button rounded="full" asChild>
                <Link href="/marketplace/explore">
                  <Globe />
                  Browse Marketplace
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src={notFound}
            alt="Not Found"
            width={720}
            height={720}
            className="max-w-[600px] w-full"
          />
        </section>
      </main>
    </div>
  );
}
