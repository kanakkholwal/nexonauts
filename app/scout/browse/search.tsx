"use client";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export function FilterButton({
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
    <Badge
      size="sm"
      variant={active ? "default_light" : "glass"}
      onClick={() => {
        // console.log("Filtering by", filterKey, filterValue)
        handleFilter(filterValue);
      }}
      {...props}
    >
      {children}
      {active && filterKey !== "all" && (
        <span
          className="cursor-pointer border-l border-border inline-flex justify-center items-center rounded-full pl-2"
          role="reset"
          aria-label="Remove filter"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            removeFilter();
          }}
        >
          <X className="h-4 w-4" />
        </span>
      )}
    </Badge>
  );
}
export function SearchBar({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams() as URLSearchParams;

  const router = useRouter();
  const [query, setQuery] = React.useState(
    searchParams.get("query")?.toString()!
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
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
        <React.Suspense
          key={"search_key"}
          fallback={
            <Input
              placeholder="Search for a AI, tools, services, and resources"
              className="w-full pl-12 pr-4 py-2 h-14 rounded-xl bg-glasss"
            />
          }
        >
          <Input
            type="text"
            name="query"
            id="query"
            value={query}
             
            placeholder="Search for a AI, tools, services, and resources"
            className="w-full pl-12 pr-4 py-2 h-14 rounded-xl bg-slate-50/15 dark:bg-slate-800/15 shadow-sm border border-border"
            defaultValue={searchParams.get("query")?.toString()?.trim()!}
            onChange={(e) => {
              if (e.target.value.trim() === "") return;
              setQuery(e.target.value.trim());
              handleSearch(e.target.value.trim());
            }}
            required={true}
          />
          <Button
            size="icon"
            variant="outline"
            className="rounded-full absolute z-20 top-1/2 right-2 transform -translate-y-1/2 border-none bg-transparent dark:bg-transparent  focus:outline-hidden"
            onClick={() => {
              setQuery("");
              handleSearch("");
            }}
          >
            {query?.trim() !== "" ? (
              loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )
            ) : null}
          </Button>
        </React.Suspense>
      </div>
    </div>
  );
}
