import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/products';
import { Product as ProductType } from '../types/Product';

export const Product = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<ProductType>();

    useEffect(() => {
        if (id) {
            getProduct(+id)
                .then(response => setProduct(response));
        }
    }, [id]);

    return (
        <>
            <img src={product?.imageUrl} alt={product?.name} width={product?.size.width} height={product?.size.height} />
            <h1>{product?.name}</h1>
            <p>Count: {product?.count}</p>
            <p>Weight: {product?.weight}</p>

        </>
    )
}