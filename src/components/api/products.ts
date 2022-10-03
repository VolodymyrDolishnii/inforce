import { items } from "./Fetch";
import { Product } from "../types/Product";
import { CommentType } from "../types/CommentType";

export const getProducts = () => {
    return items.get<Product[]>(`/products`);
};

export const getComments = () => {
    return items.get<CommentType[]>(`/comments`);
};

export const postProduct = (product: Product) => {
    return items.post('/products', product);
}

export const deleteProduct = (productId: number) => {
    return items.delete(`/products/${productId}`);
}