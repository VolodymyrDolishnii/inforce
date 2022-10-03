import React, { useState, useEffect } from 'react';
import { CommentType } from '../types/CommentType';
import { Product } from '../types/Product';
import { deleteProduct } from '../api/products';
import { ForDeleting } from '../forDeleting/forDeleting';
import { useNavigate } from 'react-router-dom';

type Props = {
    products: Product[],
    comments: CommentType[]
    setProducts: (x: Product[]) => void;
    id: number;
    setId: (x: number) => void;
}

export const ProductList: React.FC<Props> = ({ products, comments, setProducts, id, setId }) => {
    const [deleting, setDeleting] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    
    const navigate = useNavigate();

    const deleteButton = (productId: number) => {
        const newProducts = products.filter(product => product.id !== productId);
        setProducts(newProducts);

        deleteProduct(productId);
    }

    useEffect(() => {
        if (isDelete === true) {
            deleteButton(id);
        }
    }, [isDelete, id])

    return (
        <ul className='productList'>
            {products.map(product => (
                <li 
                    key={product.id} 
                    className="product" 
                    style={{cursor: 'pointer'}}
                    onClick={() => navigate(`/products/${product.id}`)}
                >
                    <div className="productList__imageContainer" style={{
                        width: product.size.width, 
                        height: product.size.height, 
                        border: '1px solid black',
                        borderRadius: '10px'
                }}>
                        <img src={product.imageUrl} alt={product.name} width={product.size.width} height={product.size.height} className="product__image" />
                    </div>
                    <div className="product__info">
                        <h2 className='product__name'>{product.name}</h2>
                        {/* <p className='product__count'>Count: {product.count}</p>
                        <p className='product__weight'>Weight: {product.weight}</p> */}
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