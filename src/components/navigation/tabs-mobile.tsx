"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
interface Props {
  categories: readonly string[];
  key?: string;
}

export default function CatgeoryNavigationMobile({
  categories,
  key = "category",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;
  const [isOpen, setIsOpen] = useState(false);

  // Extract category from the URL query
  const activeCategory = searchParams.get(key) || "";

  const handleCategoryChange = (category: string) => {
    setIsOpen(false);
    router.push(`?${key}=${category}`, { scroll: false });
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0  p-4 flex justify-center gap-x-2 gap-y-2 sm:hidden z-50",
        " bg-white/30 dark:bg-slate-100/5 border-border dark:border-slate-100/10 backdrop-blur-xl border-opacity-15 shadow"
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="text-sm items-center w-full justify-between"
          >
            {activeCategory === "" ? "All" : activeCategory}
            <span>
              <GoPlus />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full max-w-[24rem]">
          <DropdownMenuRadioGroup
            value={activeCategory}
            onValueChange={handleCategoryChange}
          >
            {categories.map((item: string) => {
              return (
                <DropdownMenuRadioItem key={item} value={item}>
                  {item}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
