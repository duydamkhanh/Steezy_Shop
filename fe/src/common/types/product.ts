import { TCategoty } from "./category"

export interface TProduct {
    _id: string,
    title: string,
    thumbnail?: string,
    images?: string[],
    category: TCategoty,
    price: number,
    discount?: number,
    stock?: number,
    slug?: string,
    rating: number,
    description?: string,
    isFavorite: boolean,
    createdAt: string
    updatedAt: string
}