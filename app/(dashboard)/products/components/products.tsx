"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Import, ListFilter, LoaderCircle } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";


type ImportsProps = {
    product: any,
    importProduct: () => Promise<any>
}

export function ImportedProductCard({ product, importProduct }: ImportsProps) {
    const [importing, setImporting] = React.useState(false);

    return (<div className="p-4 flex justify-between items-center flex-col gap-2">
        <Image src={product.preview_url} width={540} height={320} alt={product.name} className="w-full h-auto aspect-video rounded-lg" />
        <h4 className="text-base font-semibold">{product.name}</h4>

        <div className="flex w-full items-center gap-2">
            <Button variant="default_light" size="sm" className="w-full"
                onClick={() => {
                    setImporting(true);
                    importProduct()
                        .then(() => {
                            toast.success("Product imported successfully");
                        })
                        .catch((error) => {
                            console.error(error)
                            toast.error("Failed to import product");
                        }).finally(() => {
                            setImporting(false);
                        })
                }} disabled={importing}>
                {importing ? <LoaderCircle className="animate-spin" /> : <Import />}
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
const SORT_AND_FILTER_OPTIONS = {
    sort: ["latest", "oldest"],
    filter: ["all", "gumroad"]
}

export function FilterAndSort() {
    
    const router = useRouter();
    const searchParams = useSearchParams() as URLSearchParams;
    const filter = searchParams.get("filter") || "all";
    const sort = searchParams.get("sort") || "latest";

    const handleFilterChange = (filter: string) => {
        const _searchParams = new URLSearchParams(searchParams);
        _searchParams.set("filter", filter);
        router.push(`?${_searchParams.toString()}`);
    }
    const handleSortChange = (sort: string) => {
        const _searchParams = new URLSearchParams(searchParams);
        _searchParams.set("sort", sort);
        router.push(`?${_searchParams.toString()}`);
    }

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <ListFilter />
                    Filter & Sort
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {Object.entries(SORT_AND_FILTER_OPTIONS).map(([key, options]) => {
                    return (<React.Fragment key={key}>
                        <DropdownMenuLabel key={key}>{key.replace(/^\w/, (c) => c.toUpperCase())}</DropdownMenuLabel>
                        {options.map((option) => {
                            const isSelected = key === "sort" ? sort === option : filter === option;
                            return <DropdownMenuCheckboxItem key={option} checked={isSelected} 
                            onCheckedChange={() => key === "sort" ? handleSortChange(option) : handleFilterChange(option)}
                            >{option.replace(/^\w/, (c) => c.toUpperCase())}</DropdownMenuCheckboxItem>
                        })}
                    </React.Fragment>)
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}
