"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ExternalLink, ListFilter, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { rawProductThirdParty } from "src/models/product";

// --- IMPORT CARD ---
type ImportsProps = {
  product: rawProductThirdParty;
  importProduct: () => Promise<any>;
};

export function ImportedProductCard({ product, importProduct }: ImportsProps) {
  const [loading, setLoading] = useState(false);
  const [imported, setImported] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    try {
      await importProduct();
      toast.success("Imported successfully");
      setImported(true);
    } catch (error) {
      toast.error("Import failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-3 p-3 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-colors w-full overflow-hidden">

      {/* Thumbnail - Fixed width, prevented from shrinking */}
      <div className="relative w-16 h-12 shrink-0 bg-muted rounded-md overflow-hidden border border-border/50">
        <Image
          src={product.preview_url}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content - flex-1 with min-w-0 forces truncation inside flex parent */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
        <h4 className="text-sm font-medium truncate" title={product.name}>
          {product.name}
        </h4>
        <Link
          href={product.url}
          target="_blank"
          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 w-fit"
        >
          View Source <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Button - shrink-0 ensures it never gets pushed out or squashed */}
      <div className="shrink-0 flex items-center ml-2">
        {imported ? (
          <Button size="icon" variant="ghost" disabled className="h-8 w-8 text-emerald-500">
            <Check className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            disabled={loading}
            onClick={handleImport}
            className="h-8 px-3 text-xs"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Import"}
          </Button>
        )}
      </div>
    </div>
  );
}

// --- FILTER & SORT ---
const SORT_OPTIONS = [
  { label: "Newest First", value: "latest" },
  { label: "Oldest First", value: "oldest" },
];

const FILTER_OPTIONS = [
  { label: "All Sources", value: "all" },
  { label: "Gumroad", value: "gumroad" },
];

export function FilterAndSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const sort = searchParams.get("sort") || "latest";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-9">
          <ListFilter className="w-4 h-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={sort === option.value}
            onCheckedChange={() => updateParam("sort", option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Source</DropdownMenuLabel>
        {FILTER_OPTIONS.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={filter === option.value}
            onCheckedChange={() => updateParam("filter", option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}