import { items } from "./Fetch";
import { Product } from "../types/Product";
import { CommentType } from "../types/CommentType";

export const getProducts = () => {
    return items.get<Product[]>(`/products`);
};

export const getComments = (productId: number) => {
    return items.get<CommentType[]>(`/comments?productId=${productId}`);
};

export const postComment = (newComment: CommentType) => {
    return items.post('/comments', newComment);
}

export const deleteComment = (commentId: number) => {
    return items.delete(`/comments/${commentId}`);
}

export const postProduct = (product: Product) => {
    return items.post('/products', product);
}

export const deleteProduct = (productId: number) => {
    return items.delete(`/products/${productId}`);
}

export const getProduct = (id: number) => {
    return items.get<Product>(`/products/${id}`);
}