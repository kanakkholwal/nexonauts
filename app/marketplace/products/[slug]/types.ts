import { ProductType } from "src/models/product";

export interface Creator {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
}

export type Product = ProductType & {
    creator: Creator;
}