type PublicToolType = {
    _id?: string;
    name: string;
    slug: string;
    coverImage: string;
    description: string;
    categories: Category[];
    link: string;
    tags: string[];
    status:"draft"| "published"| "archived"|"deleted"|"pending"|"rejected"|"approved";
    createdAt?: Date | string;
    verified: boolean;
    pricing_type: string | "free" | "paid" | "freemium" | "subscription" | "one_time_license"|  "open_source"|"other";
    
}

interface Category {
    _id?: string;
    name: string;
    slug: string;
    createdAt:Date | string;

}

export default PublicToolType;