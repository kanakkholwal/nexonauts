import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { BiSliderAlt } from 'react-icons/bi';

//  types 
import { MemberShipType } from 'src/types/app';
const MEMBERSHIP_TYPES: MemberShipType[] = [
    "free", "pro", "premium", "enterprise"
]

export type filterType = {
    categories: string[],
    membership: string[],
    popularity: string,
}
type SearchFilterProps = {
    categories: string[],
    filter: filterType,
    setFilter: (filter: filterType) => void,
    handleFilters: () => void,
}

export default function SearchFilter({ categories, filter, setFilter,handleFilters }: SearchFilterProps) {

    const [open, setOpen] = useState(false)

    return (<Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button variant="slate">
                <BiSliderAlt className='text-accent-foreground w-5 h-5' />
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader className="mb-5">
                <SheetTitle>
                    Filter Apps
                </SheetTitle>
                <SheetDescription>
                    Filter apps by category, pricing, and more.
                </SheetDescription>
            </SheetHeader>
            <div className="mb-4">
                <p className="text-sm font-semibold text-slate-600 mb-2">By Membership</p>
                <div className="flex flex-wrap gap-2">
                    {MEMBERSHIP_TYPES.map((membership) => (
                        <Button
                            key={membership}
                            variant="slate"
                            size="sm"
                            className={"text-xs !h-8 capitalize " + (filter.membership.includes(membership)  ? "bg-accent-foreground hover:bg-accent-foreground/90 text-white" : "")}
                            onClick={() => {
                                if(filter.membership.includes(membership)){
                                    setFilter({ ...filter, membership: filter.membership.filter((item) => item !== membership) })
                                } else {
                                    setFilter({ ...filter, membership: [...filter.membership,membership] })
                                }

                            }}
                        >
                            {membership}
                        </Button>
                    ))}
                </div>

            </div>
            <div className="mb-4">
                <p className="text-sm font-semibold text-slate-600 mb-2">
                    By Categories
                </p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="slate"
                        size="sm"
                        className={"text-xs !h-8 " + (filter.categories.length === 0 ? "bg-accent-foreground hover:bg-accent-foreground/90 text-white" : "")}
                        onClick={() =>{
                            setFilter({...filter, categories: []})
                        
                        }}
                    >
                        All
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant="slate"
                            size="sm"
                            className={"text-xs !h-8 capitalize " + (filter.categories.includes(category) ? "bg-accent-foreground hover:bg-accent-foreground/90 text-white" : "")}
                            onClick={() =>{
                                if(filter.categories.includes(category)){
                                    setFilter({...filter, categories: filter.categories.filter((item) => item !== category)})
                                }else{
                                    setFilter({...filter, categories: [...filter.categories, category]})
                                }
                            
                            }}
                        >
                            {category.split("_").join(" ")}
                        </Button>
                    ))}
                </div>

            </div>
            <div className="mb-4">
                <p className="text-sm font-semibold text-slate-600 mb-2">

                    By Popularity
                </p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="slate"
                        size="sm"
                        className={"text-xs !h-8 " + (filter.popularity === "new" ? "bg-accent-foreground hover:bg-accent-foreground/90 text-white" : "")}
                        onClick={() =>{
                            setFilter({...filter, popularity: "new"})
                        }}
                    >
                        Newly Added
                    </Button>
                    <Button
                        variant="slate"
                        size="sm"
                        className={"text-xs !h-8 " + (filter.popularity === "popular" ? "bg-accent-foreground hover:bg-accent-foreground/90 text-white" : "")}
                        onClick={() =>{
                            setFilter({...filter, popularity: "popular"})
                        }}
                    >
                        Most Popular
                    </Button>
                </div>

            </div>

            <div className="mt-auto flex flex-col  gap-2 w-full ">
                <Button onClick={() =>{
                    handleFilters();
                    setOpen(false);

                }}>
                    Apply Filters
                </Button>
                <Button
                    variant="secondary"
                    onClick={() =>{
                        setFilter({categories: [], membership:[], popularity: ""})
                        handleFilters();
                        setOpen(false);
                    }}
                >
                    Clear Filters
                </Button>

            </div>

        </SheetContent>
    </Sheet>
    )
}