"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUrlState } from "@/hooks/use-url-state";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "data/marketplace";
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
              " bg-card shadow-slate-200 dark:shadow-slate-800/20",
              selectedCategory === item.label
                ? "border-primary"
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

export function SearchBar({initialQuery}: {initialQuery: string}) {
  const [query, setQuery] = useUrlState("query", initialQuery);

  return (
      <Input
        type="text"
        name="query"
        id="query"
        variant="fluid"
        placeholder="Search for products"
        className="w-full pl-12 pr-4 py-2 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/20 shadow border border-border"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
  );

}

export function FiltersCategory({
  initialCategory,
  className,
}: {
  initialCategory: string;
  className?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useUrlState(
    "category",
    initialCategory
  );

  return (
    <RadioGroup
      defaultValue={selectedCategory}
      className={cn("flex flex-col gap-2", className)}
      onValueChange={(value) => setSelectedCategory(value)}
    >
      {CATEGORIES.map((category, i) => {
        return (
          <div key={i} className="items-top flex space-x-2">
            <RadioGroupItem id={category} value={category} />
            <Label htmlFor={category} className="mb-0">
              {category}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}

export function FiltersTags({
  defaultTags,
  initialTags,
  className,
}: {
  defaultTags: { tag: string; count: number }[];
  initialTags?: string;
  className?: string;
}) {
  const [tagsString, setTagsString] = useUrlState<string>(
    "tags",
    initialTags || ""
  );
  const tags = tagsString.split(",").filter(Boolean);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTagsString(newTags.join(","));
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTagsString(newTags.join(","));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {defaultTags.map((tag, i) => {
        return (
          <div key={i} className="items-top flex space-x-2">
            <Checkbox
              id={tag.tag}
              value={tag.tag}
              onCheckedChange={(value) => {
                value ? addTag(tag.tag) : removeTag(tag.tag);
              }}
              checked={tags.includes(tag.tag)}
            />
            <Label htmlFor={tag.tag} className="mb-0">
              {tag.tag} ({tag.count})
            </Label>
          </div>
        );
      })}
    </div>
  );
}

export function FiltersPrice({
  initialPrice,
  className,
}: {
  initialPrice: string;
  className?: string;
}) {
  const [selectedPrice, setSelectedPrice] = useUrlState("price", initialPrice);

  return (
    <RadioGroup
      defaultValue={selectedPrice}
      className={cn("flex flex-col gap-2", className)}
      onValueChange={(value) => setSelectedPrice(value)}
    >
      <div className="items-top flex space-x-2">
        <RadioGroupItem id="free" value="free" />
        <Label htmlFor="free" className="mb-0">
          Free
        </Label>
      </div>
      <div className="items-top flex space-x-2">
        <RadioGroupItem id="paid" value="paid" />
        <Label htmlFor="paid" className="mb-0">
          Paid
        </Label>
      </div>
    </RadioGroup>
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
