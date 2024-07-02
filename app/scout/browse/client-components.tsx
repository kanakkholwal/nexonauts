"use client";
import { ResponsiveDialog } from "@/components/extended/responsive-dialog";

import { BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chips";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Grid,
  List,
  Loader2,
  LayoutDashboard as Masonry,
  Search,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function FilterBar({ categories, pricing_types, filter, ...props }) {
  const searchParams = useSearchParams() as URLSearchParams;
  const router = useRouter();
  const [viewType, setViewType] = useState<"grid" | "list" | "masonry">(
    props?.viewType || "masonry"
  );

  const handleViewChange = () => {
    setViewType((prev) => {
      if (prev === "grid") return "list";
      if (prev === "list") return "masonry";
      return "grid";
    });
    const params = new URLSearchParams(searchParams);
    params.set("view", viewType);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-end items-center gap-2">
      <ResponsiveDialog
        title="Filter Tools"
        description="Filter Tools by category, pricing, and more."
        btnProps={{
          variant: "default_light",
          size: "sm",
          children: <>Filter</>,
        }}
      >
        <div className="w-full flex flex-col space-y-2 text-center sm:text-left mb-5">
          <div className="mb-4">
            <p className="text-base font-semibold text-muted-foreground mb-4">
              By Categories
            </p>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={filter.category === "all"}
                filterKey="category"
                filterValue="all"
              >
                All
              </FilterButton>
              {categories.map((category) => (
                <FilterButton
                  key={category.slug}
                  // className="cursor-pointer"
                  filterKey="category"
                  filterValue={category.slug}
                  active={filter.category === category.slug}
                >
                  {category.name.split("_").join(" ")}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-base font-semibold text-slate-600 mb-4">
            By Pricing
          </p>
          <div className="flex flex-wrap gap-2">
            {pricing_types.map((pricing_type) => (
              <FilterButton
                key={pricing_type}
                size="sm"
                filterKey="pricing_type"
                filterValue={pricing_type}
                active={filter?.pricing_type === pricing_type}
              >
                {pricing_type.split("_").join(" ")}
              </FilterButton>
            ))}
          </div>
        </div>
      </ResponsiveDialog>
      <Button
        variant="outline"
        size="sm"
        transition="damped"
        onClick={handleViewChange}
      >
        {viewType === "grid" && <Grid />}
        {viewType === "list" && <List />}
        {viewType === "masonry" && <Masonry />}
      </Button>
    </div>
  );
}
function FilterButton({
  filterKey,
  filterValue,
  active,
  children,
  ...props
}: {
  filterKey: string;
  filterValue: string;
  active?: boolean;
  children: React.ReactNode;
} & BadgeProps) {
  const searchParams = useSearchParams() as URLSearchParams;

  const router = useRouter();

  const handleFilter = (filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (filterValue) {
      params.set(filterKey, filterValue);
    } else {
      params.delete(filterKey);
    }
    router.push(`?${params.toString()}`);
  };
  const removeFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(filterKey);
    router.push(`?${params.toString()}`);
  };
  return (
    <Chip
      size="sm"
      variant="ghost"
      className={
        active
          ? "border-primary text-primary bg-primary/5 cursor-pointer"
          : "cursor-pointer"
      }
      onClick={() => {
        handleFilter(filterValue);
      }}
      onRemove={removeFilter}
      {...props}
    >
      {children}
    </Chip>
  );
}
export function SearchBar({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams() as URLSearchParams;
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const handleSearch = useDebouncedCallback((term: string) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.push(`?${params.toString()}`);
    setLoading(false);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(value);
    if (value) {
      handleSearch(value);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    handleSearch("");
  };

  return (
    <div
      className={cn(
        "flex w-full gap-4 items-center justify-start mx-auto mt-0",
        className
      )}
      id="search"
      {...props}
    >
      <div className="relative w-full">
        <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5" />
        <Input
          type="text"
          name="query"
          id="query"
          value={query}
          variant="fluid"
          placeholder="Search for a AI, tools, services, and resources"
          className="w-full pl-12 pr-4 py-2 h-14 rounded-xl bg-slate-50/15 dark:bg-slate-800/15 shadow border border-border"
          onChange={handleInputChange}
          required
        />
        <Button
          size="icon"
          variant="outline"
          className="rounded-full absolute z-20 top-1/2 right-2 transform -translate-y-1/2 border-none bg-transparent dark:bg-transparent focus:outline-none"
          onClick={handleClearSearch}
        >
          {query ? (
            loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )
          ) : null}
        </Button>
      </div>
    </div>
  );
}
