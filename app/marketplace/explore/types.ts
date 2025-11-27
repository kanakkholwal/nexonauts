import { ProductType } from "src/models/product";

export type Product = ProductType;
export interface TagMeta {
    tag: string;
    count: number;
}

export interface SearchParams {
    category?: string;
    tags?: string;
    price?: string;
    query?: string;
    [key: string]: string | string[] | undefined; // Next.js requirement
}

// Inside @/components/extended/params-filter.tsx
export interface ParamsFilterProps {
    keyName: string;
    initialValue: string;
    options: string[];
    title: string;
    allowMultiple?: boolean;
    variant?: "default" | "minimal" | "tags" | "pills"; // Add the new variants used in redesign
}