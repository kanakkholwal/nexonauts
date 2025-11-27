"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useUrlState } from "@/hooks/use-url-state";
import { SlidersHorizontal } from "lucide-react";
import React from "react";

export function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [_, setQuery] = useUrlState("query", initialQuery);

  return (
    <input
      type="text"
      name="query"
      placeholder="Search assets..."
      className="w-full bg-transparent border-none outline-none text-sm h-10 px-10 text-foreground placeholder:text-muted-foreground/60"
      defaultValue={initialQuery}
      autoComplete="off"
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}

export function FiltersWrapper({ content }: { content: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] border-l border-border/50">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-xl">Refine Results</SheetTitle>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full aspect-[4/3] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-5 rounded-md" />
        <Skeleton className="w-1/3 h-4 rounded-md" />
      </div>
    </div>
  );
}