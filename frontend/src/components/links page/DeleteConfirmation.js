import React from 'react';
import { FiX } from 'react-icons/fi';

const DeleteConfirmation = ({ handleDelete, setShowDeleteConfirmation, showDeleteConfirmation }) => {
    return (
        <div style={{ display: showDeleteConfirmation? "block" : "none" }}>
            <div className="col-12 d-flex justify-content-between bg-danger text-white px-4">
                <span></span>
                <span><b>Delete</b></span>
                <FiX 
                    size={23}
                    onClick={() => setShowDeleteConfirmation(!showDeleteConfirmation)} 
                />
            </div>
            <div className="col-12 p-4 text-center">
                <span className="text-dark"><b>Delete this forever?</b></span>
                <div className="row mt-3">
                    <div className="col-md-6 col-sm-12">
                        <button 
                            type="button" 
                            className="btn btn-light-dark w-100"
                            onClick={() => setShowDeleteConfirmation(!showDeleteConfirmation)}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <button 
                            type="button" 
                            className="btn btn-danger w-100"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation;