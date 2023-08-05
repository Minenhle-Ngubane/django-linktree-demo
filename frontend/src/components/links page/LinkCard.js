import { useState } from 'react';
import { RiDraggable } from "react-icons/ri";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { FiImage, FiCalendar, FiTrash2 } from 'react-icons/fi';
import { TbArrowLoopRight } from 'react-icons/tb';
import Spinner from '../common/Spinner';
import DeleteConfirmation from './DeleteConfirmation';


const LinkCard = ({ link, updateLink, deleteLink }) => {
    const [isVisible, setIsVisible] = useState(link.is_visible);
    const [title, setTitle] = useState(link.title);
    const [editTitle, setEditTitle] = useState(false);
    const [url, setUrl] = useState(link.url);
    const [editUrl, setEditUrl] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleCheckboxChange = (e) => {
        const newIsVisible = e.target.checked;
        setIsVisible(newIsVisible);

        const updatedLink = { ...link, is_visible: newIsVisible };
        updateLink(link.id, updatedLink);
    };

    const handleTitleEdit = () => setEditTitle(true);
    const handleUrlEdit = () => setEditUrl(true);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);

    const handleTitleBlur = () => {
        setIsUpdating(true);
        setEditTitle(false);

        const updatedLink = { ...link, title };
        updateLink(link.id, updatedLink);
        setIsUpdating(false);
    };

    const handleUrlBlur = () => {
        setIsUpdating(true);
        setEditUrl(false);

        const updatedLink = { ...link, url };
        updateLink(link.id, updatedLink);
        setIsUpdating(false);
    };

    const handleDelete = () => deleteLink(link.id);

    // useEffect(() => {
    //     if(!title.trim() || !url.trim()) {
    //         setIsVisible(false);
    //         const updatedLink = { ...link, is_visible: false };
    //         updateLink(link.id, updatedLink);
    //     } else {
    //         setIsVisible(true);
    //         const updatedLink = { ...link, is_visible: true };
    //         updateLink(link.id, updatedLink);
    //     }
    // }, [title, url]);


    return (
        <div className="card">
            <div className="card-body d-flex justify-content-start align-items-center">
                <div className="col-md-1 align-self-center">
                    {isUpdating ? <Spinner color={"secondary"} /> : <RiDraggable size={20} />}
                </div>
                
                <div className="col-md-11">
                    <div className="d-flex justify-content-between dark">
                        {editTitle? (
                            <input 
                                type="text" 
                                className="w-100"
                                style={{outline: "none", border: "none"}} 
                                value={title}
                                onChange={handleTitleChange}
                                onBlur={handleTitleBlur}
                                autoFocus
                            />
                        ) : (
                            <strong className="text-dark">
                                {title}
                                <PiPencilSimpleLineLight onClick={handleTitleEdit} className="ms-1" />
                            </strong> 
                        )}
                        
                        <div className="form-check form-switch form-check-inline form-switch-success mx-0">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                role="switch" 
                                id="id_is_visible" 
                                name="is_visible"
                                checked={isVisible}
                                onChange={handleCheckboxChange}
                                disabled={isUpdating}
                            /> 
                        </div>
                    </div>
                    
                    {editUrl? (
                        <input 
                            type="text" 
                            className="w-100"
                            style={{outline: "none", border: "none"}} 
                            value={url}
                            onChange={handleUrlChange}
                            onBlur={handleUrlBlur}
                            autoFocus
                        />
                    ) : (
                        <span>
                            {url}
                            <PiPencilSimpleLineLight onClick={handleUrlEdit} className="ms-2" />
                        </span> 
                    )}
                    
                    <div className="d-flex justify-content-between mt-3">
                        <div className="d-flex flex-row text-muted">
                            <TbArrowLoopRight size={17} />
                            <FiImage className="mx-4" size={17} />
                            <FiCalendar size={17} />
                        </div>
                        <FiTrash2 
                            size={17}
                            className="text-muted"
                            onClick={() => setShowDeleteConfirmation(!showDeleteConfirmation)}
                        />
                    </div>
                </div>
            </div>
            <DeleteConfirmation 
                handleDelete={handleDelete} 
                setShowDeleteConfirmation={setShowDeleteConfirmation}
                showDeleteConfirmation={showDeleteConfirmation}
            />
        </div>
    )
}

export default LinkCard;