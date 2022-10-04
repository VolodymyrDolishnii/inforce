import React, { useState, useEffect } from 'react';
import { CommentType } from '../types/CommentType';
import { Product } from '../types/Product';
import { deleteProduct } from '../api/products';
import { ForDeleting } from '../forDeleting/forDeleting';
import { useNavigate } from 'react-router-dom';

type Props = {
    products: Product[],
    setProducts: (x: Product[]) => void;
    id: number;
    setId: (x: number) => void;
}

export const ProductList: React.FC<Props> = ({ products, setProducts, id, setId }) => {
    const [deleting, setDeleting] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    
    const navigate = useNavigate();

    const deleteButton = (productId: number) => {
        const newProducts = products.filter(product => product.id !== productId);
        deleteProduct(productId);
        setProducts(newProducts);
    }

    useEffect(() => {
        if (isDelete === true) {
            deleteButton(id);
            setDeleting(false);
            setIsDelete(false);
        }
    }, [isDelete, id])

    return (
        <ul className='productList'>
            {products.map(product => (
                <li 
                    key={product.id} 
                    className="product" 
                    style={{cursor: 'pointer'}}
                >
                    <div className="productList__imageContainer" style={{
                        width: product.size.width, 
                        height: product.size.height, 
                        border: '1px solid black',
                        borderRadius: '10px'}}
                        onClick={() => navigate(`/products/${product.id}`)}    
                    >
                        <img src={product.imageUrl} alt={product.name} width={product.size.width} height={product.size.height} className="product__image" />
                    </div>
                    <div className="product__info">
                        <h2 
                            className='product__name'
                            onClick={() => navigate(`/products/${product.id}`)}
                        >
                                {product.name}</h2>
                        <button
                            onClick={() => {
                                setDeleting(true)
                                setId(product.id);
                            }}
                        >
                            Delete Item
                        </button>
                    </div>
                </li>
            ))}

            {deleting && (
                <ForDeleting setDeleting={setDeleting} isDelete={isDelete} setIsDelete={setIsDelete} />
            )}
        </ul>
    )
}