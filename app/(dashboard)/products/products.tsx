"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Import, LoaderCircle } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

type ImportsProps = {
    product: any,
    importProduct: () => Promise<any>
}

export function ImportedProductCard({ product,importProduct }: ImportsProps) {
    const [importing, setImporting] = React.useState(false);

    return (<div className="p-4 flex justify-between items-center flex-col gap-2">
        <Image src={product.preview_url} width={540} height={320} alt={product.name} className="w-full h-auto aspect-video rounded-lg" />
        <h4 className="text-base font-semibold">{product.name}</h4>

        <div className="flex w-full items-center gap-2">
            <Button variant="outline" size="sm" className="w-full"
                onClick={() => {
                    setImporting(true);
                    importProduct()
                        .then(() => {
                            toast.success("Product imported successfully");
                        })
                        .catch((error) => {
                            toast.error("Failed to import product");
                        }).finally(() => {
                            setImporting(false);
                        })
                }} disabled={importing}>
                    {importing ? <LoaderCircle className="animate-spin" />:<Import />}
                    {importing ? "Importing..." : "Import"}
            </Button>
            <Button variant="link" size="sm" className="flex-1" asChild>
                <Link href={product.url} target="_blank">
                    Check It Out <ArrowUpRight />
                </Link>
            </Button>
        </div>
    </div>)
}