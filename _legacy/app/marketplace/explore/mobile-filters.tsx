// src/components/marketplace/mobile-filters.tsx
import { ParamsFilter } from "@/components/extended/params-filter";
import { CATEGORIES } from "data/marketplace";
import { TagMeta } from "./types";

interface MobileFiltersProps {
    category: string;
    price: string;
    initialTags: string;
    tags: TagMeta[];
}

export function MobileFilters({
    category,
    price,
    initialTags,
    tags,
}: MobileFiltersProps) {
    return (
        <div className="space-y-8 py-4">
            <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ParamsFilter
                    keyName="category"
                    initialValue={category}
                    options={CATEGORIES as unknown as string[]} // Assumes string[]
                    title="Category"
                />
            </div>
            <div className="h-px bg-border/50" />
            <div>
                <h3 className="text-lg font-semibold mb-4">Price</h3>
                <ParamsFilter
                    keyName="price"
                    initialValue={price}
                    options={["free", "paid", "under-$20"]}
                    title="Price"
                />
            </div>
            <div className="h-px bg-border/50" />
            <div>
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <ParamsFilter
                    keyName="tags"
                    initialValue={initialTags}
                    options={tags.map((t) => t.tag) as unknown as string[]}
                    title="Tags"
                    allowMultiple
                />
            </div>
        </div>
    );
}