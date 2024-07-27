"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useUrlState } from "@/hooks/use-url-state";
import { cn } from "@/lib/utils";
import { itemTypes } from "data/marketplace/constants";
import { Settings2 } from "lucide-react";
import React from "react";

export function CategoryBoxes({
  initialCategory,
}: {
  initialCategory: string;
}) {
  const [selectedCategory, setSelectedCategory] = useUrlState(
    "category",
    initialCategory
  );

  return (
    <RadioGroup
      defaultValue={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value)}
      className="w-full mx-auto grid justify-items-center items-stretch px-3 gap-4 grid-cols-1 @4xl/main:grid-cols-4 @2xl/main:grid-cols-3 @sm/main:grid-cols-2"
    >
      {itemTypes.map((item, i) => {
        return (
          <label
            key={i}
            htmlFor={item.label}
            className={cn(
              "flex items-center justify-center gap-3 p-3 rounded-xl transition-all duration-200 shadow-md border w-full aspect-[10/4]",
              "bg-glasss",
              selectedCategory === item.label
                ? "!border-primary"
                : "border-transparent"
            )}
          >
            <div>
              <item.icon className="w-12 h-12  text-violet-600" />
            </div>
            <div>
              <h6 className="text-lg font-semibold">{item.label}</h6>
              <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
                Trending in {item.label}
              </p>
            </div>
            <RadioGroupItem
              id={item.label}
              value={item.label}
              className="sr-only"
            />
          </label>
        );
      })}
    </RadioGroup>
  );
}

export function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [_, setQuery] = useUrlState("query", initialQuery);

  return (
    <Input
      type="search"
      name="query"
      id="query"
      variant="fluid"
      placeholder="Search for products"
      className="w-full pl-12 pr-4 py-2 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/20 shadow border border-border"
      // value={query}
      // onChange={(e) => {
      //   setQuery(e.target.value);
      // }}
      defaultValue={initialQuery}
      onInput={(e) => {
        setQuery(e.currentTarget.value);
      }}
    />
  );
}

export function FiltersWrapper({ content }: { content: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon_lg" variant="ghost" className="lg:hidden">
          <Settings2 />
        </Button>
      </SheetTrigger>
      <SheetContent>{content}</SheetContent>
    </Sheet>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl p-3">
      <Skeleton className="w-full h-48 aspect-video object-cover rounded-lg" />
      <div className="flex items-start justify-between flex-nowrap gap-3 mt-2">
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/4 h-6" />
      </div>
      <div className="flex items-start justify-between flex-nowrap gap-3">
        <Skeleton className="w-1/4 h-6" />
      </div>
    </div>
  );
}
