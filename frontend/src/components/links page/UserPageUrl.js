import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink } from "react-icons/fi";
import useAuthStore from '../../store/authStore';

const UserPageUrl = () => {
    const user = useAuthStore((state) => state.user);
    const [isCopied, setIsCopied] = useState(false);
    const divRef = useRef();
    const baseUrl = window.location.origin;
    const userPageUrl = `${baseUrl}/${user?.user.username}`

    const handleCopyText = () => {
        const divElement = divRef.current;
        if (divElement) {
            const textToCopy = divElement.innerText;

            navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setIsCopied(true);

                setTimeout(() => {
                    setIsCopied(false);
                }, 3000);
            })
            .catch((error) => {
                console.error("Error copying text:", error);
            });
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-body d-flex justify-content-between align-items-center ps-3 ps-3 pt-2 pb-2">
                <span className="mb-0">
                    <strong className="text-dark">Your page is live: </strong> 
                    <Link 
                        to={userPageUrl} 
                        ref={divRef} 
                        target="_blank" 
                        className="text-success fw-bold"
                    >
                        {userPageUrl} 
                        <FiExternalLink className="ms-1 mb-1"/>
                    </Link>
                </span>
                <button 
                    className="btn btn-sm btn-light-dark" 
                    onClick={handleCopyText}
                >
                    <strong className={`fw-bold ${isCopied ? "text-success": ""}`}>
                        {isCopied ? "Copied!" : "Copy URL"}
                    </strong>
                </button>
            </div>
        </div>
    )
}

export default UserPageUrl;