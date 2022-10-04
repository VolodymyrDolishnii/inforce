import React, { useState } from 'react';
import { CommentType } from '../types/CommentType';
import { postComment, deleteComment } from '../api/products';
import moment from 'moment';

type Props = {
    comments: CommentType[],
    setComments: (x: CommentType[]) => void;
    addComment: (x: CommentType) => void;
    productId: number | undefined
}

export const CommentList: React.FC<Props> = ({ comments, setComments, addComment, productId }) => {
    const [isAdd, setIsAdd] = useState(false);
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (productId) {
            const newComment = {
                id: +(new Date().getTime()),
                productId: productId,
                description: description,
                date: moment().format('h:mm, MMMM Do YYYY')
            }

            addComment(newComment);
            postComment(newComment);
            setDescription('');
            setIsAdd(false);
        }
    }

    const handleDelete = (commentId: number) => {
        const newComments = comments.filter(comment => comment.id !== commentId);
        setComments(newComments);
        deleteComment(commentId);
    }

    return (
        <div className='comments'>
            <h3>Comments: </h3>
            {comments.length === 0
                ? <>
                    <p>No comments yet</p>
                    <form className='addComment' onSubmit={(event) => handleSubmit(event)}>
                        <p>Enter your feedback</p>
                        <input type="text"
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                            required
                        />
                        <button type='submit'>
                            Confirm
                        </button>
                    </form>
                </>
                : <>
                    <ul className='comments__list'>
                        {comments.map((comment, index) => (
                            <li key={comment.id} className="comments__listItem" >
                                <span>#{index + 1}</span>
                                <p>{comment.description}</p>
                                <span>{comment.date}</span>
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    style={{marginLeft: "10px"}}
                                >
                                    Delete it
                                </button>
                            </li>
                        ))}
                    </ul>
                    {isAdd === false
                        ? <button
                            onClick={() => setIsAdd(true)}
                        >
                            Add Comment
                        </button>
                        : <form className='addComment' onSubmit={(event) => handleSubmit(event)}>
                            <p>Enter your feedback</p>
                            <input type="text"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                required
                            />
                            <button type='submit'>
                                Confirm
                            </button>
                        </form>
                    }
                </>
            }
        </div>
    );
}