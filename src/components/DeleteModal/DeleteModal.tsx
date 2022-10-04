import React from 'react';

type Props = {
    setDeleting: (x: boolean) => void;

    setIsDelete: (x: boolean) => void;
}

export const DeleteModal: React.FC<Props> = ({ setDeleting, setIsDelete }) => {
    return (
        <div className='forDeleting'>
            <h2>Do you want to delete this item?</h2>
            <div className="forDeleting__buttons">
                <button
                    onClick={() => {
                        setIsDelete(true);
                        setDeleting(false);
                    }}
                >
                    Yes
                </button>
                <button
                    onClick={() => {
                        setIsDelete(false)
                        setDeleting(false);
                    }}
                >
                    No
                </button>
            </div>
        </div>
    )
}