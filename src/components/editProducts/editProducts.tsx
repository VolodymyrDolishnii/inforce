import React, { useState } from 'react';
import { Product } from '../types/Product';
import { postProduct } from '../api/products';

type Props = {
    lastId: number
    changeLastId: (x: number) => void;
    addProduct: (x: Product) => void;
}

export const EditProducts: React.FC<Props> = ({ lastId, changeLastId, addProduct }) => {
    const [name, setName] = useState('');
    const [count, setCount] = useState('');
    const [weight, setWeight] = useState('');
    const [imgURL, setImgURL] = useState('');


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        changeLastId(lastId + 1);

        const newProduct = {
            id : lastId,
            imageUrl : imgURL.trim(),
            name : name.trim(),
            count : count.trim(),
            size : {
            width : 200,
            height : 200
           },
            weight :  weight.trim() + 'g',
            comments: [],
        }

        addProduct(newProduct);
        postProduct(newProduct);

        setName('');
        setCount('');
        setImgURL('');
        setWeight(''); 
    }

    const isValid = () => {
        if (
            name.length === 0
            || count.length === 0
            || weight.length === 0
        ) {
            return true;
        }

        return false;
    }

    return (
        <form 
            className='addProduct'
            onSubmit={handleSubmit}
        >
            <h2>Add product</h2>

            <p className='formText'>Enter the name:</p>
            <input
                type="text"
                value={name}
                onChange={(event) => {
                    setName(event.target.value.trimStart());
                }}
                required
                placeholder='Phone'
            />

            <p className='formText'>Enter the count:</p>
            <input
                type="text"
                value={count}
                onChange={(event) => {
                    setCount(event.target.value.trimStart());
                }}
                required
                placeholder='15'
            />

            <p className='formText'>Enter the weight (g):</p>
            <input
                type="text"
                value={weight}
                onChange={(event) => {
                    setWeight(event.target.value.trimStart());
                }}
                required
                placeholder='520'
            />

            <p className='formText'>Enter the image URL:</p>
            <input
                type="text"
                value={imgURL}
                min="0"
                onChange={(event) => {
                    setImgURL(event.target.value);
                }}
                placeholder='chrome://new-tab-page/icons/google_logo.svg'
            />

            <button 
                type='submit'
                disabled={isValid()}
            >
                Add Product
            </button>
        </form>
    );
}