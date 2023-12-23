
export type newProductType = {
    title: string,
    short_description: string,
    description: string,
    category: string,
    price: {
        amount: number,
        currency: string | "USD"
    }
    product_type: string,
    coverImage: string,
    photos?: string[],
    categories?: string[],
    tags?: string[],
    creator: {
        username: string,
        profileURL: string,
        userId: string,
    },
}
export type editableProductType = newProductType & {
    _id: string,
    createdAt: string,
    updatedAt: string,
    likes?: string[],
    views?: number,
    status: 'rejected' | 'pending' | 'approved',
    slug: string,
}
export type searhableProductType = {
    _id: string,
    title: string,
    short_description: string,
    price: {
        amount: number,
        currency: string | "USD"
    }
    product_type: string,
    coverImage: string,
    categories?: string[],
    tags?: string[],
    creator: {
        username: string,
        profileURL: string,
        userId: string,
    },
    likes?: string[],
    views?: number,
    slug: string,
}
export type publicProductType = {
    _id: string,
    title: string,
    short_description: string,
    price: {
        amount: number,
        currency: string | "USD"
    }
    product_type: string,
    coverImage: string,
    photos?: string[],
    categories?: string[],
    tags?: string[],
    creator: {
        username: string,
        profileURL: string,
        userId: string,
    },
    likes?: string[],
    views?: number,
    slug: string,
    createdAt: string,
}
export type statsProductType = {
    _id: string,
    title: string,
    price: {
        amount: number,
        currency: string | "USD"
    }
    product_type: string,
    coverImage: string,
    categories?: string[],
    creator: {
        username: string,
        profileURL: string,
        userId: string,
    },
    likes: string[],
    views: number,
    slug: string,
    createdAt: string,
}