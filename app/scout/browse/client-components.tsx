"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Check,
  Columns,
  Filter,
  Grid,
  List,
  Loader2, // For masonry icon
  Search,
  X
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

// --- TYPES ---
interface FilterProps {
  categories: { name: string; slug: string }[];
  pricing_types: string[];
  currentFilter: { category: string; pricing_type: string };
}

// --- SIDEBAR COMPONENT (Desktop) ---
export function FilterSidebar({ categories, pricing_types, currentFilter }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1"); // Reset pagination
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 pl-1">
          Pricing
        </h3>
        <div className="space-y-1">
          <FilterOption
            label="All Prices"
            active={currentFilter.pricing_type === "all"}
            onClick={() => updateFilter("pricing_type", "all")}
          />
          {pricing_types.map((type) => (
            <FilterOption
              key={type}
              label={type.replace("_", " ")}
              active={currentFilter.pricing_type === type}
              onClick={() => updateFilter("pricing_type", type)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 pl-1">
          Categories
        </h3>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin no-scrollbar">
          <FilterOption
            label="All Categories"
            active={currentFilter.category === "all"}
            onClick={() => updateFilter("category", "all")}
          />
          {categories.map((cat) => (
            <FilterOption
              key={cat.slug}
              label={cat.name}
              active={currentFilter.category === cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MOBILE FILTER SHEET ---
export function MobileFilterSheet(props: FilterProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Filter className="w-3.5 h-3.5" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle>Filter Tools</SheetTitle>
        </SheetHeader>
        <FilterSidebar {...props} />
      </SheetContent>
    </Sheet>
  );
}

// --- HELPER: Filter Option Row ---
function FilterOption({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <span className="capitalize">{label}</span>
      {active && <Check className="w-3.5 h-3.5" />}
    </button>
  );
}

// --- VIEW TOGGLE ---
export function ViewToggle() {
  const [currentView, setCurrentView] = useQueryState("view", { defaultValue: "grid" });

  return (
    <div className="flex items-center p-1 bg-muted/50 rounded-lg border border-border/50">
      <ToggleBtn active={currentView === "grid"} onClick={() => setCurrentView("grid")} icon={Grid} />
      <ToggleBtn active={currentView === "list"} onClick={() => setCurrentView("list")} icon={List} />
      <ToggleBtn active={currentView === "masonry"} onClick={() => setCurrentView("masonry")} icon={Columns} />
    </div>
  );
}

export function ViewWrapper({ children }: { children: React.ReactNode }) {
  const [view] = useQueryState("view", { defaultValue: "grid" });
  return <div className={cn(viewTypeToClassName(view))}>{children}</div>;

}

function viewTypeToClassName(viewType: string) {
  switch (viewType) {
    case "list": return "grid grid-cols-1 lg:grid-cols-2 gap-4";
    case "masonry": return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6";
    case "grid":
    default: return "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 5xl:grid-cols-4 gap-6";
  }
}

function ToggleBtn({ active, onClick, icon: Icon }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-1.5 rounded-md transition-all",
        active ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

// --- SEARCH BAR ---
export function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = useDebouncedCallback((term: string) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (term) params.set("query", term);
    else params.delete("query");

    router.push(`?${params.toString()}`);
    setLoading(false);
  }, 300);

  return (
    <div className="relative w-full group ">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
        <Search className="w-4 h-4" />
      </div>
      <Input
        value={query}
        placeholder="Search tools & resources..."
        className="pl-9 pr-8 h-9 bg-transparent border-none shadow-none focus-visible:ring-0 text-sm"
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      {query && (
        <button
          onClick={() => { setQuery(""); handleSearch(""); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
        </button>
      )}
    </div>
  );
}