import React, { useState, useEffect } from 'react';
import { getComments } from '../api/products';
import { CommentType } from '../types/CommentType';

type Props = {
    productId: number | undefined;
}

export const CommentList: React.FC<Props> = ({ productId }) => {
    const [comments, setComments] = useState<CommentType[]>([]);

    useEffect(() => {
        if (productId) {
            getComments(productId)
                .then(response => setComments(response));
        } else {
            setComments([]);
        }
    }, [productId])

    return (
        <>  <h3>Comments: </h3>
            {comments.length === 0
                ? <p>No comments yet</p>
                : <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p>{comment.description}</p>
                        <span>{comment.date}</span>
                    </li>
                ))}
            </ul>
            }
        </>
    );
}