"use client";

// Note: This component is used to filter resources by category
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoPlus } from "react-icons/go";

interface Props {
    categories: readonly string[];
    key?: string;
}


export default function CatgeoryNavigationMobile({ categories, key = "category" }: Props) {
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
        <div className="fixed bottom-0 left-0 right-0  border-border dark:border-slate-100/10 backdrop-blur border-opacity-15 shadow p-4 flex justify-center gap-x-2 gap-y-2 sm:hidden z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`py-4 px-4 flex gap-x-1 font-bold border bg-white dark:bg-black/70 border-dim-gray rounded-md hover:border-text transition-all text-sm items-center w-full justify-between ${activeCategory === "" ? " text-accent" : ""
                    }`}
            >
                {activeCategory === "" ? "All" : activeCategory}
                <span>
                    <GoPlus />
                </span>
            </button>
            {isOpen && (
                <div className="absolute bottom-16 left-0 right-0 border
                border-border dark:border-slate-100/10 backdrop-blur-xl border-opacity-15 shadow bg-slate-200/80 dark:bg-slate-800/40 p-4 m-4 flex rounded-md flex-col gap-y-2 ">
                    <button
                        onClick={() => handleCategoryChange("")}
                        className={`py-4 px-4 flex gap-x-1 font-medium rounded border border-transparent hover:border-dim-gray transition-all text-sm ${activeCategory === "" ? "bg-accent text-bg" : " bg-bg text-accent"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((item: string) => {
                        return (
                            <button
                                key={item}
                                onClick={() => handleCategoryChange(item)}
                                className={`py-4 px-4 flex gap-x-1 font-medium  rounded border border-transparent hover:border-dim-gray transition-all text-sm relative 
                                ${activeCategory === item
                                        ? "text-bg bg-accent"
                                        : " bg-none text-slate-300"
                                    }`}
                            >
                                <span className="text-sm">{item}</span>

                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}