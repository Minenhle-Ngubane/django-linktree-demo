import React from 'react';
import { FiX } from 'react-icons/fi';


const AddLinkForm = ({ setUrl, handleAddLink, setShowForm }) => {
    const handleFormClose = () => {
        setShowForm(false);
        setUrl("");
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <label><b>Enter URL</b></label>
                    <FiX size={23} onClick={handleFormClose}/>
                </div>
                
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control border-0 bg-light"
                        placeholder="URL"
                        onChange={(e) => setUrl(e.target.value)}
                        autoFocus
                    />
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={handleAddLink}
                    >
                        Add new link
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddLinkForm;