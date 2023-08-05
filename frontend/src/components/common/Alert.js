import React from 'react';
import "../../css/alert.css";


const Alert = ({ type = "light-danger", message, dismissible = true, onClose }) => {
    const alertClass = `alert alert-light-${type} ${dismissible ? "alert-dismissible fade show" : ""} border-0 mb-4`;

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={alertClass} role="alert">
            {dismissible && (
                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x close">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}
            {message}
        </div>
    );
};

export default Alert;
