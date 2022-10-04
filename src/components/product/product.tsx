import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/products';
import { Product as ProductType } from '../types/Product';
import { CommentList } from '../commentList/commentList';
import { CommentType } from '../types/CommentType';
import { getComments } from '../api/products';

export const Product = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<ProductType>();
    const [comments, setComments] = useState<CommentType[]>([]);

    useEffect(() => {
        if (id) {
            getProduct(+id)
                .then(response => setProduct(response));
        }
    }, [id]);

    useEffect(() => {
        if (product?.id) {
            getComments(product?.id)
                .then(response => setComments(response));
        }
    }, [product?.id]);

    const addComment = (newComment: CommentType) => {
        setComments(list => [...list, newComment]);
    }

    return (
        <div className='productPage'>
            <div className='productCard'>
                <div className="productList__imageContainer" style={{
                    width: 200,
                    height: 200,
                    border: '1px solid black',
                    borderRadius: '10px'
                }}
                >
                    <img src={product?.imageUrl} alt={product?.name} width={product?.size.width} height={product?.size.height} style={{borderRadius: "10px", objectFit: 'cover'}} />
                </div>
                <h1>{product?.name}</h1>
                <p>Count: {product?.count}</p>
                <p>Weight: {product?.weight}</p>
            </div>
            <CommentList comments={comments} setComments={setComments} addComment={addComment} productId={product?.id}/>
        </div>
    )
}