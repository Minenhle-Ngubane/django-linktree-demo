import React, { Fragment, useState } from 'react';
import { RiDraggable } from "react-icons/ri";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { useSocialLinkStore } from '../../store/socialLinksStore';
import { EditIconModel } from '../settings page/Models';
import Spinner from '../common/Spinner';
import DynamicIcon from '../../utils/DynamicIcon'; 


const SocialLink = ({ link }) => {
    const { updateSocialLink } = useSocialLinkStore();

    const [isVisible, setIsVisible] = useState(link.is_visible);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditIconModalOpen, setIsEditIconModalOpen] = useState(false);

    const openEditIconModal = () => setIsEditIconModalOpen(true);
    const closeEditIconModal = () => setIsEditIconModalOpen(false);

    const handleCheckboxChange = (e) => {
        setIsUpdating(true);
        const newIsVisible = e.target.checked;
        setIsVisible(newIsVisible);

        const updatedLink = { ...link, is_visible: newIsVisible };
        updateSocialLink(link.id, updatedLink);
        setIsUpdating(false);
    };


    return (
        <Fragment>
            <div className="d-flex justify-content-between px-3">
                <div className="d-flex justify-content-start">
                    <div className="align-self-center">
                        {isUpdating ? <Spinner color={"secondary"} /> : <RiDraggable size={20} />}
                    </div>
                    <div className="d-flex justify-content-start fs-6 ps-4" style={{ fontWeight: "600"}}>
                        <DynamicIcon name={link.aliase} size={23} color="black" />
                        <span className="ps-2">{link.icon}</span>
                    </div>
                </div>
                
                <div className="d-flex justify-content-between">
                    <PiPencilSimpleLineLight size={20} onClick={openEditIconModal} className="mt-1 me-1" />
                    <div className="form-check form-switch form-check-inline form-switch-success mx-0">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            role="switch" 
                            checked={isVisible}
                            onChange={handleCheckboxChange}
                            disabled={isUpdating}
                        /> 
                    </div>
                </div>
            </div>
            {isEditIconModalOpen && (
                <EditIconModel closeModal={closeEditIconModal} link={link} />
            )}
        </Fragment>
        
    )
}

export default SocialLink;